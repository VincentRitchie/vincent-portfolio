import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  let projects: Awaited<ReturnType<typeof db.project.findMany>> = [];
  try {
    projects = await db.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch (err) {
    console.error("[admin/projects] load failed:", err);
  }

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description="Manage the public Projects section. Visible items appear on the homepage; hidden ones are kept for later."
        action={projects.length > 0 ? <StatusBadge tone="violet">{projects.length} total</StatusBadge> : undefined}
      />
      <ProjectsManager initial={JSON.parse(JSON.stringify(projects))} />
    </>
  );
}
