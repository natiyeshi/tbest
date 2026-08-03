import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { BrandArrow, LogoMark } from "@/components/brand";
import { TypeIn } from "@/components/type-in";
import { fallbackImage } from "@/lib/practice-images";

const iconProps = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-6 w-6",
} as const;

/** Thin brand-geometry illustrations, one per pillar. */
const pillars: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Knowledge of the law and the practice",
    body: "We pride ourselves on providing superior legal advisory and representation services, informed by a deep knowledge of both the letter of the law and how it is applied.",
    // An open book
    icon: (
      <svg {...iconProps}>
        <path d="M20 11c-4-2.5-9-2.5-13-1v20c4-1.5 9-1.5 13 1" />
        <path d="M20 11c4-2.5 9-2.5 13-1v20c-4-1.5-9-1.5-13 1" />
        <line x1="20" y1="11" x2="20" y2="31" />
      </svg>
    ),
  },
  {
    title: "Practical solutions to complex briefs",
    body: "Clients come to us with difficult, unfamiliar problems. Our work is to meet the brief and return a route forward that is commercially workable, not merely correct.",
    // A route to a target
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="31" r="2.5" />
        <path d="M9 31c7 0 6-11 12-11s5-11 10-11" />
        <circle cx="31" cy="9" r="3" />
      </svg>
    ),
  },
  {
    title: "A standing dialogue with clients",
    body: "Ethiopian regulation moves quickly. We publish regular legal updates so clients understand what has changed before it affects their operations.",
    // Two exchanging messages
    icon: (
      <svg {...iconProps}>
        <path d="M7 10h15a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-8l-5 4v-4a3 3 0 0 1-2-3v-5a3 3 0 0 1 3-3Z" />
        <path d="M29 19h2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3v3l-4-3h-6" opacity="0.55" />
      </svg>
    ),
  },
];

export function Firm() {
  return (
    <section data-nav-tone="light" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow flex items-center gap-3 text-copper-500">
              <span className="h-px w-8 bg-copper-400" />
              <TypeIn text="The firm" />
            </p>
            <TypeIn
              as="h2"
              text="A leading full service firm for corporate and commercial work."
              className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-brand-900 sm:text-5xl"
            />
            <p className="mt-7 text-base leading-relaxed text-muted">
              TBeST Law provides legal services across a wide range of sectors
              and practice areas, acting as trusted advisors for the legal and
              regulatory requirements of our clients in Ethiopia.
            </p>

            {/* The firm's strongest differentiator, given its own frame — set
                over an Addis skyline so the claim is grounded in place. */}
            <div className="relative mt-10 overflow-hidden rounded-2xl bg-brand-900 p-9">
              <Image
                src={fallbackImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="object-cover opacity-40"
                style={{ objectPosition: "center 60%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/85 to-brand-900/70" />
              <LogoMark
                ringWidth={4}
                className="pointer-events-none absolute -bottom-12 -right-10 h-56 w-56 text-copper-500/20"
              />
              <p className="relative font-display text-2xl leading-snug text-white">
                Our lawyers contributed to the drafting of the Ethiopian
                Commercial Code, and the country&rsquo;s investment and tax
                laws.
              </p>
              <p className="relative mt-5 text-sm leading-relaxed text-brand-100/70">
                That work gives the firm an unusual vantage point on the
                frameworks our clients operate within.
              </p>
            </div>

            <Link
              href="/about-us"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
            >
              More about the firm
              <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Pillars — each an illustrated card so the copy reads at a glance */}
          <div
            className="lg:col-span-6 lg:col-start-7"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <ul className="space-y-5">
              {pillars.map((pillar, index) => (
                <li
                  key={pillar.title}
                  className="group flex gap-6 rounded-2xl border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-900/[0.06] lg:p-8"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-copper-50 text-copper-600 transition-colors duration-300 group-hover:bg-copper-100">
                    {pillar.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm text-copper-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl leading-snug text-brand-900 sm:text-2xl">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {pillar.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
