"use client";

import { Reveal, Section, SectionHeading, GlowCard, accentMap, type Accent } from "./shared";
import { Trophy, Sparkles } from "lucide-react";

export type PublicAchievement = {
  id: string;
  title: string;
  metric: string | null;
  description: string | null;
  year: string | null;
};

/**
 * Optional public Achievements section.
 * Renders NOTHING when `items` is empty (default state).
 * Placed near the hero / experience area on the public site.
 */
export function Achievements({ items = [] }: { items?: PublicAchievement[] } = {}) {
  if (!items || items.length === 0) return null;

  return (
    <Section id="achievements" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Achievements"
          title={
            <>
              Milestones & <span className="text-gradient">measurable outcomes</span>
            </>
          }
          intro="Verified, defensible achievements from my professional and creative work."
          accent="violet"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => {
            const accent = (["violet", "magenta", "blue"] as const)[i % 3] as Accent;
            const al = accentMap[accent];
            return (
              <Reveal key={a.id} delay={(i % 3) * 0.06}>
                <GlowCard accent={accent} className="h-full">
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl border ${al.iconWrap}`}>
                      <Trophy className="h-5 w-5" />
                    </div>
                    {a.year && (
                      <span className={`text-xs font-semibold uppercase tracking-wider ${al.text}`}>
                        {a.year}
                      </span>
                    )}
                  </div>
                  {a.metric && (
                    <p className={`font-display text-3xl font-bold ${al.text}`}>{a.metric}</p>
                  )}
                  <h3 className="mt-2 font-display text-base font-semibold text-foreground">
                    {a.title}
                  </h3>
                  {a.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      <Sparkles className="mr-1 inline-block h-3 w-3 align-middle text-muted-foreground" />
                      {a.description}
                    </p>
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
