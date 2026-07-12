import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session;
}

/** GET /api/admin/site-settings — protected */
export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const s = await db.siteSetting.findUnique({ where: { id: "1" } });
    return NextResponse.json({ settings: s });
  } catch (err) {
    console.error("[site-settings] GET error:", err);
    return NextResponse.json({ error: "Failed to load settings." }, { status: 500 });
  }
}

/** PUT /api/admin/site-settings — protected. Body = partial SiteSetting fields. */
export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json().catch(() => ({}));

    // Whitelist updatable fields.
    const allowed: Record<string, unknown> = {};
    const fields = [
      "name", "heroName", "role", "summary", "email", "phone",
      "whatsappLink", "whatsappQrPath", "socialLinks", "footerText",
      "seoTitle", "seoDescription", "profileImagePath", "cvPath", "afrikVineLogoPath",
    ];
    for (const f of fields) {
      if (f in body) {
        const v = body[f];
        allowed[f] = v === "" ? null : v;
      }
    }

    // socialLinks must be a JSON string
    if (allowed.socialLinks && typeof allowed.socialLinks !== "string") {
      allowed.socialLinks = JSON.stringify(allowed.socialLinks);
    }

    const updated = await db.siteSetting.upsert({
      where: { id: "1" },
      create: { id: "1", ...(allowed as Record<string, string | null>) },
      update: (allowed as Record<string, string | null>) ?? {},
    });
    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    console.error("[site-settings] PUT error:", err);
    return NextResponse.json({ error: "Failed to update settings." }, { status: 500 });
  }
}
