//auth.middleware.ts
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../utils/jwt.js";
import { jwtPayloadAppSchema } from "../modules/auth/auth.types.js";
import { z } from 'zod';
import { UserNotAuthenticatedError } from "../errors/errors.js";



export function middlewareRequireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = getBearerToken(req.headers.authorization);
    const raw = jwt.verify(token, config.jwt.secret)
    const decoded = jwtPayloadAppSchema.parse(raw);

    req.user = decoded;
    //console.log('JWT PAYLOAD:', decoded);

    next();

  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.warn('JWT verification failed:', err.message);
    } else if (err instanceof z.ZodError) {
      console.warn('JWT payload shape invalid:', err.issues);
    } else if (err instanceof UserNotAuthenticatedError) {
      console.warn('Bearer token error:', err.message);
    } else {
      return next(err); // let global error handler decide (probably a 500)
    }

    return res.status(401).json({ message: 'Invalid token' });
  }

}

