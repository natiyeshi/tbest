import { z } from "zod";

const trimmed = (max: number, min = 1) => z.string().trim().min(min).max(max);

/** Lowercase words joined by single hyphens — the shape every public URL uses. */
const slugField = (max = 120) =>
  z
    .string()
    .trim()
    .min(2)
    .max(max)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers and hyphens",
    );

/**
 * Empty, a full http(s) URL, or a root-relative path. Malformed values such as
 * "https:/x" would reach next/image on a public page and throw there, so they
 * are rejected at the point they are saved instead.
 */
const imageField = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v) || v.startsWith("/"), {
    message: "Enter a valid image URL (https://…) or a path starting with /",
  });

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

/** The three streams the updates section is split into. */
export const insightCategoryValues = ["Legal Updates", "Blog", "News"] as const;

export const insightSchema = z.object({
  slug: slugField(),
  title: trimmed(300, 3),
  category: z.enum(insightCategoryValues),
  /** Free text: the subject tag shown on cards, and what picks the card art. */
  topic: trimmed(80),
  date: isoDate,
  authors: z.array(trimmed(120)).max(10).default([]),
  summary: trimmed(1000, 10),
  /**
   * The article itself, as lines: "## " opens a heading, "- " a list item,
   * "> " a pull quote, anything else a paragraph. Same dialect the migrated
   * bodies in insight-bodies.json already use, so seeded and hand-written
   * articles render through one path.
   */
  body: trimmed(200_000, 10),
  /** Optional override for the art; blank falls back to the topic's image. */
  image: imageField.optional().default(""),
  published: z.boolean().optional().default(true),
});

export const practiceSchema = z.object({
  slug: slugField(),
  name: trimmed(160, 2),
  blurb: trimmed(500, 10),
  /** The instrument or body of law the practice works under. May be blank. */
  statute: z.string().trim().max(300).optional().default(""),
  intro: z.array(trimmed(5000)).max(20).default([]),
  servicesLead: z.string().trim().max(300).optional().default(""),
  services: z.array(trimmed(500)).max(60).default([]),
  /** Optional override for the art; blank falls back to the bundled image. */
  image: imageField.optional().default(""),
  order: z.coerce.number().int().min(0).default(0),
});

export const contactSchema = z.object({
  name: trimmed(120, 2),
  email: z.email().max(254),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: trimmed(5000, 10),
  /**
   * Honeypot. A real visitor never sees this field, so anything that fills it
   * is a bot; the route answers 200 and drops the message on the floor.
   */
  _contactWebsite: z.string().max(200).optional(),
});

export const contactStatusSchema = z.enum(["new", "read"]);

/** A reorder payload: the ids of one list in their new order. */
export const reorderSchema = z.array(z.string().min(1)).max(200);

export type InsightInput = z.infer<typeof insightSchema>;
export type PracticeInput = z.infer<typeof practiceSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
