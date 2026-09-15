import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { DiamondFieldReveal } from "@/components/diamond-field-reveal";
import { getAdminSession } from "@/lib/admin/session";

export const metadata: Metadata = {
  title: "Sign in — TBeST Law LLP",
  robots: { index: false, follow: false },
};

// The live session is read on every request; this page is never prerendered.
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  // An authoritative check, not just "is there a cookie": someone already
  // signed in skips the form, and a stale cookie falls through to it.
  const session = await getAdminSession();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-brand-950 px-4 py-16">
      <DiamondFieldReveal
        id="admin-login-diamond"
        size={78}
        className="text-brand-200/[0.05]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(211,107,52,0.18),transparent_66%)]"
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/logo/logo-white.svg"
            alt="TBeST Law LLP"
            width={200}
            height={45}
            priority
            className="mx-auto h-10 w-auto"
          />
          <p className="eyebrow mt-5 text-copper-300">Admin</p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-2xl shadow-brand-950/40 sm:p-10">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-brand-100/40">
          Restricted area.
        </p>
      </div>
    </div>
  );
}
