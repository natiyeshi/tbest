"use client";

import { useState } from "react";

import { firm } from "@/lib/content";

/**
 * A message form with no backend: on submit it composes a mailto: link and
 * hands it to the visitor's own mail client. Nothing is sent automatically —
 * the visitor reviews and sends the email themselves. If the firm later adds a
 * mail API, swap the handler for a fetch to that endpoint.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "Website enquiry");
    const message = String(data.get("message") || "");

    const body = [
      message,
      "",
      "—",
      name && `From: ${name}`,
      email && `Email: ${email}`,
    ]
      .filter(Boolean)
      .join("\n");

    const href = `mailto:${firm.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
  }

  const field =
    "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-brand-900 outline-none transition-colors placeholder:text-muted/60 focus:border-copper-400 focus:ring-2 focus:ring-copper-400/20";

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

      <label className="block">
        <span className="text-sm font-medium text-brand-800">Subject</span>
        <input name="subject" type="text" className={field} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-brand-800">Message</span>
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>

      <button
        type="submit"
        className="inline-flex items-center gap-3 rounded-full bg-copper-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-copper-600"
      >
        Send us a message
        <span aria-hidden="true">&rarr;</span>
      </button>

      {sent && (
        <p role="status" className="text-sm text-muted">
          Your email client should have opened with the message ready to send.
          If it did not, write to us directly at{" "}
          <a href={`mailto:${firm.email}`} className="font-semibold text-copper-600">
            {firm.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
