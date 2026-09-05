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
      <div className="flex w-full flex-col gap-2.5 px-3.5 py-2.5 sm:flex-row sm:h-18 sm:items-center sm:justify-between sm:gap-4 sm:px-10 sm:py-0 lg:px-14">
        {/* Logo & Hamburger Menu for Mobile */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <a
            href="#top"
            className="font-display text-base sm:text-xl font-black tracking-[0.14em] text-foreground whitespace-nowrap"
          >
            {event.name}
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-border sm:h-11 sm:w-11 lg:hidden"
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

        {/* Registration Fee Badge */}
        <div className="flex items-center justify-center gap-2 rounded-full border border-orange-500/50 bg-orange-500/20 px-4 py-1.5 whitespace-nowrap shadow-md shrink-0 sm:ml-2 lg:ml-0">
          <Banknote className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-orange-400 shrink-0" />
          <span className="font-display text-xs sm:text-base font-extrabold tracking-wider text-foreground uppercase">
            Registration Fee :
          </span>
          <span className="font-display text-sm sm:text-lg font-black tracking-wider text-orange-400">
            ₹150
          </span>
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
