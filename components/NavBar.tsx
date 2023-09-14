"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import logo from "../public/images/logo.png";
import DrawerComponent from "./DrawerComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";

const pages = [
  { label: "Home", route: "/" },
  { label: "Profile ", route: "/FarmerProfile" },
  { label: "Crops", route: "/AddOperationCost" },
];

const NavBar = () => {
  const [value, setValue] = React.useState("one");
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const navigationToScreens = (route: string) => {
    router.push(route);
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
                {/* <Image src={logo} width={142} height={50} alt="logo" /> */}
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
                >
                  English
                </Button>
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
                  }}
                >
                  Sign out
                </Button>
              </>
            )}
          </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
