import { event } from "@/data/event";
import { RegisterButton, Reveal, Section } from "./primitives";

export function RegistrationCTA() {
  return (
    <Section className="noise-overlay overflow-hidden border-y border-border text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="tech-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/4 h-72 w-72 -translate-y-1/2 animate-pulse rounded-full bg-ember/15 blur-[110px]" />
        <div className="absolute top-1/2 right-1/4 h-80 w-80 -translate-y-1/2 animate-pulse rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <Reveal>
        <h2 className="mx-auto max-w-3xl text-3xl leading-tight font-bold sm:text-6xl md:text-7xl">
          Ready to spark <span className="gradient-text">something?</span>
        </h2>
        <p className="mt-4 font-display text-xs tracking-[0.2em] text-muted-foreground uppercase sm:mt-6 sm:text-base sm:tracking-[0.3em]">
          {event.date}
        </p>
        <div className="mt-8 flex justify-center sm:mt-10">
          <RegisterButton size="lg" className="w-full max-w-xs sm:w-auto" />
        </div>
        <p className="mx-auto mt-6 max-w-md text-xs text-muted-foreground sm:mt-8 sm:text-base">
          Bring your team. Choose your domain. Build something that matters.
        </p>
      </Reveal>
    </Section>
  );
}
