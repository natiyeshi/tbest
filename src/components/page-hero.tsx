import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

import { LogoMark } from "@/components/brand";
import { TypeIn } from "@/components/type-in";

export type Crumb = { label: string; href?: string };

/**
 * The header band that opens every interior page.
 *
 * It used to be dark on every page, with a photograph, two stacked scrims, a
 * diamond field and a copper glow all in the same band. The firm read that as
 * "too dark, particularly because of the additional visual layers", so for a
 * while this carried a photograph and one scrim where a page had a picture,
 * and flat paper where it didn't. Flat paper reads as finished, not as
 * generic — it was never asked for; it is what a band looks like with nothing
 * put in it. The band is dark again, but still one layer, not four:
 *
 *  - a photograph, where the page has one worth showing: one scrim, and the
 *    same slow one-shot zoom the landing hero now carries, so a still image
 *    is not a static image.
 *  - the firm's own mark, held as a single large ghost watermark, where it
 *    doesn't — never a tiled pattern, which was the layer the firm named.
 *
 * `index`/`count` draw a large ghost numeral beside the title on a page that
 * is one of a set — the third of ten practice areas, the sixth of nine
 * sectors — in the same hand as the numeral the landing hero's rotating panel
 * now carries, so the two read as one system rather than two different
 * redesigns.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  imagePosition = "center 42%",
  index,
  count,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  /** A bundled import, or a URL for artwork uploaded through the admin. */
  image?: string | StaticImageData;
  /**
   * Where the band sits over the photograph. The default suits a wide city
   * view; pass a lower value to keep more of the top of the picture, a higher
   * one to keep more of the bottom.
   */
  imagePosition?: string;
  /** This page's position in a numbered set, e.g. 3 of 10. Pass both or neither. */
  index?: number;
  count?: number;
}) {
  const numbered = index !== undefined && count !== undefined;

  return (
    <section
      data-nav-tone="dark"
      className="relative isolate overflow-hidden bg-navy-900 pt-32 pb-16 lg:pt-40 lg:pb-20"
    >
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover motion-safe:animate-[ken-burns_22s_ease-out_forwards]"
            style={{ objectPosition: imagePosition }}
          />
          {/* One scrim, not two: enough behind the heading to hold it, fading
              across the rest of the band so the photograph still reads. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/40 to-navy-900/5"
          />
        </>
      ) : (
        <LogoMark
          ringWidth={4}
          className="pointer-events-none absolute -right-16 -bottom-20 h-72 w-72 text-copper-500/[0.1] lg:-right-10 lg:-bottom-24 lg:h-96 lg:w-96"
        />
      )}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-navy-100/55">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-copper-300"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-navy-100/80">{crumb.label}</span>
                  )}
                  {index < crumbs.length - 1 && (
                    <span aria-hidden="true" className="text-navy-100/30">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="eyebrow flex items-center gap-3 text-copper-300">
              <span className="h-px w-8 bg-copper-400" />
              <TypeIn text={eyebrow} />
            </p>

            <TypeIn
              as="h1"
              text={title}
              speed={22}
              className="mt-6 block max-w-4xl font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            />

            {lead && (
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-navy-100/75 sm:text-lg">
                {lead}
              </p>
            )}
          </div>

          {numbered && (
            <p
              aria-hidden="true"
              className="hidden shrink-0 pb-1 text-right font-display leading-none text-white/[0.18] sm:block sm:text-6xl lg:text-7xl"
            >
              {String(index).padStart(2, "0")}
              <span className="block text-base tracking-wide text-white/25">
                / {String(count).padStart(2, "0")}
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
