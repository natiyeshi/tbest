import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/service-detail";
import { contactsForSector } from "@/lib/practice-team";
import { sectorBySlug, sectors } from "@/lib/sectors";
import { pageMetadata } from "@/lib/seo";
import { ogImage } from "@/lib/og-image";

import corporateNew from "../../../../../public/hero/corporate-new.jpg";

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) return {};

  return pageMetadata({
    title: `${sector.name} — TBeST Law LLP`,
    description: sector.blurb,
    path: `/sectors/${sector.slug}`,
    image: ogImage(`/og/sectors/${sector.slug}.jpg`, "/og/sectors.jpg"),
  });
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) notFound();

  // No sector has photography of its own, so every sector page opens on the
  // landing hero's first photograph; the ghost numeral still tells each page
  // apart from the last.
  const sectorIndex = sectors.findIndex((item) => item.slug === sector.slug);

  return (
    <ServiceDetail
      kind="Sector"
      name={sector.name}
      intro={sector.intro}
      servicesLead={sector.servicesLead}
      services={sector.services}
      contacts={contactsForSector(sector.slug)}
      image={corporateNew}
      index={sectorIndex + 1}
      count={sectors.length}
      crumbLabel="Sectors"
      crumbHref="/sectors"
      related={{
        title: "Other sectors",
        items: sectors,
        base: "/sectors",
        currentSlug: sector.slug,
        seeAllHref: "/sectors",
        slug: sector.slug,
      }}
    />
  );
}
