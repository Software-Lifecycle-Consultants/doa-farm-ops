"use client";
import { createTheme } from '@mui/material/styles';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // Set your primary color
    },
    secondary: {
      main: '#FF4081', // Set your secondary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '__DM_Sans_6ff133',
        }
      }
    }
  },
  typography: {
    fontFamily: '__DM_Sans_6ff133', // Set your desired font family
  },
});

export default theme;
