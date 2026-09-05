import { CalendarDays, MapPin, Radio, Users } from "lucide-react";
import { event } from "@/data/event";
import { Reveal, Section } from "./primitives";

export function TeamInfo() {
  const items = [
    { icon: Users, label: "Team size", value: "2–3 MEMBERS" },
    { icon: Radio, label: "Mode", value: "OFFLINE" },
    { icon: MapPin, label: "Venue", value: event.venue.toUpperCase() },
    { icon: CalendarDays, label: "Date", value: event.date },
  ];

  return (
    <Section className="border-y border-border bg-navy/30">
      <Reveal>
        <h2 className="text-3xl font-bold sm:text-5xl md:text-6xl">
          Build <span className="gradient-text">together.</span>
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-px bg-border sm:mt-12 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.07} className="bg-background">
            <div className="flex h-full flex-col sm:flex-row items-start gap-3 sm:gap-4 bg-card/25 p-4 sm:px-6 sm:py-8">
              <it.icon aria-hidden="true" strokeWidth={1.3} className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="label-eyebrow !text-[0.55rem] sm:!text-[0.7rem]">{it.label}</p>
                <p className="mt-1 sm:mt-2 font-display text-xs sm:text-base font-semibold tracking-[0.08em] uppercase">
                  {it.value}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
