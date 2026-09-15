"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/insights", label: "Updates" },
  { href: "/admin/practices", label: "Practice areas" },
  { href: "/admin/contacts", label: "Enquiries" },
  { href: "/admin/settings", label: "Security" },
];

export function AdminSidebar({
  userName,
  userEmail,
  unread,
}: {
  userName: string;
  userEmail: string;
  unread: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const nav = (
    <nav className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
      {links.map(({ href, label }) => {
        // "/admin" would otherwise light up on every child route.
        const active =
          href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
              active
                ? "bg-copper-500 text-white"
                : "text-brand-100/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {label}
            {href === "/admin/contacts" && unread > 0 && (
              <span
                className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-bold ${
                  active ? "bg-white/25 text-white" : "bg-copper-500 text-white"
                }`}
              >
                {unread}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="border-t border-white/10 pt-5">
      <p className="truncate text-sm font-semibold text-white">{userName}</p>
      <p className="mb-4 truncate text-xs text-brand-100/50">{userEmail}</p>
      <div className="space-y-2">
        <Link
          href="/"
          className="flex w-full items-center justify-center rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-brand-100/80 transition-colors hover:bg-white/10"
        >
          View the site
        </Link>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex w-full items-center justify-center rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-brand-100/80 transition-colors hover:bg-white/10 disabled:opacity-60"
        >
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-brand-950 px-5 py-3 text-white lg:hidden">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo/logo-white.svg"
            alt="TBeST Law LLP"
            width={160}
            height={36}
            className="h-7 w-auto"
          />
          <span className="eyebrow text-copper-300">Admin</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="p-1 text-2xl leading-none"
        >
          {open ? "×" : "≡"}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-30 flex flex-col bg-brand-950 px-5 pb-8 pt-20 lg:hidden">
          {nav}
          {footer}
        </div>
      )}

      {/* Desktop rail */}
      <aside className="sticky top-0 hidden max-h-screen min-h-screen w-72 shrink-0 flex-col bg-brand-950 p-6 text-white lg:flex">
        <div className="mb-10 px-2">
          <Link href="/admin" className="inline-block">
            <Image
              src="/logo/logo-white.svg"
              alt="TBeST Law LLP"
              width={160}
              height={36}
              className="h-9 w-auto"
            />
          </Link>
          <p className="eyebrow mt-3 text-copper-300">Admin</p>
        </div>
        {nav}
        {footer}
      </aside>
    </>
  );
}
