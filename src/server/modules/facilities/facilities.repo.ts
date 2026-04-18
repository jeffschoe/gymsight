//facilities.routes.ts
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { facilities } from "../../db/schema/facilities.js";
import { CreateFacilityInput } from "./facilities.types.js";



export async function createFacility(
  facility: CreateFacilityInput, 
  creator: string,
  manager: string
) {
  //console.log('REPO INPUT:', user); DEBUG LOGGING
  const [result] = await db
    .insert(facilities)
    .values({...facility, creator, manager})
    //.onConflictDoNothing() //leaving out for now
    .returning();
  return result;
}