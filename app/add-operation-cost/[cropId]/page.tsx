"use client";
import * as React from "react";
import ProfileTitle from "../../../components/ProfileTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import {
  laborCostData,
  materialCostData,
  majorOps,
  subOps,
  fertilizerApps,
  fertilizers,
  machinery,
  material,
} from "../../../data/operationCostData";

import {
  Typography,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Stack,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import i18n from "../../config/i18n";
import { customGridStyles1 } from "@/styles/customStyles";
import { selectCrops } from "@/redux/cropSlice";
import { useSelector } from "react-redux";
import MachineryCostTable from "@/components/MachineryCostTable";
import LaborCostTable from "@/components/LaborCostTable";
import { Mate } from "next/font/google";
import MaterialCostTable from "@/components/MaterialCostTable";

/**
 * Add Operation Cost page represents a page where users can add operation costs for a specific crop.(Machinery Cost, Labor Cost, Material Cost)
 */

export default function AddOperationCost({
  params,
}: {
  params: { cropId: string };
}) {
  const router = useRouter();
  // State to manage filters

  const [majorOperations, setMajorOperations] = React.useState("");
  const [subOperations, setSubOperations] = React.useState("");
  const [fertilizerApplication, setFertilizerApplication] = React.useState("");
  const [selectFertilizer, setSelectFertilizer] = React.useState("");

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

  const [materialCost, setMaterialCost] = React.useState("");

  //Function to navigate to my crops page
  const navigationToMyCrops = () => {
    router.push("/my-crops");
  };

  // Extract the cropId from the parameters
  const cropId = params.cropId;

  const { t } = useTranslation();
  const cropdetails = useSelector(selectCrops);
  const crop = cropdetails?.find((c) => c._id === cropId);

  // Define the title based on the selected language
  const title =
    i18n.language === "si"
      ? ` ${crop?.cropName} ${t("operationCost.txtTitle")}`
      : `Add Operation Cost for ${crop?.cropName}`;

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
          <Typography>
            {t("operationCost.txtCropType")} {crop?.cropType}
          </Typography>
        </Stack>

        <Grid item>
          <p>{t("operationCost.txtDescription")}</p>
        </Grid>

        {/* Machinery Cost Section */}
        <Grid item p={2} rowGap={2} xs={12} md={12} sx={customGridStyles1}>
          {/* Dropdowns and input fields for machinery costs */}
          <FormControl
            variant="filled"
            sx={{
              m: 1,
              width: { xs: "100%", sm: "50%", md: "25%", lg: "20%" },
            }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              {t("operationCost.txtMajorOperations")}
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
                  {t("operationCost.txtSubOperations")}
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
                  {t("operationCost.txtFertilizerApplication")}
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
                  {t("operationCost.txtSelectFertilizer")}
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
        <MachineryCostTable title="Machine Cost" />
        {/* Labor Cost Section */}
        <LaborCostTable title="Labor Cost" />
        {/* Material Cost Section */}
        <MaterialCostTable title="Material Cost" />
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
                {t("operationCost.capBtnCancel")}
              </Button>
              {/* Save Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2, width: "18vw" }}
                onClick={navigationToMyCrops}
              >
                {t("operationCost.capBtnSave")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
