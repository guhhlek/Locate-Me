import { ListItem, ListItemText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

const ContactItem = ({ contact, onEdit, onDelete, isSelected, onClick }) => (
  <ListItem
    onClick={() => {
      onClick();
    }}
    sx={{
      borderRadius: "8px",
      mb: 1,
      cursor: "pointer",
      "&:hover": { bgcolor: "#2ec7d6" },
      bgcolor: isSelected ? "primary.main" : "transparent",
      color: isSelected ? "primary.contrastText" : "inherit",
    }}
  >
    <ListItemText primary={contact.name} />
    <IconButton onClick={() => onEdit(contact)}>
      <EditIcon />
    </IconButton>
    <IconButton onClick={() => onDelete(contact.cpf)}>
      <DeleteIcon />
    </IconButton>
  </ListItem>
);

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactItem;
