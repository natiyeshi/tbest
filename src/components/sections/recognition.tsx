import { TypeIn } from "@/components/type-in";
import { rankings } from "@/lib/recognition";

/**
 * Directory recognition — Legal 500, Chambers and IFLR1000 — presented as one
 * card each: the firm-wide banding with the reviewer's summary and pull-quotes,
 * and the partners' individual rankings.
 *
 * Three directories, three columns on a full-size screen. Below that a row of
 * three is too narrow to read, so the cards pair up and an odd one out takes
 * the whole row rather than sitting beside an empty half. The ranking itself leads each
 * card in large type, since it is the claim the card exists to make, and the
 * link out sits at the foot so the cards finish level however much each one
 * says.
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
      id="recognition"
      data-nav-tone="light"
      className="border-t border-line bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 xl:gap-16"
          data-reveal
        >
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-copper-500">
              <span className="h-px w-8 bg-copper-400" />
              <TypeIn text="Recognition" />
            </p>
            <TypeIn
              as="h2"
              text={heading}
              className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-navy-800 sm:text-5xl"
            />
          </div>
          <p className="text-base leading-relaxed text-muted lg:col-span-5 lg:pb-2">
            {lead}
          </p>
        </div>

        <div
          className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 xl:grid-cols-3"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {rankings.map((ranking, index) => (
            <article
              key={ranking.source}
              className="group @container relative flex flex-col overflow-hidden rounded-3xl md:max-xl:odd:last:col-span-2 border border-line bg-bone p-8 transition-all duration-300 hover:-translate-y-1 hover:border-copper-200 hover:shadow-2xl hover:shadow-navy-800/[0.07] lg:p-9"
            >
              {/* A copper edge along the top, and the card's number set large
                  and faint in the corner behind the content. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-copper-500 via-copper-400 to-copper-200"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 right-5 font-display text-[7.5rem] leading-none text-navy-800/[0.045] select-none"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="relative eyebrow text-copper-500">{ranking.source}</p>

              <div className="relative mt-5">
                {ranking.tier ? (
                  <p className="font-display text-4xl leading-none tracking-tight text-navy-800 xl:text-[2.75rem]">
                    {ranking.tier}
                  </p>
                ) : null}
                <p className="mt-3 text-sm font-medium leading-snug text-navy-700">
                  {ranking.category}
                </p>
              </div>

              <span aria-hidden="true" className="relative mt-7 block h-px bg-line" />

              {ranking.knownFor && (
                <p className="relative mt-7 text-[0.9375rem] leading-relaxed text-muted">
                  {ranking.knownFor}
                </p>
              )}

              {ranking.quotes && (
                <ul className="relative mt-6 space-y-4">
                  {ranking.quotes.map((quote) => (
                    <li
                      key={quote}
                      className="rounded-2xl bg-white px-5 py-4 font-display text-lg italic leading-snug text-navy-800"
                    >
                      <span aria-hidden="true" className="mr-1 text-copper-400">
                        &ldquo;
                      </span>
                      {quote}
                      <span aria-hidden="true" className="ml-0.5 text-copper-400">
                        &rdquo;
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {ranking.partners && (
                <>
                  <p className="relative mt-7 eyebrow text-navy-800/45">
                    Ranked partners
                  </p>
                  <ul className="relative mt-3 grid gap-3 @2xl:grid-cols-3">
                    {ranking.partners.map((partner) => (
                      <li
                        key={partner.name}
                        className="rounded-2xl bg-white px-5 py-4"
                      >
                        <p className="font-display text-lg leading-snug text-navy-800">
                          {partner.name}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-copper-600">
                          {partner.rating}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">
                          {partner.area}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {ranking.href && (
                <a
                  href={ranking.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
                >
                  {ranking.hrefLabel ?? `View the ${ranking.source} ranking`}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
