//db queries
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

export async function deleteUserById(id: string) {
  const [result] = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return result;
}

// ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
export async function resetUsers() {
  await db.delete(users)
  //return { success: true } //leaving out for now
}



