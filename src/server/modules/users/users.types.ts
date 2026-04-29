//users.types.ts
import { z } from 'zod';
import { Role, roleEnum } from "../../db/schema/users.js";



//types
export type UpdateUserDbInput = {
  id: string,
  email: string,
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export type PatchUserDbInput = {
  id: string,
  email?: string,
  passwordHash?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
}


//schemas
export const userFieldsSchema = z.strictObject({
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(roleEnum.enumValues)
});


export const createUserSchema = userFieldsSchema.omit({ role: true });

export type CreateUserInput = z.infer<typeof createUserSchema>;


export const userIdParamSchema = z.object({
  id: z.uuid(),
});

export type UserByIdInput = z.infer<typeof userIdParamSchema>;


export const patchUserSchema = userFieldsSchema.partial();

export type PatchUserInput = z.infer<typeof patchUserSchema>;


//DEV ONLY
export const createUserSchemaAsDev = userFieldsSchema;

export type CreateUserInputAsDev = z.infer<typeof createUserSchemaAsDev>;
