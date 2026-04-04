// auth.middleware.ts
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { config } from "../config/env.js";
import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../utils/jwt.js";


type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;


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
    const decoded = jwt.verify(token, config.jwt.secret) as payload;

    (req as any).user = decoded;

    next();

  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }


}

