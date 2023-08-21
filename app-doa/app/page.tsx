import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import SignIn from '@/pages/SignIn';


export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SignIn/>
    </Box>
  );
}
