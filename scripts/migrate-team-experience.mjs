// One-off migration: pull the three partners' detailed "Selected Experience"
// lists from their profile pages on the legacy WordPress site and write them to
// src/lib/team-experience.json, keyed by the new site's team slug.
//
// Run with: node scripts/migrate-team-experience.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API = "https://tbestlaw.com/wp-json/wp/v2/posts";

// WordPress post id -> new-site team slug.
const MAP = [
  { id: 1019, slug: "tibebe-zewdu" },
  { id: 788, slug: "benyam-tafesse" },
  { id: 1020, slug: "sisay-habte-gemeda" },
];

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
  return decode(html.replace(/<[^>]+>/g, ""))
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SOCIAL = new Set([
  "linkedin", "twitter", "facebook", "whatsapp", "email", "telegram", "skype",
  "print", "pinterest", "reddit", "tumblr", "messenger", "share", "copy link",
  "x", "copy",
]);

/** The profile bodies are a flat list of <li> experience bullets; keep those. */
function experience(html) {
  const items = [];
  const re = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = stripTags(m[1]);
    if (!text) continue;
    if (text.includes("et_pb") || text.includes(".st0{")) continue;
    if (SOCIAL.has(text.toLowerCase())) continue;
    // Drop the trailing semicolon/period so the site can style bullets uniformly.
    items.push(text.replace(/[;.]$/, ""));
  }
  return items;
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
      await sleep(1000 * i);
    }
  }
}

async function run() {
  const dest = join(__dirname, "..", "src", "lib", "team-experience.json");
  const out = {};
  for (const entry of MAP) {
    const p = await fetchJson(`${API}/${entry.id}?_fields=content`);
    out[entry.slug] = experience(p.content.rendered);
    writeFileSync(dest, JSON.stringify(out, null, 2) + "\n", "utf8");
    console.error(`ok  ${entry.slug}  (${out[entry.slug].length} items)`);
    await sleep(600);
  }
  console.error(`\nWrote ${Object.keys(out).length} profiles to ${dest}`);
}

run();
