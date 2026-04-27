//users.types.ts
import { Role } from "../../db/schema/users.js";





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