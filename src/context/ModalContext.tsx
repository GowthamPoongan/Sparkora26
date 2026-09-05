import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Sparkles, X } from "lucide-react";

type ModalType = "domain" | "register";

interface ModalData {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
  subtext?: string;
  badge?: string;
}

interface ModalContextType {
  openModal: (data: Omit<ModalData, "isOpen">) => void;
  closeModal: () => void;
  openDomainModal: (domainTitle: string) => void;
  openRegisterModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalData>({
    isOpen: false,
    type: "domain",
    title: "",
    message: "",
  });

  const openModal = (data: Omit<ModalData, "isOpen">) => {
    setModal({ ...data, isOpen: true });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const openDomainModal = (domainTitle: string) => {
    openModal({
      type: "domain",
      badge: "PROBLEM STATEMENTS",
      title: domainTitle,
      message: "Problem statement are not yet released",
      subtext: "Problem statements will be officially revealed on the hackathon day. Prepare your team and get ready to innovate!",
    });
  };

  const openRegisterModal = () => {
    openModal({
      type: "register",
      badge: "REGISTRATION STATUS",
      title: "SPARKORA'26",
      message: "Registration not yet started",
      subtext: "Registration portal will be opened shortly. Stay connected with your team and keep your ideas ready!",
    });
  };

  // Keyboard accessibility and body scroll lock
  useEffect(() => {
    if (!modal.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modal.isOpen]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, openDomainModal, openRegisterModal }}>
      {children}
      <AnimatePresence>
        {modal.isOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-amber-500/35 bg-gradient-to-b from-zinc-900/98 via-zinc-950/98 to-black/98 p-6 text-center shadow-[0_0_60px_rgba(245,158,11,0.25)] backdrop-blur-2xl sm:p-8"
            >
              {/* Top ambient glow */}
              <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-44 rounded-full bg-amber-500/20 blur-3xl" />

              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:border-amber-500/40 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Icon Badge */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                {modal.type === "domain" ? (
                  <Sparkles className="h-8 w-8 text-amber-400 animate-pulse" />
                ) : (
                  <Clock className="h-8 w-8 text-orange-400 animate-pulse" />
                )}
              </div>

              {/* Category Badge */}
              {modal.badge && (
                <div className="mb-2.5">
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-display text-[0.65rem] font-bold tracking-[0.2em] text-amber-300 uppercase">
                    {modal.badge}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3 className="font-display text-lg sm:text-2xl font-black tracking-tight text-white uppercase">
                {modal.title}
              </h3>

              {/* Main Notification Box */}
              <div className="my-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3.5 shadow-inner">
                <p className="font-display text-base sm:text-lg font-black tracking-wide text-amber-300 drop-shadow-sm">
                  {modal.message}
                </p>
              </div>

              {/* Additional Context Subtext */}
              {modal.subtext && (
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {modal.subtext}
                </p>
              )}

              {/* Action Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 py-3 font-display text-xs sm:text-sm font-bold tracking-[0.2em] text-black uppercase shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
