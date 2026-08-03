import Link from "next/link";

import { LogoMark } from "@/components/brand";
import { TypeIn } from "@/components/type-in";
import { firm } from "@/lib/content";

/**
 * Closing call to action reused at the foot of interior pages. Points at the
 * dedicated contact page and offers the firm email as a direct alternative.
 */
export function ContactCTA({
  heading = "Tell us what you are working on.",
  body = "Send a short note describing the matter and we will come back to you with the right partner for it.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section
      data-nav-tone="copper"
      className="relative isolate overflow-hidden bg-copper-600 py-20 lg:py-28"
    >
      <LogoMark
        ringWidth={3}
        className="pointer-events-none absolute -right-20 -bottom-24 h-[24rem] w-[24rem] text-white/[0.10]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-copper-500/40 via-transparent to-copper-700/50"
      />
      <div
        className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10"
        data-reveal
      >
        <div className="max-w-2xl">
          <TypeIn
            as="h2"
            text={heading}
            className="block font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl"
          />
          <p className="mt-4 text-base leading-relaxed text-copper-50/90">{body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <Link
            href="/contact-us"
            className="rounded-full bg-white px-8 py-4 text-center text-sm font-semibold text-copper-700 transition-colors hover:bg-copper-50"
          >
            Contact the firm
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
