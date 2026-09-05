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
    iconColor: "text-amber-400",
    badgeColor: "border-amber-500/40 text-amber-300 bg-amber-500/10",
  },
  {
    icon: Users,
    label: "Team Size",
    value: "2–3 Members",
    subtext: "Collaborate & Innovate",
    iconColor: "text-orange-400",
    badgeColor: "border-orange-500/40 text-orange-300 bg-orange-500/10",
  },
  {
    icon: Radio,
    label: "Event Mode",
    value: "Offline",
    subtext: "On-Campus Hackathon",
    iconColor: "text-primary",
    badgeColor: "border-blue-500/40 text-blue-300 bg-blue-500/10",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "JCE Chennai",
    subtext: "Jerusalem College of Engg",
    iconColor: "text-rose-400",
    badgeColor: "border-rose-500/40 text-rose-300 bg-rose-500/10",
  },
  {
    icon: CalendarDays,
    label: "Event Date",
    value: event.date,
    subtext: "8:30 AM Onwards",
    iconColor: "text-yellow-300",
    badgeColor: "border-yellow-500/40 text-yellow-300 bg-yellow-500/10",
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
                  <Sparkles className="absolute top-3.5 right-3.5 h-4 w-4 text-amber-400/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-pulse" />

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/90 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/50 group-hover:shadow-[0_0_18px_rgba(245,158,11,0.35)]">
                        <Icon aria-hidden="true" strokeWidth={1.8} className={`h-5 w-5 ${it.iconColor} transition-transform duration-300 group-hover:rotate-6`} />
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 font-display text-[0.58rem] font-bold tracking-[0.18em] uppercase ${it.badgeColor}`}>
                        {it.label}
                      </span>
                    </div>

                    <h4 className="mt-4 font-display text-base font-black tracking-tight text-white transition-colors duration-200 group-hover:text-amber-300 uppercase sm:text-lg">
                      {it.value}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-400 transition-colors group-hover:text-zinc-300">
                      {it.subtext}
                    </p>
                  </div>

                  {/* Bottom accent glow rule */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[0.62rem] font-display font-semibold tracking-wider text-zinc-500 uppercase group-hover:text-amber-400/90 transition-colors">
                    <span>Sparkora'26</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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
