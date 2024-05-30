"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n"; // Import the i18n instance
import { CustomBox1 } from "@/Theme";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { registerFarmer } from "@/redux/farmerSlice";
import { OfficerRegister } from "@/redux/officerSlice";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/types";
import store from "@/redux/store";
// Import the necessary selectors from the respective slices
import { selectFarmerDetails } from "@/redux/farmerSlice";
import { selectOfficer } from "@/redux/officerSlice";
import { AppDispatch } from '@/redux/store';

export default function AdditionalRegistration() {

  const [termsAgreementChecked, setTermsAgreementChecked] = useState(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  // State for the form data
  const [farmerFormData, setFarmerFormData] = useState<FormDataFarmer>({
    household: "",
    orgName: "",
    orgAddress: ""
  });

  const [officerFormData, setOfficerFormData] = useState<FormDataOfficer>({
    orgName: "",
    orgAddress: "",
    university: ""
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

  // Get user data from the Redux store
  const userData = useSelector((state: RootState) => state.user.user);

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
  }

  //Decare variable to append userData + farmer data Or userData + officerData
  let combinedData;

  // Function to handle user registration
  const handleOnClickRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (selectedRole === "farmer") {
        //Dispatch farmer data to redux store
        const action = registerFarmer(farmerFormData);
        dispatch(action);

        //Get farmer data from the Redux store
        const farmerData = selectFarmerDetails(store.getState());

        //Create a data object combining user data and farmer data
        combinedData = {
          userData,
          farmerData,
        };
      } else {
        //Dispatch farmer data to redux store
        const action = OfficerRegister(officerFormData);
        dispatch(action);

        // Get officer data from the Redux store
        const officerData = selectOfficer(store.getState());

        //Create a data object combining user data and officer data
        combinedData = {
          userData,
          officerData,
        };
      }

      // Make the API call using combinedData from the Redux store
      const response = await axios.post(
        "http://localhost:5000/api/user/register", // Send user registration data to the backend
        JSON.stringify(combinedData),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response && response.status === 200) {
        router.push("/login");
      } else if (response && response.status === 400) {
        console.error('Registration Failed');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Main content container */}
      <CustomBox1 sx={{ maxWidth: "400px" }}>
        {/* Additional Registration Form */}
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            {i18n.t("additionalRegister.txtOtherDetails")}
          </Typography>
          <Typography component="h1" variant="subtitle1" gutterBottom>
            {i18n.t("additionalRegister.txtFillDetails")}
          </Typography>
        </Box>
        {/*form fields */}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {selectedRole === "farmer" && (
              <>
                <Grid item xs={12}>
                  <Typography>
                    {i18n.t("additionalRegister.lblHouseholds")}
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="household"
                    placeholder={i18n.t("additionalRegister.hintTxtHouseholds")}
                    name="household"
                    autoComplete="household"
                    value={farmerFormData.household}
                    onChange={(e) => handleChangeUserRegister(e, "household")}
                  />
                </Grid>
              </>
            )}
            {selectedRole === "officer" && (
              <>
                <Grid item xs={12}>
                  <Typography>
                    {i18n.t("additionalRegister.lblUniversity")}
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="university"
                    placeholder={i18n.t("additionalRegister.hintTxtUniversity")}
                    name="university"
                    autoComplete="university"
                    value={officerFormData.university}
                    onChange={(e) => handleChangeUserRegister(e, "university")}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Typography>
                {i18n.t("additionalRegister.lblOrganizationName")}
              </Typography>
              <TextField
                required
                fullWidth
                id="orgName"
                placeholder={i18n.t("additionalRegister.hintTxtOrg")}
                name="orgName"
                autoComplete="orgName"
                value={
                  selectedRole === "farmer"
                    ? farmerFormData.orgName
                    : officerFormData.orgName
                }
                onChange={(e) => handleChangeUserRegister(e, "orgName")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {i18n.t("additionalRegister.lblOrganizationAddress")}
              </Typography>
              <TextField
                required
                fullWidth
                id="orgAddress"
                placeholder={i18n.t("additionalRegister.hintTxtOrgAddress")}
                name="orgAddress"
                autoComplete="orgAddress"
                value={
                  selectedRole === "farmer"
                    ? farmerFormData.orgAddress
                    : officerFormData.orgAddress
                }
                onChange={(e) => handleChangeUserRegister(e, "orgAddress")}
              />
            </Grid>

            {/* Terms & Conditions Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTermsAgreementChecked(e.target.checked);
                      handleChangeUserRegister(
                        {
                          target: {
                            name: "termsAgreement",
                            value: e.target.checked as any,
                          },
                        } as React.ChangeEvent<HTMLInputElement>,
                        "termsAgreement"
                      );
                    }}
                  />
                }
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
            disabled={!termsAgreementChecked}
          >
            Register
          </Button>
        </Box>
      </CustomBox1>
    </Container>
  );
}
