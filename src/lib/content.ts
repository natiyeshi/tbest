import type { StaticImageData } from "next/image";

import teamExperience from "./team-experience.json";

import menenPortrait from "../../public/team/menen-mitiku/no-bg.png";
import benyamPortrait from "../../public/team/benyam-tafesse/benyam-2-nobg.png";
import beroketPortrait from "../../public/team/bereket-teshome/bereket-2-nobg.png";
import bezawitFekedePortrait from "../../public/team/bezawit-fekede/beza-2-final-nobg.png";
import bezawitYirgaPortrait from "../../public/team/bezawit-yirga/5837172361756004259-nobg.png";
import etsehiwotPortrait from "../../public/team/etsehiwot-samson/etsehiwot-1-nobg.png";
import helinaPortrait from "../../public/team/helina-bezabih/helina-final-nobg.png";
import lindaPortrait from "../../public/team/linda-tedla/5837172361756004260-nobg.png";
import rekebkiPortrait from "../../public/team/rekebki-tsega-abebe/rekebki-1-nobg.png";
import sisayPortrait from "../../public/team/sisay-habte/sisay-nobg.png";
import tibebePortrait from "../../public/team/tibebe-zewdu/sam05619-nobg.png";

// A second cut-out per member, revealed on hover over their photograph.
import benyamPortraitAlt from "../../public/team/benyam-tafesse/sam05742-nobg.png";
import beroketPortraitAlt from "../../public/team/bereket-teshome/bereket-1-nobg.png";
import bezawitFekedePortraitAlt from "../../public/team/bezawit-fekede/beza-1-nobg.png";
import bezawitYirgaPortraitAlt from "../../public/team/bezawit-yirga/snapedit-1755334518620-nobg.png";
import etsehiwotPortraitAlt from "../../public/team/etsehiwot-samson/etsehiwot-2-nobg.png";
import helinaPortraitAlt from "../../public/team/helina-bezabih/helina-side-nobg.png";
import lindaPortraitAlt from "../../public/team/linda-tedla/snapedit-1755335677837-nobg.png";
import rekebkiPortraitAlt from "../../public/team/rekebki-tsega-abebe/rekebki-2-nobg.png";
import sisayPortraitAlt from "../../public/team/sisay-habte/sis-final-nobg.png";
import tibebePortraitAlt from "../../public/team/tibebe-zewdu/5837172361756004268-nobg.png";

// The newer shoot: full photographs, background intact, one straight-on frame
// and one three-quarter frame each. These carry the cards and the detail pages;
// the cut-outs above are kept for the standing lineup on the team page, which
// needs transparency. Everyone on the roster was photographed in this round.
import benyamNew from "../../public/new/benyam-tafesse/compressed/b6.webp";
import benyamNewAlt from "../../public/new/benyam-tafesse/compressed/b8.webp";
import beroketNew from "../../public/new/bereket-teshome/compressed/bb18.webp";
import beroketNewAlt from "../../public/new/bereket-teshome/compressed/b19.webp";
import bezawitFekedeNew from "../../public/new/bezawit-fekede/compressed/bb22.webp";
import bezawitFekedeNewAlt from "../../public/new/bezawit-fekede/compressed/b23.webp";
import bezawitYirgaNew from "../../public/new/bezawit-yirga/compressed/b12.webp";
import bezawitYirgaNewAlt from "../../public/new/bezawit-yirga/compressed/b13.webp";
import etsehiwotNew from "../../public/new/etsehiwot-samson/compressed/b52.webp";
import etsehiwotNewAlt from "../../public/new/etsehiwot-samson/compressed/b53.webp";
import helinaNew from "../../public/new/helina-bezabih/compressed/b14.webp";
import helinaNewAlt from "../../public/new/helina-bezabih/compressed/b15.webp";
import lindaNew from "../../public/new/linda-tedla/compressed/b16.webp";
import lindaNewAlt from "../../public/new/linda-tedla/compressed/b17.webp";
import menenNew from "../../public/new/menen-mitiku/compressed/b20.webp";
import menenNewAlt from "../../public/new/menen-mitiku/compressed/b21.webp";
import rekebkiNew from "../../public/new/rekebki-tsega-abebe/compressed/bb10.webp";
import rekebkiNewAlt from "../../public/new/rekebki-tsega-abebe/compressed/b11.webp";
import sisayNew from "../../public/new/sisay-habte/compressed/b1.webp";
import sisayNewAlt from "../../public/new/sisay-habte/compressed/b5.webp";
import tibebeNew from "../../public/new/tibebe-zewdu/compressed/bb2.webp";
import tibebeNewAlt from "../../public/new/tibebe-zewdu/compressed/b3.webp";

export const firm = {
  name: "TBeST Law LLP",
  tagline:
    "A full service law firm based in Addis Ababa, Ethiopia, providing corporate and commercial legal services.",
  email: "info@tbestlaw.com",
  phones: {
    office: "+251 115 52 52 53",
    mobile: ["+251 952 80 19 19", "+251 952 76 19 19", "+251 992 19 98 19"],
  },
  /** The firm operates a single office. */
  offices: [
    {
      label: "Office",
      line1: "Bitweded Bahru Building, 6th Floor, Office No. 602",
      landmark: "In front of the Oromia Regional State President's Office",
      street: "Africa Avenue, Addis Ababa",
      country: "Ethiopia",
    },
  ],
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/tbest-law-llp/",
    },
    { label: "Twitter", href: "https://twitter.com/TBeSTLawLLP" },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100088411510992",
    },
  ],
} as const;

/** Primary navigation. Practices and Sectors expose their children as menus. */
export const navigation = [
  { label: "About", href: "/about-us" },
  { label: "Team", href: "/team" },
  { label: "Practices", href: "/practices", group: "practices" as const },
  { label: "Sectors", href: "/sectors", group: "sectors" as const },
  { label: "Updates", href: "/updates", group: "updates" as const },
  { label: "Contact", href: "/contact-us" },
] as const;

export const stats = [
  { value: "50+", label: "Years of collective partner experience" },
  { value: "09", label: "Corporate and commercial practice areas" },
  { value: "09", label: "Industry sectors served" },
] as const;

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  /** Background-removed cut-out, used in the standing lineup on the team page. */
  portrait: StaticImageData;
  /** A second cut-out, for the lineup's hover swap. Optional. */
  portraitAlt?: StaticImageData;
  /** Photograph used in cards, cropped to fill their frame. */
  card: StaticImageData;
  /** A second photograph, cross-faded in on hover over the card. Optional. */
  cardAlt?: StaticImageData;
  /** Full photograph with its original background, used on the detail page. */
  photo: StaticImageData;
  /**
   * Public path to the member's short silent clip, played over `photo` on the
   * detail page. A plain path rather than an import: only images get Next's
   * static-import handling, and the clip needs no dimensions or blur data.
   */
  clip?: string;
  /** Pipe-separated focus tags, as shown on the firm's team page. */
  focus: readonly string[];
  /** One-line description used in compact contexts. */
  strapline: string;
  /** Full biography, mirroring the firm's team page. */
  bio: string;
  credentials: readonly string[];
};

export const team: readonly TeamMember[] = [
  {
    slug: "tibebe-zewdu",
    name: "Tibebe Zewdu",
    role: "Managing Partner",
    portrait: tibebePortraitAlt,
    portraitAlt: tibebePortrait,
    card: tibebeNew,
    cardAlt: tibebeNewAlt,
    photo: tibebeNew,
    clip: "/new/tibebe-zewdu/compressed/p3_00539253.webm",
    focus: [
      "Tax",
      "Customs",
      "Corporate and Investment",
      "Competition",
      "M&A",
      "Criminal Law",
    ],
    strapline:
      "Tax, customs and corporate counsel, with over 10 years across government service and private practice.",
    bio: "Tibebe is a prominent corporate and tax lawyer with over 10 years of legal experience working in government and private practice. His practice at TBeST Law encompasses general corporate and commercial law, with a specialized expertise and focus in the law of taxation and customs. He also practices competition regulation, mergers and acquisitions, private equity, general investment matters and criminal law.",
    credentials: [
      "LL.B, Wollo University School of Law, with Very Great Distinction and a Gold Medal (2012)",
      "LL.M, Addis Ababa University, with Very Great Distinction (2017)",
      "Certified by the Ethiopian Customs Commission as an Authorized Customs Laws Advisor",
    ],
  },
  {
    slug: "benyam-tafesse",
    name: "Benyam Tafesse",
    role: "Partner",
    portrait: benyamPortrait,
    portraitAlt: benyamPortraitAlt,
    card: benyamNew,
    cardAlt: benyamNewAlt,
    photo: benyamNew,
    clip: "/new/benyam-tafesse/compressed/p3_01348962.webm",
    focus: [
      "Intellectual Property & Technology",
      "Projects, Infrastructure and PPP",
      "Employment & Immigration",
      "Aviation",
    ],
    strapline:
      "A commercial lawyer of more than 15 years, across intellectual property, technology, employment and aviation.",
    bio: "Benyam is a seasoned commercial lawyer with more than 15 years' experience in private practice, academia and as in-house legal counsel. His areas of practice include intellectual property and technology, energy, infrastructure and PPP, employment & immigration and aviation law. Benyam is licensed to practice law before all levels of federal courts and he is also a licensed trademark agent.",
    credentials: [
      "LL.B (with distinction), Addis Ababa University",
      "LL.M (cum laude), University of Groningen, the Netherlands",
      "Certificate in Private International Law, The Hague Academy of International Law",
    ],
  },
  {
    slug: "sisay-habte-gemeda",
    name: "Sisay Habte Gemeda",
    role: "Partner",
    portrait: sisayPortrait,
    portraitAlt: sisayPortraitAlt,
    card: sisayNew,
    cardAlt: sisayNewAlt,
    photo: sisayNew,
    clip: "/new/sisay-habte/compressed/p3_01354717.webm",
    focus: [
      "Corporate and Commercial",
      "Investment",
      "M&A",
      "Competition",
      "Mining",
      "Real Estate",
      "NGO",
      "Insurance",
    ],
    strapline:
      "Corporate and commercial counsel for the mining, real estate and NGO sectors.",
    bio: "Sisay mainly advises on corporate and commercial matters, including in the mining, real estate and NGO sectors. She provides structural, regulatory and compliance-based advice to our clients on matters of investment, mergers and acquisitions and competition.",
    credentials: [
      "LL.B, University of Gondar, with Great Distinction (2012)",
      "LL.M, International Business Law, Central European University (2015)",
      "LL.M, Comparative Law, Economics and Finance, International University College of Turin, with Great Distinction (2016)",
    ],
  },
  {
    slug: "menen-mitiku",
    name: "Menen Mitiku",
    role: "Office Manager",
    portrait: menenPortrait,
    card: menenNew,
    cardAlt: menenNewAlt,
    photo: menenNew,
    clip: "/new/menen-mitiku/compressed/p3_01353747.webm",
    focus: [],
    strapline: "Office manager keeping the firm running day to day.",
    bio: "Menen Mitiku is an Office Manager at TBeST Law. She graduated from Ambo University in Health Science. Prior to joining TBeST Law, Menen worked as a call centre agent and in front-desk customer care at Ison Xperience, and as a Telesales Representative at Heineken Ethiopia.",
    credentials: ["BSc, Ambo University (2011)"],
  },
  {
    slug: "helina-bezabih",
    name: "Helina Bezabih",
    role: "Associate",
    portrait: helinaPortraitAlt,
    portraitAlt: helinaPortrait,
    card: helinaNew,
    cardAlt: helinaNewAlt,
    photo: helinaNew,
    clip: "/new/helina-bezabih/compressed/p3_01351167.webm",
    focus: ["Corporate", "Commercial", "Investment", "Competition"],
    strapline:
      "Associate across corporate, commercial and investment law and due diligence.",
    bio: "Helina Bezabih is an Associate at TBeST Law LLP with experience in corporate, commercial and investment law. She has supported complex due diligence projects, advised on regulatory compliance, and assisted both local and international clients across diverse sectors. Before joining TBeST, she worked as in-house legal counsel and junior consultant at Adwa Partners Consultancy, a management consulting firm. Helina holds an LL.B from Bahir Dar University and is currently pursuing her LL.M at Addis Ababa University.",
    credentials: [
      "LL.B, Bahir Dar University",
      "LL.M (in progress), Addis Ababa University",
    ],
  },
  {
    slug: "linda-tedla",
    name: "Linda Tedla",
    role: "Associate",
    portrait: lindaPortrait,
    portraitAlt: lindaPortraitAlt,
    card: lindaNew,
    cardAlt: lindaNewAlt,
    photo: lindaNew,
    clip: "/new/linda-tedla/compressed/p3_01352242.webm",
    focus: ["Intellectual Property", "Corporate", "Commercial"],
    strapline: "Associate leading the firm's intellectual property practice.",
    bio: "Linda Tedla is an Associate at TBeST Law LLP and the lead associate in the firm's Intellectual Property practice. She earned her LL.B from Mekelle University and is currently pursuing her LL.M in Business and Property Law at Addis Ababa University. With two years of experience in the IP field, her work focuses on trademark and patent prosecution — including preparing and filing applications before the Ethiopian Intellectual Property Authority, managing opposition and renewal processes, and advising on enforcement strategies — alongside IP due diligence and broader corporate and commercial work. Before joining TBeST, Linda volunteered in the IDP department at the Ethiopian Human Rights Commission and worked as an Administrative and Event Intern at the GIZ Ethiopia & Djibouti Country Office, assisting with contracts, events, ticketing and services for national and international staff.",
    credentials: [
      "LL.B, Mekelle University",
      "LL.M (in progress) in Business and Property Law, Addis Ababa University",
    ],
  },
  {
    slug: "bereket-teshome",
    name: "Bereket Teshome",
    role: "Junior Associate",
    portrait: beroketPortrait,
    portraitAlt: beroketPortraitAlt,
    card: beroketNew,
    cardAlt: beroketNewAlt,
    photo: beroketNew,
    clip: "/new/bereket-teshome/compressed/p3_01353487.webm",
    focus: ["Corporate", "Investment", "Capital Market", "Employment"],
    strapline:
      "Junior associate across corporate, investment, capital markets and employment.",
    bio: "Bereket Teshome is a Junior Associate at TBeST Law. He obtained his LL.B with Great Distinction from Hawassa University School of Law. Prior to assuming his current position he completed an internship at TBeST Law, where he was engaged in legal research, drafting and case preparation, and he also served as a Junior Associate at Haymanot & Advocates. His work spans corporate structuring, foreign direct investment, capital markets and employment matters.",
    credentials: [
      "LL.B, Hawassa University, with Great Distinction (2025)",
    ],
  },
  {
    slug: "etsehiwot-samson",
    name: "Etsehiwot Samson",
    role: "Junior Associate",
    portrait: etsehiwotPortraitAlt,
    portraitAlt: etsehiwotPortrait,
    card: etsehiwotNew,
    cardAlt: etsehiwotNewAlt,
    photo: etsehiwotNew,
    clip: "/new/etsehiwot-samson/compressed/p3_01349257.webm",
    focus: ["Corporate", "Investment"],
    strapline:
      "Junior associate supporting corporate and investment matters.",
    bio: "Etsehiwot Samson is a Junior Associate at TBeST Law. She graduated with very great distinction from Arsi University School of Law and is currently pursuing a Master's degree in Public International Law at Addis Ababa University. Before joining the firm as a Junior Associate, she completed her legal internship at TBeST Law. She supports corporate and investment matters through legal research, drafting of legal documents, and regulatory filings with the relevant government authorities.",
    credentials: [
      "LL.B, Arsi University, with Very Great Distinction (2025)",
      "LL.M (in progress) in Public International Law, Addis Ababa University",
    ],
  },
  {
    slug: "bezawit-yirga",
    name: "Bezawit Yirga",
    role: "Senior Associate",
    portrait: bezawitYirgaPortraitAlt,
    portraitAlt: bezawitYirgaPortrait,
    card: bezawitYirgaNew,
    cardAlt: bezawitYirgaNewAlt,
    photo: bezawitYirgaNew,
    clip: "/new/bezawit-yirga/compressed/p3_01349762.webm",
    focus: [],
    strapline: "Senior Associate at TBeST Law.",
    bio: "",
    credentials: [],
  },
  {
    slug: "rekebki-tsega-abebe",
    name: "Rekebki Tsega Abebe",
    role: "Associate",
    portrait: rekebkiPortraitAlt,
    portraitAlt: rekebkiPortrait,
    card: rekebkiNew,
    cardAlt: rekebkiNewAlt,
    photo: rekebkiNew,
    clip: "/new/rekebki-tsega-abebe/compressed/p3_01349517.webm",
    focus: [],
    strapline: "Associate at TBeST Law.",
    bio: "",
    credentials: [],
  },
  {
    slug: "bezawit-fekede",
    name: "Bezawit Fekede",
    role: "Junior Accountant",
    portrait: bezawitFekedePortrait,
    portraitAlt: bezawitFekedePortraitAlt,
    card: bezawitFekedeNew,
    cardAlt: bezawitFekedeNewAlt,
    photo: bezawitFekedeNew,
    clip: "/new/bezawit-fekede/compressed/p3_01354197.webm",
    focus: [],
    strapline: "Junior accountant supporting the firm's finance function.",
    bio: "Bezawit Fekede is a Junior Accountant at TBeST Law. She graduated from Unity University in Accounting and Finance. Before joining TBeST Law she worked at Elias Damtew Certified Accountant, where she maintained accounting records and financial documentation, processed invoices, payment vouchers and expense claims, handled accounts payable and receivable, and supported payroll preparation and compliance.",
    credentials: ["BA in Accounting and Finance, Unity University (2024)"],
  },
];

/**
 * Roles that run the business rather than practise law. Listed rather than
 * inferred, so a new title never lands in the wrong group by accident.
 */
const businessServicesRoles: readonly string[] = [
  "Office Manager",
  "Junior Accountant",
];

/**
 * The bands the roster is shown in, most senior first, each listing the titles
 * that fall into it. This single list does two jobs: it orders the roster, and
 * it groups it — so a new joiner lands in the right band on the strength of
 * their title alone. Listed rather than inferred for the same reason as the
 * business-services roles above; a title missing from here sorts to the end of
 * the roster rather than to the front of it, and shows in no band.
 *
 * Managing Partner and Partner share a band: that distinction belongs on the
 * card, not on a heading of its own. The headings are spelt out both ways
 * rather than pluralised with an "s", because "of counsel" does not take one.
 */
const lawyerBands: readonly {
  /** Heading when the band holds one person, and when it holds several. */
  one: string;
  many: string;
  ranks: readonly string[];
}[] = [
  { one: "Partner", many: "Partners", ranks: ["Managing Partner", "Partner"] },
  { one: "Of counsel", many: "Of counsel", ranks: ["Of Counsel"] },
  {
    one: "Senior associate",
    many: "Senior associates",
    ranks: ["Senior Associate"],
  },
  { one: "Associate", many: "Associates", ranks: ["Associate"] },
  {
    one: "Junior associate",
    many: "Junior associates",
    ranks: ["Junior Associate"],
  },
];

const lawyerRanks = lawyerBands.flatMap((band) => band.ranks);

function rankOf(member: TeamMember): number {
  const rank = lawyerRanks.indexOf(member.role);
  return rank === -1 ? lawyerRanks.length : rank;
}

/**
 * Everyone who practises: partners, of counsel and associates, most senior
 * first. `sort` is stable, so people sharing a rank keep the order they are
 * written in above — and `filter` has already copied the array, so `team`
 * itself is left in its original order.
 */
export const lawyers = team
  .filter((member) => !businessServicesRoles.includes(member.role))
  .sort((a, b) => rankOf(a) - rankOf(b));

/** The partners, most senior first — used where only they are shown. */
export const partners = lawyers.filter((member) =>
  member.role.includes("Partner"),
);

export type LawyerTier = {
  label: string;
  members: readonly TeamMember[];
};

/**
 * The roster as the team page shows it: one labelled band per rank, most senior
 * first. Bands nobody currently holds drop out, so an empty rank never leaves a
 * heading with nothing under it.
 */
export const lawyerTiers: readonly LawyerTier[] = lawyerBands
  .map((band) => {
    const members = lawyers.filter((member) => band.ranks.includes(member.role));
    return { label: members.length === 1 ? band.one : band.many, members };
  })
  .filter((tier) => tier.members.length > 0);

/** Everyone in business services. */
export const businessServices = team.filter((member) =>
  businessServicesRoles.includes(member.role),
);

/**
 * Selected-experience bullets for a team member, where the firm publishes them.
 * Held in team-experience.json (migrated from the partners' profile pages) and
 * keyed by slug. Members without a published list return an empty array.
 */
export function teamMemberExperience(slug: string): readonly string[] {
  return (teamExperience as Record<string, string[]>)[slug] ?? [];
}

export function teamMemberBySlug(slug: string): TeamMember | undefined {
  return team.find((member) => member.slug === slug);
}
