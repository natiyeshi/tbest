/**
 * The nine industry sectors, mirroring the content of the existing
 * tbestlaw.com sector pages.
 */
export type Sector = {
  slug: string;
  name: string;
  /** Short summary for cards and index listings. */
  blurb: string;
  intro: readonly string[];
  servicesLead: string;
  services: readonly string[];
};

export const sectors: readonly Sector[] = [
  {
    slug: "financial-services",
    name: "Financial Services",
    blurb:
      "Cross-border finance, National Bank directives and the opening of the Ethiopian banking market.",
    intro: [
      "Long dominated by state-owned banks and restricted to Ethiopian nationals, the opening-up of the Ethiopian financial sector to foreign investment is bound to create a heightened interest in Ethiopia as a destination for foreign direct investment. Coupled with the recent liberalization of the telecom sector, its lateral expansion into mobile banking, and the promising growth of the fintech industry, the financial sector will soon become one of the biggest blocks of FDI inflows to Ethiopia.",
      "With several years of experience advising clients on cross-border financial issues, and leveraging our expertise in corporate, commercial and M&A work, our lawyers are well positioned to advise and represent clients in complex financial transactions, including preparing for the consolidation of domestic banks and the entry of foreign banks into the Ethiopian market.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Advising and representing clients in cross-border financial transactions, such as equity and debt financing of companies in Ethiopia",
      "Advising on National Bank directives covering foreign loans, suppliers' credits and export credit guarantees",
      "Advising and representing clients in cross-border trade financing",
      "Advising and representing clients in the financial aspects of mergers and acquisitions",
      "Drafting and assisting in drafting credit facilities, and advising on the legality, validity and enforceability of foreign loans and credit facilities to government and state-owned enterprises, as well as sovereign guarantees issued by the Ministry of Finance",
      "Conducting limited or comprehensive due diligence investigations on Ethiopian borrowers on matters such as capacity, required authorization and validity of loan and credit facilities",
      "Advising and representing clients in connection with guarantees and securities given for foreign loans and credit facilities",
      "Advising and assisting foreign financial institutions on opening subsidiaries and branches",
      "Assisting foreign financial institutions with the establishment of commercial representative offices, or establishing relationships and alliances with local banks",
      "Advising and representing clients in respect of the emerging capital markets laws of Ethiopia",
      "Advising and assisting in banking consolidations through banking mergers and acquisitions",
      "Advising and representing clients on regulatory matters concerning banks and other financial institutions",
    ],
  },
  {
    slug: "private-equity",
    name: "Private Equity",
    blurb:
      "Joint ventures and investment structuring for private equity and venture capital investors.",
    intro: [
      "The complex suite of negotiations and agreements establishing joint venture partnerships between foreign private equity firms and local entrepreneurs requires knowledgeable lawyers who can help clients establish trust and build strategic partnerships that are mutually beneficial for the JV partners.",
      "Our lawyers have a wealth of experience advising and representing private equity and venture capital investors as well as local entrepreneurs.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Conducting jurisdictional legal due diligence for private equity firms considering investment opportunities in Ethiopia",
      "Conducting buyer-side or vendor-side legal due diligence",
      "Drafting and negotiating term sheets, LOIs and NDAs with potential local partners",
      "Facilitating cordial relationships during negotiations between new and existing investors by highlighting the values of strategic business partnerships",
      "Drafting and negotiating share purchase and shareholder agreements, and concluding the agreements on behalf of clients",
      "Following up completion of all closing conditions of transactional documents, including compliance actions protecting investment and intellectual property rights of new investors",
      "Working with JV partners towards a smooth transition to a new partnership business culture, including training where required",
      "Providing post-transaction care to our clients on all matters legal and regulatory",
    ],
  },
  {
    slug: "mining-and-energy",
    name: "Mining and Energy",
    blurb:
      "Exploration and mining licensing, geothermal and biofuel, and renewable energy PPP projects.",
    intro: [
      "Ethiopia is endowed with natural resources such as minerals and gas, and the country also has plentiful renewable energy.",
      "Mining is one of the priority sectors identified by the Ethiopian Government, as the country has extensive mineral deposits including gold, gemstones and industrial minerals. Our lawyers have extensive experience advising investors on entry into the Ethiopian mining market, processing exploration and mining licenses, and advising on the intricate mining regulations of Ethiopia. We leverage our expertise in investment, mergers and acquisitions, tax and employment to provide a full suite of services to our mining clients.",
      "In the renewable energy sector, Ethiopia has developed a number of projects with a view to meeting ever-increasing domestic demand and increasing energy exports to neighbouring countries. The Government has put in place a PPP legal framework that enables the participation of the private sector in power generation, and our lawyers have been involved in major clean energy projects currently undertaken in a PPP format, advising both developers and financiers.",
    ],
    servicesLead: "Our services in the mining and energy sectors include:",
    services: [
      "Advising on the process of incorporating new mining, geothermal or biofuel companies, as well as their contractors or sub-contractors in Ethiopia",
      "Drafting the documents needed for incorporation of new companies or registration of contractors and sub-contractors",
      "Issuing legal opinions and conducting jurisdictional due diligence on Ethiopian mining, geothermal and biofuel laws",
      "Conducting limited legal due diligence where an investor is looking to enter a JV with an existing company",
      "Conducting limited legal due diligence on licenses held by local companies where transactions involve the transfer of title",
      "Drafting and negotiating transactional documents such as Memoranda of Understanding, Letters of Intent, term sheets, share purchase agreements, shareholders agreements and bylaws",
      "Drafting and negotiating license transfer agreements, and advising on and processing the transfer of mining licenses before the Ministry of Mines",
      "Advising on documentary requirements for applications for various types of mining licenses and following up with the regulators",
      "Advising on all types of legal matters relevant for actors in the energy sector under Ethiopian law",
      "Assisting IPPs in connection with tenders floated for energy PPPs",
      "Producing due diligence reports for IPPs and financiers",
      "Reviewing project documents and drafting contracts pertinent to PPP projects",
      "Advising on the financing aspects of PPP transactions under relevant laws and National Bank of Ethiopia directives",
      "Providing post-transaction care to our clients on all matters legal and regulatory",
    ],
  },
  {
    slug: "ngos",
    name: "NGOs",
    blurb:
      "Registration, framework agreements and compliance for local and international organizations.",
    intro: [
      "Ethiopian charities and societies regulation has undergone significant reform, enabling foreign organizations to work in areas such as the advancement of human and democratic rights, conflict resolution and reconciliation, which were previously restricted for foreign organizations. Still, charities and societies in Ethiopia continue to be very strictly regulated, and charities need to be aware of the general legal framework and the applicable restrictions and obligations that must be met to operate in a legally compliant manner.",
      "Clients benefit from our in-depth knowledge and experience of the key challenges in the sector and how best to resolve them. We leverage our expertise in tax, employment and other matters to provide a full suite of services to our NGO clients.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Advising clients on the legal and regulatory environment surrounding NGOs in Ethiopia",
      "Advising on the registration requirements for foreign and local NGOs",
      "Drafting and preparing the documentation required for registration in Ethiopia",
      "Processing the registration of both local and foreign NGOs, including registration of regional offices of international NGOs",
      "Drafting and negotiating framework agreements and exemptions",
      "Providing post-registration care to our clients on all matters legal and regulatory",
    ],
  },
  {
    slug: "real-estate-and-conveyancing",
    name: "Real Estate and Conveyancing",
    blurb:
      "Property due diligence, development joint ventures, leases and transfer of title.",
    intro: [
      "Our lawyers have in-depth knowledge of land and property regulations in Ethiopia. We have extensive experience conducting due diligence on properties, advising on the acquisition and disposal of assets, structuring joint venture agreements for real estate development, and processing the transfer of titles.",
      "We work to ensure properties purchased or developed are fully compliant and have the necessary approvals and permits to ensure a safe transaction for our clients.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Conducting legal due diligence investigation on properties, including the necessary searches at the land register",
      "Conducting KYC due diligence on joint venture partners",
      "Drafting transactional documents such as Memoranda of Understanding, term sheets and share purchase agreements for real estate joint venture investment",
      "Drafting property sale and purchase agreements",
      "Advising on the structuring and tax consequences of transactions",
      "Drafting, reviewing and negotiating commercial lease agreements",
      "Issuing legal opinions on the validity of title to properties",
      "Advising on and processing the issuance of title deeds",
    ],
  },
  {
    slug: "aviation",
    name: "Aviation",
    blurb:
      "Aircraft financing, leasing, registration and enforcement in the Ethiopian market.",
    intro: [
      "Ethiopia is one of the few African countries with a vibrant air transport industry. The industry, consisting of the state-owned Ethiopian Airlines Group, private operators and the associated supply chain, is a significant contributor to the nation's GDP.",
      "Our lawyers have extensive experience in aviation law and aircraft financing, and advise leasing companies, banks and other lenders involved in aircraft financing. Our lawyers author the Ethiopian chapters on Aircraft Financing, Registration, Security and Enforcement, and on Aircraft Liens, for Thomson Reuters (Sweet & Maxwell).",
    ],
    servicesLead: "Our services include:",
    services: [
      "Advising clients in connection with aircraft, engine and parts acquisition, sale, lease, Sale and Lease Back (SLB) and JOLCO transactions",
      "Assisting clients with local filings and registrations in the context of aircraft and engine related transactions",
      "Conducting general jurisdictional due diligence reports for leasing companies and financiers",
      "Conducting due diligence investigation on aircraft and engine lessees",
      "Processing landing permits",
      "Advising clients on Ethiopian aviation law matters",
      "Representing clients in aircraft liability cases",
    ],
  },
  {
    slug: "hospitality-and-leisure",
    name: "Hospitality and Leisure",
    blurb:
      "Hotel management agreements, brand deals and the regulatory framework for operators.",
    intro: [
      "Ethiopia, the seat of the African Union, is also home to Ethiopian Airlines, Africa's largest airline. With visa on arrival available to African Union citizens and some other countries, Ethiopia is a destination of growing interest for its diverse cultures, flora and fauna, and countless historic sights.",
      "Our lawyers have advised international hotel brands on management and consultancy agreements with local partners, negotiated brand deals, and advised on the regulatory framework for the operation of hotels, resorts and lodges in Ethiopia.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Conducting KYC due diligence on potential partners",
      "Drafting and negotiating management, technical and consultancy agreements",
      "Advising on the legal requirements of establishing a hospitality and leisure business in Ethiopia",
      "Registering and defending intellectual property rights of international hospitality brands",
      "Advising on the incorporation of a project office or subsidiary in Ethiopia",
      "Providing a full package of post-registration and incorporation legal services to hospitality and leisure clients",
    ],
  },
  {
    slug: "telecom-and-information-technology",
    name: "Telecom and Information Technology",
    blurb:
      "Licensing, infrastructure sharing, data protection and e-commerce in a liberalising market.",
    intro: [
      "The recent liberalization of the telecom sector has opened up considerable pent-up potential, not only in telecom but in the capacity of a competitive telecom sector to revitalize other sectors, most notably financial services. Since liberalization in 2019 the regulator, the Ethiopian Communications Authority, has been established and has issued a number of important directives; one private operator has formally joined the market, with a further operator license expected and partial privatization of the state-owned operator in the pipeline.",
      "Our lawyers have experience assisting clients in connection with tenders floated for telecom operator licenses, and regularly advise on a range of Ethiopian telecom law issues.",
    ],
    servicesLead: "Our services include:",
    services: [
      "Assisting clients with entry requirements for the telecom sector and the submission of RFPs for telecom licenses or joint ventures with the state-owned telecom company",
      "Providing general jurisdictional advice on laws directly impacting aspirant telecom companies or companies working in the sector",
      "Advising and assisting clients on procurement of telecom licenses, and their modification, renewal, suspension and revocation",
      "Advising telecom operators on sharing of network infrastructure and access service agreements",
      "Advising telecom operators on telecom tariff rules and competition laws, including the impact of telecom M&A on competition",
      "Advising telecom operators on consumer protection laws, including responding to consumer complaints and dispute settlement",
      "Advising clients on information security, data privacy and protection laws",
      "Advising clients on electronic payment systems and the e-commerce laws of Ethiopia",
      "Advising and assisting clients on corporate compliance for the telecom sector, leveraging our experience in investment, corporate, finance, M&A, tax, employment and intellectual property matters",
    ],
  },
  {
    slug: "media-sports-and-entertainment",
    name: "Media, Sports and Entertainment",
    blurb:
      "Betting and gaming permits, broadcaster licensing and talent contracting.",
    intro: [
      "The media, sports and entertainment sector has been growing rapidly in Ethiopia over the past few years. Our lawyers have hands-on experience assisting clients in this sector, from setting up sports betting businesses and affiliated services to advising entertainers on contractual relationships involving intellectual property and contract negotiation. We have also assisted well-known global news outlets and broadcasters, helping them navigate the Ethiopian media regulatory environment.",
    ],
    servicesLead: "Our services in the media, sports and entertainment sector include:",
    services: [
      "Incorporating sports betting businesses and securing betting permits for clients",
      "Developing and negotiating technical service agreements for betting technology providers",
      "Advising clients on the legal and institutional frameworks of the Ethiopian lottery and sports-betting sector",
      "Advising foreign news and broadcasting media on the requirements for obtaining a license in Ethiopia",
      "Assisting foreign broadcasters operating in Ethiopia on matters from visa and residence permits to employment law and customs regulations",
      "Assisting clients on corporate compliance for the media, sports and entertainment sector, leveraging our experience in investment, corporate, finance, M&A, tax, employment and intellectual property matters",
    ],
  },
];

export function sectorBySlug(slug: string): Sector | undefined {
  return sectors.find((sector) => sector.slug === slug);
}
