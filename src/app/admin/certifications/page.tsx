import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { SimpleListManager } from "@/components/admin/simple-list-manager";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  let items: Awaited<ReturnType<typeof db.certification.findMany>> = [];
  try {
    items = await db.certification.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  } catch (err) {
    console.error("[admin/certifications] load failed:", err);
  }
  return (
    <>
      <AdminPageHeader
        title="Certifications"
        description="Only add verified certifications. Empty by default — public section renders nothing until you add items here."
        action={items.length > 0 ? <StatusBadge tone="violet">{items.length} total</StatusBadge> : undefined}
      />
      <SimpleListManager
        initial={JSON.parse(JSON.stringify(items))}
        endpoint="certifications"
        itemLabel="Certification"
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "issuer", label: "Issuer" },
          { key: "year", label: "Year" },
          { key: "credentialLink", label: "Credential URL" },
        ]}
      />
    </>
  );
}
