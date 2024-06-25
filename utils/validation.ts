import { toast } from 'react-toastify';
import { z } from 'zod';

/*This is a reusable function that handles the validation and error handling 

Note : <T extends z.ZodTypeAny> is a TypeScript generic type parameter. 
It allows the validateFormData function to work with any Zod schema type that extends the z.ZodTypeAny type.*/

import { ZodError } from "zod";

export const validateFormData = (schema: z.ZodSchema<any>, data: any) => {
  try {
    schema.parse(data);
    return { valid: true, errors: {} };
  } catch (e) {
    if (e instanceof ZodError) {
      return { valid: false, errors: e.flatten().fieldErrors };
    }
    return { valid: false, errors: {} };
  }
};
