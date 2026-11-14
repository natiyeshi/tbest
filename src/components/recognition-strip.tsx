import Link from "next/link";

import { rankings } from "@/lib/recognition";

/**
 * The band directly under the landing hero.
 *
 * It used to count things — fifty years, nine practices, nine sectors. The firm
 * asked for that space to carry their directory recognition instead, so it now
 * names Legal 500, Chambers and Partners and IFLR1000 and links through to the
 * recognition section, where the band or tier and category are shown.
 */
export function RecognitionStrip() {
  return (
    <section
      data-nav-tone="dark"
      aria-label="Directory recognition"
      className="border-b border-white/10 bg-navy-800"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ul className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {rankings.map((ranking) => (
            <li
              key={ranking.source}
              className="py-5 sm:py-7 sm:px-7 sm:first:pl-0 lg:sm:px-10"
            >
              <Link href="/about-us#recognition" className="group block">
                <p className="eyebrow text-copper-300">Ranked by</p>
                <p className="mt-2 font-display text-xl leading-tight text-white transition-colors group-hover:text-copper-200 sm:text-2xl">
                  {ranking.source}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
