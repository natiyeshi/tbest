import type { Metadata } from "next";

import { firm } from "./content";

/**
 * The canonical origin. Also in the root layout as `metadataBase`, which is
 * what turns the relative paths below into the absolute URLs that crawlers and
 * social networks require.
 */
export const SITE_URL = "https://tbestlaw.com";

/** Where `npm run og:build` writes the share cards. */
export const OG_DEFAULT = "/og/default.jpg";

type PageMeta = {
  title: string;
  description: string;
  /** Path on the site, leading slash, no origin — becomes the canonical URL. */
  path: string;
  /** Share card for this page. Falls back to the firm-wide one. */
  image?: string;
  /** "article" for an insight, "profile" for a person, else a page. */
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  authors?: readonly string[];
  /**
   * A silent clip to offer alongside the image. Only some networks read
   * `og:video`, and none of them accept WebM — see the note in the README —
   * so this is additive and the image always carries the preview.
   */
  video?: { url: string; type: string; width?: number; height?: number };
};

/**
 * One page's metadata: title, description, canonical URL, Open Graph and the
 * Twitter card. Every public page goes through here so none of them can
 * quietly ship without a share image, which is the failure that sends a link
 * into Slack or LinkedIn as a grey rectangle.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = OG_DEFAULT,
  type = "website",
  publishedTime,
  authors,
  video,
}: PageMeta): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: title, type: "image/jpeg" }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: firm.name,
      locale: "en_US",
      type: type === "profile" ? "profile" : type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors && authors.length > 0 ? { authors: [...authors] } : {}),
      ...(video
        ? { videos: [{ ...video, url: `${SITE_URL}${video.url}` }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
