/**
 * The nine practice areas, mirroring the content of the existing tbestlaw.com
 * practice pages. `blurb` is a short summary written for cards and listings;
 * `intro` and `services` carry the firm's own page copy.
 */
export type Practice = {
  slug: string;
  name: string;
  /** Short summary for cards and index listings. */
  blurb: string;
  /** The instrument or body of law the practice works under. */
  statute: string;
  intro: readonly string[];
  servicesLead: string;
  services: readonly string[];
};

/**
 * What the navigation, the footer and the home page need from a practice:
 * enough to draw a link or a card, and nothing else. It lives here rather than
 * in the server-only data layer because client components import the type.
 */
export type PracticeLink = {
  slug: string;
  name: string;
  blurb: string;
  /** A Cloudinary URL when one was uploaded; otherwise blank. */
  image: string;
};

export const practices: readonly Practice[] = [
  {
    slug: "investment",
    name: "Investment",
    blurb:
      "Entry structuring, licensing and incentives for investors establishing and expanding in Ethiopia.",
    statute: "Investment Proclamation No. 1180/2020",
    intro: [
      "With the increasing liberalization of foreign direct investment regulations in Ethiopia, there are greater opportunities for foreign investors to invest in a wide range of businesses from agriculture to the telecom sector, in brown or green-field investments, either alone or in joint venture with local entrepreneurs.",
      "Our lawyers help clients through the administrative and regulatory procedures of investing in Ethiopia, from entry to exit, by ensuring full protection for their FDI as well as their intellectual property rights. We help clients optimize their investments in Ethiopia by taking advantage of all the fiscal and non-fiscal incentives made available to foreign investors under Ethiopian laws.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Conducting jurisdictional due diligence on Ethiopian investment and other applicable laws",
      "Advising on FDI privileges and restrictions",
      "Registering foreign investment entities, branches of foreign companies, project (contract) offices and representative offices",
      "Registering foreign investment capital as well as foreign loans and supplier credits, intellectual property rights, technology transfer agreements and collaboration agreements with domestic investors",
      "Advising on and processing duty-free privileges and tax incentives appropriate to each FDI",
      "Advisory and representation services in relation to bilateral investment treaties",
      "Providing post-registration legal services to investors and foreigners doing business in Ethiopia",
    ],
  },
  {
    slug: "corporate",
    name: "Corporate",
    blurb:
      "Formation, governance, shareholder arrangements and day-to-day commercial contracting.",
    statute: "Commercial Code, Book One — Traders, Trade and Businesses",
    intro: [
      "Our lawyers possess the most relevant experience in advising and representing corporate clients in M&A transactions, equity and debt financing, corporate governance, corporate restructuring and regulatory compliance.",
      "Our Corporate practice group has a well-honed knowledge and experience in assisting clients in all aspects of commercial law and corporate governance, including in optimizing entity forms, conversions of business entities, and ensuring that groups and affiliated companies are fully compliant with the commercial laws of Ethiopia.",
    ],
    servicesLead: "Our services include assisting clients on:",
    services: [
      "Regulatory issues relating to equity and debt financing",
      "The form of optimal business entity taking into account commercial and tax laws of Ethiopia and other objective considerations",
      "Corporate governance matters, such as advice on boards of directors and supervisory boards",
      "Capital market regulations and directives",
      "Capital structures of companies, including structuring of premium capital accounts",
      "The structures of shares and dividend distribution policies",
      "Conversions of entity forms, including conversions of private limited companies into one-person companies",
      "Regulations concerning groups of companies, parent-subsidiary relationships and holding companies",
      "Corporate reorganizations including mergers, acquisitions, splits and spinoffs",
      "Regulations concerning branches of foreign business organizations, including the setting-up of foreign representative offices",
    ],
  },
  {
    slug: "mergers-and-acquisitions",
    name: "Mergers and Acquisitions",
    blurb:
      "Due diligence, transaction structuring, negotiation and post-completion integration.",
    statute: "Commercial Code — Business Organizations",
    intro: [
      "Our lawyers help clients navigate the M&A regulatory environment of Ethiopia. We help clients in optimizing the form of M&A transactions and deals, conducting legal due diligence, negotiating the buy and sell agreements, reorganizing and restructuring the participant entities, and facilitating a smooth transition in the post-transaction period.",
      "We work with parties in devising strategies for effective communication and negotiation to achieve desirable outcomes. Our M&A lawyers communicate seamlessly with both local and foreign advisors in cross-border transactions, breaking the cultural, linguistic and epistemic barriers that hinder negotiations and deals over joint venture transactions.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Conducting full-scope, red flag or selective-focus legal due diligence either from the buy or sell side",
      "Drafting and negotiating preliminary transactional documents including term sheets, LOIs and NDAs",
      "Reorganizing the form and structure of existing entities to the needs of the transaction",
      "Drafting and negotiating share purchase and shareholder agreements, and concluding the agreements on behalf of clients",
      "Following up completion of all closing conditions of transactional documents, including executing all compliance actions for protecting investment and intellectual property rights of new investors",
      "Working with JV partners towards a smooth transition to a new partnership business culture, including conducting training towards successful transition through customized integration",
      "Providing post-transaction care to our clients on all matters legal and regulatory",
    ],
  },
  {
    slug: "employment-and-corporate-immigration",
    name: "Employment and Corporate Immigration",
    blurb:
      "Workforce structuring, employment disputes, work permits and expatriate mobility.",
    statute: "Commercial Code — Commercial Employees and Agents",
    intro: [
      "Businesses, non-profit organizations, embassies and international organizations, new or established, require practical legal guidance on local labour law and immigration matters.",
      "Our team of highly experienced lawyers is known for providing proactive and solution-focused legal counsel on a wide range of labour law matters, which help clients avoid or minimize costly and time-consuming employment litigation.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Drafting employment contracts for managerial and non-managerial employees",
      "Drafting and reviewing collective agreements and work rules",
      "Preparing different types of notice letters and separation agreements",
      "Assisting clients with collective bargaining and agreements",
      "Counselling on employee benefits, occupational health and safety, and employee layoff or reduction of work force",
      "Advising on grounds for termination and applicable termination payments including severance and compensation",
      "Undertaking employment law due diligence in relation to transfer of businesses",
      "Advising on Ethiopian immigration requirements",
      "Processing and renewing work and residence permits for expatriates",
    ],
  },
  {
    slug: "intellectual-property-and-technology",
    name: "Intellectual Property and Technology",
    blurb:
      "Trademark and patent portfolios, licensing, data and technology transactions.",
    statute: "Trademark, patent and technology transfer",
    intro: [
      "Our lawyers have breadth of experience undertaking a wide range of contentious and non-contentious intellectual property work. We register, manage and enforce IP rights in Ethiopia.",
      "In the area of technology law, we help clients understand jurisdictional issues and ensure the operation of their businesses in a legally compliant manner.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Trademark, copyright and patent registrations, renewals and recordals",
      "Advising on and registering trademark licensing and assignment agreements",
      "Trademark and copyright litigation before the Ethiopian Intellectual Property Authority's Tribunal and the Federal Courts",
      "Advising clients on Ethiopian telecom laws",
      "Advising on the emerging e-commerce laws of Ethiopia",
      "Data protection, privacy and security",
      "Drafting, reviewing and registering technology transfer agreements",
      "Drafting and reviewing franchising agreements",
    ],
  },
  {
    slug: "competition",
    name: "Competition",
    blurb:
      "Merger notifications, trade practice compliance and regulatory investigations.",
    statute: "Trade competition and consumer protection",
    intro: [
      "With a growing number of mergers and acquisitions that directly and indirectly involve Ethiopian companies, there is a need to understand and comply with Ethiopian competition regulations, and in some cases submit to the jurisdiction of the COMESA Competition Commission. The application of these laws is sometimes complex and requires a tactful approach to operate as efficiently as possible within the legal limits.",
      "Our team has extensive experience advising on the national and regional competition regulations in place, including merger notification requirements, preparing necessary documentation, and making submissions to national and regional regulators. We also represent clients before the competition authority to resolve regulatory issues and defend competition-related lawsuits.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Providing legal advice and formal opinions on merger filing obligations for contemplated transactions",
      "Completing applicable forms and preparing documentation to assist clients submit merger notifications to the Ethiopian Competition Authority or the COMESA Competition Commission",
      "Following up assessment of a notified merger by the competition authorities, providing any missing or requested information until receipt of a merger clearance",
      "Representing clients before the competition authorities to defend adverse regulatory decisions and competition-related lawsuits, from the competition tribunals to the highest appellate courts",
    ],
  },
  {
    slug: "tax",
    name: "Tax",
    blurb:
      "Tax and customs planning, rulings, audits and representation in tax disputes.",
    statute: "Federal tax and customs administration",
    intro: [
      "Few law firms in Ethiopia can stake a claim to the knowledge and experience our lawyers possess in Ethiopian tax law and practice, including international taxation. Our lawyers advise clients on tax optimization of investments and business restructurings from the moment of entry into the Ethiopian market to the final exit.",
      "We represent and defend our clients against adverse tax assessments from the inception of tax audits to the highest appellate courts in the country, and work with clients in developing tested strategies for mitigation of future adverse assessments. We also assist clients on customs matters, including import-export procedures, identification of applicable customs duties and taxes, and representation on adverse decisions of the Customs Authorities.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Conducting tax due diligence to ensure that all tax payments are current in all types of applicable taxes in Ethiopia",
      "Evaluating a target company's past and ongoing tax audits to see what prompted them and their impact on a contemplated transaction",
      "Assessing a target company's international tax obligations, including whether payments made require any withholding",
      "Providing tailored advice to help clients get a working knowledge of the Ethiopian tax system and minimize future tax liabilities",
      "Providing clear, practice-oriented answers to clients' tax and customs law questions",
      "Analyzing client-provided information to ensure compliance with applicable tax laws",
      "Conducting specific research on tax laws and policies, including to propose amendments in clients' particular areas of interest",
      "Representing clients in ongoing tax investigations and tax audit exit conferences",
      "Preparing and submitting applications to tax authorities in request of support services or defence of adverse tax decisions",
      "Submitting tax objection notifications and defending clients on adverse tax assessments, from branch office tax review departments to the highest appellate courts",
      "Offering practice-tested training on the tax laws of Ethiopia, including excise tax laws and directives, VAT, applicable withholding taxes, customs and stamp duties",
      "Preparing training manuals for clients' internal induction training",
      "Developing tax-specific checklists for clients' own follow-up of compliance obligations",
    ],
  },
  {
    slug: "insolvency-and-corporate-restructuring",
    name: "Insolvency and Corporate Restructuring",
    blurb:
      "Reorganisation, preventive restructuring, workouts and creditor representation.",
    statute: "Commercial Code, Book Three — Bankruptcy",
    intro: [
      "Companies facing financial difficulties can now use the new Commercial Code rules of preventive restructuring and reorganization proceedings to forestall liquidation and, if successful, rehabilitate their businesses.",
      "Having been involved in the drafting of the insolvency, restructuring and reorganization provisions of the new Commercial Code of Ethiopia, our lawyers work with clients in developing workable restructuring or reorganization plans, negotiating with creditors, obtaining the qualified votes and securing confirmation from the bankruptcy court. Our lawyers also have the most relevant knowledge in obtaining approval for sale of a business as a going concern, leveraging their lateral knowledge in mergers and acquisitions.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Applying to the bankruptcy court for opening restructuring, reorganization or bankruptcy proceedings, whichever is most appropriate",
      "Seeking the appointment of experts in restructuring, a supervisor in reorganization, or a trustee in bankruptcy proceedings",
      "Developing, together with debtors, restructuring or reorganization plans and plans for sale of a business as a going concern most likely to secure the qualified majorities for approval and confirmation",
      "Taking all actions necessary to protect client interests in proceedings, including representation in negotiations and approvals of plans, obtaining stays of execution where appropriate, new or interim insolvency finance, and drafting business sale agreements",
    ],
  },
  {
    slug: "dispute-resolution",
    name: "Dispute Resolution",
    blurb:
      "Litigation before all federal courts, arbitration and negotiated settlements.",
    statute: "Federal courts, arbitration and settlement",
    intro: [
      "TBeST Law gives the highest priority to preventing disputes from happening, by protecting clients through effective planning, careful preliminary investigation and tactful legal drafting. But when disputes arise, our lawyers are experts at finding the best negotiated solutions or guiding clients through effective mediation.",
      "Where arbitration and litigation are involved, our lawyers help clients successfully navigate the complex arenas in each specialized area of the law. We represent clients in litigation particularly in the areas of tax, intellectual property and competition law.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Identification of clients' particular disputes and advising on the appropriate course of action, including applicable dispute resolution mechanisms",
      "Drafting effective notices to be delivered on behalf of clients",
      "Negotiating on behalf of clients and assisting on their mediations",
      "Writing expert opinions on various areas of the law for clients' international arbitration proceedings",
      "Representing clients in ad-hoc and institutional arbitration proceedings and court litigation in our core competence areas",
      "Facilitating off-counsel services on specialized arbitrations and litigation, and following up the service provision to our clients",
    ],
  },
];

export function practiceBySlug(slug: string): Practice | undefined {
  return practices.find((practice) => practice.slug === slug);
}
