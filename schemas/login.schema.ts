import { z } from 'zod';

export const schemaLogin = z.object({
  email: z.string().nonempty('Email is required').email('Please enter a valid email address'),
  password: z.string().nonempty('Password is required').min(6, 'Please Enter Correct Password').max(100),
});
