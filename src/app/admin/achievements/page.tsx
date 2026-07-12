import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { SimpleListManager } from "@/components/admin/simple-list-manager";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  let items: Awaited<ReturnType<typeof db.achievement.findMany>> = [];
  try {
    items = await db.achievement.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  } catch (err) {
    console.error("[admin/achievements] load failed:", err);
  }
  return (
    <>
      <AdminPageHeader
        title="Achievements"
        description="Only add verified, defensible achievements. Empty by default — public section renders nothing until you add items here."
        action={items.length > 0 ? <StatusBadge tone="violet">{items.length} total</StatusBadge> : undefined}
      />
      <SimpleListManager
        initial={JSON.parse(JSON.stringify(items))}
        endpoint="achievements"
        itemLabel="Achievement"
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "metric", label: "Metric (e.g. 2M+ views)" },
          { key: "year", label: "Year" },
          { key: "description", label: "Description", textarea: true },
        ]}
      />
    </>
  );
}
