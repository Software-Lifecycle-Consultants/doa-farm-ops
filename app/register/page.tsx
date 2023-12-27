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
/**
 * SignUp page allows to users to register to the system
 */

export default function SignUp() {
  const { t } = useTranslation();

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
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("register.lblPassword")}</Typography>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-password"
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
          >
            {i18n.t("register.capBtnRegister")}
          </Button>
          {/* Link to Sign In */}
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2">
                {i18n.t("register.txtAlreadyHaveAccount")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </CustomBox1>
    </Container>
  );
}
