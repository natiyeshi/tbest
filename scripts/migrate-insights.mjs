// One-off migration: pull the firm's own article bodies from the legacy
// WordPress site (tbestlaw.com) and write them into src/lib/insight-bodies.json,
// keyed by the new site's slug. Metadata (summaries, authors, topics) lives in
// insights.ts; this file holds only the migrated article bodies.
//
// Run with: node scripts/migrate-insights.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API = "https://tbestlaw.com/wp-json/wp/v2/posts";

// WordPress post id -> new-site slug. Legal Updates reuse the slugs already in
// insights.ts; blog and news get fresh slugs.
const MAP = [
  // Legal Updates (category 7)
  { id: 1948, slug: "performance-based-investment-incentives-586-2026", category: "Legal Updates" },
  { id: 1920, slug: "directive-1082-2025-foreign-participation-in-restricted-trade", category: "Legal Updates" },
  { id: 1875, slug: "real-estate-proclamation-1357-2024", category: "Legal Updates" },
  { id: 1836, slug: "personal-data-protection-proclamation-1321-2024", category: "Legal Updates" },
  { id: 1816, slug: "immigration-service-fee-rates-regulation-550-2024", category: "Legal Updates" },
  { id: 1826, slug: "navigating-the-green-directive-faq", category: "Legal Updates" },
  { id: 1804, slug: "carbon-trading-forest-regulation-544-2024", category: "Legal Updates" },
  { id: 1796, slug: "excise-stamp-management-directive-1004-2024", category: "Legal Updates" },
  { id: 1764, slug: "transfer-pricing-directive-981-2024", category: "Legal Updates" },
  { id: 1774, slug: "foreign-investment-wholesale-retail-import-export", category: "Legal Updates" },
  { id: 1751, slug: "mof-circular-foreign-currency-approvals", category: "Legal Updates" },
  { id: 1720, slug: "acso-directive-986-2024-foreign-charitable-organizations", category: "Legal Updates" },
  { id: 1702, slug: "offshore-accounts-strategic-fdi", category: "Legal Updates" },
  { id: 1692, slug: "cassation-ruling-valuation-of-imported-goods", category: "Legal Updates" },
  { id: 1667, slug: "doing-business-via-non-profits", category: "Legal Updates" },
  { id: 502, slug: "new-investment-tax-incentive-regulations", category: "Legal Updates" },
  { id: 499, slug: "stamp-duties-or-stamps-of-evidence", category: "Legal Updates" },
  // Blog (category 14)
  { id: 1627, slug: "assimilating-loan-agreements-to-bonds", category: "Blog" },
  { id: 945, slug: "about-opc-one-person-company", category: "Blog" },
  { id: 98, slug: "of-dogs-humans-and-security-cameras", category: "Blog" },
  // News (category 6)
  { id: 1679, slug: "insolvency-practitioners-workshop", category: "News" },
  { id: 1558, slug: "tbest-law-llp-registered-as-llp", category: "News" },
];

const SOCIAL = new Set([
  "linkedin", "twitter", "facebook", "whatsapp", "email", "telegram", "skype",
  "print", "pinterest", "reddit", "tumblr", "messenger", "share", "copy link",
  "x", "copy",
]);

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”",
  ndash: "–", mdash: "—", hellip: "…", middot: "·",
};

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => (n in ENTITIES ? ENTITIES[n] : m));
}

function stripTags(html) {
  return decode(html.replace(/<[^>]+>/g, "")).replace(/ /g, " ").replace(/\s+/g, " ").trim();
}

function isByline(text) {
  // Short line, no terminal period, looks like "Name and Name".
  if (text.length > 70) return false;
  if (/[.:;]$/.test(text)) return false;
  const words = text.split(/\s+/);
  if (words.length > 8) return false;
  return /^[A-Z][a-zA-Z.]+(\s+(and|&|,)?\s*[A-Z][a-zA-Z.]+)*$/.test(text) && words.length >= 2;
}

function cleanBody(html) {
  const blocks = [];
  const re = /<(p|li|h[1-6]|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[1].toLowerCase();
    const text = stripTags(m[2]);
    if (!text) continue;
    if (text.includes("et_pb") || text.includes("[/") || text.includes(".st0{")) continue;
    if (SOCIAL.has(text.toLowerCase())) continue;
    blocks.push({ tag, text });
  }
  // Drop a leading byline block (author is tracked separately in insights.ts).
  let byline = null;
  while (blocks.length && blocks[0].tag === "p" && isByline(blocks[0].text)) {
    byline = blocks.shift().text;
  }
  const body = blocks.map((b) => {
    if (b.tag === "li") return "- " + b.text;
    if (b.tag === "blockquote") return "> " + b.text;
    if (/^h/.test(b.tag)) return "## " + b.text;
    return b.text;
  });
  return { body, byline };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url, attempts = 5) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === attempts) throw err;
      const wait = 1000 * i;
      console.error(`  retry ${i}/${attempts - 1} after ${err.message} (waiting ${wait}ms)`);
      await sleep(wait);
    }
  }
}

async function run() {
  const dest = join(__dirname, "..", "src", "lib", "insight-bodies.json");
  const out = {};
  for (const entry of MAP) {
    const p = await fetchJson(`${API}/${entry.id}?_fields=id,slug,date,title,content`);
    const { body, byline } = cleanBody(p.content.rendered);
    out[entry.slug] = {
      category: entry.category,
      date: p.date.slice(0, 10),
      title: decode(p.title.rendered),
      byline: byline || null,
      body,
    };
    // Save after every article so a mid-run failure keeps progress.
    writeFileSync(dest, JSON.stringify(out, null, 2) + "\n", "utf8");
    console.error(`ok  ${entry.slug}  (${body.length} blocks${byline ? ", byline: " + byline : ""})`);
    await sleep(600);
  }
  console.error(`\nWrote ${Object.keys(out).length} articles to ${dest}`);
}

run();
