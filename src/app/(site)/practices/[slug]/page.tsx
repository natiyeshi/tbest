import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/service-detail";
import { practiceArt } from "@/lib/practice-images";
import { contactsForPractice } from "@/lib/practice-team";
import { getPublicPractices } from "@/lib/public-content";
import { pageMetadata } from "@/lib/seo";
import { ogImage } from "@/lib/og-image";

import addisSkyline from "../../../../../public/hero/addis-skyline.jpg";
import addisTowerStreet from "../../../../../public/hero/addis-tower-street.jpg";

// Built ahead of time for every practice that exists at deploy; one added
// afterwards renders on its first request and is then cached.
export async function generateStaticParams() {
  const practices = await getPublicPractices();
  return practices.map((practice) => ({ slug: practice.slug }));
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practices = await getPublicPractices();
  const practice = practices.find((p) => p.slug === slug);
  if (!practice) return {};

  return pageMetadata({
    title: `${practice.name} — TBeST Law LLP`,
    description: practice.blurb,
    path: `/practices/${practice.slug}`,
    image: ogImage(`/og/practices/${practice.slug}.jpg`, "/og/practices.jpg"),
  });
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practices = await getPublicPractices();
  const practice = practices.find((p) => p.slug === slug);
  if (!practice) notFound();

  const practiceCards = practices.map((item) => ({
    slug: item.slug,
    name: item.name,
    blurb: item.blurb,
    image: practiceArt(item),
  }));

  // Corporate keeps its own photograph (the Commercial Bank tower, swapped in
  // at the firm's request). Every other practice has no dedicated photography
  // of its own, so the masthead alternates between the two real Addis photos
  // the firm does have, rather than repeating one of them across all nine —
  // the ghost numeral alongside still tells each page apart from its
  // neighbours even where the backdrop is shared.
  const practiceIndex = practices.findIndex((item) => item.slug === practice.slug);
  const heroImage =
    practice.slug === "corporate"
      ? addisTowerStreet
      : practiceIndex % 2 === 0
        ? addisSkyline
        : addisTowerStreet;

  return (
    <ServiceDetail
      kind="Practice Area"
      name={practice.name}
      intro={practice.intro}
      servicesLead={practice.servicesLead}
      services={practice.services}
      contacts={contactsForPractice(practice.slug)}
      image={heroImage}
      index={practiceIndex + 1}
      count={practices.length}
      crumbLabel="Practice Areas"
      crumbHref="/practices"
      related={{
        title: "Other practice areas",
        items: practiceCards,
        base: "/practices",
        currentSlug: practice.slug,
        seeAllHref: "/practices",
        slug: practice.slug,
      }}
    />
  );
}
