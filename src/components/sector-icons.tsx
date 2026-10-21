import type { ReactNode } from "react";

/**
 * A distinct line icon per sector, drawn in the same thin brand-geometry style
 * as the firm pillars (40×40 artboard, 1.6 stroke). Keyed by sector slug so each
 * sector card and the home sector stage can show its own mark rather than one
 * shared image.
 */
const iconProps = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const icons: Record<string, ReactNode> = {
  // Financial Services — a bank colonnade
  "financial-services": (
    <svg {...iconProps}>
      <path d="M6 15 20 7l14 8" />
      <path d="M8 15v13M16 15v13M24 15v13M32 15v13" />
      <path d="M5 31h30" />
    </svg>
  ),
  // Private Equity — a rising growth line
  "private-equity": (
    <svg {...iconProps}>
      <path d="M6 30V9" />
      <path d="M6 30h27" />
      <path d="M11 25l6-7 5 4 8-11" />
      <path d="M30 11h4v4" />
    </svg>
  ),
  // Mining and Energy — a pickaxe over the seam, and the spark it is dug for.
  // Redrawn at the firm's request to read closer to the mark on their previous
  // site; see the note at the foot of this file.
  "mining-and-energy": (
    <svg {...iconProps}>
      <path d="M4 34l10-16 5 7 4-5 6 8" />
      <path d="M35 34H4" />
      <path d="M14 16 26 4" />
      <path d="M20 4c3.5 0 6.5 1.4 8.5 3.5M20 10.5c2 0 3.7.8 5 2" />
      <path d="M30.5 14.5 27 21h4l-3.5 6" />
    </svg>
  ),
  // NGOs — a heart cradled in a hand
  ngos: (
    <svg {...iconProps}>
      <path d="M20 15c-2-3-7-3-8 1-1 3 2 6 8 10 6-4 9-7 8-10-1-4-6-4-8-1Z" />
      <path d="M6 24v9M6 27c3-2 6-1 9 1" />
    </svg>
  ),
  // Real Estate and Conveyancing — a house with a key
  "real-estate-and-conveyancing": (
    <svg {...iconProps}>
      <path d="M8 18l10-8 10 8" />
      <path d="M11 17v13h14V17" />
      <circle cx="18" cy="24" r="2.2" />
      <path d="M20 24h4v3" />
    </svg>
  ),
  // Aviation — an aircraft seen from above, wings swept, with its vapour
  // trail. Redrawn at the firm's request; see the note at the foot of the file.
  aviation: (
    <svg {...iconProps}>
      <path d="M20 4c1.8 0 3 2.2 3 5v6l11 7v3.5l-11-3.5v6l3.5 3V34L20 31.5 13.5 34v-3l3.5-3v-6L6 25.5V22l11-7V9c0-2.8 1.2-5 3-5Z" />
    </svg>
  ),
  // Hospitality and Leisure — a concierge bell
  "hospitality-and-leisure": (
    <svg {...iconProps}>
      <path d="M8 27a12 12 0 0 1 24 0Z" />
      <path d="M20 15v-3M17 12h6" />
      <path d="M5 31h30" />
    </svg>
  ),
  // Telecom and Information Technology — a broadcast antenna
  // Telecom and Information Technology — a transmission mast, broadcasting.
  // Redrawn at the firm's request; see the note at the foot of the file.
  "telecom-and-information-technology": (
    <svg {...iconProps}>
      <circle cx="20" cy="12" r="2.5" />
      <path d="M16.5 34 20 15l3.5 19" />
      <path d="M17.6 27.5h4.8" />
      <path d="M13.5 34h13" />
      <path d="M13.6 5.6a9 9 0 0 0 0 12.8M26.4 5.6a9 9 0 0 1 0 12.8" />
      <path d="M8.6 2.2a16 16 0 0 0 0 19.6M31.4 2.2a16 16 0 0 1 0 19.6" />
    </svg>
  ),
  // Media, Sports and Entertainment — a play button
  "media-sports-and-entertainment": (
    <svg {...iconProps}>
      <rect x="6" y="9" width="28" height="22" rx="4" />
      <path d="M17 16l8 4-8 4v-8Z" />
    </svg>
  ),
};

export function getSectorIcon(slug: string): ReactNode {
  return icons[slug] ?? null;
}

/*
 * A note on the three redrawn marks above.
 *
 * The firm asked whether the vectors for telecom, mining and aviation could
 * come across from tbestlaw.com. They cannot be lifted: the old site draws
 * those marks from Divi's icon font — they are glyphs in a licensed typeface
 * (U+F5B0, U+F4C0 and U+F4BE), not SVG files sitting in the media library, so
 * there is nothing to copy over and no licence to copy it under.
 *
 * These three are therefore redrawn here in the site's own line style, on the
 * same 40x40 artboard at the same 1.6 stroke as the other six, to read as
 * closely as possible to what the old marks showed. If the firm's designer has
 * the original artwork as .svg or .ai, dropping the paths into these three
 * entries is the only change needed.
 */
