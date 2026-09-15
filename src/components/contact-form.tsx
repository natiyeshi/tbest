"use client";

import { useState } from "react";

import { firm } from "@/lib/content";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

/**
 * The firm's enquiry form. A message is posted to /api/contact and lands in the
 * dashboard's inbox; nothing is emailed, so the address below stays on show as
 * the way through if the request fails.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = new FormData(formEl);

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          subject: String(data.get("subject") || ""),
          message: String(data.get("message") || ""),
          _contactWebsite: String(data.get("_contactWebsite") || ""),
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({
          kind: "error",
          message: body.error || "We could not send that. Please try again.",
        });
        return;
      }
      formEl.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: "We could not reach the server. Please try again.",
      });
    }
  }

  const field =
    "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-brand-900 outline-none transition-colors placeholder:text-muted/60 focus:border-copper-400 focus:ring-2 focus:ring-copper-400/20";

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-brand-800">Your name</span>
          <input name="name" type="text" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-brand-800">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-brand-800">
            Phone <span className="font-normal text-muted">(optional)</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-brand-800">Subject</span>
          <input name="subject" type="text" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-brand-800">Message</span>
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>

      {/* Honeypot: off-screen and out of the tab order, so only a bot fills it.
          A submission that does is accepted and discarded server-side. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="_contactWebsite" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-3 rounded-full bg-copper-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-copper-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send us a message"}
        {!sending && <span aria-hidden="true">&rarr;</span>}
      </button>

      {status.kind === "sent" && (
        <p role="status" className="text-sm text-muted">
          Thank you — your message has reached us and one of our lawyers will be
          in touch.
        </p>
      )}

      {status.kind === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {status.message} You can also write to us directly at{" "}
          <a href={`mailto:${firm.email}`} className="font-semibold text-copper-600">
            {firm.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
