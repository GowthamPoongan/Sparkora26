import { Phone, User } from "lucide-react";
import {
  associations,
  event,
  studentCoordinators,
  presidents,
  facultyCoordinators,
  leadership,
} from "@/data/event";
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

      {/* Event Co-ordinators */}
      <Reveal delay={0.2} className="mt-20 text-center">
        <h3 className="font-display text-2xl font-bold tracking-[0.15em] text-foreground uppercase sm:text-3xl">
          Event Co-ordinators
        </h3>
      </Reveal>

      {/* Student Co-ordinators */}
      <Reveal delay={0.25} className="mt-8">
        <div className="w-full rounded-2xl border border-border/40 bg-card/20 p-8 sm:p-10">
          <p className="mb-8 font-display text-center text-xs font-bold tracking-[0.22em] text-primary uppercase sm:text-sm">
            STUDENT CO-ORDINATORS
          </p>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50">
            {studentCoordinators.map((c) => (
              <div key={c.name} className="flex flex-col items-center px-6 py-2 text-center">
                <p className="font-display text-base font-bold tracking-wider text-foreground uppercase sm:text-lg">
                  {c.name}
                </p>
                <p className="mt-1.5 font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase sm:text-sm">
                  {c.yearDept}
                </p>
                <a
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                  className="mt-3.5 flex items-center gap-2 font-display text-sm sm:text-base font-semibold tracking-wider text-foreground/90 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {c.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Presidents */}
      <Reveal delay={0.28} className="mt-6 sm:mt-8">
        <div className="w-full rounded-2xl border border-border/40 bg-card/20 p-8 sm:p-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50">
            {presidents.map((p) => (
              <div key={p.title} className="flex flex-col items-center px-6 py-2 text-center">
                <p className="font-display text-xs font-bold tracking-[0.22em] text-primary uppercase sm:text-sm">
                  {p.title}
                </p>
                <p className="mt-5 font-display text-base font-bold tracking-wider text-foreground uppercase sm:text-lg">
                  {p.name}
                </p>
                <p className="mt-1.5 font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase sm:text-sm">
                  {p.yearDept}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Faculty Co-ordinators */}
      <Reveal delay={0.3} className="mt-6 sm:mt-8">
        <div className="w-full rounded-2xl border border-border/40 bg-card/20 p-8 sm:p-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border/50">
            {/* Faculty Co-ordinators Group (3 cols) */}
            <div className="flex flex-col items-center sm:col-span-3 sm:pr-6">
              <p className="font-display text-xs font-bold tracking-[0.22em] text-primary uppercase sm:text-sm">
                FACULTY CO-ORDINATORS
              </p>
              <div className="mt-8 grid w-full grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50">
                {facultyCoordinators.slice(0, 3).map((f) => (
                  <div key={f.name} className="flex flex-col items-center px-4 py-2 text-center">
                    <p className="font-display text-sm font-bold tracking-wider text-foreground uppercase sm:text-base">
                      {f.name}
                    </p>
                    <p className="mt-1.5 font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase sm:text-sm">
                      {f.designation}
                    </p>
                    <a
                      href={`tel:${f.phone.replace(/\s/g, "")}`}
                      className="mt-3.5 flex items-center gap-2 font-display text-sm sm:text-base font-semibold tracking-wider text-foreground/90 transition-colors hover:text-primary"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-primary" />
                      {f.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* IE(I) Co-ordinator Group (1 col) */}
            <div className="flex flex-col items-center sm:col-span-1 sm:pl-6">
              <p className="font-display text-xs font-bold tracking-[0.22em] text-primary uppercase sm:text-sm">
                IE(I) CO-ORDINATOR
              </p>
              <div className="mt-8 flex flex-col items-center px-4 py-2 text-center">
                <p className="font-display text-sm font-bold tracking-wider text-foreground uppercase sm:text-base">
                  {facultyCoordinators[3].name}
                </p>
                <p className="mt-1.5 font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase sm:text-sm">
                  {facultyCoordinators[3].designation}
                </p>
                <a
                  href={`tel:${facultyCoordinators[3].phone.replace(/\s/g, "")}`}
                  className="mt-3.5 flex items-center gap-2 font-display text-sm sm:text-base font-semibold tracking-wider text-foreground/90 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {facultyCoordinators[3].phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Leadership / Dignitaries */}
      <Reveal delay={0.32} className="mt-6 sm:mt-8">
        <div className="w-full rounded-2xl border border-border/40 bg-card/20 p-8 sm:p-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50">
            {leadership.map((item) => (
              <div key={item.title} className="flex flex-col items-center px-6 py-2 text-center">
                <p className="font-display text-base font-bold tracking-wider text-foreground uppercase sm:text-lg">
                  {item.name}
                </p>
                <p className="mt-1.5 font-display text-xs font-bold tracking-[0.2em] text-primary uppercase sm:text-sm">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
