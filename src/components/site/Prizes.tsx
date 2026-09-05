import { Trophy, Sparkles, Award, Gift, Medal, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Reveal, Section, SectionHeading } from "./primitives";

const rewardItems = [
  {
    icon: Trophy,
    title: "Championship Trophies",
    tag: "HONOR",
    description: "Prestigious custom trophies awarded to domain champions and top innovators.",
    glowColor: "rgba(245, 158, 11, 0.35)",
    badgeColor: "border-amber-500/40 text-amber-300 bg-amber-500/10",
  },
  {
    icon: Gift,
    title: "Cash Prizes",
    tag: "AWARDS",
    description: "Rewarding outstanding technical complexity, business viability, and problem-solving.",
    glowColor: "rgba(249, 115, 22, 0.35)",
    badgeColor: "border-orange-500/40 text-orange-300 bg-orange-500/10",
  },
  {
    icon: Award,
    title: "Merit & Participation",
    tag: "CERTIFICATION",
    description: "Accredited certificates of excellence for winners, plus verified participation certificates for all presenters.",
    glowColor: "rgba(59, 130, 246, 0.35)",
    badgeColor: "border-blue-500/40 text-blue-300 bg-blue-500/10",
  },
  {
    icon: Medal,
    title: "Exclusive Goodies & Swag",
    tag: "PERKS",
    description: "Hackathon merchandise, networking access, and domain mentorship opportunities.",
    glowColor: "rgba(168, 85, 247, 0.35)",
    badgeColor: "border-purple-500/40 text-purple-300 bg-purple-500/10",
  },
];

export function Prizes() {
  return (
    <Section id="prizes" className="relative overflow-hidden">
      {/* Background ambient decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[100px]"
      />

      <SectionHeading
        eyebrow="Recognition & Honors"
        title="Exciting Rewards"
        subtitle="Build boldly. Win big with prestigious recognition and perks."
        align="center"
      />

      {/* Main Centerpiece Glowing Banner */}
      <Reveal>
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-zinc-950/80 p-8 text-center shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-xl sm:p-12">
            {/* Top glowing ambient sweep */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-400/25 to-transparent blur-2xl" />

            {/* Sub-badge */}
            <div className="relative mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 font-display text-[0.65rem] font-bold tracking-[0.25em] text-amber-300 uppercase sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-300" />
              <span>For Top Innovators & Champions</span>
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-300" />
            </div>

            {/* Glowing Trophy Icon with float */}
            <div className="relative mb-4 flex justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.3)] sm:h-24 sm:w-24">
                <Trophy className="h-10 w-10 text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] sm:h-12 sm:w-12" />
                <Zap className="absolute -top-1 -right-1 h-5 w-5 text-amber-400 animate-bounce" />
              </div>
            </div>

            {/* Shimmering Animated "EXCITING REWARDS" headline */}
            <h3 className="relative font-display text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-shimmer inline-block drop-shadow-[0_0_30px_rgba(245,158,11,0.45)]">
                EXCITING REWARDS
              </span>
            </h3>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-zinc-300 sm:text-base">
              Outstanding ideas deserve exceptional celebration. Step into the arena, solve impactful domain problems, and claim championship honors.
            </p>

            {/* Feature Pills */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {["Cash Prizes", "Championship Trophies", "Merit Certificates", "Goodies & Swag"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-700/80 bg-zinc-900/90 px-3.5 py-1.5 font-display text-[0.65rem] font-semibold tracking-[0.15em] text-zinc-200 uppercase sm:text-xs"
                >
                  ✦ {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Reward Category Details Grid */}
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rewardItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={0.1 + idx * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-500/40 hover:bg-zinc-900/90"
              >
                {/* Top header */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-700/60 bg-zinc-800/80 transition-colors duration-300 group-hover:border-amber-400/50 group-hover:bg-amber-400/10">
                      <Icon className="h-5 w-5 text-amber-300" />
                    </div>
                    <span className={`rounded-full border px-2.5 py-0.5 font-display text-[0.6rem] font-bold tracking-[0.18em] uppercase ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="mt-4 font-display text-base font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors duration-200 sm:text-lg">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>

                {/* Bottom decorative accent */}
                <div className="mt-5 flex items-center gap-2 pt-4 border-t border-zinc-800/80 font-display text-[0.65rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase group-hover:text-amber-400 transition-colors">
                  <span>Sparkora'26</span>
                  <span className="text-amber-500/60">→</span>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
