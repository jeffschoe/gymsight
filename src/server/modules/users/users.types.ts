import { Role } from "../../db/schema/users.js";




export type CreateUserInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
};