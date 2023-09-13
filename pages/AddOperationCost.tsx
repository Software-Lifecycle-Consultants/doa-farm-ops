import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProfileTitle from "../components/ProfileTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import TableHead from "@mui/material/TableHead";
import Stack from "@mui/material/Stack";

import {
  Box,
  IconButton,
  Input,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

export default function AddOperationCost() {
  const [seasonFilter, setSeasonFilter] = React.useState("");
  const [landFilter, setLandFilter] = React.useState("");

  const handleChange1 = (event: SelectChangeEvent) => {
    setSeasonFilter(event.target.value);
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setLandFilter(event.target.value);
  };
  const machineryCostData = [
    {
      _id: "s323a4sd667sk89054",
      method: "method 1",
      ownedOrHired: "Owned",
      noOfTimes: 12,
      days: 7,
      cost: "2000",
    },
    {
      _id: "sdf76asdg234gjk789",
      method: "method 2",
      ownedOrHired: "Hired",
      noOfTimes: 5,
      days: 4,
      cost: "1500",
    },
    {
      _id: "fgh45hj67k23klm098",
      method: "method 3",
      ownedOrHired: "Owned",
      noOfTimes: 8,
      days: 6,
      cost: "2800",
    },
    {
      _id: "pqr12xyz56abc78901",
      method: "method 4",
      ownedOrHired: "Hired",
      noOfTimes: 10,
      days: 5,
      cost: "1900",
    },
  ];
  const laborCostData = [
    {
      _id: "l1as34sd67sk89054",
      gender: "Male",
      freeOrHired: "Hired",
      quantity: 5,
      dailyWage: 100,
      foodCostPerDay: 20,
    },
    {
      _id: "l2df76asdg23gjk789",
      gender: "Female",
      freeOrHired: "Hired",
      quantity: 3,
      dailyWage: 90,
      foodCostPerDay: 15,
    },
    {
      _id: "l3fgh45hj67k2klm098",
      gender: "Male",
      freeOrHired: "Free",
      quantity: 8,
      dailyWage: 0, // Daily wage is 0 for free labor
      foodCostPerDay: 25,
    },
    {
      _id: "l4pqr12xyz56a7bc8901",
      gender: "Male",
      freeOrHired: "Hired",
      quantity: 6,
      dailyWage: 110,
      foodCostPerDay: 18,
    },
  ];
  const cropName = "Crop 1";
  const cropType = "Paddy";
  const materialCostData = [
    {
      _id: "m1as34sd67sk89054",
      material: "Material 1",
      quantity: 100,
      costOfMaterial: 5000,
    },
    {
      _id: "m2df76asdg23gjk789",
      material: "Material 2",
      quantity: 50,
      costOfMaterial: 3500,
    },
    {
      _id: "m3fgh45hj67k2klm098",
      material: "Material 3",
      quantity: 200,
      costOfMaterial: 8000,
    },
    {
      _id: "m4pqr12xyz56a7bc8901",
      material: "Material 3",
      quantity: 5000,
      costOfMaterial: 2500,
    },
  ];
  return (
    <Grid item container xs={12} p={2} rowGap={2}>
      <Grid item md={12}>
        
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        width={"100%"}
      >
        <ProfileTitle title={`Add Operation Cost for ${cropName}`} />
        <Typography>Crop Type: {cropType}</Typography>
      </Stack>

      <Grid
        item
        p={2}
        rowGap={2}
        xs={12}
        md={12}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "3px solid #F1F1F1",
          borderRadius: "22px",
        }}
      >
        <FormControl
          variant="filled"
          sx={{ m: 1, width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" } }}
        >
          <InputLabel id="demo-simple-select-filled-label">
            Major Operations
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            // value={seasonFilter}
            // onChange={handleChange1}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Input 1</MenuItem>
            <MenuItem value={20}>Input 2</MenuItem>
            <MenuItem value={30}>Input 3</MenuItem>
          </Select>
        </FormControl>

        <Grid
          container
          direction="row"
          paddingTop={2}
          spacing={2}
          width={"100%"}
        >
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-filled-label">
                Sub Operations
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                // value={seasonFilter}
                // onChange={handleChange1}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Input 1</MenuItem>
                <MenuItem value={20}>Input 2</MenuItem>
                <MenuItem value={30}>Input 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-filled-label">
                Fertilizer Application
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                // value={landFilter}
                // onChange={handleChange2}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Input 1</MenuItem>
                <MenuItem value={20}>Input 2</MenuItem>
                <MenuItem value={30}>Input 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-filled-label">
                Select fertilizer
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                // value={landFilter}
                // onChange={handleChange2}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Input 1</MenuItem>
                <MenuItem value={20}>Input 2</MenuItem>
                <MenuItem value={30}>Input 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        gap={3}
        p={2}
        xs={12}
        md={12}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "3px solid #F1F1F1",
          borderRadius: "22px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "DM Sans",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "16px",
          }}
        >
          Machinery Cost
        </Typography>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
          gap={2}
          sx={{ display: { sm: "none" } }}
        >
          <FormControl
            variant="filled"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" } }}
          >
            <InputLabel id="demo-simple-select-filled-label">Method</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={seasonFilter}
              // onChange={handleChange1}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Method 1</MenuItem>
              <MenuItem value={20}>Method 2</MenuItem>
              <MenuItem value={30}>Method 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="filled"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" } }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Owned/Hired
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={seasonFilter}
              // onChange={handleChange1}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Owned</MenuItem>
              <MenuItem value={20}>Hired</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <InputLabel>Number of times</InputLabel>
            <Input type={"text"} />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <InputLabel>Days</InputLabel>
            <Input type={"text"} />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <InputLabel>Cost</InputLabel>
            <Input type={"text"} />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <Button variant="outlined">Add</Button>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Method
                      </Typography>
                      <FormControl
                        variant="filled"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Method
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          // value={seasonFilter}
                          // onChange={handleChange1}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Method 1</MenuItem>
                          <MenuItem value={20}>Method 2</MenuItem>
                          <MenuItem value={30}>Method 3</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Owned/Hired
                      </Typography>
                      <FormControl
                        variant="filled"
                        fullWidth
                        sx={{
                          minWidth: 140,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Owned/Hired
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          // value={seasonFilter}
                          // onChange={handleChange1}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Owned</MenuItem>
                          <MenuItem value={20}>Hired</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Number of times
                      </Typography>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel>Number of times</InputLabel>
                        <Input type={"text"} />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Days
                      </Typography>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel>Days</InputLabel>
                        <Input type={"text"} />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Cost
                      </Typography>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel>Cost</InputLabel>
                        <Input type={"text"} />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <Button variant="outlined">Add</Button>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {machineryCostData.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell>{data.method}</TableCell>
                      <TableCell>{data.ownedOrHired}</TableCell>
                      <TableCell>{data.noOfTimes}</TableCell>
                      <TableCell>{data.days}</TableCell>
                      <TableCell>{data.cost}</TableCell>
                      <TableCell>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        item
        container
        gap={3}
        p={2}
        xs={12}
        md={12}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "3px solid #F1F1F1",
          borderRadius: "22px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "DM Sans",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "16px",
          }}
        >
          Labor Cost
        </Typography>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
          gap={2}
          sx={{ display: { sm: "none" } }}
        >
          <FormControl
            variant="filled"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" } }}
          >
            <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={seasonFilter}
              // onChange={handleChange1}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="filled"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" } }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Free/Hired
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={seasonFilter}
              // onChange={handleChange1}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"free"}>Free</MenuItem>
              <MenuItem value={"hired"}>Hired</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <InputLabel>Quantity</InputLabel>
            <Input type={"text"} />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <InputLabel>Daily wage</InputLabel>
            <Input type={"text"} />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <InputLabel>Food cost/day</InputLabel>
            <Input type={"text"} />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <Button variant="outlined">Add</Button>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Gender
                      </Typography>
                      <FormControl
                        variant="filled"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          // value={seasonFilter}
                          // onChange={handleChange1}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Free/Hired
                      </Typography>
                      <FormControl
                        variant="filled"
                        fullWidth
                        sx={{
                          minWidth: 140,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Free/Hired
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          // value={seasonFilter}
                          // onChange={handleChange1}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"free"}>Free</MenuItem>
                          <MenuItem value={"hired"}>Hired</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Quantity
                      </Typography>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel>Quantity</InputLabel>
                        <Input type={"text"} />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Daily wage
                      </Typography>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel>Daily wage</InputLabel>
                        <Input type={"text"} />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Food cost/day
                      </Typography>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel>Food cost/day</InputLabel>
                        <Input type={"text"} />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <Button variant="outlined">Add</Button>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {laborCostData.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell>{data.gender}</TableCell>
                      <TableCell>{data.freeOrHired}</TableCell>
                      <TableCell>{data.quantity}</TableCell>
                      <TableCell>{data.dailyWage}</TableCell>
                      <TableCell>{data.foodCostPerDay}</TableCell>
                      <TableCell>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        item
        container
        gap={3}
        p={2}
        xs={12}
        md={12}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "3px solid #F1F1F1",
          borderRadius: "22px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "DM Sans",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "16px",
          }}
        >
          Material Cost
        </Typography>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
          gap={2}
          sx={{ display: { sm: "none" } }}
        >
          <FormControl
            variant="filled"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" } }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Material
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={seasonFilter}
              // onChange={handleChange1}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Material 1</MenuItem>
              <MenuItem value={20}>Material 2</MenuItem>
              <MenuItem value={30}>Material 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <InputLabel>Quantity</InputLabel>
            <Input type={"text"} />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <InputLabel>Cost for the Material</InputLabel>
            <Input type={"text"} />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
          >
            <Button variant="outlined">Add</Button>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Material
                      </Typography>
                      <FormControl
                        variant="filled"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Material
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          // value={seasonFilter}
                          // onChange={handleChange1}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Material 1</MenuItem>
                          <MenuItem value={20}>Material 2</MenuItem>
                          <MenuItem value={30}>Material 3</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Quantity
                      </Typography>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel>Quantity</InputLabel>
                        <Input type={"text"} />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ display: { sm: "none" } }}>
                        Cost for the Material
                      </Typography>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <InputLabel>Cost for the Material</InputLabel>
                        <Input type={"text"} />
                      </FormControl>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        <Button variant="outlined">Add</Button>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materialCostData.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell>{data.material}</TableCell>
                      <TableCell>{data.quantity}</TableCell>
                      <TableCell>{data.costOfMaterial}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "25vw" }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
