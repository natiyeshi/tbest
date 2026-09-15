import type { Metadata } from "next";

import { ContactCTA } from "@/components/contact-cta";
import { Firm } from "@/components/sections/firm";
import { Hero } from "@/components/sections/hero";
import { People } from "@/components/sections/people";
import { Practices } from "@/components/sections/practices";
import { Recognition } from "@/components/sections/recognition";
import { Sectors } from "@/components/sections/sectors";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd, organizationJsonLd } from "@/components/json-ld";
import { getPracticeLinks } from "@/lib/public-content";
import { pageMetadata } from "@/lib/seo";

// The landing page is served from the cache and refreshed on a schedule; a
// practice edit in the dashboard also revalidates it straight away.
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "TBeST Law LLP — Corporate and Commercial Counsel in Addis Ababa",
  description:
    "TBeST Law LLP is a full service law firm in Addis Ababa, Ethiopia, providing corporate and commercial legal services across various practice areas and industry sectors.",
  path: "/",
  image: "/og/default.jpg",
});

export default async function Home() {
  const practices = await getPracticeLinks();

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero practices={practices} />
      <Firm />
      <Practices practices={practices} />
      <Sectors />
      <People />
      <Recognition />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
