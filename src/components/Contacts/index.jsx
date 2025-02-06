import { Box, List } from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import ContactItem from "./ContactItem";
import ContactHeader from "./ContactHeader";
import InputSearch from "../InputSearch";
import { getUserContacts, saveUserContacts } from "../../utils/contact";

const Contacts = ({ user, selectedContact, handleContactClick }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContact, setNewContact] = useState(null);

  useEffect(() => {
    setContacts(getUserContacts(user));
  }, [user]);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.cpf.includes(searchTerm)
    );

    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, sortOrder]);

  const handleAddContact = () => {
    setNewContact({
      name: "",
      cpf: "",
      phone: "",
      address: "",
      location: null,
    });
    setShowForm(!showForm);
    setIsEditing(false);
  };

  const handleSaveContact = (contact) => {
    const updatedContacts = isEditing
      ? contacts.map((c) => (c.cpf === contact.cpf ? contact : c))
      : [...contacts, contact];
    saveUserContacts(user, updatedContacts);
    setContacts(updatedContacts);
    setShowForm(false);
  };

  const handleDeleteContact = (cpf) => {
    const updatedContacts = contacts.filter((contact) => contact.cpf !== cpf);
    saveUserContacts(user, updatedContacts);
    setContacts(updatedContacts);
  };

  const handleEditContact = (contact) => {
    setNewContact(contact);
    setShowForm(true);
    setIsEditing(true);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        p: 2,
        bgcolor: "background.paper",
        overflowY: "auto",
      }}
    >
      <ContactHeader onAdd={handleAddContact} />
      <InputSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
      />
      {showForm && (
        <ContactForm
          initialContact={newContact}
          onSave={handleSaveContact}
          isEditing={isEditing}
          existingContacts={contacts}
        />
      )}
      <List>
        {filteredContacts.map((contact, index) => (
          <ContactItem
            key={index}
            contact={contact}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
            isSelected={selectedContact?.cpf === contact.cpf}
            onClick={() => handleContactClick(contact)}
          />
        ))}
      </List>
    </Box>
  );
};

Contacts.propTypes = {
  user: PropTypes.string.isRequired,
  selectedContact: PropTypes.shape({
    cpf: PropTypes.string,
  }),
  handleContactClick: PropTypes.func.isRequired,
};

export default Contacts;
