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
    Stack,
  } from "@mui/material";
import { useState } from 'react';
import { RootState, User } from "@/redux/types";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


export default function UpdateUser({ params }: { params: { userId: string } }) {

// Get the Next.js router object
// const router = useRouter();
// Extract the userId from the params object
const userId = params.userId;
// Get the user details from the Redux store
const userDetails = useSelector((state: RootState) => state.user);
// Get the Redux dispatch function
const dispatch = useDispatch();

const { t } = useTranslation();

 // Initialize form data with the data from the state based on landId
//  const initialFormData = userDetails.find(
//     (user) => user.userId === userId
//   ) || {
//     firstName: "",
//         lastName: "",
//         email: "",
//         phoneNumber: "",
//         nic: "",
//         role: "",
//         address: "",
//   };

// Create state to manage form data
// const [formData, setFormData] = useState(initialFormData);

// interface FormData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phoneNumber: string;
//     nic: string;
//     role: string;
//     address: string;
// }
    
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
                    // value={formData.firstName}
                    // onChange={(e) => handleChangeUpdateUser(e, "firstName")}
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
                    // value={formData.lastName}
                    // onChange={(e) => handleChangeUpdateUser(e, "lastName")}
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
                    // value={formData.email}
                    // onChange={(e) => handleChangeUpdateUser(e, "email")}
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
                    // value={formData.nicNumber}
                    // onChange={(e) => handleChangeUpdateUser(e, "nicNumber")}
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
                    // value={formData.address}
                    // onChange={(e) => handleChangeUpdateUser(e, "address")}
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
                    // value={formData.phoneNumber}
                    // onChange={(e) => handleChangeUpdateUser(e, "phoneNumber")}
                  />
                </Grid>
              </Grid>
              {/* Buttons for saving and proceeding */}
              <Grid container justifyContent="center">
                  <Button
                    variant="outlined"
                    sx={{ fontSize: 11, marginTop: 2, spacing:4,  padding: 2, height: "50px", width: "75%"}}
                    // onClick={handleOnClickUpdateUser}
                  >
                    {i18n.t("updateUser.capBtnSave&Exit")}
                  </Button>
              </Grid>
            </Box>
          </CustomBox1>
        </Container>
      );
}
