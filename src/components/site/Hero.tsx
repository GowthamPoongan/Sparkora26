import { motion, useReducedMotion } from "motion/react";
import { Clock } from "lucide-react";
import { event } from "@/data/event";
import { Countdown } from "./Countdown";
import { SkyCrackers } from "./SkyCrackers";
import jceCrest from "@/assets/jce-crest.png";

function Title() {
  const reduce = useReducedMotion();
  const letters = event.name.split("");
  return (
    <h1 className="sweep scanlines relative font-display text-[9vw] sm:text-[11vw] lg:text-[11.5rem] leading-[0.88] font-bold tracking-tight whitespace-nowrap">
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
            style={{ textShadow: "0 0 50px rgba(255,140,50,0.22), 0 0 70px rgba(120,170,240,0.14)" }}
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
      className="noise-overlay relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 text-center sm:px-5 sm:pt-28 sm:pb-20"
    >
      <SkyCrackers />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-3 flex flex-col items-center justify-center gap-2 sm:mb-4 sm:flex-row sm:gap-4"
      >
        <img
          src={jceCrest}
          alt="Jerusalem College of Engineering Crest"
          className="h-14 w-14 object-contain drop-shadow-md sm:h-20 sm:w-20"
        />
        <span className="text-center font-display text-base font-bold tracking-[0.1em] text-foreground uppercase drop-shadow-sm sm:text-2xl md:text-3xl lg:text-4xl sm:tracking-[0.15em]">
          Jerusalem College of Engineering
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-6 font-display text-xs font-bold tracking-[0.14em] text-foreground uppercase drop-shadow-sm sm:mb-8 sm:text-lg md:text-xl lg:text-2xl sm:tracking-[0.22em]"
      >
        {event.department}
      </motion.p>

      <Title />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="mt-5 font-display text-base font-semibold tracking-[0.22em] text-ember sm:mt-6 sm:text-2xl sm:tracking-[0.4em]"
      >
        {event.tagline}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-2 font-display text-xs font-bold tracking-[0.16em] text-foreground/90 uppercase drop-shadow-sm sm:text-base md:text-lg sm:tracking-[0.3em]"
      >
        AN INTER-COLLEGIATE HACKATHON
      </motion.p>

      <Countdown />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="mt-7 flex flex-col items-center gap-2 font-display text-xs tracking-[0.2em] text-muted-foreground uppercase sm:mt-8 sm:gap-2.5 sm:text-sm sm:tracking-[0.28em]"
      >
        <p className="text-foreground">{event.date}</p>
        <p>
          {event.venue} • {event.city}
        </p>
        <div className="mt-2 flex items-center justify-center gap-2 font-display text-xs font-bold tracking-[0.12em] uppercase whitespace-nowrap drop-shadow-sm sm:text-base md:text-lg sm:tracking-[0.2em]">
          <Clock className="h-4 w-4 shrink-0 animate-pulse text-ember sm:h-5 sm:w-5" />
          <span className="text-foreground">TIME : </span>
          <span className="font-black text-ember">8:30 A.M. ONWARDS</span>
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
