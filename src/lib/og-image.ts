import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

/**
 * The share card for a page, or a sensible stand-in.
 *
 * `npm run og:build` draws one card per practice, sector, member and insight
 * that exists in the repo. Anything added through the dashboard afterwards has
 * no card until that runs again — so rather than pointing a crawler at a
 * missing file and getting no preview at all, fall back to the card for the
 * section the page sits in.
 *
 * The check is a filesystem stat, which is fine: these pages are prerendered,
 * so it happens at build time and never per request.
 */
export function ogImage(preferred: string, fallback: string): string {
  const file = path.join(process.cwd(), "public", preferred.replace(/^\//, ""));
  return existsSync(file) ? preferred : fallback;
}
