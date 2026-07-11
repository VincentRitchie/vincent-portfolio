"use client";

import { Reveal, Section, SectionHeading, GlowCard, Icon, accentMap } from "./shared";
import { webDevelopment } from "@/lib/portfolio-data";
import { Code2, CheckCircle2, ArrowRight } from "lucide-react";

export function WebDevelopment() {
  return (
    <Section id="web-development" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Web Development"
          title={
            <>
              Websites that combine design, strategy, performance{" "}
              <span className="text-gradient">&amp; maintainability</span>
            </>
          }
          intro={webDevelopment.intro}
          accent="blue"
        />

        {/* Philosophy + process */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="h-full rounded-2xl border border-sky-400/20 bg-sky-500/5 p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  My web development philosophy
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {webDevelopment.philosophy}
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-card/50 p-7">
              <h3 className="mb-5 font-display text-lg font-semibold text-foreground">
                Development process
              </h3>
              <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {webDevelopment.process.map((p, i) => (
                  <li
                    key={p.step}
                    className="rounded-xl border border-border/60 bg-background/40 p-3"
                  >
                    <p className="flex items-center gap-2 text-sm font-semibold text-sky-200">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-sky-400/40 bg-background text-[10px] font-bold">
                        {i + 1}
                      </span>
                      {p.step}
                    </p>
                    <p className="mt-1 pl-7 text-xs leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* Priorities */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-border bg-card/40 p-7 backdrop-blur-sm">
            <h3 className="mb-5 font-display text-lg font-semibold text-foreground">
              What I prioritize
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {webDevelopment.priorities.map((p, i) => {
                const accent = (["violet", "magenta", "blue", "silver"] as const)[i % 4];
                const a = accentMap[accent];
                return (
                  <div key={p.label} className={`rounded-xl border ${a.border} ${a.bg} p-4`}>
                    <p className={`text-sm font-semibold ${a.text}`}>{p.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Service areas */}
        <div className="mt-10">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Web development service areas
            </h3>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {webDevelopment.serviceAreas.map((s, i) => {
              const accent = (["blue", "violet", "magenta", "blue"] as const)[i % 4];
              const a = accentMap[accent];
              return (
                <Reveal key={s.title} delay={i * 0.06}>
                  <GlowCard accent={accent} className="h-full">
                    <div className="flex items-start gap-4">
                      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border ${a.iconWrap}`}>
                        <Icon name={s.icon} className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display text-base font-semibold text-foreground">
                          {s.title}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-950/40 to-fuchsia-950/30 p-7 text-center sm:flex-row sm:text-left">
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground">
                Need a website built around your business goal?
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Let&apos;s discuss your audience, content, and conversion path.
              </p>
            </div>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(217,70,239,0.7)] transition-all hover:-translate-y-0.5"
            >
              Request a Project Discussion
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
