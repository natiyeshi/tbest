import type { StaticImageData } from "next/image";

import addisSkyline from "../../public/hero/addis-skyline.jpg";
import competition from "../../public/hero/competition.jpg";
import corporate from "../../public/hero/corporate-new.jpg";
import dispute from "../../public/hero/resolutions.jpg";
import employment from "../../public/hero/empoyment.jpg";
import insolvency from "../../public/hero/Insolvency.jpg";
import ip from "../../public/hero/intellectual-Property.jpg";
import investment from "../../public/hero/investment.jpg";
import tax from "../../public/hero/tax.jpg";

/**
 * One photograph per practice area, keyed by slug. Used by the hero backdrop
 * and the practice cards so a practice always shows the same image.
 *
 * Mergers and Acquisitions has no dedicated image yet, so it falls back to the
 * Addis skyline via `getPracticeImage`.
 */
const practiceImages: Record<string, StaticImageData> = {
  investment,
  corporate,
  "employment-and-corporate-immigration": employment,
  "intellectual-property-and-technology": ip,
  competition,
  tax,
  "insolvency-and-corporate-restructuring": insolvency,
  "dispute-resolution": dispute,
};

export const fallbackImage = addisSkyline;

export function getPracticeImage(slug: string): StaticImageData {
  return practiceImages[slug] ?? fallbackImage;
}

/** Maps an insight topic to the closest practice image, for card/detail art. */
const insightTopicImages: Record<string, StaticImageData> = {
  Investment: investment,
  Tax: tax,
  Immigration: employment,
  "Data Protection": ip,
  Corporate: corporate,
  Insolvency: insolvency,
  Competition: competition,
  Firm: addisSkyline,
};

export function getInsightImage(topic: string): StaticImageData {
  return insightTopicImages[topic] ?? fallbackImage;
}
