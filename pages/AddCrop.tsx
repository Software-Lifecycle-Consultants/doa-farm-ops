import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function AddCrop() {

    const [value, setValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "3px solid #F1F1F1",
    background: "#FFFFFF",
    padding: "3vh", //  padding
    margin: "5vh auto", // margin
    maxWidth: "500px", // Max width for tablets
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
            Add Crop
          </Typography>
          <Typography component="h1" variant="subtitle1" gutterBottom>
            Fill the details bellow to add crop
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="cropName"
                required
                fullWidth
                id="cropName"
                label="Crop Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="season"
                label="Season"
                name="season"
                autoComplete="season"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              
              <FormControl >
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Crop Type
                </FormLabel>
                <RadioGroup style={{ width: '100%' }}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                   value={value}
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
              <TextField
                fullWidth
                id="soldQuantity"
                label="Total sold quantity"
                name="soldQuantity"
                autoComplete="soldQuantity"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="income"
                label="Total income for crop"
                id="income"
                autoComplete="income"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="QtyForHome"
                label="Quantity kept for home"
                name="QtyForHome"
                autoComplete="QtyForHome"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="qtyForSeed"
                label="Quantity kept for seed"
                id="qtyForSeed"
                autoComplete="qtyForSeed"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="NoOfPicks"
                label="Number of picks"
                name="NoOfPicks"
                autoComplete="NoOfPicks"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="cultivationLoan"
                label="Cultivation loan"
                id="cultivationLoan"
                autoComplete="cultivationLoan"
              />
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
