"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric stat from zero up to its value the first time it scrolls
 * into view. Preserves any prefix/suffix (e.g. "50+") and the original digit
 * width (so "09" counts up and stays two digits). Renders the final value for
 * SSR / no-JS / reduced-motion, so the number is always correct without the
 * animation.
 */
export function CountUp({
  value,
  className,
  durationMs = 1300,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\D*)(\d+)(.*)$/);
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits, 10);
    const pad = digits.length;
    const format = (n: number) =>
      prefix + String(n).padStart(pad, "0") + suffix;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();

        const start = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        setDisplay(format(0));
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / durationMs);
          setDisplay(format(Math.round(ease(p) * target)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
