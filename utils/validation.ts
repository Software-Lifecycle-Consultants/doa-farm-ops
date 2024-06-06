import { toast } from 'react-toastify';
import { z } from 'zod';

/*This is a reusable function that handles the validation and error handling 

Note : <T extends z.ZodTypeAny> is a TypeScript generic type parameter. 
It allows the validateFormData function to work with any Zod schema type that extends the z.ZodTypeAny type.*/

export const validateFormData = <T extends z.ZodTypeAny>(
  schema: T,
  formData: z.infer<T>
) => {
  const validation = schema.safeParse(formData);
  if (!validation.success) {
    toast.error('Validation failed. Please check your inputs.');
    return { validatedData: false, errors: validation.error.flatten().fieldErrors };
  }
  return { validatedData: true, data: validation.data };
};