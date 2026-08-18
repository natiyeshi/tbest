"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandArrow, DiamondField } from "@/components/brand";
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
      () => setActive((current) => (current + 1) % practices.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer);
  }, [nudge]);

  return (
    <>
      <section
        id="top"
        data-nav-tone="light"
        className="relative flex min-h-[640px] flex-col overflow-hidden bg-white lg:h-svh"
      >
        {/* The firm's shared diamond field, used large in the bottom-left. */}
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-[40rem] w-[40rem] overflow-hidden">
          <DiamondField
            id="hero-diamond"
            size={84}
            className="text-brand-100/70"
          />
        </div>

        <div className="relative h-full min-h-0 flex-1 px-4 pt-24 pb-4 sm:px-6 lg:px-6 lg:pt-24 lg:pb-4">
          <div className="relative h-full">
            {/* Image panel — near full-width to the right with a little white
                padding; sits below the nav and above the bottom of the screen. */}
            <div className="relative h-[62vh] w-full overflow-hidden rounded-3xl bg-brand-900 lg:absolute lg:inset-y-0 lg:left-[30%] lg:right-0 lg:h-full lg:w-auto">
              {practices.map((practice, index) => (
                <Image
                  key={practice.slug}
                  src={getPracticeImage(practice.slug)}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 90vw, 100vw"
                  placeholder="blur"
                  className="object-cover transition-opacity duration-700 ease-out"
                  style={{ opacity: index === active ? 1 : 0 }}
                />
              ))}
            </div>

            {/* Text card — overlaps the left edge of the image, on the white
                background. Its own solid colour, so the copy never sits on the
                photo and always reads clearly. */}
            <div className="relative z-10 mx-auto -mt-16 w-[90%] rounded-3xl bg-brand-900 p-8 shadow-2xl shadow-brand-900/20 sm:-mt-24 sm:w-[80%] sm:p-10 lg:absolute lg:left-[5%] lg:top-1/2 lg:mx-0 lg:mt-0 lg:w-[38%] lg:-translate-y-1/2 lg:p-12">
              {/* Rotating practice — the dynamic centrepiece. Layers are
                  absolutely positioned in a fixed-height box so nothing shifts. */}
              <div className="relative h-[13rem] sm:h-[12rem]">
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
                    <p className="eyebrow text-copper-300">Practice area</p>
                    <p className="mt-3 font-display text-3xl leading-[1.08] tracking-tight text-white sm:text-4xl">
                      {practice.name}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-brand-100/80 sm:text-base">
                      {practice.blurb}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/practices"
                className="group inline-flex items-center gap-3 rounded-full bg-copper-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-copper-600"
              >
                Explore our practices
                <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Controls — previous / dots / next */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => select((active - 1 + practices.length) % practices.length)}
                    aria-label="Previous practice"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/70 hover:bg-white/10"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                      <path d="M10 3l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => select((active + 1) % practices.length)}
                    aria-label="Next practice"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/70 hover:bg-white/10"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                      <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
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
            </div>

            {/* Scroll cue — the circular chevron from the Sectors section, on
                the white background, to step down to the content below. */}
            <button
              type="button"
              onClick={scrollDown}
              aria-label="Scroll to content"
              className="absolute bottom-2 left-2 hidden h-11 w-11 items-center justify-center rounded-full border border-brand-200 text-brand-700 transition-colors hover:border-copper-500 hover:text-copper-500 lg:flex"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
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
