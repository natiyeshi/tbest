"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { BrandArrow } from "@/components/brand";
import { TypeIn } from "@/components/type-in";
import { practices } from "@/lib/practices";
import { getPracticeImage } from "@/lib/practice-images";

export function Practices() {
  const [active, setActive] = useState(0);

  return (
    <section data-nav-tone="dark" className="relative bg-brand-900 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className="flex flex-col gap-8 pb-12 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-copper-300">
              <span className="h-px w-8 bg-copper-400" />
              <TypeIn text="Practice areas" />
            </p>
            <TypeIn
              as="h2"
              text="Nine practices, advised end to end."
              className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-white sm:text-5xl"
            />
          </div>
          <Link
            href="/practices"
            className="group inline-flex shrink-0 items-center gap-2.5 self-start text-sm font-semibold text-copper-300 transition-colors hover:text-copper-200 lg:self-auto"
          >
            View all practice areas
            <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
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
                  className="group flex items-center gap-5 border-b border-white/10 py-5"
                >
                  <span
                    className={`font-display text-sm transition-colors ${
                      index === active ? "text-copper-300" : "text-white/40"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-2xl leading-snug transition-colors ${
                      index === active ? "text-white" : "text-white/55"
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
                {practices.map((practice, index) => (
                  <Image
                    key={practice.slug}
                    src={getPracticeImage(practice.slug)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40rem, 0px"
                    className={`object-cover transition-opacity duration-700 ease-out ${
                      index === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />

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
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-100/85">
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
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={getPracticeImage(practice.slug)}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
                  <span className="absolute left-4 top-4 font-display text-xs text-copper-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl leading-snug text-white">
                    {practice.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-100/70">
                    {practice.blurb}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
