//workOrders.ts
import { pgTable, timestamp, uuid, pgEnum, text } from "drizzle-orm/pg-core";
import { equipment } from "./equipment.js";
import { users } from "./users.js";

export const typeEnum = pgEnum("type", [
  "pm",
  "corrective",
  "other",
])

export const priorityEnum = pgEnum("priority", [
  "emergency",
  "high",
  "medium",
  "low",
])

export const statusEnum = pgEnum("status", [
  "open",
  "in progress",
  "completed",
  "canceled",
])

export type Priority = typeof priorityEnum.enumValues[number];
export type Status = typeof statusEnum.enumValues[number];

export const workOrders = pgTable("work_orders", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),

  //***GOTTEN FROM JWT OF HTTP REQUEST */
  creator: uuid("creator")
    .references(() => users.id, { onDelete: "set null" }),
    // if user is deleted, column is set to null

  //****passed in body, somehow need to use QR code */
  equipment: uuid("equipment")
    .notNull()
    .references(() => equipment.id, { onDelete: "cascade" }),
    // if equipment is deleted, WOs are deleted

  //***NOT PASSED IN BODY, ASSIGNED BY MANAGER LATER, or DON'T ALLOW PUBLIC TO ASSIGN */
  technician: uuid("technician")
    //can be null, until tech is assigned
    .references(() => users.id, { onDelete: "set null" }),
    // if user is deleted, column is set to null

  //passed in body
  description: text("description").notNull(),

  //don't allow public to assign
  type: typeEnum("type").notNull().default("corrective"), //default corrective
  //don't allow public to assign
  priority: priorityEnum("priority").notNull().default("low"), //default low
  //don't allow public to assign
  status: statusEnum("status").notNull().default("open"), //default open
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type NewWorkOrder = typeof workOrders.$inferInsert;
export type ExistingWorkOrder = typeof workOrders.$inferSelect;