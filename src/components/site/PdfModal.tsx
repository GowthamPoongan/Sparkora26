import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  LayoutList,
  Sparkles,
  X,
} from "lucide-react";
import { hackathonRules, rulesAndGuidelines, domains, ideaSubmissionDetails } from "@/data/event";
import { ShieldCheck } from "lucide-react";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
}

export function PdfModal({ isOpen, onClose, title, pdfUrl }: PdfModalProps) {
  const [activeTab, setActiveTab] = useState<"structured" | "pdf">("pdf");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-amber-500/30 bg-zinc-950/95 p-3 shadow-[0_0_60px_rgba(245,158,11,0.2)] backdrop-blur-2xl sm:p-5"
          >
            {/* Header */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3 sm:pb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 sm:h-10 sm:w-10">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold tracking-tight text-white sm:text-lg uppercase">
                    {title}
                  </h3>
                  <p className="text-[0.7rem] text-zinc-400 sm:text-xs">
                    Official Hackathon Guidelines & Evaluation Criteria
                  </p>
                </div>
              </div>

              {/* View Switcher Tabs & Actions */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg border border-border/60 bg-zinc-900/80 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("structured")}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "structured"
                        ? "bg-amber-500 text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <LayoutList className="h-3.5 w-3.5" />
                    <span>Overview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("pdf")}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "pdf"
                        ? "bg-amber-500 text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>PDF View</span>
                  </button>
                </div>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Open PDF in new tab"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-zinc-900/80 text-zinc-300 transition-colors hover:border-amber-500/50 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>

                <a
                  href={pdfUrl}
                  download
                  title="Download PDF"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-zinc-900/80 text-zinc-300 transition-colors hover:border-amber-500/50 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close rules viewer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-zinc-900/80 text-zinc-400 transition-colors hover:border-amber-500/50 hover:text-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="relative mt-3 flex-1 overflow-y-auto rounded-xl border border-white/10 bg-zinc-900/90 p-4 sm:p-6 shadow-inner">
              {activeTab === "structured" ? (
                title === "RULES & GUIDELINES" ? (
                  <div className="space-y-6 sm:space-y-8">
                  {rulesAndGuidelines.map((round) => (
                    <div
                      key={round.round}
                      className="group relative overflow-hidden rounded-2xl border border-amber-500/25 bg-zinc-950/80 p-5 sm:p-6 shadow-[0_0_25px_rgba(245,158,11,0.08)] transition-all hover:border-amber-500/50"
                    >
                      {/* Round Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="rounded-md bg-amber-500 px-2.5 py-1 font-mono text-xs font-black text-black uppercase">
                            {round.round}
                          </span>
                          <h4 className="font-display text-base sm:text-xl font-bold tracking-tight text-white uppercase">
                            {round.title}
                          </h4>
                        </div>
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[0.65rem] font-bold tracking-wider text-amber-400 uppercase">
                          {round.badge}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-zinc-400">
                        {round.description}
                      </p>

                      {/* Bullet points */}
                      <ul className="mt-4 space-y-3">
                        {round.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Rules & Regulations Section */}
                  <div className="group relative overflow-hidden rounded-2xl border border-amber-500/25 bg-zinc-950/80 p-5 sm:p-6 shadow-[0_0_25px_rgba(245,158,11,0.08)] transition-all hover:border-amber-500/50">
                    <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-3">
                      <ShieldCheck className="h-5 w-5 text-amber-400" />
                      <h4 className="font-display text-base sm:text-xl font-bold tracking-tight text-white uppercase">
                        HACKATHON RULES & REGULATIONS
                      </h4>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {hackathonRules.map((rule) => (
                        <div
                          key={rule.no}
                          className="flex items-start gap-3 rounded-xl border border-white/5 bg-zinc-900/60 p-3.5 transition-colors hover:border-amber-500/30"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-500/10 font-mono text-xs font-bold text-amber-400 border border-amber-500/30">
                            {rule.no}
                          </span>
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold text-white uppercase">
                              {rule.title}
                            </h5>
                            <p className="mt-0.5 text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                              {rule.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : title === "Revealing of Problem Statements" ? (
                <div className="space-y-6 sm:space-y-8">
                  {domains.map((domain) => (
                    <div
                      key={domain.no}
                      className="group relative overflow-hidden rounded-2xl border border-amber-500/25 bg-zinc-950/80 p-5 sm:p-6 shadow-[0_0_25px_rgba(245,158,11,0.08)] transition-all hover:border-amber-500/50"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="rounded-md bg-amber-500 px-2.5 py-1 font-mono text-xs font-black text-black uppercase">
                            DOMAIN {domain.no}
                          </span>
                          <h4 className="font-display text-base sm:text-xl font-bold tracking-tight text-white uppercase">
                            {domain.title}
                          </h4>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                        {domain.problemStatement}
                      </p>
                    </div>
                  ))}
                </div>
              ) : title === "Registration Deadline & Idea Submission" ? (
                <div className="space-y-6 sm:space-y-8">
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-sm">
                    <p className="text-sm font-semibold text-amber-200">
                      {ideaSubmissionDetails.description}
                    </p>
                  </div>
                  {ideaSubmissionDetails.sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-2xl border border-amber-500/25 bg-zinc-950/80 p-5 sm:p-6 shadow-[0_0_25px_rgba(245,158,11,0.08)] transition-all hover:border-amber-500/50"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-display text-base sm:text-lg font-bold tracking-tight text-white uppercase">
                            {section.title}
                          </h4>
                        </div>
                      </div>
                      {section.items.length > 0 ? (
                        <ul className="mt-4 space-y-3">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                         <p className="mt-4 text-xs italic text-zinc-500">Provide details here as required.</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                  <FileText className="mb-4 h-12 w-12 text-zinc-600" />
                  <h4 className="font-display text-lg font-bold text-zinc-300">Overview Not Available</h4>
                  <p className="mt-2 text-sm text-zinc-500">Please view the PDF for more details.</p>
                </div>
              )
            ) : (
                <div className="h-full w-full min-h-[65vh] overflow-hidden rounded-lg bg-zinc-950">
                  <object
                    data={`${pdfUrl}#toolbar=1&navpanes=0`}
                    type="application/pdf"
                    className="h-full w-full border-none min-h-[65vh]"
                  >
                    <iframe
                      src={`${pdfUrl}#toolbar=1&navpanes=0`}
                      className="h-full w-full border-none min-h-[65vh]"
                      title={title}
                    >
                      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                        <p className="text-sm text-zinc-300">
                          Your device or browser preview is constrained.
                        </p>
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2 text-xs font-bold text-black uppercase shadow-md hover:brightness-110"
                        >
                          Open PDF Directly
                        </a>
                      </div>
                    </iframe>
                  </object>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
