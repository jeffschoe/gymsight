//auth.repo.ts
import { config } from "../../config/env.js";
import { db } from "../../db/index.js"; 
import { refreshTokens } from "../../db/schema/refreshTokens.js";
import { users } from "../../db/schema/users.js";
import { eq, and, isNull, gt } from "drizzle-orm";

export async function saveRefreshToken(userID: string, token: string) {
  const rows = await db
    .insert(refreshTokens)
    .values({
      userId: userID,
      token: token,
      expiresAt: new Date(Date.now() + config.jwt.refreshDuration),
      revokedAt: null,
    })
    .returning();

  return rows.length > 0;
}

export async function userForRefreshToken(token: string) {
  const [result] = await db
    .select({ user: users })
    .from(users)
    .innerJoin(refreshTokens, eq(users.id, refreshTokens.userId))
    .where(
      and(
        eq(refreshTokens.token, token), 
        isNull(refreshTokens.revokedAt),
        gt(refreshTokens.expiresAt, new Date())   
      )
    )
    .limit(1);

  return result?.user;
}