//users.services.ts
import { ExistingUser } from "../../db/schema/users.js";
import { BadRequestError, ConflictError, NotFoundError, UserForbiddenError } from "../../errors/errors.js";
import { hashPassword } from "../../utils/hash.js";
import { JwtPayloadApp } from "../auth/auth.types.js";
import * as userRepo from './users.repo.js';
import { CreateUserInput, UserResponse } from "./users.types.js";


function toUserResponse(user: ExistingUser): UserResponse {
  const { passwordHash, ...rest } = user;
  return rest;
} //could evnetually move to a users.mapper.ts if I have many more

export async function createUser(input: CreateUserInput) {
  //console.log('SERVICE INPUT:', input); //DEBUG LOGGING
  if (!input.email) throw new BadRequestError('Email required');
  if (!input.password) throw new BadRequestError('Password required');
  
  const { password, role, ...rest } = input;

  const passwordHash = await hashPassword(password);

  try {
    const user = await userRepo.createUser({
      ...rest,
      passwordHash,
      role: 'public' // prevent endpoint from passing whatever role, will need protected endpoint later
    });

    return toUserResponse(user); //removes hashedPassword

  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'cause' in err
    ) {
      const cause = (err as any).cause; //drizzle specific, wraps pg error code in cause {}

      if (cause?.code === '23505') { //pg error code for duplicate key
        throw new ConflictError('Email already exists');
      }
    }

    throw err;
  }
}

export async function getUsers() {
  try {
    const users = await userRepo.getUsers();

    //return users;
    return users.map((user) => toUserResponse(user)); //maps each to remove hashed password
  } catch (err) {
    throw err;
  }
}

export async function deleteUserById(
  id: string,
  requester: JwtPayloadApp
) {
  //console.log('SERVICE INPUT:', input); //DEBUG LOGGING
  if (!id) throw new BadRequestError('ID required');

  //permission to complete request
  const user = await userRepo.getUserById(id);
  if (!user) throw new NotFoundError('User not found');

  const isOwner = id === requester.sub;
  const isPrivileged = requester.role === 'admin';
  if (!isOwner && !isPrivileged) throw new UserForbiddenError;
  
  const deletedUser = await userRepo.deleteUserById(id);
  if (!deletedUser) throw new NotFoundError('User not found');
  
  return toUserResponse(deletedUser);
}


// ⚠️ DEV ONLY, BELOW

export async function createUserAsDev(input: CreateUserInput) {
  //console.log('SERVICE INPUT:', input); //DEBUG LOGGING
  if (!input.email) throw new BadRequestError('Email required');
  if (!input.password) throw new BadRequestError('Password required');
  
  const { password, ...rest } = input;

  const passwordHash = await hashPassword(password);

  try {
    const user = await userRepo.createUser({
      ...rest,
      passwordHash,
      });

    return toUserResponse(user); //removes hashedPassword

  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'cause' in err
    ) {
      const cause = (err as any).cause; //drizzle specific, wraps pg error code in cause {}

      if (cause?.code === '23505') { //pg error code for duplicate key
        throw new ConflictError('Email already exists');
      }
    }

    throw err;
  }
}

export async function resetUsers() { 
  await userRepo.resetUsers();
}

