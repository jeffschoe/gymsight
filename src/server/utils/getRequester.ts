//getRequester.ts
import { UserNotAuthenticatedError } from "../errors/errors.js";
import { JwtPayloadApp } from "../modules/auth/auth.types.js";
import { Request } from 'express';



export function getRequester(req: Request): JwtPayloadApp {
  if (!req.user) {
    throw new UserNotAuthenticatedError('Authentication required');
  }
  return req.user;
}