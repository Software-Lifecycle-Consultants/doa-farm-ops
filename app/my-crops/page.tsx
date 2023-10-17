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
import {seasons, lands} from "../../data/cropsData";

/**
 * My Crops page displays a table containing comprehensive details of crops cultivated on a specific land.
 * Users can view vital information about each crop, and can add operation cost details.
 */
export default function MyCrops() {
  
  const router = useRouter();
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
  
  // Return the JSX for rendering
  return (
    <Grid container direction="column" rowGap={2}>
      {/* Page title */}
      <Grid item xs={12}>
        <ProfileTitle title="My Crops & Operation Cost" />
      </Grid>

      <Grid item>
        <p>
        Add your crops and operation costs for the crops you have added by their season and land.
        </p>
      </Grid>
      
      <Grid item>
        {/* Filter controls */}
        <Stack direction="row" spacing={2} paddingTop={2} width={"100%"}>
          {/* Season filter dropdown */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Season
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
              Land
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
              paddingRight: "18px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              onClick={navigationToAddCrop}
            >
              Add Crop
            </Button>
          </Box>
        </Stack>
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
        ></Grid>
        <Grid item xs={12}>
          {/* Table to display crops */}
          <CropsTable title="My Crops" />
        </Grid>
      </Grid>
    </Grid>
  );
}
