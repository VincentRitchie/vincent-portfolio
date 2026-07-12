import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { CompanyForm } from "@/components/admin/company-form";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminCompanyPage() {
  let company: Awaited<ReturnType<typeof db.companyInfo.findUnique>> = null;
  try {
    company = await db.companyInfo.findUnique({ where: { id: "1" } });
  } catch (err) {
    console.error("[admin/company] load failed:", err);
  }

  return (
    <>
      <AdminPageHeader
        title="Afrik-Vine Tech LTD"
        description="Company section content. Empty fields fall back to portfolio-data defaults. The Afrik-Vine logo stays confined to its section."
        action={company ? <StatusBadge tone="success">Loaded</StatusBadge> : <StatusBadge tone="warning">Defaults</StatusBadge>}
      />
      <CompanyForm initial={JSON.parse(JSON.stringify(company))} />
    </>
  );
}
