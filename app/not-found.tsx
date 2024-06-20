"use client";

import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

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
        height: '100vh',
        maxHeight: '100px',
      }}
    >  
      <Grid container spacing={18} sx={{ alignItems: 'center', height: '100%' }}>
        <Grid item xs={12} md={5}>
          <Typography variant="h1" sx={{ fontSize: '9rem', textAlign: 'right', fontWeight: 'bold', color: '#3665C5' }}>
            404
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ textAlign: 'left', ml: 2 }}>
            <Typography variant="h3" sx={{ mt: 2 , fontFamily:'DM Sans' }}>
              Oops,
            </Typography>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Page <Box component="span" sx={{ color: '#3665C5' }}>Not</Box> Found!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Uh oh we can't seem to find the page you're looking for.
              <Box sx={{ color: "white", width:"50px" , height:"15px"}}></Box>
              <Box sx={{ width:"400px" }}> Try going back to the previous page or contact us for more
              information. 
              </Box>
              <Box sx={{ color: "white", width:"50px" , height:"20px"}}></Box>
            </Typography>
            <Box sx={{ display: 'flex', gap: '50px' }}>
              <Button
                variant="contained"
                sx={{
                  width: '131px',
                  height: '46px',
                  borderRadius: '20px',
                  padding: '12px 0',
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
                  width: '131px',
                  height: '46px',
                  borderRadius: '20px',
                  padding: '12px 0',
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
