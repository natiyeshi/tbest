/**
 * The featured image on an insight card.
 *
 * The firm asked for photographs to come off the Legal Updates and Blog
 * listings — the same three stock skylines were repeating down the page — and
 * for solid-colour thumbnails in their place, like the "Legal Update" tiles on
 * their previous site and the flat panels on Dablo's insights page.
 *
 * So this draws one rather than loading one: a flat brand colour chosen from
 * the article's topic, the firm's diamond motif behind it, and the category
 * across the face. It scales to any article the firm publishes later without
 * anyone having to find a picture for it, and it costs no bytes.
 */

/**
 * One colour per topic, all drawn from the brand palette so a listing page
 * reads as one set. Topics the firm adds later fall back to navy.
 */
const topicColors: Record<string, string> = {
  Investment: "bg-navy-800",
  Tax: "bg-copper-600",
  Corporate: "bg-navy-700",
  Banking: "bg-brand-700",
  "Real Estate": "bg-copper-700",
  "Data Protection": "bg-navy-900",
  NGOs: "bg-brand-600",
  Immigration: "bg-navy-600",
  Insolvency: "bg-copper-500",
  "Energy and Environment": "bg-brand-800",
  Firm: "bg-navy-800",
};

const FALLBACK = "bg-navy-800";

export function InsightThumb({
  topic,
  category,
  className = "",
}: {
  topic: string;
  category?: string;
  /** Sizing and rounding come from the card; this only paints the panel. */
  className?: string;
}) {
  const color = topicColors[topic] ?? FALLBACK;

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${color} ${className}`}
    >
      {/* The firm's diamond, oversized and held at low contrast so it reads as
          texture rather than as a second element competing with the label. */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMaxYMid slice"
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

      <div className="relative flex h-full flex-col justify-end p-5">
        {category && (
          <p className="eyebrow text-white/70">{category}</p>
        )}
        <p className="mt-1.5 font-display text-xl leading-none text-white">
          {topic}
        </p>
      </div>
    </div>
  );
}
