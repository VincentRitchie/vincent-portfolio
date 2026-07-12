import { getMergedContent, type MergedContent } from "@/lib/content";
import { PortfolioSite, type PortfolioSiteContent } from "@/components/portfolio/portfolio-site";

export const dynamic = "force-dynamic";

/**
 * Public homepage — SERVER component.
 *
 * Calls getMergedContent() (DB-over-portfolio-data fallback) and passes the
 * merged content to the client wrapper <PortfolioSite />. If the DB is
 * unavailable, getMergedContent() returns the portfolio-data fallback so the
 * public site never crashes.
 */
export default async function Home() {
  const content: MergedContent = await getMergedContent();
  return <PortfolioSite content={content as PortfolioSiteContent} />;
}
