import type { StaticImageData } from "next/image";

import addisSkyline from "../../public/hero/addis-skyline.jpg";
import addisTowerStreet from "../../public/hero/addis-tower-street.jpg";

/**
 * One photograph per practice area, keyed by slug. Used by the practice cards,
 * the nav mega-menu preview and the home page carousel, so a practice always
 * shows the same image.
 *
 * This used to carry a different stock photo per practice — coins in a glass
 * for Investment, a falling chess king for Competition, a calculator for Tax,
 * an empty cubicle farm for Employment, a glowing brain on a circuit board for
 * Intellectual Property, a handwritten note reading "Resolutions" nailed to a
 * tree for Dispute Resolution. Bought for small card thumbnails, they read as
 * generic — even a little odd — at any size, and badly so once a practice's
 * backdrop was asked to carry a full-bleed hero. They are gone rather than
 * patched: every practice without its own photography now falls through to
 * one real photograph of Addis Ababa, which is the honest option when the
 * alternative is stock art that has nothing to do with the firm.
 *
 * Only Corporate carries its own image — the Commercial Bank tower from
 * street level, swapped in at the firm's request (it used to be the
 * ethio-telecom headquarters seen from above). Mergers and Acquisitions and
 * Capital Markets have no dedicated image either and share the same fallback.
 */
const practiceImages: Record<string, StaticImageData> = {
  corporate: addisTowerStreet,
};

export const fallbackImage = addisSkyline;

export function getPracticeImage(slug: string): StaticImageData {
  return practiceImages[slug] ?? fallbackImage;
}

/**
 * Art for an insight's share card (scripts/og-manifest.mts — these are raster
 * JPGs for link previews, so they need a real photograph, unlike the on-site
 * cards which draw a flat colour panel via InsightThumb). This used to map
 * each topic to the same per-practice stock photos removed above, including
 * the Commercial Bank/ethio-telecom photo the firm asked off the Corporate
 * page entirely — so every topic now gets the same honest fallback instead.
 */
export function getInsightImage(): StaticImageData {
  return fallbackImage;
}

export function practiceArt(practice: {
  slug: string;
  image?: string;
}): string | StaticImageData {
  return practice.image ? practice.image : getPracticeImage(practice.slug);
}
