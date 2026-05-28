/**
 * PsyberNexus Global TypeScript Declarations
 */

export interface Student {
  id: string;
  name: string;
  department: string;
  avatar: string;
  consent: boolean;
  baseline_risk: number;
  fused_risk_score: number;
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  last_active: string;
  location: string; // campus location point
  demographics: {
    age: number;
    gender: string;
    year: string;
  };
}

export interface Screening {
  id: string;
  student_id: string;
  timestamp: string;
  fer_distribution: { [key: string]: number }; // anger, disgust, fear, happiness, sadness, surprise, neutral
  vad_space: {
    valence: number;
    arousal: number;
    dominance: number;
  };
  voice_stress_score: number;
  voice_metrics: {
    jitter: number;
    shimmer: number;
    hnr: number;
  };
  text_sentiment_negative_score: number;
  text_distortion_score: number;
  text_distortions_detected: string[];
  engagement_drop_ratio: number; // behavioral LMS vector
  fused_risk_score: number;
}

export interface CounselorAlert {
  id: string;
  student_id: string;
  student_name: string;
  risk_score: number;
  location_campus: string;
  timestamp: string;
  details_en: string;
  details_bn: string;
}

export interface ClinicalGuideline {
  id: string;
  title: string;
  category: 'cbt' | 'phq9_gad7' | 'religious_resilience';
  content_en: string;
  content_bn: string;
  source: string;
}
