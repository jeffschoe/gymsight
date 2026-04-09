//startUp.ts
import { db } from "./index.js";




export async function verifyDatabase() {
  try {
    await db.execute('select 1');
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database connection failed. Verify Docker container is running.');
    process.exit(1);
  }
}