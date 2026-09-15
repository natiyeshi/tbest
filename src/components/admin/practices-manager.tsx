"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { ImageUploadField } from "@/components/admin/image-upload-field";
import {
  EmptyState,
  ErrorBanner,
  Field,
  LinesField,
  Modal,
  PageHeader,
  dangerBtn,
  inputCls,
  primaryBtn,
  quietBtn,
  secondaryBtn,
  slugify,
} from "@/components/admin/ui";
import {
  createPractice,
  deletePractice,
  reorderPractices,
  updatePractice,
} from "@/lib/admin/actions";
import type { PracticeDoc } from "@/lib/admin/data";

type FormState = {
  slug: string;
  name: string;
  blurb: string;
  statute: string;
  intro: string[];
  servicesLead: string;
  services: string[];
  image: string;
};

const empty: FormState = {
  slug: "",
  name: "",
  blurb: "",
  statute: "",
  intro: [],
  servicesLead: "Our services include:",
  services: [],
  image: "",
};

export function PracticesManager({ practices }: { practices: PracticeDoc[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<PracticeDoc | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [error, setError] = useState<string | null>(null);

  const open = creating || editing !== null;

  function openCreate() {
    setForm(empty);
    setError(null);
    setCreating(true);
  }

  function openEdit(p: PracticeDoc) {
    setForm({
      slug: p.slug,
      name: p.name,
      blurb: p.blurb,
      statute: p.statute ?? "",
      intro: p.intro ?? [],
      servicesLead: p.servicesLead ?? "",
      services: p.services ?? [],
      image: p.image ?? "",
    });
    setError(null);
    setEditing(p);
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
        ? await updatePractice(editing.id, form)
        : await createPractice(form);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      close();
      router.refresh();
    });
  }

  function handleDelete(p: PracticeDoc) {
    if (
      !window.confirm(
        `Delete "${p.name}"? Its page at /practices/${p.slug} will stop existing.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      const res = await deletePractice(p.id);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  /** Swap a row with its neighbour and persist the whole order. */
  function move(index: number, delta: number) {
    const next = [...practices];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    startTransition(async () => {
      const res = await reorderPractices(next.map((p) => p.id));
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
        title="Practice areas"
        description="The firm's practices, in the order they appear on the site."
        action={
          <button onClick={openCreate} className={primaryBtn}>
            New practice area
          </button>
        }
      />
      <ErrorBanner message={!open ? error : null} />

      {practices.length === 0 ? (
        <EmptyState message="No practice areas yet. Add one, or run the content seed to bring across the nine already on the site." />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {practices.map((p, i) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 sm:px-6"
            >
              <div className="flex shrink-0 flex-col">
                <button
                  onClick={() => move(i, -1)}
                  disabled={pending || i === 0}
                  aria-label={`Move ${p.name} up`}
                  className="px-1.5 text-muted transition-colors hover:text-copper-600 disabled:opacity-25"
                >
                  ▲
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={pending || i === practices.length - 1}
                  aria-label={`Move ${p.name} down`}
                  className="px-1.5 text-muted transition-colors hover:text-copper-600 disabled:opacity-25"
                >
                  ▼
                </button>
              </div>
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-bone">
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base text-brand-900">{p.name}</p>
                <p className="mt-0.5 truncate text-sm text-muted">{p.blurb}</p>
                <p className="mt-1 text-xs text-muted/70">
                  /practices/{p.slug} · {p.services?.length ?? 0} services
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => openEdit(p)} className={quietBtn}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p)}
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
          title={editing ? "Edit practice area" : "New practice area"}
          onClose={close}
          wide
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <ErrorBanner message={error} />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setForm((f) => ({
                      ...f,
                      name,
                      slug: editing || f.slug ? f.slug : slugify(name),
                    }));
                  }}
                  onBlur={() => {
                    if (!form.slug && form.name) {
                      setForm((f) => ({ ...f, slug: slugify(f.name) }));
                    }
                  }}
                  className={inputCls}
                />
              </Field>
              <Field label="Slug" hint="the URL under /practices/">
                <input
                  required
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: slugify(e.target.value) })
                  }
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Blurb" hint="the one-line summary used on cards">
              <textarea
                required
                rows={2}
                value={form.blurb}
                onChange={(e) => setForm({ ...form, blurb: e.target.value })}
                className={`${inputCls} resize-y`}
              />
            </Field>

            <Field
              label="Governing instrument"
              hint="optional — shown beside the practice name"
            >
              <input
                value={form.statute}
                onChange={(e) => setForm({ ...form, statute: e.target.value })}
                placeholder="Investment Proclamation No. 1180/2020"
                className={inputCls}
              />
            </Field>

            <ImageUploadField
              label="Practice image"
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              folder="tbest/practices"
              hint="optional — leave empty to use the bundled photograph"
            />

            <LinesField
              label="Introduction"
              hint="one paragraph per line"
              value={form.intro}
              onChange={(intro) => setForm({ ...form, intro })}
              rows={6}
            />

            <Field label="Services lead-in">
              <input
                value={form.servicesLead}
                onChange={(e) =>
                  setForm({ ...form, servicesLead: e.target.value })
                }
                placeholder="Our services include:"
                className={inputCls}
              />
            </Field>

            <LinesField
              label="Services"
              hint="one per line"
              value={form.services}
              onChange={(services) => setForm({ ...form, services })}
              rows={10}
            />

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={close} className={secondaryBtn}>
                Cancel
              </button>
              <button type="submit" disabled={pending} className={primaryBtn}>
                {pending
                  ? "Saving…"
                  : editing
                    ? "Save changes"
                    : "Create practice area"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
