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
    badgeClass: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    iconBoxClass: "border-amber-500/30 bg-amber-500/10 group-hover:border-amber-400/70 group-hover:bg-amber-500/20 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    cardBorderHover: "hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    titleHover: "group-hover:text-amber-300",
    spotlight: "bg-gradient-to-b from-amber-400/15 via-transparent to-transparent",
    sparkleColor: "text-amber-400/60",
    ruleGradient: "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300",
  },
  {
    icon: Users,
    label: "Team Size",
    value: "2–3 Members",
    subtext: "Collaborate & Innovate",
    iconColor: "text-orange-400",
    badgeClass: "border-orange-500/40 bg-orange-500/10 text-orange-300",
    iconBoxClass: "border-orange-500/30 bg-orange-500/10 group-hover:border-orange-400/70 group-hover:bg-orange-500/20 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]",
    cardBorderHover: "hover:border-orange-400/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]",
    titleHover: "group-hover:text-orange-300",
    spotlight: "bg-gradient-to-b from-orange-400/15 via-transparent to-transparent",
    sparkleColor: "text-orange-400/60",
    ruleGradient: "bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300",
  },
  {
    icon: Radio,
    label: "Event Mode",
    value: "Offline",
    subtext: "On-Campus Hackathon",
    iconColor: "text-cyan-400",
    badgeClass: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    iconBoxClass: "border-cyan-500/30 bg-cyan-500/10 group-hover:border-cyan-400/70 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    cardBorderHover: "hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
    titleHover: "group-hover:text-cyan-300",
    spotlight: "bg-gradient-to-b from-cyan-400/15 via-transparent to-transparent",
    sparkleColor: "text-cyan-400/60",
    ruleGradient: "bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-400",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "Jerusalem College of Engineering",
    subtext: "Chennai, Tamil Nadu",
    iconColor: "text-rose-400",
    badgeClass: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    iconBoxClass: "border-rose-500/30 bg-rose-500/10 group-hover:border-rose-400/70 group-hover:bg-rose-500/20 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]",
    cardBorderHover: "hover:border-rose-400/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]",
    titleHover: "group-hover:text-rose-300",
    spotlight: "bg-gradient-to-b from-rose-400/15 via-transparent to-transparent",
    sparkleColor: "text-rose-400/60",
    ruleGradient: "bg-gradient-to-r from-rose-500 via-rose-400 to-pink-400",
  },
  {
    icon: CalendarDays,
    label: "Event Date",
    value: event.date,
    subtext: "8:30 AM Onwards",
    iconColor: "text-purple-400",
    badgeClass: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    iconBoxClass: "border-purple-500/30 bg-purple-500/10 group-hover:border-purple-400/70 group-hover:bg-purple-500/20 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    cardBorderHover: "hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    titleHover: "group-hover:text-purple-300",
    spotlight: "bg-gradient-to-b from-purple-400/15 via-transparent to-transparent",
    sparkleColor: "text-purple-400/60",
    ruleGradient: "bg-gradient-to-r from-purple-500 via-purple-400 to-indigo-400",
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
                  className={`group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-zinc-900/80 sm:p-6 ${it.cardBorderHover}`}
                >
                  {/* Radial spotlight hover glow */}
                  <div className={`pointer-events-none absolute -inset-px rounded-2xl ${it.spotlight} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                  {/* Corner sparkle */}
                  <Sparkles className={`absolute top-3.5 right-3.5 h-4 w-4 ${it.sparkleColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-pulse`} />

                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-inner transition-all duration-300 group-hover:scale-110 ${it.iconBoxClass}`}>
                        <Icon aria-hidden="true" strokeWidth={1.8} className={`h-5 w-5 ${it.iconColor} transition-transform duration-300 group-hover:rotate-6`} />
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 font-display text-[0.58rem] font-bold tracking-[0.18em] uppercase ${it.badgeClass}`}>
                        {it.label}
                      </span>
                    </div>

                    <h4 className={`mt-4 font-display text-sm sm:text-base lg:text-[1.05rem] font-black tracking-tight text-white transition-colors duration-200 uppercase leading-snug ${it.titleHover}`}>
                      {it.value}
                    </h4>
                    <p className="mt-1.5 text-xs text-zinc-400 transition-colors group-hover:text-zinc-300">
                      {it.subtext}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-0.5 scale-x-0 transition-transform duration-400 group-hover:scale-x-100 rounded-b-2xl ${it.ruleGradient}`}
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
