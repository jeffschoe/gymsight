import { pgTable, timestamp, uuid, text, varchar, pgEnum } from "drizzle-orm/pg-core";



export const roleEnum = pgEnum("role", [
  "public",
  "technician",
  "manager",
  "admin",
])

export type Role = typeof roleEnum.enumValues[number];

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),

  email: varchar("email", { length: 256 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 256 }).notNull(),

  firstName: varchar("first_name", { length: 256 }), //allows null
  lastName: varchar("last_name", { length: 256 }),

  role: roleEnum("role").notNull().default("public"), // least-privileged role if none selected
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type NewUser = typeof users.$inferInsert;
export type UpdatedUser = {
  id: string,
  email: string,
  passwordHash: string;
  firstName?: string;
  lastName?: string;
}
export type ExistingUser = typeof users.$inferSelect;