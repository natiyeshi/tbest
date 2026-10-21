import { team, type TeamMember } from "@/lib/content";

/**
 * Which lawyers a reader should contact about each practice area and sector.
 *
 * The firm asked for the relevant team members' contact details to sit beside
 * the content on every practice page, the way Clifford Chance and Dablo lay
 * theirs out. That needs a mapping the content does not otherwise carry, so it
 * lives here rather than being inferred at render time.
 *
 * The lists below were drawn from the focus areas each lawyer already publishes
 * on their own profile, most senior first. They are a starting point for the
 * firm to correct — this file is the one place to edit, and the practice and
 * sector pages follow.
 *
 * Direct email addresses and phone numbers are read from each member's own
 * record in `content.ts`. Until the firm supplies them, a card shows the firm's
 * switchboard and inbox instead; nothing is invented.
 */
const practiceContacts: Record<string, readonly string[]> = {
  investment: ["sisay-habte-gemeda", "tibebe-zewdu", "helina-bezabih"],
  corporate: ["tibebe-zewdu", "sisay-habte-gemeda", "helina-bezabih"],
  "mergers-and-acquisitions": ["tibebe-zewdu", "sisay-habte-gemeda"],
  "capital-markets": ["sisay-habte-gemeda", "bereket-teshome"],
  "employment-and-corporate-immigration": [
    "benyam-tafesse",
    "bezawit-yirga",
    "bereket-teshome",
  ],
  "intellectual-property-and-technology": ["benyam-tafesse", "linda-tedla"],
  competition: ["tibebe-zewdu", "sisay-habte-gemeda", "helina-bezabih"],
  tax: ["tibebe-zewdu"],
  "insolvency-and-corporate-restructuring": [
    "sisay-habte-gemeda",
    "tibebe-zewdu",
  ],
  "dispute-resolution": ["tibebe-zewdu", "benyam-tafesse"],
};

const sectorContacts: Record<string, readonly string[]> = {
  "financial-services": ["sisay-habte-gemeda", "bereket-teshome"],
  "private-equity": ["tibebe-zewdu", "sisay-habte-gemeda"],
  "mining-and-energy": ["sisay-habte-gemeda", "benyam-tafesse"],
  ngos: ["bezawit-yirga", "sisay-habte-gemeda"],
  "real-estate-and-conveyancing": ["sisay-habte-gemeda", "helina-bezabih"],
  aviation: ["benyam-tafesse"],
  "hospitality-and-leisure": ["sisay-habte-gemeda", "etsehiwot-samson"],
  "telecom-and-information-technology": ["benyam-tafesse", "linda-tedla"],
  "media-sports-and-entertainment": ["benyam-tafesse", "linda-tedla"],
};

/** The partners, used wherever a practice or sector has no named contact yet. */
const fallbackSlugs = ["tibebe-zewdu", "benyam-tafesse", "sisay-habte-gemeda"];

function resolve(slugs: readonly string[]): TeamMember[] {
  return slugs
    .map((slug) => team.find((member) => member.slug === slug))
    .filter((member): member is TeamMember => member !== undefined);
}

export function contactsForPractice(slug: string): TeamMember[] {
  const found = resolve(practiceContacts[slug] ?? []);
  return found.length > 0 ? found : resolve(fallbackSlugs);
}

export function contactsForSector(slug: string): TeamMember[] {
  const found = resolve(sectorContacts[slug] ?? []);
  return found.length > 0 ? found : resolve(fallbackSlugs);
}
