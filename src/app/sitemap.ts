import type { MetadataRoute } from "next";

import { team } from "@/lib/content";
import { getPublicInsights, getPublicPractices } from "@/lib/public-content";
import { sectors } from "@/lib/sectors";
import { SITE_URL } from "@/lib/seo";

/**
 * The sitemap, built from the same sources the pages are. Practices and
 * insights come through the public read layer, so anything added in the
 * dashboard appears here too rather than only the copy bundled in the repo.
 */
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [practices, insights] = await Promise.all([
    getPublicPractices(),
    getPublicInsights(),
  ]);

  const url = (path: string) => `${SITE_URL}${path}`;
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/about-us"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/team"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/practices"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/sectors"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/updates"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/updates/legal-updates"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/updates/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/updates/news"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/contact-us"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  return [
    ...fixed,
    ...team.map((member) => ({
      url: url(`/team/${member.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...practices.map((practice) => ({
      url: url(`/practices/${practice.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...sectors.map((sector) => ({
      url: url(`/sectors/${sector.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...insights.map((insight) => ({
      url: url(`/updates/${insight.slug}`),
      lastModified: new Date(insight.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
