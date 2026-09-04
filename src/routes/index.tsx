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
import { FAQ } from "@/components/site/FAQ";
import { RegistrationCTA } from "@/components/site/RegistrationCTA";
import { Footer } from "@/components/site/Footer";

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
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Domains />
        <Timeline />
        <Prizes />
        <TeamInfo />
        <Organizers />
        <FAQ />
        <RegistrationCTA />
      </main>
      <Footer />
    </div>
  );
}
