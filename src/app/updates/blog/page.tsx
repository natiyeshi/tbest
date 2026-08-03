import type { Metadata } from "next";

import { UpdatesListing } from "@/components/updates-listing";

export const metadata: Metadata = {
  title: "Blog — TBeST Law LLP",
  description:
    "Longer-form commentary and reflections from the lawyers of TBeST Law LLP on corporate, tax and commercial law in Ethiopia.",
};

export default function BlogPage() {
  return <UpdatesListing category="Blog" />;
}
