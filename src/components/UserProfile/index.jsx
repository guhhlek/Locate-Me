import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

const UserProfile = ({ handleLogout, user }) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const userName = users[user] ? users[user].name : "Usuário";
  const userPassword = users[user].password || "";
  const [isModalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleDeleteAccount = () => {
    if (password === userPassword) {
      delete users[user];
      localStorage.setItem("users", JSON.stringify(users));
      alert("Conta excluída com sucesso!");
      handleLogout();
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 2,
        mt: 2,
        p: 2,
        bgcolor: "background.default",
        borderRadius: "8px",
        boxShadow: 1,
      }}
    >
      <Avatar>
        <AccountCircleIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
        {userName}
      </Typography>
      <Box>
        <IconButton color="error" onClick={handleLogout} aria-label="Logout">
          <LogoutIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => setModalOpen(true)}
          aria-label="Delete Account"
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="delete-account-modal"
        aria-describedby="delete-account-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" id="delete-account-modal" sx={{ mb: 2 }}>
            Confirmar Exclusão
          </Typography>
          <TextField
            label="Digite sua senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => setModalOpen(false)}
              variant="outlined"
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="contained"
              color="error"
            >
              Excluir
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

UserProfile.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default UserProfile;
