-- Enable pgvector extension for semantic searches and multimodal embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. INSTITUTIONS TABLE
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('university', 'school', 'college', 'other')),
    location_geo POINT, -- raw lat/long coordinate for geospatial analyses
    counselor_count INT DEFAULT 1,
    tier TEXT DEFAULT 'Standard'
);

-- 2. STUDENTS TABLE (Anonymized demographics, edge data only)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
    demographic_profile JSONB NOT NULL DEFAULT '{}'::jsonb, -- e.g., age, gender, department
    baseline_risk FLOAT DEFAULT 0.1,
    consent_status JSONB NOT NULL DEFAULT '{"screening": false, "intervention": false, "research": false}'::jsonb
);

-- 3. SCREENINGS TABLE (Biometric features kept on-device, embeddings synced to cloud)
CREATE TABLE screenings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    fer_embedding vector(768),   -- Nomic embed text, 768-dim
    voice_embedding vector(768), -- Wav2Vec2 paralinguistic latent vector
    text_embedding vector(768),  -- Bangla-BERT encoded textual embeddings
    fused_risk_score FLOAT NOT NULL CHECK (fused_risk_score BETWEEN 0.0 AND 1.0),
    confidence FLOAT NOT NULL CHECK (confidence BETWEEN 0.0 AND 1.0),
    modality_availability JSONB NOT NULL DEFAULT '{"fer": true, "voice": true, "text": true, "metadata": true}'::jsonb
);

-- 4. INTERVENTIONS TABLE (RAG grounded action suggestion tracking)
CREATE TABLE interventions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    counselor_id UUID NOT NULL, -- link to external user ID
    type VARCHAR(50) NOT NULL, -- e.g. 'cbt_tip', 'counselor_session', 'escalation'
    rag_context TEXT,
    outcome_score FLOAT CHECK (outcome_score BETWEEN 0.0 AND 1.0),
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CLINICAL KNOWLEDGE BASE (PGVector groundings)
CREATE TABLE clinical_docs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding vector(768) NOT NULL,
    category TEXT NOT NULL, -- 'phq9', 'gad7', 'religious_counseling', 'cbt'
    culture_tag TEXT DEFAULT 'BD',
    source TEXT
);

-- 6. INTERVENTIONS KB TABLE
CREATE TABLE interventions_kb (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scenario TEXT NOT NULL,
    script_text TEXT NOT NULL,
    embedding vector(768) NOT NULL,
    effectiveness_score FLOAT DEFAULT 0.8
);

-- Create HNSW or IVFFlat indexes on clinical docs & screenings for optimized similarity search
CREATE INDEX ON clinical_docs USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX ON interventions_kb USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Enable Row Level Security (RLS) across all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_docs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Students can only read/manage their own records
CREATE POLICY student_self_access ON students
    FOR ALL
    USING (auth.uid() = id);

-- Counselors can access screenings of assigned students
CREATE POLICY counselor_student_access ON screenings
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM interventions i 
            WHERE i.student_id = screenings.student_id 
              AND i.counselor_id = auth.uid()
        )
    );

-- Counselors can select clinical guidelines freely
CREATE POLICY counselor_guideline_read ON clinical_docs
    FOR SELECT
    TO authenticated
    USING (true);

-- Insert sample seed info
INSERT INTO institutions (name, type, location_geo, counselor_count, tier) VALUES
('BRAC University, Dhaka', 'university', 'POINT(23.7745 90.4266)', 5, 'Tier-1'),
('BUET, Dhaka', 'university', 'POINT(23.7265 90.3924)', 3, 'Tier-1'),
('North South University', 'university', 'POINT(23.8151 90.4255)', 4, 'Tier-1');
