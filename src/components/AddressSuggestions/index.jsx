import { useState } from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";

/* global google */
const AddressSuggestions = ({ address, onAddressChange, onAddressSelect }) => {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const handleAddressChange = (e) => {
    const query = e.target.value;
    onAddressChange(query);
    setIsAddressSelected(false);

    if (query.length > 2) {
      if (window.google && window.google.maps) {
        fetchAddressSuggestions(query);
      } else {
        console.error("Google Maps API não carregada.");
      }
    } else {
      setAddressSuggestions([]);
    }
  };

  const fetchAddressSuggestions = (query) => {
    if (typeof window.google !== "undefined" && window.google.maps) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: query, types: ["address"] },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setAddressSuggestions(predictions);
          } else {
            setAddressSuggestions([]);
          }
        }
      );
    }
  };

  const handleAddressSelect = (address) => {
    onAddressSelect(address);
    setIsAddressSelected(true);
    setAddressSuggestions([]);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        label="Endereço"
        fullWidth
        value={address}
        onChange={handleAddressChange}
        sx={{ mb: 2 }}
      />
      {addressSuggestions.length > 0 && !isAddressSelected && (
        <Box
          sx={{
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            bgcolor: "white",
            position: "absolute",
            zIndex: 1,
            maxWidth: "470px",
          }}
        >
          {addressSuggestions.map((suggestion, index) => (
            <Box
              key={index}
              sx={{
                padding: "8px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => handleAddressSelect(suggestion)}
            >
              {suggestion.description}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

AddressSuggestions.propTypes = {
  address: PropTypes.string.isRequired,
  onAddressChange: PropTypes.func.isRequired,
  onAddressSelect: PropTypes.func.isRequired,
};

export default AddressSuggestions;
