"use client";

import { Reveal, Section, SectionHeading, GlowCard } from "./shared";
import { promptEngineering, generativeAI, aiVideo } from "@/lib/portfolio-data";
import { TerminalSquare, Sparkles, Clapperboard, CheckCircle2, ArrowRight, Lightbulb } from "lucide-react";

export function PromptEngineering() {
  return (
    <Section id="prompt-engineering" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Prompt Engineering & Generative AI"
          title={
            <>
              Turning desired results into{" "}
              <span className="text-gradient">clear, structured instructions</span>
            </>
          }
          intro={promptEngineering.intro}
          accent="magenta"
        />

        {/* Prompt engineering core */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/15 text-fuchsia-300">
                  <TerminalSquare className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  How I understand prompt engineering
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {promptEngineering.understanding}
              </p>

              <h4 className="mt-6 mb-4 text-sm font-semibold text-foreground">
                Prompt design principles
              </h4>
              <div className="space-y-2.5">
                {promptEngineering.principles.map((p) => (
                  <div key={p.label} className="rounded-lg border border-border/60 bg-background/40 p-3">
                    <p className="text-sm font-medium text-fuchsia-200">{p.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-violet-400/20 bg-violet-500/5 p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Prompt debugging workflow
                </h3>
              </div>
              <ol className="space-y-3">
                {promptEngineering.debugWorkflow.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-violet-400/40 bg-background text-[10px] font-bold text-violet-200">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>

              <h4 className="mt-6 mb-3 text-sm font-semibold text-foreground">Use cases</h4>
              <ul className="space-y-2">
                {promptEngineering.useCases.map((u) => (
                  <li key={u} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Generative AI workflows */}
        <div className="mt-8 rounded-3xl border border-border bg-card/40 p-7 backdrop-blur-sm sm:p-9">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-medium text-sky-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Generative AI Workflows
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {generativeAI.headline}
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {generativeAI.experience}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {generativeAI.qualityReview}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tools I use
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {generativeAI.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="grid grid-cols-1 gap-3">
                  {generativeAI.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-border bg-background/50 p-5"
                    >
                      <p className="font-display text-3xl font-bold text-gradient">{s.value}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-3 rounded-2xl border border-violet-400/20 bg-violet-500/5 p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-violet-200">
                    Workflow structure
                  </p>
                  <ol className="space-y-1.5">
                    {generativeAI.workflow.map((s, i) => (
                      <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                        <span className="font-bold text-violet-300">{i + 1}.</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* AI Video content */}
        <Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3.5 py-1.5 text-xs font-medium text-fuchsia-200">
                <Clapperboard className="h-3.5 w-3.5" />
                AI Video Content Creation
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {aiVideo.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {aiVideo.intro}
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card/50 p-6">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Creative direction</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {aiVideo.creativeDirection}
                </p>
                <h4 className="mb-3 mt-5 text-sm font-semibold text-foreground">
                  Quality factors I review
                </h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {aiVideo.qualityFactors.map((q) => (
                    <div
                      key={q}
                      className="flex items-start gap-2 rounded-lg border border-border/60 bg-background/40 p-2.5"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fuchsia-300" />
                      <span className="text-xs leading-relaxed text-muted-foreground">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
