import {
  ArrowRight,
  Leaf,
  Globe,
  AlertTriangle,
  Heart,
  Activity,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "../Router";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-600 selection:text-white">
      <SiteNav current="about" />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <Eyebrow>About</Eyebrow>
          <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05] mt-4">
            Rethinking mental wellness{" "}
            <span className="font-display italic font-normal text-slate-400">in education.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mt-6 max-w-2xl text-pretty">
            PsyberNexus Core is an AI-native multimodal mental health intelligence platform —
            built for high-stigma, resource-constrained ecosystems and designed to scale globally.
          </p>
        </div>
      </section>

      {/* ABOUT BODY */}
      <section className="py-20 lg:py-28 border-b border-slate-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-6 text-[15px] text-slate-300 leading-[1.75] text-pretty">
          <p>
            PsyberNexus Core transforms educational institutions into proactive mental wellness
            ecosystems. The platform combines{" "}
            <strong className="text-white">
              facial emotion recognition, voice stress analysis, Bangla natural language
              processing, behavioral analytics, and graph-based reasoning
            </strong>{" "}
            to identify mental health risks before crises occur.
          </p>
          <p>
            Unlike traditional systems that rely on self-reporting and reactive intervention,
            PsyberNexus uses{" "}
            <strong className="text-white">passive multimodal sensing</strong> and culturally
            adaptive AI to provide early detection and intelligent intervention routing — while
            maintaining strict privacy through an edge-first architecture.
          </p>
          <p>
            The Cultural RAG Engine is grounded in Bangla clinical resources and localized
            counseling frameworks, ensuring emotionally and culturally relevant support.
            Counselors gain real-time wellness intelligence dashboards, geospatial risk
            analytics, and AI-assisted intervention tools — improving response time, resource
            allocation, and student outcomes.
          </p>
          <p>
            Through lightweight edge computing and offline-first synchronization, PsyberNexus
            stays accessible even in low-bandwidth environments. By merging multimodal AI,
            ethical privacy-preserving infrastructure, and localized mental health intelligence,
            PsyberNexus aims to redefine preventive mental healthcare and establish a{" "}
            <strong className="text-white">scalable global model</strong>.
          </p>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="py-20 lg:py-28 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <Eyebrow>Mission & Vision</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mt-3">
              Care before crisis.{" "}
              <span className="font-display italic font-normal text-slate-400">
                Globally accessible.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PillarCard
              icon={<Leaf className="w-4 h-4 text-emerald-400" />}
              tag="🌿 Our Mission"
              tagAccent="text-emerald-400"
              accentBg="bg-emerald-500/10 border-emerald-500/20"
              body={
                <>
                  Transform educational institutions into proactive mental wellness ecosystems by
                  using AI-native multimodal intelligence that detects, understands, and supports
                  student mental health before crises occur. PsyberNexus Core aims to eliminate
                  the silence created by stigma, resource scarcity, and lack of early
                  intervention systems — ensuring{" "}
                  <strong className="text-white">no student's suffering goes unnoticed</strong>.
                </>
              }
            />
            <PillarCard
              icon={<Globe className="w-4 h-4 text-indigo-400" />}
              tag="🌍 Our Vision"
              tagAccent="text-indigo-400"
              accentBg="bg-indigo-500/10 border-indigo-500/20"
              body={
                <>
                  Build a world where every educational institution becomes a safe, intelligent,
                  emotionally aware ecosystem — where mental health is{" "}
                  <strong className="text-white">predictive, preventive, and personalized</strong>.
                  PsyberNexus envisions becoming the global standard for culturally adaptive AI
                  mental health infrastructure.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="py-20 lg:py-28 border-b border-slate-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-14">
          <div className="max-w-2xl">
            <Eyebrow>Project Milestones</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mt-3">
              From kickoff to{" "}
              <span className="font-display italic font-normal text-indigo-300">BuildFest</span>{" "}
              demo.
            </h2>
            <p className="text-slate-400 mt-5 text-pretty">
              Ten weeks. Seven layers. One end-to-end mesh — assembled in milestones.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-slate-800" />
            <ol className="space-y-7">
              {MILESTONES.map((m, i) => (
                <li key={i} className="grid grid-cols-[18px_1fr] gap-5 relative">
                  <div
                    className={`mt-1.5 w-4 h-4 rounded-full ${
                      m.major
                        ? "bg-indigo-500 ring-4 ring-indigo-500/15"
                        : "bg-slate-700 ring-2 ring-slate-900"
                    }`}
                  />
                  <div className="pb-1">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 mb-1">
                      {m.date}
                    </div>
                    <div className="text-base font-semibold text-white">{m.title}</div>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* USER MANUAL */}
      <section className="py-20 lg:py-28 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <Eyebrow>User Manual</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mt-3">
              Two interfaces.{" "}
              <span className="font-display italic font-normal text-slate-400">One mesh.</span>
            </h2>
            <p className="text-slate-400 mt-5">
              PsyberNexus analyzes multimodal signals — facial expression, voice, text, and
              behavior — to detect early signs of distress and support timely, human-led
              intervention.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ManualCard
              icon={<Heart className="w-4 h-4 text-emerald-400" />}
              accentBg="bg-emerald-500/10 border-emerald-500/20"
              tag="Student Guide"
              tagAccent="text-emerald-400"
              title="Wellness App"
              sections={[
                {
                  h: "Login & Access",
                  items: ["Secure login using institutional credentials (student ID / email)"],
                },
                {
                  h: "Home Dashboard",
                  items: [
                    "Basic emotional reflection summary",
                    "Optional mood insights (non-diagnostic)",
                    "AI-generated wellness suggestions",
                  ],
                },
                {
                  h: "Voice & Text Journals",
                  items: [
                    "Record voice or write entries",
                    "AI analyzes tone & sentiment passively",
                    "Always optional — no mandatory input",
                  ],
                },
                {
                  h: "Crisis Support",
                  items: [
                    "One-tap emergency button",
                    "Direct access to counselor or helpline",
                    "Works in low-bandwidth environments",
                  ],
                },
                {
                  h: "Privacy Control",
                  items: [
                    "Camera / mic / text permissions per session",
                    "Raw biometrics processed on-device when possible",
                    "Only anonymized insights are shared",
                  ],
                },
              ]}
            />
            <ManualCard
              icon={<Activity className="w-4 h-4 text-indigo-400" />}
              accentBg="bg-indigo-500/10 border-indigo-500/20"
              tag="Counselor Guide"
              tagAccent="text-indigo-400"
              title="Dashboard"
              sections={[
                {
                  h: "Risk Monitoring Panel",
                  items: ["Students ranked: Low · Medium · High · Critical"],
                },
                {
                  h: "Student Profiles",
                  items: [
                    "Emotional trend tracking",
                    "Voice & text stress signals",
                    "Behavioral engagement patterns",
                  ],
                },
                {
                  h: "AI Support Insights",
                  items: [
                    "Culturally grounded intervention suggestions",
                    "Context-aware counseling summaries",
                    "Bangla & local cultural adaptation",
                  ],
                },
                {
                  h: "Campus Insights",
                  items: [
                    "Heatmap of psychological risk clusters",
                    "Identifies high-stress zones across campus",
                  ],
                },
                {
                  h: "Alerts",
                  items: [
                    "Real-time high-risk notifications",
                    "AI-generated context summaries for counselors",
                  ],
                },
              ]}
            />
          </div>

          {/* SYSTEM BEHAVIOR */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-8">
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500 mb-5">
              System Behavior Summary
            </div>
            <ul className="grid sm:grid-cols-2 gap-4 text-sm text-slate-300">
              {[
                "Multimodal AI fuses facial, voice, text & behavioral data",
                "Generates unified mental health risk scores",
                "Graph-based reasoning for contextual insights",
                "Edge-first processing & anonymized sync",
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTE */}
      <section className="py-16 border-b border-slate-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 flex gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
                Important
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                PsyberNexus Core is an{" "}
                <strong className="text-white">early-warning and support system only</strong>. It
                does not replace clinical diagnosis. Final decisions remain with human counselors.
                The platform enables institutions to move from reactive care to proactive,
                AI-assisted wellbeing intelligence — ensuring early intervention, cultural
                sensitivity, and privacy-first design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 p-10 lg:p-16 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <Eyebrow>See it in action</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white tracking-tight mt-3 max-w-2xl leading-tight">
                Explore the{" "}
                <span className="font-display italic font-normal text-indigo-200">live</span>{" "}
                multimodal mesh.
              </h2>
              <p className="text-slate-400 mt-5 max-w-xl leading-relaxed">
                Step into the counselor dashboard, the calming student PWA, and the 7-layer
                pipeline browser.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/app"
                  className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-md font-semibold text-sm transition shadow-lg shadow-indigo-500/20"
                >
                  Launch the Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-200 px-5 py-3 rounded-md font-semibold text-sm transition"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

const MILESTONES = [
  { date: "1 April 2026", title: "Project Kickoff", body: "Team alignment, scope finalization, and milestone planning begins.", major: true },
  { date: "5 April 2026", title: "System Architecture Freeze (v1)", body: "Final 7-layer architecture defined with edge-cloud + multimodal design.", major: true },
  { date: "10 April 2026", title: "Foundation Setup Complete", body: "Dataset collection starts, repo initialized, UI wireframes and tech stack finalized." },
  { date: "15 April 2026", title: "Data Pipeline Ready", body: "Preprocessing pipelines for facial, voice, text, and behavioral data established." },
  { date: "20 April 2026", title: "Initial Model Training Begins", body: "Early training of FER, Wav2Vec2 voice stress, and Bangla-BERT models." },
  { date: "25 April 2026", title: "Baseline AI Models Completed", body: "Single-modality models achieve baseline performance metrics." },
  { date: "1 May 2026", title: "Multimodal Dataset Alignment", body: "Synchronization of facial, voice, and text signals into unified format." },
  { date: "5 May 2026", title: "AI Model Phase Complete", body: "Individual AI models finalized with evaluation reports.", major: true },
  { date: "8 May 2026", title: "Fusion Model Development Starts", body: "Cross-modal attention system and temporal alignment pipeline initiated." },
  { date: "12 May 2026", title: "Risk Scoring Engine v1", body: "Initial multimodal risk prediction model integrated (XGBoost + deep fusion)." },
  { date: "15 May 2026", title: "Multimodal Intelligence Completed", body: "Unified risk scoring system achieves stable inference performance.", major: true },
  { date: "16 May 2026", title: "Cultural RAG System Begins", body: "Bangla clinical corpus, CBT frameworks, and Islamic counseling data embedded." },
  { date: "19 May 2026", title: "Graph Database Integration Starts", body: "Neo4j relationships built between students, counselors, and institutions." },
  { date: "23 May 2026", title: "Cognitive Routing System Complete", body: "Graph-based intervention recommendation engine fully functional." },
  { date: "24 May 2026", title: "Full Platform Integration Starts", body: "Frontend, backend, AI models, and edge systems begin integration." },
  { date: "27 May 2026", title: "Real-Time Dashboard Working", body: "Counselor dashboard and student wellness app connected to live AI system." },
  { date: "29 May 2026", title: "End-to-End MVP Alpha Complete", body: "Fully functional system (AI + UI + backend + edge sync) achieved.", major: true },
  { date: "30 May 2026", title: "Preliminary Submission Deadline", body: "Final documentation, architecture diagrams, KPIs, and demo video submitted.", major: true },
  { date: "2 June 2026", title: "MVP Optimization Phase Begins", body: "Latency reduction, model tuning, and system stability improvements." },
  { date: "6 June 2026", title: "Stress Testing & Load Simulation", body: "10K+ student simulation testing for performance and reliability." },
  { date: "10 June 2026", title: "Final MVP Freeze", body: "Production-ready version locked; only bug fixes allowed.", major: true },
  { date: "12 June 2026", title: "Final BuildFest Demo", body: "Live demonstration of PsyberNexus Core: full multimodal pipeline, dashboards, intervention system.", major: true },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-400">
      {children}
    </div>
  );
}

function PillarCard({
  icon,
  tag,
  tagAccent,
  accentBg,
  body,
}: {
  icon: ReactNode;
  tag: string;
  tagAccent: string;
  accentBg: string;
  body: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8 hover:border-indigo-500/30 transition">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${accentBg}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-mono uppercase tracking-[0.22em] ${tagAccent}`}>
          {tag}
        </span>
      </div>
      <p className="text-slate-300 leading-relaxed">{body}</p>
    </article>
  );
}

function ManualCard({
  icon,
  accentBg,
  tag,
  tagAccent,
  title,
  sections,
}: {
  icon: ReactNode;
  accentBg: string;
  tag: string;
  tagAccent: string;
  title: string;
  sections: { h: string; items: string[] }[];
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/30 p-7 lg:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${accentBg}`}>
          {icon}
        </div>
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-[0.22em] ${tagAccent}`}>
            {tag}
          </div>
          <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
        </div>
      </div>

      <div className="space-y-5">
        {sections.map((s, i) => (
          <div key={i}>
            <div className="text-xs font-semibold text-slate-200 mb-2">{s.h}</div>
            <ul className="space-y-1.5">
              {s.items.map((it, j) => (
                <li key={j} className="flex items-start gap-2 text-[13px] text-slate-400">
                  <span className="text-slate-700 mt-1">•</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
