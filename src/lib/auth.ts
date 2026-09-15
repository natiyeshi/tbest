import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { getDb } from "@/lib/db";

function buildAuth(secret: string) {
  return betterAuth({
    // `transaction: false` — the database runs as a standalone server, not a
    // replica set, and standalone MongoDB has no transactions.
    database: mongodbAdapter(getDb(), { transaction: false }),
    secret,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    // A dev server may fall back to another port; production stays strict and
    // trusts only BETTER_AUTH_URL.
    ...(process.env.NODE_ENV !== "production"
      ? { trustedOrigins: ["http://localhost:3000", "http://localhost:3001"] }
      : {}),
    emailAndPassword: {
      enabled: true,
      // There is no public registration: the firm's account is provisioned
      // once with `npm run seed:admin`.
      disableSignUp: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      revokeSessionsOnPasswordReset: true,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // a week
      updateAge: 60 * 60 * 24, // refresh the expiry at most once a day
      cookieCache: { enabled: true, maxAge: 60 * 5 },
    },
    rateLimit: {
      enabled: true,
      window: 60,
      max: 60,
      storage: "database",
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/change-password": { window: 60, max: 5 },
      },
    },
    plugins: [nextCookies()],
  });
}

let authInstance: ReturnType<typeof buildAuth> | undefined;

/**
 * Lazily build (and cache) the Better Auth instance. Construction is deferred
 * so importing this module is side-effect-free at `next build` time — the
 * secret and the database connection are only needed once auth is actually
 * exercised at runtime, not while the build collects page data.
 */
export function getAuth() {
  if (authInstance) return authInstance;

  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("Missing BETTER_AUTH_SECRET environment variable");
  }

  authInstance = buildAuth(secret);
  return authInstance;
}
