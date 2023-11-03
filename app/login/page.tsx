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
import { useDispatch } from "react-redux";
import { login, setPassword, setUsername } from "@/redux/authSlice";
import { useTranslation } from 'react-i18next';
import i18n from "../config/i18n";// Import the i18n instance

// Export the sign-in component
export default function SignIn() {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Initialize the 't' function to access translations within the 'login' namespace.
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // State to manage email and password validation
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const dispatch = useDispatch();

  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevent default event handling for password visibility button
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Define a function to handle user login.
  const handleLogin = () => {
    // Simulate a login action by creating a user data object.
    const userData = { username: formData.email, password: formData.password }; // Use email as username for simplicity
    // Dispatch the 'login' action from the 'authSlice' with the user data.
    dispatch(login(userData));
  };

  // Function to handle email input change and validation
  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const email = event.target.value;
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    setEmailValid(isEmailValid(email));
  };

  // Function to handle password input change and validation
  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const password = event.target.value;
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    setPasswordValid(isPasswordValid(password));
  };

  // Function to validate email format
  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Function to validate password length
  const isPasswordValid = (password: string | any[]) => {
    return password.length >= 6; // Set a minimum password length requirement
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
          {/* Display a translated 'welcome' message based on the selected language. */}
          {i18n.t("login.txtWelcome")}
        </Typography>

        {/* Sign-in form */}
        <Box
          component="form"
          noValidate
          sx={{ mt: 2, width: { xs: "100%", sm: "80%" } }} // Adjusted width for different screen sizes
        >
          <Typography>{i18n.t("login.lblEmail")}</Typography>
          {/* Email input field */}
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
            <OutlinedInput
              id="email"
              autoComplete="email"
              placeholder={i18n.t("login.hintTxtEmail")}
              value={formData.email}
              onChange={(e) => handleChangeEmail(e, "email")}
              required
            />
            {!emailValid && (
              <Typography variant="caption" color="error">
                Invalid email address
              </Typography>
            )}
          </FormControl>

          <Typography>{i18n.t("login.lblPassword")}</Typography>
          {/* Password input field with visibility toggle */}
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
            <OutlinedInput
              id="outlined-adornment-password"
              value={formData.password}
              onChange={(e) => handleChangePassword(e, "password")}
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
              placeholder={i18n.t("login.hintTxtPassword")}
            />
            {!passwordValid && (
              <Typography variant="caption" color="error">
                Password must be at least 6 characters long
              </Typography>
            )}
          </FormControl>

          {/* Remember me and Forgot password options */}
          <Grid container>
            <Grid item xs={6} alignItems="center" justifyContent="flex-end">
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon />}
                    value="remember"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="caption">
                    {i18n.t("login.txtRememberMe")}
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
              <Link href="#" variant="caption">
                {i18n.t("login.txtForgotPassword")}
              </Link>
            </Grid>
          </Grid>

          {/* Sign-in button */}
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
            disabled={!emailValid || !passwordValid}
          >
            {i18n.t("login.capBtnLogin")}
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
              {i18n.t("login.txtNoAccount")}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
