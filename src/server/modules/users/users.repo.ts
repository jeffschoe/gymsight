//uses.repo.ts
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { NewUser, UpdatedUser, users } from "../../db/schema/users.js";


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

export async function getUserById(id: string) {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    return result;
}

export async function updateUserById(user: UpdatedUser) {
  const [result] = await db
    .update(users)
    .set({
      email: user.email,
      passwordHash: user.passwordHash,
      firstName: user.firstName,
      lastName: user.lastName
    })
    .where(eq(users.id, user.id))
    .returning();
    return result;
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
  return deleted; // add null if user to delete was not found?
}

// ⚠️ DEV ONLY, BELOW

export async function resetUsers() { 
  await db
  .delete(users)
}



