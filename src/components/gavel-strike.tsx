"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import hammer from "../../public/hammer.png";

/**
 * The firm's gavel swings down and strikes as the section scrolls up through
 * the viewport. The swing angle is driven directly by scroll position —
 * pivoting on the handle knob — so the head arcs down and lands once the
 * section is well into view, then lifts back up if the reader scrolls away.
 *
 * There is no drawn bench: a soft elliptical shadow on the surface below the
 * head (CSS, globals.css) implies what is being struck, and it compresses on
 * impact alongside a spark flash.
 *
 * The constants below are the tuning knobs for the swing.
 */
const PIVOT = "86% 79%"; // transform-origin: the handle knob
const RAISED = 20; // degrees — gavel lifted, before the strike
const STRUCK = -22; // degrees — head landed
/** Scroll window, as fractions of viewport height, over which the swing runs.
 *  Lower `END` = the strike lands later in the scroll. */
const START = 0.95;
const END = 0.3;

export function GavelStrike({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const gavelRef = useRef<HTMLDivElement>(null);
  const struck = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const gavel = gavelRef.current;
    const scene = sceneRef.current;
    if (!wrap || !gavel || !scene) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Ease *in*: the gavel hangs raised through most of the scroll, then whips
    // down at the end — so the strike reads as a strike, and lands late enough
    // that the reader is looking at it.
    const easeIn = (t: number) => Math.pow(t, 3);

    let raf = 0;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = (vh * START - rect.top) / (vh * START - vh * END);
      p = Math.max(0, Math.min(1, p));
      const e = easeIn(p);
      const angle = reduce ? STRUCK : RAISED * (1 - e) + STRUCK * e;
      gavel.style.transform = `rotate(${angle}deg)`;

      const isStruck = !reduce && p > 0.95;
      if (isStruck !== struck.current) {
        struck.current = isStruck;
        scene.classList.toggle("is-struck", isStruck);
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
      <div
        ref={sceneRef}
        className="gavel-scene relative mx-auto aspect-square w-full max-w-[26rem]"
      >
        {/* Surface shadow — stands in for the bench the gavel strikes */}
        <div className="gv-shadow pointer-events-none absolute bottom-[11%] left-[3%] h-[9%] w-[50%]" />

        {/* Impact sparks — flash on the strike */}
        <div className="gv-fx pointer-events-none absolute left-[2%] top-[64%] h-[18%] w-[26%]">
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <g
              stroke="var(--color-copper-500)"
              strokeWidth="7"
              strokeLinecap="round"
            >
              <line x1="52" y1="58" x2="34" y2="30" />
              <line x1="55" y1="54" x2="55" y2="20" />
              <line x1="60" y1="58" x2="80" y2="32" />
            </g>
          </svg>
        </div>

        {/* The gavel — rotates around the handle knob */}
        <div
          ref={gavelRef}
          className="absolute inset-0"
          style={{
            transformOrigin: PIVOT,
            transform: `rotate(${RAISED}deg)`,
            willChange: "transform",
          }}
        >
          <Image
            src={hammer}
            alt="A judge's gavel"
            fill
            sizes="(min-width: 1024px) 26rem, 90vw"
            className="object-contain drop-shadow-[0_14px_18px_rgba(0,38,42,0.22)]"
          />
        </div>
      </div>
    </div>
  );
}
