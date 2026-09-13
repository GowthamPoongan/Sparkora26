import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, AlertTriangle } from "lucide-react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 right-0 top-20 z-[60] flex items-center justify-center p-4 pointer-events-none"
        >
          <div className="pointer-events-auto flex w-full max-w-2xl items-center justify-between gap-4 rounded-2xl border border-red-500/40 bg-red-950/60 px-4 py-3 shadow-[0_0_30px_rgba(220,38,38,0.25)] backdrop-blur-xl sm:px-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-left">
                <span className="font-display font-bold text-white tracking-wide uppercase text-sm sm:text-base">
                  Registration Closed
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-red-500/50 sm:block" />
                <span className="text-xs sm:text-sm font-medium text-red-200">
                  No on-spot registration available for this event.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Close announcement"
              className="shrink-0 rounded-lg p-1.5 text-red-400 transition-colors hover:bg-red-500/20 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
