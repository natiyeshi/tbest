"use client";

import { useEffect } from "react";

/**
 * The dashboard's shared parts. Built from the site's own tokens — brand teal,
 * copper, bone, the Butler display face — so the admin reads as part of TBeST
 * rather than as a bolted-on tool.
 */

export const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-brand-900 outline-none transition-colors placeholder:text-muted/60 focus:border-copper-400 focus:ring-2 focus:ring-copper-400/20";

export const primaryBtn =
  "inline-flex items-center gap-2 rounded-full bg-copper-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-copper-600 disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryBtn =
  "inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:bg-bone disabled:opacity-60";

export const dangerBtn =
  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60";

export const quietBtn =
  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-800 transition-colors hover:bg-copper-500/10 disabled:opacity-60";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-800">
        {label}
        {hint && <span className="ml-2 text-xs font-normal text-muted">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

/**
 * A list the admin edits one line at a time — an article's paragraphs, a
 * practice's services. Stored as an array, so the public pages keep rendering
 * each entry as its own element rather than splitting a blob at render time.
 */
export function LinesField({
  label,
  hint,
  value,
  onChange,
  rows = 6,
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (lines: string[]) => void;
  rows?: number;
}) {
  return (
    <Field label={label} hint={hint ?? "One per line"}>
      <textarea
        rows={rows}
        value={value.join("\n")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean),
          )
        }
        className={`${inputCls} resize-y leading-relaxed`}
      />
    </Field>
  );
}

export function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  // Escape closes, and the page behind must not scroll under the sheet.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-brand-950/60 p-4 backdrop-blur-sm sm:p-8">
      <div
        className={`relative my-auto w-full ${wide ? "max-w-3xl" : "max-w-xl"} rounded-2xl bg-white p-6 shadow-2xl shadow-brand-950/20 sm:p-8`}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-xl tracking-tight text-brand-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-bone"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl tracking-tight text-brand-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-12 text-center text-sm text-muted">
      {message}
    </div>
  );
}

export function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
  );
}

export function formatDate(iso: string) {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "A Long Title Here" -> "a-long-title-here". */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .slice(0, 120);
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
