import { z } from "zod";

//Material Cost Schema
// Define the schema for a single material cost entry
const MaterialCostEntrySchema = z.object({
  material: z.string().min(1, "Material name is required"),
  qtyUsed: z.number().positive("Quantity used must be a positive number"),
  materialCost: z
    .number()
    .positive("Unit price must be a positive number")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Unit price must have at most two decimal places",
    }),
});

// Define the schema for the whole object, including an array of material cost entries
export const MaterialCostSchema = z.object({
  majorOperation: z.string().min(1, "Please select a major operation"),
  subOperation: z.string().min(1, "Please select a sub operation"),
  materialCostDetails: z
    .array(MaterialCostEntrySchema)
    .nonempty("At least one material cost entry is required"),
});

//Labor Cost Schema
// Define the schema for a single labor cost entry
const LaborCostEntrySchema = z.object({
  gender: z.string(),
  isHired: z.boolean().refine((val) => val === true || val === false, {
    message: "Please select if labor is hired or not",
  }),
  quantity: z.number().positive("Quantity must be a positive number"),
  dailyWage: z
    .number()
    .positive("Daily wage must be a positive number")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Daily wage must have at most two decimal places",
    }),
  foodCostPerDay: z
    .number()
    .positive("Food cost per day must be a positive number")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Food cost per day must have at most two decimal places",
    }),
});

// Define the schema for the whole object, including an array of labor cost entries
export const LaborCostSchema = z.object({
    majorOp: z.string().min(1, "Please select a major operation"),
    subOp: z.string().min(1, "Please select a sub operation"),
  addLaborCost: z
    .array(LaborCostEntrySchema)
    .nonempty("At least one labor cost entry is required"),
});


//Machinery Cost Schema
// Define the schema for a single machinery cost entry
// const MachineryCostEntrySchema = z.object({
//     method: z.string(),
//     isOwned: z.boolean().refine((val) => val === true || val === false, {
//         message: "Please select if machinery is owned or not",
//         }),
//     noUsed: z.number().positive("Number of machinery used must be a positive number"),
//     days: z.number().positive("Number of days must be a positive number"),
//     machineryCost: z
//         .number()
//         .positive("Machinery cost must be a positive number")
//         .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
//         message: "Machinery cost must have at most two decimal places",
//         }),
// });

// Define the schema for the whole object, including an array of machinery cost entries
export const MachineryCostSchema = z.object({
    // majorOp: z.string().nonempty({ message: "Please select a major operation"}),
    // subOp: z.string().min(1,  {message:"Please select a sub operation"}),
    method: z.string().nonempty({ message: "Please select a method"}),
    isOwned: z.string().nonempty({message: "Please select if machinery is owned or not"}),
    noUsed: z.number().positive( {message: "Number of machinery used must be a positive number"}),
    days: z.number().positive({ message: "Number of days must be a positive number"}),
    machineryCost: z
        .number()
        .positive({ message:"Machinery cost must be a positive number"})
        .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Machinery cost must have at most two decimal places",
        }),
});