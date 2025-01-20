import {
  Box,
  IconButton,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import AddressSuggestions from "../AddressSuggestions";
import InputSearch from "../InputSearch";

/* global google */
const ContactsList = ({ user, selectedContact, handleContactClick }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    cpf: "",
    phone: "",
    address: "",
    location: null,
  });

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem("users")) || {};
      const userContacts = users[user]?.contacts || [];
      setContacts(userContacts);
    }
  }, [user]);

  useEffect(() => {
    let updatedContacts = [...contacts];

    if (searchTerm) {
      updatedContacts = updatedContacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    updatedContacts.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredContacts(updatedContacts);
  }, [contacts, searchTerm, sortOrder]);

  const handleSaveContact = () => {
    if (!newContact.name || !newContact.location) return;

    const updatedContacts = [...contacts, { ...newContact }];
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[user].contacts = updatedContacts;
    localStorage.setItem("users", JSON.stringify(users));
    setContacts(updatedContacts);
    setShowForm(false);
  };

  const handleAddContact = () => {
    setShowForm(!showForm);
  };

  const handleAddressChange = (address) => {
    setNewContact((prev) => ({ ...prev, address }));
  };

  const handleAddressSelect = (address) => {
    setNewContact((prev) => ({ ...prev, address: address.description }));
    fetchLocation(address.description);
  };

  const fetchLocation = (address) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const { lat, lng } = results[0].geometry.location;

        setNewContact((prev) => ({
          ...prev,
          location: { lat: lat(), lng: lng() },
        }));
      } else {
        console.error("Geocoding failed: " + status);
      }
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowY: "auto",
        p: 2,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          mb: 2,
          bgcolor: "secondary.main",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          Contatos
        </Typography>
        <IconButton onClick={handleAddContact}>
          <AddIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <InputSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
      />

      {showForm && (
        <Paper sx={{ padding: 2, mb: 2 }}>
          <TextField
            label="Nome"
            fullWidth
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="CPF"
            fullWidth
            type="number"
            value={newContact.cpf}
            onChange={(e) =>
              setNewContact({ ...newContact, cpf: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Telefone"
            fullWidth
            type="number"
            value={newContact.phone}
            onChange={(e) =>
              setNewContact({ ...newContact, phone: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <AddressSuggestions
            address={newContact.address}
            onAddressChange={handleAddressChange}
            onAddressSelect={handleAddressSelect}
          />
          <Button variant="contained" onClick={handleSaveContact}>
            Adicionar Contato
          </Button>
        </Paper>
      )}

      <List sx={{ pt: 0 }}>
        {filteredContacts.map((contact, index) => (
          <ListItem
            key={index}
            component="div"
            onClick={() => handleContactClick(contact)}
            sx={{
              borderRadius: "8px",
              mb: 1,
              cursor: "pointer",
              "&:hover": { bgcolor: "#2ec7d6" },
              bgcolor:
                selectedContact?.cpf === contact.cpf
                  ? "primary.main"
                  : "transparent",
              color:
                selectedContact?.cpf === contact.cpf
                  ? "primary.contrastText"
                  : "inherit",
            }}
          >
            <ListItemText primary={contact.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

ContactsList.propTypes = {
  user: PropTypes.string.isRequired,
  selectedContact: PropTypes.object,
  handleContactClick: PropTypes.func.isRequired,
};

export default ContactsList;
