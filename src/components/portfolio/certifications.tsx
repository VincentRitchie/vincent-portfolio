"use client";

import { Reveal, Section, SectionHeading, GlowCard, accentMap, type Accent } from "./shared";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";

export type PublicCertification = {
  id: string;
  title: string;
  issuer: string | null;
  year: string | null;
  credentialLink: string | null;
};

/**
 * Optional public Certifications section.
 * Renders NOTHING when `items` is empty (default state) so the public site
 * looks exactly as it does today until the admin adds real certifications.
 */
export function Certifications({ items = [] }: { items?: PublicCertification[] } = {}) {
  if (!items || items.length === 0) return null;

  return (
    <Section id="certifications" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title={
            <>
              Verified <span className="text-gradient">certifications & credentials</span>
            </>
          }
          intro="A focused set of certifications and credentials that support my professional practice."
          accent="blue"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => {
            const accent = (["violet", "magenta", "blue"] as const)[i % 3] as Accent;
            const a = accentMap[accent];
            const Wrapper = c.credentialLink ? "a" : "div";
            const wrapperProps = c.credentialLink
              ? {
                  href: c.credentialLink,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};
            return (
              <Reveal key={c.id} delay={(i % 3) * 0.06}>
                <Wrapper {...wrapperProps} className="block h-full">
                  <GlowCard accent={accent} className="h-full">
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`grid h-11 w-11 place-items-center rounded-xl border ${a.iconWrap}`}>
                        <Award className="h-5 w-5" />
                      </div>
                      {c.credentialLink && (
                        <ExternalLink className={`h-4 w-4 ${a.text} opacity-70`} />
                      )}
                    </div>
                    <h3 className="font-display text-base font-semibold leading-snug text-foreground">
                      {c.title}
                    </h3>
                    {c.issuer && (
                      <p className={`mt-2 text-sm font-medium ${a.text}`}>{c.issuer}</p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      {c.year && (
                        <span className="inline-flex items-center gap-1">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          {c.year}
                        </span>
                      )}
                    </div>
                  </GlowCard>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
