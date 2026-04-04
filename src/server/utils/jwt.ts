import jwt from "jsonwebtoken";
import { config } from "../config/env.js";




export function signJwt(
  userID: string, 
  expiresIn: number, 
  secret: string
): string {

  const issuedAt = Math.floor(Date.now() / 1000); //current time token was issued, in sec
  const expiresAt = issuedAt + expiresIn;

  const token = jwt.sign({
    "iss": config.jwt.issuer,
    "sub": userID, //subject of the token, the user
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