/**
 * Generate a bcrypt hash for an admin password.
 *
 * Usage:
 *   bun run scripts/hash-password.ts "yourpassword"
 *
 * Then set ADMIN_PASSWORD_HASH in your .env to the printed hash
 * (and remove the ADMIN_PASSWORD fallback for production).
 */
import bcrypt from "bcryptjs";

const pwd = process.argv[2];
if (!pwd) {
  console.error("Usage: bun run scripts/hash-password.ts <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(pwd, 10);
console.log(hash);
