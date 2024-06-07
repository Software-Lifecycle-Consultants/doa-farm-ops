"use client";
import { CustomBox1 } from "@/Theme";
import i18n from "@/app/config/i18n";
import { selectAuth } from "@/redux/authSlice";
import store, { AppDispatch } from "@/redux/store";
import { User } from "@/redux/types";
import { selectUser, updateUserAsync } from "@/redux/userSlice";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";


export default function UpdateUser({ params }: { params: { userId: string } }) {
  const { t } = useTranslation();

  // Get the userId from the params
  const userId = params.userId;

  // Get the Next.js router object
  const router = useRouter();

  // Get the Redux dispatch function with AppDispatch  type
  const dispatch: AppDispatch = useDispatch();

  // const userDetails = useSelector((state: any) => selectUser(state))
  const userDetails = useSelector(selectUser);

  // Initialize the form data with the fetched land data
  const [formData, setFormData] = useState<FormData>({
    firstName: userDetails?.firstName || "",
    lastName: userDetails?.lastName || "",
    email: userDetails?.email || "",
    nicNumber: userDetails?.nic || "",
    address: userDetails?.address || "",
    phoneNumber: userDetails?.phoneNumber || "",
  });

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    nicNumber: string;
    address: string;
    phoneNumber: string;
  }

  // Function to update user data
  const handleUpdateUser = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      // Get the logged user ID from Redux
      const loggedUser = selectAuth(store.getState());
      const userId = loggedUser.auth._id;

      // Create the user data object with the correct structure
      const userData: User = {
        _id: userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        nic: formData.nicNumber,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        role: userDetails?.role || "",
      };

      // Dispatch the updateUserAsync thunk
      const data = await dispatch(updateUserAsync(userData));
      if (data.type === "user/updateUserAsync/fulfilled") {
        setOpenSuccessDialog(true); // Open success dialog on success
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  // Event handler to update form field data
  const handleChangeUpdateUser = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  // Function to navigate to profile page
  const navigationToprofile = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (userDetails?.role === "farmer") {
      router.push("/farmer-profile");
    } else if (userDetails?.role === "officer") {
      router.push("/officer-profile");
    }
  };

  // State to manage the visibility of the success dialog
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    if (userDetails?.role === "farmer") {
      router.push("/farmer-profile");
    } else if (userDetails?.role === "officer") {
      router.push("/officer-profile");
    }
  };

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

        {/* Form for user Details */}
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
                value={formData.firstName}
                onChange={(e) => handleChangeUpdateUser(e, "firstName")}
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
                value={formData.lastName}
                onChange={(e) => handleChangeUpdateUser(e, "lastName")}
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
                value={formData.email}
                onChange={(e) => handleChangeUpdateUser(e, "email")}
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
                value={formData.nicNumber}
                onChange={(e) => handleChangeUpdateUser(e, "nicNumber")}
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
                value={formData.address}
                onChange={(e) => handleChangeUpdateUser(e, "address")}
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
                value={formData.phoneNumber}
                onChange={(e) => handleChangeUpdateUser(e, "phoneNumber")}
              />
            </Grid>
          </Grid>
          {/* Buttons for saving and proceeding */}
          <Grid>
            <Stack direction="row" spacing={4} paddingTop={4}>
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                sx={{ fontSize: 11, padding: 0, height: "50px" }}
                onClick={navigationToprofile}
              >
                {i18n.t("updateUser.capBtnExitWithoutSave")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  fontSize: 11,
                  padding: 0,
                  height: "50px",
                }}
                onClick={handleUpdateUser}
              >
                {i18n.t("updateUser.capBtnSave&Exit")}
              </Button>
            </Stack>
          </Grid>
          <Dialog
            open={openSuccessDialog}
            onClose={handleCloseSuccessDialog}
            aria-labelledby="success-dialog-title"
          >
            {/* Display a translated 'Record Updated successfully!' message based on the selected language. */}
            <DialogTitle id="success-dialog-title"> {i18n.t("dialogBoxes.txtUpdatedSuccess")}</DialogTitle>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleCloseSuccessDialog} variant="contained" color="primary">
                {i18n.t("dialogBoxes.capBtnOk")}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </CustomBox1>
    </Container>
  );
}
