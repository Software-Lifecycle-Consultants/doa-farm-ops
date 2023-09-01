import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProfileTitle from "../components/ProfileTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CropsTable from "@/components/CropsTable";
import Stack from "@mui/material/Stack";

export default function MyCrops() {
  const [seasonFilter, setSeasonFilter] = React.useState("");
  const [landFilter, setLandFilter] = React.useState("");

  const handleChange1 = (event: SelectChangeEvent) => {
    setSeasonFilter(event.target.value);
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setLandFilter(event.target.value);
  };
  return (
    <Grid container direction="column" rowGap={2}>
      <Grid item xs={12}>
        <ProfileTitle title="My Crops" />
      </Grid>

      <Grid item>
      <Stack direction="row" spacing={2} paddingTop={2}>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 170 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Season Filter
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={seasonFilter}
            onChange={handleChange1}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Season 1</MenuItem>
            <MenuItem value={20}>Season 2</MenuItem>
            <MenuItem value={30}>Season 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 1, minWidth: 170 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Land Filter
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={landFilter}
            onChange={handleChange2}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Land 1</MenuItem>
            <MenuItem value={20}>Land 2</MenuItem>
            <MenuItem value={30}>Land 3</MenuItem>
          </Select>
        </FormControl>

        <Button
                type="submit"
                variant="outlined"
                
                
                sx={{ fontSize: 11, padding: "25px", height: "50px" }}
              >
                Add Crop
              </Button>
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
        >
          
        </Grid>
        <Grid item xs={12}>
          <CropsTable title="My Crops" />
        </Grid>
      </Grid>
    </Grid>
  );
}
