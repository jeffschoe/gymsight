//auth.services.ts
import { config } from "../../config/env.js";
import { BadRequestError, UserNotAuthenticatedError } from "../../errors/errors.js";
import { verifyPassword } from "../../utils/hash.js";
import { makeRefreshToken, signJwt } from "../../utils/jwt.js";
import * as userRepo from '../users/users.repo.js';
import * as authRepo from '../auth/auth.repo.js';
import { LoginInput, LoginResponse, RefreshResponse } from "./auth.types.js";




export async function login(
  input: LoginInput
) {
  const user = await userRepo.getUserByEmail(input.email);
  if (!user) throw new UserNotAuthenticatedError('Invalid credentials');

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) throw new UserNotAuthenticatedError('Invalid credentials');

  const token = signJwt(
    user.id,
    user.role,
    config.jwt.defaultDuration,
    config.jwt.secret
  )

  const refreshToken = makeRefreshToken();

  const refreshTokenSaved = await authRepo.saveRefreshToken(user.id, refreshToken);
  if (!refreshTokenSaved) throw new UserNotAuthenticatedError(`Could not save refresh token`);

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token,
    refreshToken
  } satisfies LoginResponse;
}


export async function refresh(
  refreshToken: string,
) {

  const user = await authRepo.userForRefreshToken(refreshToken);
  if (!user) throw new UserNotAuthenticatedError("Invalid refresh token"); //401

  const newAccessToken = signJwt(
    user.id,
    user.role,
    config.jwt.defaultDuration,
    config.jwt.secret
  )

  return {
    token: newAccessToken 
  } satisfies RefreshResponse;
}


export async function revoke(
  refreshToken: string,
) {

  await authRepo.revokeRefreshToken(refreshToken);
  
  return;
}
