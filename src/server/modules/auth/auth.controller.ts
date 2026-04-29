//auth.controller.ts
import { getBearerToken } from '../../utils/jwt.js';
import * as authService from './auth.services.js';
import { Request, Response } from 'express';
import { loginSchema } from './auth.types.js';



export async function login(
  req: Request, 
  res: Response,
) {
  const params = loginSchema.parse(req.body);
  const result = await authService.login(params);
  return res.status(200).json(result);
}

export async function refresh(
  req: Request, 
  res: Response, 
) {
  const refreshToken = getBearerToken(req.headers.authorization);
  const result = await authService.refresh(refreshToken);
  return res.status(200).json(result);
}

export async function revoke(
  req: Request, 
  res: Response, 
) {
  const refreshToken = getBearerToken(req.headers.authorization);
  await authService.revoke(refreshToken);
  return res.status(204).send();
}
