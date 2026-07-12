"use client";

import { Reveal, Section, SectionHeading, GlowCard, Icon, accentMap, type Accent } from "./shared";
import { projects as defaultProjects } from "@/lib/portfolio-data";
import { ArrowUpRight, Sparkles } from "lucide-react";

type ProjectItem = typeof defaultProjects[number];

export function Projects({ projects = defaultProjects }: { projects?: ProjectItem[] } = {}) {
  return (
    <Section id="projects" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects & Case Studies"
          title={
            <>
              Projects that reflect technical learning, AI workflows{" "}
              <span className="text-gradient">&amp; practical problem solving</span>
            </>
          }
          intro="This section presents confirmed work from my academic, community, AI content, and technical background. It also includes clearly labeled placeholder case studies that define the structure for future client work and demonstrations."
          accent="magenta"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const accent = p.accent as Accent;
            const a = accentMap[accent];
            return (
              <Reveal key={p.title} delay={(i % 3) * 0.06}>
                <GlowCard accent={accent} className="flex h-full flex-col">
                  {/* header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`grid h-12 w-12 place-items-center rounded-xl border ${a.iconWrap}`}>
                      <Icon name={p.icon} className="h-5 w-5" />
                    </div>
                    {p.placeholder ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                        Placeholder
                      </span>
                    ) : (
                      <span className={`inline-flex items-center gap-1 rounded-full border ${a.border} ${a.bg} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${a.text}`}>
                        {p.status}
                      </span>
                    )}
                  </div>

                  <p className={`text-[11px] font-semibold uppercase tracking-wider ${a.text}`}>
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>

                  {/* focus tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* value */}
                  <div className="mt-5 grow rounded-xl border border-border/60 bg-background/40 p-3">
                    <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="h-3 w-3" />
                      Professional value
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{p.value}</p>
                  </div>

                  {p.placeholder && (
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-amber-200">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      Coming soon · not yet a client project
                    </div>
                  )}
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
