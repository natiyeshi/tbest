/**
 * The firm asked for Dr. Taddese Lencho's name to come off every part of the
 * site. The bundled copy (insights.ts, insight-bodies.json) was edited by hand;
 * this applies the same edits to the updates already in MongoDB, which is what
 * the live site reads.
 *
 *   npx tsx scripts/remove-taddese.ts          # dry run: list what would change
 *   npx tsx scripts/remove-taddese.ts --apply  # write the changes
 */
import { config } from "dotenv";

config({ path: ".env.local" });
config();

import { MongoClient } from "mongodb";

const apply = process.argv.includes("--apply");
const NAME = "Dr. Taddese Lencho";

/** The one news sentence that named him; the rest of it still stands. */
const WORKSHOP_BEFORE =
  "TBeST Law participated as a workshop leader through its Managing Partner, Dr. Taddese Lencho, who is also the drafter of Book Three of the current Ethiopian Commercial Code along with French insolvency jurist, Professor Reinhard Dammand and as a practitioner through one of its partners – Tibebe Zewdu.";
const WORKSHOP_AFTER =
  "TBeST Law participated as a practitioner through one of its partners – Tibebe Zewdu.";

function cleanBody(body: string): string {
  return body
    .split("\n")
    .filter((line) => line.trim() !== `${NAME} (PhD)`)
    .map((line) => (line === WORKSHOP_BEFORE ? WORKSHOP_AFTER : line))
    .join("\n");
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI must be set in .env.local");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "tbest");

  try {
    const col = db.collection("insights");
    const docs = await col
      .find({
        $or: [
          { authors: { $regex: "Taddese|Lencho", $options: "i" } },
          { body: { $regex: "Taddese|Lencho", $options: "i" } },
          { title: { $regex: "Taddese|Lencho", $options: "i" } },
          { summary: { $regex: "Taddese|Lencho", $options: "i" } },
        ],
      })
      .toArray();

    let leftover = 0;
    for (const doc of docs) {
      const authors: string[] = Array.isArray(doc.authors) ? doc.authors : [];
      const nextAuthors = authors.filter((a) => !/Taddese|Lencho/i.test(a));
      const body = typeof doc.body === "string" ? doc.body : "";
      const nextBody = cleanBody(body);

      console.log(`- ${doc.slug}`);
      if (nextAuthors.length !== authors.length) {
        console.log(`    authors: ${JSON.stringify(authors)} -> ${JSON.stringify(nextAuthors)}`);
      }
      if (nextBody !== body) console.log("    body: name removed");

      // Anything this script does not know how to rewrite is reported, not
      // guessed at, so it can be edited by hand in the dashboard.
      const rest = [doc.title, doc.summary, nextBody].join("\n");
      if (/Taddese|Lencho/i.test(rest)) {
        leftover += 1;
        console.log("    STILL MENTIONS HIM — edit this one by hand");
      }

      if (apply) {
        await col.updateOne(
          { _id: doc._id },
          { $set: { authors: nextAuthors, body: nextBody, updatedAt: new Date() } },
        );
      }
    }

    console.log(
      `\n${docs.length} update(s) mention him${leftover ? `, ${leftover} need a hand edit` : ""}.`,
    );
    console.log(apply ? "Changes written." : "Dry run — re-run with --apply to write.");
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
