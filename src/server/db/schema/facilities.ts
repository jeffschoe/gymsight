//wos.ts
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.js";




export const facilities = pgTable("facilities", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),

  name: varchar("name", { length: 256 }).notNull(),
  street_number: varchar("street_number", { length: 256 }).notNull(),
  street_name: varchar("street_name", { length: 256 }).notNull(),
  city: varchar("city", { length: 256 }).notNull(),
  state: varchar("state", { length: 256 }).notNull(),
  zip_code: varchar("zip_code", { length: 256 }).notNull(),
  
   //***GOTTEN FROM JWT OF HTTP REQUEST */
  creator: uuid("creator")
    .references(() => users.id, { onDelete: "set null" }),
    // if user is deleted, column is set to null

  manager: uuid("manager")
    .references(() => users.id, { onDelete: "set null" }),
    // if manager is deleted, column is set to null

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type NewFacility = typeof facilities.$inferInsert;
export type ExistingFacility = typeof facilities.$inferSelect;