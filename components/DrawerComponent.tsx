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
import {Language as LanguageIcon} from "@mui/icons-material";

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
const pages = ["Home", "Profile", "Crops"];
const languages = [
  { label: "English", code: "en" },
  { label: "Sinhala", code: "si" },
  { label: "Tamil", code: "ta" },
];

/**
 * Drawer component represents navigation menu for mobile view.
 * It handles navigation to homepage, profile, crops, login, and language selector.
 */
const DrawerComponent : React.FC<DrawerComponentProps>= ({changeLanguage,handleLanguageClick,selectedLanguageLabel,languageAnchorEl,handleLanguageClose,selectedLanguage}) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  
  //Set navigation to screens from navigation bar
  const navigationToScreens = (id: string) => {
    setOpenDrawer(false)
    if (id === "Profile") {
      router.push("/farmer-profile");
    } else if (id === "Crops") {
      router.push("/my-crops");
    } else {
      router.push("/");
    }
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
          {pages.map((page, index) => (
            <ListItemButton onClick={() => navigationToScreens(page)} key={index}>
              <ListItemIcon>
                <ListItemText
                  sx={{ color: "#FFF" }}
                >
                  {page}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          <ListItemButton
                onClick={handleLanguageClick}
              ><ListItemText
              sx={{ color: "#FFF" }}
            >
              {selectedLanguageLabel}
            </ListItemText>
                <LanguageIcon sx={{ marginLeft: "5px",color: "#FFF" }} />  
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
