import { motion, useReducedMotion } from "motion/react";
import { Clock } from "lucide-react";
import { event } from "@/data/event";
import { ParticleField } from "./ParticleField";
import { Countdown } from "./Countdown";

function Title() {
  const reduce = useReducedMotion();
  const letters = event.name.split("");
  return (
    <h1 className="sweep scanlines relative font-display text-[9.5vw] leading-[0.85] font-bold tracking-tight sm:text-[12vw] lg:text-[11.5rem] whitespace-nowrap">
      <span className="sr-only">{event.name}</span>
      <span aria-hidden="true" className="flex flex-nowrap justify-center whitespace-nowrap">
        {letters.map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.5em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.8,
              delay: reduce ? 0 : 0.1 + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
            style={{ textShadow: "0 0 60px rgba(80,150,255,0.28)" }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="noise-overlay relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-20 text-center"
    >
      {/* backdrop layers */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="tech-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute top-1/4 -left-24 h-[26rem] w-[26rem] rounded-full bg-ember/18 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[130px]" />
        <div className="absolute inset-x-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="streak absolute top-[38%] left-0 h-[2px] w-40 bg-gradient-to-r from-transparent via-spark to-transparent opacity-60" />
        <div
          className="streak absolute top-[62%] left-0 h-[2px] w-28 bg-gradient-to-r from-transparent via-ember to-transparent opacity-50"
          style={{ animationDelay: "3.5s" }}
        />
      </div>
      <ParticleField />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 font-display text-sm font-bold tracking-[0.22em] text-foreground uppercase sm:text-lg md:text-xl lg:text-2xl drop-shadow-sm"
      >
        {event.department}
      </motion.p>

      <Title />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="mt-6 font-display text-lg tracking-[0.4em] text-ember sm:text-2xl"
      >
        {event.tagline}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-2.5 font-display text-sm sm:text-base md:text-lg font-bold tracking-[0.3em] text-foreground/90 uppercase drop-shadow-sm"
      >
        AN INTER-COLLEGIATE HACKATHON
      </motion.p>

      <Countdown />


      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="mt-8 flex flex-col items-center gap-2.5 font-display text-xs tracking-[0.28em] text-muted-foreground uppercase sm:text-sm"
      >
        <p className="text-foreground">{event.date}</p>
        <p>
          {event.venue} • {event.city}
        </p>
        <p className="text-primary font-bold">Offline Hackathon</p>
        <div className="mt-2 flex items-center justify-center gap-2.5 font-display text-sm sm:text-base md:text-lg font-bold tracking-[0.2em] uppercase whitespace-nowrap drop-shadow-sm">
          <Clock className="h-5 w-5 text-ember shrink-0 animate-pulse" />
          <span className="text-foreground">TIME : </span>
          <span className="text-ember font-black">8:30 A.M. ONWARDS</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.05 }}
        className="mt-11 flex w-full max-w-sm flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center"
      >
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-ember px-9 py-4 font-display text-sm font-semibold tracking-[0.2em] text-ember-foreground uppercase glow-ember transition-all duration-300 hover:brightness-110 sm:w-auto"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">Register Now</span>
          <span className="relative transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
        <a
          href="#domains"
          className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-border px-9 py-4 font-display text-sm tracking-[0.2em] uppercase transition-colors duration-300 hover:border-primary hover:text-primary sm:w-auto"
        >
          Explore Domains <span aria-hidden="true">↓</span>
        </a>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="float-slow flex flex-col items-center gap-2">
          <span className="label-eyebrow !text-[0.6rem]">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
