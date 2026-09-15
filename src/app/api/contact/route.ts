import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { collections } from "@/lib/admin/data";
import { contactSchema } from "@/lib/validation";

/**
 * A best-effort rate limit, held in this instance's memory: five messages per
 * IP per ten minutes. It stops casual form spam; it is not a defence against a
 * determined flood, which belongs in front of the app.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; start: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Sweep expired entries occasionally so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, value] of hits) {
      if (now - value.start > WINDOW_MS) hits.delete(key);
    }
  }
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again a little later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${first.path.join(".") || "input"}: ${first.message}` },
      { status: 400 },
    );
  }

  // Honeypot tripped. Answer as though it worked, so a bot has nothing to
  // learn from the response and no reason to adapt.
  if (
    parsed.data._contactWebsite !== undefined &&
    parsed.data._contactWebsite !== ""
  ) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, subject, message } = parsed.data;

  try {
    await collections.contacts().insertOne({
      name,
      email,
      phone: phone || "",
      subject: subject || "",
      message,
      status: "new",
      createdAt: new Date(),
    });
  } catch (e) {
    // The visitor is told plainly rather than shown a success they did not get;
    // the form offers the firm's email address as the way through.
    console.error("[contact] could not store message", e);
    return NextResponse.json(
      { error: "We could not record your message. Please email us directly." },
      { status: 503 },
    );
  }

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");

  return NextResponse.json({ ok: true });
}
