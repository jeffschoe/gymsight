//auth.types.ts
import { UserResponse } from "../users/users.types.js";




export type JwtPayloadApp = {
  iss: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
};

export type inputParameters = {
  email: string; 
  password: string
}

export type LoginResponse = UserResponse & {
  token: string;
  refreshToken: string;
}

export type RefreshResponse = {
  token: string;
};