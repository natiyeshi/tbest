import type { Metadata } from "next";

import { ContactCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { getSectorIcon } from "@/components/sector-icons";
import { ServiceGrid } from "@/components/service-links";
import { sectors } from "@/lib/sectors";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sectors — TBeST Law LLP",
  description:
    "Sector knowledge across financial services, private equity, mining and energy, NGOs, real estate, aviation, hospitality, telecom and media in Ethiopia.",
  path: "/sectors",
  image: "/og/sectors.jpg",
});

const sectorCards = sectors.map((sector) => ({
  slug: sector.slug,
  name: sector.name,
  blurb: sector.blurb,
  icon: getSectorIcon(sector.slug),
}));

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Where we work."
        lead="Sector knowledge shapes the advice. These are the industries our partners return to most often."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sectors" }]}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ServiceGrid items={sectorCards} base="/sectors" />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
