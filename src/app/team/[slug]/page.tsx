import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactCTA } from "@/components/contact-cta";
import { DiamondFieldReveal } from "@/components/diamond-field-reveal";
import {
  team,
  teamMemberBySlug,
  teamMemberExperience,
} from "@/lib/content";
import { partnerRecognitionBySlug } from "@/lib/recognition";

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

  return {
    title: `${member.name}, ${member.role} — TBeST Law LLP`,
    description: member.strapline,
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = teamMemberBySlug(slug);
  if (!member) notFound();

  const experience = teamMemberExperience(member.slug);
  const recognition = partnerRecognitionBySlug(member.slug);
  const others = team.filter((m) => m.slug !== member.slug);

  return (
    <>
      {/* Header: portrait beside the name */}
      <header
        data-nav-tone="dark"
        className="relative isolate flex min-h-[90vh] items-end overflow-hidden bg-brand-900 pt-28 pb-0 lg:pt-36"
      >
        <DiamondFieldReveal
          id={`member-diamond-${member.slug}`}
          size={78}
          className="text-brand-200/[0.05]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-end gap-10 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-7 lg:pb-16" data-reveal>
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
                  <Link href="/team" className="transition-colors hover:text-copper-300">
                    Team
                  </Link>
                </li>
              </ol>
            </nav>

            <p className="eyebrow flex items-center gap-3 text-copper-300">
              <span className="h-px w-8 bg-copper-400" />
              {member.role}
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {member.name}
            </h1>
            {member.focus.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {member.focus.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs text-brand-100/85"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Full photograph, framed and standing on the hero baseline — as
              large as the column allows */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[520px] overflow-hidden rounded-t-3xl bg-brand-950/40 lg:aspect-auto lg:h-[calc(90vh-9rem)]">
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.role} at TBeST Law LLP`}
                placeholder="blur"
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="absolute inset-0 h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Bio + credentials */}
      <section className="bg-white py-16 lg:py-24">
        <div
          className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10"
          data-reveal
        >
          <div className="lg:col-span-7">
            <p className="font-display text-xl leading-relaxed text-brand-900 sm:text-2xl">
              {member.bio ||
                `${member.name} is part of the team at TBeST Law LLP, working alongside our partners across the firm's corporate and commercial practice.`}
            </p>

            {experience.length > 0 && (
              <div className="mt-12 border-t border-line pt-10">
                <p className="eyebrow text-copper-500">Selected experience</p>
                <ul className="mt-6 space-y-0">
                  {experience.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3.5 border-b border-line py-4"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-400"
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-brand-800">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {member.credentials.length > 0 && (
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="eyebrow text-copper-500">Credentials</p>
              <ul className="mt-5 space-y-4 border-l border-line pl-5">
                {member.credentials.map((item) => (
                  <li key={item} className="text-[0.9375rem] leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Directory recognition + client testimonials (partners) */}
      {recognition && (
        <section
          data-nav-tone="dark"
          className="relative isolate overflow-hidden bg-brand-900 py-16 lg:py-24"
        >
          <DiamondFieldReveal
            id={`member-reco-${member.slug}`}
            size={78}
            className="text-brand-200/[0.05]"
          />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="eyebrow flex items-center gap-3 text-copper-300">
                  <span className="h-px w-8 bg-copper-400" />
                  Recognition
                </p>
                {recognition.iflr && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
                      IFLR1000 · {recognition.iflr.rating}
                    </span>
                    <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-brand-100/85">
                      {recognition.iflr.area}
                    </span>
                  </div>
                )}
                {recognition.chambers && (
                  <p className="mt-7 text-base leading-relaxed text-brand-100/80">
                    {recognition.chambers.summary}
                  </p>
                )}
              </div>

              {recognition.chambers && (
                <ul className="space-y-6 lg:col-span-6 lg:col-start-7">
                  {recognition.chambers.testimonials.map((quote) => (
                    <li
                      key={quote}
                      className="border-l-2 border-copper-400 pl-6 font-display text-xl leading-snug text-white sm:text-2xl"
                    >
                      &ldquo;{quote}&rdquo;
                      <span className="mt-3 block text-xs font-semibold uppercase tracking-wider text-copper-300">
                        Chambers &amp; Partners — client testimonial
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Other partners */}
      <section className="border-t border-line bg-bone py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl tracking-tight text-brand-900 sm:text-3xl">
              The rest of the team
            </h2>
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
                  className="group flex items-center gap-5 rounded-2xl border border-line bg-white p-5 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-900/[0.06]"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-brand-600 to-brand-900">
                    <Image
                      src={other.portrait}
                      alt=""
                      sizes="80px"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="eyebrow text-copper-500">{other.role}</p>
                    <p className="mt-1 font-display text-xl text-brand-900 transition-colors group-hover:text-copper-600">
                      {other.name}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
