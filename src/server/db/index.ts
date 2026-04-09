//index.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../config/env.js";


const pool = new Pool({
  connectionString: config.db.dbURL,
  //Creates a connection pool (A managed set of reusable database connections)
  //Handles multiple concurrent queries efficiently
  //When your app runs a query:

  //Grab an available connection
  //Run the query
  //Return it to the pool
})

export const db = drizzle(pool);
//Wraps the pool
//Adds typed queries + schema awareness