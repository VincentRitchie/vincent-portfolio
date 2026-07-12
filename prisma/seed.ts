/**
 * Idempotent seed script — reads portfolio-data.ts and upserts baseline content.
 *
 * Run manually (does NOT auto-run on db:push to avoid clobbering admin edits):
 *   bun prisma/seed.ts   OR   bun prisma db seed
 *
 * Seeds:
 *  - SiteSetting(1)        from portfolio-data.profile fields
 *  - CompanyInfo(1)        from portfolio-data.afrikVine
 *  - Projects              from portfolio-data.projects (with slugified unique slugs)
 *  - Skills                from portfolio-data.expertiseCards
 *  - Articles              from portfolio-data.articles.placeholders (status='draft')
 *  - Certifications / Testimonials / Achievements -> left empty (per brief)
 */
import { PrismaClient } from "@prisma/client";
import {
  profile,
  afrikVine,
  projects as seedProjects,
  expertiseCards,
  articles,
} from "../src/lib/portfolio-data";

const db = new PrismaClient();

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function main() {
  // ---- SiteSetting singleton ----
  const socialLinks = JSON.stringify({
    twitter: profile.twitter,
    github: profile.github,
    linkedin: profile.linkedin,
    email: profile.email,
    phone: profile.phone,
    whatsapp: profile.whatsapp,
  });

  await db.siteSetting.upsert({
    where: { id: "1" },
    create: {
      id: "1",
      name: profile.name,
      heroName: profile.heroName,
      role: profile.role,
      summary: profile.shortBio,
      email: profile.email,
      phone: profile.phone,
      whatsappLink: profile.whatsapp,
      whatsappQrPath: "/images/whatsapp-qr.jpeg",
      socialLinks,
      footerText: "AI Evaluation, Prompt Engineering, Web Development, and Security-Informed Digital Solutions.",
      seoTitle: "Obasiochie Vincent Chimaobi | AI Evaluation, Prompt Engineering & Web Development",
      seoDescription: profile.shortBio,
      profileImagePath: profile.profileImage,
      afrikVineLogoPath: afrikVine.logo,
    },
    update: {}, // never clobber admin edits on re-run
  });
  console.log("[seed] SiteSetting(1) ready");

  // ---- CompanyInfo singleton ----
  await db.companyInfo.upsert({
    where: { id: "1" },
    create: {
      id: "1",
      description: afrikVine.intro,
      mission: afrikVine.mission,
      vision: afrikVine.vision,
      roadmap: afrikVine.roadmap,
      registrationNumber: null,
      values: JSON.stringify(afrikVine.values),
      services: JSON.stringify(afrikVine.serviceAreas),
    },
    update: {},
  });
  console.log("[seed] CompanyInfo(1) ready");

  // ---- Projects ----
  for (const p of seedProjects) {
    const slug = slugify(p.title);
    await db.project.upsert({
      where: { slug },
      create: {
        title: p.title,
        slug,
        category: p.category,
        summary: p.summary,
        description: p.value,
        status: p.status,
        placeholder: !!p.placeholder,
        icon: p.icon,
        accent: p.accent,
        tags: JSON.stringify(p.focus ?? []),
        order: 0,
        visible: true,
      },
      update: {}, // never clobber admin edits on re-run
    });
  }
  console.log(`[seed] Projects ready (${seedProjects.length})`);

  // ---- Skills ----
  for (let i = 0; i < expertiseCards.length; i++) {
    const card = expertiseCards[i];
    // slug-style unique key per skill — use title-slug as a deterministic key by try/upsert via title
    const existing = await db.skill.findFirst({ where: { title: card.title } });
    if (!existing) {
      await db.skill.create({
        data: {
          title: card.title,
          description: card.body,
          icon: card.icon,
          accent: card.accent,
          category: card.href?.replace("#", "") ?? "general",
          order: i,
          visible: true,
        },
      });
    }
  }
  console.log(`[seed] Skills ready (${expertiseCards.length})`);

  // ---- Articles (draft placeholders) ----
  for (const a of articles.placeholders) {
    const slug = slugify(a.title);
    await db.article.upsert({
      where: { slug },
      create: {
        title: a.title,
        slug,
        excerpt: a.body,
        body: a.body,
        status: "draft",
      },
      update: {},
    });
  }
  console.log(`[seed] Articles ready (${articles.placeholders.length}, all draft)`);

  console.log("[seed] Done. Certifications / Testimonials / Achievements intentionally left empty.");
}

main()
  .catch((err) => {
    console.error("[seed] failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
