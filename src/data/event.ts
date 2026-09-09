/**
 * SPARKORA'26 — single source of truth for all event information.
 * Organizers: edit values here only. Nothing else in the UI hardcodes event data.
 */

export const event = {
  name: "SPARKORA'26",
  tagline: "SPARK. BUILD. IMPACT.",
  date: "18 SEPTEMBER 2026",
  dateISO: "2026-09-18",
  time: "8:30 A.M. ONWARDS",
  startTimeISO: "08:30:00+05:30",
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
  { 
    no: "01", 
    title: "HEALTHCARE", 
    line: "Code that saves lives.",
    problemStatement: "In emergencies, patients may be unconscious, unable to communicate, or unaware of their critical medical information. Responders may therefore lack immediate access to important details such as allergies, medications, existing conditions, or emergency contacts. Design and develop a privacy-first emergency information system that provides authorized responders with essential medical information within seconds while ensuring that access is temporary, controlled, and under the patient's control."
  },
  { 
    no: "02", 
    title: "EDTECH", 
    line: "Reimagine how we learn.",
    problemStatement: "Develop a platform that bridges the gap between academic curricula and industry requirements by identifying skill gaps and recommending job-ready training paths for students."
  },
  {
    no: "03",
    title: "AI FOR BUSINESS",
    line: "Intelligence meets enterprise.",
    problemStatement: "Build a system that analyzes transaction patterns and assigns a risk score to identify potentially fraudulent transactions."
  },
  { 
    no: "04", 
    title: "FINTECH", 
    line: "Build the future of finance.",
    problemStatement: "Scammers show shopkeepers and vendors fake \"payment successful\" screenshots to dodge paying for goods, since these screenshots closely mimic real UPI apps (GPay, PhonePe, Paytm) and are hard to tell apart at a glance. Implement a solution where a vendor flags the screenshot as Genuine, Suspicious, or Fake with a reason."
  },
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
    link: event.registrationUrl,
    linkText: "Register Now",
  },
  {
    time: "stage 2",
    title: "RULES & GUIDELINES",
    description:
      "Rules & guidelines are available. Know the submission requirements, judging criteria, and important instructions.",
    date: "08/09/2026",
    pdfUrl: sparkoraGuidelinesPdf,
    pdfText: "View Rules & Guidelines",
  },
  {
    time: "stage 3",
    title: "Revealing of Problem Statements",
    description:
      "Problem statements will be revealed on 09/09/2026. Choose a challenge from your domain and understand the problem.",
    date: "09/09/2026",
    pdfUrl: sparkoraProblemStatementPdf,
    pdfText: "View Problem Statements",
  },
  {
    time: "stage 4",
    title: "Registration Deadline & Idea Submission",
    description: "Register online and submit your A3-size abstract. A sample format will be provided.",
    deadlineAlert: "Both Registration & Idea Submission Deadline: 15 September 2026",
    date: "15/09/2026",
    importantDate: true,
  },
  {
    time: "stage 5",
    title: "FINAL PITCH",
    description: "Teams present their solutions to the judges.",
  },
  {
    time: "stage 6",
    title: "Evaluation",
    description:
      "Judges evaluate the submissions based on creativity, technical complexity, business impact, and presentation.",
  },
  {
    time: "stage 7",
    title: "WINNER ANNOUNCEMENT & AWARDS",
    description: "Winners are announced and prizes are presented.",
  },
];

export const rulesAndGuidelines = [
  {
    round: "ROUND 1",
    title: "IDEA PRESENTATION",
    badge: "PITCHING ROUND",
    description:
      "Pitch your idea and technical approach using the provided template.",
    points: [
      "Teams will present their proposed solution for 4–5 minutes using the PPT format provided by the organizers as idea pitching.",
      "The PPT format will be shared with participants before the offline hackathon.",
      "The presentation should clearly explain the problem, proposed solution, key features, SDG, and technical approach.",
      "This round will encourage participants to analyze challenges and formulate creative, technology-driven solutions.",
    ],
  },
  {
    round: "ROUND 2",
    title: "PROTOTYPE DEVELOPMENT & FINAL EVALUATION",
    badge: "BUILD & EVALUATE",
    description:
      "Develop working prototype, refine with mentors, and present to judges.",
    points: [
      "Teams may develop their submitted ideas into a working prototype either before or during the hackathon.",
      "Teams must complete their prototype by incorporating the suggestions provided by the mentors and be ready to present it to the Judging Panel from the 6th hour of the hackathon onwards for final evaluation.",
      "The Judging Panel will evaluate each team based on the submitted idea, technical implementation, working prototype, and quality of the final presentation.",
      "The top three teams will be selected based on their overall performance in the final evaluation.",
    ],
  },
];

export const hackathonRules = [
  {
    no: "01",
    title: "College ID",
    desc: "College ID is mandatory for all participants.",
  },
  {
    no: "02",
    title: "Team Size",
    desc: "Each team must consist of 2–3 members.",
  },
  {
    no: "03",
    title: "Problem Statement",
    desc: "The problem statement will be announced on 9 September 2026.",
  },
  {
    no: "04",
    title: "Registration Deadline",
    desc: "Interested participants must register through the official online portal on or before 15 September 2026.",
  },
  {
    no: "05",
    title: "Idea Submission",
    desc: "Teams must submit their proposed solution as an A3-size abstract through the official online portal on or before 15 September 2026.\n\nA sample abstract format will be provided by the organizers.",
  },
  {
    no: "06",
    title: "Mandatory Requirement",
    desc: "Teams are required to bring a hard copy of the A3-size abstract submitted online to the offline hackathon as a mandatory requirement.",
  },
  {
    no: "07",
    title: "Offline Rounds",
    desc: "The offline hackathon consists of two rounds:\n\nRound 1: PPT-based idea presentation.\nRound 2: Technical development, prototype building, and final presentation.",
  },
  {
    no: "08",
    title: "Development Time",
    desc: "Teams must be ready to enter the judging panel from the 6th hour of the hackathon.",
  },
  {
    no: "09",
    title: "Final Evaluation",
    desc: "Judges will evaluate the idea, prototype, technical implementation, and presentation according to the official evaluation criteria.",
  },
  {
    no: "10",
    title: "Originality",
    desc: "The submitted idea and developed solution must be original.\n\nPlagiarism, copying, cheating, or unauthorized use of another team's work will result in disqualification.",
  },
  {
    no: "11",
    title: "Mentorship & Resources",
    desc: "Mentors may provide guidance, but the development and implementation must be done by the participating team.\n\nParticipants are responsible for their:\n• Devices\n• Software\n• Backups\n• Network connectivity\n\nVenue Wi-Fi will be provided, and personal mobile networks or dongles may be used as backup.",
  },
  {
    no: "12",
    title: "Winners & Certificates",
    desc: "The top three teams will receive First, Second, and Third Cash Prizes. Winner and Participation certificates will be provided to participants.",
  },
  {
    no: "13",
    title: "Jury Decision",
    desc: "The decision of the judging panel will be final and binding.",
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
import sparkoraGuidelinesPdf from "@/assets/SPARKORA GUIDELINES.pdf";
import sparkoraProblemStatementPdf from "@/assets/SPARKORA PROBLEM STATEMENT.pdf";

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
  {
    name: "Ms G PREETHI WILSON",
    designation: "AP, CS&BS",
    phone: "+91 8610301713",
    group: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Ms B LAKSHMI ROOPA",
    designation: "AP, CS&BS",
    phone: "+91 9985812700",
    group: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Ms A SINDHU DEVI",
    designation: "AP, CS&BS",
    phone: "+91 9176339602",
    group: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Ms B MALATHY",
    designation: "AP, CS&BS",
    phone: "+91 9677435875",
    group: "IE(I) CO-ORDINATOR",
  },
];

export const leadership = [
  { title: "HOD CS&BS", name: "Dr MAYA EAPEN" },
  { title: "DEAN STUDENT AFFAIRS", name: "Dr V JAMUNA" },
  { title: "PRINCIPAL", name: "Dr S SATHIYAMURTHY" },
];

// Replace with real handles when available.
export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/jerusalem_csbs?igsi=bnd4ZGZtZ244Ynhw",
  },
  { label: "LinkedIn", href: "#" },
];

export const nav = [
  { label: "HOME", to: "#top" },
  { label: "ABOUT", to: "#about" },
  { label: "DOMAINS", to: "#domains" },
  { label: "TIMELINE", to: "#timeline" },
  { label: "PRIZES", to: "#prizes" },
  { label: "ORGANIZERS", to: "#organizers" },
];
