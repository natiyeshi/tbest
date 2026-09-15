import "server-only";
import { Db, MongoClient } from "mongodb";

// Reuse the client across HMR reloads in development, or the pool is exhausted
// within a few edits.
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

/**
 * Lazily create (and cache) the Mongo client. The connection string is read on
 * first use rather than at module load, so importing this module never throws
 * during `next build` — where MONGODB_URI is typically absent — while still
 * failing fast at runtime if the variable is genuinely missing.
 */
export function getClient(): MongoClient {
  if (globalForMongo._mongoClient) return globalForMongo._mongoClient;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  const client = new MongoClient(uri, {
    // The public pages fall back to the bundled content when a read fails, so
    // a slow or unreachable server should give up quickly rather than hold a
    // request open for the driver's 30-second default.
    serverSelectionTimeoutMS: 5000,
  });
  globalForMongo._mongoClient = client;
  return client;
}

export function getDb(): Db {
  return getClient().db(process.env.MONGODB_DB || "tbest");
}

/**
 * A handle whose property access is deferred to the lazy client, so
 * `import { db }` is side-effect-free at module load — the connection is only
 * established the first time a collection is actually used at runtime.
 */
export const db: Db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const real = getDb();
    const value = Reflect.get(real as object, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
