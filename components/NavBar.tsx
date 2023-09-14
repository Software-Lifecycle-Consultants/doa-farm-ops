"use client";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import logo from "../public/images/logo.png";
import DrawerComponent from "./DrawerComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageIcon from "@mui/icons-material/Language";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const pages = [
  { label: "Home", route: "/" },
  { label: "Profile ", route: "/FarmerProfile" },
  { label: "Crops", route: "/AddOperationCost" },
];

const languages = [
  { label: "English", code: "en" },
  { label: "Sinhala", code: "si" },
  { label: "Tamil", code: "ta" },
];

const NavBar = () => {
  const [value, setValue] = useState("one");
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigationToScreens = (route) => {
    router.push(route);
  };

  const handleLanguageClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (code) => {
    // Implement language change logic here
    console.log(`Changing language to ${code}`);
    handleLanguageClose();
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          color: "#000000",
          paddingTop: "20px",
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Toolbar disableGutters>
          <Box sx={{ width:"18vh", height:"7vh", paddingLeft:'2vh'}}>
            <Image src={logo} width={142} height={50} alt="logo" />
          </Box>

          {isMatch ? (
            <>
              <DrawerComponent />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                value={value}
                onChange={handleChange}
                textColor="inherit"
                indicatorColor="secondary"
                TabIndicatorProps={{
                  style: { backgroundColor: "#000", width:'90px' },
                }}
              >
                {pages.map((page, index) => (
                  <Tab
                    key={index}
                    label={page.label}
                    onClick={() => navigationToScreens(page.route)}
                  />
                ))}
              </Tabs>

              <Button
                variant="text"
                sx={{
                  color: "#000000",
                  textTransform: "none",
                  margin: "5px",
                  fontSize: "16px",
                  marginLeft: "auto",
                }}
                onClick={handleLanguageClick}
              >
                English<LanguageIcon sx={{ marginLeft: "5px" }} />
                
              </Button>

              <Menu
                anchorEl={languageAnchorEl}
                open={Boolean(languageAnchorEl)}
                onClose={handleLanguageClose}
              >
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.label}
                  </MenuItem>
                ))}
              </Menu>

              <Button
                variant="text"
                sx={{
                  width: "121px",
                  height: "47px",
                  padding: "10px 25px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "100px",
                  background: "#FFF",
                  color: "#000000",
                  textTransform: "none",
                  fontSize: "16px",
                  marginLeft: "0px",
                  marginRight: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                Sign Out <ExitToAppIcon sx={{ marginLeft: "5px" }} />
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
