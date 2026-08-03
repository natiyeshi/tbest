import { cloneElement, type CSSProperties, type ReactElement } from "react";

import { practices } from "@/lib/practices";

/**
 * A 3D stage for the hero: layered glass panels floating at different depths
 * inside a perspective viewport, with a geometric motif per practice area
 * sitting closest to the viewer. The whole group swings slowly (`scene-orbit`)
 * so the panels parallax against one another — real depth from CSS transforms,
 * no WebGL and no image assets.
 *
 * The motif redraws itself each time the active practice changes: every stroke
 * is normalised with pathLength="1" and drawn via `stroke-dashoffset` (the
 * `.motif-stroke` class), staggered so the shape assembles line by line.
 *
 * Motifs are deliberately abstract technical geometry. No gavels, scales or
 * columns: those are the exact clichés this firm should not be wearing.
 */

const svgProps = {
  viewBox: "0 0 120 120",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * The shapes for each motif, keyed by the exact practice name. Stored as arrays
 * so each element can be cloned with the draw attributes; the enclosing <svg>
 * and stroke styling are applied by MotifSvg.
 */
const MOTIFS: Record<string, ReactElement[]> = {
  // Capital stepping upward
  Investment: [
    <rect key="a" x="18" y="72" width="20" height="30" rx="3" />,
    <rect key="b" x="50" y="54" width="20" height="48" rx="3" />,
    <rect key="c" x="82" y="32" width="20" height="70" rx="3" />,
    <polyline key="d" points="18,44 44,30 70,36 100,14" opacity="0.75" />,
    <polyline key="e" points="88,14 100,14 100,26" opacity="0.75" />,
  ],
  // Structure nested inside structure
  Corporate: [
    <rect key="a" x="16" y="16" width="88" height="88" rx="8" />,
    <rect key="b" x="36" y="36" width="48" height="48" rx="5" opacity="0.75" />,
    <rect key="c" x="54" y="54" width="12" height="12" rx="2" />,
  ],
  // Two bodies becoming one
  "Mergers and Acquisitions": [
    <circle key="a" cx="46" cy="60" r="28" />,
    <circle key="b" cx="74" cy="60" r="28" opacity="0.75" />,
    <line key="c" x1="60" y1="36" x2="60" y2="84" opacity="0.5" />,
  ],
  // Movement across a border
  "Employment and Corporate Immigration": [
    <line key="a" x1="60" y1="14" x2="60" y2="106" opacity="0.6" />,
    <circle key="b" cx="30" cy="44" r="11" />,
    <path key="c" d="M14 76c0-9 7-16 16-16s16 7 16 16" />,
    <polyline key="d" points="74,84 96,84 96,62" opacity="0.75" />,
    <polyline key="e" points="86,72 96,62 106,72" opacity="0.75" />,
  ],
  // A network of rights
  "Intellectual Property and Technology": [
    <line key="a" x1="60" y1="26" x2="26" y2="82" opacity="0.6" />,
    <line key="b" x1="60" y1="26" x2="94" y2="82" opacity="0.6" />,
    <line key="c" x1="26" y1="82" x2="94" y2="82" opacity="0.6" />,
    <line key="d" x1="60" y1="26" x2="60" y2="62" opacity="0.6" />,
    <circle key="e" cx="60" cy="26" r="9" />,
    <circle key="f" cx="26" cy="82" r="9" />,
    <circle key="g" cx="94" cy="82" r="9" />,
    <circle key="h" cx="60" cy="62" r="6" />,
  ],
  // Positions measured against each other
  Competition: [
    <line key="a" x1="60" y1="16" x2="60" y2="104" opacity="0.4" />,
    <rect key="b" x="16" y="46" width="30" height="14" rx="3" />,
    <rect key="c" x="16" y="68" width="18" height="14" rx="3" opacity="0.75" />,
    <rect key="d" x="74" y="46" width="30" height="14" rx="3" opacity="0.75" />,
    <rect key="e" x="74" y="68" width="22" height="14" rx="3" />,
  ],
  // Layers, one lifted out
  Tax: [
    <rect key="a" x="20" y="76" width="80" height="16" rx="3" />,
    <rect key="b" x="20" y="54" width="80" height="16" rx="3" opacity="0.75" />,
    <rect key="c" x="38" y="26" width="80" height="16" rx="3" opacity="0.55" />,
    <line key="d" x1="20" y1="34" x2="30" y2="34" opacity="0.6" />,
  ],
  // A stack coming apart and back together
  "Insolvency and Corporate Restructuring": [
    <rect key="a" x="24" y="78" width="72" height="16" rx="3" />,
    <rect key="b" x="42" y="54" width="72" height="16" rx="3" opacity="0.7" />,
    <rect key="c" x="12" y="30" width="60" height="16" rx="3" opacity="0.55" />,
    <polyline key="d" points="94,34 106,44 94,54" opacity="0.75" />,
  ],
  // Two sides meeting at a pivot
  "Dispute Resolution": [
    <line key="a" x1="60" y1="18" x2="60" y2="102" />,
    <polyline key="b" points="20,46 44,46 34,36" opacity="0.75" />,
    <polyline key="c" points="44,46 34,56" opacity="0.75" />,
    <polyline key="d" points="100,74 76,74 86,64" opacity="0.75" />,
    <polyline key="e" points="76,74 86,84" opacity="0.75" />,
    <circle key="f" cx="60" cy="60" r="7" />,
  ],
};

/** Wraps a motif's shapes in the shared <svg> and gives each a staggered draw. */
function MotifSvg({ shapes }: { shapes: ReactElement[] }) {
  return (
    <svg {...svgProps} className="h-full w-full">
      {shapes.map((shape, index) =>
        cloneElement(shape, {
          pathLength: 1,
          className: "motif-stroke",
          style: { animationDelay: `${index * 0.1}s` },
        } as { pathLength: number; className: string; style: CSSProperties }),
      )}
    </svg>
  );
}

function layer(z: number, extra: CSSProperties = {}): CSSProperties {
  return { transform: `translateZ(${z}px)`, ...extra };
}

/** The depth backdrop — identical for every practice, so it renders once.
 *  Toned for the dark hero: frosted glass panels over the photograph. */
function SceneBackdrop() {
  return (
    <>
      {/* Deepest panel — a soft slab well behind everything */}
      <div
        className="absolute inset-[4%] rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-brand-600/25 to-brand-900/10 backdrop-blur-sm"
        style={layer(-110)}
      />

      {/* Mid panel — the lit face the motif sits on */}
      <div
        className="absolute inset-[15%] rounded-[2rem] border border-copper-300/30 bg-gradient-to-br from-brand-500/40 via-brand-700/30 to-brand-900/20 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-md"
        style={layer(-30)}
      />

      {/* Accent chips for parallax at the front and back */}
      <div
        className="absolute top-[13%] right-[12%] h-10 w-10 rounded-xl border border-copper-300/40 bg-copper-500/25 animate-[scene-float_11s_ease-in-out_infinite_alternate]"
        style={layer(120)}
      />
      <div
        className="absolute bottom-[15%] left-[10%] h-7 w-7 rounded-lg border border-white/20 bg-brand-300/20 animate-[scene-float_14s_ease-in-out_infinite_alternate]"
        style={layer(95)}
      />
      <div
        className="absolute bottom-[26%] right-[20%] h-4 w-4 rounded bg-copper-400/50"
        style={layer(140)}
      />
    </>
  );
}

export function ServiceStage({ active }: { active: number }) {
  const name = practices[active]?.name ?? practices[0].name;

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[32rem]"
    >
      {/* Warm glow pooled under the stage */}
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(211,107,52,0.16),transparent_66%)] blur-2xl" />

      <div className="h-full w-full" style={{ perspective: "1100px" }}>
        <div
          className="h-full w-full animate-[scene-orbit_24s_ease-in-out_infinite_alternate]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <SceneBackdrop />

          {/* Motif closest to the viewer. Keyed by `active` so it remounts — and
              therefore redraws — each time the practice changes. */}
          <div
            key={active}
            className="absolute inset-[27%]"
            style={layer(60)}
          >
            <div className="motif-appear h-full w-full text-copper-200">
              <MotifSvg shapes={MOTIFS[name]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
