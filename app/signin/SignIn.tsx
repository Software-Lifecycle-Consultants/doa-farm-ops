"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const boxStyles = {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginX: "370px",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "3px solid #F1F1F1",
          background: "#FFFFFF",
          paddingTop: "15px",
          paddingBottom: "15px",
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome DOA Platform
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 1, width: 340, paddingTop: "8px" }}
        >
          <Typography>Email</Typography>

          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "16px" }}
          >
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <OutlinedInput
              id="email"
              autoComplete="email"
              label="Email Address"
            />
          </FormControl>

          <Typography>Password</Typography>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "16px" }}
          >
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

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
