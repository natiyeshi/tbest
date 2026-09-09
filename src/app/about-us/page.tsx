import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LogoMark } from "@/components/brand";
import { ContactCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { Recognition } from "@/components/sections/recognition";
import { Testimonials } from "@/components/sections/testimonials";
import { stats } from "@/lib/content";
import { firmPhotos } from "@/lib/firm-images";

export const metadata: Metadata = {
  title: "About — TBeST Law LLP",
  description:
    "TBeST Law LLP is a leading full service law firm in Addis Ababa providing corporate and commercial legal services, with partners at the forefront of Ethiopia's legal reform.",
};

const pillars = [
  {
    title: "Knowledge of the law and the practice",
    body: "We pride ourselves on providing superior legal advisory and representation services, informed by a deep knowledge of both the letter of the law and how it is applied. That makes us trusted advisors for our clients' legal and regulatory requirements in Ethiopia.",
  },
  {
    title: "Practical solutions to complex briefs",
    body: "We pride ourselves on being able to meet client briefs and to find practical legal solutions to our clients' complex needs, providing quality legal advice and transactional services across our various practice areas.",
  },
  {
    title: "A standing dialogue with clients",
    body: "Our continuous engagement in legal and policy reform gives our lawyers a unique insight into Ethiopian law. We provide regular legal updates so clients stay actively aware of changes in the Ethiopian legal environment.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the firm"
        title="A leading full service firm for corporate and commercial work."
        lead="TBeST Law is a leading full service law firm that provides corporate and commercial legal services across a wide range of sectors and practice areas, drawing on years of experience of its partners in the academic and legal services sectors."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={firmPhotos.boardroomFull.src}
      />

      {/* Positioning + the drafting credential */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20" data-reveal>
            <div className="lg:col-span-6">
              <p className="eyebrow flex items-center gap-3 text-copper-500">
                <span className="h-px w-8 bg-copper-400" />
                Who we are
              </p>
              <div className="mt-7 space-y-6 text-base leading-relaxed text-muted sm:text-lg">
                <p>
                  We act as trusted advisors for all our clients&rsquo; legal
                  and regulatory requirements in Ethiopia, combining a deep
                  knowledge of the law with the practical experience to apply
                  it.
                </p>
                <p>
                  We meet client briefs by finding workable legal solutions to
                  complex needs, providing quality legal advice and
                  transactional services through our practice areas and across
                  the sectors our clients operate in.
                </p>
              </div>

              <Link
                href="/team"
                className="mt-9 inline-flex items-center gap-3 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
              >
                Learn more about our team
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-9 lg:p-12">
                <LogoMark
                  ringWidth={4}
                  className="pointer-events-none absolute -right-12 -bottom-14 h-64 w-64 text-copper-500/15"
                />
                <p className="eyebrow relative text-copper-300">
                  At the forefront of reform
                </p>
                <p className="relative mt-5 font-display text-2xl leading-snug text-white sm:text-3xl">
                  TBeST lawyers contributed to the drafting of the Ethiopian
                  Commercial Code, and the country&rsquo;s investment and tax
                  laws.
                </p>
                <p className="relative mt-6 text-sm leading-relaxed text-brand-100/70">
                  Our continuous engagement in legal and policy reform gives our
                  lawyers a distinctive insight into the understanding of
                  Ethiopian law — and an uncommon vantage point on the
                  frameworks our clients operate within.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <dl
            className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-3"
            data-reveal
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white px-7 py-9">
                <dt className="font-display text-5xl leading-none text-copper-500">
                  {stat.value}
                </dt>
                <dd className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The firm, in one picture — between what we say about ourselves and how
          we work with clients. */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
          <figure className="overflow-hidden rounded-3xl bg-brand-950">
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
              <Image
                src={firmPhotos.teamFull.src}
                alt={firmPhotos.teamFull.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 76rem, 100vw"
                className="object-cover object-[center_28%]"
              />
            </div>
            <figcaption className="px-7 py-5 text-sm text-brand-100/70 sm:px-9">
              The lawyers of TBeST Law LLP, Addis Ababa.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-line bg-bone py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
          <h2 className="max-w-2xl font-display text-3xl leading-tight tracking-tight text-brand-900 sm:text-4xl">
            How we work with clients.
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-line lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className="bg-bone p-8 lg:p-10">
                <span className="font-display text-sm text-copper-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-2xl leading-snug text-brand-900">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Recognition />

      <Testimonials />

      <ContactCTA />
    </>
  );
}
