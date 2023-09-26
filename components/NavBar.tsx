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
} from "@mui/material";
import Image from "next/image";
import logo from "../public/images/logo.png";
import DrawerComponent from "./DrawerComponent";
import { useRouter } from "next/navigation";
import {Language as LanguageIcon, ExitToApp as ExitToAppIcon} from "@mui/icons-material";
import { ChangeEvent } from 'react';

//Define the pages and routes for navigation
const pages = [
  { label: "Home", route: "./" },
  { label: "Profile ", route: "./farmer-profile" },
  { label: "Crops", route: "./my-crops" },
];
//Define languages for the language selector button
const languages = [
  { label: "English", code: "en" },
  { label: "Sinhala", code: "si" },
  { label: "Tamil", code: "ta" },
];


/**
 * Navbar handles navigation to homepage, profile, crops, login, and language selector. 
 */
const NavBar = () => {
  const [value, setValue] = useState(0);
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | EventTarget & HTMLElement>(null);


  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

//Function to handle tab change
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
//Function to navigate to screens
  const navigationToScreens = (route: string) => {
    router.push(route);
  };
//Function to handle language selector
  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };
//Function to close language selector
  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };
//Function to handle language change
  const changeLanguage = (code : string) => {
    // Implement language change logic here
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
            {/* Call the drawer component for mobile views */}
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
              {/* Language selector button */}
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
              {/* Language selector */}
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
              {/* Signout button */}
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
