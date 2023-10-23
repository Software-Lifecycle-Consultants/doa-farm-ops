// Import necessary modules and components
"use client";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
// Import the router object to handle routing
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addLand } from "@/redux/landSlice";
import { RootState } from "@/redux/types";

/**
 * Add Land page serves as a form to add details about land properties.
 */

export default function AddLand() {
  const router = useRouter();
  const landDetails = useSelector((state: RootState) => state.land);
  // Define the structure of the form data
  interface FormData {
    landId: string;
    landName: string;
    district: string;
    dsDivision: string;
    landRent: string;
    irrigationMode: string;
  }

  const [formData, setFormData] = useState({
    landId: "",
    landName: "",
    district: "",
    dsDivision: "",
    landRent: "",
    irrigationMode: "",
  });

  const dispatch = useDispatch();

  //Function to navigate to my crops page clicking save & exit to my crops button
  const handleOnClickAddLand = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const landData = { ...formData };

    // Simulate an add land action by creating a land data object.
    dispatch(addLand(landData));
    router.push("/my-crops");
  };
  //Function to navigate to add crop page
  const navigationToAddCrop = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    router.push("/add-crop");
  };

  // Event handler to add form field data
  const handleChangeAddLand = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      landId: (landDetails.length + 1).toString(),
      [field]: event.target.value,
    });
  };

  // Styles for the container box
  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "3px solid #F1F1F1",
    background: "#FFFFFF",
    padding: "3vh",
    margin: "5vh auto",
    maxWidth: "500px",
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          ...boxStyles,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Add Land
          </Typography>
        </Box>
        {/* Grid for Land Details */}
        <Grid container item rowGap={2}>
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
            <Typography component="h1" variant="subtitle1" gutterBottom>
              Fill the details bellow to add land
            </Typography>

            {/* Button for marking on the map */}
            <Button endIcon={<PlaceOutlinedIcon />}>Mark on Map</Button>
          </Grid>
        </Grid>

        {/* Form for Land Details */}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Land Name</Typography>
              <TextField
                required
                fullWidth
                id="landName"
                placeholder="Enter landName"
                name="landName"
                autoComplete="landName"
                value={formData.landName}
                onChange={(e) => handleChangeAddLand(e, "landName")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>District</Typography>
              <TextField
                required
                fullWidth
                id="district"
                placeholder="Enter district"
                name="district"
                autoComplete="district"
                value={formData.district}
                onChange={(e) => handleChangeAddLand(e, "district")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Division</Typography>
              <TextField
                required
                fullWidth
                name="division"
                placeholder="Enter division"
                type="division"
                id="division"
                autoComplete="division"
                value={formData.dsDivision}
                onChange={(e) => handleChangeAddLand(e, "dsDivision")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Land Rent</Typography>
              <TextField
                required
                fullWidth
                name="landRent"
                placeholder="Enter land rent"
                type="landRent"
                id="landRent"
                autoComplete="landRent"
                value={formData.landRent}
                onChange={(e) => handleChangeAddLand(e, "landRent")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Mode of Irrigation</Typography>
              <TextField
                required
                fullWidth
                name="modeOfIrrigation"
                placeholder="Enter Mode of Irrigation"
                type="modeOfIrrigation"
                id="modeOfIrrigation"
                autoComplete="modeOfIrrigation"
                value={formData.irrigationMode}
                onChange={(e) => handleChangeAddLand(e, "irrigationMode")}
              />
            </Grid>
          </Grid>
          {/* Buttons for saving and proceeding */}
          <Grid>
            <Stack direction="row" spacing={4} paddingTop={4}>
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                sx={{ fontSize: 11, padding: 0, height: "50px" }}
                onClick={handleOnClickAddLand}
              >
                Save & exit to my crops
              </Button>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ fontSize: 11, padding: 0, height: "50px" }}
                onClick={navigationToAddCrop}
              >
                Save & proceed to add crop
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
