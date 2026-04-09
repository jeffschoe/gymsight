//hash.test.ts
import { describe, it, expect, beforeAll } from "vitest";
import { hashPassword, verifyPassword } from "./hash.js";





describe("Password Hashing", () => {
  const password1 = "correctPassword123!";
  const password2 = "anotherPassword456!";
  let hash1: string;
  let hash2: string;

  beforeAll(async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);
  });

  it("should return true for the correct password", async () => {
    const result = await verifyPassword(password1, hash1);
    expect(result).toBe(true);
  });

  it("should return false for the incorrect password", async () => {
    const result = await verifyPassword(password2, hash1);
    expect(result).toBe(false);
  });

  it("should return false for the missing password", async () => {
    const result = await verifyPassword("", hash1);
    expect(result).toBe(false);
  });

  it("should return false for an invalid hash", async () => {
    await expect(verifyPassword(password1, "invalidhash")).rejects.toThrow();
  });

});