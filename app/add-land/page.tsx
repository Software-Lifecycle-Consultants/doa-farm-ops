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
  MenuItem,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
// Import the router object to handle routing
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addLand } from "@/redux/landSlice";
import { RootState } from "@/redux/types";
import { useTranslation } from 'react-i18next';
import i18n from "../config/i18n";// Import the i18n instance
import MapComponent from "../../components/MapComponent";
import { CustomBox1 } from "@/Theme";
import axios from "axios";

/**
 * Add Land page serves as a form to add details about land properties.
 */

export default function AddLand() {
  const router = useRouter();
  const landDetails = useSelector((state: RootState) => state.land);
  // State for managing form data and map-related data
  const [markerCoordinates, setMarkerCoordinates] = useState<number[] | null>(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState<number[][][]>([]);
  const [drawType, setDrawType] = useState<'Point' | 'Polygon'>('Point');
  const { t } = useTranslation();

  const [responseData, setResponseData] = useState(null);
  
  // Define the structure of the form data
  interface FormData {
    landId: string;
    landName: string;
    district: string;
    dsDivision: string;
    landRent: string;
    irrigationMode: string;
  }

  const [formData, setFormData] = useState<FormData>({
    landId: "",
    landName: "",
    district: "",
    dsDivision: "",
    landRent: "",
    irrigationMode: ""
  });

  const dispatch = useDispatch();

  // Managing state for displaying the map
  const [showMap, setShowMap] = useState(false);

  // Function to show the map
  const handleShowMap = () => {
    setShowMap(true);
  };

  //Function to navigate to my crops page clicking save & exit to my crops button
  const handleOnClickAddLand = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const landData = { landDetails: formData };
    try {
      const response = await axios.post("http://localhost:5000/api/land/create",
        {
          landId: formData.landId,
          landName: formData.landName,
          district: formData.district,
          dsDivision: formData.dsDivision,
          landRent: formData.landRent,
          irrigationMode: formData.irrigationMode
        }
      );
      if (response && response.status === 200){
        console.log(response);
        setResponseData(response.data);
        router.push("/my-crops");
        // Simulate an add land action by creating a land data object.
        dispatch(addLand(landData));
      } else if (response && response.status === 400){
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  // Handler for changing the drawing type on the map
  const handleDrawTypeChange = (type: "Point" | "Polygon") => {
    setDrawType(type);
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
      <CustomBox1 sx={{maxWidth: "500px"}}>
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            {i18n.t("addLand.txtAddLand")}
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
              {i18n.t("addLand.txtFillDetails")}
            </Typography>

            {/* Button for marking on the map */}
            <Button endIcon={<PlaceOutlinedIcon />} onClick={handleShowMap}>
              {i18n.t("addLand.capBtnMark")}
            </Button>
          </Grid>
        </Grid>
        {/* Display the map if showMap is true */}
        {showMap && (
          <>
            <MapComponent setMarkerCoordinates={setMarkerCoordinates} setPolygonCoordinates={setPolygonCoordinates} drawType={drawType}/>
            <Grid sx={{ width: '100%' }}>
            <TextField
                select
                fullWidth
                placeholder="Select Map Drawer"
                defaultValue="Point"
                variant="outlined"
                value={drawType}
                onChange={(e) => handleDrawTypeChange(e.target.value as 'Point' | 'Polygon')}
              >
                <MenuItem value="Point">Point</MenuItem>
                <MenuItem value="Polygon">Polygon</MenuItem>
              </TextField>
            </Grid>
            {/* Display marker coordinates if it's a point or polygon */}
            {markerCoordinates && drawType==='Point' &&(
                <Grid>
                    <p>Marker Coordinates: {markerCoordinates.join(', ')}</p>
                </Grid>
            )}
            {polygonCoordinates && drawType==='Polygon' &&(
                <Grid>
                    {polygonCoordinates.map((Coordinates) => (
                        <p>Marker Coordinates: {Coordinates.join(', ')}</p>
                    ))}
                </Grid>
            )}
          </>
        )}

        {/* Form for Land Details */}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{i18n.t("addLand.lblLandName")}</Typography>
              <TextField
                required
                fullWidth
                id="landName"
                placeholder={i18n.t("addLand.hintTxtLandName")}
                name="landName"
                autoComplete="landName"
                value={formData.landName}
                onChange={(e) => handleChangeAddLand(e, "landName")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("addLand.lblDistrict")}</Typography>
              <TextField
                required
                fullWidth
                id="district"
                placeholder={i18n.t("addLand.hintTxtDistrict")}
                name="district"
                autoComplete="district"
                value={formData.district}
                onChange={(e) => handleChangeAddLand(e, "district")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("addLand.lblDivision")}</Typography>
              <TextField
                required
                fullWidth
                name="division"
                placeholder={i18n.t("addLand.hintTxtDivision")}
                type="division"
                id="division"
                autoComplete="division"
                value={formData.dsDivision}
                onChange={(e) => handleChangeAddLand(e, "dsDivision")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("addLand.lblLandRent")}</Typography>
              <TextField
                required
                fullWidth
                name="landRent"
                placeholder={i18n.t("addLand.hintTxtLandRent")}
                type="landRent"
                id="landRent"
                autoComplete="landRent"
                value={formData.landRent}
                onChange={(e) => handleChangeAddLand(e, "landRent")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("addLand.lblMode")}</Typography>
              <TextField
                required
                fullWidth
                name="modeOfIrrigation"
                placeholder={i18n.t("addLand.hintTxtMode")}
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
                {i18n.t("addLand.capBtnSave&Exit")}
              </Button>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ fontSize: 11, padding: 0, height: "50px" }}
                onClick={navigationToAddCrop}
              >
                {i18n.t("addLand.capBtnSave&Proceed")}
              </Button>
            </Stack>
          </Grid>
        </Box>
      </CustomBox1>
    </Container>
  );
}
