import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Banknote } from "lucide-react";
import { event, nav } from "@/data/event";
import { RegisterButton } from "./primitives";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-border/60 bg-background/75 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="flex h-16 sm:h-18 w-full items-center justify-between gap-2 px-3 sm:px-10 lg:px-14">
        <div className="flex items-center gap-2 sm:gap-5 min-w-0">
          <a
            href="#top"
            className="font-display text-[0.9rem] sm:text-lg font-black tracking-[0.12em] sm:tracking-[0.16em] whitespace-nowrap shrink-0"
          >
            {event.name}
          </a>

          {/* Registration Fee Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-orange-500/50 bg-orange-500/20 px-2.5 py-1 sm:px-4 sm:py-1.5 whitespace-nowrap shadow-md shrink-0">
            <Banknote className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-orange-400 shrink-0" />
            <span className="font-display text-[0.7rem] sm:text-base font-extrabold tracking-wide sm:tracking-wider text-foreground uppercase">
              Fee :
            </span>
            <span className="font-display text-[0.8rem] sm:text-lg font-black tracking-wide sm:tracking-wider text-orange-400">
              ₹150
            </span>
          </div>
        </div>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.to}
              className="font-display text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block lg:ml-4">
          <RegisterButton label="Register" />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-border lg:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="block h-px w-5 bg-foreground"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-px w-5 bg-foreground"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="block h-px w-5 bg-foreground"
          />
        </button>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "rule-gradient h-px w-full transition-opacity duration-500",
          scrolled ? "opacity-90" : "opacity-30",
        )}
      />

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-b border-border bg-background/97 px-6 py-7 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-5">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-xl font-semibold tracking-[0.08em] uppercase sm:text-2xl"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-7 flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 py-2.5 px-4 text-base sm:text-lg whitespace-nowrap">
                <Banknote className="h-5 w-5 text-orange-400 shrink-0" />
                <span className="font-display font-bold tracking-wider text-foreground uppercase">
                  Registration Fee :
                </span>
                <span className="font-display text-lg font-black tracking-wider text-orange-400">
                  ₹150
                </span>
              </div>
              <RegisterButton className="w-full" size="lg" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
