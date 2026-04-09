//auth.controller.ts
import { getBearerToken } from '../../utils/jwt.js';
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

export async function refresh(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith('Bearer ')) { //"If authHeader is missing OR does not start with 'Bearer ', return 401.
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const refreshToken = getBearerToken(authHeader);

    const result = await authService.refresh(refreshToken);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
