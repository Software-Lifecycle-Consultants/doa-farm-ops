// Import necessary modules and components
"use client";
import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import {
  Visibility as Visibility,
  VisibilityOff as VisibilityOff,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@mui/icons-material";

// Export the sign-in component
export default function SignIn() {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevent default event handling for password visibility button
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Styling for the Box element
  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "3px solid #F1F1F1",
    background: "#FFFFFF",
    padding: "3vh", //  padding
    margin: "5vh auto", // margin
    maxWidth: "400px", // Max width for tablets
  };

  return (
    <Container component="main">
      {/* Main content container */}
      <Box
        sx={{
          ...boxStyles,
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome DOA Platform
        </Typography>

        {/* Sign-in form */}
        <Box
          component="form"
          noValidate
          sx={{ mt: 2, width: { xs: "100%", sm: "80%" } }} // Adjusted width for different screen sizes
        >
          <Typography>Email</Typography>
          {/* Email input field */}
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <OutlinedInput
              id="email"
              autoComplete="email"
              label="Email Address"
            />
          </FormControl>

          <Typography>Password</Typography>
          {/* Password input field with visibility toggle */}
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {/* Remember me and Forgot password options */}
          <Grid container>
            <Grid item xs={6} alignItems="center" justifyContent="flex-end">
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    value="remember"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: 12 }}>
                    Remember me
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href="#" variant="body2" sx={{ fontSize: 12 }}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>

          {/* Sign-in button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          {/* Link to sign-up page */}
          <Grid
            sx={{ padding: "5px" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            container
          >
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}