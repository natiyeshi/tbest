"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-brand-900 outline-none transition-colors placeholder:text-muted/60 focus:border-copper-400 focus:ring-2 focus:ring-copper-400/20";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });
    setLoading(false);
    if (err) {
      // One message for both failures — telling them apart would confirm
      // which addresses have accounts.
      setError(
        err.status === 429
          ? "Too many attempts. Wait a minute and try again."
          : "Invalid email or password.",
      );
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="text-sm font-medium text-brand-800">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-2 ${field}`}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-brand-800">Password</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`mt-2 ${field}`}
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
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-copper-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-copper-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
        {!loading && <span aria-hidden="true">&rarr;</span>}
      </button>
    </form>
  );
}
