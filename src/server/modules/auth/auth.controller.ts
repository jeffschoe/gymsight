import * as authService from './auth.services.js';
import { Request, Response, NextFunction } from 'express';



export async function login(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}