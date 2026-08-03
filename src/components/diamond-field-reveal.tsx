"use client";

import { useEffect, useRef } from "react";

import { DiamondField } from "@/components/brand";

/**
 * The diamond field with a cursor-following "spotlight": the whole field sits
 * at a low baseline opacity, and a radial mask that tracks the pointer lifts
 * the diamonds around the cursor to a brighter state. Only the ones near the
 * cursor brighten.
 *
 * The field is rendered at the *bright* end (its `className` opacity), and the
 * spotlight mask's alpha is `baselineAlpha` everywhere except inside the reveal
 * circle where it reaches 1 — so away from the cursor the field shows at
 * bright × baselineAlpha, and under the cursor at full bright.
 *
 * `fade="left"` wraps the whole thing in a second, static left-to-right mask so
 * the pattern is visible on the left and fades to nothing on the right —
 * including under the cursor, since the two masks multiply.
 */
export function DiamondFieldReveal({
  id,
  size,
  className,
  radius = 150,
  baselineAlpha = 0.78,
  fade = "none",
}: {
  id: string;
  size?: number;
  className?: string;
  radius?: number;
  baselineAlpha?: number;
  fade?: "none" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour reduced motion by leaving the field at its static baseline.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const spotlight = `radial-gradient(circle ${radius}px at var(--mx, -300px) var(--my, -300px), #000 0%, #000 25%, rgba(0,0,0,${baselineAlpha}) 80%)`;
  const leftFade =
    "linear-gradient(to right, #000 0%, #000 34%, transparent 72%)";

  const spotlightLayer = (
    <div
      className="absolute inset-0"
      style={{ WebkitMaskImage: spotlight, maskImage: spotlight }}
    >
      <DiamondField id={id} size={size} className={className} />
    </div>
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={
        fade === "left"
          ? { WebkitMaskImage: leftFade, maskImage: leftFade }
          : undefined
      }
    >
      {spotlightLayer}
    </div>
  );
}
