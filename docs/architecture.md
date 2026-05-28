# PsyberNexus MVP Architecture Specification
This document outlines the detailed system configurations for **PsyberNexus** built for South Asia and global deployment.

## 1. Edge-First Privacy Standard (Core Constraint)
- All raw speech (.wav mono) and video frames (.jpg/.png) are captured and preprocessed exclusively on the physical device (ARM64 edge or local browser WebGL).
- Biometric signals are mapped into anonymized low-dimension embeddings.
- No raw face images, personal audio recordings, or vocal wave streams are transmitted over network protocols or cached in backend servers.

## 2. 7-Layer Hierarchy Specification

### Layer 1: Parallel Input Streams
- **FER**: EfficientNet-B0 fine-tuned on FER2013 (7 classes + VAD valence mapping).
- **Voice**: Wav2Vec2 paralinguistic metric calculations (Jitter, Shimmer, HNR, and Stress indicators).
- **Text**: Bangla-BERT sentiment classification and cognitive distortion parsers.
- **Behavioral**: LMS task completion metrics and engagement latency.

### Layer 2: Multimodal Fusion
- Cross-modal attention transformer (MulT-style) with 4 encoder layers, 8 heads, and 256 hidden dimension.
- Modality Dropout (p=0.3) zeroing out sensors dynamically to support asymmetric privacy choices.

### Layer 3: AI Intelligence
- Grounded Cultural RAG using nomic-embed-text and local knowledge corpuses (adapted CBT scripts, Arabic and collectivist healing templates, translated PHQ-9).
- Safe generation using Llama 3 8B / Gemini, vetted against Deberta-nli safety scores.

### Layer 4: MCP Orchestration Agent Mesh
- screening_agent, crisis_agent, intervention_agent, and analytics_agent transitioning student states seamlessly between SCREENING, ASSESSMENT, or ESCALATED.

### Layer 5: Backend & Storage
- Supabase (PostgreSQL 15), PGVector index with IVFFlat, Neo4j peer graphs tracking influential classmates.

### Layer 6: Frontend Portal
- Dual-role responsive layouts: Counselor dashboard and Student calming mobile PWA.

### Layer 7: CI/CD & Deployments
- Vercel hosting, Cloudflare caching, Prometheus and Grafana health parameters.
