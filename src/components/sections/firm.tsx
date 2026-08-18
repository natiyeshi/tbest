import Link from "next/link";

import { BrandArrow } from "@/components/brand";
import { GavelStrike } from "@/components/gavel-strike";
import { TypeIn } from "@/components/type-in";

export function Firm() {
  return (
    <section data-nav-tone="light" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left — a short statement of what the firm is */}
          <div className="lg:col-span-6" data-reveal>
            <p className="eyebrow flex items-center gap-3 text-copper-500">
              <span className="h-px w-8 bg-copper-400" />
              <TypeIn text="The firm" />
            </p>
            <TypeIn
              as="h2"
              text="A leading full service firm for corporate and commercial work."
              className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-brand-900 sm:text-5xl"
            />
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
              We act as trusted advisors across a wide range of sectors and
              practice areas &mdash; and our lawyers helped draft the Ethiopian
              Commercial Code, and the country&rsquo;s investment and tax laws.
            </p>

            <Link
              href="/about-us"
              className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
            >
              More about the firm
              <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right — the gavel that strikes as the section scrolls into view */}
          <div
            className="lg:col-span-6"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <GavelStrike />
          </div>
        </div>
      </div>
    </section>
  );
}
