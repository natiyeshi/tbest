import Link from "next/link";

import { BrandArrow } from "@/components/brand";
import { TypeIn } from "@/components/type-in";
import { firm } from "@/lib/content";

/**
 * The firm's closing call to action.
 *
 * It used to stand on a photograph of the partners under two stacked gradients,
 * and it ran at the foot of every page on the site. The firm asked for both to
 * go: the stacked layers made the band read as a dark hole, and repeating the
 * same photograph on nine pages spent it. So the section is now a plain navy
 * band — one flat colour, no photograph, no scrim — and it appears once, on the
 * Contact page. Everywhere else closes on `ClosingCTA` below.
 */
export function ContactCTA({
  heading = "Start with a partner, not a form.",
  body = "Send a short note about the matter. It goes to the partner who handles that work, from our office on Africa Avenue in Addis Ababa.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section data-nav-tone="dark" className="bg-navy-800 py-16 lg:py-20">
      <div
        className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10"
        data-reveal
      >
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-copper-300">
            <span className="h-px w-8 bg-copper-400" />
            Contact
          </p>
          <TypeIn
            as="h2"
            text={heading}
            className="mt-6 block font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          />
          <p className="mt-5 text-base leading-relaxed text-navy-100/85 sm:text-lg">
            {body}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <Link
            href="/contact-us"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-copper-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-copper-600"
          >
            Contact the firm
            <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href={`mailto:${firm.email}`}
            className="rounded-full border border-white/40 px-8 py-4 text-center text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            {firm.email}
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * What every other page closes on now that the photographic band has been
 * pulled back to Contact: one quiet line and a link, on the page's own paper.
 * It stops a page ending mid-air without reintroducing a second heavy section.
 */
export function ClosingCTA({
  text = "Tell us what you are working on and we will put you with the right lawyer.",
}: {
  text?: string;
}) {
  return (
    <section
      data-nav-tone="light"
      className="border-t border-line bg-white py-12 lg:py-16"
    >
      <div
        className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10"
        data-reveal
      >
        <p className="max-w-xl text-base leading-relaxed text-navy-700">
          {text}
        </p>
        <Link
          href="/contact-us"
          className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
        >
          Talk to us
          <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
