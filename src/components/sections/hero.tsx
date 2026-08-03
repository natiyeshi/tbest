"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandArrow } from "@/components/brand";
import { ServiceStage } from "@/components/service-stage";
import { stats } from "@/lib/content";
import { practices } from "@/lib/practices";
import { getPracticeImage } from "@/lib/practice-images";

/** How long each practice area holds the stage. */
const ROTATE_MS = 4000;

export function Hero() {
  const [active, setActive] = useState(0);
  // Bumped whenever the reader takes manual control, to restart the timer so a
  // practice they just chose isn't whisked away a moment later.
  const [nudge, setNudge] = useState(0);

  const select = (index: number) => {
    setActive(index);
    setNudge((n) => n + 1);
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

  return (
    <>
      <section
        id="top"
        data-nav-tone="dark"
        className="relative isolate flex min-h-svh items-center overflow-hidden bg-brand-950 pt-28 pb-16 lg:pt-32 lg:pb-20"
      >
        {/* One backdrop per practice, cross-faded in step with the copy so the
            image and its practice change together. Only the first is priority. */}
        {practices.map((practice, index) => (
          <Image
            key={practice.slug}
            src={getPracticeImage(practice.slug)}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            placeholder="blur"
            className="object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: index === active ? 1 : 0 }}
          />
        ))}

        {/* Scrim: brand tone over the photograph, weighted to the left so the
            copy keeps its contrast while the skyline shows through at right. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-brand-950/25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-brand-950/30"
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.55fr_1fr] lg:gap-8 lg:px-10">
          {/* Left — topic, description, call to action (on the dark side) */}
          <div>
            <p className="eyebrow flex items-center gap-3 text-copper-300">
              <span className="h-px w-8 bg-copper-400" />
              TBeST Law LLP — Addis Ababa
            </p>

            <h1 className="mt-5 max-w-lg font-display text-xl leading-snug text-brand-100/80 sm:text-2xl">
              Corporate and commercial counsel for business in Ethiopia.
            </h1>

            {/* Rotating practice. Layers are absolutely positioned inside a
                fixed-height box so the button below never shifts. */}
            <div className="relative mt-8 h-[15rem] sm:h-[14rem]">
              {practices.map((practice, index) => (
                <div
                  key={practice.name}
                  aria-hidden={index !== active}
                  className={`absolute inset-x-0 top-0 transition-all duration-700 ease-out ${
                    index === active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  <p className="eyebrow text-copper-300">
                    Practice {String(index + 1).padStart(2, "0")} / 09
                  </p>
                  <p className="mt-3 font-display text-[2rem] leading-[1.1] tracking-tight text-white sm:text-5xl">
                    {practice.name}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-100/70 sm:text-base">
                    {practice.blurb}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/practices"
              className="group inline-flex items-center gap-3 rounded-full bg-copper-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-copper-600"
            >
              Explore our practices
              <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Progress ticks — one per practice */}
            <div className="mt-8 flex items-center gap-1.5">
              {practices.map((practice, index) => (
                <button
                  key={practice.name}
                  type="button"
                  onClick={() => select(index)}
                  aria-label={practice.name}
                  aria-current={index === active}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === active
                      ? "w-8 bg-copper-400"
                      : "w-3 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right — the 3D scene, sitting on the white side. On mobile there is
              no wedge, so it gets its own white panel. */}
          <div className="lg:pl-4">
            <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-brand-950/40 lg:bg-transparent lg:p-0 lg:shadow-none">
              <ServiceStage active={active} />
            </div>
          </div>
        </div>

        {/* Movement controls — bottom-left, aligned to the content column so
            they share the CTA button's left edge. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 lg:px-10">
            <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => select((active - 1 + practices.length) % practices.length)}
              aria-label="Previous practice"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/70 hover:bg-white/10"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="M10 3l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => select((active + 1) % practices.length)}
              aria-label="Next practice"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/70 hover:bg-white/10"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
            <span className="font-display text-sm text-white/70">
              {String(active + 1).padStart(2, "0")}
              <span className="text-white/40"> / {String(practices.length).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </section>

      <dl
        data-nav-tone="dark"
        className="border-b border-white/10 bg-brand-950"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-3 px-6 lg:px-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-l border-white/10 py-5 pl-4 first:border-l-0 first:pl-0 sm:py-7 sm:pl-7 lg:pl-10"
            >
              <dt className="font-display text-xl leading-none text-copper-300 sm:text-3xl lg:text-4xl">
                {stat.value}
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
