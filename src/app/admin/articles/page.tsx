import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { ArticlesManager } from "@/components/admin/articles-manager";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  let articles: Awaited<ReturnType<typeof db.article.findMany>> = [];
  try {
    articles = await db.article.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
  } catch (err) {
    console.error("[admin/articles] load failed:", err);
  }

  return (
    <>
      <AdminPageHeader
        title="Articles"
        description="Drafts are not visible on the public site. Publish an article to replace the coming-soon UI with real posts."
        action={articles.length > 0 ? <StatusBadge tone="violet">{articles.length} total</StatusBadge> : undefined}
      />
      <ArticlesManager initial={JSON.parse(JSON.stringify(articles))} />
    </>
  );
}
