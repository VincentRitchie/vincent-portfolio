"use client";

import { Reveal, Section, SectionHeading, GlowCard, Icon, accentMap } from "./shared";
import { webDevelopment } from "@/lib/portfolio-data";
import { webDevExtended } from "@/lib/web-dev-content";
import { Code2, ArrowRight, Layers, Zap, ShieldCheck, Compass, Workflow, Sparkles } from "lucide-react";

export function WebDevelopment() {
  const e = webDevExtended;
  return (
    <Section id="web-development" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Web Development"
          title={<>{`Websites that combine design, strategy, performance `}<span className="text-gradient">&amp; maintainability</span></>}
          intro={e.intro}
          accent="blue"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="h-full rounded-2xl border border-sky-400/20 bg-sky-500/5 p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">My web development philosophy</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{e.philosophy}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="h-full space-y-4">
              <div className="rounded-2xl border border-border bg-card/50 p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-200"><Compass className="h-4 w-4" /> Development methodology</div>
                <p className="text-sm leading-relaxed text-muted-foreground">{e.methodology}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/50 p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-fuchsia-200"><Workflow className="h-4 w-4" /> Software engineering workflow</div>
                <p className="text-sm leading-relaxed text-muted-foreground">{e.engineeringWorkflow}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal><GlowCard accent="blue" className="h-full"><h4 className="font-display text-sm font-semibold text-sky-200">Analytical problem-solving</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{e.analyticalApproach}</p></GlowCard></Reveal>
          <Reveal delay={0.06}><GlowCard accent="violet" className="h-full"><h4 className="font-display text-sm font-semibold text-violet-200">UI / UX thinking</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{e.uxThinking}</p></GlowCard></Reveal>
          <Reveal delay={0.12}><GlowCard accent="magenta" className="h-full"><h4 className="font-display text-sm font-semibold text-fuchsia-200">System architecture mindset</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{e.architectureMindset}</p></GlowCard></Reveal>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Reveal><div className="h-full rounded-2xl border border-violet-400/20 bg-violet-500/5 p-6"><h4 className="mb-2 text-sm font-semibold text-violet-200">Design philosophy</h4><p className="text-xs leading-relaxed text-muted-foreground">{e.designPhilosophy}</p></div></Reveal>
          <Reveal delay={0.06}><div className="h-full rounded-2xl border border-sky-400/20 bg-sky-500/5 p-6"><h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-sky-200"><Zap className="h-3.5 w-3.5" /> Performance strategy</h4><p className="text-xs leading-relaxed text-muted-foreground">{e.performanceStrategy}</p></div></Reveal>
          <Reveal><div className="h-full rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-6"><h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-fuchsia-200"><ShieldCheck className="h-3.5 w-3.5" /> Security-first mindset</h4><p className="text-xs leading-relaxed text-muted-foreground">{e.securityMindset}</p></div></Reveal>
          <Reveal delay={0.06}><div className="h-full rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-6"><h4 className="mb-2 text-sm font-semibold text-emerald-200">Quality assurance</h4><p className="text-xs leading-relaxed text-muted-foreground">{e.qualityAssurance}</p></div></Reveal>
        </div>

        <Reveal>
          <div className="mt-8 rounded-2xl border border-border bg-card/40 p-7 backdrop-blur-sm">
            <h3 className="mb-5 font-display text-lg font-semibold text-foreground">Development lifecycle</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {e.lifecycle.map((p, i) => (
                <div key={p.phase} className="rounded-xl border border-border/60 bg-background/40 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-sky-200"><span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-sky-400/40 bg-background text-[9px] font-bold">{i + 1}</span>{p.phase}</p>
                  <p className="mt-1 pl-5.5 text-[11px] leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal><div className="h-full rounded-2xl border border-violet-400/20 bg-violet-500/5 p-7"><h3 className="mb-3 font-display text-base font-semibold text-foreground">Client consultation process</h3><p className="text-sm leading-relaxed text-muted-foreground">{e.clientConsultation}</p></div></Reveal>
          <Reveal delay={0.06}><div className="h-full rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-7"><h3 className="mb-3 font-display text-base font-semibold text-foreground">Requirement analysis methodology</h3><p className="text-sm leading-relaxed text-muted-foreground">{e.requirementAnalysis}</p></div></Reveal>
        </div>

        <Reveal>
          <div className="mt-8 rounded-2xl border border-border bg-card/40 p-7 backdrop-blur-sm">
            <h3 className="mb-5 font-display text-lg font-semibold text-foreground">What I prioritize</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {e.priorities.map((p, i) => {
                const accent = (["violet", "magenta", "blue", "silver"] as const)[i % 4];
                const a = accentMap[accent];
                return <div key={p.label} className={`rounded-xl border ${a.border} ${a.bg} p-4`}><p className={`text-sm font-semibold ${a.text}`}>{p.label}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.body}</p></div>;
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Reveal><div className="h-full rounded-2xl border border-border bg-card/50 p-5"><h4 className="mb-2 text-sm font-semibold text-violet-200">Maintainability</h4><p className="text-xs leading-relaxed text-muted-foreground">{e.maintainability}</p></div></Reveal>
          <Reveal delay={0.06}><div className="h-full rounded-2xl border border-border bg-card/50 p-5"><h4 className="mb-2 text-sm font-semibold text-sky-200">Scalability</h4><p className="text-xs leading-relaxed text-muted-foreground">{e.scalability}</p></div></Reveal>
          <Reveal delay={0.12}><div className="h-full rounded-2xl border border-border bg-card/50 p-5"><h4 className="mb-2 text-sm font-semibold text-fuchsia-200">Long-term support</h4><p className="text-xs leading-relaxed text-muted-foreground">{e.longTermSupport}</p></div></Reveal>
        </div>

        <div className="mt-10">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">Web development solutions for every need &amp; budget</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{e.solutionPhilosophy}</p>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {e.solutions.map((s, i) => {
              const accent = (["blue", "violet", "magenta", "blue"] as const)[i % 4];
              const a = accentMap[accent];
              return <Reveal key={s.title} delay={(i % 4) * 0.05}><GlowCard accent={accent} className="h-full"><div className="mb-3"><div className={`grid h-10 w-10 place-items-center rounded-lg border ${a.iconWrap}`}><Icon name={s.icon} className="h-4.5 w-4.5" /></div></div><h4 className="font-display text-sm font-semibold text-foreground">{s.title}</h4><p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.body}</p></GlowCard></Reveal>;
            })}
          </div>
        </div>

        {/* Web Development Toolkit */}
        <Reveal>
          <div className="mt-10 rounded-2xl border border-border bg-card/40 p-7 backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-2">
              <Layers className="h-5 w-5 text-violet-300" />
              <h3 className="font-display text-lg font-semibold text-foreground">Web Development Toolkit</h3>
            </div>
            <div className="space-y-5">
              {e.toolkit.map((group, gi) => {
                const accent = (["violet", "blue", "magenta", "violet", "blue"] as const)[gi % 5];
                const a = accentMap[accent];
                return (
                  <div key={group.category} className="flex flex-col gap-2.5 sm:flex-row sm:items-start">
                    <p className={`w-full shrink-0 text-xs font-semibold uppercase tracking-wider sm:w-56 ${a.text}`}>{group.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span key={item} className={`rounded-full border ${a.border} ${a.bg} px-2.5 py-1 text-xs font-medium ${a.text}`}>{item}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 border-t border-border/50 pt-4 text-xs leading-relaxed text-muted-foreground">{e.costNote}</p>
          </div>
        </Reveal>

        {/* Advanced Website Features & Client Solutions */}
        <Reveal>
          <div className="mt-6 rounded-2xl border border-border bg-card/40 p-7 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-fuchsia-300" />
              <h3 className="font-display text-lg font-semibold text-foreground">Advanced Website Features &amp; Client Solutions</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{e.advancedFeaturesNote}</p>
            <div className="flex flex-wrap gap-1.5">
              {e.advancedFeatures.map((feature) => (
                <span key={feature} className="rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-2.5 py-1 text-xs font-medium text-fuchsia-100/90">{feature}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Service areas */}
        <div className="mt-10">
          <Reveal><h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">Web development service areas</h3></Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {webDevelopment.serviceAreas.map((s, i) => {
              const accent = (["blue", "violet", "magenta", "blue"] as const)[i % 4];
              const a = accentMap[accent];
              return <Reveal key={s.title} delay={i * 0.06}><GlowCard accent={accent} className="h-full"><div className="flex items-start gap-4"><div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border ${a.iconWrap}`}><Icon name={s.icon} className="h-5 w-5" /></div><div className="min-w-0"><h4 className="font-display text-base font-semibold text-foreground">{s.title}</h4><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p></div></div></GlowCard></Reveal>;
            })}
          </div>
        </div>

        <Reveal>
          <div className="mt-8 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-950/40 to-fuchsia-950/30 p-7">
            <h4 className="mb-2 font-display text-base font-semibold text-foreground">Solution recommendation</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{e.solutionPhilosophy}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-950/40 to-fuchsia-950/30 p-7 text-center sm:flex-row sm:text-left">
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground">Need a website built around your business goal?</h4>
              <p className="mt-1 text-sm text-muted-foreground">Let&apos;s discuss your audience, content, and conversion path.</p>
            </div>
            <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(217,70,239,0.7)] transition-all hover:-translate-y-0.5">
              Request a Project Discussion
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
