import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

const ContactHeader = ({ onAdd }) => (
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
    <IconButton onClick={onAdd}>
      <AddIcon sx={{ color: "white" }} />
    </IconButton>
  </Box>
);

ContactHeader.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default ContactHeader;
