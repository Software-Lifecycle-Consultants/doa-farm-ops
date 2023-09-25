import * as React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import {
  EditNote as EditNoteIcon,
  AccountCircle as AccountCircleIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import ProfileTitle from "../components/ProfileTitle";
import LandsTable from "@/components/LandsTable";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  sampleFarmerProfileData,
} from "../data/farmerProfile";

/**
 * This component represents the farmer's profile page, displaying personal information, other details, and a table of land details associated with the farmer.
 * Users can view and edit their profile information, as well as add new land details.
 */
export default function FarmerProfile() {
  const router = useRouter();
  return (
    <>
      {/* Main grid container */}
      <Grid container direction="column" rowGap={2}>
        {/* Title */}
        <Grid item xs={12}>
          <ProfileTitle  title="Farmer profile" />
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
              <Typography
                sx={{
                  color: "#000",
                  fontFamily: "DM Sans",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                  marginBottom: "4px",
                }}
              >
                {sampleFarmerProfileData.firstname}{" "}
                {sampleFarmerProfileData.lastname}
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                farmer
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
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleFarmerProfileData.firstname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleFarmerProfileData.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleFarmerProfileData.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleFarmerProfileData.nic}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleFarmerProfileData.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleFarmerProfileData.phonenumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Households
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
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
              <Typography
                sx={{
                  fontFamily: "DM Sans",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "16px",
                }}
              >
                Other Details
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
            {/* Other Details Fields */}
            <Grid item xs={12} md={12}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Organization Name
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                {sampleFarmerProfileData.otherdetails.orgname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                sx={{
                  color: "#9D9D9D",
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
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
            <Typography
              sx={{
                fontFamily: "DM Sans",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "16px",
              }}
            >
              Land Details
            </Typography>
            {/* Add Button for Adding Land */}
            <Link href="/AddLand">
              <Button
                sx={{ backgroundColor: "#FFFFFF" }}
                variant="outlined"
                endIcon={<AddIcon />}
              >
                Add
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
