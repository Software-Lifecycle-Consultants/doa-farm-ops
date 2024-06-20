"use client";
import React, { use, useEffect, useState } from "react";
import ProfileTitle from "../../../components/ProfileTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import {
  majorOps,
  subOps,
} from "../../../data/operationCostData";

import {
  Typography,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  Alert,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import i18n from "../../config/i18n";
import { customGridStyles1 } from "@/styles/customStyles";
import { selectCrops } from "@/redux/cropSlice";
import { useSelector } from "react-redux";
import MachineryCostTable from "@/components/MachineryCostTable";
import LaborCostTable from "@/components/LaborCostTable";
import MaterialCostTable from "@/components/MaterialCostTable";
import { addCostData } from "@/api/addCostData";
import { fetchCostData } from "@/api/fetchCostData";

/**
 * Add Operation Cost page represents a page where users can add operation costs for a specific crop.(Machinery Cost, Labor Cost, Material Cost)
 */

export default function AddOperationCost({
  params,
}: {
  params: { cropId: string };
}) {
  const router = useRouter();

  // Extract the cropId from the parameters
  const cropId = params.cropId;

  // State to manage filters

  const [majorOperations, setMajorOperations] = React.useState("");
  const [subOperations, setSubOperations] = React.useState("");
  const [majorOperationsSelected, setMajorOperationsSelected] = useState(false);
  const [subOperationsSelected, setSubOperationsSelected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Event handler for major operations filter change
  const handleChange1 = (event: SelectChangeEvent) => {
    setMajorOperations(event.target.value);
    setMajorOperationsSelected(true);
    setShowWarning(false);
  };
  // Event handler for sub operations filter change
  const handleChange2 = (event: SelectChangeEvent) => {
    setSubOperations(event.target.value);
    setSubOperationsSelected(true);
    setShowWarning(false);
  };

  interface materialCost {
    material: string;
    qtyUsed: string;
    materialCost: string;
  }

  const [addMaterialCost, setAddMaterialCost] = React.useState<materialCost[]>([]);

  interface MachineryCost {
    method: string;
    isOwned: string;
    noUsed: string;
    days: string;
    machineryCost: string;
  }

  const [addMachinery, setaddMachinery] = React.useState<MachineryCost[]>([]);

  interface laborCost {
    gender: string;
    isHired: string;
    quantity: string;
    dailyWage: string;
    foodCostPerDay: string;
  }

  const [addlabor, setAddlabor] = React.useState<laborCost[]>([]);

  const [machinerycost, setmachineryCost] = React.useState<MachineryCost[]>([]);
  const [laborcost, setlaborCost] = React.useState<laborCost[]>([]);
  const [materialcost, setmaterialCost] = React.useState<materialCost[]>([]);

  // Fetch the cost data based on the cropId
  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedCost = await fetchCostData(cropId);
      const mcost = fetchedCost.machineryCost;
      const lcost = fetchedCost.labourCost;
      const matcost = fetchedCost.materialCost;
      setmachineryCost(mcost);
      setlaborCost(lcost);
      setmaterialCost(matcost);
    };
    fetchData();
  }, [addMachinery, addlabor, addMaterialCost, cropId]);

  console.log("machinerycost", machinerycost);
  console.log("laborcost", laborcost);
  console.log("materialcost", materialcost);

  useEffect(() => {
    // This function will be called whenever any of the dependencies change.
    if (
      addMachinery.length > 0 ||
      addlabor.length > 0 ||
      addMaterialCost.length > 0
    ) {
      setShowWarning(false); // Hide the warning if any cost field is filled
    }
  }, [addMachinery, addlabor, addMaterialCost]);

  const handleAddCost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      //Add the operational cost to the database
      if (
        !majorOperationsSelected ||
        !subOperationsSelected ||
        (addMachinery.length === 0 &&
          addlabor.length === 0 &&
          addMaterialCost.length === 0)
      ) {
        setShowWarning(true);
      } else {
        setShowWarning(false);

        const costdetails = {
          cropId: params.cropId,
          majorOp: majorOperations,
          subOp: subOperations,
          machineryCostDetails: addMachinery,
          labourCostDetails: addlabor,
          materialCostDetails: addMaterialCost,
        };

        console.log("costdetails", costdetails);

        // Call the addCostData function with the provided cost details
        const response = await addCostData(costdetails);

        // If the operation cost is added successfully, open the success dialog
        if (response && response.status === 200) {
          setOpenSuccessDialog(true);
        } else if (response && response.status === 400) {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error adding operational cost", error);
    }
  };

  // State to manage the visibility of the success dialog
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    router.push("/my-crops");
  };

  //Function to navigate to my crops page
  const navigationToMyCrops = () => {
    router.push("/my-crops");
  };

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

        {/* Major Operations and Sub Operations filters */}
        <Grid item p={2} rowGap={2} xs={12} md={12} sx={customGridStyles1}>
          <FormControl
            variant="filled"
            sx={{
              m: 1,
              width: { xs: "30%", sm: "30%", md: "30%" },
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
          {/* Sub-operations */}
          <FormControl variant="filled" sx={{ m: 1, width: "30%" }}>
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
        {/* Machinery Cost Table */}
        <MachineryCostTable
        cropId={cropId}
          mcost={machinerycost}
          setaddMachinery={setaddMachinery}
          addMachinery={addMachinery}
        />
        {/* Labor Cost Section */}
        <LaborCostTable
          lcost={laborcost}
          setAddlabor={setAddlabor}
          addlabor={addlabor}
        />
        {/* Material Cost Section */}
        <MaterialCostTable
          matcost={materialcost}
          setAddMaterialCost={setAddMaterialCost}
          addMaterialCost={addMaterialCost}
        />
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
              {showWarning && (
                <Alert severity="warning">
                  Please add necessary fields before saving.
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2, width: "18vw" }}
                onClick={handleAddCost}
              >
                {t("operationCost.capBtnSave")}
              </Button>
            </Stack>
          </Grid>
          <Dialog
            open={openSuccessDialog}
            onClose={handleCloseSuccessDialog}
            aria-labelledby="success-dialog-title"
          >
            {/* Display a translated 'Record Updated successfully!' message based on the selected language. */}
            <DialogTitle id="success-dialog-title">
              {" "}
              {i18n.t("dialogBoxes.txtUpdatedSuccess")}
            </DialogTitle>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleCloseSuccessDialog}
                variant="contained"
                color="primary"
              >
                {i18n.t("dialogBoxes.capBtnOk")}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
}
