import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { getDb } from "@/lib/db";

/**
 * Every hostname the app is legitimately served from. Better Auth rejects a
 * sign-in whose `Origin` header is not on this list (`INVALID_ORIGIN`), so a
 * missing entry reads as a broken login rather than as a misconfiguration.
 *
 * `BETTER_AUTH_URL` is the canonical answer, but on Vercel it is easy for it
 * to be absent from the instance actually running — the variable only reaches
 * deployments built after it was added, and it is scoped per environment, so
 * a preview build can be serving with it unset. Vercel's own system variables
 * are always present, so derive the rest from them:
 *
 *   VERCEL_PROJECT_PRODUCTION_URL  the stable production alias
 *   VERCEL_URL                     this exact deployment's hostname
 *   VERCEL_BRANCH_URL              the per-branch preview alias
 */
function resolveOrigins(): string[] {
  const origins = new Set<string>();

  const configured = process.env.BETTER_AUTH_URL;
  if (configured) {
    try {
      origins.add(new URL(configured).origin);
    } catch {
      throw new Error(`BETTER_AUTH_URL is not a valid URL: ${configured}`);
    }
  }

  for (const host of [
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
  ]) {
    if (host) origins.add(`https://${host}`);
  }

  // A dev server may fall back past its usual port.
  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://localhost:3001");
    origins.add("http://127.0.0.1:3000");
  }

  return [...origins];
}

function buildAuth(secret: string) {
  const trustedOrigins = resolveOrigins();
  // The canonical URL this instance answers on: the production alias when this
  // is the production deployment, otherwise the deployment's own hostname, so
  // a preview build does not hand out production callback URLs.
  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
      : process.env.VERCEL_URL;
  const baseURL =
    process.env.BETTER_AUTH_URL ||
    (vercelHost && `https://${vercelHost}`) ||
    "http://localhost:3000";

  return betterAuth({
    // `transaction: false` — the database runs as a standalone server, not a
    // replica set, and standalone MongoDB has no transactions.
    database: mongodbAdapter(getDb(), { transaction: false }),
    secret,
    baseURL,
    trustedOrigins,
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
