import { PracticesManager } from "@/components/admin/practices-manager";
import { getPractices } from "@/lib/admin/data";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminPracticesPage() {
  await requireAdmin();
  const practices = await getPractices();
  return <PracticesManager practices={practices} />;
}
