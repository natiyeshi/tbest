/**
 * Client and market recognition, supplied by the firm. The testimonials are
 * shown on the home and about pages; the directory rankings (Chambers, IFLR1000)
 * are shown in the recognition band and, per partner, on the profile pages.
 */

export type Testimonial = { quote: string };

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "A dynamic team that is responsive and eager to work on challenging issues.",
  },
  {
    quote:
      "A distinguished legal practice recognised for its strategic insight, sectoral depth, and commitment to client success.",
  },
  {
    quote:
      "What sets TBeST apart is not only the depth of knowledge within the team but also the collaborative, values-driven approach each member brings to their work.",
  },
  {
    quote:
      "Ability to blend legal excellence with innovation, offering clients not just legal advice, but practical, forward-looking solutions.",
  },
  {
    quote:
      "The strength of the practice lies in its people — professionals who combine legal expertise with strategic insight and a deep commitment to client service.",
  },
];

export type FirmRanking = {
  source: string;
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
