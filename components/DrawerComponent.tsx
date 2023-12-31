//Import necessary modules
"use client";
import {
  List,
  ListItemButton,
  ListItemIcon,
  Drawer,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { Language as LanguageIcon, ExitToApp as ExitToAppIcon, Login as LoginIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { logout, selectAuth } from "@/redux/authSlice";
import { useDispatch, useSelector  } from "react-redux";
import { CustomListItemText } from "@/Theme";
import { drawerIconStyles } from "@/styles/customStyles";

// Define the props for the component
interface DrawerComponentProps {
  changeLanguage: (code: string) => void;
  handleLanguageClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  selectedLanguageLabel: string; languageAnchorEl: (EventTarget & HTMLElement) | null;
  handleLanguageClose: () => void; selectedLanguage: string;
}
/**
 * Drawer component represents navigation menu for mobile view.
 * It handles navigation to homepage, profile, crops, login, and language selector.
 */

//Define pages for the navigation drawer component
// const pages = ["navBar.tabHome", "Profile", "Crops"];
const pages = [
  { id: 0, label: "navBar.tabHome", route: "./" },
  { id: 1, label: "navBar.tabProfile", route: "./farmer-profile" },
  { id: 2, label: "navBar.tabCrops", route: "./my-crops" },
];
const languages = [
  { label: "English", code: "en" },
  { label: "Sinhala", code: "si" },
  { label: "Tamil", code: "ta" },
];

/**
 * Drawer component represents navigation menu for mobile view.
 * It handles navigation to homepage, profile, crops, login, and language selector.
 */
const DrawerComponent: React.FC<DrawerComponentProps> = ({ changeLanguage, handleLanguageClick, selectedLanguageLabel, languageAnchorEl, handleLanguageClose, selectedLanguage }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState(false);

  // Fetch the authentication status from Redux store
  const { isAuthenticated } = useSelector(selectAuth);

  //Set navigation to screens from navigation bar
  const navigationToScreens = (id: number) => {
    setOpenDrawer(false)
    const page = pages.find((page) => page.id === id);
    if (page) {
      router.push(page.route);
    } else {
      router.push("/");
    }
  };

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
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#0E0E0E",
            width: { xs: "150px", sm: "168px" },
          },
        }}
      >
        {/* Render navigation items */}
        <List>
          {isAuthenticated && (
            <>
              {pages.map((page, index) => (
                <ListItemButton
                  onClick={() => navigationToScreens(page.id)}
                  key={index}
                >
                  <ListItemIcon>
                    <CustomListItemText
                      // style={CustomListItemText}
                      primary={t(page.label)}
                    ></CustomListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))}
              <ListItemButton onClick={handleLogout}>
                <CustomListItemText>Sign Out</CustomListItemText>
                <ExitToAppIcon sx={drawerIconStyles} />
              </ListItemButton>
            </>
          )}

          {!isAuthenticated && (
            <ListItemButton onClick={handleLogin}>
              <CustomListItemText>Sign In</CustomListItemText>
              <LoginIcon sx={drawerIconStyles} />
            </ListItemButton>
          )}

          <ListItemButton onClick={handleLanguageClick}>
            <CustomListItemText>{selectedLanguageLabel}</CustomListItemText>
            <LanguageIcon sx={drawerIconStyles} />
          </ListItemButton>
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
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "#000", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
