import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import {
  Award,
  Flag,
  MessagesSquare,
  Mic,
  Rocket,
  Terminal,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";
import { timeline } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

const icons: LucideIcon[] = [Flag, Mic, Rocket, MessagesSquare, UploadCloud, Terminal, Award];

function Item({ item, index }: { item: (typeof timeline)[number]; index: number }) {
  const Icon = icons[index % icons.length]!;
  const left = index % 2 === 0;
  return (
    <li className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
      <div className={cn("hidden md:row-start-1 md:block", left ? "md:col-start-1" : "md:col-start-3")}>
        <Reveal delay={0.05}>
          <Card item={item} Icon={Icon} alignRight={left} />
        </Reveal>
      </div>

      {/* node */}
      <div className="absolute top-1.5 left-[0.4375rem] md:static md:col-start-2 md:row-start-1 md:left-auto">
        <motion.span
          initial={{ scale: 0.4, opacity: 0.3 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="block h-3 w-3 rounded-full bg-ember shadow-[0_0_18px_4px_color-mix(in_oklab,var(--ember)_55%,transparent)]"
        />
      </div>

      {/* mobile / single-sided */}
      <div className="pl-10 md:hidden md:row-start-1">
        <Reveal>
          <Card item={item} Icon={Icon} alignRight={false} />
        </Reveal>
      </div>
    </li>
  );
}

function Card({
  item,
  Icon,
  alignRight,
}: {
  item: (typeof timeline)[number];
  Icon: LucideIcon;
  alignRight: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card/40 p-6 transition-colors duration-500 hover:border-primary/50",
        alignRight && "md:text-right",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          alignRight && "md:flex-row-reverse md:justify-start",
        )}
      >
        <Icon aria-hidden="true" strokeWidth={1.3} className="h-5 w-5 shrink-0 text-primary" />
        <span className="font-display text-[0.65rem] tracking-[0.28em] text-ember uppercase">
          {item.time}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold tracking-tight sm:text-xl">{item.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
      <span
        aria-hidden="true"
        className="rule-gradient absolute inset-x-0 bottom-0 h-px scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
      />
    </article>
  );
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="timeline" className="bg-navy/40">
      <SectionHeading
        eyebrow="Timeline"
        title="The Journey"
        subtitle="From first spark to final pitch."
      />

      <div ref={ref} className="relative">
        {/* rail */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-3 w-px bg-border md:left-1/2 md:-translate-x-1/2"
        >
          <motion.div
            style={{ height }}
            className="w-px bg-gradient-to-b from-primary via-spark to-ember shadow-[0_0_16px_2px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
          />
        </div>

        <ol className="relative space-y-10 md:space-y-6">
          {timeline.map((item, i) => (
            <Item key={item.title} item={item} index={i} />
          ))}
        </ol>
      </div>

      <Reveal>
        <p className="mt-14 font-display text-[0.62rem] tracking-[0.24em] text-muted-foreground uppercase">
          Schedule timings to be announced by the organizing team.
        </p>
      </Reveal>
    </Section>
  );
}
