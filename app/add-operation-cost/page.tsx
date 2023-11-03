"use client";
import * as React from "react";
import ProfileTitle from "../../components/ProfileTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import TableHead from "@mui/material/TableHead";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
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
} from "../../data/operationCostData";

import {
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Paper,
  TableContainer,
  Stack,
} from "@mui/material";

import { useTranslation } from 'react-i18next';
import i18n from "../config/i18n";

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
    router.push("/my-crops");
  };

  const { t } = useTranslation();

  // Define the title based on the selected language
  const title = i18n.language === 'si' ? ` ${cropName} ${t('operationCost.txtTitle')}` : `Add Operation Cost for ${cropName}`;

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
          <ProfileTitle title={title} />
          <Typography>{t('operationCost.txtCropType')} {t('operationCost.paddy')}</Typography>
        </Stack>

        <Grid item>
          <p>
            {t('operationCost.txtDescription')}
          </p>
        </Grid>


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
              {t('operationCost.txtMajorOperations')}
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
                  {t('operationCost.txtSubOperations')}
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
                  {t('operationCost.txtFertilizerApplication')}
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
                  {t('operationCost.txtSelectFertilizer')}
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
          <Typography variant="h6"
          >
            {t('operationCost.tblMachineryCost.txtMachineryCost')}
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
                {t('operationCost.tblMachineryCost.colMethod')}
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
                {t('operationCost.tblMachineryCost.colOwnedOrHired')}
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
              <InputLabel>{t('operationCost.tblMachineryCost.colNumberOfTimes')}</InputLabel>
              <Input type={"text"} />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>{t('operationCost.tblMachineryCost.colDays')}</InputLabel>
              <Input type={"text"} />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>{t('operationCost.tblMachineryCost.colCost')}</InputLabel>
              <Input type={"text"} />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <Button variant="outlined">{t('operationCost.tblMachineryCost.capBtnAdd')}</Button>
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
                          {t('operationCost.tblMachineryCost.colMethod')}
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
                            {t('operationCost.tblMachineryCost.colMethod')}
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
                          {t('operationCost.tblMachineryCost.colOwnedOrHired')}
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
                            {t('operationCost.tblMachineryCost.colOwnedOrHired')}
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
                          {t('operationCost.tblMachineryCost.colNumberOfTimes')}
                        </Typography>
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{
                            minWidth: 120,
                            display: { xs: "none", sm: "flex" },
                          }}
                        >
                          <InputLabel>{t('operationCost.tblMachineryCost.colNumberOfTimes')}</InputLabel>
                          <Input type={"text"} />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t('operationCost.tblMachineryCost.colDays')}
                        </Typography>
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{
                            minWidth: 120,
                            display: { xs: "none", sm: "flex" },
                          }}
                        >
                          <InputLabel>
                            {t('operationCost.tblMachineryCost.colDays')}
                          </InputLabel>
                          <Input type={"text"} />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t('operationCost.tblMachineryCost.colCost')}
                        </Typography>
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{
                            minWidth: 120,
                            display: { xs: "none", sm: "flex" },
                          }}
                        >
                          <InputLabel>{t('operationCost.tblMachineryCost.colCost')}</InputLabel>
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
                          <Button variant="outlined">{t('operationCost.tblMachineryCost.capBtnAdd')}</Button>
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
          <Typography variant="h6"
          >
            {t('operationCost.tblLaborCost.txtLaborCost')}
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
                {t('operationCost.tblLaborCost.colGender')}
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
                {t('operationCost.tblLaborCost.colFreeOrHired')}
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
              <InputLabel>{t('operationCost.tblLaborCost.colQuantity')}</InputLabel>
              <Input type={"text"} />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>{t('operationCost.tblLaborCost.colDailyWage')}</InputLabel>
              <Input type={"text"} />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>{t('operationCost.tblLaborCost.colFoodCostPerDay')}</InputLabel>
              <Input type={"text"} />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <Button variant="outlined">{t('operationCost.tblLaborCost.capBtnAdd')}</Button>
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
                          {t('operationCost.tblLaborCost.colGender')}
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
                            {t('operationCost.tblLaborCost.colGender')}
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
                          {t('operationCost.tblLaborCost.colFreeOrHired')}
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
                            {t('operationCost.tblLaborCost.colFreeOrHired')}
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
                          {t('operationCost.tblLaborCost.colQuantity')}
                        </Typography>
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{
                            minWidth: 120,
                            display: { xs: "none", sm: "flex" },
                          }}
                        >
                          <InputLabel>{t('operationCost.tblLaborCost.colQuantity')}</InputLabel>
                          <Input type={"text"} />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t('operationCost.tblLaborCost.colDailyWage')}
                        </Typography>
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{
                            minWidth: 120,
                            display: { xs: "none", sm: "flex" },
                          }}
                        >
                          <InputLabel>{t('operationCost.tblLaborCost.colDailyWage')}</InputLabel>
                          <Input type={"text"} />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t('operationCost.tblLaborCost.colFoodCostPerDay')}
                        </Typography>
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{
                            minWidth: 120,
                            display: { xs: "none", sm: "flex" },
                          }}
                        >
                          <InputLabel>{t('operationCost.tblLaborCost.colFoodCostPerDay')}</InputLabel>
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
                          <Button variant="outlined">{t('operationCost.tblLaborCost.capBtnAdd')}</Button>
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
          <Typography variant="h6"
          >
            {t('operationCost.tblMaterialCost.txtMaterialCost')}
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
                {t('operationCost.tblMaterialCost.colMaterial')}
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
              <InputLabel>{t('operationCost.tblMaterialCost.colQuantity')}</InputLabel>
              <Input type={"text"} />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <InputLabel>{t('operationCost.tblMaterialCost.colCostForTheMaterial')}</InputLabel>
              <Input type={"text"} />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: { xs: "100%", sm: "50%", md: "25%", lg: "10%" } }}
            >
              <Button variant="outlined">{t('operationCost.tblMaterialCost.capBtnAdd')}</Button>
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
                          {t('operationCost.tblMaterialCost.colMaterial')}
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
                            {t('operationCost.tblMaterialCost.colMaterial')}
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
                          {t('operationCost.tblMaterialCost.colQuantity')}
                        </Typography>
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{
                            minWidth: 120,
                            display: { xs: "none", sm: "flex" },
                          }}
                        >
                          <InputLabel>{t('operationCost.tblMaterialCost.colQuantity')}</InputLabel>
                          <Input type={"text"} />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ display: { sm: "none" } }}>
                          {t('operationCost.tblMaterialCost.colCostForTheMaterial')}
                        </Typography>
                        <FormControl
                          variant="standard"
                          fullWidth
                          sx={{
                            minWidth: 120,
                            display: { xs: "none", sm: "flex" },
                          }}
                        >
                          <InputLabel>{t('operationCost.tblMaterialCost.colCostForTheMaterial')}</InputLabel>
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
                          <Button variant="outlined">{t('operationCost.tblMaterialCost.capBtnAdd')}</Button>
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
            <Stack direction="row" spacing={4} paddingTop={4}>
              {/* Cancel Button */}
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                sx={{ mt: 3, mb: 2, width: "18vw" }}
                onClick={navigationToMyCrops}
              >
                {t('operationCost.capBtnCancel')}
              </Button>
              {/* Save Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2, width: "18vw" }}
                onClick={navigationToMyCrops}
              >
                {t('operationCost.capBtnSave')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
