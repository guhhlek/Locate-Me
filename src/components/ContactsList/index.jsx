import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";

const ContactsList = ({ user, selectedContact, handleContactClick }) => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    cpf: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem("users")) || {};
      const userContacts = users[user]?.contacts || [];
      setContacts(userContacts);
    }
  }, [user]);

  const handleSaveContact = () => {
    if (!newContact.name) return;

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
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Contatos
        </Typography>
        <IconButton onClick={handleAddContact}>
          <AddIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

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
          <TextField
            label="address"
            fullWidth
            value={newContact.address}
            onChange={(e) =>
              setNewContact({ ...newContact, address: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleSaveContact}>
            Adicionar Contato
          </Button>
        </Paper>
      )}

      <List sx={{ pt: 0 }}>
        {contacts &&
          contacts.map((contact, index) => (
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
  selectedContact: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cpf: PropTypes.string,
  }),
  handleContactClick: PropTypes.func.isRequired,
};

export default ContactsList;
