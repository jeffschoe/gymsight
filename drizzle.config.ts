import { defineConfig } from "drizzle-kit";
import { config } from "./src/server/config/env"


export default defineConfig({
  schema: "./src/server/db/schema/",
  out: "./src/server/db/migrations/",
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.dbURL,
  },
});