import Image from "next/image";
import Link from "next/link";

import { InsightThumb } from "@/components/insight-thumb";
import { formatInsightDate } from "@/lib/insights";
import type { PublicInsight } from "@/lib/public-content";

/**
 * Card used across the Updates index and the per-stream listing pages.
 *
 * The thumbnail is a flat colour panel rather than a photograph — the firm
 * asked for that across the Legal Updates and Blog listings, where the same
 * three stock skylines were repeating down the page. An article that carries
 * its own artwork, uploaded through the dashboard, still shows it; the drawn
 * panel is what every other article gets.
 */
export function InsightCard({ insight }: { insight: PublicInsight }) {
  return (
    <Link
      href={`/updates/${insight.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-800/[0.06]"
    >
      {insight.image ? (
        <div className="relative h-40 overflow-hidden">
          <Image
            src={insight.image}
            alt=""
            fill
            sizes="(min-width: 640px) 24rem, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      ) : (
        <InsightThumb
          topic={insight.topic}
          category={insight.category}
          className="h-40 shrink-0"
        />
      )}
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <time dateTime={insight.date} className="text-xs text-muted">
          {formatInsightDate(insight.date)}
        </time>
        <h3 className="mt-3 font-display text-lg leading-snug text-navy-800 transition-colors group-hover:text-copper-600">
          {insight.title}
        </h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
          {insight.summary}
        </p>
        {insight.authors.length > 0 && (
          <p className="mt-5 text-sm text-navy-700">
            By {insight.authors.join(" and ")}
          </p>
        )}
      </div>
    </Link>
  );
}
