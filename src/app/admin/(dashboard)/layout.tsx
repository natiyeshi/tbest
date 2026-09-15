import type { Metadata } from "next";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { collections } from "@/lib/admin/data";
import { requireAdmin } from "@/lib/admin/session";

export const metadata: Metadata = {
  title: "Admin — TBeST Law LLP",
  robots: { index: false, follow: false },
};

// Every admin page is authenticated per request against the database. None of
// them may be prerendered at build time.
export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  // The unread count rides on the layout so the badge is right on every page,
  // not only on the inbox. A database that is down must not lock the admin out.
  let unread = 0;
  try {
    unread = await collections.contacts().countDocuments({ status: "new" });
  } catch {
    unread = 0;
  }

  return (
    <div className="min-h-screen bg-bone lg:flex">
      <AdminSidebar
        userName={session.user.name}
        userEmail={session.user.email}
        unread={unread}
      />
      <div className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">{children}</div>
    </div>
  );
}
