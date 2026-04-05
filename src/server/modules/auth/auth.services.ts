//auth.services.ts
import { config } from "../../config/env.js";
import { BadRequestError, UserNotAuthenticatedError } from "../../errors/errors.js";
import { verifyPassword } from "../../utils/hash.js";
import { signJwt } from "../../utils/jwt.js";
import * as userRepo from '../users/users.repo.js';
import { inputParameters, LoginResponse } from "./auth.types.js";




export async function login(
  input: inputParameters
) {
  if (!input.email) throw new BadRequestError("Email is required");
  if (!input.password) throw new BadRequestError("Password is required");

  const user = await userRepo.getUserByEmail(input.email);
  if (!user) {
    throw new UserNotAuthenticatedError('Invalid credentials');
  }

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) {
    throw new UserNotAuthenticatedError('Invalid credentials');
  }

  const token = signJwt(
    user.id,
    user.role,
    config.jwt.defaultDuration,
    config.jwt.secret
  )

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token
  } satisfies LoginResponse;

  
}