import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Domains } from "@/components/site/Domains";
import { Timeline } from "@/components/site/Timeline";
import { Prizes } from "@/components/site/Prizes";
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
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="rule-gradient fixed inset-x-0 top-0 z-60 h-0.5 origin-left will-change-transform"
    />
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <ScrollProgress />

      {/* ═══ STATIC BACKGROUND — hardware accelerated & fixed behind content ═══ */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 transform-gpu overflow-hidden"
        style={{ pointerEvents: "none", willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* Tech grid */}
        <div className="tech-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        {/* Ember glow */}
        <div className="absolute top-1/4 -left-24 h-[24rem] w-[24rem] rounded-full bg-ember/18 blur-[70px] sm:blur-[100px] transform-gpu" />
        {/* Primary glow — vibrant blue */}
        <div className="absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-primary/10 sm:bg-primary/20 blur-[75px] sm:blur-[110px] transform-gpu" />
        {/* Additional bottom glows */}
        <div className="absolute bottom-1/4 left-1/3 h-[20rem] w-[20rem] rounded-full bg-primary/7 sm:bg-primary/12 blur-[65px] sm:blur-[95px] transform-gpu" />
        <div className="absolute bottom-1/6 right-1/4 h-[18rem] w-[18rem] rounded-full bg-ember/10 blur-[65px] sm:blur-[95px] transform-gpu" />
        {/* Particle field */}
        <ParticleField />
      </div>

      {/* ═══ CONTENT — flows seamlessly over the static background ═══ */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Domains />
          <Timeline />
          <Prizes />
          <Organizers />
          <RegistrationCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
