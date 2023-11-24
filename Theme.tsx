"use client";
import { ListItemText } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // Set your primary color
    },
    secondary: {
      main: "#C2C2C2", // Set your secondary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "__DM_Sans_6ff133",
        },
      },
    },
  },
  typography: {
    fontFamily: "__DM_Sans_6ff133",
    body1: {
      color: "#000",
      lineHeight: "normal",
      fontWeight: "500 ",
    },
    caption: {
      lineHeight: "normal",
      color: "#9D9D9D",
    },
    // Add more Typography variants and customizations as needed
  },
});

export const CustomBox1 = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "3px solid #F1F1F1",
  background: "#FFFFFF",
  padding: "3vh", //  padding
  margin: "5vh auto", // margin
}));

export const CustomBox2 = styled("div")(({ theme }) => ({
  display: "flex",
  background: "#FFFFFF",
  border: "3px solid #F1F1F1",
  padding: "3vh",
  Width: "90%",
  gap: "53px",
  borderRadius: "12px",
}));

export const CustomListItemText = styled(ListItemText)({
  "& .MuiTypography-body1": {
    color: "#FFF",
  },
});

export default theme;
