import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactCTA } from "@/components/contact-cta";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { formatInsightDate, type InsightCategory } from "@/lib/insights";
import { insightArt } from "@/lib/practice-images";
import { pageMetadata } from "@/lib/seo";
import { ogImage } from "@/lib/og-image";
import {
  getOtherInsights,
  getPublicInsight,
  getPublicInsights,
} from "@/lib/public-content";

const CATEGORY_HREF: Record<InsightCategory, string> = {
  "Legal Updates": "/updates/legal-updates",
  Blog: "/updates/blog",
  News: "/updates/news",
};

// Built ahead of time for everything published at deploy; anything added
// afterwards is rendered on its first request and then cached.
export async function generateStaticParams() {
  const insights = await getPublicInsights();
  return insights.map((insight) => ({ slug: insight.slug }));
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await getPublicInsight(slug);
  if (!found) return {};
  const { insight } = found;

  return pageMetadata({
    title: `${insight.title} — TBeST Law LLP`,
    description: insight.summary,
    path: `/updates/${insight.slug}`,
    image: ogImage(`/og/updates/${insight.slug}.jpg`, "/og/updates.jpg"),
    type: "article",
    publishedTime: insight.date,
    authors: insight.authors,
  });
}

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = await getPublicInsight(slug);
  if (!found) notFound();

  const { insight, body } = found;
  const more = await getOtherInsights(slug);

  return (
    <>
      <JsonLd data={articleJsonLd(insight)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Updates", path: "/updates" },
          { name: insight.title, path: `/updates/${insight.slug}` },
        ])}
      />
      {/* Article header, over the topic image */}
      <header
        data-nav-tone="dark"
        className="relative isolate overflow-hidden bg-brand-900 pt-32 pb-16 lg:pt-40 lg:pb-20"
      >
        <Image
          src={insightArt(insight)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/80 to-brand-950/60" />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-10" data-reveal>
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-brand-100/55">
              <li>
                <Link href="/" className="transition-colors hover:text-copper-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-brand-100/30">
                /
              </li>
              <li>
                <Link
                  href="/updates"
                  className="transition-colors hover:text-copper-300"
                >
                  Updates
                </Link>
              </li>
              <li aria-hidden="true" className="text-brand-100/30">
                /
              </li>
              <li>
                <Link
                  href={CATEGORY_HREF[insight.category]}
                  className="text-brand-100/80 transition-colors hover:text-copper-300"
                >
                  {insight.category}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-copper-500/20 px-3 py-1 font-semibold text-copper-200">
              {insight.topic}
            </span>
            <time dateTime={insight.date} className="text-brand-100/70">
              {formatInsightDate(insight.date)}
            </time>
          </div>

          <h1 className="mt-6 font-display text-3xl leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {insight.title}
          </h1>

          {insight.authors.length > 0 && (
            <p className="mt-6 text-sm text-brand-100/75">
              By {insight.authors.join(" and ")}
            </p>
          )}
        </div>
      </header>

      {/* Body */}
      <article className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p
            className="font-display text-xl leading-relaxed text-brand-900 sm:text-2xl"
            data-reveal
          >
            {insight.summary}
          </p>

          {body.length > 0 && (
            <div
              className="mt-10 space-y-6 border-t border-line pt-10"
              data-reveal
            >
              {body.map((block, i) => {
                if (block.kind === "heading") {
                  return (
                    <h2
                      key={i}
                      className="pt-2 font-display text-xl tracking-tight text-brand-900 sm:text-2xl"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.kind === "list") {
                  return (
                    <ul
                      key={i}
                      className="ml-1 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-brand-800 marker:text-copper-500"
                    >
                      {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.kind === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-2 border-copper-400 pl-5 font-display text-lg italic leading-relaxed text-brand-900"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-[1.0625rem] leading-relaxed text-brand-800"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          )}

          <div className="mt-12 border-t border-line pt-8">
            <Link
              href={CATEGORY_HREF[insight.category]}
              className="inline-flex items-center gap-2 text-sm font-semibold text-copper-600 transition-colors hover:text-copper-700"
            >
              <span aria-hidden="true">&larr;</span>
              All {insight.category.toLowerCase()}
            </Link>
          </div>
        </div>
      </article>

      {/* More updates */}
      {more.length > 0 && (
        <section className="border-t border-line bg-bone py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2
              className="font-display text-2xl tracking-tight text-brand-900 sm:text-3xl"
              data-reveal
            >
              More updates
            </h2>
            <ul
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3"
              data-reveal
            >
              {more.map((item) => (
                <li key={item.slug} className="h-full">
                  <Link
                    href={`/updates/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-900/[0.06]"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={insightArt(item)}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 22rem, 90vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/45 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <time dateTime={item.date} className="text-xs text-muted">
                        {formatInsightDate(item.date)}
                      </time>
                      <h3 className="mt-2 font-display text-base leading-snug text-brand-900 transition-colors group-hover:text-copper-600">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactCTA
        heading="Have a question about a recent change?"
        body="If a regulatory development affects your business, tell us about it and we will help you navigate what it means in practice."
      />
    </>
  );
}
