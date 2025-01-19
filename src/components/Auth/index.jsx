import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";

const Auth = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleAuth = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (isLogin) {
      if (users && users["email"] === email && users["password"] === password) {
        localStorage.setItem("loggedInUser", email);
        setMessage("Login realizado com sucesso!");
        onLoginSuccess();
      } else {
        setMessage("E-mail ou senha incorretos.");
      }
    } else {
      if (users[email]) {
        setMessage("E-mail já cadastrado.");
      } else {
        users["email"] = email;
        users["password"] = password;
        users["name"] = name;
        localStorage.setItem("users", JSON.stringify(users));
        setMessage("Cadastro realizado com sucesso!");
        setIsLogin(true);
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          {isLogin ? "Login" : "Cadastro"}
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAuth}
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Criar conta" : "Fazer login"}
          </Link>
        </Typography>
        {message && (
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: message.includes("sucesso")
                ? "success.main"
                : "error.main",
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

Auth.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Auth;
