//facilities.types.ts

import { NewFacility } from "../../db/schema/facilities.js";




export type CreateFacilityInput = Omit<NewFacility, "creator">;  // current the inferInsert from schema

