import { pgTable, timestamp, uuid, text, pgEnum } from "drizzle-orm/pg-core";



export const roleEnum = pgEnum("role", [
  "public",
  "technician",
  "manager",
  "admin",
])

export type Role = typeof roleEnum.enumValues[number];

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),

  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),

  firstName: text("first_name"), //allows null
  lastName: text("last_name"),

  role: roleEnum("role").notNull().default("public"), // least-privileged role if none selected
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type NewUser = typeof users.$inferInsert;
export type ExistingUser = typeof users.$inferSelect;