import { CalendarDays, MapPin, Radio, Users, Zap, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { event } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";

const eventDetails = [
  {
    icon: Zap,
    label: "Format",
    value: "1 Day Hackathon",
    subtext: "Intense Build & Pitch",
  },
  {
    icon: Users,
    label: "Team Size",
    value: "2–3 Members",
    subtext: "Collaborate & Innovate",
  },
  {
    icon: Radio,
    label: "Event Mode",
    value: "Offline",
    subtext: "On-Campus Hackathon",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "Jerusalem College of Engineering",
    subtext: "Chennai, Tamil Nadu",
  },
  {
    icon: CalendarDays,
    label: "Event Date",
    value: event.date,
    subtext: "8:30 AM Onwards",
  },
];

export function About() {
  return (
    <Section id="about" className="relative overflow-hidden">
      <SectionHeading eyebrow="About" title="The Spark" />

      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <Reveal>
          <p className="text-lg leading-relaxed text-foreground sm:text-2xl">{event.intro}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-lg">
            {event.about}
          </p>
        </Reveal>
      </div>

      {/* ═══ Attractive & Interactive 5-Card Event Table below The Spark ═══ */}
      <div className="mt-12 sm:mt-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {eventDetails.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.label} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -7, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-amber-400/50 hover:bg-zinc-900/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] sm:p-6"
                >
                  {/* Radial spotlight hover glow */}
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-amber-400/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Corner sparkle */}
                  <Sparkles className="absolute top-3.5 right-3.5 h-4 w-4 text-amber-400/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-pulse" />

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/60 group-hover:bg-amber-500/15 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]">
                        <Icon aria-hidden="true" strokeWidth={1.8} className="h-5 w-5 text-amber-400 transition-transform duration-300 group-hover:rotate-6" />
                      </div>
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-display text-[0.58rem] font-bold tracking-[0.18em] uppercase text-amber-300">
                        {it.label}
                      </span>
                    </div>

                    <h4 className="mt-4 font-display text-sm sm:text-base lg:text-[1.05rem] font-black tracking-tight text-white transition-colors duration-200 group-hover:text-amber-300 uppercase leading-snug">
                      {it.value}
                    </h4>
                    <p className="mt-1.5 text-xs text-zinc-400 transition-colors group-hover:text-zinc-300">
                      {it.subtext}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="rule-gradient absolute inset-x-0 bottom-0 h-0.5 scale-x-0 transition-transform duration-400 group-hover:scale-x-100 rounded-b-2xl"
                  />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
