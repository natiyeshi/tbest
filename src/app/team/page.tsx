import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MarkPattern } from "@/components/brand";
import { ContactCTA } from "@/components/contact-cta";
import { DiamondFieldReveal } from "@/components/diamond-field-reveal";
import { PortraitSwap } from "@/components/portrait-swap";
import { TypeIn } from "@/components/type-in";
import { partners, team } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team — TBeST Law LLP",
  description:
    "The lawyers and staff of TBeST Law LLP — partners, associates and support — advising business across corporate, commercial and investment law in Ethiopia.",
};

// The three partners arranged for the hero: managing partner centred, the
// other two flanking.
const managingPartner =
  partners.find((p) => p.role.includes("Managing")) ?? partners[0];
const flanking = partners.filter((p) => p !== managingPartner);
const heroPartners = [flanking[0], managingPartner, flanking[1]].filter(
  Boolean,
);

export default function TeamPage() {
  return (
    <>
      {/* Hero: the whole team standing together */}
      <section
        data-nav-tone="dark"
        className="relative isolate min-h-svh overflow-hidden bg-brand-900"
      >
        <DiamondFieldReveal
          id="team-hero-diamond"
          size={78}
          className="text-brand-200/[0.05]"
        />

        {/* Breadcrumb, top-left, clear of the faces */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 pt-28 lg:px-10 lg:pt-32">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-brand-100/55">
              <li>
                <Link href="/" className="transition-colors hover:text-copper-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-brand-100/30">
                /
              </li>
              <li className="text-brand-100/80">Team</li>
            </ol>
          </nav>
        </div>

        {/* The three partners, filling the hero as its backdrop, with the
            managing partner centred and flanked by the other two. `isolate`
            keeps the figures' z-index scoped below the copy. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[8%] isolate flex items-end justify-center">
          <div className="mx-auto flex w-full max-w-[90%] items-end justify-center">
            {heroPartners.map((m, index) => (
              <Link
                key={m.slug}
                href={`/team/${m.slug}`}
                aria-label={`${m.name}, ${m.role}`}
                // Every figure is the same height; widths follow each portrait's
                // own proportions, and they overlap slightly toward the centre.
                className={"pointer-events-auto relative block h-[56vh] shrink-0 sm:h-[62vh] lg:h-[82vh]"}
                style={{
                  zIndex: index === 1 ? 2 : 1,
                  marginLeft: index === 0 ? undefined : "-4%",
                }}
              >
                <Image
                  src={m.portrait}
                  alt={`${m.name}, ${m.role} at TBeST Law LLP`}
                  sizes="(min-width: 768px) 35rem, 60vw"
                  className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Scrim: light touch at the top for the nav, dark at the bottom for
            the copy — the faces in the middle stay clear. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-950/60 via-transparent to-brand-950/95"
        />

        {/* Copy at the bottom, clear of the faces */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 mx-auto max-w-3xl px-6 pb-14 text-center lg:px-10 lg:pb-20"
          data-reveal
        >
          <p className="eyebrow flex items-center justify-center gap-3 text-copper-300">
            <span className="h-px w-8 bg-copper-400" />
            <TypeIn text="The team" />
            <span className="h-px w-8 bg-copper-400" />
          </p>
          <TypeIn
            as="h1"
            text="The people you will work with."
            speed={22}
            className="mt-5 block font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-100/75 sm:text-base">
            Our partners, associates and support staff advise business across
            corporate, commercial and investment law in Ethiopia.
          </p>
        </div>
      </section>

      {/* Everyone, as cards linking to their profile */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ul
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
            data-reveal
          >
            {team.map((m) => (
              <li key={m.slug}>
                <Link href={`/team/${m.slug}`} className="group block">
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl">
                    <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-b from-neutral-100 to-neutral-200">
                      <MarkPattern
                        id={`team-card-${m.slug}`}
                        size={70}
                        className="absolute inset-0 h-full w-full text-brand-900/[0.06]"
                      />
                    </div>
                    <PortraitSwap
                      portrait={m.portrait}
                      portraitAlt={m.portraitAlt}
                      alt={`${m.name}, ${m.role} at TBeST Law LLP`}
                      sizes="(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 45vw"
                    />
                  </div>
                  <p className="mt-4 eyebrow text-copper-500">{m.role}</p>
                  <p className="mt-1.5 font-display text-xl text-brand-900 transition-colors group-hover:text-copper-600">
                    {m.name}
                  </p>
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
