import bodies from "./insight-bodies.json";

/**
 * Insights published by the firm, migrated from tbestlaw.com. Metadata (title,
 * date, authors, summary, topic, category) lives here; the full article bodies
 * live in insight-bodies.json, keyed by slug, and are read via getInsightBody.
 */
export type InsightCategory = "Legal Updates" | "Blog" | "News";

export type Insight = {
  slug: string;
  title: string;
  /** ISO date, for sorting and <time dateTime>. */
  date: string;
  authors: readonly string[];
  summary: string;
  topic: string;
  category: InsightCategory;
};

/** A single rendered block of an article body. */
export type InsightBlock =
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string }
  | { kind: "paragraph"; text: string };

const legalUpdates = [
  {
    slug: "performance-based-investment-incentives-586-2026",
    title:
      "Transition to Performance-Based Investment Incentives under Regulation No. 586/2026",
    date: "2026-04-20",
    authors: [],
    summary:
      "The Council of Ministers has repealed Investment Incentive Regulation No. 517/2022 and issued new tax and investment incentive rules under the Investment, Income Tax and Customs Proclamations.",
    topic: "Investment",
  },
  {
    slug: "directive-1082-2025-foreign-participation-in-restricted-trade",
    title:
      "From Reform to Refinement: Ethiopia to Update the Directive on Foreign Participation in Restricted Export, Import, Wholesale and Retail Trade",
    date: "2025-06-06",
    authors: [],
    summary:
      "Ethiopian Investment Board Directive No. 1082/2025 revisits foreign investor participation in restricted trade, building on Directive No. 1001/2024 issued in March 2024.",
    topic: "Investment",
  },
  {
    slug: "real-estate-proclamation-1357-2024",
    title: "A Landmark Development for Ethiopia's Real Estate Sector",
    date: "2024-12-05",
    authors: ["Sisay Habte", "Michael Mengistu"],
    summary:
      "The House of Peoples Representatives has passed the Real Estate Development and Real Property Marketing and Valuation Proclamation as Proclamation No. 1357/2024.",
    topic: "Real Estate",
  },
  {
    slug: "personal-data-protection-proclamation-1321-2024",
    title:
      "Ethiopia's Personal Data Protection Proclamation Enters into Force",
    date: "2024-08-20",
    authors: ["Bezawit Yirga", "Benyam Tafesse"],
    summary:
      "Proclamation No. 1321/2024 on Personal Data Protection has been published in the official gazette, establishing Ethiopia's data protection framework.",
    topic: "Data Protection",
  },
  {
    slug: "immigration-service-fee-rates-regulation-550-2024",
    title:
      "Fee Rates Payable for Services Provided by the Ethiopian Immigration and Nationality Service, under Council of Ministers Regulation No. 550/2024",
    date: "2024-08-09",
    authors: ["Benyam Tafesse", "Bezawit Yirga"],
    summary:
      "On 7 July 2024 the Council of Ministers issued a new regulation setting the fee rates payable for immigration and nationality services.",
    topic: "Immigration",
  },
  {
    slug: "navigating-the-green-directive-faq",
    title: "Navigating the Green Directive: Frequently Asked Questions",
    date: "2024-08-06",
    authors: [],
    summary:
      "The National Bank of Ethiopia's directive marks a shift towards a market-based exchange rate system. Common questions answered.",
    topic: "Banking",
  },
  {
    slug: "carbon-trading-forest-regulation-544-2024",
    title:
      "Carbon Trading under the Forest Development Protection and Utilization Regulation No. 544/2024",
    date: "2024-06-28",
    authors: [],
    summary:
      "The Forest Development Protection and Utilization Regulation No. 544/2024 became effective on 4 April 2024, introducing a framework for carbon trading.",
    topic: "Energy and Environment",
  },
  {
    slug: "excise-stamp-management-directive-1004-2024",
    title:
      "Legal Update on the New Excise Stamp Management Directive No. 1004/2024: Key Regulations and Requirements",
    date: "2024-06-18",
    authors: [],
    summary:
      "The Ministry of Finance issued the Excise Stamp Management Directive No. 1004/2024 in June 2024, setting new requirements for excisable goods.",
    topic: "Tax",
  },
  {
    slug: "transfer-pricing-directive-981-2024",
    title:
      "A Revival of an Old Ethiopian Transfer Pricing Directive: How Does the Renumbered TP Directive Affect Taxpayers?",
    date: "2024-04-15",
    authors: ["Dr. Taddese Lencho"],
    summary:
      "The dormant Transfer Pricing Directive of 2015 has been renumbered and reissued by the Ministry of Finance as Directive No. 981/2024.",
    topic: "Tax",
  },
  {
    slug: "foreign-investment-wholesale-retail-import-export",
    title:
      "Foreign Investment Inflows: New Era for Wholesale, Retail, Import and Export Sectors",
    date: "2024-04-12",
    authors: ["Dr. Taddese Lencho", "Sisay Habte"],
    summary:
      "Wholesale, retail, import and export were long the exclusive preserve of Ethiopian nationals. Regulation No. 474/2020 changes that.",
    topic: "Investment",
  },
  {
    slug: "mof-circular-foreign-currency-approvals",
    title:
      "Ethiopian Ministry of Finance Issues Circular Amending Foreign Currency Approvals",
    date: "2024-03-11",
    authors: ["Tibebe Zewdu"],
    summary:
      "A circular issued on 7 March 2024 amends the Ministry's earlier circular of 14 October 2022 restricting foreign currency approvals.",
    topic: "Banking",
  },
  {
    slug: "acso-directive-986-2024-foreign-charitable-organizations",
    title:
      "ACSO's New Directive on Registering and Administration of Foreign Charitable Organizations",
    date: "2024-02-20",
    authors: ["Sisay Habte"],
    summary:
      "Authority for Civil Society Organizations Directive No. 986/2024 sets out registration and administration requirements for foreign charitable organizations.",
    topic: "NGOs",
  },
  {
    slug: "offshore-accounts-strategic-fdi",
    title: "Ethiopia Allows Offshore Accounts for Strategic FDI Investments",
    date: "2023-09-13",
    authors: ["Dr. Taddese Lencho"],
    summary:
      "The National Bank of Ethiopia has authorised off-shore account opening and operation for strategic foreign direct investment.",
    topic: "Banking",
  },
  {
    slug: "cassation-ruling-valuation-of-imported-goods",
    title:
      "Cassation Bench of the Federal Supreme Court Ruling on Valuation of Imported Goods",
    date: "2023-09-07",
    authors: ["Tibebe Zewdu"],
    summary:
      "Interpretation rendered by the Cassation Division binds from the date of decision under Federal Courts Proclamation No. 1234/2020. What that means for customs valuation.",
    topic: "Tax",
  },
  {
    slug: "doing-business-via-non-profits",
    title:
      "Doing Business via Non-Profits: A Look at the Newly Enacted Directive on Income Generating Activities",
    date: "2023-01-14",
    authors: ["Sisay Habte"],
    summary:
      "The Civil Society Proclamation No. 1113/2019 allows CSOs to engage in business and investment to raise funds. A new directive sets the terms.",
    topic: "NGOs",
  },
  {
    slug: "new-investment-tax-incentive-regulations",
    title:
      "What is “New” about the New Investment [Tax] Incentive Regulations?",
    date: "2022-08-04",
    authors: [],
    summary:
      "Investment Incentive Regulation No. 517/2022 replaces the incentive regulations in place since 2012. What actually changed.",
    topic: "Investment",
  },
  {
    slug: "stamp-duties-or-stamps-of-evidence",
    title: "Stamp Duties or Stamps of Evidence?",
    date: "2022-05-17",
    authors: [],
    summary:
      "The Books of Accounts Directive appears to revive enforcement of the 1998 stamp duty law by conditioning tax benefits on payment of stamp duties.",
    topic: "Tax",
  },
];

const blog = [
  {
    slug: "assimilating-loan-agreements-to-bonds",
    title:
      "Assimilating Loan Agreements to Bonds: Is the Ethiopian Tax Authority Prepared to Levy Duties on Loan Agreements?",
    date: "2023-01-04",
    authors: ["Tibebe Zewdu"],
    summary:
      "The Ministry of Revenues has extended the Stamp Duty Proclamation's definition of \"bond\" to include loan agreements. A look at whether that reading holds — and whether it can be enforced.",
    topic: "Tax",
  },
  {
    slug: "about-opc-one-person-company",
    title: "About OPC (the One-Person Company)",
    date: "2022-10-06",
    authors: [],
    summary:
      "The revised Commercial Code introduces the one-person company. What it is, and why it matters for entrepreneurs in Ethiopia.",
    topic: "Corporate",
  },
  {
    slug: "of-dogs-humans-and-security-cameras",
    title: "Of Dogs, Humans and Security Cameras",
    date: "2021-04-29",
    authors: ["Dr. Taddese Lencho"],
    summary:
      "A commentary on the general rule of tax deductibility under Ethiopia's Federal Income Tax Proclamation, and where its limits lie.",
    topic: "Tax",
  },
];

const news = [
  {
    slug: "insolvency-practitioners-workshop",
    title: "Insolvency Practitioners Workshop",
    date: "2023-04-13",
    authors: [],
    summary:
      "TBeST Law took part in the first Insolvency Practitioners Training Program organised by the World Bank Group, held 4–6 April 2023 in Addis Ababa.",
    topic: "Insolvency",
  },
  {
    slug: "tbest-law-llp-registered-as-llp",
    title:
      "TBeST Law LLP is Officially Registered as a Limited Liability Partnership",
    date: "2022-12-06",
    authors: [],
    summary:
      "TBeST Law is now formally registered as a Limited Liability Partnership — a milestone in the firm's growth.",
    topic: "Firm",
  },
];

/** Everything, tagged by category and sorted most-recent first. */
export const insights: readonly Insight[] = [
  ...legalUpdates.map((i) => ({ ...i, category: "Legal Updates" as const })),
  ...blog.map((i) => ({ ...i, category: "Blog" as const })),
  ...news.map((i) => ({ ...i, category: "News" as const })),
].sort((a, b) => (a.date < b.date ? 1 : -1));

/** The three content streams, in the order the old site presented them. */
export const insightCategories: readonly InsightCategory[] = [
  "Legal Updates",
  "Blog",
  "News",
];

export function insightsByCategory(category: InsightCategory): Insight[] {
  return insights.filter((insight) => insight.category === category);
}

/**
 * The migrated article body for a slug, as renderable blocks. Consecutive
 * list items are grouped into a single list block.
 */
export function getInsightBody(slug: string): InsightBlock[] {
  const entry = (bodies as Record<string, { body: string[] }>)[slug];
  if (!entry) return [];
  const blocks: InsightBlock[] = [];
  for (const line of entry.body) {
    if (line.startsWith("## ")) {
      blocks.push({ kind: "heading", text: line.slice(3) });
    } else if (line.startsWith("- ")) {
      const item = line.slice(2);
      const last = blocks[blocks.length - 1];
      if (last && last.kind === "list") last.items.push(item);
      else blocks.push({ kind: "list", items: [item] });
    } else if (line.startsWith("> ")) {
      blocks.push({ kind: "quote", text: line.slice(2) });
    } else {
      blocks.push({ kind: "paragraph", text: line });
    }
  }
  return blocks;
}

export const insightTopics = [
  ...new Set(insights.map((insight) => insight.topic)),
].sort();

export function formatInsightDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function insightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

/** Other insights, most recent first, for the "more updates" rail. */
export function otherInsights(slug: string, limit = 3): Insight[] {
  return insights.filter((insight) => insight.slug !== slug).slice(0, limit);
}
