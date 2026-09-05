import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Domains } from "@/components/site/Domains";
import { Timeline } from "@/components/site/Timeline";
import { Prizes } from "@/components/site/Prizes";
import { TeamInfo } from "@/components/site/TeamInfo";
import { Organizers } from "@/components/site/Organizers";
import { RegistrationCTA } from "@/components/site/RegistrationCTA";
import { Footer } from "@/components/site/Footer";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ParticleField } from "@/components/site/ParticleField";

const title = "SPARKORA'26 — Spark. Build. Impact. | Hackathon at JCE Chennai";
const description =
  "SPARKORA'26 is a one-day offline hackathon on 18 September 2026 at Jerusalem College of Engineering, Chennai. Four domains, teams of 2–3, prizes, certificates and meals.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="rule-gradient fixed inset-x-0 top-0 z-60 h-0.5 origin-left"
    />
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <ScrollProgress />

      {/* ═══ STATIC BACKGROUND — fixed behind everything ═══ */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0"
        style={{ pointerEvents: "none" }}
      >
        {/* Tech grid */}
        <div className="tech-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        {/* Ember glow */}
        <div className="absolute top-1/4 -left-24 h-[26rem] w-[26rem] rounded-full bg-ember/18 blur-[120px]" />
        {/* Primary glow */}
        <div className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[130px]" />
        {/* Additional bottom glows */}
        <div className="absolute bottom-1/4 left-1/3 h-[22rem] w-[22rem] rounded-full bg-primary/12 blur-[100px]" />
        <div className="absolute bottom-1/6 right-1/4 h-[20rem] w-[20rem] rounded-full bg-ember/10 blur-[110px]" />
        {/* Horizontal rule */}
        <div className="absolute inset-x-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {/* Streaks */}
        <div className="streak absolute top-[38%] left-0 h-[2px] w-40 bg-gradient-to-r from-transparent via-spark to-transparent opacity-60" />
        <div
          className="streak absolute top-[62%] left-0 h-[2px] w-28 bg-gradient-to-r from-transparent via-ember to-transparent opacity-50"
          style={{ animationDelay: "3.5s" }}
        />
        <div
          className="streak absolute top-[18%] left-0 h-[2px] w-32 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40"
          style={{ animationDelay: "6s" }}
        />
        {/* Particle field — always visible behind content */}
        <ParticleField />
      </div>

      {/* ═══ OVERLAY CONTENT — scrolls over the fixed background ═══ */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />

          {/* Each section is an overlay "slide" with its own semi-transparent card styling */}
          <div className="overlay-slide">
            <About />
          </div>

          <div className="overlay-slide">
            <Domains />
          </div>

          <div className="overlay-slide">
            <Timeline />
          </div>

          <div className="overlay-slide">
            <TeamInfo />
          </div>

          <div className="overlay-slide">
            <Prizes />
          </div>

          <div className="overlay-slide">
            <Organizers />
          </div>

          <div className="overlay-slide">
            <RegistrationCTA />
          </div>
        </main>
        <div className="overlay-slide">
          <Footer />
        </div>
      </div>
    </div>
  );
}
