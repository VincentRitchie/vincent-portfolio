"use client";

import { Navbar } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Expertise } from "@/components/portfolio/expertise";
import { AiEvaluation } from "@/components/portfolio/ai-evaluation";
import { PromptEngineering } from "@/components/portfolio/prompt-engineering";
import { WebDevelopment } from "@/components/portfolio/web-development";
import { SecurityResearch } from "@/components/portfolio/security";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { AfrikVine } from "@/components/portfolio/afrik-vine";
import { Articles, type PublicArticle } from "@/components/portfolio/articles";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { Certifications, type PublicCertification } from "@/components/portfolio/certifications";
import { Testimonials, type PublicTestimonial } from "@/components/portfolio/testimonials";
import { Achievements, type PublicAchievement } from "@/components/portfolio/achievements";

/**
 * Client wrapper for the public portfolio site.
 *
 * Receives the merged `content` object from the server component (page.tsx)
 * and distributes each slice as a prop to the relevant section. Sections that
 * are NOT admin-editable (AI Evaluation, Prompt Engineering, Web Development,
 * Security, Experience) keep reading from portfolio-data directly — they are
 * rendered here without props.
 *
 * The 3 optional sections (Achievements, Certifications, Testimonials) render
 * NOTHING when their list is empty, so the public site looks exactly as it
 * does today until the admin adds items in the CMS.
 */
export interface PortfolioSiteContent {
  profile: {
    name: string;
    heroName: string;
    shortName: string;
    initials: string;
    role: string;
    location: string;
    tagline: string;
    heroHeadline: string;
    heroIntro: string;
    shortBio: string;
    longBio: string;
    profileImage: string;
    avatar: string;
    gallery: string[];
    whatsapp: string;
    email: string;
    phone: string;
    twitter: string;
    github: string;
    linkedin: string | null;
    cvPath: string | null;
    whatsappQrPath: string;
    afrikVineLogoPath: string;
    seoTitle?: string;
    seoDescription?: string;
    footerText?: string;
  };
  afrikVine: React.ComponentProps<typeof AfrikVine>["afrikVine"];
  projects: React.ComponentProps<typeof Projects>["projects"];
  articles: PublicArticle[];
  skills: React.ComponentProps<typeof Expertise>["skills"];
  certifications: PublicCertification[];
  testimonials: PublicTestimonial[];
  achievements: PublicAchievement[];
}

export function PortfolioSite({ content }: { content: PortfolioSiteContent }) {
  const {
    profile,
    afrikVine,
    projects,
    articles,
    skills,
    certifications,
    testimonials,
    achievements,
  } = content;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar profile={profile} />
      <main className="flex-1">
        <Hero profile={profile} />
        <About profile={profile} />
        <Expertise skills={skills} />
        <Certifications items={certifications} />
        <AiEvaluation />
        <PromptEngineering />
        <WebDevelopment />
        <SecurityResearch />
        <Experience />
        <Achievements items={achievements} />
        <Projects projects={projects} />
        <Testimonials items={testimonials} />
        <AfrikVine afrikVine={afrikVine} />
        <Articles published={articles} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
