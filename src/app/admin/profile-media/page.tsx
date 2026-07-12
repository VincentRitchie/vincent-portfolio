import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { ProfileMediaManager } from "@/components/admin/profile-media-manager";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminProfileMediaPage() {
  let settings: Awaited<ReturnType<typeof db.siteSetting.findUnique>> = null;
  let media: Awaited<ReturnType<typeof db.mediaAsset.findMany>> = [];
  try {
    [settings, media] = await Promise.all([
      db.siteSetting.findUnique({ where: { id: "1" } }),
      db.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    ]);
  } catch (err) {
    console.error("[admin/profile-media] load failed:", err);
  }

  return (
    <>
      <AdminPageHeader
        title="Profile & Media"
        description="Upload a CV, profile image, WhatsApp QR, Afrik-Vine logo, and gallery images. Saved files live in /public/uploads/."
        action={settings ? <StatusBadge tone="success">Loaded</StatusBadge> : <StatusBadge tone="warning">Defaults</StatusBadge>}
      />
      <ProfileMediaManager
        initialSettings={JSON.parse(JSON.stringify(settings))}
        initialMedia={JSON.parse(JSON.stringify(media))}
      />
    </>
  );
}
