import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

/** GET /api/admin/company — protected */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const c = await db.companyInfo.findUnique({ where: { id: "1" } });
    return NextResponse.json({ company: c });
  } catch (err) {
    console.error("[company] GET error:", err);
    return NextResponse.json({ error: "Failed to load company info." }, { status: 500 });
  }
}

/** PUT /api/admin/company — protected */
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json().catch(() => ({}));
    const allowed: Record<string, unknown> = {};
    const fields = [
      "description", "mission", "vision", "roadmap",
      "registrationNumber", "values", "services",
    ];
    for (const f of fields) {
      if (f in body) {
        const v = body[f];
        // values / services are arrays — serialize to JSON string for SQLite.
        if ((f === "values" || f === "services") && Array.isArray(v)) {
          allowed[f] = JSON.stringify(v);
        } else {
          allowed[f] = v === "" ? null : v;
        }
      }
    }

    const updated = await db.companyInfo.upsert({
      where: { id: "1" },
      create: { id: "1", ...(allowed as Record<string, string | null>) },
      update: (allowed as Record<string, string | null>) ?? {},
    });
    return NextResponse.json({ success: true, company: updated });
  } catch (err) {
    console.error("[company] PUT error:", err);
    return NextResponse.json({ error: "Failed to update company info." }, { status: 500 });
  }
}
