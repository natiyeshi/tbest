import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/service-detail";
import { practiceBySlug, practices } from "@/lib/practices";
import { getPracticeImage } from "@/lib/practice-images";

const practiceCards = practices.map((practice) => ({
  slug: practice.slug,
  name: practice.name,
  blurb: practice.blurb,
  image: getPracticeImage(practice.slug),
}));

export function generateStaticParams() {
  return practices.map((practice) => ({ slug: practice.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practice = practiceBySlug(slug);
  if (!practice) return {};

  return {
    title: `${practice.name} — TBeST Law LLP`,
    description: practice.blurb,
  };
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practice = practiceBySlug(slug);
  if (!practice) notFound();

  return (
    <ServiceDetail
      kind="Practice Area"
      name={practice.name}
      intro={practice.intro}
      servicesLead={practice.servicesLead}
      services={practice.services}
      statute={practice.statute}
      image={getPracticeImage(practice.slug)}
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
