"use client"
import React, { useState } from "react";
import axios from 'axios';
import {
  Button,
  TextField,
  FormControlLabel,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  RadioGroup,
  Radio
} from "@mui/material";
import {
  Visibility as Visibility,
  VisibilityOff as VisibilityOff,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n"; // Import the i18n instance
import { CustomBox1 } from "@/Theme";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { register } from "@/redux/userSlice";
import { z } from 'zod';
import { ZodErrors } from "@/components/ZodErrors";
import { userRegisterSchema } from "@/schemas/user.schema";
import { validateFormData } from '@/utils/validation';
/**
 * SignUp page allows to users to register to the system
 */


export default function SignUp() {

  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  // State for the form data
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    nic: "",
    role: "",
    address: "",
    password: ""
  });

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nic: string;
    role: string;
    address: string;
    password: string;
  }

  // State variable to store validation error messages for each form field
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({});

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Function to handle changes in form fields
  const handleChangeUserRegister = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: event.target.value,
    }));
  };


  // Function to handle user registration
  const handleOnClickNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission
    // const validation = userRegisterSchema.safeParse(formData);
    const { valid, errors }= validateFormData(userRegisterSchema,formData);
    if (!valid) {  
      setValidationErrors(errors);
      return; // Stop execution if validation fails
    }
    try {
      // Dispatch the register action from userSlice
      const action = register(formData);
      dispatch(action);
      router.push("/additional-reg-details");

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Prevent default event handling for password visibility button
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Main content container */}
      <CustomBox1 sx={{ maxWidth: "400px" }}>
        {/* Sign-up form */}
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            {i18n.t("register.txtRegisterAccount")}
          </Typography>
          <Typography component="h1" variant="subtitle1" gutterBottom>
            {i18n.t("register.txtFillDetails")}
          </Typography>
        </Box>
        {/*form fields */}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("register.lblFirstName")}</Typography>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                placeholder={i18n.t("register.hintTxtFirstName")}
                autoFocus
                value={formData.firstName}
                onChange={(e) => handleChangeUserRegister(e, "firstName")}
                required 
              />
              {validationErrors?.firstName && (
              <ZodErrors error={[validationErrors.firstName]} />)}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("register.lblLastName")}</Typography>
              <TextField
                fullWidth
                id="lastName"
                placeholder={i18n.t("register.hintTxtLastName")}
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={(e) => handleChangeUserRegister(e, "lastName")}
                required 
              />
               {validationErrors?.lastName && (
              <ZodErrors error={[validationErrors.lastName]} />)}
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblEmail")}</Typography>
              <TextField
                fullWidth
                id="email"
                placeholder={i18n.t("register.hintTxtEmail")}
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleChangeUserRegister(e, "email")}
                required
              />
              {validationErrors?.email && (
              <ZodErrors error={[validationErrors.email]} />)}

            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblPhoneNo")}</Typography>
              <TextField
                fullWidth
                id="phoneNumber"
                placeholder={i18n.t("register.hintTxtPhoneNo")}
                name="phoneNumber"
                autoComplete="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleChangeUserRegister(e, "phoneNumber")}
                required
              />
              {validationErrors?.phoneNumber && (
              <ZodErrors error={[validationErrors.phoneNumber]} />)}
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblNIC")}</Typography>
              <TextField
                fullWidth
                id="nic"
                placeholder={i18n.t("register.hintTxtNIC")}
                name="nic"
                autoComplete="nic"
                value={formData.nic}
                onChange={(e) => handleChangeUserRegister(e, "nic")}
                required
              />
              {validationErrors?.nic && (
              <ZodErrors error={[validationErrors.nic]} />)}
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblAddress")}</Typography>
              <TextField
                fullWidth
                id="address"
                placeholder={i18n.t("register.hintTxtAddress")}
                name="address"
                autoComplete="address"
                value={formData.address}
                onChange={(e) => handleChangeUserRegister(e, "address")}
                required
              />
              {validationErrors?.address && (
              <ZodErrors error={[validationErrors.address]} />)}
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <Typography id="demo-controlled-radio-buttons-group">
                  {i18n.t("register.lblRole")}
                </Typography>
                <RadioGroup
                  style={{ width: "100%" }}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  defaultValue="farmer"
                  value={formData.role}
                  onChange={(e) => handleChangeUserRegister(e, "role")}
                  row
                >
                  <FormControlLabel
                    value="farmer"
                    control={<Radio />}
                    label={i18n.t("register.lblFarmer")}
                  />
                  <FormControlLabel
                    value="officer"
                    control={<Radio />}
                    label={i18n.t("register.lblOfficer")}
                  />
                </RadioGroup>
              </FormControl>
              {validationErrors?.role && (
              <ZodErrors error={[validationErrors.role]} />)}
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblPassword")}</Typography>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-password"
                value={formData.password}
                onChange={(e) => handleChangeUserRegister(e, "password")}
                placeholder={i18n.t("register.hintTxtPassword")}
                type={showPassword ? "text" : "password"}
                required
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
                label={<InputLabel disabled={true} />}
              />
              {validationErrors?.password && (
              <ZodErrors error={[validationErrors.password]} />)}
            </Grid>
          </Grid>
          {/* Next Button for Registration */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleOnClickNext}
          >
            Next
          </Button>
          {/* Link to Sign In */}
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="login" variant="body2">
                {i18n.t("register.txtAlreadyHaveAccount")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </CustomBox1>
    </Container>
  );
}
