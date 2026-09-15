/**
 * Copies the content that currently ships inside the app — the migrated
 * insights and the nine practice areas — into MongoDB, so the dashboard has
 * something to edit and the public pages start reading live data.
 *
 *   npm run seed:content            # insert what is missing, touch nothing else
 *   npm run seed:content -- --force # overwrite rows that already exist
 *
 * Matching is by slug. Without --force an existing row is left exactly as the
 * admin last saved it, so re-running this can never undo an edit.
 */
import { config } from "dotenv";

config({ path: ".env.local" });
config();

import { MongoClient } from "mongodb";

import bodies from "../src/lib/insight-bodies.json";
import { insights } from "../src/lib/insights";
import { practices } from "../src/lib/practices";

const force = process.argv.includes("--force");

function bodyText(slug: string): string {
  const entry = (bodies as Record<string, { body: string[] }>)[slug];
  return entry ? entry.body.join("\n") : "";
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI must be set in .env.local");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "tbest");

  try {
    const insightsCol = db.collection("insights");
    const practicesCol = db.collection("practices");

    // A slug is the public URL, so it has to be unique. The index enforces that
    // even if two writers race.
    await insightsCol.createIndex({ slug: 1 }, { unique: true });
    await practicesCol.createIndex({ slug: 1 }, { unique: true });

    let added = 0;
    let updated = 0;
    let skipped = 0;

    for (const insight of insights) {
      const doc = {
        slug: insight.slug,
        title: insight.title,
        category: insight.category,
        topic: insight.topic,
        date: insight.date,
        authors: [...insight.authors],
        summary: insight.summary,
        body: bodyText(insight.slug),
        image: "",
        published: true,
      };
      const existing = await insightsCol.findOne({ slug: insight.slug });
      if (existing && !force) {
        skipped += 1;
        continue;
      }
      if (existing) {
        await insightsCol.updateOne(
          { slug: insight.slug },
          { $set: { ...doc, updatedAt: new Date() } },
        );
        updated += 1;
      } else {
        await insightsCol.insertOne({ ...doc, createdAt: new Date() });
        added += 1;
      }
    }
    console.log(
      `Updates: ${added} added, ${updated} overwritten, ${skipped} left alone (of ${insights.length}).`,
    );

    added = updated = skipped = 0;
    for (const [order, practice] of practices.entries()) {
      const doc = {
        slug: practice.slug,
        name: practice.name,
        blurb: practice.blurb,
        statute: practice.statute,
        intro: [...practice.intro],
        servicesLead: practice.servicesLead,
        services: [...practice.services],
        image: "",
        order,
      };
      const existing = await practicesCol.findOne({ slug: practice.slug });
      if (existing && !force) {
        skipped += 1;
        continue;
      }
      if (existing) {
        await practicesCol.updateOne(
          { slug: practice.slug },
          { $set: { ...doc, updatedAt: new Date() } },
        );
        updated += 1;
      } else {
        await practicesCol.insertOne({ ...doc, createdAt: new Date() });
        added += 1;
      }
    }
    console.log(
      `Practice areas: ${added} added, ${updated} overwritten, ${skipped} left alone (of ${practices.length}).`,
    );

    // The inbox is read newest-first and filtered by status; both want an index.
    await db.collection("contacts").createIndex({ createdAt: -1 });
    await db.collection("contacts").createIndex({ status: 1 });

    if (!force && skipped > 0) {
      console.log("\nRe-run with --force to overwrite what is already there.");
    }
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
