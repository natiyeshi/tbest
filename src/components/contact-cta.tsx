import Image from "next/image";
import Link from "next/link";

import { BrandArrow } from "@/components/brand";
import { TypeIn } from "@/components/type-in";
import { firm } from "@/lib/content";
import { firmPhotos } from "@/lib/firm-images";

/**
 * Closing call to action reused at the foot of interior pages.
 *
 * It stands on a photograph of the partners rather than a flat copper band: the
 * point of the section is that a person answers, so the section shows them. The
 * copy names the office and the partner hand-off for the same reason — "tell us
 * what you are working on" could have closed anyone's website.
 */
export function ContactCTA({
  heading = "Start with a partner, not a form.",
  body = "Send a short note about the matter. It goes to the partner who handles that work, from our office on Africa Avenue in Addis Ababa.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section
      data-nav-tone="dark"
      className="relative isolate flex min-h-[50svh] items-center overflow-hidden bg-brand-950 py-16 lg:py-20"
    >
      <Image
        src={firmPhotos.partnersStanding.src}
        alt=""
        aria-hidden="true"
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
        // Held high in the frame: at 30% the band was clipping the tops of
        // their heads.
        style={{ objectPosition: "center 20%" }}
      />

      {/* Left-weighted so the copy holds, opening out across the photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/60 to-brand-950/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-brand-950/40"
      />

      <div
        className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10"
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
          <p className="mt-5 text-base leading-relaxed text-brand-100/85 sm:text-lg">
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
            className="rounded-full border border-white/40 px-8 py-4 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
          >
            {firm.email}
          </a>
        </div>
      </div>
    </section>
  );
}
