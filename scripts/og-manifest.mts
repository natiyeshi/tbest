/**
 * Emits the list of share cards to build, as JSON on stdout.
 *
 * It reads the real content modules rather than a second copy of the roster,
 * so a team member or practice added there shows up here on the next run. The
 * image stub loader (scripts/image-stub-loader.mjs) turns each photograph
 * import into the path it came from; the Python builder opens those directly.
 */
import { firm, team } from "../src/lib/content";
import { insights } from "../src/lib/insights";
import { getInsightImage, getPracticeImage } from "../src/lib/practice-images";
import { practices } from "../src/lib/practices";
import { sectors } from "../src/lib/sectors";

type Staticish = { src: string };

const path = (image: unknown) => (image as Staticish).src;

type Card = {
  out: string;
  layout: "portrait" | "wide";
  photo: string | null;
  eyebrow: string;
  title: string;
  sub: string;
  focusY?: number;
};

const teamCards: Card[] = team.map((member) => ({
  out: `team/${member.slug}.jpg`,
  layout: "portrait",
  photo: path(member.photo),
  eyebrow: member.role,
  title: member.name,
  sub: member.strapline,
}));

const practiceCards: Card[] = practices.map((practice) => ({
  out: `practices/${practice.slug}.jpg`,
  layout: "wide",
  photo: path(getPracticeImage(practice.slug)),
  eyebrow: "Practice area",
  title: practice.name,
  sub: practice.blurb,
}));

const sectorCards: Card[] = sectors.map((sector) => ({
  out: `sectors/${sector.slug}.jpg`,
  layout: "wide",
  photo: path(getPracticeImage(sector.slug)),
  eyebrow: "Sector",
  title: sector.name,
  sub: sector.blurb,
}));

const insightCards: Card[] = insights.map((insight) => ({
  out: `updates/${insight.slug}.jpg`,
  layout: "wide",
  photo: path(getInsightImage(insight.topic)),
  eyebrow: insight.category,
  title: insight.title,
  sub: insight.summary,
}));

// The fixed pages. `photo` is resolved against public/ by the builder when it
// is a bare path rather than something an import produced.
const pageCards: Card[] = [
  {
    out: "default.jpg",
    layout: "wide",
    photo: "PUBLIC:/new/team/original/b32.jpg",
    eyebrow: "Addis Ababa, Ethiopia",
    title: firm.name,
    sub: firm.tagline,
    focusY: 0.28,
  },
  {
    out: "about-us.jpg",
    layout: "wide",
    photo: "PUBLIC:/new/team/original/b41.jpg",
    eyebrow: "About us",
    title: "A full service firm for corporate and commercial work",
    sub: "Our lawyers helped draft the Ethiopian Commercial Code, and the country's investment and tax laws.",
    focusY: 0.35,
  },
  {
    out: "team.jpg",
    layout: "wide",
    photo: "PUBLIC:/new/team/original/b33.jpg",
    eyebrow: "Our people",
    title: "The team",
    sub: "The lawyers and business services team of TBeST Law LLP.",
    focusY: 0.2,
  },
  {
    out: "practices.jpg",
    layout: "wide",
    photo: "PUBLIC:/new/team/original/b45.jpg",
    eyebrow: "What we do",
    title: "Practice areas",
    sub: "Counsel across investment, corporate, tax, competition, employment, IP and dispute resolution.",
    focusY: 0.35,
  },
  {
    out: "sectors.jpg",
    layout: "wide",
    photo: "PUBLIC:/hero/addis-skyline.jpg",
    eyebrow: "Where we work",
    title: "Industry sectors",
    sub: "The industries the firm advises across Ethiopia.",
    focusY: 0.45,
  },
  {
    out: "updates.jpg",
    layout: "wide",
    photo: "PUBLIC:/new/team/original/b49.jpg",
    eyebrow: "Insight",
    title: "Legal updates, blog and news",
    sub: "Commentary on Ethiopian law from the lawyers of TBeST Law LLP.",
    focusY: 0.3,
  },
  {
    out: "contact-us.jpg",
    layout: "wide",
    photo: "PUBLIC:/hero/addis-skyline.jpg",
    eyebrow: "Get in touch",
    title: "Contact us",
    sub: `${firm.offices[0].street} — ${firm.email}`,
    focusY: 0.45,
  },
];

const cards = [
  ...pageCards,
  ...teamCards,
  ...practiceCards,
  ...sectorCards,
  ...insightCards,
];

process.stdout.write(JSON.stringify(cards, null, 2));
