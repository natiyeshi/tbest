import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/service-detail";
import { practiceArt } from "@/lib/practice-images";
import { getPublicPractices } from "@/lib/public-content";
import { pageMetadata } from "@/lib/seo";
import { ogImage } from "@/lib/og-image";

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

  return (
    <ServiceDetail
      kind="Practice Area"
      name={practice.name}
      intro={practice.intro}
      servicesLead={practice.servicesLead}
      services={practice.services}
      statute={practice.statute}
      image={practiceArt(practice)}
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
