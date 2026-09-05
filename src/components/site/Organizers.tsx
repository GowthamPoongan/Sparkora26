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
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {associations.map((a, i) => (
              <Reveal key={a.name} delay={0.12 + i * 0.07}>
                <div
                  className="group flex h-40 flex-col items-center rounded-xl border bg-card/30 px-3 py-2 text-center transition-all duration-500 sm:h-48 sm:px-5"
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
                        className="max-h-16 w-auto object-contain sm:max-h-24"
                      />
                    ) : (
                      <span className="font-display text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
                        Logo
                      </span>
                    )}
                  </div>
                  <span className="mb-2 flex h-8 items-center justify-center font-display text-[0.62rem] leading-snug tracking-[0.1em] uppercase sm:mb-3 sm:h-10 sm:text-[0.68rem] sm:tracking-[0.14em]">
                    {a.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        );
      })()}

      {/* Event Co-ordinators */}
      <Reveal delay={0.2} className="mt-14 sm:mt-20 text-center">
        <h3 className="font-display text-xl font-bold tracking-[0.12em] text-foreground uppercase sm:text-3xl sm:tracking-[0.15em]">
          Event Co-ordinators
        </h3>
      </Reveal>

      {/* Student Co-ordinators */}
      <Reveal delay={0.25} className="mt-6 sm:mt-8">
        <div className="w-full rounded-2xl border border-border/40 bg-card/20 p-5 sm:p-10">
          <p className="mb-6 font-display text-center text-xs font-bold tracking-[0.2em] text-primary uppercase sm:mb-8 sm:text-sm sm:tracking-[0.22em]">
            STUDENT CO-ORDINATORS
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50">
            {studentCoordinators.map((c) => (
              <div key={c.name} className="flex flex-col items-center px-4 py-2 text-center">
                <p className="font-display text-base font-bold tracking-wider text-foreground uppercase sm:text-lg">
                  {c.name}
                </p>
                <p className="mt-1 font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase sm:text-sm sm:mt-1.5">
                  {c.yearDept}
                </p>
                <a
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-display text-xs sm:text-sm font-semibold tracking-wider text-primary transition-colors hover:bg-primary/20"
                >
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary" />
                  {c.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Presidents */}
      <Reveal delay={0.28} className="mt-5 sm:mt-8">
        <div className="w-full rounded-2xl border border-border/40 bg-card/20 p-5 sm:p-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50">
            {presidents.map((p) => (
              <div key={p.title} className="flex flex-col items-center px-4 py-2 text-center">
                <p className="font-display text-xs font-bold tracking-[0.2em] text-primary uppercase sm:text-sm sm:tracking-[0.22em]">
                  {p.title}
                </p>
                <p className="mt-3 font-display text-base font-bold tracking-wider text-foreground uppercase sm:mt-5 sm:text-lg">
                  {p.name}
                </p>
                <p className="mt-1 font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase sm:text-sm sm:mt-1.5">
                  {p.yearDept}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Faculty Co-ordinators */}
      <Reveal delay={0.3} className="mt-5 sm:mt-8">
        <div className="w-full rounded-2xl border border-border/40 bg-card/20 p-5 sm:p-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border/50">
            {/* Faculty Co-ordinators Group (3 cols) */}
            <div className="flex flex-col items-center sm:col-span-3 sm:pr-6">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-primary uppercase sm:text-sm sm:tracking-[0.22em]">
                FACULTY CO-ORDINATORS
              </p>
              <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50">
                {facultyCoordinators.slice(0, 3).map((f) => (
                  <div key={f.name} className="flex flex-col items-center px-3 py-2 text-center">
                    <p className="font-display text-sm font-bold tracking-wider text-foreground uppercase sm:text-base">
                      {f.name}
                    </p>
                    <p className="mt-1 font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase sm:text-sm sm:mt-1.5">
                      {f.designation}
                    </p>
                    <a
                      href={`tel:${f.phone.replace(/\s/g, "")}`}
                      className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-display text-xs sm:text-sm font-semibold tracking-wider text-primary transition-colors hover:bg-primary/20"
                    >
                      <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary" />
                      {f.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* IE(I) Co-ordinator Group (1 col) */}
            <div className="flex flex-col items-center border-t border-border/40 pt-6 sm:col-span-1 sm:border-t-0 sm:pt-0 sm:pl-6">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-primary uppercase sm:text-sm sm:tracking-[0.22em]">
                IE(I) CO-ORDINATOR
              </p>
              <div className="mt-6 flex flex-col items-center px-3 py-2 text-center sm:mt-8">
                <p className="font-display text-sm font-bold tracking-wider text-foreground uppercase sm:text-base">
                  {facultyCoordinators[3].name}
                </p>
                <p className="mt-1 font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase sm:text-sm sm:mt-1.5">
                  {facultyCoordinators[3].designation}
                </p>
                <a
                  href={`tel:${facultyCoordinators[3].phone.replace(/\s/g, "")}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-display text-xs sm:text-sm font-semibold tracking-wider text-primary transition-colors hover:bg-primary/20"
                >
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary" />
                  {facultyCoordinators[3].phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Leadership / Academic Patrons */}
      <Reveal delay={0.32} className="mt-5 sm:mt-8">
        <div className="w-full rounded-2xl border border-border/40 bg-card/20 p-5 sm:p-10">
          <p className="mb-6 sm:mb-8 font-display text-center text-xs font-bold tracking-[0.22em] text-primary uppercase sm:text-sm">
            ACADEMIC PATRONS
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50">
            {leadership.map((item) => (
              <div key={item.title} className="flex flex-col items-center px-4 py-2 text-center">
                <p className="font-display text-base font-bold tracking-wider text-foreground uppercase sm:text-lg">
                  {item.name}
                </p>
                <p className="mt-1 font-display text-xs font-bold tracking-[0.16em] text-primary uppercase sm:text-sm sm:mt-1.5 sm:tracking-[0.2em]">
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
