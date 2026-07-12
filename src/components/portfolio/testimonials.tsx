"use client";

import { Reveal, Section, SectionHeading, accentMap } from "./shared";
import { Quote } from "lucide-react";

export type PublicTestimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string | null;
};

/**
 * Optional public Testimonials section.
 * Renders NOTHING when `items` is empty (default state).
 */
export function Testimonials({ items = [] }: { items?: PublicTestimonial[] } = {}) {
  if (!items || items.length === 0) return null;

  return (
    <Section id="testimonials" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              What colleagues & clients <span className="text-gradient">say about my work</span>
            </>
          }
          intro="Verified feedback from people I have worked with."
          accent="magenta"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => {
            const accent = (["violet", "magenta", "blue"] as const)[i % 3];
            const a = accentMap[accent];
            return (
              <Reveal key={t.id} delay={(i % 3) * 0.06}>
                <figure className="relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 hover:opacity-100 bg-gradient-to-br ${a.gradient}`}
                  />
                  <div className="relative">
                    <Quote className={`h-7 w-7 ${a.text} opacity-70`} />
                    {t.quote && (
                      <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                        “{t.quote}”
                      </blockquote>
                    )}
                    <figcaption className="mt-5 flex items-center gap-3">
                      <span className={`grid h-9 w-9 place-items-center rounded-full border ${a.iconWrap} font-display text-xs font-bold`}>
                        {t.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
