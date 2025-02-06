import { useState, forwardRef } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { IMaskInput } from "react-imask";
import AddressSuggestions from "../AddressSuggestions";
import PropTypes from "prop-types";
import { validateCpf } from "../../utils/validateCpf";

const MaskedCpfInput = forwardRef(function MaskedCpfInput(props, ref) {
  return <IMaskInput {...props} mask="000.000.000-00" inputRef={ref} />;
});

const ContactForm = ({
  initialContact,
  onSave,
  isEditing,
  existingContacts,
}) => {
  const [contact, setContact] = useState(initialContact);
  const [cpfError, setCpfError] = useState("");
  const [cpfExistsError, setCpfExistsError] = useState("");

  const handleCpfChange = (e) => {
    setContact({ ...contact, cpf: e.target.value });
    setCpfError("");
  };

  const handleCpfBlur = () => {
    const { isValid } = validateCpf(contact.cpf);
    setCpfError(isValid ? "" : "CPF inválido.");
  };

  const handleAddressSelect = (address) => {
    setContact((prev) => ({ ...prev, address: address.description }));
    fetchLocation(address.place_id);
  };

  const fetchLocation = (placeId) => {
    fetch(`http://localhost:5000/place-details?place_id=${placeId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.geometry) {
          const { lat, lng } = data.geometry.location;
          setContact((prev) => ({
            ...prev,
            location: { lat, lng },
          }));
        } else {
          console.error("Erro na API PlaceDetails: ", data.status);
        }
      })
      .catch((error) =>
        console.error("Erro na busca de detalhes do lugar: ", error)
      );
  };

  const handleSave = () => {
    const cpfExists = existingContacts.some(
      (existingContact) => existingContact.cpf === contact.cpf
    );

    if (cpfExists && !isEditing) {
      setCpfExistsError("Este CPF já está cadastrado.");
      return;
    }

    if (!contact.name || cpfError) return;
    onSave(contact);
  };

  return (
    <Paper sx={{ padding: 2, mb: 2 }}>
      <TextField
        label="Nome"
        fullWidth
        value={contact.name}
        onChange={(e) => setContact({ ...contact, name: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="CPF"
        fullWidth
        value={contact.cpf}
        onChange={handleCpfChange}
        onBlur={handleCpfBlur}
        disabled={isEditing}
        InputProps={{
          inputComponent: MaskedCpfInput,
        }}
        error={!!cpfError || !!cpfExistsError}
        helperText={cpfError || cpfExistsError}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Telefone"
        fullWidth
        type="number"
        value={contact.phone}
        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        sx={{ mb: 2 }}
      />
      <AddressSuggestions
        address={contact.address}
        onAddressChange={(address) =>
          setContact((prev) => ({ ...prev, address }))
        }
        onAddressSelect={handleAddressSelect}
      />
      <Button variant="contained" onClick={handleSave}>
        {isEditing ? "Salvar Alterações" : "Adicionar Contato"}
      </Button>
    </Paper>
  );
};

ContactForm.propTypes = {
  initialContact: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  existingContacts: PropTypes.array.isRequired,
};

export default ContactForm;
