// auth.middleware.ts
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../utils/jwt.js";
import { JwtPayloadApp } from "../modules/auth/auth.types.js";




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
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayloadApp;

    (req as any).user = decoded;
    console.log('JWT PAYLOAD:', decoded);

    next();

  } catch {
    console.log(`FAILED HERE middlewareReqAuth catch`)
    return res.status(401).json({ message: "Invalid token" })
  }


}

