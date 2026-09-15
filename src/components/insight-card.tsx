import Image from "next/image";
import Link from "next/link";

import { formatInsightDate } from "@/lib/insights";
import { insightArt } from "@/lib/practice-images";
import type { PublicInsight } from "@/lib/public-content";

/** Card used across the Updates index and the per-stream listing pages. */
export function InsightCard({ insight }: { insight: PublicInsight }) {
  return (
    <Link
      href={`/updates/${insight.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-900/[0.06]"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={insightArt(insight)}
          alt=""
          fill
          sizes="(min-width: 640px) 24rem, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/45 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold text-copper-600">
          {insight.topic}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <time dateTime={insight.date} className="text-xs text-muted">
          {formatInsightDate(insight.date)}
        </time>
        <h3 className="mt-3 font-display text-lg leading-snug text-brand-900 transition-colors group-hover:text-copper-600">
          {insight.title}
        </h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
          {insight.summary}
        </p>
        {insight.authors.length > 0 && (
          <p className="mt-5 text-sm text-brand-800">
            By {insight.authors.join(" and ")}
          </p>
        )}
      </div>
    </Link>
  );
}
