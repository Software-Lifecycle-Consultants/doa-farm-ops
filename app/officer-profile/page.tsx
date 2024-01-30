// Import necessary modules and components
"use client";
import * as React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import ProfileTitle from "../../components/ProfileTitle";
import { EditNote as EditNoteIcon, AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { btnBackgroundColor, customGridStyles1, customGridStyles2 } from "@/styles/customStyles";
import { CustomBox2 } from "@/Theme";
import { selectAuth } from "@/redux/authSlice";
import { useSelector } from "react-redux";
import axios from 'axios';
import { UserWithOfficer } from "@/redux/types";
import { useDispatch } from "react-redux";
import { OfficerRegister, selectOfficer } from "@/redux/officerSlice";
import store from "@/redux/store";
import { register } from "@/redux/userSlice";

// OfficerProfile component renders a profile page for an officer.
export default function OfficerProfile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  // Fetch the authentication status from Redux store
  const { auth } = useSelector(selectAuth);

  // Initialize state for user and officer details
  const [UserData, setUserData] = React.useState<UserWithOfficer>({
    user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        nic: "",
        role: "",
        address: "",
        password: ""
    },
    officerDetails: {
        orgName: "",
        orgAddress: "",
        university: ""
    }
});

// Function to fetch user data based on user ID
async function fetchData(_id: any) {
  try {
    const response = await axios.get(`http://localhost:5000/api/get/user/${_id}`);
    console.log('Fetch response-------- ', response);
    
    if (response.status === 200) {
      dispatch(register(response.data.user));
      dispatch(OfficerRegister(response.data.officerDetails));
      // Get officer data from the Redux store
      const officerData = selectOfficer(store.getState());
      console.log('officerData-----------:', officerData);
      setUserData(response.data);
    }
  } catch (error) {
    console.log('Error fetching data:', error);
    return error;
  }
  
}

React.useEffect(() => {
  fetchData(auth._id);
}, []);

  // Return the JSX for rendering
  return (
    <>
      {/* Main grid container */}
      <Grid container direction="column" rowGap={2}>
        <Grid item xs={12}>
          {/* Page title */}
          <ProfileTitle title={t("officerProfile.txtProfileName")} />
        </Grid>
        {/* Officer Info Section*/}
        <Grid item xs={12}>
          <CustomBox2>
            <Box>
              <AccountCircleIcon sx={{ fontSize: "50px" }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "#000",
                  fontWeight: "medium",
                  lineHeight: "normal",
                  marginBottom: "4px",
                }}
              >
                {UserData.user.firstName}{" "}
                {UserData.user.lastName}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                }}
              >
                {t("officerProfile.txtProfileType")}
              </Typography>
            </Box>
          </CustomBox2>
        </Grid>
        {/* Personal Information Section */}
        <Grid item container xs={12} p={2} sx={customGridStyles1}>
          <Grid container item p={2} rowGap={2} sx={customGridStyles2}>
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
              <Typography variant="h6">
                {t("officerProfile.txtPersonalInformation")}
              </Typography>
              {/* Edit Button */}
              <Button
                sx={btnBackgroundColor}
                variant="outlined"
                endIcon={<EditNoteIcon />}
              >
                {t("officerProfile.capBtnEdit")}
              </Button>
            </Grid>
            {/* Personal Information Fields */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("officerProfile.txtFirstName")}
              </Typography>
              <Typography
                variant="body1"
              >
                {UserData.user.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("officerProfile.txtLastName")}
              </Typography>
              <Typography
                variant="body1"
              >
                {UserData.user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("officerProfile.txtEmail")}
              </Typography>
              <Typography
                variant="body1"
              >
                {UserData.user.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("officerProfile.txtNicNumber")}
              </Typography>
              <Typography
                variant="body1"
              >
                {UserData.user.nic}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("officerProfile.txtAddress")}
              </Typography>
              <Typography
                variant="body1"
              >
                {UserData.user.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("officerProfile.txtPhoneNumber")}
              </Typography>
              <Typography
                variant="body1"
              >
                {UserData.user.phoneNumber}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Organization & Education Details Section*/}
        <Grid item xs={12} p={2} sx={customGridStyles1}>
          <Grid container item rowGap={2} p={2} sx={customGridStyles2}>
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
              <Typography variant="h6">
                {t("officerProfile.txtOrganization")}
              </Typography>

              <Button
                sx={btnBackgroundColor}
                variant="outlined"
                endIcon={<EditNoteIcon />}
              >
                {t("officerProfile.capBtnEditOrganization")}
              </Button>
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography
                variant="caption"
              >
                {t("officerProfile.txtOrgName")}
              </Typography>
              <Typography
                variant="body1"
              >
                {UserData.officerDetails.orgName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                variant="caption"
              >
                {t("officerProfile.txtOrgAddress")}
              </Typography>
              <Typography
                variant="body1"
              >
                {UserData.officerDetails.orgAddress}
              </Typography>
            </Grid>

            <Grid container item xs={12} md={12} paddingTop={"2vh"}>
              <Typography variant="h6">
                {t("officerProfile.txtEducation")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                variant="caption"
              >
                {t("officerProfile.txtUniversity")}
              </Typography>
              <Typography
                variant="body1"
              >
                {UserData.officerDetails.university}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
