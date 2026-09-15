import { firm } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

/**
 * Structured data, as a script tag.
 *
 * Search engines read this to understand what a page *is* — a law firm, a
 * lawyer, an article — rather than inferring it from the prose. It is what
 * produces the rich result: the firm's address and phone number in a knowledge
 * panel, an author and date on an article, the breadcrumb trail under a
 * heading.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built here from the firm's own content, never from
      // anything a visitor supplied, and JSON.stringify escapes the rest.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const office = firm.offices[0];

/** The firm itself. Repeated as `publisher`/`provider` on the deeper pages. */
export const organizationSchema = {
  "@type": "LegalService",
  "@id": `${SITE_URL}/#organization`,
  name: firm.name,
  url: SITE_URL,
  description: firm.tagline,
  email: firm.email,
  telephone: firm.phones.office,
  image: `${SITE_URL}/og/default.jpg`,
  logo: `${SITE_URL}/icons/mark.svg`,
  areaServed: { "@type": "Country", name: "Ethiopia" },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${office.line1}, ${office.street}`,
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  sameAs: firm.social.map((s) => s.href),
};

export function organizationJsonLd() {
  return { "@context": "https://schema.org", ...organizationSchema };
}

/** A lawyer. `worksFor` ties them back to the firm. */
export function personJsonLd(member: {
  slug: string;
  name: string;
  role: string;
  bio: string;
  strapline: string;
  focus: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/team/${member.slug}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio || member.strapline,
    url: `${SITE_URL}/team/${member.slug}`,
    image: `${SITE_URL}/og/team/${member.slug}.jpg`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: [...member.focus],
  };
}

/** An insight — legal update, blog post or news item. */
export function articleJsonLd(insight: {
  slug: string;
  title: string;
  summary: string;
  date: string;
  authors: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/updates/${insight.slug}#article`,
    headline: insight.title,
    description: insight.summary,
    datePublished: insight.date,
    dateModified: insight.date,
    url: `${SITE_URL}/updates/${insight.slug}`,
    image: `${SITE_URL}/og/updates/${insight.slug}.jpg`,
    author: insight.authors.map((name) => ({ "@type": "Person", name })),
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/updates/${insight.slug}`,
  };
}

/** The trail shown under a result. Mirrors the on-page breadcrumb. */
export function breadcrumbJsonLd(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
