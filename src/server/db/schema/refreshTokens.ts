//refreshTokens.ts
import { pgTable, timestamp, varchar, uuid, boolean } from "drizzle-orm/pg-core";
import { users } from "./users.js";


export const refreshTokens = pgTable("refresh_tokens", {
  token: varchar("token", { length: 64 }).primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
});

export type NewToken = typeof refreshTokens.$inferInsert;