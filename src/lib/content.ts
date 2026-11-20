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

// The firm's edited profile pictures (edited.jpg / edited.png in each member's
// folder). One picture per member, used on both the team card and the detail
// page, so a member's photograph never changes between the two and there is no
// hover swap. Sisay uses compressed/last-v.jpeg, supplied separately.
import benyamNew from "../../public/new/benyam-tafesse/edited.jpg";
import beroketNew from "../../public/new/bereket-teshome/edited.jpg";
import bezawitFekedeNew from "../../public/new/bezawit-fekede/edited.jpg";
import bezawitYirgaNew from "../../public/new/bezawit-yirga/edited.jpg";
import etsehiwotNew from "../../public/new/etsehiwot-samson/edited.jpg";
import helinaNew from "../../public/new/helina-bezabih/edited.png";
import lindaNew from "../../public/new/linda-tedla/edited.jpg";
import menenNew from "../../public/new/menen-mitiku/edited.jpg";
import rekebkiNew from "../../public/new/rekebki-tsega-abebe/edited.jpg";
import sisayNew from "../../public/new/sisay-habte/compressed/last-v.jpeg";
import tibebeNew from "../../public/new/tibebe-zewdu/edited.jpg";
import hikmaNew from "../../public/new/Hikma-Tessema/vvv.png";
import kidestNew from "../../public/new/Kidest-Abate/kidst-last-v.jpeg";
import mistreNew from "../../public/new/Mistre-Ashenafi/vvv.jpeg";

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
  /**
   * Direct contact details, shown beside the practice areas this person covers
   * and on their own profile. Both optional: until the firm supplies a direct
   * line or address for someone, their card falls back to the firm's own
   * switchboard and inbox rather than inventing one.
   */
  email?: string;
  phone?: string;
  /** One-line description used in compact contexts. */
  strapline: string;
  /** Full biography, mirroring the firm's team page. */
  bio: string;
  credentials: readonly string[];
  /** Languages the member practises in. Optional; omitted where not supplied. */
  languages?: readonly string[];
  /**
   * Selected matters, grouped by the practice they belong to. Optional: only
   * the members whose full CV the firm has supplied carry one, and the detail
   * page renders nothing at all when it is absent.
   */
  experience?: readonly { area: string; items: readonly string[] }[];
};

export const team: readonly TeamMember[] = [
  {
    slug: "tibebe-zewdu",
    name: "Tibebe Zewdu",
    role: "Managing Partner",
    portrait: tibebePortraitAlt,
    portraitAlt: tibebePortrait,
    card: tibebeNew,
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
    email: "tibebe@tbestlaw.com",
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
    photo: benyamNew,
    clip: "/new/benyam-tafesse/compressed/p3_01348962.webm",
    focus: [
      "Intellectual Property & Technology",
      "Projects, Infrastructure and PPP",
      "Employment & Immigration",
      "Aviation",
    ],
    email: "benyam@tbestlaw.com",
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
    name: "Sisay Habte",
    role: "Partner",
    portrait: sisayPortrait,
    portraitAlt: sisayPortraitAlt,
    card: sisayNew,
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
    email: "sisay@tbestlaw.com",
    strapline:
      "Corporate and commercial counsel for the mining, real estate and NGO sectors.",
    bio: "Sisay Habte is a Partner at TBeST Law LLP, where she leads the firm's Corporate and Commercial, Mining, NGO and Real Estate practices.\n\nShe advises on a broad range of corporate and commercial matters, including providing structural, regulatory and compliance-based advice on investment, mergers and acquisitions and competition matters. She also assists clients with financing issues, including loan and security agreements, as well as due diligence and transaction structures.",
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
    email: "helina@tbestlaw.com",
    portrait: helinaPortraitAlt,
    portraitAlt: helinaPortrait,
    card: helinaNew,
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
    email: "linda@tbestlaw.com",
    portrait: lindaPortrait,
    portraitAlt: lindaPortraitAlt,
    card: lindaNew,
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
    email: "bereket@tbestlaw.com",
    portrait: beroketPortrait,
    portraitAlt: beroketPortraitAlt,
    card: beroketNew,
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
    email: "etsehiwot@tbestlaw.com",
    portrait: etsehiwotPortraitAlt,
    portraitAlt: etsehiwotPortrait,
    card: etsehiwotNew,
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
    email: "bezawit@tbestlaw.com",
    portrait: bezawitYirgaPortraitAlt,
    portraitAlt: bezawitYirgaPortrait,
    card: bezawitYirgaNew,
    photo: bezawitYirgaNew,
    clip: "/new/bezawit-yirga/compressed/p3_01349762.webm",
    focus: [
      "Non-Profit Organizations",
      "Employment and Corporate Immigration",
      "Data Protection and Privacy",
      "Corporate",
    ],
    strapline:
      "Counsel to non-profits, embassies and international organizations on employment, corporate immigration, data protection and corporate matters.",
    bio: "Bezawit is a Senior Associate at TBeST Law, practicing across civil society and non-profit law, employment and corporate immigration, data protection and privacy, and general corporate matters. She graduated with great distinction from Jimma University School of Law. Before joining TBeST Law she spent two and a half years at Mehrteab & Getu Advocates, working in the firm's NGO, employment and corporate immigration practices.",
    credentials: [
      "LL.B, Jimma University School of Law, with Great Distinction (2019)",
    ],
    languages: ["English", "Amharic"],
  },
  {
    slug: "rekebki-tsega-abebe",
    name: "Rekebki Tsega Abebe",
    role: "Associate",
    email: "rekebki@tbestlaw.com",
    portrait: rekebkiPortraitAlt,
    portraitAlt: rekebkiPortrait,
    card: rekebkiNew,
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
    photo: bezawitFekedeNew,
    clip: "/new/bezawit-fekede/compressed/p3_01354197.webm",
    focus: [],
    strapline: "Junior accountant supporting the firm's finance function.",
    bio: "Bezawit Fekede is a Junior Accountant at TBeST Law. She graduated from Unity University in Accounting and Finance. Before joining TBeST Law she worked at Elias Damtew Certified Accountant, where she maintained accounting records and financial documentation, processed invoices, payment vouchers and expense claims, handled accounts payable and receivable, and supported payroll preparation and compliance.",
    credentials: ["BA in Accounting and Finance, Unity University (2024)"],
  },
  {
    slug: "hikma-tessema-wolde",
    name: "Hikma Tessema",
    role: "Associate",
    email: "hikma@tbestlaw.com",
    portrait: hikmaNew,
    card: hikmaNew,
    photo: hikmaNew,
    focus: ["Tax", "Employment"],
    strapline: "Associate whose practice focuses on employment and tax law.",
    bio: "Hikma Tessema is an Associate whose practice focuses on Employment and Tax Law.\n\nShe holds a Master of Laws (LL.M.) in Business Law from Addis Ababa University, where she graduated with Very Great Distinction, and a Bachelor of Laws (LL.B.) from the same university, graduating with Distinction.\n\nPrior to joining the firm, Hikma worked at Mesfin Debebe Corporate Legal Services as a Tax and Corporate Legal Associate. She has also worked as a Junior Legal Associate at Iron Cord Investment Consultancy PLC. Her professional experience includes advising domestic and international clients on tax, employment, corporate and commercial law, investment, regulatory compliance, immigration and dispute resolution matters.\n\nBeyond corporate legal practice, Hikma has contributed to legal aid, community service, and capacity-building initiatives through engagements with the Danish Refugee Council (DRC), UNHCR, and Addis Ababa University's Center for Human Rights, providing legal assistance to refugees and vulnerable communities.",
    credentials: [
      "LL.M. in Business Law, Addis Ababa University",
      "LL.B., Addis Ababa University",
    ],
    languages: ["English", "Amharic"],
  },
  {
    slug: "kidest-abate",
    name: "Kidest Abate",
    role: "Associate",
    email: "kidest@tbestlaw.com",
    portrait: kidestNew,
    card: kidestNew,
    photo: kidestNew,
    focus: ["Corporate", "Immigration", "Investment", "Compliance"],
    strapline:
      "Associate advising on corporate, investment, immigration and compliance matters.",
    bio: "Kidest Abate is an Associate at TBeST Law. She graduated from Debre Berhan University School of Law.\n\nPrior to joining TBeST Law, Kidest worked for three years at Tsegamlak Solomon & Associates Law Office, advising local and international clients on corporate, tax, investment, and compliance matters. Her work included legal due diligence for private equity investors, foreign direct investors, and startups, as well as contract drafting and negotiation, regulatory filings, and legal opinions.",
    credentials: ["LL.B, Debre Berhan University (September 2022)"],
    languages: ["English", "Amharic"],
  },
  {
    slug: "mistre-ashenafi",
    name: "Mistre Ashenafi",
    role: "Junior Associate",
    email: "mistre@tbestlaw.com",
    portrait: mistreNew,
    card: mistreNew,
    photo: mistreNew,
    focus: [],
    strapline:
      "Junior associate supporting corporate, employment, NGO, commercial and tax matters.",
    bio: "Mistre Ashenafi is a Junior Associate at TBeST Law. She graduated with great distinction from Hawassa University School of Law in 2026. Prior to joining TBeST Law, she worked as a Risk and Legal Analyst at Grant Thornton Advisory Ethiopia, where she supported the team with legal, risk, and compliance related work. She also gained practical legal experience through internships at Mehretab and Getu Advocates LLP and Haymanot and Advocates Law Office. Her experience includes legal research, analysis, and support in corporate, employment, NGO, commercial, and tax matters.",
    credentials: ["LL.B, Hawassa University, with Great Distinction (June 2026)"],
    languages: ["English", "Amharic"],
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
 * Lawyer titles, most senior first — the order the roster is shown in. Listed
 * rather than inferred for the same reason as the business-services roles
 * above; a title missing from here sorts to the end of the roster rather than
 * to the front of it.
 */
const lawyerRanks: readonly string[] = [
  "Managing Partner",
  "Partner",
  "Of Counsel",
  "Senior Associate",
  "Associate",
  "Junior Associate",
];

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

/** Everyone in business services. */
export const businessServices = team.filter((member) =>
  businessServicesRoles.includes(member.role),
);

/**
 * Selected experience for a partner, grouped under the practice areas their
 * profile on the old site used. Held in team-experience.json (migrated from
 * those pages) and keyed by slug. Members without a published list return an
 * empty array.
 */
export function teamMemberExperience(
  slug: string,
): NonNullable<TeamMember["experience"]> {
  return (
    (teamExperience as Record<string, { area: string; items: string[] }[]>)[
      slug
    ] ?? []
  );
}

export function teamMemberBySlug(slug: string): TeamMember | undefined {
  return team.find((member) => member.slug === slug);
}
