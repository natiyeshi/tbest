"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import { BrandArrow } from "@/components/brand";

import addisSkyline from "../../../public/hero/addis-skyline.jpg";
import addisTowerStreet from "../../../public/hero/addis-tower-street.jpg";

/** How long each statement holds the stage. */
const ROTATE_MS = 5000;

/**
 * The four lines that rotated through the old site's home slider, word for
 * word, with the lead the old slider picked out in colour kept as `lead`.
 * They replaced the rotating practice areas here: the practices already have
 * their own section a scroll below, and these say what the firm is like rather
 * than listing what it does.
 */
const STATEMENTS = [
  { lead: "Trusted", rest: "legal services informed by wealth of experience." },
  {
    lead: "Legally compliant,",
    rest: "bold solutions tailored to specific needs of clients.",
  },
  {
    lead: "Highly skilled",
    rest: "in negotiations, transactional lawyering and deals.",
  },
  {
    lead: "Specialized",
    rest: "knowledge of Ethiopian laws and cross-border transactions.",
  },
] as const;

/*
 * The landing hero used to play a silent loop of the firm behind the copy. The
 * firm asked for it to come out — the logo is being redrawn and the footage
 * carries the old one. The backdrop still changes with the copy, drawing only
 * on the firm's own Addis Ababa photography — the skyline and the Commercial
 * Bank tower — alternating statement by statement. Add a photograph here the
 * day the firm has more to give it.
 */
const BACKDROPS = [addisSkyline, addisTowerStreet];

export function Hero() {
  const count = STATEMENTS.length;

  const [active, setActive] = useState(0);
  // Bumped whenever the reader takes manual control, to restart the timer so a
  // statement they just chose isn't whisked away a moment later. It also re-keys
  // the progress bar so it starts its sweep again.
  const [nudge, setNudge] = useState(0);

  const select = (index: number) => {
    setActive(index);
    setNudge((n) => n + 1);
  };

  // Step past the landing section to the content below.
  const scrollDown = () => {
    const top = document.getElementById("top");
    const next = top?.nextElementSibling as HTMLElement | null;
    if (next) next.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % count),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer);
  }, [nudge, count]);

  return (
    <section
      id="top"
      data-nav-tone="dark"
      className="relative isolate flex min-h-[600px] flex-col overflow-hidden bg-navy-900 lg:h-svh"
    >
      {/* The city the firm practises in, held still behind the copy but not
          frozen: a slow one-shot zoom (ken-burns, defined in globals.css), the
          same motion every other hero on the site carries. One photograph is
          mounted per statement and cross-fades in as that statement becomes
          active — a plain opacity transition, so there's never a blank frame
          between photographs. */}
      {STATEMENTS.map((statement, index) => (
        <Image
          key={statement.lead}
          src={BACKDROPS[index % BACKDROPS.length]}
          alt=""
          aria-hidden="true"
          fill
          priority={index === 0}
          quality={90}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ease-out motion-safe:animate-[ken-burns_22s_ease-out_forwards] ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* One neutral gradient over the whole frame — heaviest at the foot,
          lightest through the middle — and nothing else. The copy earns the
          rest of its contrast from its own shadow. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55"
      />

      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pt-28 pb-20 lg:justify-center lg:px-10 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-xl">
            {/* Plain text, deliberately: this is the landing headline, so it
                is never withheld pending an observer or an animation. The
                shadow is a real halo rather than Tailwind's drop-shadow-lg
                (15% black at 4px, which does nothing over footage) — it is
                what keeps the line readable wherever a bright frame passes
                behind it, without darkening the photograph to compensate. */}
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_2px_28px_rgba(0,0,0,0.75)] sm:text-5xl lg:text-6xl">
              A Full Service Law Firm in Ethiopia
            </h1>

            {/* Rotating statement — a masthead rule rather than a glass card,
                so the photograph keeps reading as itself behind the type. The
                lead word takes the copper the old slider gave it. Layers are
                absolutely positioned in a fixed-height box so nothing shifts
                as they cross-fade; the box is sized for the longest line at
                three lines on a 320px screen and two from sm. */}
            <div className="relative mt-10 border-t border-white/20 pt-6">
              <div className="relative h-[6.25rem] sm:h-[5.5rem]">
                {STATEMENTS.map((statement, index) => (
                  <p
                    key={statement.lead}
                    aria-hidden={index !== active}
                    className={`absolute inset-x-0 top-0 font-display text-2xl leading-[1.15] tracking-tight text-white transition-all duration-700 ease-out [text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_2px_24px_rgba(0,0,0,0.7)] sm:text-3xl ${
                      index === active
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-3 opacity-0"
                    }`}
                  >
                    <span className="text-copper-300">{statement.lead}</span>{" "}
                    {statement.rest}
                  </p>
                ))}
              </div>

              {/* Controls — previous / next as plain glyphs rather than
                  bordered circles, a single hairline that fills across as the
                  turn runs down (replacing the old rail of nine dots), and
                  the count written out rather than counted by eye. */}
              <div className="mt-5 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    select((active - 1 + count) % count)
                  }
                  aria-label="Previous statement"
                  className="flex h-8 w-6 items-center justify-center text-white/70 transition-colors hover:text-copper-300"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M10 3l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => select((active + 1) % count)}
                  aria-label="Next statement"
                  className="flex h-8 w-6 items-center justify-center text-white/70 transition-colors hover:text-copper-300"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="relative h-px flex-1 bg-white/25">
                  <span
                    key={`${active}-${nudge}`}
                    className="absolute inset-y-0 left-0 w-full origin-left bg-copper-400 motion-safe:animate-[hero-progress_var(--hero-rotate)_linear_forwards]"
                    style={{ "--hero-rotate": `${ROTATE_MS}ms` } as CSSProperties}
                  />
                </div>

                <p className="shrink-0 font-display text-xs tabular-nums text-white/70">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-white/45"> / </span>
                  {String(count).padStart(2, "0")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/practices"
                className="group inline-flex items-center gap-3 rounded-full bg-copper-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-copper-600"
              >
                Explore our practices
                <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              {/* A quiet link beside the one solid button, rather than a
                  second button matching its weight — the same pairing the
                  rest of the site uses for a primary action next to a lighter
                  alternative. */}
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white transition-colors hover:text-copper-300"
              >
                Talk to us
                <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer rail — the scroll cue, now on its own: there is no longer any
          looping motion for the reader to stop. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex items-center px-6 lg:px-10">
        <button
          type="button"
          onClick={scrollDown}
          aria-label="Scroll to content"
          className="pointer-events-auto hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-copper-400 hover:text-copper-300 lg:flex"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
