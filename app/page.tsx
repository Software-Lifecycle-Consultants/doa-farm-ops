import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from "@mui/material/Box";
import Image from "next/image";


export default function HomePage() {
  return (
    <Grid container spacing={2}>
      {/* Logo */}
      <Grid item xs={12} sm={12} md={12} marginLeft={6}>
        <Box display="flex" justifyContent="center">
          <Image
            src="/images/home/emblem.webp"
            alt="random"
            width="250"
            height="175"
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={6} justifyContent={"center"}>
        <Box
          marginRight={4}
          my={4}
          height={61}
          width="full"
          alignItems="center"
          display="flex"
          p={1}
          sx={{ border: "2px solid black" }}
          borderRadius={2}
          marginLeft={4}
        >
          How DoA Crop Data platform helps you
          <Box justifyContent="center">
            <Button color={"secondary"}>
              Read More
              <IconButton aria-label="arrow">
                <ArrowForwardIcon />
              </IconButton>
            </Button>
          </Box>
        </Box>

        <Typography
          fontSize={32}
          fontFamily="cursive"
          fontStyle={"bold"}
          gutterBottom
          marginTop={2}
          textAlign="left"
          margin={4}
        >
          Update farmer crop costs to help us manage Agriculture sector
          development better
        </Typography>
        <Typography
          fontSize={20}
          fontFamily="system-ui"
          fontStyle={"italic"}
          gutterBottom
          marginTop={4}
          marginLeft={4}
        >
          The Department of Agriculture (DOA) functions under the Ministry of
          Agriculture and is one of the largest government departments with a
          high profile community of agricultural scientists and a network of
          institutions covering different Agro ecological regions island wide
        </Typography>

        <Box justifyContent="center" marginLeft={4} marginTop={4}>
          <Button sx={{ border: "2px solid black" }}>
            Department of Agriculture Digitization efforts
          </Button>
        </Box>
      </Grid>

      {/* Picture of a farmer */}

      <Grid item xs={12} sm={6} md={6}>
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Image
            src="/images/home/logo_4x.webp"
            alt="Farmer"
            width={550}
            height={550}
          />
        </Box>
      </Grid>

      {/* Open source development by Software Consultants */}
      <Grid item xs={12} sm={12} md={12} marginLeft={4}>
        <Box display="flex" justifyContent="center">
          <Typography
            fontSize={20}
            fontFamily="system-ui"
            fontStyle={"italic"}
            textAlign={"center"}
            gutterBottom
            marginTop={4}
            marginLeft={4}
          >
            Open source development by Software Consultants
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
