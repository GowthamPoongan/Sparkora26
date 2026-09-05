import { motion } from "motion/react";
import { domains } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

import imgHealthcare from "@/assets/domain-healthcare.jpg";
import imgEdtech from "@/assets/domain-edtech.jpg";
import imgAI from "@/assets/domain-ai.jpg";
import imgFintech from "@/assets/domain-fintech.jpg";

// Asymmetric premium layout
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const heights = [
  "min-h-[260px] sm:min-h-[300px] md:min-h-80",
  "min-h-[260px] sm:min-h-[300px] md:min-h-80",
  "min-h-[280px] sm:min-h-[320px] md:min-h-88",
  "min-h-[280px] sm:min-h-[320px] md:min-h-88",
];

// Domain-specific images and accent colors
const domainConfig = [
  {
    image: imgHealthcare,
    imageAlt: "Healthcare technology with holographic medical interface",
    accent: "from-rose-500/25 via-transparent to-ember/15",
    ring: "ring-rose-500/40 shadow-[0_0_60px_-10px_rgba(244,63,94,0.5)]",
    topBar: "from-rose-500 via-ember to-rose-300",
    numColor: "group-hover:text-rose-400",
    tag: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    fadeColor: "from-rose-900/60 via-card/90 to-card/95",
    glowBg: "bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.2),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(249,115,22,0.15),transparent_55%)]",
  },
  {
    image: imgEdtech,
    imageAlt: "EdTech digital learning interface with holographic elements",
    accent: "from-sky-500/25 via-transparent to-primary/15",
    ring: "ring-sky-400/40 shadow-[0_0_60px_-10px_rgba(56,189,248,0.5)]",
    topBar: "from-sky-400 via-primary to-blue-400",
    numColor: "group-hover:text-sky-400",
    tag: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    fadeColor: "from-sky-900/60 via-card/90 to-card/95",
    glowBg: "bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,0.15),transparent_55%)]",
  },
  {
    image: imgAI,
    imageAlt: "AI for business with neural network and data analytics",
    accent: "from-violet-500/25 via-transparent to-primary/15",
    ring: "ring-violet-400/40 shadow-[0_0_60px_-10px_rgba(167,139,250,0.5)]",
    topBar: "from-violet-400 via-primary to-indigo-400",
    numColor: "group-hover:text-violet-400",
    tag: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    fadeColor: "from-violet-900/60 via-card/90 to-card/95",
    glowBg: "bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.2),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,0.15),transparent_55%)]",
  },
  {
    image: imgFintech,
    imageAlt: "Fintech with holographic stock charts and blockchain",
    accent: "from-amber-500/25 via-transparent to-ember/15",
    ring: "ring-amber-400/40 shadow-[0_0_60px_-10px_rgba(251,191,36,0.5)]",
    topBar: "from-amber-400 via-ember to-yellow-400",
    numColor: "group-hover:text-amber-400",
    tag: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    fadeColor: "from-amber-900/60 via-card/90 to-card/95",
    glowBg: "bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.2),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(249,115,22,0.15),transparent_55%)]",
  },
];

export function Domains() {
  return (
    <Section id="domains">
      <SectionHeading
        eyebrow="Tracks"
        title="Domains"
        subtitle="Four arenas. One challenge: build what matters."
      />

      <div className="grid gap-5 md:grid-cols-12">
        {domains.map((d, i) => {
          const cfg = domainConfig[i]!;
          return (
            <Reveal key={d.no} delay={i * 0.08} className={cn(spans[i], "group")}>
              <motion.article
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={cn(
                  "relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card/60",
                  heights[i],
                )}
              >
                {/* ── Domain background image with fade ── */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                  <img
                    src={cfg.image}
                    alt={cfg.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover opacity-55 transition-all duration-700 group-hover:opacity-75 group-hover:scale-110"
                  />
                  {/* Gradient fade overlay — subtle top-to-bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80" />
                  {/* Side fade — very light */}
                  <div className="absolute inset-0 bg-gradient-to-r from-card/30 via-transparent to-card/30" />
                  {/* Bottom fade for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card via-card/70 to-transparent" />
                </div>

                {/* Always-on gradient wash */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -inset-24 z-[1] opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-4",
                    cfg.glowBg,
                  )}
                />

                {/* Top accent bar — always visible */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-0 z-[2] h-[2px] bg-gradient-to-r opacity-70 transition-opacity duration-500 group-hover:opacity-100",
                    cfg.topBar,
                  )}
                />

                {/* Always-on ring glow */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 z-[2] rounded-2xl ring-1 transition-all duration-500",
                    cfg.ring,
                  )}
                />

                {/* Header: number — floats at top */}
                <div className="absolute top-4 left-5 z-[3] sm:top-7 sm:left-9">
                  <span
                    className={cn(
                      "font-display text-5xl leading-none font-bold text-foreground/15 transition-colors duration-500 sm:text-7xl",
                      cfg.numColor,
                    )}
                  >
                    {d.no}
                  </span>
                </div>

                {/* Content — sits at bottom over the faded image */}
                <div className="relative z-[3] p-5 pt-14 sm:p-9 sm:pt-20">
                  <h3 className="text-xl font-bold tracking-tight sm:text-3xl drop-shadow-lg">
                    {d.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-base drop-shadow-md">
                    {d.line}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-3.5 inline-block font-display text-sm tracking-[0.2em] text-ember transition-all duration-500 group-hover:translate-x-1 sm:mt-5"
                  >
                    →
                  </span>
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
