//users.types.ts
import { ExistingUser, Role } from "../../db/schema/users.js";



/*
export type CreateUserInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
};
*/

export type UpdateUserInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
};

//export type UserResponse = Omit<ExistingUser, "passwordHash">;

export type UserByIdParams = {
  id: string;
};

