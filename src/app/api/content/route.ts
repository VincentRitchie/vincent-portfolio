import { NextResponse } from "next/server";
import { getPublicContent } from "@/lib/content";

/**
 * GET /api/content — public.
 * Returns the merged content (DB-over-fallback) with only public-safe fields.
 */
export async function GET() {
  try {
    const content = await getPublicContent();
    return NextResponse.json(content);
  } catch (err) {
    console.error("[content] GET error:", err);
    return NextResponse.json(
      { error: "Failed to load content." },
      { status: 500 }
    );
  }
}
