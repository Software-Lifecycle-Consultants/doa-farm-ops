import { z } from "zod";


// Define Zod schema for form validation
export const schemaLand = z.object({
    landName: z.string().min(1, "Land name is required"),
    district: z.string().min(1, "Please select a district"),
    dsDivision: z.string().min(1, "Division is required"),
    landRent: z.string().min(1, "Land rent is required"),
    irrigationMode: z.string().min(1, "Irrigation mode is required"),
  
  });