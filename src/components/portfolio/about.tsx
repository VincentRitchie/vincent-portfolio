"use client";

import { Reveal, Section, SectionHeading, GlowCard, accentMap } from "./shared";
import { about, profile as defaultProfile } from "@/lib/portfolio-data";
import { Quote, Target, Compass, Layers } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

type ProfileLike = typeof defaultProfile;

export function About({ profile = defaultProfile }: { profile?: ProfileLike } = {}) {
  return (
    <Section id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + photo */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About Me"
              title={about.headline}
              accent="violet"
            />
            <Reveal delay={0.15}>
              <div className="relative mt-8 max-w-sm">
                <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-tr from-violet-600/25 to-fuchsia-600/20 blur-2xl" />
                {/* Profile portrait — small duplicate name caption removed (header name is the identity) */}
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  <img
                    src={assetPath(profile.profileImage)}
                    alt={`${profile.name} — professional portrait`}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: narrative */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg font-medium leading-relaxed text-foreground/90">
                {about.intro}
              </p>
            </Reveal>

            <div className="mt-6 space-y-4">
              {about.aboutMe.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.05}>
                  <p className="leading-relaxed text-muted-foreground">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-500/5 p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-200">
                  <Compass className="h-4 w-4" />
                  How I Work
                </div>
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {about.howIWork.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-6 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-fuchsia-200">
                  <Target className="h-4 w-4" />
                  Professional Direction
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {about.professionalDirection}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Differentiators */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              What makes my approach different
            </h3>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.differentiators.map((d, i) => {
              const accent = (["violet", "magenta", "blue"] as const)[i % 3];
              const a = accentMap[accent];
              return (
                <Reveal key={d.title} delay={i * 0.06}>
                  <GlowCard accent={accent} className="h-full">
                    <div
                      className={`mb-3 grid h-10 w-10 place-items-center rounded-lg border ${a.iconWrap}`}
                    >
                      <span className="font-display text-sm font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="font-display text-base font-semibold text-foreground">
                      {d.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {d.body}
                    </p>
                  </GlowCard>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Brand statement */}
        <Reveal delay={0.1}>
          <div className="relative mt-16 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-violet-950/40 via-background to-fuchsia-950/30 p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
            <Quote className="h-8 w-8 text-violet-300/60" />
            <p className="relative mt-4 font-display text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              {about.brandStatement}
            </p>
            <div className="relative mt-6 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-violet-400 to-fuchsia-400" />
              <span className="text-sm font-medium text-muted-foreground">
                {profile.name}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
