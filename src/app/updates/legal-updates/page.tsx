import type { Metadata } from "next";

import { UpdatesListing } from "@/components/updates-listing";

export const metadata: Metadata = {
  title: "Legal Updates — TBeST Law LLP",
  description:
    "Legal updates from TBeST Law LLP on regulatory developments affecting business in Ethiopia — investment, tax, banking, data protection and more.",
};

export default function LegalUpdatesPage() {
  return <UpdatesListing category="Legal Updates" />;
}
