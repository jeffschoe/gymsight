import { z } from 'zod';



export const createUserSchema = z.strictObject({
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  //role: z.enum(roleEnum.enumValues) //pulled from schema definition since all roles will be 'public' by default until an admin elevate their role
});

export type CreateUserInput = z.infer<typeof createUserSchema>

//users.types.ts
import { ExistingUser, Role, roleEnum } from "../../db/schema/users.js";

export type UpdateUserInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
};

export type UserResponse = Omit<ExistingUser, "passwordHash">;

export type UserByIdParams = {
  id: string;
};