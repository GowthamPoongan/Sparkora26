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
    <Section className="bg-navy/20">
      <Reveal>
        <h2 className="text-3xl font-bold sm:text-5xl md:text-6xl">
          Build <span className="gradient-text">together.</span>
        </h2>
      </Reveal>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/30 bg-card/10 backdrop-blur-sm sm:mt-12">
        <div className="grid grid-cols-2 divide-x divide-y divide-border/30 lg:divide-y-0 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.07}>
              <div className="flex h-full flex-col items-start gap-3 p-5 sm:flex-row sm:gap-4 sm:px-6 sm:py-8">
                <it.icon aria-hidden="true" strokeWidth={1.3} className="h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6" />
                <div className="min-w-0">
                  <p className="label-eyebrow !text-[0.55rem] sm:!text-[0.7rem]">{it.label}</p>
                  <p className="mt-1 font-display text-xs font-semibold tracking-[0.08em] uppercase sm:mt-2 sm:text-base">
                    {it.value}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
