"use client";
import React, { useState, useEffect } from "react";
import {
  Stack,
  Button,
  MenuItem,
  FormControl,
  RadioGroup,
  Radio,
  Container,
  Typography,
  Box,
  Grid,
  FormControlLabel,
  TextField,
  Autocomplete 
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateCrop } from "@/redux/cropSlice";
import { cropList } from "@/data/cropsData";
import { RootState } from "@/redux/types";

// Styles for labels
const styles = {
  label: {
    color: "black",
  },
};

/**
 * Add Crop page serves as a form to add details about crop properties.
 */
export default function UpdateCrop() {
  const router = useRouter();
    
  const cropNames = cropList.map(crop => crop.name);

  // State variables for form fields
  const [value, setValue] = React.useState("female");
  const [isCultivationLoan, setIsCultivationLoan] = useState("");
  const [landId, setLandId] = useState("");

  interface FormData {
    cropName: string | null;
    season: string;
    cropType: string;
    totalSoldQty: string;
    totalIncome: string;
    reservedQtyHome: string;
    reservedQtySeed: string;
    noOfPicks: string;
    loanObtained: number;
  }
  
  const [formData, setFormData] = useState<FormData>({
    cropName: null, // Specify the type as string | null
    season: "1",
    cropType: "",
    totalSoldQty: "",
    totalIncome: "",
    reservedQtyHome: "",
    reservedQtySeed: "",
    noOfPicks: "",
    loanObtained: 0,
  });

  const dispatch = useDispatch();

  // Retrieve data from Redux store
  // const cropDetails = useSelector((state: RootState) => state.cropSlice.cropDetails);

  // Handle selection change for "Select Land" dropdown
  const handleOnChangeLand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLandId(event.target.value);
  };
  // Handle radio button change for crop type
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  // Handle selection change for "Cultivation loan obtained?" dropdown
  const handleCultivationLoanChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCultivationLoan(event.target.value);
    setFormData({
      ...formData,
      loanObtained: 0,
    });
  };

  //Function to navigate to add land page
  const navigationToAddLand = () => {
    router.push("/add-land");
  };
  //Function to navigate to my crops page clicking save button
  const handleOnClickUpdateCrop = async (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Simulate add crop action by creating a user data object.
    const cropData = {landId, cropDetails: formData };
    // Dispatch the 'login' action from the 'authSlice' with the user data.
    dispatch(updateCrop(cropData));
    //Navigate to my crops page
    router.push("/my-crops");
  };

  //Function to navigate to my crops page clicking cancel button
  const navigationToMyCrops = () => {
    router.push("/my-crops");
  };

  // Define a function to handle add crop.
  const handleChangeUpdateCrop = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

// Define a function to select crop name.
  const selectChangeUpdateCropName = (
    event: any, newValue: string | null
  ) => {
    setFormData({
      ...formData,
      cropName: newValue,
    });
  };

  // Populate form fields with retrieved data
  // useEffect(() => {
  //   if (addedCropData) {
  //     setFormData({
  //       cropName: addedCropData.cropDetails.cropName || null,
  //       season: addedCropData.cropDetails.season || "1",
  //       cropType: addedCropData.cropDetails.cropType || "",
  //       totalSoldQty: addedCropData.cropDetails.totalSoldQty || "",
  //       totalIncome: addedCropData.cropDetails.totalIncome || "",
  //       reservedQtyHome: addedCropData.cropDetails.reservedQtyHome || "",
  //       reservedQtySeed: addedCropData.cropDetails.reservedQtySeed || "",
  //       noOfPicks: addedCropData.cropDetails.noOfPicks || "",
  //       loanObtained: addedCropData.cropDetails.loanObtained || 0,
  //     });
  //     setLandId(addedCropData.landId || "");
  //   }
  // }, [addedCropData]);

  // Styles for the container box
  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "3px solid #F1F1F1",
    background: "#FFFFFF",
    padding: "3vh", //  padding
    margin: "5vh auto", // margin
    maxWidth: "600px", // Max width for tablets
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
            Update Crop
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>

          <Typography
            component="h1"
            variant="subtitle1"
            paddingTop={"15px"}
            gutterBottom
          >
            Fill the bellow details to update the crop
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Crop Name *</Typography>
              <Autocomplete
                options={cropNames}
                getOptionLabel={(option) => option}
                value={formData.cropName}
                onChange={(event, newValue) =>
                  selectChangeUpdateCropName(event, newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="cropName"
                    placeholder="Select Crop"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Season *</Typography>
              <TextField
                select
                fullWidth
                placeholder="Select season"
                defaultValue={"Season"}
                variant="outlined"
                value={formData.season}
                onChange={(e) => handleChangeUpdateCrop(e, "season")}
              >
                <MenuItem value="1">Select an Option</MenuItem>
                <MenuItem value="Yala">Yala</MenuItem>
                <MenuItem value="Maha">Maha</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <Typography id="demo-controlled-radio-buttons-group">
                  Crop Type *
                </Typography>
                <RadioGroup
                  style={{ width: "100%" }}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={formData.cropType}
                  onChange={(e) => handleChangeUpdateCrop(e, "cropType")}
                  row
                >
                  <FormControlLabel
                    value="paddy"
                    control={<Radio />}
                    label="Paddy"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Total sold quantity</Typography>
              <TextField
                fullWidth
                id="soldQuantity"
                placeholder="Enter total sold quantity"
                name="soldQuantity"
                autoComplete="soldQuantity"
                value={formData.totalSoldQty}
                onChange={(e) => handleChangeUpdateCrop(e, "totalSoldQty")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Total income for crop</Typography>
              <TextField
                fullWidth
                name="income"
                placeholder="Enter total income for crop"
                id="income"
                autoComplete="income"
                value={formData.totalIncome}
                onChange={(e) => handleChangeUpdateCrop(e, "totalIncome")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Quantity kept for home</Typography>
              <TextField
                fullWidth
                id="QtyForHome"
                placeholder="Enter quantity kept for home"
                name="QtyForHome"
                autoComplete="QtyForHome"
                value={formData.reservedQtyHome}
                onChange={(e) => handleChangeUpdateCrop(e, "reservedQtyHome")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Quantity kept for seed</Typography>
              <TextField
                fullWidth
                name="qtyForSeed"
                placeholder="Enter quantity kept for seed"
                id="qtyForSeed"
                autoComplete="qtyForSeed"
                value={formData.reservedQtySeed}
                onChange={(e) => handleChangeUpdateCrop(e, "reservedQtySeed")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Number of picks</Typography>
              <TextField
                fullWidth
                id="NoOfPicks"
                placeholder="Enter number of picks"
                name="NoOfPicks"
                autoComplete="NoOfPicks"
                value={formData.noOfPicks}
                onChange={(e) => handleChangeUpdateCrop(e, "noOfPicks")}
              />
            </Grid>
            <Grid
              container
              spacing={2}
              paddingLeft={"16px"}
              paddingTop={"16px"}
            >
              <Grid item xs={12} sm={6}>
              <Typography>Cultivation loan obtained? *</Typography>
                <TextField
                  select
                  required
                  fullWidth
                  value={isCultivationLoan}
                  onChange={handleCultivationLoanChange}
                  variant="outlined"
                  InputLabelProps={{
                    style: styles.label, // Apply the label color style here
                  }}
                >
                  <MenuItem value="">Select an Option</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography>Cultivation loan amount</Typography>
                <TextField
                  fullWidth
                  value={formData.loanObtained}
                  onChange={(e) => handleChangeUpdateCrop(e, "loanObtained")}
                  variant="outlined"
                  disabled={
                    isCultivationLoan === "no" || isCultivationLoan === ""
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={4} paddingTop={4}>
              {/* Cancel Button */}
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                sx={{ mt: 3, mb: 2, width: "12vw" }}
                onClick={navigationToMyCrops}
              >
                Cancel
              </Button>
              {/* Save Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2, width: "12vw" }}
                onClick={handleOnClickUpdateCrop}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
        </Box>
      </Box>
    </Container>
  );
}
