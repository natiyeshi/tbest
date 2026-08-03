"use client";

import type { CSSProperties, ElementType } from "react";
import { useEffect, useRef } from "react";

/**
 * Writes its text out character by character the first time it scrolls into
 * view, with a blinking caret that fades once the line is finished — a light
 * "being typed" flourish for section topics and headings.
 *
 * The full text is always in the DOM (and exposed to assistive tech via
 * aria-label), so it is never withheld: with JS off the <noscript> rule in
 * globals.css shows every character, and reduced motion writes instantly.
 */
export function TypeIn({
  text,
  as: Tag = "span",
  className = "",
  caret = true,
  speed = 26,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  caret?: boolean;
  /** Milliseconds between characters. */
  speed?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-writing");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-writing");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const chars = [...text];

  return (
    <Tag
      ref={ref}
      data-typein=""
      aria-label={text}
      className={className}
      style={{ "--tw-speed": `${speed}ms`, "--tw-n": chars.length } as CSSProperties}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="tw-char"
          style={{ "--i": i } as CSSProperties}
        >
          {ch}
        </span>
      ))}
      {caret && <span aria-hidden="true" className="tw-caret" />}
    </Tag>
  );
}
