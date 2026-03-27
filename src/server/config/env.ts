import "dotenv/config"; 
/*
installs the dotenv library, which loads environment variables from a .env file
it reads the .env file and injects values into process.env
so now we can use process.env.DATABASE_URL

This file runs once when your app starts (when it’s first imported)
If the env var is missing → app crashes immediately
If it exists → the rest of your app can safely assume it's valid
*/
if (!process.env.DATABASE_URL) { //can't find DB_URL
  throw new Error("DATABASE_URL is not set")
}
//this forces us to confirm it exists at startup

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  //make db string availble to rest of program
}