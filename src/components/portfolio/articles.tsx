"use client";

import { Reveal, Section, SectionHeading, GlowCard } from "./shared";
import { articles } from "@/lib/portfolio-data";
import { FileText, ArrowUpRight, Clock } from "lucide-react";

export function Articles() {
  return (
    <Section id="articles" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Articles, Research & Blog"
          title={articles.headline}
          intro={articles.intro}
          accent="blue"
        />

        {/* Coming soon state */}
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-sky-950/30 via-background to-violet-950/30 p-8 sm:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-sky-500/20 blur-2xl" />
                <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                  <Clock className="h-7 w-7" />
                </div>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground sm:text-2xl">
                Coming Soon
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {articles.comingSoon}
              </p>
            </div>

            {/* Categories */}
            <div className="mt-8">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Future article categories
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {articles.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-100"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Placeholder article concepts */}
        <div className="mt-8">
          <Reveal>
            <h3 className="mb-5 font-display text-lg font-semibold text-foreground">
              Sample future article concepts
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {articles.placeholders.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <GlowCard accent={(["violet", "magenta", "blue"] as const)[i % 3]} className="h-full">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background/50 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-200">
                      Concept
                    </span>
                  </div>
                  <h4 className="font-display text-base font-semibold leading-snug text-foreground">
                    {a.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{a.body}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/70">
                    <ArrowUpRight className="h-3 w-3" />
                    In progress
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
