import { motion } from "motion/react";
import { ScrollText, UtensilsCrossed } from "lucide-react";
import { perks, prizes } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";

const perkIcons = [ScrollText, UtensilsCrossed];

const crownColors = [
  { fill: "#FFD700", stroke: "#B8960F", glow: "rgba(255, 215, 0, 0.25)", label: "gold" },
  { fill: "#C0C0C0", stroke: "#8A8A8A", glow: "rgba(192, 192, 192, 0.25)", label: "silver" },
  { fill: "#B87333", stroke: "#8B5A2B", glow: "rgba(184, 115, 51, 0.25)", label: "copper" },
];

function CrownIcon({ fill, stroke, className }: { fill: string; stroke: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <filter id={`crown-shadow-${fill}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={fill} floodOpacity="0.4" />
        </filter>
        <linearGradient id={`crown-grad-${fill}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="1" />
          <stop offset="100%" stopColor={stroke} stopOpacity="1" />
        </linearGradient>
      </defs>
      <g filter={`url(#crown-shadow-${fill})`}>
        {/* Crown base band */}
        <rect x="14" y="44" width="36" height="6" rx="2" fill={`url(#crown-grad-${fill})`} stroke={stroke} strokeWidth="1.5" />
        {/* Crown body */}
        <path
          d="M14 44 L8 22 L20 32 L32 14 L44 32 L56 22 L50 44 Z"
          fill={`url(#crown-grad-${fill})`}
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Crown jewels */}
        <circle cx="32" cy="18" r="3" fill="white" fillOpacity="0.9" />
        <circle cx="20" cy="30" r="2.5" fill="white" fillOpacity="0.7" />
        <circle cx="44" cy="30" r="2.5" fill="white" fillOpacity="0.7" />
        {/* Crown band gems */}
        <circle cx="24" cy="47" r="1.5" fill="white" fillOpacity="0.6" />
        <circle cx="32" cy="47" r="1.5" fill="white" fillOpacity="0.6" />
        <circle cx="40" cy="47" r="1.5" fill="white" fillOpacity="0.6" />
      </g>
    </svg>
  );
}

export function Prizes() {
  return (
    <Section id="prizes" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-ember/10 blur-[140px]"
      />
      <SectionHeading
        eyebrow="Rewards"
        title="Prizes"
        subtitle="Build. Solve. Stand out."
        align="center"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {prizes.map((p, i) => {
          const crown = crownColors[i]!;
          return (
            <Reveal key={p.no} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -8, rotateX: 4, rotateY: i === 0 ? 0 : i === 1 ? -3 : 3 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                style={{ transformPerspective: 900 }}
                className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card to-background p-9 text-center shadow-[0_24px_60px_-40px_black]"
              >
                <span
                  aria-hidden="true"
                  className="rule-gradient absolute inset-x-0 top-0 h-px opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl transition-all duration-700"
                  style={{ backgroundColor: crown.glow }}
                />
                <CrownIcon
                  fill={crown.fill}
                  stroke={crown.stroke}
                  className="relative h-16 w-16 transition-transform duration-500 group-hover:scale-110"
                />
                <p className="relative mt-6 font-display text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
                  {p.no} — {p.title}
                </p>
                <p className="relative mt-4 font-display text-5xl font-bold tracking-tight">
                  {p.amount}
                </p>
              </motion.article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {perks.map((perk, i) => {
          const Icon = perkIcons[i]!;
          return (
            <Reveal key={perk} delay={0.1 + i * 0.08}>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-card/30 px-7 py-6">
                <Icon aria-hidden="true" strokeWidth={1.3} className="h-7 w-7 shrink-0 text-ember" />
                <span className="font-display text-sm tracking-[0.22em] uppercase">{perk}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
