import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from "@mui/material/Box";







export default function RowAndColumnSpacing() {
  return (
    <Grid>
      <Box marginLeft={100} display="flex">
        <img
          src="https://logowik.com/content/uploads/images/sri-lanka-government8434.logowik.com.webp"
          alt="random"
          width="250"
          height="175"
        />
      </Box>
      <Grid
        container
        spacing={2}
        columns={16}
        marginLeft={32}

        // bgcolor={"black"}
      >
        <Grid xs={6}>
          <Grid xs={16}>
            <Box component="section" sx={{ border: "1px" }} marginTop={8}>
              How DoA Crop Data platform helps you
              <Button color={"secondary"} size="small">
                Read More
                <IconButton aria-label="arrow">
                  <ArrowForwardIcon />
                </IconButton>
              </Button>
            </Box>

            <Typography
              fontSize={48}
              fontFamily="cursive"
              fontStyle={"bold"}
              gutterBottom
              marginTop={2}
              textAlign="left"
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
            >
              The Department of Agriculture (DOA) functions under the Ministry
              of Agriculture and is one of the largest government departments
              with a high profile community of agricultural scientists and a
              network of institutions covering different agro ecological regions
              island wide
            </Typography>
            {/* Button class */}
            <Grid marginTop={6}>
              <Button variant="contained" color="success">
                Department of Agriculture Digitzation effort.
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* image goes here */}

        <Grid xs={10} paddingLeft={8} paddingTop={8} marginTop={2}>
          <img
            src="https://casamiatours.com/wp-content/uploads/2021/03/Schermata-2021-03-19-alle-19.31.44-600x449.png"
            alt="random"
            width="550"
            height="450"
          />
        </Grid>
        <Box marginLeft={50} marginTop={4} component="section" sx={{ p: 4 }}>
          <h1>Open source development by Software Consultants</h1>
        </Box>
      </Grid>
    </Grid>
  );
}
