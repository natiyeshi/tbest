"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import { BrandArrow } from "@/components/brand";
import { CountUp } from "@/components/count-up";
import { TypeIn } from "@/components/type-in";
import { stats } from "@/lib/content";
import { practices } from "@/lib/practices";

/** How long each practice area holds the stage. */
const ROTATE_MS = 4000;

/**
 * Footage of the firm, played silently behind the landing copy. The poster
 * paints on the first frame of the page, so the hero is never empty while the
 * video arrives; the mp4 is there for browsers that will not take the webm.
 */
const HERO_POSTER = "/new/team/hero-poster.webp";
const HERO_WEBM = "/new/team/hero-web.webm";
const HERO_MP4 = "/new/team/hero-web.mp4";

export function Hero() {
  const [active, setActive] = useState(0);
  // Bumped whenever the reader takes manual control, to restart the timer so a
  // practice they just chose isn't whisked away a moment later. It also re-keys
  // the progress bar so it starts its sweep again.
  const [nudge, setNudge] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

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

  // The button asks the element to change state; `playing` follows from the
  // element's own play/pause events, so the label always matches reality even
  // when the browser stops playback on its own.
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % practices.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer);
  }, [nudge]);

  // Readers who prefer reduced motion get a still frame rather than a looping
  // background; the control at the foot of the section lets them start it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.pause();
  }, []);

  return (
    <>
      <section
        id="top"
        data-nav-tone="dark"
        className="relative isolate flex min-h-[600px] flex-col overflow-hidden bg-brand-950 lg:h-svh"
      >
        {/* The footage itself: silent, looping, decorative. It carries nothing
            the copy does not, so it is hidden from assistive technology.

            Nothing gates its visibility. An earlier version faded it in on a
            load event, which meant that whenever the video was ready before
            React hydrated — the common case, and always so from cache — the
            event fired with no listener attached and the video stayed at zero
            opacity for good. The poster covers the same gap with no JavaScript
            at all: the browser paints it immediately and swaps in the first
            frame itself. */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={HERO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={HERO_WEBM} type="video/webm" />
          <source src={HERO_MP4} type="video/mp4" />
        </video>

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
              <p className="eyebrow flex items-center gap-3 text-copper-300 drop-shadow">
                <span className="h-px w-8 bg-copper-400" />
                <TypeIn text="Addis Ababa, Ethiopia" />
              </p>

              {/* Plain text, deliberately: this is the landing headline, so it
                  is never withheld pending an observer or an animation. The
                  shadow is a real halo rather than Tailwind's drop-shadow-lg
                  (15% black at 4px, which does nothing over footage) — it is
                  what keeps the line readable wherever a bright frame passes
                  behind it, without darkening the video to compensate. */}
              <h1 className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_2px_28px_rgba(0,0,0,0.75)] sm:text-4xl lg:text-5xl">
                A full service law firm in Addis Ababa
              </h1>

              {/* Rotating practice — the dynamic centrepiece, now a pane of
                  frosted glass so the footage keeps moving behind the words
                  instead of being boxed out by a solid card. Layers are
                  absolutely positioned in a fixed-height box so nothing shifts
                  as they cross-fade. */}
              <div className="relative mt-7 overflow-hidden rounded-2xl border border-white/15 bg-black/25 backdrop-blur-sm">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px] bg-copper-500"
                />

                <div className="p-5 sm:p-6">
                  <div className="relative h-[8rem] sm:h-[6.75rem]">
                    {practices.map((practice, index) => (
                      <div
                        key={practice.slug}
                        aria-hidden={index !== active}
                        className={`absolute inset-x-0 top-0 transition-all duration-700 ease-out ${
                          index === active
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-3 opacity-0"
                        }`}
                      >
                        <p className="eyebrow text-copper-300">Practice area</p>
                        <p className="mt-2 font-display text-xl leading-[1.12] tracking-tight text-white sm:text-2xl">
                          {practice.name}
                        </p>
                        <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/80 sm:text-sm">
                          {practice.blurb}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Controls — previous / next, then a rail of markers where
                      the active one fills across as its turn runs down, so the
                      rotation never moves without warning. */}
                  <div className="mt-5 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          select((active - 1 + practices.length) % practices.length)
                        }
                        aria-label="Previous practice"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-copper-400 hover:bg-copper-500"
                      >
                        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                          <path d="M10 3l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => select((active + 1) % practices.length)}
                        aria-label="Next practice"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-copper-400 hover:bg-copper-500"
                      >
                        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                          <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-1 items-center gap-1.5">
                      {practices.map((practice, index) => (
                        <button
                          key={practice.slug}
                          type="button"
                          onClick={() => select(index)}
                          aria-label={practice.name}
                          aria-current={index === active}
                          className="group h-4 min-w-3 flex-1"
                        >
                          <span
                            className={`block h-1 w-full overflow-hidden rounded-full bg-white/25 transition-colors ${
                              index === active ? "" : "group-hover:bg-white/50"
                            }`}
                          >
                            {index === active && (
                              <span
                                key={`${active}-${nudge}`}
                                className="block h-full w-full origin-left rounded-full bg-copper-400 motion-safe:animate-[hero-progress_var(--hero-rotate)_linear_forwards]"
                                style={
                                  {
                                    "--hero-rotate": `${ROTATE_MS}ms`,
                                  } as CSSProperties
                                }
                              />
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/practices"
                  className="group inline-flex items-center gap-3 rounded-full bg-copper-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-copper-600"
                >
                  Explore our practices
                  <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer rail — the scroll cue on one side, the control that stops the
            footage on the other, so looping motion is never forced on the
            reader. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex items-center justify-between px-6 lg:px-10">
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
          <span aria-hidden="true" className="lg:hidden" />

          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause background video" : "Play background video"}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            {playing ? (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M5 3v10M11 3v10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M5 3l8 5-8 5z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </section>

      <dl
        data-nav-tone="dark"
        className="border-b border-white/10 bg-brand-900"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-3 px-6 lg:px-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-l border-white/10 py-5 pl-4 first:border-l-0 first:pl-0 sm:py-7 sm:pl-7 lg:pl-10"
            >
              <dt className="font-display text-xl leading-none text-copper-300 sm:text-3xl lg:text-4xl">
                <CountUp value={stat.value} />
              </dt>
              <dd className="mt-1.5 max-w-[15rem] text-[0.625rem] leading-snug text-brand-100/70 sm:mt-2.5 sm:text-[0.8125rem] sm:leading-relaxed">
                {stat.label}
              </dd>
            </div>
          ))}
        </div>
      </dl>
    </>
  );
}
