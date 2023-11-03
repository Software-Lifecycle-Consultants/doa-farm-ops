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

import {
  sampleFarmerProfileData,
} from "../../data/farmerProfile";

import { useTranslation } from 'react-i18next';

/**
 * This component represents the farmer's profile page, displaying personal information, other details, and a table of land details associated with the farmer.
 * Users can view and edit their profile information, as well as add new land details.
 */
export default function FarmerProfile() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <>
      {/* Main grid container */}
      <Grid container direction="column" rowGap={2}>
        {/* Title */}
        <Grid item xs={12}>
          <ProfileTitle title={t('farmerProfile.txtProfileName')} />
        </Grid>
        {/* Farmer Info */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              background: "#FFFFFF",
              border: "3px solid #F1F1F1",
              padding: "3vh",
              Width: "90%",
              gap: "53px",
              borderRadius: "12px"
            }}
          >
            <Box>
              <AccountCircleIcon sx={{ fontSize: "50px" }} />
            </Box>
            <Box>
              <Typography variant="h5"
                sx={{
                  color: "#000",
                  fontWeight: "medium",
                  lineHeight: "normal",
                  marginBottom: "4px",
                }}
              >
                {sampleFarmerProfileData.firstname}{" "}
                {sampleFarmerProfileData.lastname}
              </Typography>
              <Typography variant="subtitle1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                }}
              >
                {t('farmerProfile.txtProfileType')}
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* Personal Information Section */}
        <Grid
          item
          container
          xs={12}
          p={2}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "3px solid #F1F1F1",
            borderRadius: "22px",
          }}
        >
          <Grid
            container
            item
            p={2}
            rowGap={2}
            sx={{
              backgroundColor: "#F1F1F1",
              borderRadius: "12px",
            }}
          >
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
              <Typography variant="h6"

              >
                {t('farmerProfile.txtPersonalInformation')}
              </Typography>
              {/* Edit Button */}
              <Button
                sx={{ backgroundColor: "#FFFFFF" }}
                variant="outlined"
                endIcon={<EditNoteIcon />}
              >
                {t('farmerProfile.capBtnEdit')}
              </Button>
            </Grid>
            {/* Personal Information Fields */}
            <Grid item xs={12} md={6}>
              <Typography variant="caption"
                sx={{
                  lineHeight: "normal",
                  color: "#9D9D9D",
                }}
              >
                {t('farmerProfile.txtFirstName')}
              </Typography>
              <Typography variant="body1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                  fontWeight: "500 ",
                }}
              >
                {sampleFarmerProfileData.firstname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption"
                sx={{
                  lineHeight: "normal",
                  color: "#9D9D9D",
                }}
              >
                {t('farmerProfile.txtLastName')}
              </Typography>
              <Typography variant="body1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                  fontWeight: "500 ",
                }}
              >
                {sampleFarmerProfileData.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption"
                sx={{
                  lineHeight: "normal",
                  color: "#9D9D9D",
                }}
              >
                {t('farmerProfile.txtEmail')}
              </Typography>
              <Typography variant="body1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                  fontWeight: "500 ",
                }}
              >
                {sampleFarmerProfileData.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption"
                sx={{
                  lineHeight: "normal",
                  color: "#9D9D9D",
                }}
              >
                {t('farmerProfile.txtNicNumber')}
              </Typography>
              <Typography variant="body1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                  fontWeight: "500 ",
                }}
              >
                {sampleFarmerProfileData.nic}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption"
                sx={{
                  lineHeight: "normal",
                  color: "#9D9D9D",
                }}
              >
                {t('farmerProfile.txtAddress')}
              </Typography>
              <Typography variant="body1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                  fontWeight: "500 ",
                }}
              >
                {sampleFarmerProfileData.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption"
                sx={{
                  lineHeight: "normal",
                  color: "#9D9D9D",
                }}
              >
                {t('farmerProfile.txtPhoneNumber')}
              </Typography>
              <Typography variant="body1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                  fontWeight: "500 ",
                }}
              >
                {sampleFarmerProfileData.phonenumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption"
                sx={{
                  lineHeight: "normal",
                  color: "#9D9D9D",
                }}
              >
                {t('farmerProfile.txtHouseholds')}
              </Typography>
              <Typography variant="body1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                  fontWeight: "500 ",
                }}
              >
                {sampleFarmerProfileData.household}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Other Details Section*/}
        <Grid
          item
          xs={12}
          p={2}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "3px solid #F1F1F1",
            borderRadius: "22px",
          }}
        >
          <Grid
            container
            item
            rowGap={2}
            p={2}
            sx={{
              backgroundColor: "#F1F1F1",
              borderRadius: "12px",
            }}
          >
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
              <Typography variant="h6"
              >
                {t('farmerProfile.txtOtherDetails')}
              </Typography>
              {/* Edit Button */}
              <Button
                sx={{ backgroundColor: "#FFFFFF" }}
                variant="outlined"
                endIcon={<EditNoteIcon />}
              >
                {t('farmerProfile.capBtnEdit')}
              </Button>
            </Grid>
            {/* Other Details Fields */}
            <Grid item xs={12} md={12}>
              <Typography variant="caption"
                sx={{
                  lineHeight: "normal",
                  color: "#9D9D9D",
                }}
              >
                {t('farmerProfile.txtOrgName')}
              </Typography>
              <Typography variant="body1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                  fontWeight: "500 ",
                }}
              >
                {sampleFarmerProfileData.otherdetails.orgname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="caption"
                sx={{
                  lineHeight: "normal",
                  color: "#9D9D9D",
                }}
              >
                {t('farmerProfile.txtOrgAddress')}
              </Typography>
              <Typography variant="body1"
                sx={{
                  color: "#000",
                  lineHeight: "normal",
                  fontWeight: "500 ",
                }}
              >
                {sampleFarmerProfileData.otherdetails.orgaddress}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Land Details */}
        <Grid
          container
          item
          rowGap={2}
          p={2}
          sx={{
            backgroundColor: "#F1F1F1",
            borderRadius: "12px",
          }}
        >
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
            <Typography variant="h6"
            >
              {t('farmerProfile.txtLandDetails')}
            </Typography>
            {/* Add Button for Adding Land */}
            <Link href="/add-land">
              <Button
                sx={{ backgroundColor: "#FFFFFF" }}
                variant="outlined"
                endIcon={<AddIcon />}
              >
                {t('farmerProfile.capBtnAdd')}
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
