import type { Metadata } from "next";

import { ContactCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { ServiceGrid } from "@/components/service-links";
import { practiceArt } from "@/lib/practice-images";
import { getPublicPractices } from "@/lib/public-content";
import { pageMetadata } from "@/lib/seo";

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
  const practiceCards = practices.map((practice) => ({
    slug: practice.slug,
    name: practice.name,
    blurb: practice.blurb,
    image: practiceArt(practice),
  }));

  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="Various practice areas, advised end to end."
        lead="Quality legal advice and transactional services, delivered by lawyers who work across these areas rather than in isolation from one another."
        crumbs={[{ label: "Home", href: "/" }, { label: "Practice Areas" }]}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ServiceGrid items={practiceCards} base="/practices" />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
