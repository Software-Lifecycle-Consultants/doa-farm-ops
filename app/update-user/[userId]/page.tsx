"use client";
import { CustomBox1 } from "@/Theme";
import i18n from "@/app/config/i18n";
import {
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
  } from "@mui/material";
import { useTranslation } from "react-i18next";


export default function UpdateUser({ params }: { params: { userId: string } }) {

const { t } = useTranslation();
    
    return (
        <Container component="main" maxWidth="xl">
          <CustomBox1 sx={{ maxWidth: "500px" }}>
            <Box sx={{ width: "100%" }}>
              <Typography component="h1" variant="h5" gutterBottom>
                {i18n.t("updateUser.txtUpdateUser")}
              </Typography>
            </Box>
            {/* Grid for User Details */}
            <Grid container item rowGap={2}>
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="subtitle1" gutterBottom>
                  {i18n.t("updateUser.txtFillDetails")}
                </Typography>
    
              </Grid>
            </Grid>
    
            {/* Form for Land Details */}
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>{i18n.t("updateUser.lblFirstName")}</Typography>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    placeholder={i18n.t("updateUser.hintTxtFirstName")}
                    name="firstName"
                    autoComplete="firstName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>{i18n.t("updateUser.lblLastName")}</Typography>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    placeholder={i18n.t("updateUser.hintTxtlastName")}
                    name="lastName"
                    autoComplete="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>{i18n.t("updateUser.lblEmail")}</Typography>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    placeholder={i18n.t("updateUser.hintTxtemail")}
                    type="email"
                    id="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>{i18n.t("updateUser.lblnicNumber")}</Typography>
                  <TextField
                    required
                    fullWidth
                    name="nicNumber"
                    placeholder={i18n.t("updateUser.hintTxtnicNumber")}
                    id="nicNumber"
                    autoComplete="nicNumber"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>{i18n.t("updateUser.lblAddress")}</Typography>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    placeholder={i18n.t("updateUser.hintTxtAddress")}
                    id="address"
                    autoComplete="address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>{i18n.t("updateUser.lblphoneNumber")}</Typography>
                  <TextField
                    required
                    fullWidth
                    name="phoneNumber"
                    placeholder={i18n.t("updateUser.hintTxtphoneNumber")}
                    type="text"
                    id="phoneNumber"
                    autoComplete="phoneNumber"
                  />
                </Grid>
              </Grid>
              {/* Buttons for saving and proceeding */}
              <Grid container justifyContent="center">
                  <Button
                    variant="outlined"
                    sx={{ fontSize: 11, marginTop: 2, spacing:4,  padding: 2, height: "50px", width: "75%"}}
                  >
                    {i18n.t("updateUser.capBtnSave&Exit")}
                  </Button>
              </Grid>
            </Box>
          </CustomBox1>
        </Container>
      );
}
