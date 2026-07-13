import "server-only";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import {
  profile as fallbackProfile,
  afrikVine as fallbackAfrikVine,
  projects as fallbackProjects,
  expertiseCards as fallbackExpertise,
  articles as fallbackArticles,
} from "@/lib/portfolio-data";

/**
 * Server-only content layer.
 *
 * Merges DB records over the portfolio-data.ts fallbacks. If a DB call fails,
 * we ALWAYS fall back to portfolio-data so the public site never crashes.
 *
 * The shapes returned here match what the public portfolio components already
 * import from portfolio-data.ts (so we can pass them as props with defaults).
 */

// Public types intentionally mirror the shapes already used by the public
// portfolio components. DB rows are projected onto these shapes.

export type PublicProfile = typeof fallbackProfile & {
  cvPath: string | null;
  whatsappQrPath: string;
  afrikVineLogoPath: string;
  seoTitle?: string;
  seoDescription?: string;
  footerText?: string;
};

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  summary: string;
  description: string;
  placeholder: boolean;
  imageUrl: string | null;
  externalUrl: string | null;
  order: number;
  // Public-facing extras (mirror portfolio-data.projects shape)
  icon: string;
  accent: string;
  focus: string[];
  value: string;
};

export type PublicArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  category: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
};

export type PublicSkill = {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  category: string;
  href: string;
  // alias kept for compatibility with expertiseCards shape
  body: string;
};

export type PublicCertification = {
  id: string;
  title: string;
  issuer: string | null;
  year: string | null;
  credentialLink: string | null;
};

export type PublicTestimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string | null;
};

export type PublicAchievement = {
  id: string;
  title: string;
  metric: string | null;
  description: string | null;
  year: string | null;
};

export type PublicAfrikVine = typeof fallbackAfrikVine & {
  registrationNumber: string | null;
};

export interface MergedContent {
  profile: PublicProfile;
  afrikVine: PublicAfrikVine;
  projects: PublicProject[];
  articles: PublicArticle[];
  skills: PublicSkill[];
  certifications: PublicCertification[];
  testimonials: PublicTestimonial[];
  achievements: PublicAchievement[];
}

// ---- Helpers ----
function safeParseJSON<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function nonNullStr(v: string | null | undefined, fallback: string): string {
  return v && v.trim().length > 0 ? v : fallback;
}

// ---- Tiny in-memory cache (3s) ----
let cache: { at: number; data: MergedContent } | null = null;
const CACHE_TTL_MS = 3000;

export async function getMergedContent(): Promise<MergedContent> {
  // Static export mode (GitHub Pages): return pure fallback — no DB access.
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
    return buildStaticContent();
  }
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return cache.data;
  }
  const data = await buildContent();
  cache = { at: Date.now(), data };
  return data;
}

function buildStaticContent(): MergedContent {
  const profile: PublicProfile = {
    ...fallbackProfile,
    cvPath: null,
    whatsappQrPath: "/images/whatsapp-qr.jpeg",
    afrikVineLogoPath: fallbackAfrikVine.logo,
  };
  const afrikVine: PublicAfrikVine = {
    ...fallbackAfrikVine,
    logo: fallbackAfrikVine.logo,
    registrationNumber: null,
  };
  const projects: PublicProject[] = fallbackProjects.map((p, i) => ({
    id: `seed-${i}`, title: p.title, slug: slugify(p.title), category: p.category,
    status: p.status, summary: p.summary, description: p.value, placeholder: !!p.placeholder,
    imageUrl: null, externalUrl: null, order: i, icon: p.icon, accent: p.accent,
    focus: p.focus, value: p.value,
  }));
  const skills: PublicSkill[] = fallbackExpertise.map((c) => ({
    id: `seed-${c.title}`, title: c.title, description: c.body, body: c.body,
    icon: c.icon, accent: c.accent,
    category: c.href?.replace("#", "") ?? "general", href: c.href ?? "#expertise",
  }));
  return {
    profile, afrikVine, projects, articles: [], skills,
    certifications: [], testimonials: [], achievements: [],
  };
}

export function clearContentCache() {
  cache = null;
}

async function buildContent(): Promise<MergedContent> {
  // ---- profile (SiteSetting) ----
  let profile: PublicProfile = {
    ...fallbackProfile,
    cvPath: null,
    whatsappQrPath: "/images/whatsapp-qr.jpeg",
    afrikVineLogoPath: fallbackAfrikVine.logo,
  };

  try {
    const s = await db.siteSetting.findUnique({ where: { id: "1" } });
    if (s) {
      const socials = safeParseJSON<Record<string, string | null>>(s.socialLinks, {});
      profile = {
        ...profile,
        name: nonNullStr(s.name, profile.name),
        heroName: nonNullStr(s.heroName, profile.heroName),
        role: nonNullStr(s.role, profile.role),
        summary: nonNullStr(s.summary, profile.shortBio),
        shortBio: nonNullStr(s.summary, profile.shortBio),
        email: nonNullStr(s.email, profile.email),
        phone: nonNullStr(s.phone, profile.phone),
        whatsapp: nonNullStr(s.whatsappLink, profile.whatsapp),
        whatsappQrPath: nonNullStr(s.whatsappQrPath, profile.whatsappQrPath),
        profileImage: nonNullStr(s.profileImagePath, profile.profileImage),
        avatar: nonNullStr(s.profileImagePath, profile.avatar),
        afrikVineLogoPath: nonNullStr(s.afrikVineLogoPath, profile.afrikVineLogoPath),
        cvPath: s.cvPath ?? null,
        twitter: nonNullStr(socials.twitter ?? null, profile.twitter),
        github: nonNullStr(socials.github ?? null, profile.github),
        linkedin: socials.linkedin ?? profile.linkedin,
        seoTitle: s.seoTitle ?? undefined,
        seoDescription: s.seoDescription ?? undefined,
        footerText: s.footerText ?? undefined,
      };
    }
  } catch (err) {
    console.error("[content] SiteSetting load failed, using fallback:", err);
  }

  // ---- afrikVine (CompanyInfo) ----
  let afrikVine: PublicAfrikVine = {
    ...fallbackAfrikVine,
    logo: profile.afrikVineLogoPath || fallbackAfrikVine.logo,
    registrationNumber: null,
  };

  try {
    const c = await db.companyInfo.findUnique({ where: { id: "1" } });
    if (c) {
      afrikVine = {
        ...afrikVine,
        intro: nonNullStr(c.description, afrikVine.intro),
        mission: nonNullStr(c.mission, afrikVine.mission),
        vision: nonNullStr(c.vision, afrikVine.vision),
        roadmap: nonNullStr(c.roadmap, afrikVine.roadmap),
        registrationNumber: c.registrationNumber,
        values: safeParseJSON(c.values, afrikVine.values),
        serviceAreas: safeParseJSON(c.services, afrikVine.serviceAreas),
      };
    }
  } catch (err) {
    console.error("[content] CompanyInfo load failed, using fallback:", err);
  }

  // ---- projects ----
  let projects: PublicProject[] = fallbackProjects.map((p, i) => ({
    id: `seed-${i}`,
    title: p.title,
    slug: slugify(p.title),
    category: p.category,
    status: p.status,
    summary: p.summary,
    description: p.value,
    placeholder: !!p.placeholder,
    imageUrl: null,
    externalUrl: null,
    order: i,
    icon: p.icon,
    accent: p.accent,
    focus: p.focus,
    value: p.value,
  }));

  try {
    const dbProjects = await db.project.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    if (dbProjects.length > 0) {
      projects = dbProjects.map((p, i) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category ?? "",
        status: p.status,
        summary: p.summary ?? "",
        description: p.description ?? p.summary ?? "",
        placeholder: p.placeholder,
        imageUrl: p.imageUrl,
        externalUrl: p.externalUrl,
        order: p.order,
        icon: p.icon ?? "Sparkles",
        accent: p.accent ?? (["violet", "magenta", "blue"][i % 3]),
        focus: safeParseJSON<string[]>(p.tags, []),
        value: p.description ?? p.summary ?? "",
      }));
    }
  } catch (err) {
    console.error("[content] Projects load failed, using fallback:", err);
  }

  // ---- articles (only published) ----
  let articles: PublicArticle[] = [];
  try {
    const dbArticles = await db.article.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
    });
    articles = dbArticles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      body: a.body,
      category: a.category,
      featuredImage: a.featuredImage,
      publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
    }));
    // If no published articles, leave array empty — public articles section
    // shows its coming-soon UI (preserves today's behaviour).
  } catch (err) {
    console.error("[content] Articles load failed:", err);
  }

  // ---- skills (visible, ordered) ----
  let skills: PublicSkill[] = fallbackExpertise.map((c) => ({
    id: `seed-${c.title}`,
    title: c.title,
    description: c.body,
    body: c.body,
    icon: c.icon,
    accent: c.accent,
    category: c.href?.replace("#", "") ?? "general",
    href: c.href ?? "#expertise",
  }));

  try {
    const dbSkills = await db.skill.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (dbSkills.length > 0) {
      skills = dbSkills.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description ?? "",
        body: s.description ?? "",
        icon: s.icon ?? "Sparkles",
        accent: s.accent ?? "violet",
        category: s.category ?? "expertise",
        href: s.category ? `#${s.category}` : "#expertise",
      }));
    }
  } catch (err) {
    console.error("[content] Skills load failed, using fallback:", err);
  }

  // ---- certifications (visible) ---- empty by default
  let certifications: PublicCertification[] = [];
  try {
    certifications = (await db.certification.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })).map((c) => ({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      year: c.year,
      credentialLink: c.credentialLink,
    }));
  } catch (err) {
    console.error("[content] Certifications load failed:", err);
  }

  // ---- testimonials (visible) ---- empty by default
  let testimonials: PublicTestimonial[] = [];
  try {
    testimonials = (await db.testimonial.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })).map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      quote: t.quote,
    }));
  } catch (err) {
    console.error("[content] Testimonials load failed:", err);
  }

  // ---- achievements (visible) ---- empty by default
  let achievements: PublicAchievement[] = [];
  try {
    achievements = (await db.achievement.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })).map((a) => ({
      id: a.id,
      title: a.title,
      metric: a.metric,
      description: a.description,
      year: a.year,
    }));
  } catch (err) {
    console.error("[content] Achievements load failed:", err);
  }

  return {
    profile,
    afrikVine,
    projects,
    articles,
    skills,
    certifications,
    testimonials,
    achievements,
  };
}

/**
 * Public-safe projection: same shape as getMergedContent (already excludes
 * isRead, draft articles, hidden items). Kept for explicitness.
 */
export async function getPublicContent(): Promise<MergedContent> {
  return getMergedContent();
}

/** Re-export the static fallback for client components that need defaults. */
export { fallbackArticles, fallbackAfrikVine, fallbackProfile, fallbackProjects, fallbackExpertise };
