import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { event } from "@/data/event";

const TARGET = new Date(`${event.dateISO}T09:00:00+05:30`).getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState(diff);

  useEffect(() => {
    setMounted(true);
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { value: t.days, label: "Days" },
    { value: t.hours, label: "Hours" },
    { value: t.minutes, label: "Minutes" },
    { value: t.seconds, label: "Seconds" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.85 }}
      className="mt-10 grid w-full max-w-2xl grid-cols-4 gap-2.5 sm:gap-4"
      aria-label="Countdown to SPARKORA'26"
    >
      {cells.map((c) => (
        <div
          key={c.label}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 px-2 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
        >
          <span
            aria-hidden="true"
            className="rule-gradient absolute inset-x-0 top-0 h-px opacity-50"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_65%)] opacity-70"
          />
          <p className="relative font-display text-4xl leading-none font-bold tabular-nums sm:text-6xl">
            {mounted ? pad(c.value) : "00"}
          </p>
          <p className="relative mt-2.5 font-display text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase sm:text-xs">
            {c.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
