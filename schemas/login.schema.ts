import { z } from 'zod';

export const schemaLogin = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Please Enter Correct Password').max(100),
});
