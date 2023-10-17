//Import necessary modules
"use client";
import {
  List,
  ListItemButton,
  ListItemIcon,
  Drawer,
  ListItemText,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

/**
 * Drawer component represents navigation menu for mobile view.
 * It handles navigation to homepage, profile, crops, login, and language selector.
 */

//Define pages for the navigation drawer component
const pages = ["Home", "Profile", "Crops"];


const DrawerComponent = () => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  
  //Set navigation to screens from navigation bar
  const navigationToScreens = (id: string) => {
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
            <ListItemButton onClick={() => setOpenDrawer(false)} key={index}>
              <ListItemIcon>
                <ListItemText
                  sx={{ color: "#FFF" }}
                  onClick={(e) => navigationToScreens(page)}
                >
                  {page}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
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
