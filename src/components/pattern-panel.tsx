import type { ReactNode } from "react";

/**
 * A flat brand-colour panel with the firm's diamond held behind it at low
 * contrast — the drawn tile the Updates listings use in place of a photograph,
 * and the practice-area cards now share.
 */
export function PatternPanel({
  color,
  className = "",
  children,
}: {
  /** A background utility, e.g. `bg-navy-800`. */
  color: string;
  /** Sizing and rounding come from the caller; this only paints the panel. */
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${color} ${className}`}>
      {/* The firm's diamond, oversized and held at low contrast so it reads as
          texture rather than as a second element competing with the label. */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden="true"
        className="absolute -right-6 top-1/2 h-[150%] w-auto -translate-y-1/2 text-white/[0.07]"
      >
        <path d="M50 4 L96 50 L50 96 L4 50 Z" fill="currentColor" />
        <path
          d="M50 20 L80 50 L50 80 L20 50 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
      {children}
    </div>
  );
}

/**
 * The two brand colours the practice areas alternate between, so neighbouring
 * cards never share one. Written out in full so Tailwind can see them.
 */
const PRACTICE_COLORS = ["bg-navy-800", "bg-copper-600"] as const;

export function practiceColor(index: number): string {
  return PRACTICE_COLORS[index % PRACTICE_COLORS.length];
}
