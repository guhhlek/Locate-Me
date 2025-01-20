import { Box, TextField, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import PropTypes from "prop-types";

const InputSearch = ({ searchTerm, onSearchChange, toggleSortOrder }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        mb: 2,
      }}
    >
      <TextField
        label="Pesquisar"
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          "& .MuiInputBase-root": {
            height: "40px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "0px 14px",
          },
          "& .MuiInputLabel-root": {
            top: "-6px",
          },
          "& .MuiInputLabel-shrink": {
            top: "0",
          },
        }}
      />
      <IconButton
        onClick={toggleSortOrder}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        aria-label="Alterar ordem de classificação"
      >
        <SortIcon sx={{ color: "gray" }} />
      </IconButton>
    </Box>
  );
};

InputSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  toggleSortOrder: PropTypes.func.isRequired,
};

export default InputSearch;
