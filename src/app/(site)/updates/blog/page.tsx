import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import { UpdatesListing } from "@/components/updates-listing";

// Served from the cache and refreshed on a schedule; an admin edit also
// revalidates this path straight away.
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Blog — TBeST Law LLP",
  description:
    "Longer-form commentary and reflections from the lawyers of TBeST Law LLP on corporate, tax and commercial law in Ethiopia.",
  path: "/updates/blog",
  image: "/og/updates.jpg",
});

export default function BlogPage() {
  return <UpdatesListing category="Blog" />;
}
