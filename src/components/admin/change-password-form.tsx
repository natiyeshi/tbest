"use client";

import { useState } from "react";

import { inputCls, primaryBtn } from "@/components/admin/ui";
import { authClient } from "@/lib/auth-client";

const MIN_LENGTH = 12;

export function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDone(false);

    if (next !== confirm) {
      setError("The two new passwords do not match.");
      return;
    }
    if (next.length < MIN_LENGTH) {
      setError(`Use at least ${MIN_LENGTH} characters.`);
      return;
    }

    setSaving(true);
    const { error: err } = await authClient.changePassword({
      currentPassword: current,
      newPassword: next,
      // Everything else signed in with the old password is signed out.
      revokeOtherSessions: true,
    });
    setSaving(false);

    if (err) {
      setError(
        err.status === 429
          ? "Too many attempts. Wait a minute and try again."
          : "That current password is not right.",
      );
      return;
    }

    setCurrent("");
    setNext("");
    setConfirm("");
    setDone(true);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-5">
      <label className="block">
        <span className="text-sm font-medium text-brand-800">
          Current password
        </span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className={`mt-2 ${inputCls}`}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-brand-800">New password</span>
        <input
          type="password"
          required
          minLength={MIN_LENGTH}
          autoComplete="new-password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          className={`mt-2 ${inputCls}`}
        />
        <span className="mt-1.5 block text-xs text-muted">
          At least {MIN_LENGTH} characters.
        </span>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-brand-800">
          Confirm new password
        </span>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={`mt-2 ${inputCls}`}
        />
      </label>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      {done && (
        <p
          role="status"
          className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700"
        >
          Password changed. Any other signed-in session has been signed out.
        </p>
      )}

      <button type="submit" disabled={saving} className={primaryBtn}>
        {saving ? "Saving…" : "Change password"}
      </button>
    </form>
  );
}
