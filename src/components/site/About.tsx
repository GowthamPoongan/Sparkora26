import { event, stats } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";

export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="The Spark" />
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <Reveal>
          <p className="text-xl leading-relaxed text-foreground sm:text-2xl">{event.intro}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {event.about}
          </p>
        </Reveal>
      </div>

      <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-background">
            <div className="group relative h-full bg-card/40 px-5 py-9 text-center transition-colors duration-300 hover:bg-card">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  {s.value}
                </span>
                <span className="mt-3 block font-display text-[0.62rem] tracking-[0.24em] text-muted-foreground uppercase sm:text-[0.7rem]">
                  {s.label}
                </span>
              </dd>
              <span
                aria-hidden="true"
                className="rule-gradient absolute inset-x-0 bottom-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              />
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
