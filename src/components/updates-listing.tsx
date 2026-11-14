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

const TITLE: Record<InsightCategory, string> = {
  "Legal Updates": "Legal updates.",
  Blog: "From the blog.",
  News: "Firm news.",
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

  return (
    <>
      <PageHero
        eyebrow="Updates"
        title={TITLE[category]}
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
