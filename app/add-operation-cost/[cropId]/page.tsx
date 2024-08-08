"use client";
import React from "react";
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
        />
        {/* Labor Cost Section */}
        <LaborCostTable
          cropId={cropId}
        />
        {/* Material Cost Section */}
        <MaterialCostTable
          cropId={cropId}
        />
      </Grid>
    </>
  );
}
