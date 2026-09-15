"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { collections, toObjectId } from "@/lib/admin/data";
import { assertAdmin } from "@/lib/admin/session";
import {
  contactStatusSchema,
  insightSchema,
  practiceSchema,
  reorderSchema,
} from "@/lib/validation";

export type ActionResult = { ok: true } | { ok: false; error: string };

function fail(error: unknown): ActionResult {
  if (error instanceof z.ZodError) {
    const first = error.issues[0];
    return {
      ok: false,
      error: `${first.path.join(".") || "input"}: ${first.message}`,
    };
  }
  if (error instanceof Error && error.message === "Unauthorized") {
    return { ok: false, error: "Your session has expired. Please sign in again." };
  }
  // The real cause goes to the server log; the browser gets something it can
  // show a non-technical reader.
  console.error("[admin action]", error);
  return { ok: false, error: "Something went wrong. Please try again." };
}

/* --------------------------------- insights -------------------------------- */

/**
 * Every page an article can appear on. The three streams share one listing
 * component and one detail route, so a single edit touches all of them.
 */
function revalidateInsights(slug?: string) {
  revalidatePath("/admin/insights");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/updates");
  revalidatePath("/updates/legal-updates");
  revalidatePath("/updates/blog");
  revalidatePath("/updates/news");
  if (slug) revalidatePath(`/updates/${slug}`);
}

export async function createInsight(input: unknown): Promise<ActionResult> {
  try {
    await assertAdmin();
    const data = insightSchema.parse(input);
    const existing = await collections.insights().findOne({ slug: data.slug });
    if (existing) {
      return { ok: false, error: "An update with this slug already exists." };
    }
    await collections.insights().insertOne({ ...data, createdAt: new Date() });
    revalidateInsights(data.slug);
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function updateInsight(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  try {
    await assertAdmin();
    const _id = toObjectId(id);
    if (!_id) return { ok: false, error: "Invalid id" };
    const data = insightSchema.parse(input);
    const clash = await collections
      .insights()
      .findOne({ slug: data.slug, _id: { $ne: _id } });
    if (clash) {
      return { ok: false, error: "An update with this slug already exists." };
    }
    const before = await collections.insights().findOne({ _id });
    await collections
      .insights()
      .updateOne({ _id }, { $set: { ...data, updatedAt: new Date() } });
    revalidateInsights(data.slug);
    // A renamed article leaves its old URL behind; clear that too.
    if (typeof before?.slug === "string" && before.slug !== data.slug) {
      revalidatePath(`/updates/${before.slug}`);
    }
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteInsight(id: string): Promise<ActionResult> {
  try {
    await assertAdmin();
    const _id = toObjectId(id);
    if (!_id) return { ok: false, error: "Invalid id" };
    const doc = await collections.insights().findOne({ _id });
    await collections.insights().deleteOne({ _id });
    revalidateInsights(typeof doc?.slug === "string" ? doc.slug : undefined);
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

/* -------------------------------- practices -------------------------------- */

function revalidatePractices(slug?: string) {
  revalidatePath("/admin/practices");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/practices");
  if (slug) revalidatePath(`/practices/${slug}`);
}

export async function createPractice(input: unknown): Promise<ActionResult> {
  try {
    await assertAdmin();
    const data = practiceSchema.parse(input);
    const existing = await collections.practices().findOne({ slug: data.slug });
    if (existing) {
      return { ok: false, error: "A practice area with this slug already exists." };
    }
    // A newcomer lands at the end of the list rather than the front.
    const last = await collections
      .practices()
      .find()
      .sort({ order: -1 })
      .limit(1)
      .next();
    const order = (typeof last?.order === "number" ? last.order : -1) + 1;
    await collections
      .practices()
      .insertOne({ ...data, order, createdAt: new Date() });
    revalidatePractices(data.slug);
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function updatePractice(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  try {
    await assertAdmin();
    const _id = toObjectId(id);
    if (!_id) return { ok: false, error: "Invalid id" };
    const data = practiceSchema.parse(input);
    const clash = await collections
      .practices()
      .findOne({ slug: data.slug, _id: { $ne: _id } });
    if (clash) {
      return { ok: false, error: "A practice area with this slug already exists." };
    }
    const before = await collections.practices().findOne({ _id });
    await collections
      .practices()
      .updateOne({ _id }, { $set: { ...data, updatedAt: new Date() } });
    revalidatePractices(data.slug);
    if (typeof before?.slug === "string" && before.slug !== data.slug) {
      revalidatePath(`/practices/${before.slug}`);
    }
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function deletePractice(id: string): Promise<ActionResult> {
  try {
    await assertAdmin();
    const _id = toObjectId(id);
    if (!_id) return { ok: false, error: "Invalid id" };
    const doc = await collections.practices().findOne({ _id });
    await collections.practices().deleteOne({ _id });
    revalidatePractices(typeof doc?.slug === "string" ? doc.slug : undefined);
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

/**
 * Persist a new order for the practice list: the client sends the ids in their
 * new sequence and each row takes its index.
 */
export async function reorderPractices(ids: unknown): Promise<ActionResult> {
  try {
    await assertAdmin();
    const list = reorderSchema.parse(ids);
    const ops = list
      .map((id, i) => {
        const _id = toObjectId(id);
        return _id
          ? { updateOne: { filter: { _id }, update: { $set: { order: i } } } }
          : null;
      })
      .filter((op): op is NonNullable<typeof op> => op !== null);
    if (ops.length) await collections.practices().bulkWrite(ops);
    revalidatePractices();
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

/* --------------------------------- contacts -------------------------------- */

export async function setContactStatus(
  id: string,
  status: unknown,
): Promise<ActionResult> {
  try {
    await assertAdmin();
    const _id = toObjectId(id);
    if (!_id) return { ok: false, error: "Invalid id" };
    const parsed = contactStatusSchema.parse(status);
    await collections.contacts().updateOne({ _id }, { $set: { status: parsed } });
    revalidatePath("/admin/contacts");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteContact(id: string): Promise<ActionResult> {
  try {
    await assertAdmin();
    const _id = toObjectId(id);
    if (!_id) return { ok: false, error: "Invalid id" };
    await collections.contacts().deleteOne({ _id });
    revalidatePath("/admin/contacts");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}
