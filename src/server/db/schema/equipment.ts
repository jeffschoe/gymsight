//equipment.ts
import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { facilities } from "./facilities.js";
import { users } from "./users.js";





export const equipment = pgTable("equipment", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(), //leg press, etc
  manufacturer: varchar("manufacturer", { length: 256 }), //allows null
  serialNumber: varchar("serial_number", { length: 256 }), //allows null
  vintage: integer("vintage"), //allows null
  warrantyExpiration: timestamp("warranty_expiration"), //allows null

  //***GOTTEN FROM JWT OF HTTP REQUEST */
  creator: uuid("creator")
    .references(() => users.id, { onDelete: "set null" }),
    // if user is deleted, column is set to null

  facility: uuid("facility")
    .references(() => facilities.id, { onDelete: "set null" }),
    // if facility is deleted, collumn is set to null (in case moving to different facility)

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type NewEquipment = typeof equipment.$inferInsert;
export type ExistingEquipment = typeof equipment.$inferSelect;