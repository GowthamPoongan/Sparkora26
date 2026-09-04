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

      {(() => {
        const glowColors = [
          "rgba(59, 130, 246, 0.45)",   // blue
          "rgba(234, 179, 8, 0.45)",    // golden
          "rgba(239, 68, 68, 0.45)",    // red
          "rgba(255, 255, 255, 0.35)",  // white
        ];
        return (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {associations.map((a, i) => (
              <Reveal key={a.name} delay={0.12 + i * 0.07}>
                <div
                  className="group flex h-48 flex-col items-center rounded-xl border bg-card/30 px-5 text-center transition-all duration-500"
                  style={{
                    boxShadow: `0 0 20px ${glowColors[i]}, 0 0 40px ${glowColors[i]}`,
                    borderColor: glowColors[i],
                  }}
                >
                  <div className="flex flex-1 items-center justify-center">
                    {a.src ? (
                      <img
                        src={a.src}
                        alt={a.name}
                        loading="lazy"
                        className="max-h-24 w-auto object-contain"
                      />
                    ) : (
                      <span className="font-display text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
                        Logo
                      </span>
                    )}
                  </div>
                  <span className="mb-3 flex h-10 items-center justify-center font-display text-[0.68rem] leading-snug tracking-[0.14em] uppercase">
                    {a.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        );
      })()}
    </Section>
  );
}
