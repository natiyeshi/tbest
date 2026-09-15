import { toNextJsHandler } from "better-auth/next-js";

import { getAuth } from "@/lib/auth";

// The handlers are built per request rather than at module scope, so the auth
// instance — and its secret and database connection — is only constructed on
// the first real request, never while `next build` collects page data.
export async function GET(request: Request) {
  return toNextJsHandler(getAuth()).GET(request);
}

export async function POST(request: Request) {
  return toNextJsHandler(getAuth()).POST(request);
}
