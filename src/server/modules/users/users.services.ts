import { NewUser } from "../../db/schema/users.js";
import * as userRepo from './users.repo.js';

export async function createUser(input: NewUser) {
  if (!input.email) throw new Error('Email required');
  if (!input.passwordHash) throw new Error('Password hash required');
  console.log('SERVICE INPUT:', input);
  //hashing still not implemented
  return userRepo.createUser(input);
}

