//jwt.test.ts
/*
import { describe, it, expect, beforeAll } from "vitest";
import { signJwt } from "./jwt.js";
import { UserNotAuthenticatedError } from "../errors/errors.js";
import { validateJWT } from "../middleware/auth.middleware.js";

describe("JWT creation and validation", () => {
  const userID1 = "testuser1";
  const userID2 = "testuser2";
  const expiresIn = 10;
  const secret1 = "secretfortestuser1";
  const secret2 = "secretfortestuser2";
  let token1: string;
  let token2: string;
  let expiredToken: string;

  beforeAll(async () => {
    token1 = signJwt(userID1, expiresIn, secret1);
    token2 = signJwt(userID2, expiresIn, secret2);
    expiredToken = signJwt(userID1, (expiresIn - 20), secret1);
  });

  it("should pass for proper JWT validation", () => {
    const result = validateJWT(token1, secret1);
    expect(result).toBe(userID1);
  });

  it("should throw for a JWT signed with the wrong secret", () => {
    expect(() => validateJWT(token1, secret2)).toThrow(
      UserNotAuthenticatedError
    );
  });

  it("should throw for an expired JWT token", () => {
    expect(() => validateJWT(expiredToken, secret1)).toThrow(
      UserNotAuthenticatedError
    );
  });

  it("should throw for a malformed token string", () => {
    expect(() => validateJWT("not-a-real-token", secret1)).toThrow(
      UserNotAuthenticatedError
    );
  });

});
*/