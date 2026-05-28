# PsyberNexus — Multimodal Student Mental Health Intelligence Mesh

PsyberNexus is an AI-native multimodal mental health intelligence mesh that detects, maps, and supports student well-being across educational ecosystems. Built for Bangladesh's high-stigma, resource-constrained schools, it is globally adaptable with non-intrusive edge-first privacy guarantees.

***

## 🌟 Core Highlights & Architectural Strengths
- **Edge-First Biometric Privacy**: Raw face tracking and audio waveforms are processed locally on-device. ONLY anonymized, mathematical embeddings are synced to the campus cloud.
- **Multimodal Latex Fusion (MulT)**: Uses cross-modal attention networks with Modality Dropout ($p=0.3$), surviving beautifully even if cameras or microphones are disabled by students.
- **Cultural RAG Integration**: Formulates psychiatric counseling guidelines grounded in adapted Bangla CBT scripts, South Asian collectivist structures, and Islamic mental resilience cards.
- **Graph PageRank Diagnostics**: Evaluates student peer support meshes using Neo4j and PageRank to find influential class leaders, optimizing counselor routing automatically.

---

## 📊 The 7-Layer Hierarchy

```gantt
Layer 1: INPUT/SENSING    ====> MTCNN, Voice Pitch Jitter, Bangla-BERT Distortions
Layer 2: MULTIMODAL FUSION ====> MulT Attention Transformers (T=10 timesteps)
Layer 3: AI INTELLIGENCE   ====> Cultural PGVector RAG + Neo4j Graph PageRank
Layer 4: MCP ORCHESTRATION ====> Screening, Crisis, Intervention, Analytics Agents
Layer 5: BACKEND & STORAGE ====> PostgreSQL 15, PGVector Index, Edge SQLite Cache
Layer 6: FRONTEND WORKSPACE ====> Counselor Dashboard + Calming Student Mobile PWA
Layer 7: CI/CD DEPLOYMENT  ====> Vercel, Cloudflare, Prometheus Model Tracking
```

---

## 🚀 Quickstart and Setup
To quickly bootstrap the entire workspace, run the bundled setup script:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 1. Configure Secrets in `.env`
Ensure you set your credentials inside `.env`:
```env
GEMINI_API_KEY="your_api_key_here"
APP_URL="http://localhost:3000"
```

### 2. Run Local Development Pipelines
```bash
# Deploys Express Full-Stack Server + Vite SPA preview
npm run dev
```

### 3. Run End-to-End System Tests
```bash
python3 tests/integration/flow_test.py
```

---

## 🔒 Ethical Safeguards & Consent
1. **No Diagnostic Claims**: The system provides clinical risk stratification, NEVER official psychiatric diagnoses.
2. **Human-In-The-Loop**: Automatically redirects HIGH-risk students directly to on-duty counselors (such as Dr. Farhana Yasmin) with one-tap helpline integration (`999`/`109`).
