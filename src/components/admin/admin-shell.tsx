"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Inbox,
  Settings,
  Image as ImageIcon,
  Building2,
  FolderKanban,
  FileText,
  Sparkles,
  Award,
  MessageSquareQuote,
  Trophy,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/site-settings", label: "Site Settings", icon: Settings },
  { href: "/admin/profile-media", label: "Profile & Media", icon: ImageIcon },
  { href: "/admin/company", label: "Afrik-Vine", icon: Building2 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card/40 lg:flex lg:flex-col">
          <div className="border-b border-border p-5">
            <p className="font-display text-sm font-semibold tracking-tight text-foreground">
              Obasiochie Vincent
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Admin Console
            </p>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-violet-100 ring-1 ring-inset ring-violet-400/30"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="space-y-2 border-t border-border p-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              View site
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="flex-1">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur-xl lg:hidden">
            <div>
              <p className="font-display text-sm font-semibold">Admin</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Obasiochie Vincent
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/"
                target="_blank"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground"
                aria-label="View site"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  signOut({ callbackUrl: "/admin/login" });
                  router.refresh();
                }}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Mobile nav strip */}
          <div className="border-b border-border bg-card/30 lg:hidden">
            <div className="flex gap-1 overflow-x-auto p-2">
              {NAV.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium",
                      active
                        ? "bg-violet-500/15 text-violet-200"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  backHref = "/admin",
  action,
}: {
  title: string;
  description?: string;
  backHref?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Link
          href={backHref}
          className="mb-2 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-violet-200"
        >
          ← Back to dashboard
        </Link>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
