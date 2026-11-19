import type { CSSProperties } from "react";

import { TypeIn } from "@/components/type-in";
import type { Testimonial } from "@/lib/recognition";

/**
 * What clients and the market say.
 *
 * A warm off-white band, a shade apart from the white recognition section
 * above it: the lead quote set large over the firm's diamond, and the rest on a slow, endless ribbon beneath it. The ribbon
 * pauses under the cursor so a quote can be read at leisure, and stops
 * altogether for readers who ask for reduced motion — the quotes then simply
 * wrap into rows, all of them on screen at once.
 *
 * The list comes from the dashboard, so any count has to work: with only a
 * couple of quotes behind the lead, a ribbon would look thin and repeat
 * itself in plain view, so they sit side by side instead.
 */
export function Testimonials({
  testimonials,
}: {
  testimonials: readonly Testimonial[];
}) {
  if (testimonials.length === 0) return null;
  const [lead, ...rest] = testimonials;
  const ribbon = rest.length >= 3;

  return (
    <section
      data-nav-tone="light"
      className="relative isolate overflow-hidden border-y border-line bg-bone py-24 lg:py-32"
    >
      <Backdrop />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div data-reveal>
          <p className="eyebrow flex items-center gap-3 text-copper-500">
            <span className="h-px w-8 bg-copper-400" />
            <TypeIn text="Testimonials" />
          </p>
          <TypeIn
            as="h2"
            text="In their words"
            className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-navy-800 sm:text-5xl"
          />
        </div>

        {/* The lead quote, with the copper mark sitting in the flow above it
            rather than hung into the margin, where narrower screens cut it
            off. */}
        <figure
          className="relative mt-12 max-w-4xl lg:mt-16"
          data-reveal
          style={{ "--reveal-delay": "100ms" } as CSSProperties}
        >
          <QuoteMark className="h-9 text-copper-400 sm:h-12 lg:h-14" />
          <blockquote className="relative mt-6 font-display text-2xl leading-[1.25] tracking-tight text-navy-800 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
            <Quoted text={lead.quote} />
          </blockquote>
          <Source source={lead.source} className="mt-8" />
        </figure>
      </div>

      {rest.length > 0 &&
        (ribbon ? (
          <Ribbon items={rest} />
        ) : (
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <ul className="mt-16 grid gap-5 sm:grid-cols-2" data-reveal>
              {rest.map((item) => (
                <li key={item.quote}>
                  <QuoteCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
    </section>
  );
}

/**
 * The endless ribbon. Two identical runs side by side, shifted left by half
 * the track, so the end of the first run hands over to the start of the
 * second without a seam. The second run is hidden from assistive technology —
 * it is the same quotes again — and from reduced-motion readers, whose track
 * stands still and wraps.
 */
function Ribbon({ items }: { items: readonly Testimonial[] }) {
  // Roughly the same reading pace whatever the count: about nine seconds per
  // card crossing the screen.
  const duration = `${Math.max(30, items.length * 9)}s`;

  return (
    <div
      className="group relative mt-16 lg:mt-20"
      data-reveal
      style={{ "--reveal-delay": "200ms" } as CSSProperties}
    >
      {/* Soft edges, so cards drift in and out of the band rather than being
          cut by the viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bone to-transparent motion-reduce:hidden sm:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bone to-transparent motion-reduce:hidden sm:w-32"
      />

      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none"
        style={{ animationDuration: duration }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className={`flex shrink-0 items-stretch gap-5 pr-5 motion-reduce:mx-auto motion-reduce:max-w-7xl motion-reduce:flex-wrap motion-reduce:px-6 lg:motion-reduce:px-10 ${
              copy === 1 ? "motion-reduce:hidden" : ""
            }`}
          >
            {items.map((item) => (
              <li
                key={item.quote}
                className="w-[19rem] shrink-0 sm:w-[24rem] motion-reduce:w-full motion-reduce:sm:w-[calc(50%-0.625rem)] motion-reduce:lg:w-[calc(33.333%-0.834rem)]"
              >
                <QuoteCard item={item} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/**
 * An opening quotation mark, drawn rather than typed: a glyph set at display
 * size carries the font's line box with it, so its visible mark never lands
 * where its box says it is. This one is exactly as big as it looks.
 */
function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 36"
      aria-hidden="true"
      fill="currentColor"
      className={`block w-auto ${className}`}
    >
      <path d="M0 36V22C0 10.5 6 2.5 18 0l2 5c-7 2.2-10 7-10 13h8v18H0Zm28 0V22c0-11.5 6-19.5 18-22l2 5c-7 2.2-10 7-10 13h8v18H28Z" />
    </svg>
  );
}

function QuoteCard({ item }: { item: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-sm shadow-navy-800/[0.03] transition-all duration-300 hover:border-copper-200 hover:shadow-xl hover:shadow-navy-800/[0.06] sm:p-8">
      {/* A copper rule across the top edge — the one accent each card carries. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-copper-400 via-copper-400/40 to-transparent sm:inset-x-8"
      />
      <QuoteMark className="h-5 text-copper-400" />
      <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-navy-700">
        <Quoted text={item.quote} />
      </blockquote>
    </figure>
  );
}

/**
 * The quote between quotation marks, so it reads as a client's own words. Any
 * marks already typed into the dashboard are stripped first so they never
 * double up.
 */
function Quoted({ text }: { text: string }) {
  const bare = text.trim().replace(/^["“”']+|["“”']+$/g, "").trim();
  return <>&ldquo;{bare}&rdquo;</>;
}

/**
 * Which directory gathered the quote. The firm asked for every comment to name
 * its source, and to make plain that these are clients' words collected by the
 * directory, not the directory's own verdict. A quote whose source has not
 * been confirmed yet simply prints nothing rather than being attributed to a
 * publication on a guess.
 */
function Source({
  source,
  className = "",
}: {
  source?: string;
  className?: string;
}) {
  if (!source) return null;
  return (
    <figcaption
      className={`flex items-center gap-3 eyebrow text-copper-500 ${className}`}
    >
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-copper-400/70" />
      Client testimonial, gathered by {source}
    </figcaption>
  );
}

/**
 * The firm's diamond, drawn twice at low contrast behind the band: a large
 * outline off the right edge and a smaller solid one low on the left, with a
 * faint copper glow under the lead quote.
 */
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-copper-200/30 blur-3xl" />
      <svg
        viewBox="0 0 100 100"
        className="absolute -right-40 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 text-navy-800/[0.05]"
      >
        <path d="M50 2 L98 50 L50 98 L2 50 Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <path d="M50 16 L84 50 L50 84 L16 50 Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <path d="M50 30 L70 50 L50 70 L30 50 Z" fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="absolute -bottom-24 -left-24 h-72 w-72 text-copper-400/[0.08]"
      >
        <path d="M50 4 L96 50 L50 96 L4 50 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
