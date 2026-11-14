"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

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
import {
  createTestimonial,
  deleteTestimonial,
  importBundledTestimonials,
  reorderTestimonials,
  updateTestimonial,
} from "@/lib/admin/actions";
import type { TestimonialDoc } from "@/lib/admin/data";

type FormState = { quote: string; source: string };

const empty: FormState = { quote: "", source: "" };

/** Offered as suggestions; the field still takes any source. */
const knownSources = ["Legal 500", "Chambers and Partners", "IFLR1000"];

export function TestimonialsManager({
  testimonials,
}: {
  testimonials: TestimonialDoc[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<TestimonialDoc | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [error, setError] = useState<string | null>(null);

  const open = creating || editing !== null;

  function openCreate() {
    setForm(empty);
    setError(null);
    setCreating(true);
  }

  function openEdit(t: TestimonialDoc) {
    setForm({ quote: t.quote, source: t.source ?? "" });
    setError(null);
    setEditing(t);
  }

  function close() {
    setCreating(false);
    setEditing(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = editing
        ? await updateTestimonial(editing.id, form)
        : await createTestimonial(form);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      close();
      router.refresh();
    });
  }

  function handleDelete(t: TestimonialDoc) {
    if (!window.confirm("Delete this testimonial? It will leave the site.")) {
      return;
    }
    startTransition(async () => {
      const res = await deleteTestimonial(t.id);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  function handleImport() {
    setError(null);
    startTransition(async () => {
      const res = await importBundledTestimonials();
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  /** Swap a row with its neighbour and persist the whole order. */
  function move(index: number, delta: number) {
    const next = [...testimonials];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    startTransition(async () => {
      const res = await reorderTestimonials(next.map((t) => t.id));
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
        title="Testimonials"
        description="The quotes on the home and about pages, in the order they appear. The first one is shown large."
        action={
          <button onClick={openCreate} className={primaryBtn}>
            New testimonial
          </button>
        }
      />
      <ErrorBanner message={!open ? error : null} />

      {testimonials.length === 0 ? (
        <div className="space-y-4">
          <EmptyState message="No testimonials saved yet, so the site is showing the five bundled with it. Import those to start editing them, or add a new one — once any is saved here, only these are shown." />
          <div className="flex justify-center">
            <button
              onClick={handleImport}
              disabled={pending}
              className={secondaryBtn}
            >
              {pending ? "Importing…" : "Import the current testimonials"}
            </button>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {testimonials.map((t, i) => (
            <li
              key={t.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 sm:px-6"
            >
              <div className="flex shrink-0 flex-col">
                <button
                  onClick={() => move(i, -1)}
                  disabled={pending || i === 0}
                  aria-label="Move up"
                  className="px-1.5 text-muted transition-colors hover:text-copper-600 disabled:opacity-25"
                >
                  ▲
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={pending || i === testimonials.length - 1}
                  aria-label="Move down"
                  className="px-1.5 text-muted transition-colors hover:text-copper-600 disabled:opacity-25"
                >
                  ▼
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-navy-800">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-1 text-xs text-muted/70">
                  {i === 0 ? "Lead quote · " : ""}
                  {t.source || "No source"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => openEdit(t)} className={quietBtn}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t)}
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
        <Modal
          title={editing ? "Edit testimonial" : "New testimonial"}
          onClose={close}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <ErrorBanner message={error} />

            <Field label="Quote" hint="without quotation marks">
              <textarea
                required
                rows={5}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                className={`${inputCls} resize-y leading-relaxed`}
              />
            </Field>

            <Field label="Source" hint="optional — leave blank to show none">
              <input
                list="testimonial-sources"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                placeholder="Legal 500"
                className={inputCls}
              />
              <datalist id="testimonial-sources">
                {knownSources.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </Field>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={close} className={secondaryBtn}>
                Cancel
              </button>
              <button type="submit" disabled={pending} className={primaryBtn}>
                {pending
                  ? "Saving…"
                  : editing
                    ? "Save changes"
                    : "Create testimonial"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
