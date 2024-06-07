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
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
// Import the router object to handle routing
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";
import { addNewLand } from "@/redux/landSlice";
import { useTranslation } from 'react-i18next';
import i18n from "../config/i18n";// Import the i18n instance
import MapComponent from "../../components/MapComponent";
import { CustomBox1 } from "@/Theme";
import axios from "axios";
import store from "@/redux/store";
// Import the necessary selectors from the respective slices
import { selectLands } from "@/redux/landSlice";
import { selectAuth } from "@/redux/authSlice";
import { districtList } from "@/data/landsData";
import { z } from "zod";
import { ZodErrors } from "@/components/ZodErrors";;

// Define Zod schema for form validation
const landSchema = z.object({
  landName: z.string().min(1, "Land name is required"),
  district: z.string().min(1, "District is required"),
  dsDivision: z.string().min(1, "Division is required"),
  landRent: z.string().min(1, "Land rent is required"),
  irrigationMode: z.string().min(1, "Irrigation mode is required"),

});
/**
 * Add Land page serves as a form to add details about land properties.
 */

export default function AddNewLand() {
  const router = useRouter();

  const districtNames = districtList.map((district) => district.name);

  //const landDetails = useSelector((state: RootState) => state.land);

  // State for managing form data and map-related data
  const [markerCoordinates, setMarkerCoordinates] = useState<number[] | null>(
    null
  );
  const [polygonCoordinates, setPolygonCoordinates] = useState<number[][][]>(
    []
  );
  const [drawType, setDrawType] = useState<"Point" | "Polygon">("Point");
  const { t } = useTranslation();

  const [responseData, setResponseData] = useState(null);

  // Define the structure of the form data
  interface FormData {
    _id: string;
    landName: string;
    district: string | null;
    dsDivision: string;
    landRent: string;
    irrigationMode: string;
    userId: string;

  }

  const [formData, setFormData] = useState<FormData>({
    _id: "",
    landName: "",
    district: null,
    dsDivision: "",
    landRent: "",
    irrigationMode: "",
    userId: "",

  });

  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({});
  const dispatch = useDispatch();

  // Managing state for displaying the map
  const [showMap, setShowMap] = useState(false);

  // Function to show the map
  const handleShowMap = () => {
    setShowMap(true);
  };

  //Function to navigate to Farmer Profile page clicking save & exit to Farmer Profile button
  const handleOnClickAddNewLand = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
     try {
      const validation = landSchema.safeParse(formData);
      if (!validation.success) {
        const flattenedErrors = validation.error.flatten().fieldErrors;
        setValidationErrors({
          landName: flattenedErrors.landName?.[0],
          district: flattenedErrors.district?.[0],
          dsDivision: flattenedErrors.dsDivision?.[0],
          landRent: flattenedErrors.landRent?.[0],
          irrigationMode: flattenedErrors.irrigationMode?.[0],
        });
        return;
      }
      const action = addNewLand(formData);
      dispatch(action);

      //Get logged user Id from redux
      const loggedUser = selectAuth(store.getState());
      const userId = loggedUser.auth._id;

      // Get land data from the Redux store
      const landData = selectLands(store.getState());
      const landDataObject = landData?.[landData.length - 1];
      const landDetails = { ...landDataObject, userId };

      const response = await axios.post(
        "http://localhost:5000/api/land/create", landDetails
      );
      if (response && response.status === 200) {
        setResponseData(response.data);
        setOpenSuccessDialog(true); // Open success dialog on success
      } else if (response && response.status === 400) {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Function to navigate to add crop page
  const navigationToAddCrop = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const fromAddLandValue = true; // Set the value you want to pass through url
      const landData = formData;
      const action = addNewLand(landData);
      dispatch(action);
      router.push(`/add-crop?fromAddLand=${fromAddLandValue}`); //Pass the value
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Event handler to add form field data
  const handleChangeAddNewLand = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      // landId: (landDetails.length + 1).toString(),
      [field]: event.target.value,
    });
  };

  // Handler for changing the drawing type on the map
  const handleDrawTypeChange = (type: "Point" | "Polygon") => {
    setDrawType(type);
  };

  // Define a function to select district.
  const selectChangeAddDistrict = (event: any, newValue: string | null) => {
    setFormData({
      ...formData,
      district: newValue,
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
  //  manage the visibility of the success dialog
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    router.push("/farmer-profile");
  };

  return (
    <Container component="main" maxWidth="xl">
      <CustomBox1 sx={{ maxWidth: "500px" }}>
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
            <MapComponent
              setMarkerCoordinates={setMarkerCoordinates}
              setPolygonCoordinates={setPolygonCoordinates}
              drawType={drawType}
            />
            <Grid sx={{ width: "100%" }}>
              <TextField
                select
                fullWidth
                placeholder="Select Map Drawer"
                defaultValue="Point"
                variant="outlined"
                value={drawType}
                onChange={(e) =>
                  handleDrawTypeChange(e.target.value as "Point" | "Polygon")
                }
              >
                <MenuItem value="Point">Point</MenuItem>
                <MenuItem value="Polygon">Polygon</MenuItem>
              </TextField>
            </Grid>
            {/* Display marker coordinates if it's a point or polygon */}
            {markerCoordinates && drawType === "Point" && (
              <Grid>
                <p>Marker Coordinates: {markerCoordinates.join(", ")}</p>
              </Grid>
            )}
            {polygonCoordinates && drawType === "Polygon" && (
              <Grid>
                {polygonCoordinates.map((Coordinates, index) => (
                  <p key={index}>
                    Marker Coordinates: {Coordinates.join(", ")}
                  </p>
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
                onChange={(e) => handleChangeAddNewLand(e, "landName")}
              />
                {validationErrors.landName && (
                <ZodErrors error={[validationErrors.landName]} />)}
                
            </Grid>
            <Grid item xs={12}>
              <Typography>{i18n.t("addLand.lblDistrict")}</Typography>
              <Autocomplete
                options={districtNames}
                getOptionLabel={(option) => option}
                value={formData.district}
                onChange={(event, newValue) =>
                  selectChangeAddDistrict(event, newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="district"
                    placeholder="Select District"
                    variant="outlined"
                  />
                )}
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
                onChange={(e) => handleChangeAddNewLand(e, "dsDivision")}
              />
              {validationErrors.dsDivision && (
              <ZodErrors error={[validationErrors.dsDivision]} />)}
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
                onChange={(e) => handleChangeAddNewLand(e, "landRent")}
              />
               {validationErrors.landRent && (
              <ZodErrors error={[validationErrors.landRent]} />)}
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
                onChange={(e) => handleChangeAddNewLand(e, "irrigationMode")}
              />
              {validationErrors.irrigationMode && (
              <ZodErrors error={[validationErrors.irrigationMode]} />)}

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
                onClick={handleOnClickAddNewLand}
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
        <Dialog
          open={openSuccessDialog}
          onClose={handleCloseSuccessDialog}
          aria-labelledby="success-dialog-title"
        >
          {/* Display a translated 'Record added successfully!' message based on the selected language. */}
          <DialogTitle id="success-dialog-title"> {i18n.t("dialogBoxes.txtAddedSuccess")}</DialogTitle>
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleCloseSuccessDialog} variant="contained" color="primary">
              {i18n.t("dialogBoxes.capBtnOk")}
            </Button>
          </DialogActions>
        </Dialog>
      </CustomBox1>
    </Container>
  );
}
