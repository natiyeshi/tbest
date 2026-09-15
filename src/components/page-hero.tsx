import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

import { DiamondFieldReveal } from "@/components/diamond-field-reveal";
import { TypeIn } from "@/components/type-in";

export type Crumb = { label: string; href?: string };

/**
 * The dark header band that opens every interior page. Keeps the transparent
 * site header legible (white artwork on dark) until the reader scrolls into the
 * white body below.
 *
 * The diamond field is the firm's shared pattern; it backs every interior hero
 * with a cursor-following reveal. When an `image` is supplied it sits behind the
 * scrim so the hero is grounded in a relevant photograph.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  imagePosition = "center 42%",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  /** A bundled import, or a URL for artwork uploaded through the admin. */
  image?: string | StaticImageData;
  /**
   * Where the band sits over the photograph. The default suits a group standing
   * mid-frame; pass a lower value to keep more of the top of the picture, a
   * higher one to keep more of the bottom.
   */
  imagePosition?: string;
}) {
  return (
    <section
      data-nav-tone="dark"
      className="relative isolate overflow-hidden bg-brand-900 pt-32 pb-16 lg:pt-40 lg:pb-20"
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
          {/* Left-weighted scrim, kept light: enough behind the heading to hold
              it, fading to almost nothing across the rest of the band so the
              photograph reads. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/45 to-brand-950/10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-transparent to-brand-950/15"
          />
        </>
      )}
      <DiamondFieldReveal
        id={`page-hero-diamond-${eyebrow.replace(/\s+/g, "-").toLowerCase()}`}
        size={78}
        className="text-brand-200/[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(211,107,52,0.16),transparent_66%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-brand-100/55">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-copper-300">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-brand-100/80">{crumb.label}</span>
                  )}
                  {index < crumbs.length - 1 && (
                    <span aria-hidden="true" className="text-brand-100/30">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

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
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-brand-100/75 sm:text-lg">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
