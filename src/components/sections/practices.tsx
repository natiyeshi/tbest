"use client";

import Link from "next/link";
import { useState } from "react";

import { BrandArrow } from "@/components/brand";
import { PatternPanel, practiceColor } from "@/components/pattern-panel";
import { TypeIn } from "@/components/type-in";
import type { PracticeLink } from "@/lib/practices";

export function Practices({ practices }: { practices: PracticeLink[] }) {
  const [active, setActive] = useState(0);

  return (
    <section data-nav-tone="light" className="relative bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="pb-12" data-reveal>
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-copper-500">
              <span className="h-px w-8 bg-copper-400" />
              <TypeIn text="Practice areas" />
            </p>
            <TypeIn
              as="h2"
              text="Various practice areas, advised end to end."
              className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-navy-800 sm:text-5xl"
            />
          </div>
        </div>

        {/* Desktop: readable list on the left, cross-fading preview on the right */}
        <div className="hidden gap-12 lg:grid lg:grid-cols-12 lg:gap-16">
          <ul className="lg:col-span-6">
            {practices.map((practice, index) => (
              <li key={practice.slug}>
                <Link
                  href={`/practices/${practice.slug}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="group flex items-center gap-5 border-b border-line py-5"
                >
                  <span
                    className={`font-display text-sm transition-colors ${
                      index === active ? "text-copper-600" : "text-navy-800/40"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-2xl leading-snug transition-colors ${
                      index === active ? "text-navy-800" : "text-navy-800/50"
                    }`}
                  >
                    {practice.name}
                  </span>
                  <BrandArrow
                    className={`h-4 w-4 text-copper-300 transition-all duration-300 ${
                      index === active
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-6">
            <div className="sticky top-28">
              <Link
                href={`/practices/${practices[active].slug}`}
                className="relative block aspect-4/3 overflow-hidden rounded-2xl"
              >
                {/* The same drawn panel as the practice cards, one per
                    practice in its own colour, cross-fading as the list is
                    worked down. */}
                {/* The panel paints itself `relative`, so the absolute layer is
                    a wrapper around it rather than a class passed in — two
                    position utilities on one element collapse it to nothing. */}
                {practices.map((practice, index) => (
                  <div
                    key={practice.slug}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      index === active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <PatternPanel
                      color={practiceColor(index)}
                      className="h-full w-full"
                    />
                  </div>
                ))}

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="relative min-h-[7rem]">
                    {practices.map((practice, index) => (
                      <div
                        key={practice.slug}
                        aria-hidden={index !== active}
                        className={`absolute inset-0 transition-all duration-500 ease-out ${
                          index === active
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-3 opacity-0"
                        }`}
                      >
                        <h3 className="font-display text-3xl leading-snug text-white">
                          {practice.name}
                        </h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
                          {practice.blurb}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: plain readable cards */}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          {practices.map((practice, index) => (
            <li key={practice.slug}>
              <Link
                href={`/practices/${practice.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white"
              >
                <PatternPanel color={practiceColor(index)} className="h-40 shrink-0">
                  <span className="absolute left-4 top-4 font-display text-xs text-white/90">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </PatternPanel>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl leading-snug text-navy-800">
                    {practice.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {practice.blurb}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* The way on to the full list sits under it, centred, once the
            reader has seen what is here. */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/practices"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
          >
            View all practice areas
            <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
