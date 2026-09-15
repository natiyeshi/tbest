import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminSettingsPage() {
  const session = await requireAdmin();
  return (
    <>
      <PageHeader
        title="Security"
        description={`Signed in as ${session.user.email}.`}
      />
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
        <ChangePasswordForm />
      </div>
    </>
  );
}
