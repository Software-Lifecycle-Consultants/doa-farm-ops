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
import { farmerRegister } from "@/redux/farmerSlice";
import { OfficerRegister } from "@/redux/officerSlice";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/types";
import store from "@/redux/store";
// Import the necessary selectors from the respective slices
import { selectFarmer } from "@/redux/farmerSlice";
import { selectOfficer } from"@/redux/officerSlice";

export default function AdditionalRegistration() {

  // const [selectedRole, setSelectedRole] = useState(""); // State to store the selected role

  const [termsAgreementChecked, setTermsAgreementChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Interface for the form data
  interface FarmerFormData {
    household: string;
    orgName: string;
    orgAddress: string;
  }
  interface OfficerFormData {
    orgName: string;
    orgAddress: string;
    university: string;
  }

  // State for the form data
  const [farmerFormData, setFarmerFormData] = useState<FarmerFormData>({
    household: "",
    orgName: "",
    orgAddress: ""
  });
  
  const [officerFormData, setOfficerFormData] = useState<OfficerFormData>({
    orgName: "",
    orgAddress: "",
    university: ""
  });

  // Get user data from the Redux store
  const userData = useSelector((state: RootState) => state.user);
  const userX = JSON.stringify(userData);

   // Get user role from the userData
  const selectedRole = userData?.user?.role;

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
        const action = farmerRegister(farmerFormData);
        dispatch(action);
        console.log("Dispatching action for farmer:", action);
        // Get farmer data from the Redux store
        const farmerData = selectFarmer(store.getState());
        console.log("----------farmerData----------------" + farmerData);
        const farmerDataJSON = JSON.stringify(farmerData);
        console.log("----------farmerDataJSON----------------" + farmerDataJSON);
        combinedData = {
          userData,
          farmerData,
        };
      } else {
        const action = OfficerRegister(officerFormData);
        dispatch(action);
        console.log("Dispatching action office:", action);
        // Get officer data from the Redux store
        const officerData = selectOfficer(store.getState());
        console.log("----------officerData----------------" + officerData);
        combinedData = {
          userData,
          officerData,
        };
      }

      console.log("--- JSON combinedData----" + JSON.stringify(combinedData));

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
      router.push("/login");
      if (response && response.status === 200) {
        console.log(response);
        console.log('Registration successful!');
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
