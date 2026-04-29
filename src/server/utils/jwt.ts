//jwt.ts
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/env.js";
import { UserForbiddenError, UserNotAuthenticatedError } from "../errors/errors.js";




export function signJwt(
  userID: string, 
  role: string,
  expiresIn: number, 
  secret: string
): string {

  const issuedAt = Math.floor(Date.now() / 1000); //current time token was issued, in sec
  const expiresAt = issuedAt + expiresIn;

  const token = jwt.sign({
    "iss": config.jwt.issuer,
    "sub": userID, //subject of the token, the user
    "role": role,
    "iat": issuedAt,
    "exp": expiresAt
  },
  secret,
  { algorithm: "HS256" }, //already the deafult, but showing intent
  );

  return token;
}

export function getBearerToken(authHeader: string | undefined): string {
  if (!authHeader) {
    throw new UserNotAuthenticatedError('Missing authorization header');
  }
  
  const match = authHeader.match(/^Bearer\s+(\S+)\s*$/i); //Matches "Bearer <token>" case-insensitively. Token must be non-empty and contain no whitespace. Trailing whitespace is allowed and discarded.
  if (!match) {
    throw new UserNotAuthenticatedError('Expected Bearer authorization scheme');
  }

  const token = match[1]!;
  // unreachable since \S+ requires at least one char, but keeping for safety
  if (!token) {
    throw new UserNotAuthenticatedError('Missing bearer token');
  }

  return token;
}

export function checkPermission(
  userId: string, 
  requesterSub: string, 
  requesterRole: string, 
  rolesToAllowPermission: string[]
) {
  const isOwner = userId === requesterSub;
  const isPrivileged = rolesToAllowPermission.includes(requesterRole);
  if (!isOwner && !isPrivileged) throw new UserForbiddenError;
}

export function checkRolePrivilege(
  requesterRole: string, 
  rolesToAllowPermission: string[]
) {
  const isPrivileged = rolesToAllowPermission.includes(requesterRole);
  if (!isPrivileged) throw new UserForbiddenError;
}

export function makeRefreshToken() {
  return crypto.randomBytes(32).toString('hex');
}