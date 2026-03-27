import"dotenv/config"; 
//installs the dotenv library, which loads environment variables from a .env file
// it reads the .env file and injects values into process.env
// so now we can use process.env.DATABASE_URL
if (!process.env.DATABASE_URL) { //can't find DB_URL
  throw new Error("DATABASE_URL is not set")
}
//this forces use to confirm it exists at startup

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
}