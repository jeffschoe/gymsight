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


export const loginSchema = z.strictObject({
  email: z.email(),
  password: z.string().min(1), // login allows any non-empty - don't enforce min(8) here like user creation, as rules may change over time
})

export type LoginInput = z.infer<typeof loginSchema>;


export type LoginResponse = UserResponse & {
  token: string;
  refreshToken: string;
}

export type RefreshResponse = {
  token: string;
};