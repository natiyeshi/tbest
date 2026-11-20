import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BrandArrow } from "@/components/brand";
import { ClosingCTA } from "@/components/contact-cta";
import { JsonLd, breadcrumbJsonLd, personJsonLd } from "@/components/json-ld";
import {
  firm,
  team,
  teamMemberBySlug,
  teamMemberExperience,
} from "@/lib/content";
import { partnerRecognitionBySlug } from "@/lib/recognition";
import { pageMetadata } from "@/lib/seo";
import { ogImage } from "@/lib/og-image";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMemberBySlug(slug);
  if (!member) return {};

  return pageMetadata({
    title: `${member.name}, ${member.role} — TBeST Law LLP`,
    description: member.strapline,
    path: `/team/${member.slug}`,
    image: ogImage(`/og/team/${member.slug}.jpg`, "/og/team.jpg"),
    type: "profile",
  });
}

/**
 * Section heading for the left-hand column. One level, one size, used for every
 * section on the page, so the reader can tell a section apart from a lead
 * paragraph at a glance.
 */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl leading-tight tracking-tight text-navy-800 sm:text-[1.75rem]">
      {children}
    </h2>
  );
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = teamMemberBySlug(slug);
  if (!member) notFound();

  const recognition = partnerRecognitionBySlug(member.slug);
  const legacyExperience = teamMemberExperience(member.slug);
  const others = team.filter((m) => m.slug !== member.slug);

  return (
    <>
      <JsonLd data={personJsonLd(member)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
          { name: member.name, path: `/team/${member.slug}` },
        ])}
      />
      {/* One section, not two. The portrait sits at the very top of its
          column and stays put while the reader works down the biography
          beside it. The firm asked for the short clips to come out, and for
          this page to show the person's second frame — the one the Team page
          card doesn't — so a click through to a profile shows something new. */}
      <section
        data-nav-tone="light"
        className="bg-white pt-28 pb-16 lg:pb-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-copper-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-navy-800/25">
                /
              </li>
              <li>
                <Link href="/team" className="transition-colors hover:text-copper-500">
                  Team
                </Link>
              </li>
              <li aria-hidden="true" className="text-navy-800/25">
                /
              </li>
              <li className="text-navy-800">{member.name}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            {/* Portrait column — first on a narrow screen so the clip is the
                first thing on the page; pinned to the right from lg. */}
            {/* Pinned only while it fits on screen: with the recognition
                panel under it the column runs taller than the viewport, and a
                sticky column that tall hides its own foot until the page ends. */}
            <aside
              className={`lg:order-2 lg:col-span-5 lg:self-start ${
                recognition ? "" : "lg:sticky lg:top-28"
              }`}
            >
              <div className="mx-auto w-full max-w-[420px] lg:max-w-none">
                {/* From lg the frame is sized against the viewport rather
                    than by ratio, so the portrait lands whole on screen without
                    a scroll — it shrinks on a short laptop and stops growing on
                    a tall monitor. Narrow screens keep the ratio; they scroll
                    anyway. */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-line bg-navy-900 lg:aspect-auto lg:h-[calc(100svh-12rem)] lg:max-h-[34rem] lg:min-h-[22rem]">
                  <Image
                    src={member.cardAlt ?? member.photo}
                    alt={`${member.name}, ${member.role} at TBeST Law LLP`}
                    fill
                    priority
                    placeholder="blur"
                    quality={90}
                    sizes="(min-width: 1024px) 32rem, (min-width: 640px) 26rem, 90vw"
                    className="object-cover object-top"
                  />
                </div>

                {recognition && (
                  <div className="mt-8">
                    <h2 className="eyebrow text-copper-500">Recognition</h2>

                    {recognition.iflr && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-navy-800 px-4 py-1.5 text-xs font-semibold text-white">
                          IFLR1000 · {recognition.iflr.rating}
                        </span>
                        <span className="rounded-full border border-line px-4 py-1.5 text-xs text-navy-700">
                          {recognition.iflr.area}
                        </span>
                      </div>
                    )}

                    {recognition.chambers && (
                      <>
                        <p className="mt-4 text-sm leading-relaxed text-muted">
                          {recognition.chambers.summary}
                        </p>

                        {recognition.chambers.testimonials.length > 0 && (
                          <div className="mt-6">
                            <h3 className="eyebrow text-copper-500">
                              Chambers &amp; Partners — client testimonials
                            </h3>
                            <ul className="mt-3 space-y-3">
                              {recognition.chambers.testimonials.map((quote) => (
                                <li
                                  key={quote}
                                  className="rounded-2xl border border-line bg-bone p-5 font-display text-base leading-snug text-navy-800"
                                >
                                  &ldquo;{quote}&rdquo;
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {member.focus.length > 0 && (
                  <div className="mt-6">
                    <h2 className="eyebrow text-copper-500">Focus</h2>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {member.focus.map((area) => (
                        <li
                          key={area}
                          className="rounded-full border border-line bg-bone px-3.5 py-1.5 text-xs text-navy-700"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/contact-us"
                  className="group mt-6 inline-flex items-center gap-2.5 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
                >
                  Work with {member.name.split(" ")[0]}
                  <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </aside>

            {/* Written column — identity first, then the substance. */}
            <div className="lg:order-1 lg:col-span-7">
              <p className="eyebrow flex items-center gap-3 text-copper-500">
                <span className="h-px w-8 bg-copper-400" />
                {member.role}
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.06] tracking-tight text-navy-800 sm:text-5xl">
                {member.name}
              </h1>

              <div className="mt-12">
                <SectionHeading>Biography</SectionHeading>
              </div>
              {/* A blank line in the bio starts a new paragraph. */}
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-[1.0625rem]">
                {(
                  member.bio ||
                  `${member.name} is part of the team at TBeST Law LLP, working alongside our partners across the firm's corporate and commercial practice.`
                )
                  .split("\n\n")
                  .map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
              </div>

              {member.credentials.length > 0 && (
                <div className="mt-14">
                  <SectionHeading>Credentials</SectionHeading>
                  <ul className="mt-6 space-y-4 border-l border-line pl-6">
                    {member.credentials.map((item) => (
                      <li
                        key={item}
                        className="text-[0.9375rem] leading-relaxed text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {member.languages && member.languages.length > 0 && (
                <div className="mt-14">
                  <SectionHeading>Languages</SectionHeading>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {member.languages.map((language) => (
                      <li
                        key={language}
                        className="rounded-full border border-line bg-bone px-3.5 py-1.5 text-xs text-navy-700"
                      >
                        {language}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Selected matters, grouped the way the practice itself is. Only
                  the members whose full CV the firm has supplied carry these,
                  so the whole section disappears rather than rendering an
                  empty heading. */}
              {member.experience && member.experience.length > 0 && (
                <div className="mt-14">
                  <SectionHeading>Selected experience</SectionHeading>
                  <div className="mt-6 space-y-10">
                    {member.experience.map((group) => (
                      <div key={group.area}>
                        <h3 className="eyebrow text-copper-500">{group.area}</h3>
                        <ul className="mt-4 space-y-3 border-l border-line pl-6">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="text-[0.9375rem] leading-relaxed text-muted"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* The partners' matters, as their profiles on the old site set
                  them out: one toggle per practice area, under the area names
                  the firm used there, each folded shut behind a plus until the
                  reader picks the topic they care about. Native <details>, so
                  they open without script and the text stays in the page for
                  search engines and find-in-page. */}
              {legacyExperience.length > 0 && (
                <div className="mt-14">
                  <SectionHeading>Selected experience</SectionHeading>
                  <div className="mt-6 border-t border-line">
                    {legacyExperience.map((group) => (
                      <details key={group.area} className="group border-b border-line">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                          <h3 className="font-display text-lg leading-snug text-navy-800 transition-colors group-hover:text-copper-600 sm:text-xl">
                            {group.area}
                          </h3>
                          <span
                            aria-hidden="true"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-copper-500 transition-colors group-hover:border-copper-400 group-open:border-copper-500 group-open:bg-copper-500 group-open:text-white"
                          >
                            {/* A plus that turns a quarter-and-a-half into an
                                x as the toggle opens. */}
                            <svg
                              viewBox="0 0 12 12"
                              className="h-3 w-3 transition-transform duration-300 group-open:rotate-[135deg]"
                            >
                              <path
                                d="M6 1v10M1 6h10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        </summary>
                        <ul className="list-disc space-y-3 pb-6 pl-5 marker:text-copper-500">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="pl-1 text-[0.9375rem] leading-relaxed text-muted"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-14 border-t border-line pt-8">
                <p className="text-sm leading-relaxed text-muted">
                  To reach {member.name.split(" ")[0]} directly, write to{" "}
                  <a
                    href={`mailto:${member.email ?? firm.email}`}
                    className="font-semibold text-copper-500 transition-colors hover:text-copper-600"
                  >
                    {member.email ?? firm.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the team */}
      <section className="border-t border-line bg-bone py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading>The rest of the team</SectionHeading>
            <Link
              href="/team"
              className="shrink-0 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
            >
              View all &rarr;
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/team/${other.slug}`}
                  className="group flex items-center gap-5 rounded-2xl border border-line bg-white p-5 transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-800/[0.06]"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-neutral-100 to-neutral-200">
                    <Image
                      src={other.card}
                      alt=""
                      sizes="80px"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="eyebrow text-copper-500">{other.role}</p>
                    <p className="mt-1 font-display text-xl text-navy-800 transition-colors group-hover:text-copper-600">
                      {other.name}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
