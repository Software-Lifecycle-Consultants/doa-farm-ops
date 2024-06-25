"use client";
import React, { useEffect } from "react";
import ProfileTitle from "../../../components/ProfileTitle";
import CssBaseline from "@mui/material/CssBaseline";
import {Typography,Grid,Stack} from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../config/i18n";
import { selectCrops } from "@/redux/cropSlice";
import { useSelector } from "react-redux";
import MachineryCostTable from "@/components/MachineryCostTable";
import LaborCostTable from "@/components/LaborCostTable";
import MaterialCostTable from "@/components/MaterialCostTable";
import { fetchCostData } from "@/api/fetchCostData";

/**
 * Add Operation Cost page represents a page where users can add operation costs for a specific crop.(Machinery Cost, Labor Cost, Material Cost)
 */

export default function AddOperationCost({
  params,
}: {
  params: { cropId: string };
}) {

  // Extract the cropId from the parameters
  const cropId = params.cropId;

  interface materialCost {
    material: string;
    qtyUsed: string;
    materialCost: string;
  }

  interface MaterialCostTable {
    majorOp: string;
    subOp: string;
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

  interface MachineryCostTable {
    majorOp: string;
    subOp: string;
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

  interface LaborCostTable {
    majorOp: string;
    subOp: string;
    gender: string;
    isHired: string;
    quantity: string;
    dailyWage: string;
    foodCostPerDay: string;
  }

  const [addlabor, setAddlabor] = React.useState<laborCost[]>([]);

  const [machinerycost, setmachineryCost] = React.useState<MachineryCostTable[]>([]);
  const [laborcost, setlaborCost] = React.useState<LaborCostTable[]>([]);
  const [materialcost, setmaterialCost] = React.useState<MaterialCostTable[]>([]);

  // Fetch the cost data based on the cropId
useEffect(() => {
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
        {/* Machinery Cost Table */}
        <MachineryCostTable
          cropId={cropId}
          mcost={machinerycost}
          setaddMachinery={setaddMachinery}
          addMachinery={addMachinery}
        />
        {/* Labor Cost Section */}
        <LaborCostTable
          cropId={cropId}
          lcost={laborcost}
          setAddlabor={setAddlabor}
          addlabor={addlabor}
        />
        {/* Material Cost Section */}
        <MaterialCostTable
          cropId={cropId}
          matcost={materialcost}
          setAddMaterialCost={setAddMaterialCost}
          addMaterialCost={addMaterialCost}
        />
      </Grid>
    </>
  );
}
