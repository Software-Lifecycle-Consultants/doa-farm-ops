import { z } from "zod";

// zod validation Schema
export const schemaAddCrop = z.object({
    cropName: z.string().min(1, "Crop name is required"),
    season: z.string().min(1, "season is required"),
    cropType: z.string().min(1, "Crop type is required"),
    totalSoldQty: z.string().min(1, "Total sold quantity is required"),
    totalIncome: z.string().min(1, "Total income is required"),
    reservedQtyHome: z.string().min(1, "Quantity kept for home is required"),
    reservedQtySeed: z.string().min(1, "Quantity kept for seed is required"),
    noOfPicks: z.string().min(1, "Number of picks is required"),
    isCultivationLoan: z.string().min(1, "Cultivation loan status is required"),
  });