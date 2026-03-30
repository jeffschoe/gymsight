import { hashPassword } from "../../utils/hash.js";
import * as userRepo from './users.repo.js';
import { CreateUserInput } from "./users.types.js";

export async function createUser(input: CreateUserInput) {
  console.log('SERVICE INPUT:', input);
  if (!input.email) throw new Error('Email required');
  if (!input.password) throw new Error('Password required');
  
  const { password, role, ...rest } = input;

  const passwordHash = await hashPassword(password);

  //hashing still not implemented
  return userRepo.createUser({
    ...rest,
    passwordHash,
    role: 'public' // prevent endpoint from passing whatever role, will need prtoected endpoint later
  });
}

