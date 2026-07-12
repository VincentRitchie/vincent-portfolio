import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminSiteSettingsPage() {
  let settings: Awaited<ReturnType<typeof db.siteSetting.findUnique>> = null;
  try {
    settings = await db.siteSetting.findUnique({ where: { id: "1" } });
  } catch (err) {
    console.error("[admin/site-settings] load failed:", err);
  }

  return (
    <>
      <AdminPageHeader
        title="Site Settings"
        description="Site-wide profile fields, social links, SEO metadata, and paths. Empty fields fall back to the portfolio-data defaults."
        action={settings ? <StatusBadge tone="success">Loaded</StatusBadge> : <StatusBadge tone="warning">Using defaults</StatusBadge>}
      />
      <SiteSettingsForm initial={JSON.parse(JSON.stringify(settings))} />
    </>
  );
}
