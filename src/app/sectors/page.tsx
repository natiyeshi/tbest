import type { Metadata } from "next";

import { ContactCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { ServiceGrid } from "@/components/service-links";
import { sectors } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Sectors — TBeST Law LLP",
  description:
    "Sector knowledge across financial services, private equity, mining and energy, NGOs, real estate, aviation, hospitality, telecom and media in Ethiopia.",
};

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
          <ServiceGrid items={sectors} base="/sectors" />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
