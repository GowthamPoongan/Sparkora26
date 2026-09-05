import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { event } from "@/data/event";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-20 px-4 py-16 sm:scroll-mt-24 sm:px-8 sm:py-24 md:py-32", className)}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("mb-10 sm:mb-14", align === "center" && "text-center")}>
      {eyebrow ? (
        <p className={cn("label-eyebrow mb-4 flex items-center gap-3 sm:mb-5", align === "center" && "justify-center")}>
          <span className="rule-gradient inline-block h-px w-10" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl leading-[1] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-3 max-w-xl text-sm text-muted-foreground sm:mt-5 sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

export function RegisterButton({
  className,
  label = "REGISTER NOW",
  size = "md",
}: {
  className?: string;
  label?: string;
  size?: "md" | "lg";
}) {
  return (
    <a
      href={event.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — opens the registration form in a new tab`}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-ember font-display font-semibold tracking-[0.18em] text-ember-foreground uppercase transition-all duration-300 hover:glow-ember hover:brightness-110 focus-visible:glow-ember",
        size === "lg" ? "px-10 py-5 text-sm sm:text-base" : "px-7 py-3.5 text-xs sm:text-sm",
        className,
      )}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{label}</span>
      <span className="relative transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
