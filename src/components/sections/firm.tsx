import Link from "next/link";

import { BrandArrow } from "@/components/brand";
import { TypeIn } from "@/components/type-in";

/**
 * What the firm is, in one section on the landing page.
 *
 * It used to run two photographs down the right-hand side — the boardroom, with
 * the partners inset into the corner. The firm asked for the pictures to come
 * out and for the heading to read "Leading Full-Service Law Firm in Ethiopia",
 * so the section is now type alone: the statement on the left, the substance
 * and the link across from it.
 */
export function Firm() {
  return (
    <section data-nav-tone="light" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-20" data-reveal>
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-copper-500">
              <span className="h-px w-8 bg-copper-400" />
              <TypeIn text="The firm" />
            </p>
            <TypeIn
              as="h2"
              text="Leading Full-Service Law Firm in Ethiopia"
              className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-navy-800 sm:text-5xl"
            />
          </div>

          <div
            className="lg:col-span-5 lg:pt-16"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              We act as trusted advisors across a wide range of sectors and
              practice areas &mdash; and our lawyers helped draft the Ethiopian
              Commercial Code, and the country&rsquo;s investment and tax laws.
            </p>

            <Link
              href="/about-us"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
            >
              More about the firm
              <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
