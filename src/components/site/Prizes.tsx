import { totalPrizePool } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";

export function Prizes() {
  return (
    <Section id="prizes" className="overflow-hidden">
      <SectionHeading
        eyebrow="Rewards"
        title="Prize Pool"
        subtitle="Build. Solve. Stand out."
        align="center"
      />

      <Reveal>
        <div className="mx-auto max-w-sm">
          <div className="rounded-xl border border-yellow-500/50 bg-zinc-900/80 px-10 py-8 text-center">
            <p className="font-display text-[0.6rem] font-bold tracking-[0.4em] text-yellow-400/90 uppercase sm:text-xs">
              Total Prize Pool
            </p>
            <p className="mt-4 font-display text-5xl font-black tracking-tight text-white sm:text-6xl">
              {totalPrizePool}
            </p>
            <p className="mt-3 font-display text-[0.6rem] font-medium tracking-[0.25em] text-zinc-400 uppercase sm:text-xs">
              Cash Prizes
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
