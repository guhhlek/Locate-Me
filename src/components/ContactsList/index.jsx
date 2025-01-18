import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const ContactsList = ({ contacts, selectedContact, handleContactClick }) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRight: "1px solid #ddd",
        overflowY: "auto",
        p: 2,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          mb: 2,
          bgcolor: "secondary.main",
          color: "white",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        Contatos
      </Typography>
      <List sx={{ pt: 0 }}>
        {contacts.map((contact, index) => (
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
                selectedContact?.id === contact.id
                  ? "primary.main"
                  : "transparent",
              color:
                selectedContact?.id === contact.id
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
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedContact: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  handleContactClick: PropTypes.func.isRequired,
};

export default ContactsList;
