import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

export type ServiceItem = {
  slug: string;
  name: string;
  blurb: string;
  /** Optional card image. When absent, the card falls back to a text layout. */
  image?: StaticImageData;
};

/** A single practice/sector card, image-forward when an image is provided. */
export function ServiceCard({
  item,
  index,
  base,
}: {
  item: ServiceItem;
  index: number;
  base: string;
}) {
  return (
    <Link
      href={`${base}/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-900/[0.06]"
    >
      {item.image && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-brand-950/10 to-transparent" />
          <span className="absolute left-5 top-4 font-display text-sm text-white/90">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-7 lg:p-8">
        {!item.image && (
          <span className="font-display text-sm text-copper-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <h3
          className={`font-display text-2xl leading-snug text-brand-900 transition-colors group-hover:text-copper-600 ${
            item.image ? "" : "mt-5"
          }`}
        >
          {item.name}
        </h3>
        <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
          {item.blurb}
        </p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-copper-500">
          Read more
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Grid of service cards. */
export function ServiceGrid({
  items,
  base,
}: {
  items: readonly ServiceItem[];
  base: string;
}) {
  return (
    <ul
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      data-reveal
    >
      {items.map((item, index) => (
        <li key={item.slug} className="h-full">
          <ServiceCard item={item} index={index} base={base} />
        </li>
      ))}
    </ul>
  );
}

/**
 * "Explore more" rail shown at the foot of a detail page. Excludes the current
 * item and shows a few of the rest as cards.
 */
export function RelatedRail({
  title,
  items,
  base,
  currentSlug,
  seeAllHref,
  limit = 3,
}: {
  title: string;
  items: readonly ServiceItem[];
  base: string;
  currentSlug: string;
  seeAllHref: string;
  limit?: number;
}) {
  const others = items
    .filter((item) => item.slug !== currentSlug)
    .slice(0, limit);

  return (
    <section className="border-t border-line bg-bone py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-2xl tracking-tight text-brand-900 sm:text-3xl">
            {title}
          </h2>
          <Link
            href={seeAllHref}
            className="shrink-0 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="mt-8">
          <ServiceGrid items={others} base={base} />
        </div>
      </div>
    </section>
  );
}
