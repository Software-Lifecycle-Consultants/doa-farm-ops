// Import necessary modules and components
"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
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
// import { login} from "@/redux/loginSlice";
import { useTranslation } from 'react-i18next';
import i18n from "../config/i18n";// Import the i18n instance
import { useRouter } from "next/navigation";
import { CustomBox1 } from "@/Theme";
import { toast } from "react-toastify";
import { login } from "@/redux/authSlice";
import { AppDispatch} from "@/redux/store";
import { ZodErrors } from "@/components/ZodErrors";
import { schemaLogin } from '@/schemas/login.schema';
import { validateFormData } from '@/utils/validation';

// Export the sign-in component
export default function SignIn() {

  const [responseData, setResponseData] = useState(null);
  const [validationErrors, setValidationErrors] = useState<any>(null);

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Initialize the 't' function to access translations within the 'login' namespace.
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  interface FormData {
    email: string;
    password: string;
  }

  const router = useRouter();
  const dispatch:AppDispatch = useDispatch();

  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevent default event handling for password visibility button
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Define a function to handle user login.
  const handleLogin = async () => {
    // const validation = schemaLogin.safeParse(formData);
    const { valid, errors }= validateFormData(schemaLogin,formData);

    if (!valid) {  
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);
      if (response && response.status === 200) {
        console.log("response user data------------", response);
        setResponseData(response.data);
        dispatch(login(response.data));
        router.push("./");
        toast.success("Login Success");
      } else if (response && response.status === 400) {
        console.error('Failed to fetch data');
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Login Failed");
    }

  };

  // Function to handle email input change and validation
  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      email: event.target.value
    });
    setValidationErrors(null);
  };

  // Function to handle password input change and validation
  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      password: event.target.value });
    setValidationErrors(null);
  };

  return (
    <Container component="main">
      {/* Main content container */}
      <CustomBox1 sx={{ maxWidth: "400px" }}>
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
              onChange={handleChangeEmail}
              required
            />
              <ZodErrors error={validationErrors?.email || []} />
          </FormControl>

          <Typography>{i18n.t("login.lblPassword")}</Typography>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
            <OutlinedInput
              id="outlined-adornment-password"
              value={formData.password}
              onChange={handleChangePassword}
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
              <ZodErrors error={validationErrors?.password || []} />
          </FormControl>

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
            <Link href="register" variant="body2">
              {i18n.t("login.txtNoAccount")}
            </Link>
          </Grid>
        </Box>
      </CustomBox1>
    </Container>
  );
}
