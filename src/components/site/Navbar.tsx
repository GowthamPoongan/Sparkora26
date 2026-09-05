import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Banknote } from "lucide-react";
import { event, nav } from "@/data/event";
import { RegisterButton } from "./primitives";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ["top", "about", "domains", "timeline", "prizes", "organizers"];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      let current = "#top";

      // Check each section position
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = `#${id}`;
          }
        }
      }

      // Check if at the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        current = "#organizers";
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div className="flex h-14 sm:h-18 w-full items-center justify-between gap-1.5 px-2.5 sm:px-10 lg:px-14">
        <div className="flex items-center gap-1.5 sm:gap-5 min-w-0">
          <a
            href="#top"
            onClick={() => setActiveSection("#top")}
            className="font-display text-[0.8rem] sm:text-xl font-black tracking-[0.1em] sm:tracking-[0.16em] whitespace-nowrap shrink-0 bg-gradient-to-r from-foreground via-amber-200 to-ember bg-clip-text text-transparent drop-shadow-sm"
          >
            {event.name}
          </a>

          {/* Registration Fee Badge */}
          <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-orange-500/50 bg-orange-500/20 px-2 py-0.5 sm:px-4 sm:py-1.5 whitespace-nowrap shadow-md shrink-0">
            <Banknote className="h-3 w-3 sm:h-5 sm:w-5 text-orange-400 shrink-0" />
            <span className="font-display text-[0.6rem] sm:text-base font-extrabold tracking-wide sm:tracking-wider text-foreground uppercase">
              Registration Fee :
            </span>
            <span className="font-display text-[0.65rem] sm:text-lg font-black tracking-wide sm:tracking-wider text-orange-400">
              ₹150
            </span>
          </div>
        </div>

        {/* ═══ Desktop Nav with Active Glowing Underline ═══ */}
        <nav aria-label="Main" className="ml-auto hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const isActive = activeSection === item.to;
            return (
              <a
                key={item.label}
                href={item.to}
                onClick={() => setActiveSection(item.to)}
                className={cn(
                  "relative py-1 font-display text-[0.72rem] tracking-[0.22em] uppercase transition-all duration-300",
                  isActive
                    ? "font-bold text-white drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.9)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
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
            <nav aria-label="Mobile" className="flex flex-col gap-4">
              {nav.map((item) => {
                const isActive = activeSection === item.to;
                return (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={() => {
                      setActiveSection(item.to);
                      setOpen(false);
                    }}
                    className={cn(
                      "relative flex items-center justify-between py-1 font-display text-xl font-bold tracking-[0.08em] uppercase transition-colors sm:text-2xl",
                      isActive
                        ? "text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                    )}
                  </a>
                );
              })}
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
