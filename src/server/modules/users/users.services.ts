//users.services.ts
import { ExistingUser, UserResponse } from "../../db/schema/users.js";
import { BadRequestError, mapDbError, NotFoundError } from "../../errors/errors.js";
import { hashPassword } from "../../utils/hash.js";
import { checkPermission } from "../../utils/jwt.js";
import { JwtPayloadApp } from "../auth/auth.types.js";
import * as userRepo from './users.repo.js';
import { CreateUserInput, CreateUserInputAsDev, PatchUserInput, UpdateUserInput } from './users.types.js';



function toUserResponse(user: ExistingUser): UserResponse {
  const { passwordHash, ...rest } = user;
  return rest;
} //could evnetually move to a users.mapper.ts if I have many more


export async function createUser(input: CreateUserInput) {
  //console.log('SERVICE INPUT:', input); //DEBUG LOGGING

  const { password, /*role,*/ ...rest } = input;
  const passwordHash = await hashPassword(password);

  try {
    const user = await userRepo.createUser({
      ...rest,
      passwordHash,
      role: 'public' // forces public role. Will need admin to assign role later
    });

    return toUserResponse(user); //removes hashedPassword

  } catch (err) {
    mapDbError(err);
  }
}

export async function getUsers() {
  //no permission check needed, already gaurded by middleware
  const users = await userRepo.getUsers();

  return users.map((user) => toUserResponse(user)); //maps each to remove hashed password
}

export async function getUserById(
  id: string,
  requester: JwtPayloadApp
) {
  checkPermission(id, requester.sub, requester.role, ['admin']);
  
  const user = await userRepo.getUserById(id);
  if (!user) throw new NotFoundError('User not found');

  return toUserResponse(user);
}

export async function updateUserById(
  id: string,
  input: UpdateUserInput,
  requester: JwtPayloadApp
) {  
  checkPermission(id, requester.sub, requester.role, ['admin']);

  const { password, role, ...rest } = input;
  const passwordHash = await hashPassword(password);
  const user = await userRepo.updateUserById({
    id,
    ...rest,
    passwordHash,
    role,
  });
  if (!user) throw new NotFoundError('User not found');

  return toUserResponse(user); //removes hashedPassword
}

export async function patchUserById(
  id: string,
  input: PatchUserInput,
  requester: JwtPayloadApp
) {
  checkPermission(id, requester.sub, requester.role, ['admin']);

  const { password, role, ...rest } = input;
  const updates = {
    ...rest,
    ...(role !== undefined ? { role } : {}),
    ...(password !== undefined ? { passwordHash: await hashPassword(password) } : {}),
  };

  if (Object.keys(updates).length === 0) {
    throw new BadRequestError('No fields provided to update');
  }

  const user = await userRepo.patchUserById({
    id,
    ...updates
  });
  if (!user) throw new NotFoundError('User not found');

  return toUserResponse(user); //removes hashedPassword
}

export async function deleteUserById(
  id: string,
  requester: JwtPayloadApp
) {
  //console.log('SERVICE INPUT:', input); //DEBUG LOGGING
  checkPermission(id, requester.sub, requester.role, ['admin']);

  const user = await userRepo.deleteUserById(id);
  if (!user) throw new NotFoundError('User not found');
  
  return toUserResponse(user);
}


// ⚠️ DEV ONLY, BELOW

export async function createUserAsDev(input: CreateUserInputAsDev) {
  //console.log('SERVICE INPUT:', input); //DEBUG LOGGING
  const { password, ...rest } = input;
  const passwordHash = await hashPassword(password);

  try {
    const user = await userRepo.createUser({
      ...rest,
      passwordHash,
      });

    return toUserResponse(user); //removes hashedPassword

  } catch (err) {
    mapDbError(err);
  }
}

export async function resetUsers() { 
  await userRepo.resetUsers();
}

