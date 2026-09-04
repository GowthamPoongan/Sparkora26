import { motion } from "motion/react";
import { Activity, BrainCircuit, GraduationCap, LineChart, Lock } from "lucide-react";
import { domains } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

const icons = [Activity, GraduationCap, BrainCircuit, LineChart];
// Asymmetric premium layout
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const heights = ["md:min-h-72", "md:min-h-72", "md:min-h-80", "md:min-h-80"];

export function Domains() {
  return (
    <Section id="domains">
      <SectionHeading
        eyebrow="Tracks"
        title="Domains"
        subtitle="Four arenas. One challenge: build what matters."
      />

      <div className="relative">
      <div
        aria-hidden="true"
        className="grid gap-5 select-none blur-[10px] saturate-50 md:grid-cols-12"
      >
        {domains.map((d, i) => {
          const Icon = icons[i]!;
          return (
            <Reveal key={d.no} delay={i * 0.08} className={cn(spans[i], "group")}>
              <motion.article
                whileHover={{ y: -6, scale: 1.012 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={cn(
                  "relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/40 p-7 sm:p-9",
                  heights[i],
                )}
              >
                {/* moving gradient wash */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_55%),radial-gradient(circle_at_85%_80%,color-mix(in_oklab,var(--ember)_20%,transparent),transparent_55%)] opacity-0 transition-all duration-700 group-hover:translate-x-6 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="rule-gradient absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/0 transition-all duration-500 group-hover:ring-primary/40 group-hover:shadow-[0_0_60px_-20px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
                />

                <div className="relative flex items-start justify-between gap-6">
                  <span className="font-display text-6xl leading-none font-bold text-muted-foreground/35 transition-colors duration-500 group-hover:text-foreground sm:text-7xl">
                    {d.no}
                  </span>
                  <Icon
                    aria-hidden="true"
                    className="h-9 w-9 shrink-0 text-primary transition-all duration-500 group-hover:scale-110 group-hover:text-ember"
                    strokeWidth={1.25}
                  />
                </div>

                <div className="relative mt-10">
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">{d.line}</p>
                  <span
                    aria-hidden="true"
                    className="mt-5 inline-block font-display text-sm tracking-[0.2em] text-ember opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>

        {/* locked overlay */}
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/50 p-6">
          <Reveal className="w-full max-w-md">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/70 px-8 py-10 text-center backdrop-blur-md">
              <span
                aria-hidden="true"
                className="rule-gradient absolute inset-x-0 top-0 h-px opacity-70"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--ember)_16%,transparent),transparent_65%)]"
              />
              <Lock
                aria-hidden="true"
                strokeWidth={1.25}
                className="relative mx-auto h-10 w-10 text-ember"
              />
              <h3 className="relative mt-6 font-display text-2xl font-bold tracking-tight uppercase sm:text-3xl">
                Domains Locked
              </h3>
              <p className="relative mt-3 text-sm text-muted-foreground sm:text-base">
                The four arenas are encrypted for now. Will be releasing soon.
              </p>
              <p className="relative mt-6 font-display text-[0.65rem] tracking-[0.28em] text-primary uppercase">
                Stay tuned
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
