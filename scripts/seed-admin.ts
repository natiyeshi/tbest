/**
 * Provisions the single admin account. Public sign-up is switched off in the
 * app itself (src/lib/auth.ts), so this script builds its own Better Auth
 * instance — with sign-up enabled — pointed at the same database.
 *
 *   npm run seed:admin
 *
 * Reads ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME from .env.local. Running it
 * twice is harmless: an existing account is left alone.
 */
import { config } from "dotenv";

config({ path: ".env.local" });
config();

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

async function main() {
  const uri = process.env.MONGODB_URI;
  const secret = process.env.BETTER_AUTH_SECRET;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Administrator";

  if (!uri || !secret) {
    throw new Error(
      "MONGODB_URI and BETTER_AUTH_SECRET must be set in .env.local",
    );
  }
  if (!email || !password) {
    throw new Error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local, then run this again.",
    );
  }
  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters.");
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "tbest");

  try {
    const existing = await db
      .collection("user")
      .findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log(`Admin account already exists: ${email} — nothing to do.`);
      console.log("Change the password from the dashboard's Security page.");
      return;
    }

    const auth = betterAuth({
      database: mongodbAdapter(db, { transaction: false }),
      secret,
      baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      emailAndPassword: { enabled: true, minPasswordLength: 12 },
    });

    await auth.api.signUpEmail({ body: { name, email, password } });
    console.log(`Admin account created: ${email}`);
    console.log("Sign in at /admin/login.");
    console.log("Now remove ADMIN_PASSWORD from .env.local.");
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
