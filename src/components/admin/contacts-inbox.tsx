"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  EmptyState,
  ErrorBanner,
  PageHeader,
  dangerBtn,
} from "@/components/admin/ui";
import { deleteContact, setContactStatus } from "@/lib/admin/actions";
import type { ContactDoc } from "@/lib/admin/data";

const stamp = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function ContactsInbox({ contacts }: { contacts: ContactDoc[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [openId, setOpenId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const unread = contacts.filter((c) => c.status === "new").length;

  function toggleOpen(c: ContactDoc) {
    const next = openId === c.id ? null : c.id;
    setOpenId(next);
    // Reading an unread message is what marks it read — there is no separate
    // step to forget.
    if (next && c.status === "new") {
      startTransition(async () => {
        const res = await setContactStatus(c.id, "read");
        if (res.ok) router.refresh();
      });
    }
  }

  function toggleStatus(c: ContactDoc) {
    startTransition(async () => {
      const res = await setContactStatus(
        c.id,
        c.status === "new" ? "read" : "new",
      );
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  function handleDelete(c: ContactDoc) {
    if (
      !window.confirm(
        `Delete the message from ${c.name}? This cannot be undone.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      const res = await deleteContact(c.id);
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
        title="Enquiries"
        description={
          unread > 0
            ? `${unread} unread message${unread === 1 ? "" : "s"} from the contact form.`
            : "Messages sent through the contact form."
        }
      />
      <ErrorBanner message={error} />

      {contacts.length === 0 ? (
        <EmptyState message="No messages yet. Anything sent from the contact page arrives here." />
      ) : (
        <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {contacts.map((c) => {
            const isOpen = openId === c.id;
            const isNew = c.status === "new";
            return (
              <div key={c.id} className={isNew ? "bg-copper-500/[0.04]" : ""}>
                <button
                  onClick={() => toggleOpen(c)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-bone/60 sm:px-6"
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      isNew ? "bg-copper-500" : "bg-line"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm ${
                        isNew
                          ? "font-semibold text-brand-900"
                          : "font-medium text-brand-800"
                      }`}
                    >
                      {c.name}
                      <span className="font-normal text-muted"> · {c.email}</span>
                    </p>
                    <p className="truncate text-sm text-muted">
                      {c.subject && (
                        <span className="text-muted/70">[{c.subject}] </span>
                      )}
                      {c.message}
                    </p>
                  </div>
                  <span className="hidden shrink-0 text-xs text-muted sm:block">
                    {stamp.format(new Date(c.createdAt))}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pl-11 sm:px-6 sm:pl-12">
                    <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed text-brand-800">
                      {c.message}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <a
                        href={`mailto:${c.email}?subject=${encodeURIComponent(
                          c.subject
                            ? `Re: ${c.subject}`
                            : "Re: your enquiry — TBeST Law LLP",
                        )}`}
                        className="inline-flex items-center rounded-lg bg-copper-500 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-copper-600"
                      >
                        Reply by email
                      </a>
                      {c.phone && (
                        <a
                          href={`tel:${c.phone}`}
                          className="inline-flex items-center rounded-lg border border-line px-3 py-1.5 font-semibold text-brand-800 transition-colors hover:bg-bone"
                        >
                          {c.phone}
                        </a>
                      )}
                      <button
                        onClick={() => toggleStatus(c)}
                        disabled={pending}
                        className="inline-flex items-center rounded-lg border border-line px-3 py-1.5 font-semibold text-brand-800 transition-colors hover:bg-bone disabled:opacity-60"
                      >
                        Mark as {isNew ? "read" : "unread"}
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
                        disabled={pending}
                        className={dangerBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
