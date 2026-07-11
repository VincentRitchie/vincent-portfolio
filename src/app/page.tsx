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
import { Articles } from "@/components/portfolio/articles";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Expertise />
        <AiEvaluation />
        <PromptEngineering />
        <WebDevelopment />
        <SecurityResearch />
        <Experience />
        <Projects />
        <AfrikVine />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
