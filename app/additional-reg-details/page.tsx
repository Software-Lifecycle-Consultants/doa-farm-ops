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

   // Get user roole from the userData
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

  //Decare varibale to append userdata + farmer data Or userdata + officerdata
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
          user: userData,
          farmer: farmerData,
        };
      } else {
        const action = OfficerRegister(officerFormData);
        dispatch(action);
        console.log("Dispatching action office:", action);
        // Get officer data from the Redux store
        const officerData = selectOfficer(store.getState());
        console.log("----------officerData----------------" + officerData);
        combinedData = {
          user: userData,
          farmer: officerData,
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
            Add your other details
          </Typography>
          <Typography component="h1" variant="subtitle1" gutterBottom>
          Fill the details below to create your account
          </Typography>
        </Box>
        {/*form fields */}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {selectedRole === "farmer" && (
            <>
            <Grid item xs={12}>
              <Typography>Households</Typography>
              <TextField
                required
                fullWidth
                id="household"
                placeholder="Enter your householders"
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
              <Typography>University</Typography>
              <TextField
                required
                fullWidth
                id="university"
                placeholder="Enter your university"
                name="university"
                autoComplete="university"
                value={officerFormData.university}
                onChange={(e) => handleChangeUserRegister(e, "university")}
              />
            </Grid>
            </>
            )}
            <Grid item xs={12}>
              <Typography>Organization Name</Typography>
              <TextField
                required
                fullWidth
                id="orgName"
                placeholder="Enter organization name"
                name="orgName"
                autoComplete="orgName"
                value={selectedRole === 'farmer' ? farmerFormData.orgName : officerFormData.orgName}
                onChange={(e) => handleChangeUserRegister(e, "orgName")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Organization Address</Typography>
              <TextField
                required
                fullWidth
                id="orgAddress"
                placeholder="Enter organization address"
                name="orgAddress"
                autoComplete="orgAddress"
                value={selectedRole === 'farmer' ? farmerFormData.orgAddress : officerFormData.orgAddress}
                onChange={(e) => handleChangeUserRegister(e, "orgAddress")}
              />
            </Grid>
            

            {/* Terms & Conditions Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTermsAgreementChecked(e.target.checked);
                    handleChangeUserRegister(
                      {
                        target: {
                          name: "termsAgreement",
                          value: e.target.checked as any
                        }
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
