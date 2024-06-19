import { z } from 'zod';

  // zod validation Schema
export const userRegisterSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().length(10, 'Phone number must be exactly 10 digits'),
    nic: z.string().min(10, 'NIC must be at least 10 characters'),
    address: z.string().min(1, 'Address is required'),
    role:z.string().min(1,'Please select a role'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });
  