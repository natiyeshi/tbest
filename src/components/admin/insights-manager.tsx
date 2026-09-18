"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { ImageUploadField } from "@/components/admin/image-upload-field";
import {
  EmptyState,
  ErrorBanner,
  Field,
  Modal,
  PageHeader,
  dangerBtn,
  inputCls,
  primaryBtn,
  quietBtn,
  secondaryBtn,
} from "@/components/admin/ui";
import { formatDate, slugify } from "@/lib/format";
import {
  createInsight,
  deleteInsight,
  updateInsight,
} from "@/lib/admin/actions";
import type { InsightDoc } from "@/lib/admin/data";
import { insightCategoryValues } from "@/lib/validation";

type Category = (typeof insightCategoryValues)[number];

/**
 * The topics the migrated articles already use. Free text on the form — this
 * list is a convenience, not a constraint — but staying inside it means the
 * card art keeps resolving, since the bundled photography is keyed by topic.
 */
const knownTopics = [
  "Investment",
  "Tax",
  "Corporate",
  "Competition",
  "Immigration",
  "Data Protection",
  "Insolvency",
  "Real Estate",
  "Firm",
];

type FormState = {
  slug: string;
  title: string;
  category: Category;
  topic: string;
  date: string;
  authors: string;
  summary: string;
  body: string;
  image: string;
  published: boolean;
};

const today = () => new Date().toISOString().slice(0, 10);

const empty: FormState = {
  slug: "",
  title: "",
  category: "Legal Updates",
  topic: knownTopics[0],
  date: today(),
  authors: "",
  summary: "",
  body: "",
  image: "",
  published: true,
};

/** The form keeps authors as one comma-separated line; the record keeps a list. */
const splitAuthors = (value: string) =>
  value
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

export function InsightsManager({ insights }: { insights: InsightDoc[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<InsightDoc | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Category | "All">("All");

  const open = creating || editing !== null;

  const shown = useMemo(
    () =>
      filter === "All"
        ? insights
        : insights.filter((i) => i.category === filter),
    [insights, filter],
  );

  const counts = useMemo(() => {
    const out: Record<string, number> = { All: insights.length };
    for (const c of insightCategoryValues) {
      out[c] = insights.filter((i) => i.category === c).length;
    }
    return out;
  }, [insights]);

  function openCreate() {
    setForm({ ...empty, date: today() });
    setError(null);
    setCreating(true);
  }

  function openEdit(item: InsightDoc) {
    setForm({
      slug: item.slug,
      title: item.title,
      category: item.category,
      topic: item.topic,
      date: item.date,
      authors: (item.authors ?? []).join(", "),
      summary: item.summary,
      body: item.body ?? "",
      image: item.image ?? "",
      published: item.published !== false,
    });
    setError(null);
    setEditing(item);
  }

  function close() {
    setCreating(false);
    setEditing(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload = { ...form, authors: splitAuthors(form.authors) };
    startTransition(async () => {
      const res = editing
        ? await updateInsight(editing.id, payload)
        : await createInsight(payload);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      close();
      router.refresh();
    });
  }

  function handleDelete(item: InsightDoc) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const res = await deleteInsight(item.id);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <>
      <PageHeader
        title="Updates"
        description="Legal updates, blog posts and firm news — the three streams under /updates."
        action={
          <button onClick={openCreate} className={primaryBtn}>
            New update
          </button>
        }
      />
      <ErrorBanner message={!open ? error : null} />

      <div className="mb-6 flex flex-wrap gap-2">
        {(["All", ...insightCategoryValues] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              filter === c
                ? "bg-brand-900 text-white"
                : "border border-line text-brand-800 hover:bg-bone"
            }`}
          >
            {c}
            <span
              className={`ml-2 text-xs ${filter === c ? "text-white/60" : "text-muted"}`}
            >
              {counts[c] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          message={
            insights.length === 0
              ? "Nothing published yet. Write the first update, or run the content seed to bring across what is already on the site."
              : "No updates in this stream yet."
          }
        />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {shown.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 sm:px-6"
            >
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-bone">
                {item.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-copper-500">
                  {item.category}
                  <span className="text-muted/50">·</span>
                  <span className="text-muted">{item.topic}</span>
                  <span className="text-muted/50">·</span>
                  <span className="font-normal normal-case tracking-normal text-muted">
                    {formatDate(item.date)}
                  </span>
                  {item.published === false && (
                    <span className="rounded-full bg-brand-900 px-2 py-0.5 text-[0.625rem] text-white">
                      Draft
                    </span>
                  )}
                </p>
                <p className="mt-1 truncate font-display text-base text-brand-900">
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-sm text-muted">
                  {item.summary}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => openEdit(item)} className={quietBtn}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  disabled={pending}
                  className={dangerBtn}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <Modal title={editing ? "Edit update" : "New update"} onClose={close} wide>
          <form onSubmit={handleSubmit} className="space-y-5">
            <ErrorBanner message={error} />

            <Field label="Title">
              <input
                required
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  // The slug is only auto-filled for a new article, and only
                  // while it is still untouched — renaming a published piece
                  // would break its URL.
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: editing || f.slug ? f.slug : slugify(title),
                  }));
                }}
                onBlur={() => {
                  if (!form.slug && form.title) {
                    setForm((f) => ({ ...f, slug: slugify(f.title) }));
                  }
                }}
                className={inputCls}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Slug" hint="the URL under /updates/">
                <input
                  required
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: slugify(e.target.value) })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Date">
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Stream">
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as Category })
                  }
                  className={inputCls}
                >
                  {insightCategoryValues.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Topic" hint="picks the card artwork">
                <input
                  required
                  list="insight-topics"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className={inputCls}
                />
                <datalist id="insight-topics">
                  {knownTopics.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </Field>
            </div>

            <Field label="Authors" hint="comma separated; leave blank for none">
              <input
                value={form.authors}
                onChange={(e) => setForm({ ...form, authors: e.target.value })}
                placeholder="Sisay Habte, Tibebe Zewdu"
                className={inputCls}
              />
            </Field>

            <ImageUploadField
              label="Cover image"
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              folder="tbest/updates"
              hint="optional — leave empty to use the topic's photograph"
            />

            <Field label="Summary" hint="shown on cards and as the article's standfirst">
              <textarea
                required
                rows={3}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className={`${inputCls} resize-y`}
              />
            </Field>

            <Field
              label="Body"
              hint="one block per line — ## heading, - list item, > quote, anything else a paragraph"
            >
              <textarea
                required
                rows={14}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
              />
            </Field>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-brand-800">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
                className="h-4 w-4 rounded accent-copper-500"
              />
              Published
              <span className="text-xs font-normal text-muted">
                unpublished updates stay off the public site
              </span>
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={close} className={secondaryBtn}>
                Cancel
              </button>
              <button type="submit" disabled={pending} className={primaryBtn}>
                {pending
                  ? "Saving…"
                  : editing
                    ? "Save changes"
                    : "Publish update"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
