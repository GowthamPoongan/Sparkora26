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
  registrationUrl: "https://forms.gle/bWW1HiE93HW6o18CA",
  department: "Department of Computer Science and Business Systems",
  college: "Jerusalem College of Engineering",
  intro:
    "SPARKORA is a platform for innovators, creators, and problem-solvers to turn ideas into impactful solutions. Join us for an exciting hackathon where you can ideate, build, collaborate, and innovate to solve real-world challenges using technology.",
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
    title: "Registration & Domain Selection",
    description: "Form your team and Choose your Domain",
  },
  {
    time: "stage 2",
    title: "Revealing of Problem Statements",
    description: "Choose a challenge from your domain and understand the problem",
  },
  {
    time: "stage 3",
    title: "Idea Submission",
    description: "Develop your approach and submit your abstract before the deadline.",
  },
  {
    time: "stage 4",
    title: "RULES & GUIDELINES",
    description: "Know the rules, submission requirements, judging criteria, and important instructions.",
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

export const totalPrizePool = "₹5,000";

export const perks: string[] = [];

/**
 * Organizer logos. Drop real logo files in and set `src` to the asset URL —
 * leave `src` null to render a clean labelled placeholder container.
 */
import jceCrest from "@/assets/jce-crest.png";
import nexusLogo from "@/assets/nexus-logo.png";
import algobizLogo from "@/assets/club-algobiz-logo.png";
import ieiLogo from "@/assets/iei-logo.png";

export const jceLogo = jceCrest;

export const associations: { name: string; src: string | null }[] = [
  { name: "Jerusalem College of Engineering", src: jceLogo },
  { name: "Nexus of Business and Tech Associates", src: nexusLogo },
  { name: "Club Algobiz", src: algobizLogo },
  { name: "Institution of Engineers (India) — IE(I)", src: ieiLogo },
];

export const studentCoordinators = [
  { name: "SHARAN SRIDHARAN", yearDept: "IV CS&BS", phone: "+91 82487824337" },
  { name: "USHA RANI DIVYA B", yearDept: "III CS&BS", phone: "+91 8124133570" },
  { name: "DHANYA SHREE S V", yearDept: "II CS&BS", phone: "+91 8015323916" },
];

export const presidents = [
  { title: "NBTA PRESIDENT", name: "RENUKA V", yearDept: "IV CS&BS" },
  { title: "ALGOBIZ PRESIDENT", name: "GOWTHAM P", yearDept: "IV CS&BS" },
  { title: "IE(I) PRESIDENT", name: "ARJUN A", yearDept: "IV CS&BS" },
];

export const facultyCoordinators = [
  { name: "Ms G PREETHI WILSON", designation: "AP, CS&BS", phone: "+91 8610301713", group: "FACULTY CO-ORDINATORS" },
  { name: "Ms B LAKSHMI ROOPA", designation: "AP, CS&BS", phone: "+91 9985812700", group: "FACULTY CO-ORDINATORS" },
  { name: "Ms A SINDHU DEVI", designation: "AP, CS&BS", phone: "+91 9176339602", group: "FACULTY CO-ORDINATORS" },
  { name: "Ms B MALATHY", designation: "AP, CS&BS", phone: "+91 9677435875", group: "IE(I) CO-ORDINATOR" },
];

export const leadership = [
  { title: "HOD CS&BS", name: "Dr MAYA EAPEN" },
  { title: "DEAN STUDENT AFFAIRS", name: "Dr V JAMUNA" },
  { title: "PRINCIPAL", name: "Dr S SATHIYAMURTHY" },
];

// Replace with real handles when available.
export const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:example@jerusalemengg.ac.in" },
];

export const nav = [
  { label: "HOME", to: "#top" },
  { label: "ABOUT", to: "#about" },
  { label: "DOMAINS", to: "#domains" },
  { label: "TIMELINE", to: "#timeline" },
  { label: "PRIZES", to: "#prizes" },
  { label: "ORGANIZERS", to: "#organizers" },
];
