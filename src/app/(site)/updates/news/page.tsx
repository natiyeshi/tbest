import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import { UpdatesListing } from "@/components/updates-listing";

// Served from the cache and refreshed on a schedule; an admin edit also
// revalidates this path straight away.
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "News — TBeST Law LLP",
  description:
    "Announcements, events and milestones from TBeST Law LLP.",
  path: "/updates/news",
  image: "/og/updates.jpg",
});

export default function NewsPage() {
  return <UpdatesListing category="News" />;
}
