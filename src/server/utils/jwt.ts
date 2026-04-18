//jwt.ts
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/env.js";
import { UserForbiddenError } from "../errors/errors.js";




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

export function getBearerToken(authHeader: string) {
  return authHeader.split(' ')[1]; //get bearer token
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
  console.log("**** 1")
  const isPrivileged = rolesToAllowPermission.includes(requesterRole);
  console.log("**** 2");
  if (!isPrivileged) throw new UserForbiddenError;
  console.log("**** 3")
}

export function makeRefreshToken() {
  return crypto.randomBytes(32).toString('hex');
}