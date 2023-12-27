"use client"
import React, { useState } from "react";
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
/**
 * SignUp page allows to users to register to the system
 */

export default function SignUp() {

  const { t } = useTranslation();

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

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    nic: "",
    role: "",
    address: "",
    password: "",
  });

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //Function to navigate to login page clicking register button
  const handleOnClickRegister = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const userData = { userDetails: formData };
    console.log(userData);
    router.push("./login");
    dispatch(register(userData));
  }

  // Define a function to handle add crop.
  const handleChangeUserRegister = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
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
                required
                fullWidth
                id="firstName"
                placeholder={i18n.t("register.hintTxtFirstName")}
                autoFocus
                value={formData.firstName}
                onChange={(e) => handleChangeUserRegister(e, "firstName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("register.lblLastName")}</Typography>
              <TextField
                required
                fullWidth
                id="lastName"
                placeholder={i18n.t("register.hintTxtLastName")}
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={(e) => handleChangeUserRegister(e, "lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblEmail")}</Typography>
              <TextField
                required
                fullWidth
                id="email"
                placeholder={i18n.t("register.hintTxtEmail")}
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleChangeUserRegister(e, "email")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblPhoneNo")}</Typography>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                placeholder="Enter phone number"
                name="phoneNumber"
                autoComplete={i18n.t("register.hintTxtPhoneNo")}
                value={formData.phoneNumber}
                onChange={(e) => handleChangeUserRegister(e, "phoneNumber")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblNIC")}</Typography>
              <TextField
                required
                fullWidth
                id="nic"
                placeholder="Enter NIC Number"
                name="nic"
                autoComplete={i18n.t("register.hintTxtNIC")}
                value={formData.nic}
                onChange={(e) => handleChangeUserRegister(e, "nic")}
              />
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
                  value={formData.role}
                  onChange={(e) => handleChangeUserRegister(e, "role")}
                  row
                >
                  <FormControlLabel
                    value="farmer"
                    control={<Radio />}
                    label="Farmer"
                  />
                  <FormControlLabel
                    value="officer"
                    control={<Radio />}
                    label="Officer"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblAddress")}</Typography>
              <TextField
                required
                fullWidth
                id="address"
                placeholder="Enter Address"
                name="address"
                autoComplete={i18n.t("register.hintTxtAddress")}
                value={formData.address}
                onChange={(e) => handleChangeUserRegister(e, "address")}
              />
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
            </Grid>
            {/* Terms & Conditions Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label={
                  <>
                    {i18n.t("register.txtAgree")}{" "}
                    <a href="/terms-and-conditions">
                      {i18n.t("register.txtTerms&Conditions")}
                    </a>{" "}
                    {i18n.t("register.txtAnd")}{" "}
                    <a href="/privacy-policy">
                      {i18n.t("register.txtPrivacyPolicy")}
                    </a>
                  </>
                }
              />
            </Grid>
          </Grid>
          {/* Register Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleOnClickRegister}
          >
            {i18n.t("register.capBtnRegister")}
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
