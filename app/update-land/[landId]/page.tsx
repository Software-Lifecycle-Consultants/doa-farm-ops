// Import necessary modules and components
"use client";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  DialogTitle,
  Dialog,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
// Import the router object to handle routing
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { editLand,fetchAndRegisterLands, selectLands, updateLandAsync } from "@/redux/landSlice";
import { RootState } from "@/redux/types";
import { useTranslation } from 'react-i18next';
import i18n from "../../config/i18n";// Import the i18n instance
import { CustomBox1 } from "@/Theme";
import store from "@/redux/store";
import { selectAuth } from "@/redux/authSlice";
import { Land } from '@/redux/types';
import { districtList } from "@/data/landsData";
/**
 * UpdateLand page is a form to edit or update details about land properties.
 */

export default function UpdateLand({ params }: { params: { landId: string } }) {
  // Get the Next.js router object
  const router = useRouter();
  // Extract the landId from the params object
  const landId = params.landId;
  // Get the land details from the Redux store
  //const landDetails = useSelector((state: RootState) => state.land);
  const landDetails = useSelector((state: any) => selectLands(state));

// Create a new array named districtNames containing all district names
  const districtNames = districtList.map((district) => district.name);

  // Get the Redux dispatch function with AppDispatch  type
  const dispatch: AppDispatch = useDispatch();

  const { t } = useTranslation();

  // Fetch the land details when the component mounts
  React.useEffect(() => {
    dispatch(fetchAndRegisterLands(landId));
  }, [dispatch, landId]);

  // Initialize form data with the data from the state based on landId
  // Initialize the form data with the fetched land data
  const land = landDetails?.find((l) => l._id === landId);
  const [formData, setFormData] = useState<FormData>({
    landName: land?.landName || '',
    district: land?.district || '',
    dsDivision: land?.dsDivision || '',
    landRent: land?.landRent || '',
    irrigationMode: land?.irrigationMode || '',
    userId: land?.userId || '',
    crops: land?.crops || [],
  });

  // // Create state to manage form data
  // const [formData, setFormData] = useState(initialFormData);

  interface FormData {
    landName: string;
    district: string;
    dsDivision: string;
    landRent: string;
    irrigationMode: string;
    userId: string;
    crops: any[];
  }

  // interface Land {
  //   _id: string;
  //   landName: string;
  //   district: string;
  //   dsDivision: string;
  //   landRent: string;
  //   irrigationMode: string;
  //   userId: string;
  //   crops: any[];
  // }

  //Function to navigate to my crops page clicking save & exit to my crops button
  const handleOnClickUpdateLand = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      //Get logged user Id from redux
      const loggedUser = selectAuth(store.getState());
      const userId = loggedUser.auth._id;

      // Create the land data object with the correct structure
      const landData: Land = {
        _id: landId,
        landName: formData.landName,
        district: formData.district,
        dsDivision: formData.dsDivision,
        landRent: formData.landRent,
        irrigationMode: formData.irrigationMode,
        userId: userId, // Assuming you have the authenticated user's ID
        crops: [], // Assuming you don't have any crops associated with this land update
      };
  
      // Dispatch the updateLandAsync thunk
      await dispatch(updateLandAsync(landData));
      setOpenSuccessDialog(true); // Open success dialog on success
    } catch (error) {
      console.error("Error updating land:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  //Function to navigate to add crop page
  const navigationToUpdateCrop = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    router.push("/add-crop");
  };
  // Event handler to update form field data
  const handleChangeUpdateLand = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };
  // State to manage the visibility of the success dialog
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    router.push("/farmer-profile");
  };
  // Define a function to select district.
  const selectChangeAddDistrict = (event: any, newValue: any | null) => {
    setFormData({
      ...formData,
      district: newValue,
    });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CustomBox1 sx={{ maxWidth: "500px" }}>
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            {i18n.t("updateLand.txtUpdateLand")}
          </Typography>
        </Box>
        {/* Grid for Land Details */}
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
              {i18n.t("updateLand.txtFillDetails")}
            </Typography>

            {/* Button for marking on the map */}
            <Button endIcon={<PlaceOutlinedIcon />}>
              {i18n.t("updateLand.capBtnMark")}
            </Button>
          </Grid>
        </Grid>

        {/* Form for Land Details */}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{i18n.t("updateLand.lblLandName")}</Typography>
              <TextField
                required
                fullWidth
                id="landName"
                placeholder={i18n.t("updateLand.hintTxtLandName")}
                name="landName"
                autoComplete="landName"
                value={formData.landName}
                onChange={(e) => handleChangeUpdateLand(e, "landName")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("updateLand.lblDistrict")}</Typography>
              <Autocomplete
                  options={districtNames}
                  getOptionLabel={(option) => option}
                  value={formData.district}
                  onChange={(event, newValue) =>
                      selectChangeAddDistrict(event, newValue)
                  }
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          name="district"
                          placeholder={i18n.t("updateLand.hintTxtDistrict")}
                          variant="outlined"
                      />
                  )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("updateLand.lblDivision")}</Typography>
              <TextField
                required
                fullWidth
                name="division"
                placeholder={i18n.t("updateLand.hintTxtDivision")}
                type="division"
                id="division"
                autoComplete="division"
                value={formData.dsDivision}
                onChange={(e) => handleChangeUpdateLand(e, "dsDivision")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("updateLand.lblLandRent")}</Typography>
              <TextField
                required
                fullWidth
                name="landRent"
                placeholder={i18n.t("updateLand.hintTxtLandRent")}
                type="landRent"
                id="landRent"
                autoComplete="landRent"
                value={formData.landRent}
                onChange={(e) => handleChangeUpdateLand(e, "landRent")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("updateLand.lblMode")}</Typography>
              <TextField
                required
                fullWidth
                name="modeOfIrrigation"
                placeholder={i18n.t("updateLand.hintTxtMode")}
                type="modeOfIrrigation"
                id="modeOfIrrigation"
                autoComplete="modeOfIrrigation"
                value={formData.irrigationMode}
                onChange={(e) => handleChangeUpdateLand(e, "irrigationMode")}
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
                onClick={handleOnClickUpdateLand}
              >
                {i18n.t("updateLand.capBtnSave&Exit")}
              </Button>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ fontSize: 11, padding: 0, height: "50px" }}
                onClick={navigationToUpdateCrop}
              >
                {i18n.t("updateLand.capBtnSave&Proceed")}
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
