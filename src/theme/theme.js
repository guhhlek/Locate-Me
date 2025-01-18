// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2ec7d6",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#2ec7d6",
    },
  },
});

export default theme;
