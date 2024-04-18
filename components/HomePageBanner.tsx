"use client";
import React from "react";
import {
  Link,
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

/* Button style for contained variant */
const buttonContainedStyle = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "100px",
  textTransform: "none",
  fontWeight: "Bold",
  color: "#0C111F",
  background: "var(--l-2, linear-gradient(135deg, #FFFDFD 50%, #90EA8E 0%))",
  // Customize sizes for web and tablet view
  "@media (max-width: 1024px)": {
    padding: "10px 16px",
  },
  // Customize sizes for mobile view
  "@media (max-width: 767px)": {
    fontSize: "12px",
    padding: "6px 8px",
    margin: "3px",
    marginLeft: { xs: "2px", sm: "2px", md: "25px"},
  },
};

const HomePageBanner: React.FC = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container sx={{ padding: 4, backgroundColor: "white" }}>
      {/* Emblem Image content */}
      <Grid
        item
        xs={12}
        md={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Image
          src="/images/home/emblem.png"
          alt="test"
          width={277.758}
          height={185.951}
          style={{
            width: "auto",
            height: "75%",
            flexShrink: 0,
          }}
        />
      </Grid>

      {/* Text content */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "black",
          paddingRight: { xs: 0, md: 4 },
        }}
      >
        {/* Reed More button content */}
        <Button variant="contained" sx={buttonContainedStyle}>
          <Typography
            variant="button"
            marginRight={4}
            sx={{
              fontWeight: "semi-bold",
              fontFamily: { xs: "inter", md: "inherit" },
              fontSize: { lg: "1.5rem", xs: "0.75rem", md: "inherit" },
              textAlign: { xs: "center", sm: "center", md: "left" },
            }}
          >
            How DoA Crop Data platform helps you....{" "}
            <Link href="#" color="#000">
              Reed More
            </Link>
          </Typography>
        </Button>

        {/* Topic Text content */}
        <Typography
          variant="h1"
          marginTop={4}
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontFamily: { xs: "istok web", md: "istok web" },
            fontSize: { lg: "4rem", xs: "1.5rem", md: "inherit" },
            textAlign: { xs: "center", sm: "center", md: "left" },
          }}
        >
          Update farmer crop costs to help us manage Agriculture sector
          development better
        </Typography>

        {/* Description Text content */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            fontFamily: { xs: "inter", md: "inter" },
            fontSize: { lg: "1.5rem", xs: "0.75rem", md: "inherit" },
            textAlign: { xs: "center", sm: "center", md: "left" },
          }}
        >
          The Department of Agriculture (DOA) functions under the Ministry of
          Agriculture and is one of the largest government departments with a
          high profile community of agricultural scientists and a network of
          institutions covering different Argo ecological regions island wide
        </Typography>

        {/* Department of Agriculture Digitization efforts button content */}
        <Button variant="contained" sx={buttonContainedStyle}>
          <Typography
            variant="button"
            marginRight={4}
            sx={{
              fontWeight: "bold",
              fontFamily: { xs: "inter", md: "inter" },
              fontSize: { lg: "1.5rem", xs: "0.75rem", md: "inherit" },
              textAlign: { xs: "center", sm: "center", md: "left" },
            }}
          >
            Department of Agriculture Digitization efforts
          </Typography>
        </Button>
      </Grid>

      {/* Main Image  */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          paddingLeft: { xs: 0, md: 4 },
        }}
      >
        <Image
          src="/images/home/Logo-preview.png"
          alt="test"
          width={300}
          height={300}
          style={{
            width: "75%",
            height: "auto",
            marginTop: isMobileView ? theme.spacing(4) : 0,
            borderRadius: 16,
          }}
        />
      </Grid>

      {/* Open source development by Software Consultants */}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        marginTop={4}
        container
        justifyContent="center"
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontFamily: { xs: "Arial, sans-serif", md: "inherit" },
            fontSize: { lg: "2rem", xs: "1.0rem", md: "inherit" },
            textAlign: { xs: "center", sm: "center", md: "left" },
          }}
        >
          Open source development by&nbsp;
          <Link href="#" color="#02A79D">
            Software Consultants
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomePageBanner;
