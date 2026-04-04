import argon2 from 'argon2';



export async function hashPassword(password: string) {
  return argon2.hash(password);
}

//eventually will need for auth/logging in
export async function verifyPassword(password: string, hash: string) {
  if (!password) return false; // Guard against empty/undefined password

  try {
    return argon2.verify(hash, password); // Catch argon2 errors
  } catch {
    return false;
  }
}