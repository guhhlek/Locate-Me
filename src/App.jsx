import { useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import UserProfile from "./components/UserProfile";
import MapView from "./components/MapView";
import "leaflet/dist/leaflet.css";
import ContactsList from "./components/ContactsList";
import theme from "./theme/theme";

const contacts = [
  {
    id: 1,
    name: "Alice",
    location: { lat: -25.443521692455874, lng: -49.27889574608869 },
  },
  { id: 2, name: "Bob", location: { lat: 34.0522, lng: -118.2437 } },
  { id: 3, name: "Charlie", location: { lat: 40.7128, lng: -74.006 } },
];

const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <>
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
          <Box
            sx={{
              width: "30%",
              p: 2,
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ContactsList
              contacts={contacts}
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
              <UserProfile />
            </Box>
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <MapView selectedContact={selectedContact} />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
