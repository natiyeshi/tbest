import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ContactCTA } from "@/components/contact-cta";
import { InsightCard } from "@/components/insight-card";
import { PageHero } from "@/components/page-hero";
import { formatInsightDate, insightCategories } from "@/lib/insights";
import { insightArt } from "@/lib/practice-images";
import { getPublicInsights } from "@/lib/public-content";
import { pageMetadata } from "@/lib/seo";

// Served from the cache and refreshed on a schedule; an admin edit also
// revalidates this path straight away.
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Updates — TBeST Law LLP",
  description:
    "Legal updates, blog commentary and firm news from TBeST Law LLP on the regulatory developments affecting business in Ethiopia.",
  path: "/updates",
  image: "/og/updates.jpg",
});

const CATEGORY_HREF: Record<string, string> = {
  "Legal Updates": "/updates/legal-updates",
  Blog: "/updates/blog",
  News: "/updates/news",
};

const CATEGORY_LEAD: Record<string, string> = {
  "Legal Updates":
    "Concise notes on the regulatory changes shaping business in Ethiopia.",
  Blog: "Longer-form commentary and reflections from the firm's lawyers.",
  News: "Announcements, events and milestones from the firm.",
};

export default async function UpdatesPage() {
  const insights = await getPublicInsights();
  const [lead] = insights;

  return (
    <>
      <PageHero
        eyebrow="Updates"
        title="Legal updates, commentary and news."
        lead="We publish regular legal updates, longer-form commentary and firm news so clients stay ahead of Ethiopia's fast-moving regulatory landscape."
        crumbs={[{ label: "Home", href: "/" }, { label: "Updates" }]}
      />

      {/* Featured — most recent across every stream. Guarded, because the
          roster comes from the database and can legitimately be empty. */}
      {lead && (
        <section className="bg-white pt-16 lg:pt-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
            <Link
              href={`/updates/${lead.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-line bg-bone lg:grid-cols-2"
            >
              <div className="relative min-h-64 overflow-hidden">
                <Image
                  src={insightArt(lead)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent" />
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-full bg-copper-500/10 px-3 py-1 font-semibold text-copper-600">
                    {lead.topic}
                  </span>
                  <time dateTime={lead.date} className="text-muted">
                    {formatInsightDate(lead.date)}
                  </time>
                  <span className="text-muted/50">
                    Latest &middot; {lead.category}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl leading-tight tracking-tight text-brand-900 transition-colors group-hover:text-copper-600 sm:text-3xl">
                  {lead.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  {lead.summary}
                </p>
                {lead.authors.length > 0 && (
                  <p className="mt-6 text-sm text-brand-800">
                    By {lead.authors.join(" and ")}
                  </p>
                )}
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* One section per stream, each linking through to its own page */}
      {insightCategories.map((category) => {
        const items = insights
          .filter((insight) => insight.category === category)
          .slice(0, 3);
        if (items.length === 0) return null;
        return (
          <section key={category} className="bg-white pt-14 lg:pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div
                className="flex items-end justify-between gap-6 border-b border-line pb-5"
                data-reveal
              >
                <div>
                  <h2 className="font-display text-2xl tracking-tight text-brand-900 sm:text-3xl">
                    {category}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {CATEGORY_LEAD[category]}
                  </p>
                </div>
                <Link
                  href={CATEGORY_HREF[category]}
                  className="shrink-0 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
                >
                  View all &rarr;
                </Link>
              </div>
              <ul
                className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                data-reveal
              >
                {items.map((insight) => (
                  <li key={insight.slug} className="h-full">
                    <InsightCard insight={insight} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <div className="pb-16 lg:pb-20" />

      <ContactCTA
        heading="Have a question about a recent change?"
        body="If a regulatory development affects your business, tell us about it and we will help you navigate what it means in practice."
      />
    </>
  );
}
