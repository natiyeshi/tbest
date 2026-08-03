"use client";

import { useEffect } from "react";

/**
 * Mounts once in the root layout. Watches every `[data-reveal]` element and,
 * as it scrolls into view, adds `.is-in` so it lifts and fades in (styling in
 * globals.css). A MutationObserver re-scans after client-side navigation so new
 * pages animate too.
 *
 * The hidden starting state is plain CSS on `[data-reveal]`; a <noscript> rule
 * and the reduced-motion media query both reveal everything when the animation
 * can't or shouldn't run. The effect is only ever additive — it never withholds
 * text. Under reduced motion this component reveals immediately rather than
 * observing scroll.
 */
export function ScrollReveal() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-in");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    // Anything already within (or near) the viewport is revealed straight away
    // from its layout box — no dependence on the observer's first callback, so
    // above-the-fold content is never left hidden. Everything else is handed to
    // the observer to reveal as it scrolls in.
    const scan = () => {
      const limit = window.innerHeight * 0.92;
      for (const el of document.querySelectorAll("[data-reveal]:not(.is-in)")) {
        const rect = el.getBoundingClientRect();
        if (rect.top < limit && rect.bottom > 0) reveal(el);
        else io.observe(el);
      }
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
