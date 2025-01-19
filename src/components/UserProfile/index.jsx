import { Box, Avatar, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";

const UserProfile = ({ handleLogout }) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const userName = users ? users.name : "Usuário";

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
      <IconButton color="error" onClick={handleLogout} aria-label="Logout">
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};

UserProfile.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default UserProfile;
