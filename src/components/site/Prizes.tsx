import { Trophy, Sparkles } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

export function Prizes() {
  return (
    <Section id="prizes" className="relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/15 blur-[120px]"
      />

      <SectionHeading
        eyebrow="Rewards"
        title="Prizepool"
        subtitle="Build. Solve. Stand out."
        align="center"
      />

      <Reveal>
        <div className="mx-auto max-w-xl">
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-zinc-950/80 px-8 py-12 text-center shadow-[0_0_50px_rgba(245,158,11,0.2)] backdrop-blur-xl sm:px-14 sm:py-14">
            {/* Top ambient backlight */}
            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-400/25 to-transparent blur-2xl" />

            {/* Glowing Trophy & Sparkles Icon */}
            <div className="relative mb-5 flex justify-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.35)] sm:h-20 sm:w-20">
                <Trophy className="h-8 w-8 text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] sm:h-10 sm:w-10" />
                <Sparkles className="absolute -top-1.5 -right-1.5 h-5 w-5 text-amber-300 animate-pulse" />
              </div>
            </div>

            {/* Shimmering Animated "EXCITING REWARDS" with glow */}
            <h3 className="relative font-display text-4xl font-black tracking-wider uppercase sm:text-5xl md:text-6xl">
              <span className="text-shimmer inline-block drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]">
                EXCITING REWARDS
              </span>
            </h3>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
