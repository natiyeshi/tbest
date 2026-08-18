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
  // Mining and Energy — a mountain range and a spark
  "mining-and-energy": (
    <svg {...iconProps}>
      <path d="M4 30l9-14 6 8 4-5 8 11" />
      <path d="M23 4l-3 6h4l-3 6" />
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
  // Aviation — an aircraft in flight
  aviation: (
    <svg {...iconProps}>
      <path d="M6 22l28-9-8 22-6-8-8 6v-8Z" />
      <path d="M20 19l6 8" />
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
  "telecom-and-information-technology": (
    <svg {...iconProps}>
      <circle cx="20" cy="17" r="3" />
      <path d="M20 20v14" />
      <path d="M13 24l7-4 7 4" />
      <path d="M11 12a12 12 0 0 0 0 10M29 12a12 12 0 0 1 0 10" />
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
