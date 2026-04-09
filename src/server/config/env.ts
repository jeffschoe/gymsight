//env.ts
import "dotenv/config"; 
import type { MigrationConfig } from "drizzle-orm/migrator";
/*
installs the dotenv library, which loads environment variables from a .env file
it reads the .env file and injects values into process.env
so now we can use process.env.DATABASE_URL

This file runs once when your app starts (when it’s first imported)
If the env var is missing → app crashes immediately
If it exists → the rest of your app can safely assume it's valid
*/

type Config = {
  api: APIConfig;
  db: DBConfig;
  jwt: JWTConfig
};


type APIConfig = {
  port: number;
  platform: string;
}


type DBConfig = {
  dbURL: string;
  //migrationConfig: MigrationConfig; //for auto migrations, may not use
}


type JWTConfig = {
  defaultDuration: number;
  refreshDuration: number;
  secret: string; 
  issuer: string;
}


function envOrThrow(key: string) {
  //generic, so can be used for dbURL string, or other env vars
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value; // found val for the key
}

/* //for auto migrations
const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/server/db/migrations/",
};
*/

const portStr = envOrThrow("PORT");
const port = Number(portStr);
if (Number.isNaN(port)) {
  throw new Error(`Invalid PORT: ${portStr}`);
}

export const config: Config = {
  api: {
    port,
    platform: envOrThrow("PLATFORM"),
  },
  db: {
    dbURL: envOrThrow("DATABASE_URL"),
    //migrationConfig: migrationConfig,
  },
  jwt: {
    defaultDuration: 60 * 60, // 1 hour in seconds
    refreshDuration: 60 * 60 * 24 * 60 * 1000, // 60 days in milliseconds
    secret: envOrThrow("JWT_SECRET"), //implement later
    issuer: envOrThrow("TOKEN_ISSUER"),
  }
}