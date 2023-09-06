import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

export default function AddLand() {
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
            Add Land
          </Typography>
        </Box>

        <Grid  container
          item
          rowGap={2}>
          
            <Grid item xs={12} md={12} sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <Typography component="h1" variant="subtitle1" gutterBottom>
                Fill the details bellow to add land
              </Typography>
            
            
              <Button endIcon={<PlaceOutlinedIcon />}>Mark on Map</Button>
            
          </Grid>
        </Grid>

        
        <Box  sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography>
            Land Name
            </Typography>
              <TextField
                required
                fullWidth
                id="landName"
                placeholder="Enter landName"
                name="landName"
                autoComplete="landName"
              />
            </Grid>
            <Grid item xs={12}>
            <Typography>
            District
            </Typography>
              <TextField
                required
                fullWidth
                id="district"
                placeholder="Enter district"
                name="district"
                autoComplete="district"
              />
            </Grid>
            <Grid item xs={12}>
            <Typography>
            Division
            </Typography>
              <TextField
                required
                fullWidth
                name="division"
                placeholder="Enter division"
                type="division"
                id="division"
                autoComplete="division"
              />
            </Grid>
            <Grid item xs={12}>
            <Typography>
            Land Rent
            </Typography>
              <TextField
                required
                fullWidth
                name="landRent"
                placeholder="Enter land rent"
                type="landRent"
                id="landRent"
                autoComplete="landRent"
              />
            </Grid>
            <Grid item xs={12}>
            <Typography>
            Mode of Irrigation
            </Typography>
              <TextField
                required
                fullWidth
                name="modeOfIrrigation"
                placeholder="Enter Mode of Irrigation"
                type="modeOfIrrigation"
                id="modeOfIrrigation"
                autoComplete="modeOfIrrigation"
              />
            </Grid>
          </Grid>

          <Grid>
            <Stack direction="row" spacing={8} paddingTop={4}>
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                sx={{ fontSize: 11, padding: 0, height: "50px" }}
              >
                Save & exit to my crops
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ fontSize: 11, padding: 0, height: "50px" }}
              >
                Save & proceed to add crop
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
