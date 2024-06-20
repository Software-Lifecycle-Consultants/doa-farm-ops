"use client";

import React, { ReactNode } from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

// Define the type for the children prop
interface ItemProps {
  children: ReactNode;
}

// Define the Item component with proper typing
const Item: React.FC<ItemProps> = ({ children }) => (
  <Box sx={{marginBottom: '14px' }}>
    {children}
  </Box>
);

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {     // Goback button function
    router.back();
  };

  const handlelogin = () => {     // Profile button function
    router.push('/login');
  };

// 404
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: '20px',
      }}
    >
      <Grid container spacing={1} sx={{ alignItems: 'center', height: '100%' }}>
        <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '6rem', md: '10rem', sm: '10rem' }, fontWeight: 'bold', color: '#3665C5' }}
          >
            404
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, ml: { md: 8 } }}>
            <Typography variant="h3" sx={{ mt: 2, mb: 2, fontFamily: 'DM Sans' }}>
              Oops&#44;
            </Typography>
            <Typography variant="h3" sx={{ mb: 4 }}>
              Page <Box component="span" sx={{ color: '#3665C5' }}>Not</Box> Found&#33;
            </Typography>
            <Typography variant="body1" sx={{ mb: 10 }}>
              <Box sx={{ width: { md: '73%', sm: '50%' }, textAlign: { sm: 'center', md: 'left' }, display: { sm: 'inline-flex', md: 'block' } }}>
                <Box
                  sx={{
                    flexDirection: 'column',

                  }}
                >
                  <Item>Uh oh we can&#39;t seem to find the page you&#39;re looking for.</Item>
                  <Item>Try going back to the previous page or contact us for more information.</Item>
                </Box>
              </Box>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px', alignItems: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  width: '150px',
                  borderRadius: '20px',
                  backgroundColor: '#3665C5',
                  '&:hover': {
                    backgroundColor: '#2c54a3',
                  },
                }}
                onClick={handleGoBack}
              >
                Go Back
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: '150px',
                  borderRadius: '20px',
                  backgroundColor: '#3665C5',
                  '&:hover': {
                    backgroundColor: '#2c54a3',
                  },
                }}
                onClick={handlelogin}
              >
                Profile
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
