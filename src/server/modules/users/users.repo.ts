//uses.repo.ts
import { asc, desc, eq, and } from "drizzle-orm";
import { db } from "../../db/index.js";
import { NewUser, users } from "../../db/schema/users.js";


export async function createUser(user: NewUser) {
  //console.log('REPO INPUT:', user); DEBUG LOGGING
  const [result] = await db
    .insert(users)
    .values(user)
    //.onConflictDoNothing() //leaving out for now
    .returning();
  return result;
}

export async function getUsers() {
  const results = await db
  .select()
  .from(users)
  return results;
}


export async function getUserByEmail(email: string) {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    return result;
}

export async function deleteUserById(id: string) {
  const [deleted] = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return deleted ?? null; // null if user to delete was not found
}


export async function resetUsers() { // ⚠️ DEV ONLY
  await db.delete(users)
}



