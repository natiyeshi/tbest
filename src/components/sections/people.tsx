import Image from "next/image";
import Link from "next/link";

import { BrandArrow, MarkPattern } from "@/components/brand";
import { PortraitSwap } from "@/components/portrait-swap";
import { TypeIn } from "@/components/type-in";
import { lawyers, partners } from "@/lib/content";
import { firmPhotos } from "@/lib/firm-images";

export function People() {
  return (
    <section data-nav-tone="light" className="bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-copper-500">
              <span className="h-px w-8 bg-copper-400" />
              <TypeIn text="The partners" />
            </p>
            <TypeIn
              as="h2"
              text="The people who helped write the rules."
              className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-brand-900 sm:text-5xl"
            />
            <p className="mt-7 text-base leading-relaxed text-muted">
              Our partners have practised in academia, in government and in the
              private sector, and contributed to the drafting of the laws they
              now advise on. Clients work with them directly.
            </p>
          </div>
          <Link
            href="/team"
            className="group inline-flex shrink-0 items-center gap-2.5 self-start text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600 lg:self-auto"
          >
            Meet the team
            <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {partners.map((member) => (
            <li key={member.slug}>
              <Link href={`/team/${member.slug}`} className="group block">
                <div className="relative mx-auto aspect-4/5 w-full max-w-[280px] overflow-hidden rounded-2xl">
                  <div className="absolute inset-x-0 bottom-0 top-14 bg-gradient-to-b from-neutral-100 to-neutral-200">
                    <MarkPattern
                      id={`people-pattern-${member.slug}`}
                      size={80}
                      className="absolute inset-0 h-full w-full text-brand-900/[0.06]"
                    />
                  </div>
                  <PortraitSwap
                    portrait={member.card}
                    portraitAlt={member.cardAlt}
                    alt={`${member.name}, ${member.role} at TBeST Law LLP`}
                    sizes="280px"
                    fit="cover"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p className="eyebrow text-copper-500">{member.role}</p>
                  <p className="mt-2 font-display text-2xl text-brand-900 transition-colors group-hover:text-copper-600">
                    {member.name}
                  </p>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
                    {member.strapline}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* The partners lead, but the practice is the whole room — so the
            section closes on everyone, and doubles as the way through to the
            full team. */}
        <Link
          href="/team"
          className="group relative mt-16 block overflow-hidden rounded-3xl bg-brand-950"
          data-reveal
        >
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/7]">
            <Image
              src={firmPhotos.teamFull.src}
              alt={firmPhotos.teamFull.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 76rem, 100vw"
              className="object-cover object-[center_28%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-5 p-7 sm:p-9 lg:p-10">
            <div>
              <p className="eyebrow text-copper-300">The whole team</p>
              <p className="mt-2 font-display text-2xl leading-tight text-white sm:text-3xl">
                {lawyers.length} lawyers, one practice.
              </p>
            </div>
            <span className="inline-flex items-center gap-3 rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors group-hover:border-white group-hover:bg-white/10">
              Meet the team
              <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
