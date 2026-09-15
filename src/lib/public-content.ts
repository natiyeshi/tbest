import "server-only";
import type { Document, WithId } from "mongodb";

import { collections } from "@/lib/admin/data";
import {
  getInsightBody,
  insights as bundledInsights,
  parseInsightBody,
  type Insight,
  type InsightBlock,
  type InsightCategory,
} from "@/lib/insights";
import {
  practices as bundledPractices,
  type Practice,
  type PracticeLink,
} from "@/lib/practices";

/**
 * The public, read-only data layer. Pages call these from Server Components and
 * pair them with a page-level `revalidate`, so the site is served at close to
 * static speed while still reflecting what the admin last saved.
 *
 * Every read falls back to the content bundled in `insights.ts` / `practices.ts`
 * when the database is empty or unreachable. That matters twice: at `next build`
 * on a machine with no MONGODB_URI, and in production if the database goes away
 * — the site keeps serving the last shipped copy rather than an empty page.
 */

/** A bundled record carries no image override; a database one may. */
export type PublicInsight = Insight & { image: string };
export type PublicPractice = Practice & { image: string };

function plain(doc: WithId<Document>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key in doc) {
    if (key !== "_id") out[key] = (doc as Record<string, unknown>)[key];
  }
  return out;
}

const str = (v: unknown) => (typeof v === "string" ? v : "");
const strList = (v: unknown) =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

/** Only a full URL or a root-relative path; anything else means "no image". */
function safeImage(v: unknown): string {
  const s = str(v).trim();
  return /^https?:\/\/\S+$/i.test(s) || s.startsWith("/") ? s : "";
}

function isCategory(v: unknown): v is InsightCategory {
  return v === "Legal Updates" || v === "Blog" || v === "News";
}

/* --------------------------------- insights -------------------------------- */

const bundledAsPublic: PublicInsight[] = bundledInsights.map((i) => ({
  ...i,
  image: "",
}));

function toPublicInsight(doc: WithId<Document>): PublicInsight | null {
  const d = plain(doc);
  if (!isCategory(d.category) || !str(d.slug)) return null;
  return {
    slug: str(d.slug),
    title: str(d.title),
    date: str(d.date),
    authors: strList(d.authors),
    summary: str(d.summary),
    topic: str(d.topic),
    category: d.category,
    image: safeImage(d.image),
  };
}

/**
 * Everything published, most recent first. Drafts (`published: false`) are left
 * out; rows written before that field existed count as published.
 */
export async function getPublicInsights(): Promise<PublicInsight[]> {
  try {
    const docs = await collections
      .insights()
      .find({ published: { $ne: false } })
      .sort({ date: -1, createdAt: -1 })
      .toArray();
    if (docs.length === 0) return bundledAsPublic;
    return docs
      .map(toPublicInsight)
      .filter((i): i is PublicInsight => i !== null);
  } catch (e) {
    console.error("[public-content] insights read failed, using bundled copy", e);
    return bundledAsPublic;
  }
}

export async function getPublicInsightsByCategory(
  category: InsightCategory,
): Promise<PublicInsight[]> {
  const all = await getPublicInsights();
  return all.filter((i) => i.category === category);
}

/**
 * One article with its body. Looks in the database first and falls back to the
 * bundled copy, so a slug that predates the migration still resolves.
 */
export async function getPublicInsight(
  slug: string,
): Promise<{ insight: PublicInsight; body: InsightBlock[] } | null> {
  try {
    const doc = await collections
      .insights()
      .findOne({ slug, published: { $ne: false } });
    if (doc) {
      const insight = toPublicInsight(doc);
      if (insight) {
        const body = parseInsightBody(str(plain(doc).body).split("\n"));
        return { insight, body };
      }
    }
  } catch (e) {
    console.error("[public-content] insight read failed, using bundled copy", e);
  }

  const bundled = bundledAsPublic.find((i) => i.slug === slug);
  return bundled ? { insight: bundled, body: getInsightBody(slug) } : null;
}

/** Other articles, most recent first, for the "more updates" rail. */
export async function getOtherInsights(
  slug: string,
  limit = 3,
): Promise<PublicInsight[]> {
  const all = await getPublicInsights();
  return all.filter((i) => i.slug !== slug).slice(0, limit);
}

/* -------------------------------- practices -------------------------------- */

const bundledPracticesAsPublic: PublicPractice[] = bundledPractices.map((p) => ({
  ...p,
  image: "",
}));

function toPublicPractice(doc: WithId<Document>): PublicPractice | null {
  const d = plain(doc);
  if (!str(d.slug)) return null;
  return {
    slug: str(d.slug),
    name: str(d.name),
    blurb: str(d.blurb),
    statute: str(d.statute),
    intro: strList(d.intro),
    servicesLead: str(d.servicesLead),
    services: strList(d.services),
    image: safeImage(d.image),
  };
}

export async function getPublicPractices(): Promise<PublicPractice[]> {
  try {
    const docs = await collections
      .practices()
      .find()
      .sort({ order: 1, createdAt: 1 })
      .toArray();
    if (docs.length === 0) return bundledPracticesAsPublic;
    return docs
      .map(toPublicPractice)
      .filter((p): p is PublicPractice => p !== null);
  } catch (e) {
    console.error("[public-content] practices read failed, using bundled copy", e);
    return bundledPracticesAsPublic;
  }
}

export async function getPublicPractice(
  slug: string,
): Promise<PublicPractice | null> {
  const all = await getPublicPractices();
  return all.find((p) => p.slug === slug) ?? null;
}

/**
 * The compact list the navigation, the footer and the home page take. Client
 * components cannot read the database themselves, so their nearest server
 * parent fetches this and passes it down — which is what stops a practice
 * deleted in the dashboard from leaving a dead link behind in the menu.
 */
export async function getPracticeLinks(): Promise<PracticeLink[]> {
  const practices = await getPublicPractices();
  return practices.map((p) => ({
    slug: p.slug,
    name: p.name,
    blurb: p.blurb,
    image: p.image,
  }));
}
