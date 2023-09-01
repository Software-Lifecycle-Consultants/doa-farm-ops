import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProfileTitle from "../components/ProfileTitle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import LandsTable from "@/components/LandsTable";

export default function FarmerProfile() {
  return (
    <>
      <Grid container direction="column" rowGap={2}>
        <Grid item xs={12}>
          <ProfileTitle title="Farmer profile" />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              background: "#FFFFFF",
              border: "3px solid #F1F1F1",
              padding: "3vh",
              Width: "90%",
              gap: "53px",
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
                Sugath Jayaweera
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

              <Button
                sx={{ backgroundColor: "#FFFFFF" }}
                variant="outlined"
                endIcon={<EditNoteIcon />}
              >
                Edit
              </Button>
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
                Sugath
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
                Jayaweera
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
                sugath@gmail.com
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
                991234567V
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
                112/B, Kahanthota Rd, Malabe
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
                (+94)712345678
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
                3
              </Typography>
            </Grid>
          </Grid>
        </Grid>

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
                Green Asia Pvt.Ltd
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
                112/B, Kahanthota Rd, Malabe
              </Typography>
            </Grid>
          </Grid>
        </Grid>
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

            <Button
              sx={{ backgroundColor: "#FFFFFF" }}
              variant="outlined"
              endIcon={<AddIcon />}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12}>
            <LandsTable title="Farmer profile" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}