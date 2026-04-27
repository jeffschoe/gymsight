import { z } from 'zod';
import { ExistingUser, Role, roleEnum } from '../../db/schema/users.js';



export const createUserSchema = z.strictObject({
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  //role: z.enum(roleEnum.enumValues) //pulled from schema definition since all roles will be 'public' by default until an admin elevate their role
});

export type CreateUserInput = z.infer<typeof createUserSchema>



export const userIdParamSchema = z.object({
  id: z.uuid(),
});

export type UserByIdInput = z.infer<typeof userIdParamSchema>


export const updateUserSchema = z.strictObject({
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(roleEnum.enumValues)
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>


export const patchUserSchema = updateUserSchema.partial();

export type PatchUserInput = z.infer<typeof patchUserSchema>



//DEV ONLY

export const createUserSchemaAsDev = createUserSchema.extend({
  role: z.enum(roleEnum.enumValues)
});

export type CreateUserInputAsDev = z.infer<typeof createUserSchemaAsDev>
