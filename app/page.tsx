import React from "react";
import { Grid, Button, Box, Typography, IconButton, Link } from "@mui/material";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const typographyh1Styles = {
  color: "#0C111F",
  fontFamily: "Inter",
  fontSize: { xs: "16px", sm: "22px", md: "24px" },
  lineHeight: "130%",
  fontStyle: "normal",
  letterSpacing: "2px",
  marginLeft: { xs: "26px", sm: "4px", md: "25px" },
};

const typographyh2Styles = {
  color: "#0C111F",
  fontFamily: "Istok Web",
  fontSize: { xs: "18px", sm: "22px", md: "48px" },
  lineHeight: "130%",
  fontStyle: "bold",
  letterSpacing: "2px",
  marginLeft: { xs: "26px", sm: "4px", md: "25px" },
};

const typographyh3Styles = {
  color: "#0C111F",
  fontFamily: "Istok Web",
  fontSize: { xs: "18px", sm: "22px", md: "24px" },
  lineHeight: "130%",
  fontStyle: "normal",
  letterSpacing: "2px",
  
  
};

const typographyh4Styles = {
  color: "#0C111F",
  fontFamily: "Istok Web",
  fontSize: { xs: "16px", sm: "22px", md: "24px" },
  lineHeight: "130%",
  fontStyle: "inter",
  letterSpacing: "2px",
};


const buttonContainedStyle = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "100px",
  textTransform: "none",
  fontWeight: "bold",
  color: "#0C111F",
  background: "var(--l-2, linear-gradient(135deg, #FFFDFD 0%, #90EA8E 100%))",
  // Customize sizes for web and tablet view
  "@media (max-width: 1024px)": {
    padding: "10px 16px",
  },
  // Customize sizes for mobile view
  "@media (max-width: 767px)": {
    fontSize: "12px",
    padding: "6px 8px",
    margin: "3px",
    marginLeft: { xs: "2px", sm: "2px", md: "25px" },
  },
};


const Index = () => {
  return (
    <Grid container spacing={2}>
      {/* Logo */}
      <Grid item xs={12} md={12}>
        <Box
          ml={{ xs: "40px", sm: "40px", md: "740px" }} // Adjust margin for mobile and desktop
        >
          <Image
            src="/images/home/emblem.webp"
            alt="test"
            width={277}
            height={185}
            style={{
              width: "277",
              height: "185",
              flexShrink: 0,
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={8}>
        <Box justifyContent="center" marginTop={12} marginLeft={2}>
          <Button variant="contained" sx={buttonContainedStyle}>
            <Typography
              sx={typographyh1Styles} // Apply h1 styles
            >
              How DoA Crop Data platform helps you
            </Typography>

            {/* button */}

            <Typography marginLeft={4}>
              <Link href="#" color="primary">
                Reed More{" "}
              </Link>
            </Typography>
            <IconButton aria-label="arrow">
              <ArrowForwardIcon />
            </IconButton>
          </Button>
        </Box>

        <Typography
          sx={typographyh2Styles} // Apply h2 styles
          marginTop={2}
          textAlign="left"
          margin={4}
        >
          Update farmer crop costs to help us manage Agriculture sector
          development better
        </Typography>

        <Typography
          sx={typographyh4Styles} // Apply h4 styles
          marginTop={2}
          textAlign="left"
          margin={4}
        >
          The Department of Agriculture (DOA) functions under the Ministry of
          Agriculture and is one of the largest government departments with a
          high profile community of agricultural scientists and a network of
          institutions covering different Agro ecological regions island wide
        </Typography>

        <Box justifyContent="center" marginLeft={4} marginTop={4}>
          <Button variant="contained" sx={buttonContainedStyle}>
            <Typography sx={typographyh3Styles}>
              Department of Agriculture Digitization efforts
            </Typography>
          </Button>
        </Box>
      </Grid>

      {/* Picture of a farmer */}

      <Grid item xs={8} md={2} marginTop={34}>
        <Box
          sx={{
            
            width: { xs: "280px", sm: "90px", md: "690px" }, // Adjust size for mobile and desktop
            height: { xs: "80px", sm: "90px", md: "90px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          mr={{ xs: "16px", md: "32px" }}
        >
          {/* Heart icon */}
          <Image
            src="/images/home/logo_4x.webp"
            width={574}
            height={625}
            alt="wallet"
            style={{
              flexShrink: 0,
            }}
          />
        </Box>
      </Grid>
      {/* Open source development by Software Consultants */}
      <Grid item xs={12} sm={12} md={12}>
        <Box display="flex" justifyContent="center" marginTop={6}>
          <Typography
            variant="caption"
            textAlign="center"
            fontSize={20}
            sx={{ opacity: 20 }}
          >
            Open source development by&nbsp;
            <Link href="#" color="primary">
              Software Consultants
            </Link>
            .
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Index;
