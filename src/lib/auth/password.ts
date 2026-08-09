import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;

function derive(password: string, salt: Buffer, keyLength: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(
      password,
      salt,
      keyLength,
      { N: SCRYPT_N, r: SCRYPT_R, p: SCRYPT_P },
      (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      },
    );
  });
}

/** Hash a password as: scrypt:N:r:p:salt(hex):hash(hex) */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = await derive(password, salt, KEY_LENGTH);
  return `scrypt:${SCRYPT_N}:${SCRYPT_R}:${SCRYPT_P}:${salt.toString("hex")}:${derived.toString("hex")}`;
}

/**
 * Burn the same scrypt work as verifyPassword, against a throwaway salt.
 *
 * A login for an unknown email must cost the same as one for a real account.
 * Returning early on the miss makes response latency a user enumeration
 * oracle, which would defeat the deliberately generic error message.
 */
const DUMMY_SALT = randomBytes(16);
const DUMMY_EXPECTED = randomBytes(KEY_LENGTH);

export async function fakeVerifyPassword(password: string): Promise<boolean> {
  const derived = await derive(password, DUMMY_SALT, KEY_LENGTH);
  return timingSafeEqual(derived, DUMMY_EXPECTED);
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const [, , , , saltHex, hashHex] = parts;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  try {
    const derived = await derive(password, salt, expected.length);
    return timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}
