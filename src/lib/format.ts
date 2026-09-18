/**
 * Pure text and date helpers shared by the admin.
 *
 * Deliberately outside `components/admin/ui.tsx`: that module carries the
 * `"use client"` directive, and every export of such a file is a client entry
 * point rather than the function itself. A Server Component can render those
 * exports as components, but calling one — as the dashboard did with
 * `formatDate` — throws at runtime. Keeping the plain functions in a module
 * with no directive lets both sides import the same implementation.
 */

/** "2024-05-31" or an ISO timestamp -> "31 May 2024". */
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
