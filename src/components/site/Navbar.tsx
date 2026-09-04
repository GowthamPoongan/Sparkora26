import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
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
      <div className="mx-auto flex h-18 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-[0.16em] whitespace-nowrap"
        >
          {event.name}
        </a>

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

        <div className="ml-auto hidden lg:ml-7 lg:block">
          <RegisterButton label="Register" />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-border lg:hidden"
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
            className="border-b border-border bg-background/97 px-5 py-8 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-5">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl font-semibold tracking-[0.08em] uppercase"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-8">
              <RegisterButton className="w-full" size="lg" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
