import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import { Stack, Switch } from "@mui/material";

// Styles for labels
const styles = {
  label: {
    color: "black",
  },
};

export default function AddCrop() {
  // State variables for form fields
  const [value, setValue] = React.useState("female");
  const [cultivationLoan, setCultivationLoan] = useState("");
  const [cultivationLoan2, setCultivationLoan2] = useState(true);
  const [isCultivationLoan, setIsCultivationLoan] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // Handle switch change for cultivation loan
  const handleCultivationLoan2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCultivationLoan2(event.target.checked);
  };
  // Handle selection change for "Select Land" dropdown
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
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
    setCultivationLoan("");
  };

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
          <Typography component="h1" variant="h5" gutterBottom >
            Add Crop
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid item xs={12} sm={6} >
            <Stack direction="row" spacing={2} paddingTop={2}>
              <TextField
                required
                select
                fullWidth
                label="Select Land"
                defaultValue={"land"}
                value={selectedOption}
                onChange={handleOptionChange}
                variant="outlined"
              >
                <MenuItem value="">Select an Option</MenuItem>
                <MenuItem value="yes">Land 1</MenuItem>
                <MenuItem value="no">Land 2</MenuItem>
              </TextField>

              <Typography component="h1" variant="subtitle1" gutterBottom>
                or
              </Typography>
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                sx={{ fontSize: 11, padding: 0, height: "50px" }}
              >
                Add a new Land
              </Button>
            </Stack>
          </Grid>

          <Typography
            component="h1"
            variant="subtitle1"
            paddingTop={"15px"}
            gutterBottom
          >
            Fill the bellow details to add crop
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Crop Name *</Typography>
              <TextField
                autoComplete="given-name"
                name="cropName"
                required
                fullWidth
                id="cropName"
                placeholder="Enter crop name"
                
                
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Season *</Typography>
              <TextField
                select
                fullWidth
                label="Select season"
                defaultValue={"Season"}
                value={selectedOption}
                onChange={handleOptionChange}
                variant="outlined"
              >
                <MenuItem value="">Select an Option</MenuItem>
                <MenuItem value="yes">Yala</MenuItem>
                <MenuItem value="no">Maha</MenuItem>
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
                  value="paddy"
                  onChange={handleChange}
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
              />
            </Grid>
            <Grid
              container
              spacing={0.5}
              paddingLeft={"16px"}
              paddingTop={"16px"}
            >
              <Grid item xs={5.9}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Cultivation loan obtained?"
                  value={isCultivationLoan}
                  onChange={handleCultivationLoanChange}
                  variant="outlined"
                  autoFocus
                  InputLabelProps={{
                    style: styles.label, // Apply the label color style here
                  }}
                >
                  <MenuItem value="">Select an Option</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Cultivation loan amount"
                  value={cultivationLoan}
                  onChange={(e) => setCultivationLoan(e.target.value)}
                  variant="outlined"
                  disabled={
                    isCultivationLoan === "no" || isCultivationLoan === ""
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
