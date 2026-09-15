import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { getAuth } from "@/lib/auth";

/**
 * The one place a session is read. Memoized per request, so the layout, the
 * page and any action it calls can each ask without a second lookup.
 */
export const getAdminSession = cache(async () => {
  return getAuth().api.getSession({ headers: await headers() });
});

/** For pages and layouts: send anyone without a session to the login form. */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return session;
}

/**
 * For server actions: throw rather than redirect, so the caller gets a clean
 * error to show in the form instead of a navigation it did not ask for.
 */
export async function assertAdmin() {
  const session = await getAdminSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
