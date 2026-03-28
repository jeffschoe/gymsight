// src/server/db/test.ts
import { db } from "./index";
import { users } from "./schema/users";

async function main() {
  const result = await db.insert(users).values({
    email: "test@example.com",
    passwordHash: "test123",
  });

  console.log("Inserted:", result);

  const result2 = await db.insert(users).values({
    email: "boobies@example.com",
    passwordHash: "test123",
    firstName: "Jeff",
    lastName: "Schoenberger",
    role: "admin",
  });

  console.log("Inserted:", result2);
}

main().catch(console.error);