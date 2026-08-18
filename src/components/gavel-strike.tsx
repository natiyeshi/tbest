"use client";

import { useEffect, useRef } from "react";

/**
 * A judge's gavel that swings down and strikes its sound block as the section
 * scrolls up through the viewport. The gavel angle is driven directly by scroll
 * position, so the hammer "lands" its hit as the section reaches mid-screen —
 * and lifts back up if the reader scrolls away. Falls still for reduced motion.
 */
export function GavelStrike({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gavelRef = useRef<SVGGElement>(null);
  const impactRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const gavel = gavelRef.current;
    if (!wrap || !gavel) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const RAISED = 48; // degrees the gavel is lifted before the strike
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    let raf = 0;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 while the panel sits low in the viewport, 1 once it reaches mid-screen.
      const start = vh * 0.85;
      const end = vh * 0.4;
      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      const angle = reduce ? 0 : RAISED * (1 - easeOut(p));
      gavel.setAttribute("transform", `rotate(${angle} 300 78)`);
      if (impactRef.current) {
        impactRef.current.style.opacity = !reduce && p > 0.92 ? "1" : "0";
      }
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

  return (
    <div ref={wrapRef} className={className}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100 p-8 sm:p-10">
        <svg
          viewBox="0 0 360 280"
          className="w-full"
          role="img"
          aria-label="A judge's gavel striking its block"
        >
          {/* Ground shadow */}
          <ellipse cx="160" cy="255" rx="120" ry="9" fill="#00262a" opacity="0.07" />
          {/* Base plate */}
          <rect x="56" y="230" width="208" height="18" rx="9" fill="var(--color-brand-300)" />
          {/* Sound block the gavel strikes */}
          <rect x="106" y="198" width="98" height="32" rx="7" fill="var(--color-brand-200)" />
          <rect x="106" y="198" width="98" height="12" rx="6" fill="var(--color-brand-100)" />

          {/* Gavel — rotates around the pivot (300, 78) to strike */}
          <g ref={gavelRef} transform="rotate(48 300 78)">
            <line
              x1="168"
              y1="170"
              x2="298"
              y2="80"
              stroke="var(--color-brand-800)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <circle cx="300" cy="78" r="9" fill="var(--color-brand-800)" />
            <rect x="104" y="158" width="112" height="40" rx="20" fill="var(--color-brand-900)" />
            <rect x="110" y="158" width="12" height="40" rx="6" fill="var(--color-copper-500)" />
            <rect x="198" y="158" width="12" height="40" rx="6" fill="var(--color-copper-500)" />
          </g>

          {/* Impact marks — flash in as the gavel lands */}
          <g
            ref={impactRef}
            style={{ opacity: 0, transition: "opacity 0.2s ease" }}
            stroke="var(--color-copper-500)"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <line x1="146" y1="192" x2="134" y2="178" />
            <line x1="160" y1="190" x2="160" y2="172" />
            <line x1="174" y1="192" x2="186" y2="178" />
          </g>
        </svg>
      </div>
    </div>
  );
}
