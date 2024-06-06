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
  Dialog,
  DialogTitle,
  DialogActions
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchCrops, selectCrops, updateCropAsync } from "@/redux/cropSlice";
import { cropList } from "@/data/cropsData";
import { Crop, RootState } from "@/redux/types";
import { useTranslation } from 'react-i18next';
import i18n from "../../config/i18n";// Import the i18n instance
import { CustomBox1 } from "@/Theme";
import store, { AppDispatch } from "@/redux/store";
import { selectAuth } from "@/redux/authSlice";

// Styles for labels
const styles = {
  label: {
    color: "black",
  },
};

/**
 * Update Crop page serves as a form to update details about crop properties.
 */
export default function UpdateCrop({ params }: { params: { cropId: string } }) {

  const router = useRouter();
  const { t } = useTranslation();

  // Extract the cropId from the parameters
  const cropId = params.cropId;

  // Get crop details from the Redux store
  const cropDetails = useSelector((state: RootState) => selectCrops(state));

  // Find the specific crop detail by matching cropId
  const cropDetail = cropDetails && cropDetails?.length > 0 ? cropDetails.find((crop) => crop._id === cropId) : null;
  const cropNames = cropList.map(crop => crop.name);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  // Fetch the land details when the component mounts
  React.useEffect(() => {
    dispatch(fetchCrops(cropId));
  }, [dispatch, cropId]);

  // Initialize states
  const [isCultivationLoan, setIsCultivationLoan] = useState("");

  // Define a TypeScript interface to represent the form data
  interface FormData {
    cropName: string;
    season: string;
    cropType: string;
    totalSoldQty: string;
    totalIncome: string;
    reservedQtyHome: string;
    reservedQtySeed: string;
    noOfPicks: string;
    isCultivationLoan: string;
    loanObtained: number;
    userId: string;
    landId: string;
  }
  // Initialize form data state with values
  const crop = cropDetails?.find((c) => c._id === cropId);
  const [formData, setFormData] = useState<FormData>({
    cropName: cropDetail?.cropName || '',
    season: cropDetail?.season || '',
    cropType: cropDetail?.cropType || '',
    totalSoldQty: cropDetail?.totalSoldQty || '',
    totalIncome: cropDetail?.totalIncome || '',
    reservedQtyHome: cropDetail?.reservedQtyHome || '',
    reservedQtySeed: cropDetail?.reservedQtySeed || '',
    noOfPicks: cropDetail?.noOfPicks || '',
    isCultivationLoan: cropDetail?.isCultivationLoan || '',
    loanObtained: cropDetail?.loanObtained ?? 0,
    userId: cropDetail?.userId || '',
    landId: cropDetail?.landId || '',
  });


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

  //Function to navigate to my crops page clicking save button
  const handleOnClickUpdateCrop = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const loggedUser = selectAuth(store.getState());
    const userId = loggedUser.auth._id;
    try {// Prevent the default form submission behavior
      // Simulate update crop action by updating user data object.
      const cropData: Crop = {
        _id: cropId,
        cropName: formData.cropName,
        season: formData.season,
        cropType: formData.cropType,
        totalSoldQty: formData.totalSoldQty,
        totalIncome: formData.totalIncome,
        reservedQtyHome: formData.reservedQtyHome,
        reservedQtySeed: formData.reservedQtySeed,
        noOfPicks: formData.noOfPicks,
        isCultivationLoan: formData.isCultivationLoan,
        loanObtained: formData.loanObtained,
        userId: userId,
        landId: formData.landId,
      };

      // Dispatch the 'update' action from the 'cropSlice' with the user data.
      await dispatch(updateCropAsync(cropData));
      setOpenSuccessDialog(true);
      //Navigate to my crops page
    } catch (error) {
      console.error("Error updating crop:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  //Function to navigate to my crops page clicking cancel button
  const navigationToMyCrops = () => {
    router.push("/my-crops");
  };

  //Function to navigate to my crops page after updating successful
  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    router.push("/my-crops");
  };
  // Define a function to handle update crop.
  const handleChangeUpdateCrop = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  // Define a function to handle changes for Autocomplete
  const handleAutocompleteChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setFormData({
      ...formData,
      cropName: value || '',
    });
  };



  return (
    <Container component="main" maxWidth="xl">
      <CustomBox1 sx={{ maxWidth: "600px" }}>
        <Box sx={{ width: "100%" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            {i18n.t("updateCrop.txtUpdateCrop")}
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            component="h1"
            variant="subtitle1"
            paddingTop={"15px"}
            gutterBottom
          >
            {i18n.t("updateCrop.txtFillDetails")}
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{i18n.t("updateCrop.lblCropName")}</Typography>
              <Autocomplete
                options={cropNames}
                getOptionLabel={(option) => option}
                value={formData.cropName}
                freeSolo // Allow entering new crop names
                onChange={(e, value) => handleAutocompleteChange(e, value)}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="cropName"
                    placeholder={i18n.t("updateCrop.hintTxtSelectCrop")}
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
                placeholder={i18n.t("updateCrop.lblSeason")}
                defaultValue={"Season"}
                variant="outlined"
                value={formData.season}
                onChange={(e) => handleChangeUpdateCrop(e, "season")}
              >
                <MenuItem value="1">
                  {i18n.t("updateCrop.menuItemTxtSelectOption2")}
                </MenuItem>
                <MenuItem value="Yala">
                  {i18n.t("updateCrop.menuItemTxtYala")}
                </MenuItem>
                <MenuItem value="Maha">
                  {i18n.t("updateCrop.menuItemTxtMaha")}
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <Typography id="demo-controlled-radio-buttons-group">
                  {i18n.t("updateCrop.lblCropType")}
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
                    label={i18n.t("updateCrop.formControlLabel1")}
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label={i18n.t("updateCrop.formControlLabel2")}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("updateCrop.lblSoldQuantity")}</Typography>
              <TextField
                fullWidth
                id="soldQuantity"
                placeholder={i18n.t("updateCrop.hintTextTotalSoldQuantity")}
                name="soldQuantity"
                autoComplete="soldQuantity"
                value={formData.totalSoldQty}
                onChange={(e) => handleChangeUpdateCrop(e, "totalSoldQty")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("updateCrop.lblIncome")}</Typography>
              <TextField
                fullWidth
                name="income"
                placeholder={i18n.t("updateCrop.hintTxtIncome")}
                id="income"
                autoComplete="income"
                value={formData.totalIncome}
                onChange={(e) => handleChangeUpdateCrop(e, "totalIncome")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("updateCrop.lblQuantityHome")}</Typography>
              <TextField
                fullWidth
                id="QtyForHome"
                placeholder={i18n.t("updateCrop.hintTxtQuantityHome")}
                name="QtyForHome"
                autoComplete="QtyForHome"
                value={formData.reservedQtyHome}
                onChange={(e) => handleChangeUpdateCrop(e, "reservedQtyHome")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("updateCrop.lblQuantitySeed")}</Typography>
              <TextField
                fullWidth
                name="qtyForSeed"
                placeholder={i18n.t("updateCrop.hintTxtQuantitySeed")}
                id="qtyForSeed"
                autoComplete="qtyForSeed"
                value={formData.reservedQtySeed}
                onChange={(e) => handleChangeUpdateCrop(e, "reservedQtySeed")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{i18n.t("updateCrop.lblNoOfPicks")}</Typography>
              <TextField
                fullWidth
                id="NoOfPicks"
                placeholder={i18n.t("updateCrop.hintTxtNoOfPicks")}
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
                <Typography>
                  {i18n.t("updateCrop.lblCultivationLoan")}
                </Typography>
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
                  <MenuItem value="">
                    {i18n.t("updateCrop.menuItemTxtSelectOption3")}
                  </MenuItem>
                  <MenuItem value="yes">
                    {i18n.t("updateCrop.menuItemTxtYes")}
                  </MenuItem>
                  <MenuItem value="no">
                    {i18n.t("updateCrop.menuItemTxtNo")}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  {i18n.t("updateCrop.lblCultivationLoanAmount")}
                </Typography>
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
                  {i18n.t("updateCrop.capBtnCancel")}
                </Button>
                {/* Save Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2, width: "12vw" }}
                  onClick={handleOnClickUpdateCrop}
                >
                  {i18n.t("updateCrop.capBtnSave")}
                </Button>
              </Stack>
            </Grid>
            <Dialog
              open={openSuccessDialog}
              onClose={handleCloseSuccessDialog}
              aria-labelledby="success-dialog-title"
            >
              {/* Display a translated 'Record Updated successfully!' message based on the selected language. */}
              <DialogTitle id="success-dialog-title"> {i18n.t("dialogBoxes.txtUpdatedSuccess")}</DialogTitle>
              <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleCloseSuccessDialog} variant="contained" color="primary">
                  {i18n.t("dialogBoxes.capBtnOk")}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Box>
      </CustomBox1>
    </Container>
  );
}

