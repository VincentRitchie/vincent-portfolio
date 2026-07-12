"use client";

import { Reveal, Section, SectionHeading, GlowCard, Icon, accentMap } from "./shared";
import { expertiseCards as defaultExpertiseCards, expertiseIntegration, selectedHighlights } from "@/lib/portfolio-data";
import { CheckCircle2, Sparkles } from "lucide-react";

type SkillCard = typeof defaultExpertiseCards[number];

export function Expertise({ skills = defaultExpertiseCards }: { skills?: SkillCard[] } = {}) {
  return (
    <Section id="expertise" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expertise Overview"
          title={
            <>
              Expertise built around{" "}
              <span className="text-gradient">evaluation, clarity, structure</span>{" "}
              and practical results
            </>
          }
          intro="My expertise connects AI evaluation, prompt engineering, generative AI workflows, analytical thinking, technical documentation, web development, and security-informed reasoning. Each area is supported by the same professional discipline: understand the requirement, verify the evidence, and build outputs that are useful in real-world contexts."
          accent="violet"
        />

        {/* Expertise cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {skills.map((card, i) => {
            const accent = card.accent as keyof typeof accentMap;
            const a = accentMap[accent];
            return (
              <Reveal key={card.title} delay={(i % 5) * 0.05}>
                <button
                  onClick={() => {
                    document
                      .querySelector(card.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group h-full w-full text-left"
                >
                  <GlowCard accent={accent} className="h-full">
                    <div
                      className={`mb-4 grid h-11 w-11 place-items-center rounded-xl border ${a.iconWrap}`}
                    >
                      <Icon name={card.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-sm font-semibold leading-snug text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                    <span
                      className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${a.text} opacity-0 transition-opacity group-hover:opacity-100`}
                    >
                      Explore <span className="text-[10px]">→</span>
                    </span>
                  </GlowCard>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Integration + highlights */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card/50 p-7 backdrop-blur-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
                <Sparkles className="h-3.5 w-3.5" />
                How these skills work together
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {expertiseIntegration}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-card/50 p-7 backdrop-blur-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-200">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Selected highlights
              </div>
              <ul className="space-y-3">
                {selectedHighlights.map((h, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
