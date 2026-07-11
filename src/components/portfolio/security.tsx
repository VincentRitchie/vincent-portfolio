"use client";

import { Reveal, Section, SectionHeading } from "./shared";
import { securityResearch } from "@/lib/portfolio-data";
import { ShieldCheck, ShieldAlert, Lock, FileWarning, Eye } from "lucide-react";

export function SecurityResearch() {
  return (
    <Section id="security-research" className="border-t border-border/40">
      {/* atmospheric backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-700/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Security Research"
          title={
            <>
              Guided by evidence, responsible testing{" "}
              <span className="text-gradient">&amp; clear risk communication</span>
            </>
          }
          intro={securityResearch.intro}
          accent="violet"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Philosophy + reporting */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <div className="rounded-2xl border border-violet-400/20 bg-violet-500/5 p-7">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Security research philosophy
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {securityResearch.philosophy}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card/50 p-7">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/15 text-fuchsia-300">
                    <FileWarning className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Reporting style
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {securityResearch.reportingStyle}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-200">
                  <Eye className="h-4 w-4" />
                  What I can discuss publicly
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {securityResearch.publicNote}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Methodology + interest areas */}
          <div className="space-y-6 lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-border bg-card/50 p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Methodology overview
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {securityResearch.methodology.map((m, i) => (
                    <div
                      key={m.step}
                      className="rounded-xl border border-border/60 bg-background/40 p-4"
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold text-sky-200">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-sky-400/40 bg-background text-[10px] font-bold">
                          {i + 1}
                        </span>
                        {m.step}
                      </p>
                      <p className="mt-1 pl-7 text-xs leading-relaxed text-muted-foreground">
                        {m.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card/50 p-7">
                <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                  Areas of security interest
                </h3>
                <div className="flex flex-wrap gap-2">
                  {securityResearch.interestAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-100"
                    >
                      <ShieldAlert className="h-3 w-3 text-fuchsia-300" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
