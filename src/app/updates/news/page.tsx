import type { Metadata } from "next";

import { UpdatesListing } from "@/components/updates-listing";

export const metadata: Metadata = {
  title: "News — TBeST Law LLP",
  description:
    "Announcements, events and milestones from TBeST Law LLP.",
};

export default function NewsPage() {
  return <UpdatesListing category="News" />;
}
