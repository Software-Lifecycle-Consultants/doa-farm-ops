// Import necessary modules and components
"use client";
import * as React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import ProfileTitle from "../../components/ProfileTitle";
import {EditNote as EditNoteIcon, AccountCircle as AccountCircleIcon}from "@mui/icons-material";

// Import the router object to handle routing
import { useRouter } from "next/navigation";

//Import necessary date from relevent data files
import {
  OfficerProfileData,
  sampleOfficerProfileData,
} from "../../data/officerProfile";

// OfficerProfile component renders a profile page for an officer.
export default function OfficerProfile() {
  const router = useRouter();

  // Return the JSX for rendering
  return (
    <>
       {/* Main grid container */}
      <Grid container direction="column" rowGap={2}>
        <Grid item xs={12}>
          {/* Page title */}
          <ProfileTitle title="Officer profile" />
        </Grid>
        {/* Officer Info Section*/}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              background: "#FFFFFF",
              border: "3px solid #F1F1F1",
              padding: "3vh",
              Width: "90%",
              gap: "53px",
              borderRadius: "12px",
            }}
          >
            <Box>
              <AccountCircleIcon sx={{ fontSize: "50px" }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                  marginBottom: "4px",
                }}
              >
                {sampleOfficerProfileData.firstname}{" "}
                {sampleOfficerProfileData.lastname}
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Officer
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
              <Typography
                sx={{
                  
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "16px",
                }}
              >
                Personal Information
              </Typography>
              {/* Edit Button */}
              <Button
                sx={{ backgroundColor: "#FFFFFF" }}
                variant="outlined"
                endIcon={<EditNoteIcon />}
              >
                Edit
              </Button>
            </Grid>
            {/* Personal Information Fields */}
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                First Name
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleOfficerProfileData.firstname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Last Name
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleOfficerProfileData.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Email
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleOfficerProfileData.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                NIC Number
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleOfficerProfileData.nic}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Address
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleOfficerProfileData.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Phone Number
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleOfficerProfileData.phonenumber}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Organization & Education Details Section*/}
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
              <Typography
                sx={{
                  
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "16px",
                }}
              >
                Organization
              </Typography>

              <Button
                sx={{ backgroundColor: "#FFFFFF" }}
                variant="outlined"
                endIcon={<EditNoteIcon />}
              >
                Edit
              </Button>
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Name
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleOfficerProfileData.organization.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Address
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleOfficerProfileData.organization.address}
              </Typography>
            </Grid>

            <Grid container item xs={12} md={12} paddingTop={'2vh'}>
              <Typography
                sx={{
                  
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "16px",
                }}
              >
                Education
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                University
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
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
