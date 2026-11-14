import type { Metadata } from "next";

import { ClosingCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { ServiceGrid } from "@/components/service-links";
import { practiceColor } from "@/components/pattern-panel";
import { getPublicPractices } from "@/lib/public-content";
import { pageMetadata } from "@/lib/seo";

import addisSkyline from "../../../../public/hero/addis-skyline.jpg";

// Served from the cache and refreshed on a schedule; an admin edit also
// revalidates this path straight away.
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Practice Areas — TBeST Law LLP",
  description:
    "Corporate and commercial practice areas, from investment and M&A to tax, competition and dispute resolution, advised end to end by TBeST Law LLP.",
  path: "/practices",
  image: "/og/practices.jpg",
});

export default async function PracticesPage() {
  const practices = await getPublicPractices();
  const practiceCards = practices.map((practice, index) => ({
    slug: practice.slug,
    name: practice.name,
    blurb: practice.blurb,
    panel: practiceColor(index),
  }));

  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="Various practice areas, advised end to end."
        lead="Comprehensive Legal Expertise. Tailored Solutions."
        crumbs={[{ label: "Home", href: "/" }, { label: "Practice Areas" }]}
        image={addisSkyline}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ServiceGrid items={practiceCards} base="/practices" />
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
