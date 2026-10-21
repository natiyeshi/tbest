import { ClosingCTA } from "@/components/contact-cta";
import { InsightCard } from "@/components/insight-card";
import { PageHero } from "@/components/page-hero";
import type { InsightCategory } from "@/lib/insights";
import { getPublicInsightsByCategory } from "@/lib/public-content";

import addisSkyline from "../../public/hero/addis-skyline.jpg";
import addisTowerStreet from "../../public/hero/addis-tower-street.jpg";

// Alternates between the firm's two real photographs rather than repeating
// one across all three streams, the same two-photo system used elsewhere on
// the site until there's dedicated photography to give each stream its own.
const HERO_IMAGE: Record<InsightCategory, typeof addisSkyline> = {
  "Legal Updates": addisTowerStreet,
  Blog: addisSkyline,
  News: addisTowerStreet,
};

const COPY: Record<InsightCategory, { title: string; lead: string }> = {
  "Legal Updates": {
    title: "Legal updates.",
    lead: "Concise notes on the regulatory developments shaping business in Ethiopia — investment, tax, banking, data protection and more.",
  },
  Blog: {
    title: "From the blog.",
    lead: "Longer-form commentary and reflections from the firm's lawyers on the questions behind the headlines.",
  },
  News: {
    title: "Firm news.",
    lead: "Announcements, events and milestones from TBeST Law.",
  },
};

/**
 * Shared listing for each Updates stream: hero, then a grid of every article in
 * the category, most recent first.
 */
export async function UpdatesListing({
  category,
}: {
  category: InsightCategory;
}) {
  const items = await getPublicInsightsByCategory(category);
  const copy = COPY[category];

  return (
    <>
      <PageHero
        eyebrow="Updates"
        title={copy.title}
        lead={copy.lead}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Updates", href: "/updates" },
          { label: category },
        ]}
        image={HERO_IMAGE[category]}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {items.length > 0 ? (
            <ul
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              data-reveal
            >
              {items.map((insight) => (
                <li key={insight.slug} className="h-full">
                  <InsightCard insight={insight} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted" data-reveal>
              Nothing here just yet — check back soon.
            </p>
          )}
        </div>
      </section>

      <ClosingCTA text="If a regulatory development affects your business, tell us about it and we will help you navigate what it means in practice." />
    </>
  );
}
