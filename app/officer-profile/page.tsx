// Import necessary modules and components
"use client";
import * as React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import ProfileTitle from "../../components/ProfileTitle";
import { EditNote as EditNoteIcon, AccountCircle as AccountCircleIcon } from "@mui/icons-material";

// Import the router object to handle routing
import { useRouter } from "next/navigation";

//Import necessary date from relevent data files
import {
  sampleOfficerProfileData,
} from "../../data/officerProfile";

import { useTranslation } from 'react-i18next';
import { btnBackgroundColor, customGridStyles1, customGridStyles2 } from "@/styles/customStyles";
import { CustomBox2 } from "@/Theme";

// OfficerProfile component renders a profile page for an officer.
export default function OfficerProfile() {
  const router = useRouter();

  const { t } = useTranslation();
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
                {sampleOfficerProfileData.firstname}{" "}
                {sampleOfficerProfileData.lastname}
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
                {sampleOfficerProfileData.firstname}
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
                {sampleOfficerProfileData.lastname}
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
                {sampleOfficerProfileData.email}
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
                {sampleOfficerProfileData.nic}
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
                {sampleOfficerProfileData.address}
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
                {sampleOfficerProfileData.phonenumber}
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
                {sampleOfficerProfileData.organization.name}
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
                {sampleOfficerProfileData.organization.address}
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
                {sampleOfficerProfileData.education.university}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
