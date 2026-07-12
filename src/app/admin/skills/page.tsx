import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { SkillsManager } from "@/components/admin/skills-manager";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  let skills: Awaited<ReturnType<typeof db.skill.findMany>> = [];
  try {
    skills = await db.skill.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  } catch (err) {
    console.error("[admin/skills] load failed:", err);
  }
  return (
    <>
      <AdminPageHeader
        title="Skills"
        description="Expertise cards shown in the public Expertise section. Empty DB → falls back to portfolio-data defaults."
        action={skills.length > 0 ? <StatusBadge tone="violet">{skills.length} total</StatusBadge> : undefined}
      />
      <SkillsManager initial={JSON.parse(JSON.stringify(skills))} />
    </>
  );
}
