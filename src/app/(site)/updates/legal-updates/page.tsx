import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import { UpdatesListing } from "@/components/updates-listing";

// Served from the cache and refreshed on a schedule; an admin edit also
// revalidates this path straight away.
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Legal Updates — TBeST Law LLP",
  description:
    "Legal updates from TBeST Law LLP on regulatory developments affecting business in Ethiopia — investment, tax, banking, data protection and more.",
  path: "/updates/legal-updates",
  image: "/og/updates.jpg",
});

export default function LegalUpdatesPage() {
  return <UpdatesListing category="Legal Updates" />;
}
