import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/** Resolve the current admin session, or null if unauthenticated. */
export async function requireAdmin() {
  return getServerSession(authOptions);
}

/** Standard 401 JSON response for protected routes. */
export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** Trim a value into a non-empty string, or null. */
export function strOrNull(v: unknown): string | null {
  if (v == null) return null;
  const s = String(v).trim();
  return s.length ? s : null;
}

/** Coerce a value to a finite number, falling back to `d`. */
export function numOr(v: unknown, d: number): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
}
