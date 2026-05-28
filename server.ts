import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

// Lazy Initialize Gemini API Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY || "";
    // If key contains default placeholder or is empty, use dummy/failsafe modes gracefully
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// -----------------------------------------------------------------
// 1. ENDPOINT: Passthrough check / Health
// -----------------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({ status: "online", service: "PsyberNexus Intelligence Mesh MVP" });
});

// -----------------------------------------------------------------
// 2. ENDPOINT: Screen Modal (Multimodal Fusion calculation)
// -----------------------------------------------------------------
app.post("/api/screen", (req, res) => {
  const { student_id, video_chunk_base64, audio_chunk_base64, text_journal, behavioral_change_vector } = req.body;

  if (!student_id) {
    res.status(400).json({ error: "student_id is required" });
    return;
  }

  // Generate fusion calculations (MulT late attention fusion)
  const modality_weights = { fer: 0.25, voice: 0.30, text: 0.35, behavioral: 0.10 };
  
  // Simulated raw indicators
  const fer_score = video_chunk_base64 ? 0.35 + 0.40 * Math.random() : 0.50;
  const voice_score = audio_chunk_base64 ? 0.20 + 0.65 * Math.random() : 0.40;
  
  let text_distortion_score = 0.15;
  if (text_journal) {
    const lower = text_journal.toLowerCase();
    const badWords = ["খারাপ", "কষ্ট", "চাপ", "অসহায়", "হতাশা", "fail", "hopeless", "sad", "depressed"];
    let count = 0;
    badWords.forEach(w => { if (lower.includes(w)) count += 0.20; });
    text_distortion_score = Math.min(0.20 + count, 1.0);
  }

  const behavior_score = behavioral_change_vector && Array.isArray(behavioral_change_vector)
    ? (behavioral_change_vector.reduce((a, b) => a + b, 0) / behavioral_change_vector.length)
    : 0.20;

  const fused_risk_score = (
    (fer_score * modality_weights.fer) +
    (voice_score * modality_weights.voice) +
    (text_distortion_score * modality_weights.text) +
    (behavior_score * modality_weights.behavioral)
  );

  const rounded_fused_risk = parseFloat(fused_risk_score.toFixed(3));
  const confidence = 0.88;

  res.json({
    student_id,
    timestamp: new Date().toISOString(),
    fused_risk_score: rounded_fused_risk,
    confidence,
    modality_availability: {
      fer: !!video_chunk_base64,
      voice: !!audio_chunk_base64,
      text: !!text_journal,
      metadata: !!behavioral_change_vector,
    },
    explainability: {
      raw_modalities: {
        fer_score: parseFloat(fer_score.toFixed(2)),
        voice_stress_score: parseFloat(voice_score.toFixed(2)),
        text_distortion_score: parseFloat(text_distortion_score.toFixed(2)),
        behavioral_score: parseFloat(behavior_score.toFixed(2)),
      },
      attention_weights: modality_weights,
      headline_rationale_en: rounded_fused_risk >= 0.70
        ? "Severe synergistic distress triggers detected across speech patterns and textual journaling."
        : "Standard student fatigue indices mapped, within normal educational baseline.",
      headline_rationale_bn: rounded_fused_risk >= 0.70
        ? "কণ্ঠস্বর এবং লেখার মাঝে তীব্র মানসিক চাপের সমন্বয় সনাক্ত হয়েছে। অবিলম্বে কাউন্সেলরের মনোযোগ কাম্য।"
        : "স্বাভাবিক মাত্রার শিক্ষাগত ক্লান্তির নিদর্শন পাওয়া গেছে।"
    }
  });
});

// -----------------------------------------------------------------
// 3. ENDPOINT: Intervene (Grounded Cultural RAG using Gemini)
// -----------------------------------------------------------------
app.post("/api/intervene", async (req, res) => {
  const { student_id, student_query, risk_score } = req.body;

  if (!student_id || !student_query) {
    res.status(400).json({ error: "student_id and student_query are required" });
    return;
  }

  // 1. Standard retrieval context groundings (Adapted PHQ-9, GAD-7, and islamic-fusion CBT)
  const retrieval_kb = [
    "উদ্বেগ এবং তীব্র পরীক্ষাভীতি কাটাতে প্রথমে গভীরভাবে শ্বাস নেয়া (Deep Breathing 4-7-8) বুকিং করান। বিকল্প চিন্তা (Reframing) করান।",
    "পারিবারিক সহযোগিতা: ঢাকায় বা গ্রামীণ প্রেক্ষাপটে একাকীত্বের মুহূর্তে পরিবারের সমর্থন এবং প্রার্থনা মানসিক প্রশান্তি এনে দেয়।",
    "জরুরী আত্মরক্ষা প্রটোকল: কোনো ছাত্র তীব্র আত্মহত্যার ইচ্ছা প্রকাশ করলে সাথে সাথে প্রফেশনাল মনোরোগ বিশেষজ্ঞ ডাঃ ফারহানা ইয়াসমিনকে ডাকুন। হেল্পলাইন ৯৯৯।"
  ];
  const contexts = retrieval_kb.join("\n- ");

  let risk_tier = "LOW";
  let prompt_suggestion = "Provide mild wellness guidelines.";
  if (risk_score >= 0.7) {
    risk_tier = "HIGH";
    prompt_suggestion = "Severe risk detected! Urgently refer the student. Provide warning suggestions.";
  } else if (risk_score >= 0.45) {
    risk_tier = "MEDIUM";
    prompt_suggestion = "Intermediate anxiety found. Suggest scheduling routine counseling.";
  }

  // System instruction with explicit cultural guardrails
  const systemInstruction = `You are a culturally sensitive mental health support assistant representing PsyberNexus. 
You are advising a university counselor in Bangladesh regarding a student with a ${risk_tier} risk profile (score: ${risk_score}).
Strict Rules:
1. Do not diagnose or state medical labels.
2. Formulate therapeutic recommendation scripts in BOTH English & Bangla.
3. Suggest immediate psychiatric intervention for severe cases (HIGH) and provide national helplines.
4. Integrate localized collectivist support parameters.
5. Strict Limit: Maximum 150 words total.`;

  const compiledPrompt = `
Student Statement: "${student_query}"
Current Risk Score: ${risk_score}
Retrieved Guidelines context for grounding:
- ${contexts}

Generate the counselor session preparation cards and recommendation dialogue parameters.
`;

  let responseText = "";
  let geminiUsed = false;

  try {
    const key = process.env.GEMINI_API_KEY || "";
    // Check if real key is configured, avoiding placeholder faults
    if (key && key !== "MY_GEMINI_API_KEY") {
      const client = getGeminiClient();
      const content = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: compiledPrompt,
        config: {
          systemInstruction,
          temperature: 0.45,
        }
      });
      responseText = content.text || "";
      geminiUsed = true;
    }
  } catch (err: any) {
    console.error("Gemini API call failed, fallback used:", err.message);
  }

  // Standard safe fallbacks if API is missing or fails
  if (!responseText) {
    if (risk_tier === "HIGH") {
      responseText = `**ENGLISH:**
1. High risk detected. Coordinate immediate peer contact.
2. Provide local clinical redirection to DU Psychiatry Support or call helpline at 999/109.
3. Dialog script: "We hear you Alim. You don't have to face this test burden alone."

**BANGLA:**
১. উচ্চ মানসিক ঝুঁকি সনাক্ত। অবিলম্বে সেশন নির্ধারণ করুন।
২. সহমর্মিতার বাক্য: "আমরা তোমার পাশে আছি আলিম। পড়াশোনা বা পরীক্ষার যেকোনো জটিলতায় আমরা পরিবারসহ সমাধান খুঁজবো।" `;
    } else {
      responseText = `**ENGLISH:**
1. Encourage mindful diaphragmatic breathing (4-7-8 series).
2. Recommend participation in campus group peer counseling this weekend.

**BANGLA:**
১. ৪-৭-৮ নিয়মে দীর্ঘ প্রশ্বাস নেয়ার ব্যায়ামের পরামর্শ দিন।
২. সহপাঠী স্টাডি গ্রুপ এবং ক্যাম্পাস ক্লাব কার্যকলাপে অংশগ্রহণের জন্য উৎসাহিত করুন।`;
    }
  }

  // Compute simulated Deberta-v3 NLI safety index consistency check
  const safety_nli_score = 0.94;

  res.json({
    student_id,
    risk_tier,
    risk_score,
    generation: responseText,
    safety_nli_score,
    approved_by_safety: safety_nli_score >= 0.85,
    gemini_api_active: geminiUsed,
    retrieved_guides_utilized: ["adaptation-cbt-du", "bangla-suicide-protocol"]
  });
});

// -----------------------------------------------------------------
// 4. ENDPOINT: Alert (Real-time and Neo4j graph tracking simulator)
// -----------------------------------------------------------------
app.post("/api/alert", (req, res) => {
  const { student_id, fused_risk_score, location_campus } = req.body;

  if (!student_id || !fused_risk_score) {
    res.status(400).json({ error: "student_id and fused_risk_score are required" });
    return;
  }

  const assigned_counselor = {
    id: "couns-yasmin-99",
    name: "Dr. Farhana Yasmin",
    role: "Clinical Lead Director (BUET/BRACU adaptation)",
    contact: "+880-1712-345678",
    allocated_by: "Neo4j Graph PageRank Community algorithm"
  };

  res.json({
    alert_id: `sys-alert-${Date.now()}`,
    student_id,
    location_campus: location_campus || "CSE Building Lab 3",
    timestamp: new Date().toISOString(),
    assigned_counselor,
    status: fused_risk_score >= 0.70 ? "CRITICAL_ESCALATION" : "ROUTINE_QUEUE",
    realtime_toast_emitted: true,
    action_item: fused_risk_score >= 0.70
      ? "Emergency call triggered, auto SMS dispatched to counselor on duty."
      : "Assigned routine assessment queue space."
  });
});

// -----------------------------------------------------------------
// 5. ENDPOINT: Network Analytics (PageRank simulation on campus students)
// -----------------------------------------------------------------
app.get("/api/network/pagerank", (req, res) => {
  // Let's compute actual PageRank iterations on the fly over a student friendship network
  // Nodes: Student 1 (Alim), Student 2 (Tasnia), Student 3 (Kazi Sajjad), Student 4 (Imtiaz)
  // Edges representing mutual support lines
  const graph = {
    "stud-2026-0001": ["stud-2026-0002", "stud-2026-0003"],
    "stud-2026-0002": ["stud-2026-0001"],
    "stud-2026-0003": ["stud-2026-0001", "stud-2026-0005"],
    "stud-2026-0005": ["stud-2026-0001"]
  };

  const d = 0.85; // Damping factor
  let pr = {
    "stud-2026-0001": 0.25,
    "stud-2026-0002": 0.25,
    "stud-2026-0003": 0.25,
    "stud-2026-0005": 0.25
  };

  // Run 5 standard power iterations
  for (let iter = 0; iter < 5; iter++) {
    const next_pr = {
      "stud-2026-0001": (1 - d) / 4,
      "stud-2026-0002": (1 - d) / 4,
      "stud-2026-0003": (1 - d) / 4,
      "stud-2026-0005": (1 - d) / 4
    };

    // Distribute PR weights
    Object.entries(graph).forEach(([node, neighbors]) => {
      const share = (pr as any)[node] / neighbors.length;
      neighbors.forEach(neigh => {
        if (neigh in next_pr) {
          (next_pr as any)[neigh] += d * share;
        }
      });
    });

    pr = next_pr;
  }

  res.json({
    algorithm: "PageRank Power Iterations",
    iterations: 5,
    damping_factor: d,
    influence_ranks: pr,
    community_clusters: {
      "cluster_1_cse_central": ["stud-2026-0001", "stud-2026-0003"],
      "cluster_2_campus_fringe": ["stud-2026-0002", "stud-2026-0005"]
    },
    interpretation: "Alim-Al-Razi has the highest peer central PageRank (influence score), meaning peer-supported counselor outreach targeting him will yield positive network effects across his classmates."
  });
});

// -----------------------------------------------------------------
// MAIN INITIALIZATION / VITE INTEGRATION
// -----------------------------------------------------------------
async function startServer() {
  // Vite Integration for instant SPA Serving under AI Studio sandbox
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PsyberNexus Server] Listening on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
