import { associations, event } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";

export function Organizers() {
  return (
    <Section id="organizers">
      <SectionHeading eyebrow="Organizers" title="Powered by community" align="center" />

      <Reveal className="text-center">
        <p className="label-eyebrow">Organized by</p>
        <p className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {event.department}
        </p>
        <p className="mt-2 text-base text-muted-foreground sm:text-lg">{event.college}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 text-center">
        <p className="label-eyebrow">In association with</p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {associations.map((a, i) => (
          <Reveal key={a.name} delay={0.12 + i * 0.07}>
            <div className="group flex h-36 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card/30 px-5 text-center transition-colors duration-500 hover:border-primary/50">
              {a.src ? (
                <img
                  src={a.src}
                  alt={a.name}
                  loading="lazy"
                  className="max-h-16 w-auto object-contain opacity-85 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              ) : (
                <span className="font-display text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
                  Logo
                </span>
              )}
              <span className="font-display text-[0.68rem] leading-snug tracking-[0.14em] uppercase">
                {a.name}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
