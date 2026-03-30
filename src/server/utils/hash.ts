import argon2 from 'argon2';



export async function hashPassword(password: string) {
  return argon2.hash(password);
}

//eventually will need for auth/logging in
export async function verifyPassword(hash: string, password: string) {
  return argon2.verify(hash, password);
}