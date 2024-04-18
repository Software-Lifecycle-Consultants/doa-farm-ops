"use client";

import { Box, Link, Grid, IconButton, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const typography1Styles = {
  color: "#0C111F",
  fontFamily: "Inter",
  fontSize: { xs: "14px", sm: "16px", md: "24px" },
  lineHeight: "130%",
  fontStyle: "inter",
  letterSpacing: "2px",
  marginLeft: { xs: "26px", sm: "4px", md: "25px" },
  textAlign: { xs: "center", sm: "center", md: "left" },
};

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
};

const HomePageBanner: React.FC = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  return (

<Grid container sx={{ padding: 4, backgroundColor: 'white' }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'black',
          paddingRight: { xs: 0, md: 4,},
        }}
      >

        {/* <Box justifyContent="center" marginTop={2} marginLeft={2}>
          <Button variant="contained" sx={buttonContainedStyle}>
            <Typography
              sx={typography1Styles} // Apply h1 styles
            >
              How DoA Crop Data platform helps you
            </Typography> */}

            {/* button */}
            {/* <Typography marginLeft={4}>
              <Link href="#" color="#000">
                Reed More{" "}
              </Link>
            </Typography>
            <IconButton aria-label="arrow">
              <ArrowForwardIcon />
            </IconButton>
          </Button>
        </Box> */}

        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontFamily: { xs: 'Arial, sans-serif', md: 'inherit' },
            fontSize: { lg: '6rem',  xs:'1.5rem', md: 'inherit' },
          }}
        >
          About Bears
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            fontFamily: { xs: 'Arial, sans-serif', md: 'inherit' },
            fontSize: { xs: '16px', md: 'inherit' },
          }}
        >
          There are 3 types of bears in the world.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            alignSelf: 'flex-start',
            whiteSpace: 'nowrap',
          }}
        >
          Click Me
        </Button>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          paddingLeft: { xs: 0, md: 4 },
        }}
      >
<Image
  src="/images/home/logo_4x.webp"
  alt="Bear"
  width={300}
  height={300}
  style={{
    width: '100%',
    height: 'auto',
    marginTop: isMobileView ? theme.spacing(4) : 0,
    borderRadius: 16,
  }}
/>
      </Grid>
    </Grid>
  );
};

export default HomePageBanner;