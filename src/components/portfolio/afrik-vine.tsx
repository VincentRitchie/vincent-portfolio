"use client";

import { Reveal, Section, SectionHeading, accentMap } from "./shared";
import { afrikVine } from "@/lib/portfolio-data";
import { Rocket, Eye, Target, Layers, ArrowRight, Sparkles } from "lucide-react";

export function AfrikVine() {
  return (
    <Section id="afrik-vine" className="border-t border-border/40">
      {/* deep aurora backdrop exclusive to the company section */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-96 w-96 rounded-full bg-violet-700/15 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[10%] h-96 w-96 rounded-full bg-fuchsia-700/12 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Identity separation banner */}
        <Reveal>
          <div className="mb-10 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/5 px-4 py-1.5 text-xs font-medium text-amber-200">
              <Layers className="h-3.5 w-3.5" />
              A professional venture within {`Obasiochie's`} portfolio
            </div>
          </div>
        </Reveal>

        <SectionHeading
          eyebrow="Afrik-Vine Tech LTD"
          title={afrikVine.headline}
          intro={afrikVine.intro}
          accent="violet"
          align="center"
        />

        {/* Logo + positioning */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/25 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-violet-400/30 bg-card/60 p-2 backdrop-blur-sm">
                <img
                  src={afrikVine.logo}
                  alt="Afrik-Vine Tech LTD — company logo"
                  className="h-40 w-40 rounded-2xl object-cover sm:h-48 sm:w-48"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="mt-5 font-display text-xl font-bold text-gradient">
              {afrikVine.name}
            </p>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {afrikVine.tagline}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            {afrikVine.positioning}
          </p>
        </Reveal>

        {/* Mission + Vision */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-violet-400/20 bg-violet-500/5 p-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Draft Mission
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{afrikVine.mission}</p>
              <p className="mt-3 text-[11px] italic text-muted-foreground/70">
                Editable placeholder — to be finalized with official company details.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/15 text-fuchsia-300">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Draft Vision
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{afrikVine.vision}</p>
              <p className="mt-3 text-[11px] italic text-muted-foreground/70">
                Editable placeholder — to be finalized with official company details.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Core values */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-border bg-card/40 p-7 backdrop-blur-sm">
            <h3 className="mb-5 font-display text-lg font-semibold text-foreground">Core values</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {afrikVine.values.map((v, i) => {
                const accent = (["violet", "magenta", "blue"] as const)[i % 3];
                const a = accentMap[accent];
                return (
                  <div key={v.label} className={`rounded-xl border ${a.border} ${a.bg} p-4`}>
                    <p className={`text-sm font-semibold ${a.text}`}>{v.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{v.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Service areas + engagement process */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-sky-400/20 bg-sky-500/5 p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Planned service areas
                </h3>
              </div>
              <ul className="space-y-2">
                {afrikVine.serviceAreas.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-border bg-card/50 p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                  <Rocket className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Client engagement process
                </h3>
              </div>
              <ol className="space-y-2.5">
                {afrikVine.engagementProcess.map((p, i) => (
                  <li key={p.step} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-violet-400/40 bg-background text-[10px] font-bold text-violet-200">
                      {i + 1}
                    </span>
                    <span>
                      <span className="font-medium text-foreground">{p.step}:</span>{" "}
                      {p.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* Roadmap */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-950/30 via-background to-violet-950/30 p-7">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-fuchsia-200">
              <Sparkles className="h-4 w-4" />
              Long-term roadmap
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{afrikVine.roadmap}</p>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card/40 p-7 text-center sm:flex-row sm:text-left">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{afrikVine.cta}</p>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition-all hover:bg-violet-500/20"
            >
              Afrik-Vine Inquiry
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
