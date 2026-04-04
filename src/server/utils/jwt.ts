import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { UserNotAuthenticatedError } from "../errors/errors.js";

const TOKEN_ISSUER = "gymsight";


export function signJwt(
  userID: string, 
  expiresIn: number, 
  secret: string
): string {

  const issuedAt = Math.floor(Date.now() / 1000); //current time token was issued, in sec
  const expiresAt = issuedAt + expiresIn;

  const token = jwt.sign({
    "iss": TOKEN_ISSUER,
    "sub": userID, //subject of the token, the user
    "iat": issuedAt,
    "exp": expiresAt
  },
  secret,
  { algorithm: "HS256" }, //already the deafult, but showing intent
  );

  return token;
}


type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;


export function validateJWT(tokenString: string, secret: string): string {

  let decoded: payload;

  try {
    decoded = jwt.verify(tokenString,secret) as payload;
  } catch {
    throw new UserNotAuthenticatedError("Invalid token");
  }

  if (decoded.iss !== TOKEN_ISSUER) {
    throw new UserNotAuthenticatedError("Invalid issuer");
  }

  if (typeof decoded.sub !== "string") {
    throw new UserNotAuthenticatedError("No user ID in token");
  }
  
  return decoded.sub; //userID

}