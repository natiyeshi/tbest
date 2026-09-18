import Link from "next/link";

import { PageHeader } from "@/components/admin/ui";
import { getDashboardStats, type DashboardStats } from "@/lib/admin/data";
import { formatDate } from "@/lib/format";
import { requireAdmin } from "@/lib/admin/session";

function Stat({
  label,
  value,
  href,
  note,
}: {
  label: string;
  value: number;
  href: string;
  note?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-line bg-white p-6 transition-colors hover:border-copper-300"
    >
      <p className="eyebrow text-copper-500">{label}</p>
      <p className="mt-3 font-display text-3xl text-brand-900">{value}</p>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </Link>
  );
}

export default async function AdminOverviewPage() {
  const session = await requireAdmin();

  // A database that is unreachable should still render a usable dashboard —
  // the sections themselves report the failure when they cannot read.
  let stats: DashboardStats | null = null;
  try {
    stats = await getDashboardStats();
  } catch (e) {
    console.error("[admin] dashboard stats unavailable", e);
  }

  const firstName = session.user.name?.split(" ")[0] || "there";

  return (
    <>
      <PageHeader
        title={`Welcome back, ${firstName}.`}
        description="What is on the site, and what has come in."
      />

      {!stats ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">
          The database could not be reached, so these counts are unavailable.
          The public site is still serving the content bundled with the last
          deploy.
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Updates"
              value={stats.insights}
              href="/admin/insights"
              note={
                stats.drafts > 0
                  ? `${stats.drafts} not published`
                  : "all published"
              }
            />
            <Stat
              label="Practice areas"
              value={stats.practices}
              href="/admin/practices"
            />
            <Stat
              label="Enquiries"
              value={stats.contacts}
              href="/admin/contacts"
              note={stats.unread > 0 ? `${stats.unread} unread` : "all read"}
            />
            <Stat
              label="Legal updates"
              value={stats.byCategory["Legal Updates"] ?? 0}
              href="/admin/insights"
              note={`${stats.byCategory.Blog ?? 0} blog · ${stats.byCategory.News ?? 0} news`}
            />
          </div>

          <section className="mt-10">
            <h2 className="font-display text-xl tracking-tight text-brand-900">
              Latest enquiries
            </h2>
            {stats.recent.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-line bg-white p-6 text-sm text-muted">
                Nothing has come through the contact form yet.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
                {stats.recent.map((c) => (
                  <li key={c.id}>
                    <Link
                      href="/admin/contacts"
                      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-bone/60 sm:px-6"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          c.status === "new" ? "bg-copper-500" : "bg-line"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-brand-900">
                          {c.name}
                          <span className="font-normal text-muted">
                            {" "}
                            · {c.email}
                          </span>
                        </p>
                        <p className="truncate text-sm text-muted">
                          {c.message}
                        </p>
                      </div>
                      <span className="hidden shrink-0 text-xs text-muted sm:block">
                        {formatDate(c.createdAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </>
  );
}
