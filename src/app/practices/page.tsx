import type { Metadata } from "next";

import { ContactCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { ServiceGrid } from "@/components/service-links";
import { practices } from "@/lib/practices";
import { getPracticeImage } from "@/lib/practice-images";

const practiceCards = practices.map((practice) => ({
  slug: practice.slug,
  name: practice.name,
  blurb: practice.blurb,
  image: getPracticeImage(practice.slug),
}));

export const metadata: Metadata = {
  title: "Practice Areas — TBeST Law LLP",
  description:
    "Corporate and commercial practice areas, from investment and M&A to tax, competition and dispute resolution, advised end to end by TBeST Law LLP.",
};

export default function PracticesPage() {
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
