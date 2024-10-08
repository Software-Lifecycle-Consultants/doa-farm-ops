// Import necessary modules and components
"use client";
import * as React from "react";
import {
  Grid,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Stack,
  Box,
} from "@mui/material";
import ProfileTitle from "../../components/ProfileTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CropsTable from "@/components/CropsTable";
// Import the router object to handle routing
import { useRouter } from "next/navigation";
import { seasons, lands } from "../../data/cropsData";
import { useTranslation } from 'react-i18next';
import { customGridStyles2 } from "@/styles/customStyles";
import { fetchCrops } from "@/redux/cropSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/redux/authSlice";
import { fetchAndRegisterLands } from "@/redux/landSlice";
import { AppDispatch } from '@/redux/store'; // Import the AppDispatch type
import { RootState } from "@/redux/types";
// import i18n from "../config/i18n";// Import the i18n instance

/**
 * My Crops page displays a table containing comprehensive details of crops cultivated on a specific land.
 * Users can view vital information about each crop, and can add operation cost details.
 */
export default function MyCrops() {

  const router = useRouter();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  // Fetch current user and farmer user from the Redux store
  const currentUser = useSelector((state: RootState) => state.user.user);
  const farmerUser = useSelector((state: RootState) => state.viewFarmer.user);
  const farmerId = farmerUser?._id || currentUser?._id || "";

  // State variables to store filter values
  const [seasonFilter, setSeasonFilter] = React.useState("");
  const [landFilter, setLandFilter] = React.useState("");
  // Event handler for season filter change
  const handleChange1 = (event: SelectChangeEvent) => {
    setSeasonFilter(event.target.value);
  };
  // Event handler for land filter change
  const handleChange2 = (event: SelectChangeEvent) => {
    setLandFilter(event.target.value);
  };
  //Function to navigate to add crop page
  const navigationToAddCrop = () => {
    router.push("/add-crop");
  };

  // Fetch crops and lands data on component mount
  React.useEffect(() => {
    if (farmerId) {
      dispatch(fetchCrops(farmerId));
      dispatch(fetchAndRegisterLands(farmerId));
    }
  }, [farmerId, dispatch]);

  // Return the JSX for rendering
  return (
    <Grid container direction="column" rowGap={2} style={{ padding: "20px" }}>
      {/* Page title */}
      <Grid item xs={12}>
        <ProfileTitle title={t("myCrops.txtMyCrops")} />
      </Grid>

      <Grid item>
        <p>{t("myCrops.txtAddYourCrops")}</p>
      </Grid>

      <Grid item>
        {/* Filter controls */}
        <Stack direction="row" spacing={2} paddingTop={2} width={"100%"}>
          {/* Season filter dropdown */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-filled-label">
              {t("myCrops.lblSeason")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={seasonFilter}
              onChange={handleChange1}
            >
              {seasons.map((season) => (
                <MenuItem key={season.value} value={season.value}>
                  {season.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Land filter dropdown */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-filled-label">
              {t("myCrops.lblLand")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={landFilter}
              onChange={handleChange2}
            >
              {lands.map((land) => (
                <MenuItem key={land.value} value={land.value}>
                  {land.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Add Crop button */}
          <Box
            sx={{
              width: "100%",
              paddingRight: "1vh",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              onClick={navigationToAddCrop}
            >
              {t("myCrops.capBtnAddCrop")}
            </Button>
          </Box>
        </Stack>
      </Grid>

      <Grid container item rowGap={2} p={2} sx={customGridStyles2}>
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
        ></Grid>
        <Grid item xs={12}>
          {/* Table to display crops */}
          <CropsTable title="My Crops" userId={farmerId} />
        </Grid>
      </Grid>
    </Grid>
  );
}
