import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/service-detail";
import { fallbackImage } from "@/lib/practice-images";
import { sectorBySlug, sectors } from "@/lib/sectors";

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

  return {
    title: `${sector.name} — TBeST Law LLP`,
    description: sector.blurb,
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) notFound();

  return (
    <ServiceDetail
      kind="Sector"
      name={sector.name}
      intro={sector.intro}
      servicesLead={sector.servicesLead}
      services={sector.services}
      image={fallbackImage}
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
