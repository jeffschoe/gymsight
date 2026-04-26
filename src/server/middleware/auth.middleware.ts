//auth.middleware.ts
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../utils/jwt.js";
import { jwtPayloadAppSchema } from "../modules/auth/auth.types.js";
import { z } from 'zod';



export function middlewareRequireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if(!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = getBearerToken(authHeader);


  try {
    const raw = jwt.verify(token, config.jwt.secret)
    const decoded = jwtPayloadAppSchema.parse(raw);

    req.user = decoded;
    console.log('JWT PAYLOAD:', decoded);

    next();

  } catch (err) {
  if (err instanceof jwt.JsonWebTokenError) {
    console.warn('JWT verification failed:', err.message);
  } else if (err instanceof z.ZodError) {
    console.warn('JWT payload shape invalid:', err.issues);
  }
  return res.status(401).json({ message: 'Invalid token' });
}


}

