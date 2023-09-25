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
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import {
  machineryCostData,
  laborCostData,
  materialCostData,
  cropName,
  cropType,
  majorOps,
  subOps,
  fertilizerApps,
  fertilizers,
  machinery,
  material
} from "../data/operationCostData";

import {
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

/**
 * Add Operation Cost page represents a page where users can add operation costs for a specific crop.(Machinery Cost, Labor Cost, Material Cost)
 */

export default function AddOperationCost() {

  const router = useRouter();
  // State to manage filters
  const [majorOperations, setMajorOperations] = React.useState("");
  const [subOperations, setSubOperations] = React.useState("");
  const [fertilizerApplication, setFertilizerApplication] = React.useState("");
  const [selectFertilizer, setSelectFertilizer] = React.useState("");
  const [machineryMethod, setMachineryMethod] = React.useState("");
  const [materialCost, setMaterialCost] = React.useState("");

  // Event handler for major operations filter change
  const handleChange1 = (event: SelectChangeEvent) => {
    setMajorOperations(event.target.value);
  };
  // Event handler for sub operations filter change
  const handleChange2 = (event: SelectChangeEvent) => {
    setSubOperations(event.target.value);
  };
  // Event handler for fertilizer application filter change
  const handleChange3 = (event: SelectChangeEvent) => {
    setFertilizerApplication(event.target.value);
  };
  // Event handler for select fertilizer filter change
  const handleChange4 = (event: SelectChangeEvent) => {
    setSelectFertilizer(event.target.value);
  };
  // Event handler for select machinery cost method filter change in machinery cost table
  const handleChange5 = (event: SelectChangeEvent) => {
    setMachineryMethod(event.target.value);
  };
  // Event handler for select material cost filter change in material cost table
  const handleChange6 = (event: SelectChangeEvent) => {
    setMaterialCost(event.target.value);
  };
  //Function to navigate to my crops page
  const navigationToMyCrops = () => {
    router.push("/MyCrops");
  };

  return (
    <>
      <CssBaseline />
      {/* Main grid container */}
      <Grid item container xs={12} p={2} rowGap={2}>
        {/* Header section */}
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
        {/* Machinery Cost Section */}
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
          {/* Dropdowns and input fields for machinery costs */}
          <FormControl
            variant="filled"
            sx={{
              m: 1,
              width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" },
            }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Major Operations
            </InputLabel>
            {/* Select dropdown for major operations */}
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={majorOperations}
              onChange={handleChange1}
            >
              {majorOps.map((majorOp) => (
        <MenuItem key={majorOp.value} value={majorOp.value}>
          {majorOp.label}
        </MenuItem>
      ))}
            </Select>
          </FormControl>
          {/* Sub-operations, Fertilizer Application, and Select Fertilizer */}
          <Grid
            container
            direction="row"
            paddingTop={2}
            spacing={2}
            width={"100%"}
          >
            {/* Sub-operations */}
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Sub Operations
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={subOperations}
                  onChange={handleChange2}
                >
                  {subOps.map((subOp) => (
        <MenuItem key={subOp.value} value={subOp.value}>
          {subOp.label}
        </MenuItem>
      ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Fertilizer Application */}
            <Grid item xs={12} sm={6} md={3} lg={2}>
              {/* Select dropdown for fertilizer application */}
              <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Fertilizer Application
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={fertilizerApplication}
                  onChange={handleChange3}
                >
                  {fertilizerApps.map((fertilizer) => (
        <MenuItem key={fertilizer.value} value={fertilizer.value}>
          {fertilizer.label}
        </MenuItem>
      ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Select Fertilizer */}
            <Grid item xs={12} sm={6} md={3} lg={2}>
              {/* Select dropdown for selecting a fertilizer */}
              <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Select fertilizer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selectFertilizer}
                  onChange={handleChange4}
                >
                  {fertilizers.map((select) => (
        <MenuItem key={select.value} value={select.value}>
          {select.label}
        </MenuItem>
      ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {/* Machinery Cost Table */}
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
          {/* Hidden form fields for mobile view */}
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
                Method
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={machineryMethod}
                onChange={handleChange5}
              >
                {machinery.map((select) => (
        <MenuItem key={select.value} value={select.value}>
          {select.label}
        </MenuItem>
      ))}
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
          {/* Machinery Cost Data Table */}
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
                            value={machineryMethod}
                            onChange={handleChange5}
                          >
                            {machinery.map((select) => (
                                <MenuItem key={select.value} value={select.value}>
                                {select.label}
                                </MenuItem>
                            ))}
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
        {/* Labor Cost Section */}
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
          {/* Hidden form fields for mobile view */}
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
          {/* Labor Cost Data Table */}
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
        {/* Material Cost Section */}
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
          {/* Hidden form fields for mobile view */}
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
                value={materialCost}
                onChange={handleChange6}
              >
                {material.map((season) => (
                    <MenuItem key={season.value} value={season.value}>
                      {season.label}
                    </MenuItem>
                ))}
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
          {/* Material Cost Data Table */}
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
                            value={materialCost}
                            onChange={handleChange6}
                          >
                            {material.map((season) => (
                            <MenuItem key={season.value} value={season.value}>
                              {season.label}
                          </MenuItem>
                          ))}
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
        {/* Save Button */}
        <Grid container justifyContent="center" alignItems="center">
          {/* <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "25vw" }}
            >
              Save
            </Button>
          </Grid> */}
          <Grid item>
            <Stack direction="row" spacing={4} paddingTop={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2, width: "18vw" }}
                onClick={navigationToMyCrops}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2, width: "18vw" }}
                onClick={navigationToMyCrops}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
