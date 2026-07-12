import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { SimpleListManager } from "@/components/admin/simple-list-manager";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  let items: Awaited<ReturnType<typeof db.testimonial.findMany>> = [];
  try {
    items = await db.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  } catch (err) {
    console.error("[admin/testimonials] load failed:", err);
  }
  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        description="Only add real testimonials you have permission to publish. Empty by default."
        action={items.length > 0 ? <StatusBadge tone="violet">{items.length} total</StatusBadge> : undefined}
      />
      <SimpleListManager
        initial={JSON.parse(JSON.stringify(items))}
        endpoint="testimonials"
        itemLabel="Testimonial"
        fields={[
          { key: "name", label: "Name", required: true },
          { key: "role", label: "Role" },
          { key: "quote", label: "Quote", textarea: true },
        ]}
      />
    </>
  );
}
