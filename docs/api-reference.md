# PsyberNexus API Core Specifications
All endpoints enforce input validation, Deno TS schema compatibility, and standard Rate Limiting (100 req/min/user).

## 1. POST /api/screen
Evaluates parallel biometrics and computes late attention fusion.

### Request Body
```json
{
  "student_id": "stud-2026-0001",
  "text_journal": "আমি খুব চাপে আছি পরীক্ষার কারণে।",
  "video_chunk_base64": "edge_camera_frame_anonymized",
  "audio_chunk_base64": "edge_audio_chunk_16khz"
}
```

### Response
```json
{
  "student_id": "stud-2026-0001",
  "fused_risk_score": 0.84,
  "confidence": 0.88,
  "explainability": {
    "raw_modalities": {
      "fer_score": 0.72,
      "voice_stress_score": 0.79,
      "text_distortion_score": 0.88
    },
    "headline_rationale_bn": "কণ্ঠস্বর এবং লেখার মাঝে তীব্র মানসিক চাপের সমন্বয় সনাক্ত হয়েছে।"
  }
}
```

## 2. POST /api/intervene
Applies Localized Guidance and crawls PGVector guidelines to generate session prep cards.

### Request Body
```json
{
  "student_id": "stud-2026-0001",
  "student_query": "পরীক্ষায় আমি সবসময় ফেল করবো মনে হয়।",
  "risk_score": 0.84
}
```

### Response
```json
{
  "risk_tier": "HIGH",
  "generation": "১১. বিকল্প চিন্তাভাবনা: পরীক্ষার ভয় কাটাতে দ্বিমুখী চরম চিন্তা পরিহার করতে উৎসাহিত করুন। ডাঃ ফারহানা ইয়াসমিনের সাথে জরুরি সেশন নির্ধারণ করুন।",
  "safety_nli_score": 0.94,
  "approved_by_safety": true
}
```

## 3. GET /api/network/pagerank
Returns dynamically computed PageRank values for campus peer structures.

### Response
```json
{
  "algorithm": "PageRank Power Iterations",
  "damping_factor": 0.85,
  "influence_ranks": {
    "stud-2026-0001": 0.45,
    "stud-2026-0002": 0.15
  }
}
```
