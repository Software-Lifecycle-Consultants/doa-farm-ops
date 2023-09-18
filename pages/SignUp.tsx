import * as React from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

/**
 * SignUp page allows to users to register to the system
 */

export default function SignUp() {
  // Styles for the main content container
  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "3px solid #F1F1F1",
    background: "#FFFFFF",
    padding: "3vh",
    margin: "5vh auto",
    maxWidth: "400px",
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Main content container */}
      <Box
        sx={{
          ...boxStyles,
        }}
      >
        {/* Sign-up form */}
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Register Your Account
          </Typography>
          <Typography component="h1" variant="subtitle1" gutterBottom>
            Fill the details bellow to create your account
          </Typography>
        </Box>
        {/*form fields */}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>First Name</Typography>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                placeholder="Enter first name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Last Name</Typography>
              <TextField
                required
                fullWidth
                id="lastName"
                placeholder="Enter last name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Email Address</Typography>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="Enter email address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Phone Number</Typography>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                placeholder="Enter phone number"
                name="phoneNumber"
                autoComplete="phoneNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>District</Typography>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="Enter Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            {/* Terms & Conditions Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="By signing up you agree to our Terms & Conditions and Privacy Policy"
              />
            </Grid>
          </Grid>
          {/* Register Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {/* Link to Sign In */}
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
