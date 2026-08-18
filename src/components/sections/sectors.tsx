"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BrandArrow, LogoMark } from "@/components/brand";
import { getSectorIcon } from "@/components/sector-icons";
import { sectors } from "@/lib/sectors";

// How much scroll (in vh) each sector holds the stage. The section is this tall
// per sector; the inner panel pins at 100vh while you scroll through it.
const STEP_VH = 60;

export function Sectors() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const distance = Math.max(el.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), distance);
      const progress = scrolled / distance;
      const index = Math.min(
        sectors.length - 1,
        Math.floor(progress * sectors.length),
      );
      setActive(index);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Let the reader step out of the pinned section either way.
  const escapeUp = () => {
    const el = ref.current;
    if (!el) return;
    window.scrollTo({
      top: Math.max(el.offsetTop - window.innerHeight, 0),
      behavior: "smooth",
    });
  };
  const escapeDown = () => {
    const el = ref.current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop + el.offsetHeight, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      data-nav-tone="copper"
      className="relative bg-copper-600"
      style={{ height: `${sectors.length * STEP_VH}svh` }}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <LogoMark
          ringWidth={3}
          className="pointer-events-none absolute -left-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 text-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-copper-500/40 via-transparent to-copper-700/50"
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-10">
          {/* The sector currently on the stage */}
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-copper-100">
              <span className="h-px w-8 bg-copper-100/70" />
              Sectors
              <span className="text-copper-100/80">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(sectors.length).padStart(2, "0")}
              </span>
            </p>

            <div className="relative mt-7 min-h-[21rem]">
              {sectors.map((sector, index) => (
                <div
                  key={sector.slug}
                  aria-hidden={index !== active}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-8 opacity-0"
                  }`}
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white [&_svg]:h-7 [&_svg]:w-7">
                    {getSectorIcon(sector.slug)}
                  </div>
                  <h2 className="font-display text-3xl leading-[1.06] tracking-tight text-white sm:text-5xl">
                    {sector.name}
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-copper-50/90 sm:text-base">
                    {sector.intro[0]}
                  </p>
                  <Link
                    href={`/sectors/${sector.slug}`}
                    className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-copper-700 transition-colors hover:bg-copper-50"
                  >
                    Explore this sector
                    <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* The full list, with the active sector lit */}
          <ul className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            {sectors.map((sector, index) => (
              <li key={sector.slug} className="border-b border-white/15">
                <Link
                  href={`/sectors/${sector.slug}`}
                  className="flex items-baseline gap-4 py-3"
                >
                  <span
                    className={`font-display text-xs transition-colors ${
                      index === active ? "text-white" : "text-white/40"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display leading-snug transition-all duration-300 ${
                      index === active
                        ? "text-xl text-white sm:text-2xl"
                        : "text-lg text-white/45"
                    }`}
                  >
                    {sector.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Escape controls — step out of the pinned section either way */}
        <div className="absolute right-6 bottom-8 flex flex-col gap-2 lg:right-10">
          <button
            type="button"
            onClick={escapeUp}
            aria-label="Skip to before this section"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M4 10l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={escapeDown}
            aria-label="Skip past this section"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${((active + 1) / sectors.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
