import { z } from 'zod';
  
  // zod validation Schema for Farmer
  export const FarmerAdditionalDetails = z.object({
    household: z.string().min(1, 'Number of household is required'),
    orgName: z.string().min(1, 'Organization name is required'),
    orgAddress: z.string().min(1,'Organization address is required'),
    
});


  // zod validation Schema for Officer
    export const OfficerAdditionalDetails = z.object({
        orgName: z.string().min(1, 'Organization name is required'),
        orgAddress: z.string().min(1,'Organization address is required'),
        university: z.string().min(1, 'University is required'),
    });
