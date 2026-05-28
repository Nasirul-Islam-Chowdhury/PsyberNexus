import {
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Network,
  ChevronRight,
  Globe,
  Leaf,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "../Router";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import {
  HeroIllustration,
  StudentIllustration,
  CounselorIllustration,
} from "../components/Illustrations";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-600 selection:text-white">
      <SiteNav current="home" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.14),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.06),transparent_55%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-7">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              AI-Native · Multimodal · Edge-Private
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight text-white leading-[1.05]">
              Mental wellness intelligence
              <span className="block font-display italic font-normal text-indigo-300 mt-1">
                for educational ecosystems.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl text-pretty">
              PsyberNexus detects, maps, and supports student well-being through multimodal AI —
              without compromising privacy or cultural context. Built for high-stigma,
              resource-constrained schools, ready for the world.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/app"
                className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-md font-semibold text-sm transition shadow-lg shadow-indigo-500/20"
              >
                Launch the Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-200 px-5 py-3 rounded-md font-semibold text-sm transition"
              >
                Read the story
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-7 border-t border-slate-900">
              <Stat label="Modality Streams" value="4" />
              <Stat label="Architecture Layers" value="7" />
              <Stat label="Privacy" value="Edge-First" />
              <Stat label="Languages" value="EN · বাংলা" />
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-indigo-950/40 bg-slate-950">
              <HeroIllustration className="w-full h-auto block" />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/30 via-transparent to-transparent pointer-events-none" />
            </div>

            <FloatingBadge
              position="-bottom-4 -left-4"
              accent="emerald"
              label="Privacy"
              value="On-device biometrics"
              icon={<Shield className="w-3.5 h-3.5 text-emerald-400" />}
            />
            <FloatingBadge
              position="-top-4 -right-4"
              accent="indigo"
              label="Engine"
              value="MulT · Bangla-BERT"
              icon={<Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
            />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-mono">
            Aligned with
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-slate-400 font-mono uppercase tracking-wider">
            <span>BRAC University Pilot</span>
            <span className="text-slate-700">·</span>
            <span>Dhaka University Clinical Psychology</span>
            <span className="text-slate-700">·</span>
            <span>National Helpline 999 / 109</span>
            <span className="text-slate-700">·</span>
            <span>IRB Ethics Charter</span>
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="py-20 lg:py-28 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <Eyebrow>Why we exist</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mt-3">
              Care before crisis.{" "}
              <span className="font-display italic font-normal text-slate-400">Always.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PillarCard
              icon={<Leaf className="w-4 h-4 text-emerald-400" />}
              tag="Our Mission"
              tagAccent="text-emerald-400"
              accentBg="bg-emerald-500/10 border-emerald-500/20"
              body={
                <>
                  Transform educational institutions into proactive mental wellness ecosystems
                  through AI-native multimodal intelligence that detects, understands, and supports
                  student mental health{" "}
                  <strong className="text-white">before crises occur</strong> — eliminating the
                  silence created by stigma, scarcity, and missing early-intervention systems.
                </>
              }
            />
            <PillarCard
              icon={<Globe className="w-4 h-4 text-indigo-400" />}
              tag="Our Vision"
              tagAccent="text-indigo-400"
              accentBg="bg-indigo-500/10 border-indigo-500/20"
              body={
                <>
                  A world where every institution is a safe, intelligent, emotionally aware
                  ecosystem — where mental health is{" "}
                  <strong className="text-white">predictive, preventive, and personalized</strong>.
                  PsyberNexus aims to become the global standard for culturally adaptive AI mental
                  health infrastructure.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20 lg:py-28 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mt-3">
              Four pillars. One intelligence mesh.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Capability
              icon={<Shield className="w-4 h-4" />}
              tag="Layer 01"
              title="Edge-First Privacy"
              body="Raw face frames and audio waveforms never leave the device. Only anonymized mathematical embeddings sync to the campus cloud."
            />
            <Capability
              icon={<Layers className="w-4 h-4" />}
              tag="Layer 02"
              title="Multimodal Fusion"
              body="Cross-modal attention transformer (MulT) with Modality Dropout p=0.3 — keeps working if cameras or microphones are disabled."
            />
            <Capability
              icon={<Sparkles className="w-4 h-4" />}
              tag="Layer 03"
              title="Cultural RAG"
              body="Grounded in adapted Bangla CBT scripts, South Asian collectivist frameworks, and Islamic resilience cards — safety-vetted."
            />
            <Capability
              icon={<Network className="w-4 h-4" />}
              tag="Layer 04"
              title="Graph PageRank"
              body="Neo4j peer support meshes routed through PageRank — find influential class leaders and optimize counselor outreach."
            />
          </div>
        </div>
      </section>

      {/* TWO AUDIENCES */}
      <section className="py-20 lg:py-28 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <Eyebrow>Two surfaces, one mesh</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mt-3">
              Calm for students. Clarity for counselors.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <AudienceCard
              illustration={<StudentIllustration className="w-full h-full" />}
              eyebrow="For Students"
              eyebrowAccent="text-emerald-400"
              title="A Calming Mobile PWA"
              points={[
                "Voice & text journaling, processed on-device",
                "Bilingual interface · বাংলা / English toggle",
                "Anonymous wellness insights — no diagnosis",
                "One-tap crisis support to counselor & helpline",
              ]}
            />
            <AudienceCard
              illustration={<CounselorIllustration className="w-full h-full" />}
              eyebrow="For Counselors"
              eyebrowAccent="text-indigo-400"
              title="A High-Density Console"
              points={[
                "Risk-stratified screening queue with audit trail",
                "Multimodal telemetry — FER, voice, text, behavioral",
                "Culturally grounded RAG intervention assistant",
                "Geospatial heatmap & PageRank peer routing",
              ]}
            />
          </div>
        </div>
      </section>

      {/* 7-LAYER ARCHITECTURE */}
      <section className="py-20 lg:py-28 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <Eyebrow>The architecture</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mt-3">
              Seven layers — sensor to deployment.
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/20">
            {LAYERS.map((l, i) => (
              <div
                key={l.n}
                className={`grid grid-cols-[auto_auto_1fr] items-center gap-5 px-6 py-5 hover:bg-slate-900/40 transition ${
                  i < LAYERS.length - 1 ? "border-b border-slate-900" : ""
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
                  Layer 0{l.n}
                </span>
                <span className="w-px h-7 bg-slate-800" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                  <strong className="text-sm font-semibold text-white">{l.title}</strong>
                  <span className="text-xs text-slate-500 font-mono">{l.sub}</span>
                </div>
              </div>
            ))}
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
              <Eyebrow>Ready to see it work</Eyebrow>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white tracking-tight mt-3 max-w-2xl leading-tight">
                Experience the{" "}
                <span className="font-display italic font-normal text-indigo-200">live</span>{" "}
                multimodal mesh.
              </h2>
              <p className="text-slate-400 mt-5 max-w-xl leading-relaxed">
                Explore the counselor dashboard, student PWA, and live pipeline graph — every
                interaction respects edge privacy and human-in-the-loop oversight.
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
                  to="/about"
                  className="inline-flex items-center gap-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-200 px-5 py-3 rounded-md font-semibold text-sm transition"
                >
                  Learn more
                </Link>
              </div>

              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-mono mt-10">
                PsyberNexus does not diagnose · Human counselors stay in the loop · IRB-aligned
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

const LAYERS = [
  { n: 1, title: "Input & Passive Sensing", sub: "MTCNN · Wav2Vec2 · Bangla-BERT · LMS vectors" },
  { n: 2, title: "Multimodal Attention Fusion", sub: "MulT cross-modal · Modality Dropout p=0.3" },
  { n: 3, title: "AI Intelligence Engine", sub: "PGVector Cultural RAG + Gemini · NLI safety" },
  { n: 4, title: "MCP Agent Orchestration", sub: "Screening · Crisis · Intervention · Analytics" },
  { n: 5, title: "Backend & Storage", sub: "PostgreSQL 15 · PGVector IVFFlat · Neo4j · SQLite" },
  { n: 6, title: "Frontend Workspace", sub: "Counselor Dashboard · Student Calming PWA" },
  { n: 7, title: "CI/CD & Edge Deployment", sub: "Vercel · Cloudflare · ARM64 kiosks · Prometheus" },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-400">
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="text-base font-semibold text-white mt-1 font-mono tabular-nums">{value}</div>
    </div>
  );
}

function FloatingBadge({
  position,
  label,
  value,
  icon,
}: {
  position: string;
  accent: "emerald" | "indigo";
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div
      className={`absolute ${position} bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 shadow-xl shadow-black/40 flex items-center gap-2.5`}
    >
      {icon}
      <div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-mono">{label}</div>
        <div className="text-[11px] font-semibold text-slate-200">{value}</div>
      </div>
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

function Capability({
  icon,
  tag,
  title,
  body,
}: {
  icon: ReactNode;
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/30 p-6 hover:border-indigo-500/30 hover:bg-slate-900/50 transition">
      <div className="flex items-center justify-between mb-5">
        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-500/20 transition">
          {icon}
        </div>
        <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-slate-600">
          {tag}
        </span>
      </div>
      <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
    </article>
  );
}

function AudienceCard({
  illustration,
  eyebrow,
  eyebrowAccent,
  title,
  points,
}: {
  illustration: ReactNode;
  eyebrow: string;
  eyebrowAccent: string;
  title: string;
  points: string[];
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden hover:border-indigo-500/30 transition group">
      <div className="aspect-[16/10] bg-slate-950 border-b border-slate-800 overflow-hidden flex items-center justify-center">
        {illustration}
      </div>
      <div className="p-7 space-y-4">
        <div className={`text-[10px] font-mono uppercase tracking-[0.25em] ${eyebrowAccent}`}>
          {eyebrow}
        </div>
        <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
        <ul className="space-y-2.5">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <ChevronRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
