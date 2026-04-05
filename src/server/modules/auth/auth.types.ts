import { JwtPayload } from "jsonwebtoken";
import { UserResponse } from "../users/users.types.js";



export type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export type inputParameters = {
  email: string; 
  password: string
}

export type LoginResponse = UserResponse & {
  token: string;
  //refreshToken: string;
}