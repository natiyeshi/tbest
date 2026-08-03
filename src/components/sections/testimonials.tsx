"use client";

import { useEffect, useState } from "react";

import { LogoMark } from "@/components/brand";
import { testimonials } from "@/lib/recognition";

const ROTATE_MS = 6000;

/**
 * What clients and the market say. A single large quote holds the stage and
 * cross-fades to the next; the reader can steer with the dots or arrows. On a
 * dark brand band so the words carry the section on their own.
 */
export function Testimonials({
  tone = "dark",
}: {
  tone?: "dark" | "bone";
}) {
  const [active, setActive] = useState(0);
  const [nudge, setNudge] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((c) => (c + 1) % testimonials.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer);
  }, [nudge]);

  const select = (index: number) => {
    setActive(((index % testimonials.length) + testimonials.length) % testimonials.length);
    setNudge((n) => n + 1);
  };

  const dark = tone === "dark";

  return (
    <section
      data-nav-tone={dark ? "dark" : "light"}
      className={`relative isolate overflow-hidden py-24 lg:py-32 ${
        dark ? "bg-brand-900" : "border-y border-line bg-bone"
      }`}
    >
      <LogoMark
        ringWidth={3}
        className={`pointer-events-none absolute -right-24 -top-16 h-[26rem] w-[26rem] ${
          dark ? "text-white/[0.05]" : "text-copper-500/[0.06]"
        }`}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10" data-reveal>
        <p
          className={`eyebrow flex items-center justify-center gap-3 ${
            dark ? "text-copper-300" : "text-copper-500"
          }`}
        >
          <span className="h-px w-8 bg-copper-400" />
          In their words
          <span className="h-px w-8 bg-copper-400" />
        </p>

        <div
          aria-hidden="true"
          className={`mx-auto mt-8 font-display text-6xl leading-none ${
            dark ? "text-copper-400/50" : "text-copper-400/60"
          }`}
        >
          &ldquo;
        </div>

        {/* Stacked quotes cross-fade in place; the tallest sets the height. */}
        <div className="relative mt-2 min-h-[10rem] sm:min-h-[9rem]">
          {testimonials.map((item, index) => (
            <blockquote
              key={index}
              aria-hidden={index !== active}
              className={`absolute inset-0 flex items-start justify-center transition-all duration-700 ease-out ${
                index === active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              <p
                className={`font-display text-2xl leading-snug tracking-tight sm:text-3xl lg:text-[2rem] ${
                  dark ? "text-white" : "text-brand-900"
                }`}
              >
                {item.quote}
              </p>
            </blockquote>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => select(active - 1)}
            aria-label="Previous testimonial"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              dark
                ? "border-white/30 text-white hover:border-white/70 hover:bg-white/10"
                : "border-brand-300 text-brand-800 hover:border-copper-500 hover:text-copper-600"
            }`}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M10 3l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => select(index)}
                aria-label={`Testimonial ${index + 1}`}
                aria-current={index === active}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === active
                    ? "w-7 bg-copper-400"
                    : dark
                      ? "w-2 bg-white/25 hover:bg-white/50"
                      : "w-2 bg-brand-300 hover:bg-brand-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => select(active + 1)}
            aria-label="Next testimonial"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              dark
                ? "border-white/30 text-white hover:border-white/70 hover:bg-white/10"
                : "border-brand-300 text-brand-800 hover:border-copper-500 hover:text-copper-600"
            }`}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
