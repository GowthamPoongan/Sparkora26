/**
 * SPARKORA'26 — single source of truth for all event information.
 * Organizers: edit values here only. Nothing else in the UI hardcodes event data.
 */

export const event = {
  name: "SPARKORA'26",
  tagline: "SPARK. BUILD. IMPACT.",
  date: "18 SEPTEMBER 2026",
  dateISO: "2026-09-18",
  venue: "Jerusalem College of Engineering",
  city: "Chennai",
  mode: "Offline",
  teamSize: "2–3 members",
  // Replace with the live Google Form link.
  registrationUrl: "GOOGLE_FORM_URL_HERE",
  department: "Department of Computer Science and Business Systems",
  college: "Jerusalem College of Engineering",
  intro:
    "Sparkora'26 is a hackathon for student innovators to transform real-world problems into technology-driven solutions.",
  about:
    "The hackathon brings together technology, business thinking, creativity and innovation — one day where student teams move from an idea to a working solution, and defend it in front of judges.",
};

export const stats = [
  { value: "01", label: "HACKATHON" },
  { value: "04", label: "DOMAINS" },
  { value: "02–03", label: "MEMBERS / TEAM" },
  { value: "01", label: "DAY" },
];

export const domains = [
  { no: "01", title: "HEALTHCARE", line: "Code that saves lives." },
  { no: "02", title: "EDTECH", line: "Reimagine how we learn." },
  { no: "03", title: "AI FOR BUSINESS", line: "Intelligence meets enterprise." },
  { no: "04", title: "FINTECH", line: "Build the future of finance." },
];

/**
 * Structural placeholders only — replace "TIME" once the official
 * schedule is confirmed by the organizing team.
 */
export const timeline = [
  {
    time: "stage 1",
    title: "REGISTRATION & CHECK-IN",
    description: "Form your team and Choose your Domain",
  },
  {
    time: "stage 2",
    title: "Problem Statements Revealed",
    description: "Choose a challenge from your domain and understand the problem",
  },
  {
    time: "stage 3",
    title: "Abstract ( Idea Submission )",
    description: "Develop your approach and submit your abstract before the deadline.",
  },
  {
    time: "stage 4",
    title: "MENTOR CHECKPOINT",
    description: "Teams receive guidance and feedback.",
  },
  {
    time: "stage 5",
    title: "FINAL PITCH",
    description: "Teams present their solutions to the judges.",
  },
  {
    time: "stage 6",
    title: "Evaluation",
    description: "Judges evaluate the submissions based on creativity, technical complexity, business impact, and presentation.",
  },
  {
    time: "stage 7",
    title: "WINNER ANNOUNCEMENT & AWARDS",
    description: "Winners are announced and prizes are presented.",
  },
];

export const prizes = [
  { no: "01", title: "1ST PRIZE", amount: "₹2,500" },
  { no: "02", title: "2ND PRIZE", amount: "₹1,500" },
  { no: "03", title: "3RD PRIZE", amount: "₹1,000" },
];

export const perks = ["CERTIFICATES", "LUNCH WILL BE PROVIDED"];

/**
 * Organizer logos. Drop real logo files in and set `src` to the asset URL —
 * leave `src` null to render a clean labelled placeholder container.
 */
export const associations: { name: string; src: string | null }[] = [
  { name: "Jerusalem College of Engineering", src: null },
  { name: "Nexos of Business and Tech Associates", src: null },
  { name: "Club Algobiz", src: null },
  { name: "Institution of Engineers (India) — IE(I)", src: null },
];

export const faqs = [
  {
    q: "Who can participate?",
    a: "Sparkora'26 is a college hackathon open to student innovators who register through the official registration form.",
  },
  { q: "What is the team size?", a: "Teams must have 2–3 members." },
  {
    q: "Where is the hackathon conducted?",
    a: "At Jerusalem College of Engineering, Chennai.",
  },
  {
    q: "Is the hackathon online or offline?",
    a: "The hackathon is conducted fully offline, on campus.",
  },
  {
    q: "What are the hackathon domains?",
    a: "Healthcare, EdTech, AI for Business and FinTech.",
  },
  { q: "Will meals be provided?", a: "Yes, meals are provided to participants." },
  {
    q: "Will participants receive certificates?",
    a: "Yes, certificates are provided.",
  },
  {
    q: "How do I register?",
    a: "Use any Register Now button on this page — it opens the official registration form in a new tab.",
  },
];

// Replace with real handles when available.
export const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:example@jerusalemengg.ac.in" },
];

export const nav = [
  { label: "ABOUT", to: "#about" },
  { label: "DOMAINS", to: "#domains" },
  { label: "TIMELINE", to: "#timeline" },
  { label: "PRIZES", to: "#prizes" },
  { label: "ORGANIZERS", to: "#organizers" },
  { label: "FAQ", to: "#faq" },
];
