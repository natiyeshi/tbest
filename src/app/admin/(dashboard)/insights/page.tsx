import { InsightsManager } from "@/components/admin/insights-manager";
import { getInsights } from "@/lib/admin/data";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminInsightsPage() {
  await requireAdmin();
  const insights = await getInsights();
  return <InsightsManager insights={insights} />;
}
