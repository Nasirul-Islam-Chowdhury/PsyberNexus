import { Student, Screening, CounselorAlert, ClinicalGuideline } from './types';

export const mockStudents: Student[] = [
  {
    id: "stud-2026-0001",
    name: "Alim-Al-Razi",
    department: "Computer Science & Engineering (CSE)",
    avatar: "https://images.unsplash.com/photo-1690037901153-7fd75205941a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    consent: true,
    baseline_risk: 0.21,
    fused_risk_score: 0.84, // critical elevated stress
    risk_level: "HIGH",
    last_active: "2026-05-25T19:30:00Z",
    location: "CSE Building (Lab 4)",
    demographics: { age: 22, gender: "Male", year: "Senior" }
  },
  {
    id: "stud-2026-0002",
    name: "Tasnia Rahman",
    department: "BBA / School of Business",
    avatar: "https://img.magnific.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg?semt=ais_hybrid&w=740&q=80",
    consent: true,
    baseline_risk: 0.15,
    fused_risk_score: 0.53, // moderate stress
    risk_level: "MEDIUM",
    last_active: "2026-05-25T18:45:00Z",
    location: "Academic Building A",
    demographics: { age: 20, gender: "Female", year: "Sophomore" }
  },
  {
    id: "stud-2026-0003",
    name: "Kazi Sajjad",
    department: "Electrical & Electronic Engineering (EEE)",
    avatar: "https://plus.unsplash.com/premium_photo-1682089869602-2ec199cc501a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    consent: true,
    baseline_risk: 0.11,
    fused_risk_score: 0.28, // safe
    risk_level: "LOW",
    last_active: "2026-05-25T20:10:00Z",
    location: "Dormitory Building 3",
    demographics: { age: 23, gender: "Male", year: "Graduate" }
  },
  {
    id: "stud-2026-0004",
    name: "Nushrat Jahan Anny",
    department: "Pharmacy & Life Sciences",
    avatar: "https://www.shutterstock.com/image-photo/bangladeshi-girl-smiling-gracefully-front-600nw-2628558813.jpg",
    consent: false, // No consent
    baseline_risk: 0.18,
    fused_risk_score: 0.18,
    risk_level: "LOW",
    last_active: "2026-05-25T14:22:00Z",
    location: "Science Lab B",
    demographics: { age: 21, gender: "Female", year: "Junior" }
  },
  {
    id: "stud-2026-0005",
    name: "Imtiaz Ahmed",
    department: "Architecture",
    avatar: "https://plus.unsplash.com/premium_photo-1770505526166-911a4ffa6975?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    consent: true,
    baseline_risk: 0.25,
    fused_risk_score: 0.78, // Critical stress
    risk_level: "HIGH",
    last_active: "2026-05-25T20:15:00Z",
    location: "Academic Building A",
    demographics: { age: 24, gender: "Male", year: "Thesis Year" }
  }
];

export const mockScreenings: { [key: string]: Screening } = {
  "stud-2026-0001": {
    id: "scr-2026-101",
    student_id: "stud-2026-0001",
    timestamp: "2026-05-25T19:30:00Z",
    fer_distribution: { sadness: 0.62, neutral: 0.15, fear: 0.12, anger: 0.06, happiness: 0.05 },
    vad_space: { valence: -0.68, arousal: -0.32, dominance: -0.55 },
    voice_stress_score: 0.79,
    voice_metrics: { jitter: 0.024, shimmer: 0.051, hnr: 11.8 },
    text_sentiment_negative_score: 0.88,
    text_distortion_score: 0.75,
    text_distortions_detected: ["Overgeneralization", "Catastrophizing"],
    engagement_drop_ratio: 0.65, // delayed submissions & logins
    fused_risk_score: 0.84
  },
  "stud-2026-0002": {
    id: "scr-2026-102",
    student_id: "stud-2026-0002",
    timestamp: "2026-05-25T18:45:00Z",
    fer_distribution: { neutral: 0.45, sadness: 0.25, fear: 0.15, happiness: 0.10, anger: 0.05 },
    vad_space: { valence: -0.22, arousal: -0.05, dominance: -0.15 },
    voice_stress_score: 0.52,
    voice_metrics: { jitter: 0.014, shimmer: 0.038, hnr: 16.5 },
    text_sentiment_negative_score: 0.45,
    text_distortion_score: 0.40,
    text_distortions_detected: ["All-or-Nothing Thinking"],
    engagement_drop_ratio: 0.35,
    fused_risk_score: 0.53
  },
  "stud-2026-0003": {
    id: "scr-2026-103",
    student_id: "stud-2026-0003",
    timestamp: "2026-05-25T20:10:00Z",
    fer_distribution: { happiness: 0.65, neutral: 0.25, sadness: 0.05, fear: 0.05, anger: 0.00 },
    vad_space: { valence: 0.58, arousal: 0.42, dominance: 0.35 },
    voice_stress_score: 0.21,
    voice_metrics: { jitter: 0.008, shimmer: 0.018, hnr: 24.2 },
    text_sentiment_negative_score: 0.12,
    text_distortion_score: 0.05,
    text_distortions_detected: [],
    engagement_drop_ratio: 0.08,
    fused_risk_score: 0.28
  },
  "stud-2026-0005": {
    id: "scr-2026-105",
    student_id: "stud-2026-0005",
    timestamp: "2026-05-25T20:15:00Z",
    fer_distribution: { sadness: 0.55, fear: 0.20, neutral: 0.15, anger: 0.08, happiness: 0.02 },
    vad_space: { valence: -0.58, arousal: -0.18, dominance: -0.42 },
    voice_stress_score: 0.81,
    voice_metrics: { jitter: 0.021, shimmer: 0.048, hnr: 12.5 },
    text_sentiment_negative_score: 0.74,
    text_distortion_score: 0.80,
    text_distortions_detected: ["Emotional Reasoning", "Labeling"],
    engagement_drop_ratio: 0.50,
    fused_risk_score: 0.78
  }
};

export const sampleAlerts: CounselorAlert[] = [
  {
    id: "alt-1",
    student_id: "stud-2026-0001",
    student_name: "Alim-Al-Razi",
    risk_score: 0.84,
    location_campus: "CSE Building (Lab 4)",
    timestamp: "2026-05-25T19:32:00Z",
    details_en: "Critical combined indicators of stress, high facial sadness, and severe language triggers of failing.",
    details_bn: "মুখাবয়বের মারাত্মক হতাশা, কণ্ঠে তীব্র উত্তেজনা এবং ব্যর্থতাব্যাঞ্জক ডায়েরী লেখার কারণে উচ্চ মানসিক ঝুঁকি সনাক্ত হয়েছে।"
  },
  {
    id: "alt-2",
    student_id: "stud-2026-0005",
    student_name: "Imtiaz Ahmed",
    risk_score: 0.78,
    location_campus: "Academic Building A (Studio 3)",
    timestamp: "2026-05-25T20:16:00Z",
    details_en: "Continuous academic delays paired with elevated vocal jitter. Immediate outreach suggested.",
    details_bn: "অ্যাকাডেমিক টাস্ক ক্রমাগত বিলম্ব করার পাশাপাশি কণ্ঠে অতিরিক্ত টান ধরা পড়েছে। সরাসরি সাক্ষাতের পরামর্শ রইলো।"
  }
];

export const clinicalGuidelines: ClinicalGuideline[] = [
  {
    id: "guide-1",
    title: "Bangla Adapted Cognitive Re-framing Guidelines",
    category: "cbt",
    content_en: "Encourage alternate framing: help students reconstruct binary 'all-or-nothing' negative views of test failures into manageable incremental learning curves.",
    content_bn: "বিকল্প চিন্তাভাবনা পদ্বতি: পরীক্ষার ভয় কাটাতে দ্বিমুখী চরম চিন্তা ('আমি সব শেষ' / 'সবাই আমার চেয়ে ভালো করছে') পরিহার করে ধাপে ধাপে শেখার প্রতি আগ্রহ সৃষ্টি করান কাউন্সিলর সেশনে।",
    source: "Dhaka University Clinical Psychology Dept adaptation"
  },
  {
    id: "guide-2",
    title: "Collectivist Social and Cultural Care Protocols",
    category: "religious_resilience",
    content_en: "In collectivist South Asian communities, isolation fosters panic. Route students through peer group study networks, campus clubs, and religious meditation circles.",
    content_bn: "পারস্পরিক সামাজিক বন্ধন বৃদ্ধি: সামাজিক একাকীত্ব রোধে সহপাঠী সহায়তামূলক নেটওয়ার্ক গড়ে তুলুন। ক্যাম্পাস ক্লাব এবং শুক্রবারের সালাত কেন্দ্রিক প্রশান্তির অংশ হওয়া মন ভালো রাখতে সহায়ক।",
    source: "South Asian Culturally-Sensitive Counseling Framework (2025)"
  },
  {
    id: "guide-3",
    title: "Emergency Crisis Protocol (PHQ-9/GAD-7 severe scoring limits)",
    category: "phq9_gad7",
    content_en: "If the text evaluation reveals explicit self-harm thoughts ('মরে যেতে ইচ্ছা করে'), pause fully automated chatbot logs. Assign immediately to a clinical expert.",
    content_bn: "জরুরী জীবন সুরক্ষা প্রটোকল: যদি ডায়েরীতে আত্মহননের কথা বা জীবন শেষের ইচ্ছা পরিষ্কার পাওয়া যায় ('বেঁচে থেকে লাভ নাই'), তবে বট চ্যাট বন্ধ করে সাথে সাথে ডাঃ ফারহানাকে অন-কল এলার্ট পাঠান।",
    source: "Bangladesh National Suicide Prevention Protocol Association"
  }
];
