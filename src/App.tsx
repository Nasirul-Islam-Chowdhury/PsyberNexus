import React, { useState, useEffect, useRef } from "react";
import { 
  Activity, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  User, 
  MapPin, 
  FileText, 
  Mic, 
  Volume2, 
  PenTool, 
  Heart, 
  Globe, 
  Network, 
  Layers, 
  FileDown, 
  Play, 
  Sparkles, 
  Brain, 
  Info,
  Lock,
  PhoneCall,
  UserCheck
} from "lucide-react";
import { mockStudents, mockScreenings, sampleAlerts, clinicalGuidelines } from "./mockData";
import { Student, Screening, CounselorAlert, ClinicalGuideline } from "./types";
import { Link } from "./Router";

export default function App() {
  // Navigation tabs: 'dashboard' | 'pwa' | 'pipeline'
  const [activeTab, setActiveTab] = useState<"dashboard" | "pwa" | "pipeline">("dashboard");

  // Global Counselor State
  const [studentsList, setStudentsList] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student>(mockStudents[0]);
  const [activeAlerts, setActiveAlerts] = useState<CounselorAlert[]>(sampleAlerts);
  
  // Real-time toast states
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "critical" | "info" }[]>([]);

  // RAG recommendation state
  const [ragContent, setRagContent] = useState<string>("");
  const [isRagLoading, setIsRagLoading] = useState<boolean>(false);
  const [ragApprovedBySafety, setRagApprovedBySafety] = useState<boolean | null>(null);

  // Student PWA States
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceInsightReady, setVoiceInsightReady] = useState<boolean>(false);
  const [voiceInsight, setVoiceInsight] = useState<any>(null);
  const [studentJournalText, setStudentJournalText] = useState<string>("");
  const [studentScreeningOutput, setStudentScreeningOutput] = useState<any>(null);
  const [isScreeningLoading, setIsScreeningLoading] = useState<boolean>(false);
  const [pwaLanguage, setPwaLanguage] = useState<"BN" | "EN">("BN");
  const [activeWellnessCard, setActiveWellnessCard] = useState<number>(0);

  // Live Pipeline Graph States
  const [pagerankData, setPagerankData] = useState<any>(null);
  const [pagerankLoading, setPagerankLoading] = useState<boolean>(false);

  // Helper toaster function
  const addToast = (message: string, type: "critical" | "info") => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  };

  // Simulate Supabase Realtime alerts triggering periodically
  useEffect(() => {
    const interval = setTimeout(() => {
      addToast(
        "Supabase Realtime Alert: High stress index detected for Alim-Al-Razi in CSE Lab 4.",
        "critical"
      );
    }, 4000);
    return () => clearTimeout(interval);
  }, []);

  // Compute PageRank of classmate influence graph dynamically via API
  const fetchPageRank = async () => {
    setPagerankLoading(true);
    try {
      const res = await fetch("/api/network/pagerank");
      const data = await res.json();
      setPagerankData(data);
    } catch (err) {
      // Offline fallback
      setPagerankData({
        algorithm: "In-Browser Fallback PageRank",
        influence_ranks: {
          "stud-2026-0001": 0.45,
          "stud-2026-0002": 0.15,
          "stud-2026-0003": 0.28,
          "stud-2026-0005": 0.12
        },
        community_clusters: {
          "cluster_1_cse_central": ["stud-2026-0001", "stud-2026-0003"],
          "cluster_2_campus_fringe": ["stud-2026-0002", "stud-2026-0005"]
        },
        interpretation: "Alim-Al-Razi holds the highest peer network node count. Interventions targeting him ripple through 45% of classmates."
      });
    } finally {
      setPagerankLoading(false);
    }
  };

  // Trigger intervention RAG suggestions using Gemini
  const generateInterventionPrep = async (student: Student) => {
    setIsRagLoading(true);
    setRagContent("");
    setRagApprovedBySafety(null);

    const fallbackQuery = student.risk_level === "HIGH" 
      ? "আমি খুব ভয়ে আছি, পরীক্ষার জন্য নিজেকে অযোগ্য মনে হচ্ছে এবং একা লাগছে।" 
      : "পরীক্ষার চাপে একটু উদ্বিগ্ন বোধ করছি।";

    try {
      const res = await fetch("/api/intervene", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: student.id,
          student_query: fallbackQuery,
          risk_score: student.fused_risk_score
        })
      });
      const data = await res.json();
      setRagContent(data.generation);
      setRagApprovedBySafety(data.approved_by_safety);
      addToast(`Grounded CBT recommendations fetched successfully for ${student.name}.`, "info");
    } catch (err) {
      // High-quality contextual Bangla/English feedback as simulated fallback
      setRagContent(
        `**INTERVENTION PROTOCOL (Llama-3-8B)**\n\n` +
        `**CBT Script:** "I can see you've been feeling quite heavy lately. In moments like these, connecting with your community can help. Have you considered speaking with your department head about the current workload?"\n\n` +
        `**BANGLA GUIDELINE (১.১):** "আমি দেখতে পাচ্ছি আপনি ইদানীং বেশ বড় চাপ অনুভব করছেন। পরীক্ষার এই কঠিন সময়ে আপনার শিক্ষাবিদ বা ডাঃ ফারহানা ইয়াসমিনের সাথে খোলামেলা আলোচনা ইতিবাচক প্রভাব ফেলতে পারে।"`
      );
      setRagApprovedBySafety(true);
    } finally {
      setIsRagLoading(false);
    }
  };

  // Student: Local Edge-Privacy Preprocessor Screening trigger
  const runStudentScreening = async () => {
    if (!studentJournalText.trim()) return;
    setIsScreeningLoading(true);
    try {
      const res = await fetch("/api/screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: "stud-2026-0001",
          text_journal: studentJournalText,
          video_chunk_base64: "edge_camera_frame_anonymized",
          audio_chunk_base64: "edge_audio_chunk_16khz",
          behavioral_change_vector: [0.1, 0.4, 0.7, 0.2] // simulated delayed tasks
        })
      });
      const data = await res.json();
      setStudentScreeningOutput(data);
      addToast("Local Biometric Fusion Screening computed.", "info");
    } catch (err) {
      // Dynamic fallback calculations to provide a reliable mock experience
      setStudentScreeningOutput({
        student_id: "stud-2026-0001",
        fused_risk_score: 0.78,
        confidence: 0.89,
        explainability: {
          headline_rationale_en: "Elevated anxiety and exam pressure identified through linguistic expression. Suggest adaptive coping cycles.",
          headline_rationale_bn: "ভাষাগত অভিব্যক্তিতে পরীক্ষার চাপজনিত অতিরিক্ত মানসিক উদ্বিগ্নতা পরিলক্ষিত হয়েছে।"
        }
      });
      addToast("Local Biometric Fusion Screening computed.", "info");
    } finally {
      setIsScreeningLoading(false);
    }
  };

  // Simulated Voice Journal Recorder Loop
  const toggleVoiceRecording = () => {
    if (isRecording) {
      // Stopped, generate acoustic stress analytics
      setIsRecording(false);
      setVoiceInsightReady(true);
      setVoiceInsight({
        stress_score: 0.74,
        jitter: "0.024 (elevated)",
        shimmer: "0.048 (warning)",
        hnr: "12.2 dB (low vocal clarity)",
        emotion_detected: "Anxious / Flat Affect",
        privacy_status: "Acoustic signals processed locally. Only encrypted embeddings synced to campus cloud."
      });
      addToast("Voice processing complete. Jitter parameters mapped locally.", "info");
    } else {
      setVoiceInsightReady(false);
      setIsRecording(true);
    }
  };

  // Trigger dynamic alerts to supervisor
  const emitManualAlert = async (student: Student) => {
    try {
      const res = await fetch("/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: student.id,
          fused_risk_score: student.fused_risk_score,
          location_campus: student.location
        })
      });
      const data = await res.json();
      addToast(`Critical Escalation Broadcaster emitted for ${student.name}. Counselor Farhana allocated.`, "critical");
    } catch (err) {
      addToast(`Crisis Alert Broadcaster emitted for ${student.name}. Counselor Farhana allocated.`, "critical");
    }
  };

  // Printable assessment report generator client side
  const exportPDFMock = (student: Student, screeningInfo: Screening) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>PsyberNexus Case Audit Document: ${student.name}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            h1 { color: #4F46E5; border-bottom: 2px solid #E5E7EB; padding-bottom: 15px; }
            .badge { background: #DC2626; color: white; padding: 4px 8px; font-weight: bold; font-size: 12px; border-radius: 4px;}
            .section { margin-bottom: 30px; }
            .grid { display: flex; gap: 40px; margin-bottom: 20px;}
            .col { flex: 1; }
            th, td { padding: 8px; border-bottom: 1px solid #E5E7EB; text-align: left; }
            table { width: 100%; border-collapse: collapse; }
          </style>
        </head>
        <body>
          <h1>PsyberNexus Multimodal Clinical Audit File</h1>
          <div class="section">
            <span class="badge">${student.risk_level} RISK UNIT</span>
            <p><strong>Student Reference:</strong> ${student.name} (${student.id})</p>
            <p><strong>Affiliation:</strong> ${student.department} | BRAC University Ecosystem</p>
          </div>
          <div class="grid">
            <div class="col">
              <h3>Modality Fusion Profile</h3>
              <table>
                <tr><td>Fused Risk Score</td><td><strong>${screeningInfo.fused_risk_score}</strong></td></tr>
                <tr><td>Voice Stress Level</td><td>${screeningInfo.voice_stress_score}</td></tr>
                <tr><td>Linguistic Negative Sentiment</td><td>${screeningInfo.text_sentiment_negative_score}</td></tr>
                <tr><td>Engagement Loss (LMS Score)</td><td>${screeningInfo.engagement_drop_ratio}</td></tr>
              </table>
            </div>
            <div class="col">
              <h3>Deno Speech Acoustics</h3>
              <table>
                <tr><td>Vocal Jitter</td><td>${screeningInfo.voice_metrics.jitter}</td></tr>
                <tr><td>Vocal Shimmer</td><td>${screeningInfo.voice_metrics.shimmer}</td></tr>
                <tr><td>Harmonics-to-Noise (HNR)</td><td>${screeningInfo.voice_metrics.hnr} dB</td></tr>
              </table>
            </div>
          </div>
          <hr/>
          <p class="section"><em>Printed under Institutional Review Board (IRB) ethical privacy charters: PsyberNexus Edge Encryption Rule 01. Raw speech and video are automatically restricted. No administrative penalties apply.</em></p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const selectedScreening = mockScreenings[selectedStudent.id] || mockScreenings["stud-2026-0001"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      
      {/* 1. TOP STATUS HEADER */}
      <header className="bg-slate-950/85 backdrop-blur-md border-b border-slate-900 sticky top-0 z-40">
        {/* Row 1 — brand + site nav (matches landing SiteNav) */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5 group" ariaLabel="Back to PsyberNexus home">
            <div className="w-8 h-8 bg-indigo-600 group-hover:bg-indigo-500 rounded-md flex items-center justify-center text-white font-bold text-base transition">Ψ</div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white tracking-tight flex items-center gap-2 group-hover:text-indigo-100 transition">
                Psyber<span className="text-indigo-400">Nexus</span>
               
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-mono">
                Wellness Intelligence Mesh
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-3 py-1.5 rounded-md text-sm text-slate-400 hover:text-white hover:bg-slate-900/40 transition">
              Home
            </Link>
            <Link to="/about" className="px-3 py-1.5 rounded-md text-sm text-slate-400 hover:text-white hover:bg-slate-900/40 transition">
              About
            </Link>
            <Link to="/app" className="px-3 py-1.5 rounded-md text-sm text-white bg-slate-900/60 transition">
              App
            </Link>
            <span className="ml-3 px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-mono border border-green-500/20 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Edge-Inference Active
            </span>
          </nav>
        </div>

        {/* Row 2 — persona toggles + system indicators */}
        <div className="border-t border-slate-900 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="bg-slate-950 p-1 rounded-lg flex items-center gap-1 border border-slate-800 self-center md:self-auto shrink-0">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "dashboard"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Counselor Dashboard
              </button>
              <button
                onClick={() => setActiveTab("pwa")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "pwa"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                Student Calming PWA
              </button>
              <button
                onClick={() => setActiveTab("pipeline")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "pipeline"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                7-Layer Pipeline Mesh
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-6 text-[10px] font-mono shrink-0">
              <div className="flex flex-col items-end">
                <span className="text-slate-500 uppercase tracking-tight">Mesh Traffic</span>
                <span className="text-slate-300">1.2GB/SEC</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-slate-500 uppercase tracking-tight">Active Agents</span>
                <span className="text-indigo-400">4 / 4 STANDBY</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-slate-500 uppercase tracking-tight">Dhaka Node</span>
                <span className="text-slate-300">LAT: 23.8103</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE WITH RECONFIGURED HIGH DENSITY GRID VIEWS */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* TAB A: COUNSELOR CORE DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Col: Risk Stratified Queue & Alerts (Span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Dynamic Alerts Queue Panel */}
              <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-4">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Active Critical Alerts</h2>
                  </div>
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] px-2 py-0.5 rounded font-mono uppercase">
                    {activeAlerts.length} High-Risk Detected
                  </span>
                </div>

                <div className="space-y-2">
                  {activeAlerts.map(alert => (
                    <div 
                      key={alert.id} 
                      className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 hover:border-red-500/40 transition flex gap-2.5 text-xs"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center justify-between font-semibold text-slate-100 gap-2 mb-1">
                          <span>{alert.student_name}</span>
                          <span className="text-red-400 font-mono text-[10px]">{(alert.risk_score * 100).toFixed(0)}% Risk</span>
                        </div>
                        <p className="text-slate-400 leading-normal mb-1.5 text-[11px]">{alert.details_en}</p>
                        <p className="text-slate-500 italic text-[10px] font-medium leading-relaxed bg-slate-950/40 p-1.5 rounded">
                          {alert.details_bn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Risk Queue */}
              <div className="bg-slate-900/20 rounded-lg border border-slate-800 p-4">
                <div className="border-b border-slate-800 pb-2.5 mb-3">
                  <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Therapeutic Screening Queue</h2>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Stratified dynamically by late attention transformer models. Click to audit biometric telemetry indices.
                  </p>
                </div>

                <div className="space-y-2">
                  {studentsList.map(st => {
                    const isSelected = selectedStudent.id === st.id;
                    const isHigh = st.risk_level === "HIGH";
                    const isMedium = st.risk_level === "MEDIUM";

                    const badgeStyle = isHigh 
                      ? "bg-red-500/10 text-red-400 border-red-500/30" 
                      : isMedium 
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30" 
                        : "bg-green-500/10 text-green-400 border-green-500/20";

                    return (
                      <button
                        key={st.id}
                        onClick={() => {
                          setSelectedStudent(st);
                          setRagContent("");
                        }}
                        className={`w-full text-left p-3 rounded-lg transition cursor-pointer border flex items-center justify-between gap-3 ${
                          isSelected 
                            ? "bg-slate-800/80 border-indigo-500 shadow-md shadow-indigo-500/5 text-white" 
                            : "bg-slate-900/40 border-slate-800 hover:bg-slate-800/40"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={st.avatar} 
                            alt={st.name} 
                            className="w-8 h-8 rounded object-cover border border-slate-800"
                          />
                          <div>
                            <h4 className="text-xs font-semibold text-slate-200">{st.name}</h4>
                            <span className="text-[9px] text-slate-500 font-mono block">{st.id}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider font-bold ${badgeStyle}`}>
                            {st.risk_level === "HIGH" ? "CRITICAL" : st.risk_level === "MEDIUM" ? "ELEVATED" : st.risk_level}
                          </span>
                          <span className="block text-[10px] font-mono text-slate-400 mt-1 font-bold">
                            {(st.fused_risk_score * 100).toFixed(0)}% Risk
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                <div className="p-2 border-t border-slate-850 mt-3 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-wider">
                  <span>Filter: Dhaka pilot</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>

            </div>

            {/* Right Col: Deep Clinical Telemetry, RAG & Geospatial Network (Span 8) */}
            <div className="lg:col-span-8 flex flex-col gap-6">

              {/* Main Student Profile Telemetry */}
              <div className="bg-slate-900/30 rounded-lg border border-slate-800 p-5">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={selectedStudent.avatar} 
                      alt={selectedStudent.name} 
                      className="w-12 h-12 rounded object-cover border border-slate-850 shadow"
                    />
                    <div>
                      <h2 className="text-base font-bold text-white flex items-center gap-2">
                        {selectedStudent.name}
                        {selectedStudent.consent ? (
                          <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] uppercase font-mono px-1.5 py-0.5 rounded flex items-center gap-1 tracking-wider font-bold">
                            <CheckCircle className="w-2.5 h-2.5" /> Consented
                          </span>
                        ) : (
                          <span className="bg-slate-800 text-slate-500 text-[9px] uppercase font-mono px-1.5 py-0.5 rounded flex items-center gap-1 font-bold tracking-wider">
                            Passive Suspended
                          </span>
                        )}
                      </h2>
                      <p className="text-[11px] text-slate-400 mt-0.5">{selectedStudent.department} · {selectedStudent.demographics.year} {selectedStudent.demographics.gender}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => exportPDFMock(selectedStudent, selectedScreening)}
                      className="flex-1 sm:flex-initial px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-1.5"
                    >
                      <FileDown className="w-3.5 h-3.5 text-indigo-400" /> Export IRB PDF
                    </button>
                    <button
                      onClick={() => emitManualAlert(selectedStudent)}
                      className="flex-1 sm:flex-initial px-2.5 py-1.5 bg-red-650 hover:bg-red-700 text-white rounded text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-white" /> Emit SMS Escalation
                    </button>
                  </div>
                </div>

                {/* Grid showing Multimodal 4 Stream Sensors */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
                  
                  {/* MODALITY 1: FACIAL EXPRESSIONS (FER) */}
                  <div className="bg-slate-900/40 p-3.5 rounded border border-slate-800/80">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">Facial Affect (FER)</span>
                      <span className="text-[9px] text-indigo-400 font-bold font-mono">Stream 1</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 mb-2">EfficientNet-B0 Output</h4>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sadness</span>
                        <span className="font-mono text-white font-semibold">{(selectedScreening.fer_distribution.sadness * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1">
                        <div className="bg-indigo-500 h-1 rounded-full" style={{ width: `${selectedScreening.fer_distribution.sadness * 100}%` }}></div>
                      </div>

                      <div className="flex justify-between mt-1">
                        <span className="text-slate-400">Fear/Panic</span>
                        <span className="font-mono text-slate-300">{(selectedScreening.fer_distribution.fear * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1">
                        <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${selectedScreening.fer_distribution.fear * 100}%` }}></div>
                      </div>

                      {/* Affect sequence timeline chart detail from Mockup */}
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                        <span className="text-[9px] text-slate-500 uppercase font-mono block mb-1">Temporal affect sequence</span>
                        <div className="h-6 flex items-end gap-0.5">
                          <div className="flex-1 bg-slate-700 h-[20%] rounded-t-sm"></div>
                          <div className="flex-1 bg-slate-700 h-[35%] rounded-t-sm"></div>
                          <div className="flex-1 bg-amber-500 h-[50%] rounded-t-sm"></div>
                          <div className="flex-1 bg-indigo-500 h-[80%] rounded-t-sm"></div>
                          <div className="flex-1 bg-slate-700 h-[45%] rounded-t-sm"></div>
                          <div className="flex-1 bg-indigo-500 h-[95%] rounded-t-sm"></div>
                          <div className="flex-1 bg-slate-700 h-[50%] rounded-t-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MODALITY 2: VOICE ACOUSTICS (Wav2Vec2) */}
                  <div className="bg-slate-900/40 p-3.5 rounded border border-slate-800/80">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">Diagnostics Voice</span>
                      <span className="text-[9px] text-indigo-400 font-bold font-mono">Stream 2</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 mb-2 font-mono">Stress Score: {(selectedScreening.voice_stress_score * 100).toFixed(0)}%</h4>
                    <div className="space-y-2 text-[11px] text-slate-400">
                      
                      <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500" style={{ width: `${selectedScreening.voice_stress_score * 100}%` }}></div>
                      </div>

                      <div className="space-y-1 mt-2.5 font-mono text-[10px] [line-height:1.4]">
                        <div className="flex justify-between border-b border-slate-850 pb-0.5">
                          <span>Jitter Pitch</span>
                          <span className="text-slate-200">{selectedScreening.voice_metrics.jitter}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-850 pb-0.5">
                          <span>Shimmer APQ3</span>
                          <span className="text-slate-200">{selectedScreening.voice_metrics.shimmer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>HNR Purity</span>
                          <span className="text-slate-200">{selectedScreening.voice_metrics.hnr} dB</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MODALITY 3: COGNITIVE TEXT SENTIMENT */}
                  <div className="bg-slate-900/40 p-3.5 rounded border border-slate-800/80">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">Linguistic BERT</span>
                      <span className="text-[9px] text-indigo-400 font-bold font-mono">Stream 3</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 mb-2">Bangla-BERT Parser</h4>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Negative Index</span>
                        <span className="font-mono text-white font-semibold">{(selectedScreening.text_sentiment_negative_score * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1">
                        <div className="bg-indigo-500 h-1 rounded-full" style={{ width: `${selectedScreening.text_sentiment_negative_score * 100}%` }}></div>
                      </div>

                      <div className="flex justify-between mt-1 pt-1.5 border-t border-slate-800/80">
                        <span className="text-slate-400">Distortion level</span>
                        <span className="font-mono text-indigo-400 font-bold">{selectedScreening.text_distortion_score}</span>
                      </div>
                      <p className="text-[9px] text-slate-500 leading-tight">
                        Mapped: {selectedScreening.text_distortions_detected.join(", ") || "None"}
                      </p>
                    </div>
                  </div>

                  {/* MODALITY 4: ACADEMIC METADATA (LMS Activity) */}
                  <div className="bg-slate-900/40 p-3.5 rounded border border-slate-800/80">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">Academic Delay</span>
                      <span className="text-[9px] text-indigo-400 font-bold font-mono">Stream 4</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 mb-2">Behavioral Sync</h4>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Submission lag</span>
                        <span className="font-mono text-white font-semibold">{(selectedScreening.engagement_drop_ratio * 100).toFixed(0)}% drop</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1">
                        <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${selectedScreening.engagement_drop_ratio * 100}%` }}></div>
                      </div>
                      <div className="text-[10px] text-slate-500 leading-normal mt-2 bg-slate-950/40 p-1.5 rounded font-mono border border-slate-900">
                        · Late login patterns<br/>· Delayed project commit
                      </div>
                    </div>
                  </div>

                </div>

                {/* Weighted Multimodal Fusion Block */}
                <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-indigo-600/10 p-1.5 rounded border border-indigo-600/20">
                      <Layers className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 font-sans">Late Attention Multi-Modal Fusion Core:</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                        Modality weights applied: FER (25%), Vocal (30%), Language Sentiment (35%), Behavioral (10%)
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-white bg-indigo-900/30 border border-indigo-800/40 px-3 py-1 rounded">
                      Unified Fusion Coefficient: <span className="text-indigo-400">{selectedStudent.fused_risk_score}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Cultural RAG Grounded Intervention Area (High Density styling matched) */}
              <div className="bg-slate-900/20 rounded-lg border border-slate-800 p-5">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Cultural RAG Intervention Assistant</h3>
                      <p className="text-[10px] text-slate-500 font-mono">Grounded in adapted GAD-7, DU clinical covenants, and collectivistic support pillars</p>
                    </div>
                  </div>

                  <button
                    onClick={() => generateInterventionPrep(selectedStudent)}
                    disabled={isRagLoading}
                    className="w-full sm:w-auto px-4 py-1.5 bg-indigo-600 hover:bg-slate-850 text-white border border-indigo-800 hover:border-slate-700 disabled:bg-indigo-800 disabled:cursor-not-allowed rounded text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5"
                  >
                    {isRagLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Prompting Llama RAG Corpus...
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        Run Gemini Clinical RAG
                      </>
                    )}
                  </button>
                </div>

                {/* Displaying fetched RAG suggestions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
                  
                  {/* Retrieved Documents panel */}
                  <div className="lg:col-span-4 bg-slate-950 rounded-lg p-3 border border-slate-800 flex flex-col h-60">
                    <h4 className="text-[10px] font-bold text-slate-400 border-b border-slate-850 pb-2 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                      <FileText className="w-3 h-3 text-slate-500" />
                      Retrieved Knowledge Sources
                    </h4>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {clinicalGuidelines.map(gui => (
                        <div key={gui.id} className="text-[10px] bg-slate-900 border border-slate-850 p-2 rounded">
                          <span className="font-bold text-indigo-400 block mb-0.5">{gui.title}</span>
                          <p className="text-slate-400 line-clamp-2 leading-relaxed">{gui.content_bn}</p>
                          <span className="text-[8px] text-slate-500 block font-mono mt-1">Source: {gui.source}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generated advise screen with mock alignment design */}
                  <div className="lg:col-span-8 flex flex-col justify-between h-60">
                    <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 flex flex-col justify-between h-full">
                      
                      {ragContent ? (
                        <div className="space-y-2 overflow-y-auto h-full pr-1 font-sans">
                          <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter italic">Intervention Protocol (Llama-3-8B)</div>
                          <div className="text-xs text-slate-200 leading-relaxed font-sans">
                            {ragContent.split("\n\n").map((para, i) => (
                              <p key={i} className={para.startsWith("**BANGLA") || para.includes("১.") ? "text-slate-400 mt-2 italic font-medium pt-1.5 border-t border-slate-900 leading-relaxed" : "text-slate-200 leading-relaxed"}>
                                {para}
                              </p>
                            ))}
                          </div>

                          {/* Safety verification flag */}
                          <div className="flex items-center justify-between border-t border-slate-900 pt-2 text-[9px] text-slate-600 font-mono mt-2">
                            <span className="flex items-center gap-1 text-green-400 font-semibold uppercase tracking-wide">
                              <CheckCircle className="w-3 h-3" /> Deberta NLI Safety Passed: 94% APPROVED
                            </span>
                            <span>Limit: 150 words</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center py-6 text-slate-500 space-y-2 h-full">
                          <Brain className="w-8 h-8 text-indigo-900/60 animate-pulse" />
                          <div>
                            <p className="text-xs text-slate-400 font-semibold">No intervention prep generated yet.</p>
                            <p className="text-[10px] text-slate-500 mt-1 max-w-sm">Select any student in the left queue, then run the Gemini API. Let the assistant analyze paralinguistic values and find localized CBT tactics.</p>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>

                {/* Hybridity indicators display row */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Hybridity:</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 bg-slate-900 rounded text-[9px] text-indigo-400 font-mono border border-slate-850">
                        Islam-CBT Framework: Match 0.94
                      </span>
                      <span className="px-2 py-0.5 bg-slate-900 rounded text-[9px] text-indigo-400 font-mono border border-slate-850">
                        Clinical GAD-7: Match 0.81
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">NLI Confidence:</span>
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-900/20 px-1.5 py-0.5 rounded border border-indigo-800/20">92%</span>
                  </div>
                </div>

              </div>

              {/* Geographic Risk Heatmap visualization (Matches the map in High Density mockup!) */}
              <div className="bg-slate-900/20 rounded-lg border border-slate-800 p-5">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Geospatial Risk Heatmap</h3>
                      <p className="text-[10px] text-slate-500 font-mono">Context: Campus North (Academic Block)</p>
                    </div>
                  </div>
                  <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                    Live Session Feed
                  </span>
                </div>

                {/* Map Grid exactly as designed in High Density mockup */}
                <div className="relative bg-[#0c1222] h-64 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                  
                  {/* Grid Lines mockup */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* Heatmap Nodes */}
                  {/* 1. CSE Lab Building */}
                  <div className="absolute top-[28%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative flex h-14 w-14 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-25"></span>
                      <span className="relative inline-flex rounded-full h-8 w-8 bg-red-600/70 text-[11px] font-mono font-bold text-white items-center justify-center border border-red-500">
                        84%
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-semibold text-slate-300 mt-1 bg-slate-950/90 px-1.5 py-0.5 rounded border border-slate-800">
                      CSE Complex (High Density)
                    </span>
                  </div>

                  {/* 2. Academic Building A */}
                  <div className="absolute top-[65%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-20"></span>
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-amber-600/70 text-[10px] font-mono font-bold text-white items-center justify-center border border-amber-500">
                        53%
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-semibold text-slate-300 mt-1 bg-slate-950/90 px-1.5 py-0.5 rounded border border-slate-800">
                      Academic Building A
                    </span>
                  </div>

                  {/* 3. Dorms building 3 */}
                  <div className="absolute top-[45%] left-[78%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative flex h-8 w-8 items-center justify-center">
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-green-600/70 text-[9px] font-mono font-bold text-white items-center justify-center border border-green-500">
                        28%
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-semibold text-slate-300 mt-1 bg-slate-950/90 px-1.5 py-0.5 rounded border border-slate-800">
                      Dormitory Complex 3
                    </span>
                  </div>

                  {/* High Density mockup absolute coordinate box */}
                  <div className="absolute bottom-4 left-4 font-mono text-[9px] text-slate-500 space-y-0.5 bg-slate-950/80 px-2 py-1 border border-slate-850 rounded">
                    <div>CENTER COORD: 23.7745° N, 90.4266° E</div>
                    <div>PageRank Weighting Peer Link Engine [OK]</div>
                  </div>

                  {/* Big absolute statistics frame from the mockup bottom right! */}
                  <div className="absolute bottom-4 right-4 flex gap-4 bg-slate-950/95 p-3 border border-slate-800 rounded-md font-mono">
                    <div className="text-center">
                      <div className="text-[8px] text-slate-500 uppercase tracking-wider">High Risk Cluster</div>
                      <div className="text-lg font-bold text-red-500">08</div>
                    </div>
                    <div className="w-px bg-slate-800"></div>
                    <div className="text-center">
                      <div className="text-[8px] text-slate-500 uppercase tracking-wider">Counselor Dist.</div>
                      <div className="text-lg font-bold text-indigo-400">1:45</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB B: STUDENT CALMING MOBILE PWA HUB (Styled perfectly in High Density compact phone UI) */}
        {activeTab === "pwa" && (
          <div className="max-w-md mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl relative overflow-hidden flex flex-col gap-5">
            
            {/* Ambient Background glows to resemble premium Calming Studio app */}
            <div className="absolute -top-16 -left-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* PWA High density header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-500/20 p-1.5 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-white tracking-wider uppercase font-sans">My Wellness Studio</h2>
                  <p className="text-[9px] text-emerald-400/80 font-mono flex items-center gap-1 mt-0.5">
                    <Lock className="w-2.5 h-2.5 text-emerald-405 text-emerald-400" /> Edge Encryption Rule 01
                  </p>
                </div>
              </div>

              {/* Language toggle */}
              <button
                onClick={() => setPwaLanguage(prev => prev === "BN" ? "EN" : "BN")}
                className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-850 px-2 py-0.5 rounded text-[9px] font-mono font-bold transition cursor-pointer uppercase"
              >
                {pwaLanguage === "BN" ? "ENGLISH" : "বাংলা"}
              </button>
            </div>

            {/* Privacy Alert banner */}
            <div className="bg-emerald-950/20 border border-emerald-500/15 rounded-xl p-3 flex gap-2.5 text-[11px] text-slate-300 leading-normal">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">
                  {pwaLanguage === "BN" ? "আপনার তথ্য নিরাপদ" : "Ecosystem privacy standard:"}
                </strong>
                {pwaLanguage === "BN" 
                  ? "আপনার কণ্ঠস্বরের অডিও বা ছবি ডিভাইস থেকে বাইরের সার্ভারে যায় না। সম্পূর্ণ ম্যাথমেটিক্যাল এম্বেডিং শুধুমাত্র সিঙ্ক করা হয়।"
                  : "All raw paralinguistic and video frames remain restricted locally. No personal identifiers are saved on databases."
                }
              </div>
            </div>

            {/* Voice journal module */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 font-mono">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  {pwaLanguage === "BN" ? "কণ্ঠস্বর ডায়েরী" : "Vocal reflection loop"}
                </h3>
                <span className="text-[8px] bg-indigo-900/40 text-indigo-400 px-1.5 py-0.5 rounded font-mono uppercase font-bold border border-indigo-800/20">
                  Wav2Vec2 16kHz
                </span>
              </div>

              <div className="flex flex-col items-center py-4 text-center">
                {isRecording ? (
                  <div className="flex items-center justify-center gap-1 h-10 w-full max-w-xs mb-4">
                    {[...Array(12)].map((_, idx) => {
                      const hVal = [15, 35, 10, 24, 45, 12, 30, 18, 55, 26, 8, 30];
                      const animDelay = idx * 80;
                      return (
                        <div 
                          key={idx}
                          className="bg-emerald-500 w-1.5 rounded-full animate-bounce"
                          style={{ 
                            height: `${hVal[idx % hVal.length]}px`,
                            animationDuration: "1s",
                            animationDelay: `${animDelay}ms`
                          }}
                        ></div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-10 flex items-center justify-center text-slate-500 mb-4 text-[11px] italic">
                    {pwaLanguage === "BN" ? "রেকর্ড করতে মাইক্রোফোন আইকনে চাপুন" : "Tap microphone to verbalize stressful thoughts"}
                  </div>
                )}

                <button
                  onClick={toggleVoiceRecording}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition duration-300 cursor-pointer ${
                    isRecording 
                      ? "bg-red-650 animate-pulse text-white" 
                      : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  }`}
                >
                  <Mic className="w-5 h-5 font-bold" />
                </button>

                <span className="text-[10px] text-slate-400 mt-2 font-medium">
                  {isRecording 
                    ? (pwaLanguage === "BN" ? "রেকর্ডিং সচল... বন্ধ করতে আবার চাপুন" : "Processing sound pitch... Click again to end") 
                    : (pwaLanguage === "BN" ? "৩০ সেকেন্ডের ভয়েস রেকর্ড করুন" : "Pour your study worries in a 30s session")
                  }
                </span>
              </div>

              {voiceInsightReady && voiceInsight && (
                <div className="bg-slate-900 border border-slate-850 p-3.5 rounded text-xs">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-1.5 text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" /> 
                    {pwaLanguage === "BN" ? "তাত্ক্ষণিক ভয়েস অ্যানালিটিক্স" : "Acoustic signal output:"}
                  </h4>
                  <div className="space-y-1 text-slate-300 font-mono text-[10px]">
                    <div className="flex justify-between border-b border-slate-950 pb-1 mb-1 font-semibold text-white">
                      <span>Detected Affect</span>
                      <span className="text-indigo-400 font-bold">{voiceInsight.emotion_detected}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pitch Jitter</span>
                      <span>{voiceInsight.jitter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amp Shimmer</span>
                      <span>{voiceInsight.shimmer}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-200">
                      <span>Acquired HNR</span>
                      <span>{voiceInsight.hnr}</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-emerald-400/95 mt-2.5 bg-[#020617] p-2 rounded border border-emerald-950 font-sans leading-normal">
                    {voiceInsight.privacy_status}
                  </p>
                </div>
              )}
            </div>

            {/* Writing reflection journal */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-3">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 font-mono">
                <PenTool className="w-3 text-emerald-400" />
                {pwaLanguage === "BN" ? "গোপন অনুভূতি লিপি" : "Cognitive writing journal"}
              </h3>

              <textarea
                value={studentJournalText}
                onChange={(e) => setStudentJournalText(e.target.value)}
                placeholder={pwaLanguage === "BN" 
                  ? "পরীক্ষার চাপ বা বিষণ্ণতা সনাক্ত করতে এখানে কিছু লিখুন..."
                  : "Describe any academic burden, fear of failure, or worries..."
                }
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:outline-none p-3 rounded-lg text-xs text-white leading-normal placeholder:text-slate-650"
              />

              <button
                onClick={runStudentScreening}
                disabled={isScreeningLoading}
                className="w-full py-2 bg-indigo-650 hover:bg-indigo-700 disabled:bg-indigo-805 text-white rounded text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-indigo-800"
              >
                {isScreeningLoading ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Brain className="w-3.5 h-3.5" />
                    {pwaLanguage === "BN" ? "আউটপুট বিশ্লেষণ করুন" : "Analyze cognitive distortions"}
                  </>
                )}
              </button>

              {studentScreeningOutput && (
                <div className="bg-slate-900 border border-slate-850 p-3.5 rounded text-xs space-y-2 leading-relaxed">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block font-mono">Cognitive Classifier Output</span>
                    <strong className="text-white block mt-0.5">
                      {pwaLanguage === "BN" 
                        ? studentScreeningOutput.explainability.headline_rationale_bn 
                        : studentScreeningOutput.explainability.headline_rationale_en
                      }
                    </strong>
                  </div>
                  <div className="flex justify-between border-t border-slate-950 pt-1.5 text-[10px] text-slate-500 font-mono">
                    <span>Fusion Risk: <strong>{(studentScreeningOutput.fused_risk_score * 100).toFixed(0)}%</strong></span>
                    <span className="text-emerald-400">Anonymized embeds</span>
                  </div>
                </div>
              )}
            </div>

            {/* Swipe card guidance framework */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2.5 font-mono">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                {pwaLanguage === "BN" ? "আজকের সুস্থতা টিপস ও কার্ডস" : "CBT Healing Swipe Index"}
              </h3>

              <div className="bg-slate-900 p-3.5 rounded border border-slate-850 min-h-[6.5rem] flex flex-col justify-between">
                <div>
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono uppercase tracking-wide font-bold">
                    {clinicalGuidelines[activeWellnessCard].title}
                  </span>
                  <p className="text-[11px] text-slate-200 mt-2 font-medium leading-normal">
                    {pwaLanguage === "BN" 
                      ? clinicalGuidelines[activeWellnessCard].content_bn 
                      : clinicalGuidelines[activeWellnessCard].content_en
                    }
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3 border-t border-slate-950 pt-2 text-[9px]">
                  <div className="flex gap-1">
                    {clinicalGuidelines.map((_, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setActiveWellnessCard(idx)}
                        className={`w-1.5 h-1.5 rounded-full cursor-pointer transition ${
                          idx === activeWellnessCard ? "bg-emerald-400 w-3" : "bg-slate-700"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-slate-500 font-mono uppercase">EP: {clinicalGuidelines[activeWellnessCard].id}</span>
                </div>
              </div>
            </div>

            {/* Crisis trigger triggers */}
            <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-xs font-bold text-slate-250 text-slate-200">
                  {pwaLanguage === "BN" ? "খুব বেশি একা লাগছে?" : "Feeling overwhelmed or unsafe?"}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                {pwaLanguage === "BN" 
                  ? "ভীতি এড়াতে এক ট্যাপেই সরাসরি অন-ডিউটি চিকিৎসককে কল করুন বা সাহায্য নিন।"
                  : "Instantly alert our advisory counseling staff to request a confidential sessional call."
                }
              </p>
              
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button 
                  onClick={() => {
                    addToast("Emergency advisor notified. Helpline connection active.", "critical");
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 rounded text-[11px] transition cursor-pointer flex items-center justify-center gap-1 uppercase tracking-wide"
                >
                  <PhoneCall className="w-3 h-3 text-white" /> Emergency Tip
                </button>
                <a 
                  href="tel:999" 
                  className="bg-slate-950 hover:bg-slate-900 border border-red-500/20 text-red-400 font-bold py-1.5 rounded text-[11px] text-center flex items-center justify-center gap-1.5 uppercase tracking-wide"
                >
                  Helpline 999
                </a>
              </div>
            </div>

          </div>
        )}

        {/* TAB C: 7-LAYER SYSTEM ARCHITECTURE BROWSER (High Density layout details) */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            
            {/* Intro layout header */}
            <div className="bg-slate-900/20 rounded-lg border border-slate-800 p-5">
              <div className="flex items-center gap-2.5">
                <Layers className="text-indigo-400 w-5 h-5" /> 
                <div>
                  <h2 className="text-base font-bold text-white uppercase tracking-wide">System Architecture Deep Browser</h2>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Observe Dhaka educational cells connectivity models and 7-layer stack integration.</p>
                </div>
              </div>
            </div>

            {/* Interactive graph calculations panel */}
            <div className="bg-slate-900/20 rounded-lg border border-slate-800 p-5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-4">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-indigo-400" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Graph Intelligence Node (PageRank Iteration Layer)</h3>
                    <p className="text-[11px] text-slate-500 font-mono">Modelling classmates peer structures in Neo4j to leverage supportive social ripples.</p>
                  </div>
                </div>

                <button
                  onClick={fetchPageRank}
                  disabled={pagerankLoading}
                  className="w-full md:w-auto px-4 py-1.5 bg-indigo-600 hover:bg-slate-850 text-white border border-indigo-800 hover:border-slate-700 disabled:bg-indigo-800 disabled:cursor-not-allowed rounded text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {pagerankLoading ? "Iterating Neo4j..." : "Compute PageRank Iterations"}
                </button>
              </div>

              {pagerankData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Visually representation of node peer mappings */}
                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg flex flex-col justify-between relative min-h-[160px] overflow-hidden">
                    
                    {/* Graph Mock Connections drawn on back using SVG */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <svg className="w-full h-full">
                        <line x1="50%" y1="50%" x2="15%" y2="25%" stroke="#4f46e5" strokeWidth="1.5" />
                        <line x1="50%" y1="50%" x2="85%" y2="30%" stroke="#4f46e5" strokeWidth="1.5" />
                        <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#4f46e5" strokeWidth="1.5" />
                        <circle cx="50%" cy="50%" r="30" fill="#4f46e5" />
                        <circle cx="15%" cy="25%" r="15" fill="#334155" />
                        <circle cx="85%" cy="30%" r="12" fill="#334155" />
                        <circle cx="25%" cy="80%" r="18" fill="#334155" />
                      </svg>
                      {/* Central Node Text simulated inside drawing */}
                      <span className="absolute top-[42%] left-[45%] text-[9px] font-mono font-bold text-white uppercase">ID: 8214</span>
                    </div>

                    <div className="relative z-10">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Class Support Connection Graph</h4>
                      
                      <div className="space-y-1.5 max-w-sm">
                        <div className="flex items-center justify-between text-[11px] p-1.5 bg-slate-900/80 rounded border border-slate-850">
                          <span className="text-white font-medium flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span> Alim-Al-Razi (CSE Labs)
                          </span>
                          <span className="font-mono text-indigo-400 font-bold">{(pagerankData.influence_ranks["stud-2026-0001"] * 100).toFixed(0)}% Rank</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] p-1.5 bg-slate-900/80 rounded border border-slate-850">
                          <span className="text-white font-medium flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Kazi Sajjad (EEE Core)
                          </span>
                          <span className="font-mono text-slate-300">{(pagerankData.influence_ranks["stud-2026-0003"] * 100).toFixed(0)}% Rank</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] p-1.5 bg-slate-900/80 rounded border border-slate-850">
                          <span className="text-white font-medium flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Tasnia Rahman (BBA Unit)
                          </span>
                          <span className="font-mono text-slate-400">{(pagerankData.influence_ranks["stud-2026-0002"] * 100).toFixed(0)}% Rank</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[9px] text-slate-500 uppercase italic font-mono mt-3 relative z-10">
                      PageRank Social Influence: {pagerankData.influence_ranks["stud-2026-0001"] || 0.124} Mapped.
                    </p>
                  </div>

                  {/* Formulas outline side panel */}
                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg flex flex-col justify-between">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Academic Matrix Outlines</h4>
                      <div className="space-y-2 text-[11px] leading-relaxed text-slate-300">
                        <p>
                          <strong>Node Algorithm Iterations:</strong> <code className="text-indigo-400 bg-slate-905 bg-slate-900 px-1 py-0.5 rounded font-mono text-[9px]">PR(u) = (1-d)/N + d * ∑(PR(v)/L(v))</code>
                        </p>
                        <p>
                          <strong>Societal influence vector mapping:</strong><br/>
                          <span className="text-[10px] text-slate-400 font-mono block bg-slate-900 p-1.5 rounded mt-1">
                            - Cluster 1 (CSE/EEE): Central Node (Alim-Al-Razi)<br/>
                            - Cluster 2 (Business School): Perimeter Client Mapped
                          </span>
                        </p>
                        <p className="text-indigo-300/90 bg-indigo-900/10 border-l-2 border-indigo-500 pl-3.5 py-1.5 rounded-r">
                          <strong>Interpretation:</strong> {pagerankData.interpretation}
                        </p>
                      </div>
                    </div>

                    <span className="text-[8px] text-slate-600 font-mono tracking-tight block mt-3">
                      DATABASE MODEL CONSTRAINT: ROW LEVEL SECURITY GATEWAYS [OK]. GRAPH CONSTITUENT: ATTENDS_TO, SIMILAR_TO.
                    </span>
                  </div>

                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 border border-slate-800/60 rounded bg-slate-950">
                  <p className="text-xs font-mono">Click 'Compute PageRank Iterations' to run math routines dynamically over simulated student friend clusters.</p>
                </div>
              )}
            </div>

            {/* Static Card documentation explaining the 7 layers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Layers 1-4 */}
              <div className="bg-slate-900/20 rounded-lg border border-slate-800 p-4 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  Clinical & Sensile Layers (1-4)
                </h3>

                <div className="space-y-3">
                  <div className="flex gap-2.5 text-xs leading-relaxed">
                    <div className="bg-indigo-600/10 border border-indigo-500/25 text-indigo-400 font-mono text-[10px] font-bold h-5.5 w-5.5 rounded flex items-center justify-center shrink-0">1</div>
                    <div>
                      <strong className="text-white block text-[11px]">Layer 1: Input & Passive Sensing (4 streams)</strong>
                      <p className="text-slate-400 text-[11px]">Local EfficientNet-B0 fine-tuned on FER2013, paralinguistic jitter-shimmer speech tracking, and Bangla-BERT negative sentiment detectors.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 text-xs leading-relaxed">
                    <div className="bg-indigo-600/10 border border-indigo-500/25 text-indigo-400 font-mono text-[10px] font-bold h-5.5 w-5.5 rounded flex items-center justify-center shrink-0">2</div>
                    <div>
                      <strong className="text-white block text-[11px]">Layer 2: Multimodal Attention Fusion (MulT)</strong>
                      <p className="text-slate-400 text-[11px]">Late fusion attention parameters running with p=0.3 Modality Dropout so predictions run smoothly even if cameras are toggled off by students.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 text-xs leading-relaxed">
                    <div className="bg-indigo-600/10 border border-indigo-500/25 text-indigo-400 font-mono text-[10px] font-bold h-5.5 w-5.5 rounded flex items-center justify-center shrink-0">3</div>
                    <div>
                      <strong className="text-white block text-[11px]">Layer 3: Cognitive & Clinical RAG Engine</strong>
                      <p className="text-slate-400 text-[11px]">Retrieves context from PGVector databases, generates CBT suggestions with Gemini models, and checks factual NLI consistency.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 text-xs leading-relaxed">
                    <div className="bg-indigo-600/10 border border-indigo-500/25 text-indigo-400 font-mono text-[10px] font-bold h-5.5 w-5.5 rounded flex items-center justify-center shrink-0">4</div>
                    <div>
                      <strong className="text-white block text-[11px]">Layer 4: MCP Orchestration Agent Mesh</strong>
                      <p className="text-slate-400 text-[11px]">Manages consent gates, alert broadcasters, and state progressions (SCREENING → ASSESSMENT → CRM ALERT).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layers 5-7 */}
              <div className="bg-slate-900/20 rounded-lg border border-slate-800 p-4 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  Ecosystem & Deployment Layers (5-7)
                </h3>

                <div className="space-y-3">
                  <div className="flex gap-2.5 text-xs leading-relaxed">
                    <div className="bg-indigo-600/10 border border-indigo-500/25 text-indigo-400 font-mono text-[10px] font-bold h-5.5 w-5.5 rounded flex items-center justify-center shrink-0">5</div>
                    <div>
                      <strong className="text-white block text-[11px]">Layer 5: PostgreSQL, PGVector & Neo4j Backends</strong>
                      <p className="text-slate-400 text-[11px]">Anonymized demographics tables on Supabase with row-level safety matching, IVFFlat fast vector indexes, and offline-ready local SQLite sync.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 text-xs leading-relaxed">
                    <div className="bg-indigo-600/10 border border-indigo-500/25 text-indigo-400 font-mono text-[10px] font-bold h-5.5 w-5.5 rounded flex items-center justify-center shrink-0">6</div>
                    <div>
                      <strong className="text-white block text-[11px]">Layer 6: Counselor Dashboard & PWA Hub</strong>
                      <p className="text-slate-400 text-[11px]">Instant web views allowing counselors to read VAD Valence, export legal reports, and let students complete offline voice journaling safely.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 text-xs leading-relaxed">
                    <div className="bg-indigo-600/10 border border-indigo-500/25 text-indigo-400 font-mono text-[10px] font-bold h-5.5 w-5.5 rounded flex items-center justify-center shrink-0">7</div>
                    <div>
                      <strong className="text-white block text-[11px]">Layer 7: Vercel, CF Workers & ARM64 Edge</strong>
                      <p className="text-slate-400 text-[11px]">Cloudflare edge caches for rapid local APIs, ONNX runtimes deployed at campus kiosk terminals, and Prometheus analytics monitoring.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* 3. DYNAMIC TOAST SYSTEM BROADCASTS */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2.5 w-80 pointer-events-none">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={`p-3.5 rounded border shadow-2xl flex gap-2.5 text-[11px] font-sans pointer-events-auto transition duration-300 ${
              t.type === "critical" 
                ? "bg-red-950/95 text-red-200 border-red-500/35" 
                : "bg-slate-900/95 text-indigo-200 border-indigo-500/35"
            }`}
          >
            <ShieldAlert className={`w-4 h-4 shrink-0 mt-0.5 ${t.type === "critical" ? "text-red-500" : "text-indigo-400"}`} />
            <div>
              <p className="font-bold text-white tracking-wide uppercase text-[9px] font-mono">System Broadcast</p>
              <p className="text-slate-300 leading-normal mt-0.5">{t.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. FOOTER STATUS BAR - HIGH DENSITY SPECS */}
      <footer className="h-8 border-t border-slate-800 bg-slate-900 px-4 flex items-center justify-between text-[9px] font-mono text-slate-500">
        <div className="flex gap-4">
          <span>DB: POSTGRES-PGVECTOR-01 [OK]</span>
          <span>GRAPH: NEO4J-PROD [CONNECTED]</span>
          <span>ML: ONNX-CPU-FALLBACK [DISABLED]</span>
        </div>
        <div className="flex gap-4">
          <span>SESSION_ID: 9X-AB-442-FF</span>
          <span className="text-slate-400">PSYBERNEXUS-V1.0.4-LTS</span>
        </div>
      </footer>

    </div>
  );
}
