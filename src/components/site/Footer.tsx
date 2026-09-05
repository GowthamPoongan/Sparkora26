import { motion } from "motion/react";
import { associations, event, socials } from "@/data/event";
import jceCrest from "@/assets/jce-crest.png";

export function Footer() {
  return (
    <footer className="px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-w-0"
        >
          <p className="font-display text-2xl font-bold tracking-[0.14em]">{event.name}</p>
          <p className="mt-3 font-display text-[0.68rem] tracking-[0.3em] text-ember uppercase">
            {event.tagline}
          </p>
          <div className="mt-6 flex flex-row items-center gap-3 sm:gap-4 min-w-0">
            <img
              src={jceCrest}
              alt="Jerusalem College of Engineering Crest"
              className="h-14 w-14 shrink-0 object-contain sm:h-20 md:h-22"
            />
            <div className="min-w-0 font-serif leading-snug text-foreground">
              <div className="text-xs font-extrabold tracking-wide uppercase text-foreground leading-tight sm:text-base md:text-lg">
                JERUSALEM COLLEGE OF ENGINEERING
              </div>
              <div className="mt-0.5 text-[0.7rem] font-semibold text-muted-foreground sm:text-sm">
                (An Autonomous Institution)
              </div>
              <div className="mt-0.5 text-[0.65rem] text-muted-foreground/80 sm:text-xs">
                Pallikaranai, Chennai - 600100
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-sm text-muted-foreground">
          <p className="label-eyebrow mb-4">Organized by</p>
          <p className="text-foreground">{event.department}</p>
          <p className="mt-1">{event.college}</p>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="label-eyebrow mb-4">In association with</p>
          <ul className="space-y-1">
            {associations.slice(1).map((a) => (
              <li key={a.name}>{a.name}</li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <p className="label-eyebrow mb-4">Location</p>
          <div className="relative h-44 w-full max-w-sm overflow-hidden rounded-xl sm:h-48 sm:w-64">
            <iframe
              title="Event Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.4!2d80.2077491!3d12.9456381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525dcaf1158b69%3A0x2faed53a93b675d8!2sJerusalem%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full rounded-xl"
            />
            <a
              href="https://maps.app.goo.gl/Yn6DKoJAYaCU14i49"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 rounded-lg border border-white/20 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md backdrop-blur transition-all hover:bg-white/95 hover:shadow-lg"
            >
              Maps
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="rule-gradient mx-auto mt-14 h-px max-w-6xl opacity-60" aria-hidden="true" />

      <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {event.name}</p>
        <nav aria-label="Social" className="flex flex-wrap gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-display tracking-[0.22em] uppercase transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
