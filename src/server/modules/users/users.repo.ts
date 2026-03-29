//db queries

import { db } from "../../db/index.js";
import { NewUser, users } from "../../db/schema/users.js";


export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();
  return result;
}




