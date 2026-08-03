import Image from "next/image";
import Link from "next/link";

import { BrandArrow, MarkPattern } from "@/components/brand";
import { partners } from "@/lib/content";

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
              The partners
            </p>
            <h2 className="mt-7 font-display text-4xl leading-[1.12] tracking-tight text-brand-900 sm:text-5xl">
              The people who helped write the rules.
            </h2>
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
                  <div className="absolute inset-x-0 bottom-0 top-14 bg-gradient-to-b from-brand-600 to-brand-900">
                    <MarkPattern
                      id={`people-pattern-${member.slug}`}
                      size={80}
                      className="absolute inset-0 h-full w-full text-white/[0.12]"
                    />
                  </div>
                  <Image
                    src={member.portrait}
                    alt={`${member.name}, ${member.role} at TBeST Law LLP`}
                    placeholder="blur"
                    sizes="280px"
                    className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-500 ease-out group-hover:-translate-y-1"
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
      </div>
    </section>
  );
}
