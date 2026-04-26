//auth.types.ts
import { z } from 'zod';
import { roleEnum, UserResponse } from '../../db/schema/users.js';



export const jwtPayloadAppSchema = z.object({
  iss: z.string(),
  sub: z.uuid(),
  role: z.enum(roleEnum.enumValues),
  iat: z.number(),
  exp: z.number(),
})

export type JwtPayloadApp = z.infer<typeof jwtPayloadAppSchema>;


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