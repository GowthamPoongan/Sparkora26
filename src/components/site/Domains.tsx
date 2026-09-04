import { motion } from "motion/react";
import { domains } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

// Asymmetric premium layout
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const heights = ["md:min-h-72", "md:min-h-72", "md:min-h-80", "md:min-h-80"];

// Domain-specific illustrations and accent colors
const domainConfig = [
  {
    emoji: "❤️",
    emojiLabel: "Red heart representing healthcare",
    accent: "from-rose-500/25 via-transparent to-ember/15",
    ring: "ring-rose-500/40 shadow-[0_0_60px_-10px_rgba(244,63,94,0.5)]",
    topBar: "from-rose-500 via-ember to-rose-300",
    numColor: "group-hover:text-rose-400",
    tag: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    glowBg: "bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.2),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(249,115,22,0.15),transparent_55%)]",
  },
  {
    emoji: "📚",
    emojiLabel: "Books representing education",
    accent: "from-sky-500/25 via-transparent to-primary/15",
    ring: "ring-sky-400/40 shadow-[0_0_60px_-10px_rgba(56,189,248,0.5)]",
    topBar: "from-sky-400 via-primary to-blue-400",
    numColor: "group-hover:text-sky-400",
    tag: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    glowBg: "bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,0.15),transparent_55%)]",
  },
  {
    emoji: "🤖",
    emojiLabel: "Robot representing AI",
    accent: "from-violet-500/25 via-transparent to-primary/15",
    ring: "ring-violet-400/40 shadow-[0_0_60px_-10px_rgba(167,139,250,0.5)]",
    topBar: "from-violet-400 via-primary to-indigo-400",
    numColor: "group-hover:text-violet-400",
    tag: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    glowBg: "bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.2),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,0.15),transparent_55%)]",
  },
  {
    emoji: "💰",
    emojiLabel: "Money bag representing fintech",
    accent: "from-amber-500/25 via-transparent to-ember/15",
    ring: "ring-amber-400/40 shadow-[0_0_60px_-10px_rgba(251,191,36,0.5)]",
    topBar: "from-amber-400 via-ember to-yellow-400",
    numColor: "group-hover:text-amber-400",
    tag: "bg-amber-500/10 text-amber-400 border-amber-500/30",
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
                  "relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/60 p-7 sm:p-9",
                  heights[i],
                )}
              >
                {/* Always-on gradient wash */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -inset-24 opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-4",
                    cfg.glowBg,
                  )}
                />

                {/* Top accent bar — always visible */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-70 transition-opacity duration-500 group-hover:opacity-100",
                    cfg.topBar,
                  )}
                />

                {/* Always-on ring glow */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-2xl ring-1 transition-all duration-500",
                    cfg.ring,
                  )}
                />

                {/* Header: number + emoji illustration */}
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "font-display text-6xl leading-none font-bold text-muted-foreground/40 transition-colors duration-500 sm:text-7xl",
                      cfg.numColor,
                    )}
                  >
                    {d.no}
                  </span>

                  {/* Domain illustration emoji */}
                  <div className="flex flex-col items-center gap-2">
                    <span
                      aria-label={cfg.emojiLabel}
                      className="text-5xl sm:text-6xl leading-none drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    >
                      {cfg.emoji}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative mt-8">
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">{d.line}</p>
                  <span
                    aria-hidden="true"
                    className="mt-5 inline-block font-display text-sm tracking-[0.2em] text-ember transition-all duration-500 group-hover:translate-x-1"
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
