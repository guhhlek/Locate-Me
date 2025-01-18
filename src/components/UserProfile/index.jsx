import { Box, Avatar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserProfile = () => {
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
      <Typography variant="h6" fontWeight="bold">
        Gustavo Ramos
      </Typography>
    </Box>
  );
};

export default UserProfile;
