// One-off migration: pull the three partners' detailed "Selected Experience"
// lists from their profile pages on the legacy WordPress site and write them to
// src/lib/team-experience.json, keyed by the new site's team slug.
//
// The old profiles fold the experience into one Divi toggle per practice area,
// and the REST API's rendered content drops those toggle titles, so this reads
// the public page instead and keeps the areas: each slug maps to a list of
// { area, items } in the order the old page shows them.
//
// Run with: node scripts/migrate-team-experience.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "https://tbestlaw.com";

// Legacy profile path -> new-site team slug.
const MAP = [
  { path: "/tibebe-zewdu/", slug: "tibebe-zewdu" },
  { path: "/benyam-tafesse/", slug: "benyam-tafesse" },
  { path: "/sisay-habte/", slug: "sisay-habte-gemeda" },
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

/**
 * Each toggle is an <h5 class="et_pb_toggle_title"> followed by a
 * <div class="et_pb_toggle_content"> holding a flat <ul> of matters. The
 * content div has no nested divs, so its first </div> closes it.
 */
function experience(html) {
  const groups = [];
  const re =
    /<h5 class="et_pb_toggle_title">([\s\S]*?)<\/h5>\s*<div class="et_pb_toggle_content[^"]*">([\s\S]*?)<\/div>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const items = [];
    const li = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
    let l;
    while ((l = li.exec(m[2])) !== null) {
      const text = stripTags(l[1]);
      // Drop the trailing semicolon/period so the site can style bullets uniformly.
      if (text) items.push(text.replace(/[;.]$/, ""));
    }
    if (items.length) groups.push({ area: stripTags(m[1]), items });
  }
  return groups;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url, attempts = 5) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
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
    const html = await fetchText(`${SITE}${entry.path}`);
    out[entry.slug] = experience(html);
    if (!out[entry.slug].length) {
      throw new Error(`No experience toggles found on ${entry.path}`);
    }
    const total = out[entry.slug].reduce((n, g) => n + g.items.length, 0);
    console.error(
      `ok  ${entry.slug}  (${out[entry.slug].length} areas, ${total} items)`,
    );
    await sleep(600);
  }
  writeFileSync(dest, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.error(`\nWrote ${Object.keys(out).length} profiles to ${dest}`);
}

run();
