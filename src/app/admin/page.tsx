import Link from "next/link";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { SectionCard, StatusBadge } from "@/components/admin/section-card";
import { Inbox, FolderKanban, FileText, Award, MessageSquareQuote, Trophy, Sparkles, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    const [
      unreadMessages,
      totalMessages,
      projects,
      publishedArticles,
      draftArticles,
      skills,
      certifications,
      testimonials,
      achievements,
    ] = await Promise.all([
      db.contactMessage.count({ where: { isRead: false } }),
      db.contactMessage.count(),
      db.project.count(),
      db.article.count({ where: { status: "published" } }),
      db.article.count({ where: { status: "draft" } }),
      db.skill.count({ where: { visible: true } }),
      db.certification.count({ where: { visible: true } }),
      db.testimonial.count({ where: { visible: true } }),
      db.achievement.count({ where: { visible: true } }),
    ]);
    return {
      unreadMessages,
      totalMessages,
      projects,
      publishedArticles,
      draftArticles,
      skills,
      certifications,
      testimonials,
      achievements,
    };
  } catch (err) {
    console.error("[admin dashboard] count failed:", err);
    return null;
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    {
      href: "/admin/messages",
      label: "Inbox",
      stat: counts ? `${counts.unreadMessages} unread` : "—",
      sub: counts ? `${counts.totalMessages} total` : "loading…",
      icon: Inbox,
      tone: "violet" as const,
    },
    {
      href: "/admin/projects",
      label: "Projects",
      stat: counts ? `${counts.projects}` : "—",
      sub: "Visible & hidden",
      icon: FolderKanban,
      tone: "magenta" as const,
    },
    {
      href: "/admin/articles",
      label: "Articles",
      stat: counts ? `${counts.publishedArticles} published` : "—",
      sub: counts ? `${counts.draftArticles} drafts` : "loading…",
      icon: FileText,
      tone: "blue" as const,
    },
    {
      href: "/admin/skills",
      label: "Skills",
      stat: counts ? `${counts.skills}` : "—",
      sub: "Visible expertise cards",
      icon: Sparkles,
      tone: "violet" as const,
    },
    {
      href: "/admin/certifications",
      label: "Certifications",
      stat: counts ? `${counts.certifications}` : "—",
      sub: "Visible",
      icon: Award,
      tone: "blue" as const,
    },
    {
      href: "/admin/testimonials",
      label: "Testimonials",
      stat: counts ? `${counts.testimonials}` : "—",
      sub: "Visible",
      icon: MessageSquareQuote,
      tone: "magenta" as const,
    },
    {
      href: "/admin/achievements",
      label: "Achievements",
      stat: counts ? `${counts.achievements}` : "—",
      sub: "Visible",
      icon: Trophy,
      tone: "violet" as const,
    },
  ];

  const toneRing: Record<string, string> = {
    violet: "border-violet-400/30 bg-violet-500/10 text-violet-200",
    magenta: "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200",
    blue: "border-sky-400/30 bg-sky-500/10 text-sky-200",
  };

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of portfolio content and incoming messages. Use the sidebar to manage each section."
      />

      {counts === null && (
        <div className="mb-6">
          <StatusBadge tone="warning">DB unavailable — showing partial state</StatusBadge>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-violet-400/40"
            >
              <div className="flex items-start justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-lg border ${toneRing[c.tone]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-violet-200" />
              </div>
              <p className="mt-4 font-display text-base font-semibold text-foreground">{c.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{c.stat}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard
          title="Quick actions"
          description="Common tasks you'll perform on this site."
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              href="/admin/site-settings"
              className="rounded-xl border border-border bg-background/40 p-3 text-sm font-medium text-foreground transition-colors hover:border-violet-400/40 hover:bg-violet-500/5"
            >
              Edit site settings →
            </Link>
            <Link
              href="/admin/profile-media"
              className="rounded-xl border border-border bg-background/40 p-3 text-sm font-medium text-foreground transition-colors hover:border-violet-400/40 hover:bg-violet-500/5"
            >
              Upload CV / images →
            </Link>
            <Link
              href="/admin/projects"
              className="rounded-xl border border-border bg-background/40 p-3 text-sm font-medium text-foreground transition-colors hover:border-violet-400/40 hover:bg-violet-500/5"
            >
              Manage projects →
            </Link>
            <Link
              href="/admin/articles"
              className="rounded-xl border border-border bg-background/40 p-3 text-sm font-medium text-foreground transition-colors hover:border-violet-400/40 hover:bg-violet-500/5"
            >
              Write an article →
            </Link>
          </div>
        </SectionCard>

        <SectionCard
          title="Reminders"
          description="Content seeded empty on purpose — add as you go."
        >
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              Certifications, testimonials, and achievements start empty. Only add verified items.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
              Draft articles are not visible on the public site until you publish them.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              The CV download button only appears on the public site when a CV is uploaded here.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              Local uploads live in <code className="text-violet-200">/public/uploads/</code> — they are ephemeral on serverless hosts. See README-ADMIN.md.
            </li>
          </ul>
        </SectionCard>
      </div>
    </>
  );
}
