//db queries

import { db } from "../../db/index.js";
import { NewUser, users } from "../../db/schema/users.js";


export async function createUser(user: NewUser) {
  console.log('REPO INPUT:', user);
  const [result] = await db
    .insert(users)
    .values(user)
    //.onConflictDoNothing() //leaving out for now
    .returning();
  return result;
}




