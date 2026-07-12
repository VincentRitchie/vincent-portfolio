import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

/**
 * Admin layout. Server component.
 *
 * Middleware (`src/middleware.ts`) already:
 *  - redirects unauthenticated /admin/* (except /admin/login) → /admin/login
 *  - returns 401 JSON for unauthenticated /api/admin/*
 *
 * Here we additionally check session server-side as defense-in-depth.
 * When no session (i.e. on the login page), render children bare — no shell.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
