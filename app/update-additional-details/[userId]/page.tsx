"use client";
import React, { useState } from "react";
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
import { useTranslation } from "react-i18next";
import i18n from "../../config/i18n"; // Import the i18n instance
import { CustomBox1 } from "@/Theme";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// Import the necessary selectors from the respective slices
import { selectFarmerDetails, updateandfetchfarmer } from "@/redux/farmerSlice";
import { selectOfficer, updateAndFetchOfficer } from "@/redux/officerSlice";
import { selectUser } from "@/redux/userSlice";
import { Stack } from "@mui/system";
import { AppDispatch } from '@/redux/store'; // Import the AppDispatch type
import { ZodErrors } from "@/components/ZodErrors";
import { FarmerAdditionalDetails , OfficerAdditionalDetails } from "@/schemas/additional.user.details.schema";
import { validateFormData } from '@/utils/validation';

export default function UpdateAdditionalDetails() {
  const router = useRouter();
  const dispatch:AppDispatch = useDispatch();
  const { t } = useTranslation();

  // Get user data from the Redux store
  const userData = useSelector(selectUser);

  // Get the farmer data from the Redux store
  const farmerData = useSelector(selectFarmerDetails);

  // Get the officer data from the Redux store
  const officerData = useSelector(selectOfficer);

  // State for the form data
  const [farmerFormData, setFarmerFormData] = useState<FormDataFarmer>({
    household: farmerData?.household || "",
    orgName: farmerData?.orgName || "",
    orgAddress: farmerData?.orgAddress || "",
  });

  const [officerFormData, setOfficerFormData] = useState<FormDataOfficer>({
    orgName: officerData?.orgName || "",
    orgAddress: officerData?.orgAddress || "",
    university: officerData?.university || "",
  });

  interface FormDataFarmer {
    household: string;
    orgName: string;
    orgAddress: string;
  }

  interface FormDataOfficer {
    orgName: string;
    orgAddress: string;
    university: string;
  }
  type ValidationErrors = Partial<FormDataFarmer & FormDataOfficer>;
    
 // State variable to store validation error messages for each form field
 const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  // Get user role from the userData
  const selectedRole = userData?.role;

  // Function to handle changes in form fields
  const handleChangeUserRegister = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (selectedRole === "farmer") {
      {
        setFarmerFormData((prevFormData) => ({
          ...prevFormData,
          [field]: event.target.value,
        }));
      }
    } else {
      {
        setOfficerFormData((prevFormData) => ({
          ...prevFormData,
          [field]: event.target.value,
        }));
      }
    }
  };

  // Function to navigate to profile page
  const navigationToprofile = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (userData?.role === "officer") {
      router.push("/officer-profile");
    } else if  (userData?.role === "farmer") {
      router.push("/farmer-profile");
    }
  };

  // State to manage the visibility of the success dialog
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    if (selectedRole === "farmer") {
      router.push("/farmer-profile");
    } else if (selectedRole === "officer") {
      router.push("/officer-profile");
    }
  };
  // Function to handle updating additional details
  const handleOnClickUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const schema = selectedRole === "farmer" ? FarmerAdditionalDetails : OfficerAdditionalDetails;
      const formData = selectedRole === "farmer" ? farmerFormData : officerFormData;
  
      // Validate form data
      const { valid, errors } = validateFormData(schema, formData);
      if (!valid) {
        setValidationErrors(errors);
        return;
      }
      if (selectedRole === "farmer") {
        const farmerDataupdate = {
          farmerData: farmerFormData,
          userId: userData?._id,
        };
        if (userData && farmerData) {
          const data = await dispatch(updateandfetchfarmer(farmerDataupdate));
          if (data.type === "farmer/updateandfetchfarmer/fulfilled") {
            setOpenSuccessDialog(true); // Open success dialog on success
          }
        }
      } else {
        const officerDataupdate = {
          officerData: officerFormData,
          userId: userData?._id,
        };
        if (userData && officerData) {
          const data = await dispatch(updateAndFetchOfficer(officerDataupdate));
          if (data.type === "officer/updateAndFetchOfficer/fulfilled") {
            setOpenSuccessDialog(true);
          }
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Main content container */}
      <CustomBox1 sx={{ maxWidth: "400px" }}>
        {/* Additional Details Update Form */}
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            {i18n.t("additionalUpdate.txtOtherDetails")}
          </Typography>
          <Typography component="h1" variant="subtitle1" gutterBottom>
            {i18n.t("additionalUpdate.txtUpdateDetails")}
          </Typography>
        </Box>
        {/*form fields */}
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            {selectedRole === "farmer" && (
              <>
                <Grid item xs={12}>
                  <Typography>
                    {i18n.t("additionalUpdate.lblHouseholds")}
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="household"
                    placeholder={i18n.t("additionalUpdate.hintTxtHouseholds")}
                    name="household"
                    autoComplete="household"
                    value={farmerFormData.household}
                    onChange={(e) => handleChangeUserRegister(e, "household")}
                  />
                    {validationErrors?.household && (
                    <ZodErrors error={[validationErrors.household]} />
                  )}
                </Grid>
              </>
            )}
            {selectedRole === "officer" && (
              <>
                <Grid item xs={12}>
                  <Typography>
                    {i18n.t("additionalUpdate.lblUniversity")}
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="university"
                    placeholder={i18n.t("additionalUpdate.hintTxtUniversity")}
                    name="university"
                    autoComplete="university"
                    value={officerFormData.university}
                    onChange={(e) => handleChangeUserRegister(e, "university")}
                  />
                     {validationErrors?.university && (
                    <ZodErrors error={[validationErrors.university]} />
                  )}
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Typography>
                {i18n.t("additionalUpdate.lblOrganizationName")}
              </Typography>
              <TextField
                required
                fullWidth
                id="orgName"
                placeholder={i18n.t("additionalUpdate.hintTxtOrg")}
                name="orgName"
                autoComplete="orgName"
                value={
                  selectedRole === "farmer"
                    ? farmerFormData.orgName
                    : officerFormData.orgName
                }
                onChange={(e) => handleChangeUserRegister(e, "orgName")}
              />
                 {validationErrors?.orgName && (
                <ZodErrors error={[validationErrors.orgName]} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {i18n.t("additionalUpdate.lblOrganizationAddress")}
              </Typography>
              <TextField
                required
                fullWidth
                id="orgAddress"
                placeholder={i18n.t("additionalUpdate.hintTxtOrgAddress")}
                name="orgAddress"
                autoComplete="orgAddress"
                value={
                  selectedRole === "farmer"
                    ? farmerFormData.orgAddress
                    : officerFormData.orgAddress
                }
                onChange={(e) => handleChangeUserRegister(e, "orgAddress")}
              />
                {validationErrors?.orgAddress && (
                <ZodErrors error={[validationErrors.orgAddress]} />
              )}
          </Grid>
          </Grid>
          {/* Update Button */}
          <Stack spacing={2} direction="row" paddingTop={2}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={navigationToprofile}
            >
              {i18n.t("additionalUpdate.capBtnExit")}
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleOnClickUpdate}
            >
              {i18n.t("additionalUpdate.capBtnSave&Exit")}
            </Button>
          </Stack>
          <Dialog
            open={openSuccessDialog}
            onClose={handleCloseSuccessDialog}
            aria-labelledby="success-dialog-title"
          >
            {/* Display a translated 'Record Updated successfully!' message based on the selected language. */}
            <DialogTitle id="success-dialog-title">
              {" "}
              {i18n.t("dialogBoxes.txtUpdatedSuccess")}
            </DialogTitle>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleCloseSuccessDialog}
                variant="contained"
                color="primary"
              >
                {i18n.t("dialogBoxes.capBtnOk")}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </CustomBox1>
    </Container>
  );
}
