"use client";
import React, { useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector} from "react-redux";
import { cropList } from "@/data/cropsData";
import { CustomBox1 } from "@/Theme";
import axios from 'axios';
import i18n from "../config/i18n";
import store from "@/redux/store";
// Import the necessary selectors from the respective slices
import { selectLands,fetchAndRegisterLands } from "@/redux/landSlice";
import { addCrop, addCropAsync, addLandAndCropAsync } from "@/redux/cropSlice";
import { selectAuth } from "@/redux/authSlice";
import {RootState,Land} from "@/redux/types";
import { AppDispatch } from '@/redux/store'; // Import the AppDispatch type

// Styles for labels
const styles = {
  label: {
    color: "black",
  },
};

/**
 * Add Crop page serves as a form to add details about crop properties.
 */

export default function AddCrop() {
  const router = useRouter();
  // Get land data from the Redux store
  const landData = selectLands(store.getState());
  const landDataObject = landData ? landData[landData.length - 1] : {};
  console.log("----------selectLands----------------", landDataObject);

  // Use the Next.js hook to retrieve search parameters from the URL
  const searchParams = useSearchParams()
  const fromAddLand = searchParams.get('fromAddLand')

  const cropNames = cropList.map((crop) => crop.name);

  // State variables for form fields
  const [value, setValue] = React.useState("female");
  const [landId, setLandId] = useState("");

  const [responseData, setResponseData] = useState(null);
  
  interface FormData {
    cropName: string | null;
    season: string;
    cropType: string;
    totalSoldQty: string;
    totalIncome: string;
    reservedQtyHome: string;
    reservedQtySeed: string;
    noOfPicks: string;
    isCultivationLoan: string;
    loanObtained: number;
    landId:string;
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
    isCultivationLoan: "1",
    loanObtained: 0,
    landId:"",
  });

  const dispatch:AppDispatch = useDispatch();
  // Fetch the land details when the component mounts

  React.useEffect(() => {
    dispatch(fetchAndRegisterLands(landId));
  }, [dispatch, landId]);


  const handleOnChangeLand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLandId(event.target.value);

    const selectedLand = landData.find((land:Land) => land._id === event.target.value);
    console.log("---------------------selectedLand------------+"+ selectedLand);
    if (selectedLand) {
      setFormData({ ...formData, landId: event.target.value});
    } else {
      setFormData({ ...formData}); // Reset landName if no match found
    }
  };

  // Handle selection change for "Cultivation loan obtained?" dropdown
  const handleCultivationLoanChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      isCultivationLoan: event.target.value,
      loanObtained: 0,
    });
  };

  //Function to navigate to add land page
  const navigationToAddLand = () => {
    router.push("/add-land");
  };

  // Retrieve Crop Data from Redux Store (using useSelector hook)
  const landCropData = useSelector((state: RootState) => state.crop);

  //Function to navigate to my crops page clicking save button
  const handleOnClickAddCrop = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const cropData = { ...formData };

    //Get logged user Id from redux
    const loggedUser = selectAuth(store.getState());
    const userId = loggedUser.auth._id;
    console.log("----------getUserFromRedux----------------", userId);

    // Prepare landCropData object (assuming landId exists)
    const landDataObject = landData ? landData[landData.length - 1] : {};
    const landCropData = {
      ...landDataObject,
      ...cropData,
      userId,
    };

    const CropDataOnly = {
      ...cropData,
      userId,
    };

    dispatch(addCrop(CropDataOnly));

    console.log(
      "------------landCropData-----------" + JSON.stringify(landCropData)
    );

    try {
      if (landId) {
        // If Land Selected
         await dispatch(addCropAsync(CropDataOnly)); // Dispatch thunk for individual crop data
    } else {
          // If no Land Selected  
          await dispatch(addLandAndCropAsync(landCropData)); // Dispatch thunk for combined data
      }
      setResponseData(null); // Reset response data state after successful dispatch
      router.push("/my-crops"); // Navigate to my crops page
    } catch (error) {
      console.error("Error adding crop or land and crop data:", error);
    }
  };


  //Function to navigate to my crops page
  const navigationToMyCrops = () => {
    router.push("/my-crops");
  };

  // Define a function to handle add crop.
  const handleChangeAddCrop = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  // Define a function to select crop name.
  const selectChangeAddCropName = (event: any, newValue: string | null) => {
    setFormData({
      ...formData,
      cropName: newValue,
    });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CustomBox1 sx={{ maxWidth: "600px" }}>
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            {i18n.t("addCrop.txtAddCrop")}
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          {!fromAddLand && (
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={2} paddingTop={2}>
                <TextField
                  required
                  select
                  fullWidth
                  label={i18n.t("addCrop.menuItemTxtSelectLand")}
                  defaultValue={"land"}
                  value={landId}
                  onChange={handleOnChangeLand}
                  variant="outlined"
                >
                  <MenuItem>
                    {/* Display a placeholder option*/}
                    {i18n.t("addCrop.menuItemTxtSelectLand")}
                  </MenuItem>
                  {landData?.map((land:Land) => (
                      <MenuItem key={land._id} value={land._id}>
                        {land.landName}
                      </MenuItem>
                  ))}
                </TextField>

                <Typography component="h1" variant="subtitle1" gutterBottom>
                  {i18n.t("addCrop.txtOr")}
                </Typography>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  onClick={navigationToAddLand}
                >
                  {i18n.t("addCrop.capBtnAddLand")}
                </Button>
              </Stack>
            </Grid>
          )}

          <Typography
            component="h1"
            variant="subtitle1"
            paddingTop={"15px"}
            gutterBottom
          >
            {i18n.t("addCrop.txtFillDetails")}
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{i18n.t("addCrop.lblCropName")}</Typography>
              <Autocomplete
                options={cropNames}
                getOptionLabel={(option) => option}
                value={formData.cropName}
                onChange={(event, newValue) =>
                  selectChangeAddCropName(event, newValue)
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
              <Typography>{i18n.t("addCrop.lblSeason")}</Typography>
              <TextField
                select
                fullWidth
                placeholder="Select season"
                defaultValue={"Season"}
                variant="outlined"
                value={formData.season}
                onChange={(e) => handleChangeAddCrop(e, "season")}
              >
                <MenuItem value="1">
                  {i18n.t("addCrop.menuItemTxtSelectOption2")}
                </MenuItem>
                <MenuItem value="Yala">
                  {i18n.t("addCrop.menuItemTxtYala")}
                </MenuItem>
                <MenuItem value="Maha">
                  {i18n.t("addCrop.menuItemTxtMaha")}
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <Typography id="demo-controlled-radio-buttons-group">
                  {i18n.t("addCrop.lblCropType")}
                </Typography>
                <RadioGroup
                  style={{ width: "100%" }}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={formData.cropType}
                  onChange={(e) => handleChangeAddCrop(e, "cropType")}
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
              <Typography>{i18n.t("addCrop.lblSoldQuantity")}</Typography>
              <TextField
                fullWidth
                id="soldQuantity"
                placeholder="Enter total sold quantity"
                name="soldQuantity"
                autoComplete="soldQuantity"
                value={formData.totalSoldQty}
                onChange={(e) => handleChangeAddCrop(e, "totalSoldQty")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("addCrop.lblIncome")}</Typography>
              <TextField
                fullWidth
                name="income"
                placeholder="Enter total income for crop"
                id="income"
                autoComplete="income"
                value={formData.totalIncome}
                onChange={(e) => handleChangeAddCrop(e, "totalIncome")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("addCrop.lblQuantityHome")}</Typography>
              <TextField
                fullWidth
                id="QtyForHome"
                placeholder="Enter quantity kept for home"
                name="QtyForHome"
                autoComplete="QtyForHome"
                value={formData.reservedQtyHome}
                onChange={(e) => handleChangeAddCrop(e, "reservedQtyHome")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("addCrop.lblQuantitySeed")}</Typography>
              <TextField
                fullWidth
                name="qtyForSeed"
                placeholder="Enter quantity kept for seed"
                id="qtyForSeed"
                autoComplete="qtyForSeed"
                value={formData.reservedQtySeed}
                onChange={(e) => handleChangeAddCrop(e, "reservedQtySeed")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("addCrop.lblNoOfPicks")}</Typography>
              <TextField
                fullWidth
                id="NoOfPicks"
                placeholder="Enter number of picks"
                name="NoOfPicks"
                autoComplete="NoOfPicks"
                value={formData.noOfPicks}
                onChange={(e) => handleChangeAddCrop(e, "noOfPicks")}
              />
            </Grid>
            <Grid
              container
              spacing={2}
              paddingLeft={"16px"}
              paddingTop={"16px"}
            >
              <Grid item xs={12} sm={6}>
                <Typography>{i18n.t("addCrop.lblCultivationLoan")}</Typography>
                <TextField
                  select
                  required
                  fullWidth
                  placeholder="Select an Option"
                  value={formData.isCultivationLoan}
                  onChange={handleCultivationLoanChange}
                  variant="outlined"
                  InputLabelProps={{
                    style: styles.label, // Apply the label color style here
                  }}
                >
                  <MenuItem value="1">
                    {i18n.t("addCrop.menuItemTxtSelectOption3")}
                  </MenuItem>
                  <MenuItem value="Yes">
                    {i18n.t("addCrop.menuItemTxtYes")}
                  </MenuItem>
                  <MenuItem value="No">
                    {i18n.t("addCrop.menuItemTxtNo")}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  {i18n.t("addCrop.lblCultivationLoanAmount")}
                </Typography>
                <TextField
                  fullWidth
                  value={formData.loanObtained}
                  onChange={(e) => handleChangeAddCrop(e, "loanObtained")}
                  variant="outlined"
                  disabled={
                    formData.isCultivationLoan === "No" ||
                    formData.isCultivationLoan === "" ||
                    formData.isCultivationLoan === "1"
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
                  {i18n.t("addCrop.capBtnCancel")}
                </Button>
                {/* Save Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2, width: "12vw" }}
                  onClick={handleOnClickAddCrop}
                >
                  {i18n.t("addCrop.capBtnSave")}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </CustomBox1>
    </Container>
  );
}
