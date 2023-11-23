"use client";
// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
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
import { Language as LanguageIcon, ExitToApp as ExitToAppIcon, Login as LoginIcon } from "@mui/icons-material";
import { ChangeEvent } from 'react';
import { logout, selectAuth } from "@/redux/authSlice";
import { useDispatch, useSelector  } from "react-redux";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import i18n from '../app/config/i18n';

//Define the pages and routes for navigation
const pages = [
  { label: "navBar.tabHome", route: "./" },
  { label: "navBar.tabProfile", route: "./farmer-profile" },
  { label: "navBar.tabCrops", route: "./my-crops" },
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
  // Define state variable for menu anchor element
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | EventTarget & HTMLElement>(null);

  // Define a state variable to hold the selected language code
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  // Fetch the authentication status from Redux store
  const { isAuthenticated } = useSelector(selectAuth);

  // Access the t function from useTranslation
  const { t } = useTranslation();

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

  // Function to handle language change
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code).then(() => {
      // Ensure the language change is complete before updating UI
      handleLanguageClose();
      // Update the selected language in the state
      setSelectedLanguage(code);
    });
  };

  // Find the selected language label, or use "Unknown Language" if not found
  const selectedLanguageLabel = languages.find((lang) => lang.code === selectedLanguage)?.label ?? "Unknown Language";

  // Define a function to handle user logout.
  const handleLogout = () => {
    router.push('./');
    // Simulate a logout action by dispatching the 'logout' action from 'authSlice'.
    dispatch(logout());
  };
  // Define a function to handle user login.
  const handleLogin = () => {
    router.push('./login');
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
          <Box sx={{ width: "18vh", height: "7vh", paddingLeft: '2vh' }}>
            <Image src={logo} width={142} height={50} alt="logo" />
          </Box>
  
          {isMatch ? (
            <>
              {/* Call the drawer component for mobile views */}
              {/* DrawerComponent with various props */}
              <DrawerComponent
                changeLanguage={changeLanguage}
                handleLanguageClick={handleLanguageClick}
                selectedLanguageLabel={selectedLanguageLabel}
                languageAnchorEl={languageAnchorEl}
                handleLanguageClose={handleLanguageClose}
                selectedLanguage={selectedLanguage}
              />
            </>
          ) : (
            <>
              {isAuthenticated && (
                <Tabs
                  sx={{ marginLeft: "auto" }}
                  value={value}
                  onChange={handleChange}
                  textColor="inherit"
                  indicatorColor="secondary"
                  TabIndicatorProps={{
                    style: { backgroundColor: "#000", width: '90px' },
                  }}
                >
                  {pages.map((page, index) => (
                    <Tab
                      key={index}
                      label={t(page.label)}
                      onClick={() => navigationToScreens(page.route)}
                    />
                  ))}
                </Tabs>
              )}
  
              {/* Language selector button */}
              <Button
                variant="text"
                sx={{
                  color: "#000000",
                  textTransform: "none",
                  margin: "5px",
                  marginLeft: "auto",
                }}
                onClick={handleLanguageClick}
              >
                {selectedLanguageLabel}
                <LanguageIcon sx={{ marginLeft: "5px" }} />
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
                    selected={selectedLanguage === lang.code} // Set 'selected' prop
                  >
                    {lang.label}
                  </MenuItem>
                ))}
              </Menu>
  
              {/* SignOut button */}
              {isAuthenticated && (
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    background: "#FFF",
                    color: "#000000",
                    textTransform: "none",
                    marginLeft: "0px",
                    marginRight: "5px",
                    whiteSpace: "nowrap",
                  }}
                  onClick={handleLogout}
                >
                  Sign Out <ExitToAppIcon sx={{ marginLeft: "5px" }} />
                </Button>
              )}
              {!isAuthenticated && (
                // SignIn button
                <Button
                  variant="text"
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    background: "#FFF",
                    color: "#000000",
                    textTransform: "none",
                    marginLeft: "0px",
                    marginRight: "5px",
                    whiteSpace: "nowrap",
                  }}
                  onClick={handleLogin}
                >
                  Sign In <LoginIcon sx={{ marginLeft: "5px" }} />
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}  

export default NavBar;
