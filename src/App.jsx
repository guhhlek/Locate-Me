import { useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import UserProfile from "./components/UserProfile";
import MapView from "./components/MapView";
import Contacts from "./components/Contacts";
import Auth from "./components/Auth";
import theme from "./theme/theme";

const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("loggedInUser"));
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleLoginSuccess = (username) => {
    setUser(username);
    localStorage.setItem("loggedInUser", username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {isLoggedIn ? (
          <>
            <Box
              sx={{
                width: "30%",
                p: 2,
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Contacts
                user={user}
                selectedContact={selectedContact}
                handleContactClick={handleContactClick}
              />
              <Box
                sx={{
                  mt: "auto",
                  p: 2,
                  bgcolor: "background.default",
                }}
              >
                <UserProfile handleLogout={handleLogout} user={user} />
              </Box>
            </Box>
          </>
        ) : (
          <Auth onLoginSuccess={handleLoginSuccess} />
        )}
        <Box sx={{ flex: 1, position: "relative" }}>
          <MapView selectedContact={selectedContact} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
