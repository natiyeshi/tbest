import { rankings } from "@/lib/recognition";

/**
 * Directory recognition — Chambers and IFLR1000 — presented as two cards: the
 * firm-wide banding with the reviewer's summary and pull-quotes, and the
 * partners' individual rankings.
 */
export function Recognition({
  heading = "Recognised by the market.",
  lead = "TBeST Law and its partners are ranked by the leading international legal directories.",
}: {
  heading?: string;
  lead?: string;
}) {
  return (
    <section
      data-nav-tone="light"
      className="border-t border-line bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow flex items-center gap-3 text-copper-500">
            <span className="h-px w-8 bg-copper-400" />
            Recognition
          </p>
          <h2 className="mt-7 font-display text-4xl leading-[1.12] tracking-tight text-brand-900 sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">{lead}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2" data-reveal>
          {rankings.map((ranking) => (
            <article
              key={ranking.source}
              className="flex flex-col rounded-2xl border border-line bg-bone p-8 lg:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-2xl text-brand-900">
                  {ranking.source}
                </p>
                <span className="shrink-0 rounded-full bg-brand-900 px-4 py-1.5 text-xs font-semibold text-white">
                  {ranking.tier}
                </span>
              </div>
              <p className="mt-2 eyebrow text-copper-500">{ranking.category}</p>

              {ranking.knownFor && (
                <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                  {ranking.knownFor}
                </p>
              )}

              {ranking.quotes && (
                <ul className="mt-6 space-y-4">
                  {ranking.quotes.map((quote) => (
                    <li
                      key={quote}
                      className="border-l-2 border-copper-400 pl-4 font-display text-lg italic leading-snug text-brand-900"
                    >
                      &ldquo;{quote}&rdquo;
                    </li>
                  ))}
                </ul>
              )}

              {ranking.partners && (
                <ul className="mt-6 divide-y divide-line">
                  {ranking.partners.map((partner) => (
                    <li key={partner.name} className="py-4 first:pt-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-display text-lg text-brand-900">
                          {partner.name}
                        </p>
                        <p className="shrink-0 text-right text-xs font-semibold text-copper-600">
                          {partner.rating}
                        </p>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {partner.area}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
