//users.services.ts
import { ExistingUser } from "../../db/schema/users.js";
import { BadRequestError, ConflictError, NotFoundError, UserForbiddenError } from "../../errors/errors.js";
import { hashPassword } from "../../utils/hash.js";
import { checkPermission } from "../../utils/jwt.js";
import { JwtPayloadApp } from "../auth/auth.types.js";
import * as userRepo from './users.repo.js';
import { CreateUserInput, UserResponse } from "./users.schema.js";
import { /*CreateUserInput,*/ UpdateUserInput, /*UserResponse*/ } from "./users.types.js";


function toUserResponse(user: ExistingUser): UserResponse {
  const { passwordHash, ...rest } = user;
  return rest;
} //could evnetually move to a users.mapper.ts if I have many more


export async function createUser(input: CreateUserInput) {
  //console.log('SERVICE INPUT:', input); //DEBUG LOGGING
  //if (!input.email) throw new BadRequestError('Email required');
  //if (!input.password) throw new BadRequestError('Password required');
  
  const { password, /*role,*/ ...rest } = input;

  const passwordHash = await hashPassword(password);

  try {
    const user = await userRepo.createUser({
      ...rest,
      passwordHash,
      role: 'public' // forces public role. Will need admin to assign role later
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

export async function getUserById(
  id: string,
  requester: JwtPayloadApp
) {
  try {
    if (!id) throw new BadRequestError('ID required');

    console.log("***** 1")
    checkPermission(id, requester.sub, requester.role, ['admin']);
    console.log("***** 2")
    const user = await userRepo.getUserById(id);
    if (!user) throw new NotFoundError('User not found');

    return toUserResponse(user);
  
  } catch (err) {
    throw err;
  }
}

export async function updateUserById(
  id: string,
  input: UpdateUserInput,
  requester: JwtPayloadApp
) {
  try {
    if (!id) throw new BadRequestError('ID required');

    //console.log('SERVICE INPUT:', input); //DEBUG LOGGING
    if (!input.email) throw new BadRequestError('Email required');
    if (!input.password) throw new BadRequestError('Password required');
    
    checkPermission(id, requester.sub, requester.role, ['admin']);

    const { password, role, ...rest } = input;

    const passwordHash = await hashPassword(password);

    const user = await userRepo.updateUserById({
      id,
      ...rest,
      passwordHash,
      //role: 'public' will NOT update the role. Has to be done by admin or dev
    });

    return toUserResponse(user); //removes hashedPassword

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

  checkPermission(id, requester.sub, requester.role, ['admin']);

  try {
    const deletedUser = await userRepo.deleteUserById(id);
    
    return toUserResponse(deletedUser);
  } catch(err) {
    throw new NotFoundError('User not found');
  }
 
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

