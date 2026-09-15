import "server-only";
import { ObjectId, type Document, type WithId } from "mongodb";

import { db } from "@/lib/db";

export type InsightDoc = {
  id: string;
  slug: string;
  title: string;
  category: "Legal Updates" | "Blog" | "News";
  topic: string;
  date: string;
  authors: string[];
  summary: string;
  body: string;
  image: string;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type PracticeDoc = {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  statute: string;
  intro: string[];
  servicesLead: string;
  services: string[];
  image: string;
  order: number;
  createdAt: string;
  updatedAt?: string;
};

export type ContactDoc = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read";
  createdAt: string;
};

function serialize<T>(doc: WithId<Document>): T {
  const { _id, ...rest } = doc;
  const out: Record<string, unknown> = { id: _id.toHexString(), ...rest };
  // Dates have to cross to the client as strings; everything downstream reads
  // them as ISO.
  if (out.createdAt instanceof Date) out.createdAt = out.createdAt.toISOString();
  if (out.updatedAt instanceof Date) out.updatedAt = out.updatedAt.toISOString();
  return out as T;
}

export const collections = {
  insights: () => db.collection("insights"),
  practices: () => db.collection("practices"),
  contacts: () => db.collection("contacts"),
};

export async function getInsights(): Promise<InsightDoc[]> {
  const docs = await collections
    .insights()
    .find()
    .sort({ date: -1, createdAt: -1 })
    .toArray();
  return docs.map((d) => serialize<InsightDoc>(d));
}

export async function getPractices(): Promise<PracticeDoc[]> {
  const docs = await collections
    .practices()
    .find()
    .sort({ order: 1, createdAt: 1 })
    .toArray();
  return docs.map((d) => serialize<PracticeDoc>(d));
}

export async function getContacts(): Promise<ContactDoc[]> {
  const docs = await collections
    .contacts()
    .find()
    .sort({ createdAt: -1 })
    .limit(500)
    .toArray();
  return docs.map((d) => serialize<ContactDoc>(d));
}

export async function getDashboardStats() {
  const [insights, drafts, practices, contacts, unread] = await Promise.all([
    collections.insights().countDocuments(),
    collections.insights().countDocuments({ published: false }),
    collections.practices().countDocuments(),
    collections.contacts().countDocuments(),
    collections.contacts().countDocuments({ status: "new" }),
  ]);
  const byCategory = await collections
    .insights()
    .aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ])
    .toArray();
  const recentDocs = await collections
    .contacts()
    .find()
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();
  return {
    insights,
    drafts,
    practices,
    contacts,
    unread,
    byCategory: Object.fromEntries(byCategory.map((c) => [c._id, c.count])),
    recent: recentDocs.map((d) => serialize<ContactDoc>(d)),
  };
}

export type DashboardStats = Awaited<ReturnType<typeof getDashboardStats>>;

export function toObjectId(id: string): ObjectId | null {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}
