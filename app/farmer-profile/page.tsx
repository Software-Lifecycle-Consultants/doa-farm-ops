"use client";
import * as React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import {
  EditNote as EditNoteIcon,
  AccountCircle as AccountCircleIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import ProfileTitle from "../../components/ProfileTitle";
import LandsTable from "@/components/LandsTable";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { btnBackgroundColor, customGridStyles1, customGridStyles2 } from "@/styles/customStyles";
import { CustomBox2 } from "@/Theme";
import { selectAuth } from "@/redux/authSlice";
import { useSelector } from "react-redux";
// Importing fetchUserData function
import { fetchUserData } from "@/api/fetchUserData";
// Importing the User and FarmerDetails types
import { User, FarmerDetails } from "@/redux/types";

/**
 * This component represents the farmer's profile page, displaying personal information, other details, and a table of land details associated with the farmer.
 * Users can view and edit their profile information, as well as add new land details.
 */
export default function FarmerProfile() {
  const router = useRouter();
  const { t } = useTranslation();

  // Fetch the authentication status from Redux store
  const { auth } = useSelector(selectAuth);

  // Initialize state for user and farmer details
  const [user, setUser] = React.useState<User | null>(null);
  const [farmerDetails, setFarmerDetails] = React.useState<FarmerDetails | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchUserData(auth._id);
        setUser(userData.user);
        setFarmerDetails(userData.farmerDetails);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchData();
  }, [auth._id]);

  return (
    <>
      {/* Main grid container */}
      <Grid container direction="column" rowGap={2}>
        {/* Title */}
        <Grid item xs={12}>
          <ProfileTitle title={t("farmerProfile.txtProfileName")} />
        </Grid>
        {/* Farmer Info */}
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
              {user && user.firstName} {user && user.lastName}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                }}
              >
                {t("farmerProfile.txtProfileType")}
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
                {t("farmerProfile.txtPersonalInformation")}
              </Typography>
              {/* Edit Button */}
              <Button
                sx={btnBackgroundColor}
                variant="outlined"
                endIcon={<EditNoteIcon />}
              >
                {t("farmerProfile.capBtnEdit")}
              </Button>
            </Grid>
            {/* Personal Information Fields */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("farmerProfile.txtFirstName")}
              </Typography>
              <Typography
                variant="body1"
              >
                {user && user.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("farmerProfile.txtLastName")}
              </Typography>
              <Typography
                variant="body1"
              >
                {user && user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("farmerProfile.txtEmail")}
              </Typography>
              <Typography
                variant="body1"
              >
                {user && user.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("farmerProfile.txtNicNumber")}
              </Typography>
              <Typography
                variant="body1"
              >
                {user && user.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("farmerProfile.txtAddress")}
              </Typography>
              <Typography
                variant="body1"
              >
                {user && user.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("farmerProfile.txtPhoneNumber")}
              </Typography>
              <Typography
                variant="body1"
              >
                {user && user.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
              >
                {t("farmerProfile.txtHouseholds")}
              </Typography>
              <Typography
                variant="body1"
              >
                {farmerDetails && farmerDetails.household}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Other Details Section*/}
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
                {t("farmerProfile.txtOtherDetails")}
              </Typography>
              {/* Edit Button */}
              <Button
                sx={btnBackgroundColor}
                variant="outlined"
                endIcon={<EditNoteIcon />}
              >
                {t("farmerProfile.capBtnEdit")}
              </Button>
            </Grid>
            {/* Other Details Fields */}
            <Grid item xs={12} md={12}>
              <Typography
                variant="caption"
              >
                {t("farmerProfile.txtOrgName")}
              </Typography>
              <Typography
                variant="body1"
              >
                {farmerDetails && farmerDetails.orgName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                variant="caption"
              >
                {t("farmerProfile.txtOrgAddress")}
              </Typography>
              <Typography
                variant="body1"
              >
               {farmerDetails && farmerDetails.orgAddress}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Land Details */}
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
              {t("farmerProfile.txtLandDetails")}
            </Typography>
            {/* Add Button for Adding Land */}
            <Link href="/add-land">
              <Button
                sx={btnBackgroundColor}
                variant="outlined"
                endIcon={<AddIcon />}
              >
                {t("farmerProfile.capBtnAdd")}
              </Button>
            </Link>
          </Grid>
          {/* Include the LandsTable component */}
          <Grid item xs={12}>
            <LandsTable title="Farmer profile" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
