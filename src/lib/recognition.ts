/**
 * Client and market recognition, supplied by the firm. The testimonials are
 * shown on the home and about pages; the directory rankings (Legal 500,
 * Chambers, IFLR1000) are shown in the recognition band, in the strip under the
 * landing hero, and, per partner, on the profile pages.
 */

export type Testimonial = {
  quote: string;
  /**
   * Which directory the quote came from — "Legal 500", "Chambers and Partners"
   * or "IFLR1000". The firm asked for every quote to name its source, and a
   * quote only prints one when it carries one here: an attribution is a claim
   * about a named publication, so it is never guessed.
   *
   * Two of the five were matched against legal500.com/rankings/ranking/
   * c-ethiopia/leading-firms/240984-tbest-law-llp (checked 2026-10-01) — both
   * appear there word for word, so they are marked "Legal 500" below.
   *
   * The other three do not appear on that page, on TBeST's Chambers and
   * Partners profile, or on its IFLR1000 listing — IFLR1000's profile carries
   * no client quotes for this firm at all. They are left unsourced rather than
   * guessed; ask the firm where they came from.
   */
  source?: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "A dynamic team that is responsive and eager to work on challenging issues.",
    source: "Legal 500",
  },
  {
    quote:
      "A distinguished legal practice recognised for its strategic insight, sectoral depth, and commitment to client success.",
    source: "Legal 500",
  },
  {
    quote:
      "What sets TBeST apart is not only the depth of knowledge within the team but also the collaborative, values-driven approach each member brings to their work.",
    source: "",
  },
  {
    quote:
      "Ability to blend legal excellence with innovation, offering clients not just legal advice, but practical, forward-looking solutions.",
    source: "",
  },
  {
    quote:
      "The strength of the practice lies in its people — professionals who combine legal expertise with strategic insight and a deep commitment to client service.",
    source: "",
  },
];

export type FirmRanking = {
  source: string;
  /**
   * The band or tier the firm holds. May be blank while the firm confirms it —
   * the card and the strip then show the directory without a badge rather than
   * printing a ranking nobody has verified.
   */
  tier: string;
  category: string;
  knownFor?: string;
  quotes?: readonly string[];
  partners?: readonly { name: string; area: string; rating: string }[];
  /**
   * Link to the firm's page on the directory (Chambers, IFLR1000, etc.).
   * Optional — when set, the card shows a "View the ranking" link. Paste the
   * URLs the firm supplies here.
   */
  href?: string;
  /** Label for the link, e.g. "View the Chambers ranking". */
  hrefLabel?: string;
};

export const rankings: readonly FirmRanking[] = [
  {
    // Added at the firm's request, so that all three directories are featured.
    // Read from the firm's own public Legal 500 listing (checked 2026-10-01),
    // the same way the Chambers and IFLR1000 cards below were sourced from
    // theirs.
    source: "Legal 500",
    tier: "Leading Firm",
    category: "Corporate and Commercial, Tax, M&A — Ethiopia",
    knownFor:
      "TBeST Law LLP advises clients across corporate, commercial and tax matters. With particular strength in M&A, debt financing and corporate governance, the firm is led by a capable trio of partners, and has recently expanded into fintech, data protection and public-private partnerships.",
    // No separate pull-quotes here, unlike the Chambers card below: Legal 500's
    // page carries only two client quotes, and both are already shown in the
    // Testimonials section with "Legal 500" under them — repeating them here
    // would print the same sentence twice on the same page.
    href: "https://www.legal500.com/rankings/ranking/c-ethiopia/leading-firms/240984-tbest-law-llp",
    hrefLabel: "View the Legal 500 ranking",
  },
  {
    source: "Chambers and Partners",
    tier: "Band 3",
    category: "General Business Law — Ethiopia",
    knownFor:
      "TBeST Law provides expert legal advice on a wide range of corporate and commercial matters, specialising in M&A transactions, equity and debt financing, corporate governance, restructuring and regulatory compliance, with deep expertise in Ethiopian tax law.",
    quotes: [
      "TBeST Law's ability to address highly complex and sophisticated matters is truly astonishing and we are very proud to retain its services.",
      "TBeST Law is able to gracefully navigate complicated negotiations.",
    ],
    // Paste the firm's Chambers profile URL here to show a link on the card:
    // href: "https://chambers.com/...",
    // hrefLabel: "View the Chambers ranking",
  },
  {
    source: "IFLR1000",
    tier: "Tier 3",
    category: "Ethiopia",
    // Paste the firm's IFLR1000 profile URL here to show a link on the card:
    // href: "https://www.iflr1000.com/...",
    // hrefLabel: "View the IFLR1000 ranking",
    partners: [
      {
        name: "Sisay Habte Gemeda",
        area: "Corporate and M&A",
        rating: "Rising Star Partner · Women Leaders",
      },
      {
        name: "Benyam Tafesse",
        area: "Projects, PPP/PFI; Project Development: Infrastructure",
        rating: "Notable Practitioner",
      },
      {
        name: "Tibebe Zewdu",
        area: "Financial and Corporate",
        rating: "Notable Practitioner",
      },
    ],
  },
];

export type PartnerRecognition = {
  chambers?: { summary: string; testimonials: readonly string[] };
  iflr?: { area: string; rating: string };
};

const partnerRecognition: Record<string, PartnerRecognition> = {
  "sisay-habte-gemeda": {
    chambers: {
      summary:
        "Sisay Habte Gemeda assists clients with financing issues such as loan and security agreements. She also deals with due diligence and transaction structures.",
      testimonials: [
        "Sisay Habte Gemeda is fantastic. She is responsive, quick and thorough.",
        "Sisay has a great ability to adapt to our requests, clearly explaining each individual situation to us in simple terms.",
      ],
    },
    iflr: {
      area: "Corporate and M&A",
      rating: "Rising Star Partner · Women Leaders",
    },
  },
  "benyam-tafesse": {
    chambers: {
      summary:
        "Benyam Tafesse advises clients on a wide range of matters including contractual agreements and corporate transactions. He is also well placed to act on infrastructure matters.",
      testimonials: [
        "We appreciate Benyam Tafesse's comprehensive and detailed legal advice.",
        "He is skilled and responsive.",
      ],
    },
    iflr: {
      area: "Projects, PPP/PFI; Project Development: Infrastructure",
      rating: "Notable Practitioner",
    },
  },
  "tibebe-zewdu": {
    chambers: {
      summary:
        "Tibebe Zewdu is noted for his expertise in tax issues. He also advises clients on a range of corporate and commercial matters.",
      testimonials: [
        "Tibebe Zewdu has good knowledge and explains matters very clearly to us.",
        "Tibebe Zewdu is excellent in his service and technical ability.",
      ],
    },
    iflr: { area: "Financial and Corporate", rating: "Notable Practitioner" },
  },
};

export function partnerRecognitionBySlug(
  slug: string,
): PartnerRecognition | undefined {
  return partnerRecognition[slug];
}
