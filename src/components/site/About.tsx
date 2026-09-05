import { CalendarDays, MapPin, Radio, Users } from "lucide-react";
import { event } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";

const eventDetails = [
  {
    icon: Users,
    label: "Team Size",
    value: "2–3 Members",
    subtext: "Collaborate & Innovate",
    iconColor: "text-amber-400",
  },
  {
    icon: Radio,
    label: "Event Mode",
    value: "Offline",
    subtext: "On-Campus Hackathon",
    iconColor: "text-primary",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "JCE Chennai",
    subtext: "Jerusalem College of Engg",
    iconColor: "text-ember",
  },
  {
    icon: CalendarDays,
    label: "Event Date",
    value: event.date,
    subtext: "8:30 AM Onwards",
    iconColor: "text-amber-300",
  },
];

export function About() {
  return (
    <Section id="about">
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

      {/* ═══ Attractive Event Details Table below The Spark ═══ */}
      <div className="mt-12 sm:mt-16">
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-zinc-950/60 shadow-[0_0_35px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="grid grid-cols-1 divide-y divide-border/30 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            {eventDetails.map((it, i) => {
              const Icon = it.icon;
              return (
                <Reveal key={it.label} delay={i * 0.08}>
                  <div className="group relative flex h-full flex-col justify-between p-6 transition-all duration-300 hover:bg-zinc-900/50 sm:p-7">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-inner transition-colors duration-300 group-hover:border-amber-400/40 group-hover:bg-amber-400/10">
                          <Icon aria-hidden="true" strokeWidth={1.75} className={`h-5 w-5 ${it.iconColor}`} />
                        </div>
                        <span className="label-eyebrow !text-[0.6rem] sm:!text-[0.65rem] tracking-[0.22em] text-muted-foreground/80 uppercase">
                          {it.label}
                        </span>
                      </div>

                      <p className="mt-4 font-display text-base sm:text-lg md:text-xl font-black tracking-tight text-white transition-colors duration-200 group-hover:text-amber-300 uppercase">
                        {it.value}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {it.subtext}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="rule-gradient absolute inset-x-0 bottom-0 h-0.5 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
