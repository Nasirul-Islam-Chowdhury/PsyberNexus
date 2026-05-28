export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Two minds connected through an intelligence mesh"
    >
      <defs>
        <radialGradient id="hero-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#0f172a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <radialGradient id="hero-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="1" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-edge-l" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="hero-edge-r" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
        <pattern id="hero-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#1e293b" />
        </pattern>
      </defs>

      <rect width="800" height="500" fill="url(#hero-bg)" />
      <rect width="800" height="500" fill="url(#hero-dots)" opacity="0.4" />

      {/* Left mind profile (indigo) */}
      <g stroke="#6366f1" strokeWidth="1.5" fill="none" opacity="0.85">
        <path d="M 130 110 Q 90 110 80 160 Q 70 220 95 270 Q 105 295 95 320 L 110 330 Q 130 340 130 360 L 160 360" />
        <path d="M 130 110 Q 175 90 215 110 Q 245 130 250 175 L 250 290 Q 250 320 230 335 L 230 360 L 160 360" />
        {/* eye */}
        <circle cx="200" cy="170" r="3" fill="#a5b4fc" stroke="none" />
        {/* neural lines inside head */}
        <path d="M 145 200 Q 175 195 205 215" strokeWidth="0.8" opacity="0.6" />
        <path d="M 140 230 Q 180 240 215 235" strokeWidth="0.8" opacity="0.6" />
        <path d="M 150 260 Q 185 270 220 260" strokeWidth="0.8" opacity="0.6" />
      </g>

      {/* Right mind profile (emerald) - mirrored */}
      <g stroke="#34d399" strokeWidth="1.5" fill="none" opacity="0.85">
        <path d="M 670 110 Q 710 110 720 160 Q 730 220 705 270 Q 695 295 705 320 L 690 330 Q 670 340 670 360 L 640 360" />
        <path d="M 670 110 Q 625 90 585 110 Q 555 130 550 175 L 550 290 Q 550 320 570 335 L 570 360 L 640 360" />
        <circle cx="600" cy="170" r="3" fill="#6ee7b7" stroke="none" />
        <path d="M 655 200 Q 625 195 595 215" strokeWidth="0.8" opacity="0.6" />
        <path d="M 660 230 Q 620 240 585 235" strokeWidth="0.8" opacity="0.6" />
        <path d="M 650 260 Q 615 270 580 260" strokeWidth="0.8" opacity="0.6" />
      </g>

      {/* Connecting circuit lines */}
      <g fill="none" strokeWidth="1">
        <path d="M 250 200 Q 320 200 360 230 L 380 230" stroke="url(#hero-edge-l)" />
        <path d="M 250 270 Q 320 270 360 270 L 380 270" stroke="url(#hero-edge-l)" opacity="0.7" />
        <path d="M 420 230 L 440 230 Q 480 230 550 200" stroke="url(#hero-edge-r)" />
        <path d="M 420 270 L 440 270 Q 480 270 550 270" stroke="url(#hero-edge-r)" opacity="0.7" />
      </g>

      {/* Central core node */}
      <g>
        <circle cx="400" cy="250" r="90" fill="url(#hero-core)" />
        <circle cx="400" cy="250" r="28" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
        <circle cx="400" cy="250" r="44" fill="none" stroke="#6366f1" strokeWidth="0.8" opacity="0.5">
          <animate attributeName="r" values="44;60;44" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="250" r="60" fill="none" stroke="#6366f1" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="60;80;60" dur="3.2s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3.2s" begin="1s" repeatCount="indefinite" />
        </circle>
        {/* core symbol — multimodal fusion */}
        <g stroke="#a5b4fc" strokeWidth="1.2" fill="none">
          <circle cx="400" cy="240" r="5" fill="#a5b4fc" />
          <circle cx="388" cy="258" r="4" />
          <circle cx="412" cy="258" r="4" />
          <line x1="400" y1="245" x2="392" y2="254" />
          <line x1="400" y1="245" x2="408" y2="254" />
          <line x1="392" y1="262" x2="408" y2="262" />
        </g>
      </g>

      {/* Floating data nodes around core */}
      <g>
        <circle cx="340" cy="160" r="3" fill="#6366f1">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="460" cy="160" r="3" fill="#34d399">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="340" cy="340" r="3" fill="#34d399">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="460" cy="340" r="3" fill="#6366f1">
          <animate attributeName="opacity" values="1;0.5;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* corner mono labels */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2" fill="#64748b">
        <text x="40" y="40">FER · VOICE · TEXT · BEHAVIOR</text>
        <text x="540" y="40">EDGE PRIVACY · ON-DEVICE</text>
        <text x="40" y="475">MULT · MODALITY DROPOUT p=0.3</text>
        <text x="600" y="475">BANGLA · ENGLISH</text>
      </g>
    </svg>
  );
}

export function StudentIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 380"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Calming student wellness PWA"
    >
      <defs>
        <radialGradient id="stu-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#064e3b" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#0f172a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <linearGradient id="stu-screen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      <rect width="600" height="380" fill="url(#stu-bg)" />

      {/* soft ambient blobs */}
      <circle cx="120" cy="80" r="80" fill="#10b981" opacity="0.05" />
      <circle cx="500" cy="320" r="100" fill="#6366f1" opacity="0.05" />

      {/* Phone frame */}
      <g transform="translate(220, 30)">
        <rect x="0" y="0" width="160" height="320" rx="22" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <rect x="6" y="6" width="148" height="308" rx="16" fill="url(#stu-screen)" />

        {/* notch */}
        <rect x="65" y="14" width="30" height="6" rx="3" fill="#0f172a" />

        {/* status bar */}
        <text x="14" y="40" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#64748b">9:41</text>
        <circle cx="142" cy="38" r="1.5" fill="#34d399" />

        {/* header */}
        <text x="14" y="62" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="#e2e8f0">
          My Wellness
        </text>
        <text x="14" y="74" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#475569" letterSpacing="1">
          EDGE-ENCRYPTED
        </text>

        {/* Voice card */}
        <rect x="14" y="86" width="132" height="80" rx="8" fill="#020617" stroke="#1e293b" />
        <text x="22" y="100" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#10b981" letterSpacing="1">
          VOICE JOURNAL
        </text>
        {/* waveform */}
        <g fill="#34d399">
          <rect x="22" y="115" width="2" height="14" rx="1" />
          <rect x="27" y="110" width="2" height="24" rx="1" />
          <rect x="32" y="105" width="2" height="34" rx="1" />
          <rect x="37" y="118" width="2" height="8" rx="1" />
          <rect x="42" y="112" width="2" height="20" rx="1" />
          <rect x="47" y="107" width="2" height="30" rx="1" />
          <rect x="52" y="115" width="2" height="14" rx="1" />
          <rect x="57" y="110" width="2" height="24" rx="1" />
          <rect x="62" y="118" width="2" height="8" rx="1" />
          <rect x="67" y="112" width="2" height="20" rx="1" />
          <rect x="72" y="105" width="2" height="34" rx="1" opacity="0.6" />
          <rect x="77" y="115" width="2" height="14" rx="1" opacity="0.6" />
          <rect x="82" y="118" width="2" height="8" rx="1" opacity="0.6" />
          <rect x="87" y="112" width="2" height="20" rx="1" opacity="0.5" />
          <rect x="92" y="115" width="2" height="14" rx="1" opacity="0.4" />
        </g>
        {/* record button */}
        <circle cx="129" cy="125" r="11" fill="#10b981" />
        <circle cx="129" cy="125" r="3.5" fill="#020617" />
        <text x="22" y="152" fontFamily="Inter, sans-serif" fontSize="6" fill="#94a3b8">
          Pour your worries · 30s
        </text>

        {/* Text journal card */}
        <rect x="14" y="174" width="132" height="56" rx="8" fill="#020617" stroke="#1e293b" />
        <text x="22" y="188" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#10b981" letterSpacing="1">
          REFLECTION
        </text>
        <line x1="22" y1="198" x2="138" y2="198" stroke="#1e293b" />
        <line x1="22" y1="206" x2="124" y2="206" stroke="#1e293b" />
        <line x1="22" y1="214" x2="108" y2="214" stroke="#1e293b" />
        <line x1="22" y1="222" x2="96" y2="222" stroke="#1e293b" />

        {/* CBT card */}
        <rect x="14" y="238" width="132" height="40" rx="8" fill="#020617" stroke="#1e293b" />
        <circle cx="26" cy="258" r="6" fill="#10b981" opacity="0.2" />
        <path d="M 22 258 l 3 3 l 5 -5" stroke="#34d399" strokeWidth="1.2" fill="none" />
        <text x="38" y="255" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="600" fill="#e2e8f0">
          Breathe · 4-7-8
        </text>
        <text x="38" y="265" fontFamily="Inter, sans-serif" fontSize="6" fill="#64748b">
          Bangla · CBT card
        </text>

        {/* Crisis */}
        <rect x="14" y="286" width="132" height="22" rx="6" fill="#7f1d1d" opacity="0.3" stroke="#991b1b" />
        <circle cx="26" cy="297" r="3" fill="#ef4444" />
        <text x="36" y="300" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="600" fill="#fca5a5">
          Helpline · 999
        </text>
      </g>

      {/* floating tags */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#475569">
        <text x="40" y="80">ON-DEVICE</text>
        <text x="40" y="180">BILINGUAL</text>
        <text x="40" y="280">CONSENT-FIRST</text>
        <text x="450" y="80">EMBED-ONLY SYNC</text>
        <text x="450" y="180">NO DIAGNOSIS</text>
        <text x="450" y="280">HUMAN-IN-LOOP</text>
      </g>

      {/* connecting dots */}
      <g fill="#10b981" opacity="0.6">
        <circle cx="160" cy="80" r="2" />
        <circle cx="180" cy="100" r="2" />
        <circle cx="200" cy="120" r="2" />
        <circle cx="440" cy="80" r="2" />
        <circle cx="420" cy="100" r="2" />
        <circle cx="400" cy="120" r="2" />
      </g>
    </svg>
  );
}

export function CounselorIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 380"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Counselor dashboard with multimodal telemetry"
    >
      <defs>
        <radialGradient id="cns-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#0f172a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <linearGradient id="cns-screen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="cns-chart" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="600" height="380" fill="url(#cns-bg)" />

      {/* ambient */}
      <circle cx="80" cy="80" r="90" fill="#6366f1" opacity="0.06" />
      <circle cx="520" cy="300" r="110" fill="#10b981" opacity="0.04" />

      {/* Laptop body */}
      <g transform="translate(80, 50)">
        {/* lid */}
        <rect x="0" y="0" width="440" height="260" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <rect x="8" y="8" width="424" height="244" rx="6" fill="url(#cns-screen)" />

        {/* top bar */}
        <rect x="8" y="8" width="424" height="22" fill="#020617" />
        <circle cx="20" cy="19" r="2.5" fill="#475569" />
        <text x="32" y="22" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#475569" letterSpacing="1">
          PSYBERNEXUS / COUNSELOR
        </text>
        <circle cx="420" cy="19" r="2" fill="#34d399">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="395" y="22" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#34d399">LIVE</text>

        {/* Left column — risk queue */}
        <text x="18" y="48" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#475569" letterSpacing="1.5">
          RISK QUEUE
        </text>

        {/* queue row 1 - CRITICAL */}
        <rect x="18" y="56" width="120" height="22" rx="3" fill="#7f1d1d" opacity="0.15" stroke="#991b1b" />
        <circle cx="26" cy="67" r="2.5" fill="#ef4444" />
        <text x="34" y="70" fontFamily="Inter, sans-serif" fontSize="6" fontWeight="600" fill="#e2e8f0">Alim-Al-Razi</text>
        <text x="118" y="70" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#fca5a5" textAnchor="end">84%</text>

        {/* queue row 2 - MEDIUM */}
        <rect x="18" y="82" width="120" height="22" rx="3" fill="#78350f" opacity="0.15" stroke="#92400e" />
        <circle cx="26" cy="93" r="2.5" fill="#f59e0b" />
        <text x="34" y="96" fontFamily="Inter, sans-serif" fontSize="6" fontWeight="600" fill="#e2e8f0">Tasnia Rahman</text>
        <text x="118" y="96" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#fcd34d" textAnchor="end">53%</text>

        {/* queue row 3 - LOW */}
        <rect x="18" y="108" width="120" height="22" rx="3" fill="#064e3b" opacity="0.15" stroke="#065f46" />
        <circle cx="26" cy="119" r="2.5" fill="#10b981" />
        <text x="34" y="122" fontFamily="Inter, sans-serif" fontSize="6" fontWeight="600" fill="#e2e8f0">Kazi Sajjad</text>
        <text x="118" y="122" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#6ee7b7" textAnchor="end">28%</text>

        {/* queue row 4 */}
        <g opacity="0.6">
          <rect x="18" y="134" width="120" height="22" rx="3" fill="#7f1d1d" fillOpacity="0.2" stroke="#991b1b" />
          <circle cx="26" cy="145" r="2.5" fill="#ef4444" />
        </g>
        <text x="34" y="148" fontFamily="Inter, sans-serif" fontSize="6" fontWeight="600" fill="#cbd5e1">Imtiaz Ahmed</text>
        <text x="118" y="148" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#fca5a5" textAnchor="end">78%</text>

        {/* Center column — chart */}
        <text x="156" y="48" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#475569" letterSpacing="1.5">
          FUSION RISK TIMELINE
        </text>
        <rect x="156" y="56" width="160" height="100" rx="4" fill="#020617" stroke="#1e293b" />
        {/* axis */}
        <line x1="166" y1="146" x2="306" y2="146" stroke="#1e293b" />
        <line x1="166" y1="66" x2="166" y2="146" stroke="#1e293b" />
        {/* chart fill */}
        <path
          d="M 166 130 L 180 122 L 196 118 L 212 110 L 228 102 L 244 90 L 260 95 L 276 80 L 292 75 L 306 70 L 306 146 L 166 146 Z"
          fill="url(#cns-chart)"
        />
        {/* chart line */}
        <path
          d="M 166 130 L 180 122 L 196 118 L 212 110 L 228 102 L 244 90 L 260 95 L 276 80 L 292 75 L 306 70"
          fill="none"
          stroke="#818cf8"
          strokeWidth="1.5"
        />
        {/* dot at end */}
        <circle cx="306" cy="70" r="3" fill="#a5b4fc" />
        <circle cx="306" cy="70" r="6" fill="none" stroke="#6366f1" strokeWidth="0.8" opacity="0.6">
          <animate attributeName="r" values="6;10;6" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* Modality bars */}
        <text x="156" y="172" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#475569" letterSpacing="1.5">
          MODALITY FUSION
        </text>
        <g>
          <text x="156" y="186" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#94a3b8">FER</text>
          <rect x="180" y="180" width="80" height="6" rx="1" fill="#1e293b" />
          <rect x="180" y="180" width="62" height="6" rx="1" fill="#6366f1" />
          <text x="266" y="186" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#e2e8f0">62%</text>

          <text x="156" y="200" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#94a3b8">VOC</text>
          <rect x="180" y="194" width="80" height="6" rx="1" fill="#1e293b" />
          <rect x="180" y="194" width="68" height="6" rx="1" fill="#818cf8" />
          <text x="266" y="200" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#e2e8f0">79%</text>

          <text x="156" y="214" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#94a3b8">TXT</text>
          <rect x="180" y="208" width="80" height="6" rx="1" fill="#1e293b" />
          <rect x="180" y="208" width="74" height="6" rx="1" fill="#a5b4fc" />
          <text x="266" y="214" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#e2e8f0">88%</text>

          <text x="156" y="228" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#94a3b8">BHV</text>
          <rect x="180" y="222" width="80" height="6" rx="1" fill="#1e293b" />
          <rect x="180" y="222" width="52" height="6" rx="1" fill="#34d399" />
          <text x="266" y="228" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#e2e8f0">65%</text>
        </g>

        {/* Right column — alerts + map */}
        <text x="328" y="48" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#475569" letterSpacing="1.5">
          CAMPUS HEATMAP
        </text>
        <rect x="328" y="56" width="92" height="80" rx="4" fill="#020617" stroke="#1e293b" />
        {/* grid */}
        <g stroke="#1e293b" strokeWidth="0.5">
          <line x1="328" y1="76" x2="420" y2="76" />
          <line x1="328" y1="96" x2="420" y2="96" />
          <line x1="328" y1="116" x2="420" y2="116" />
          <line x1="350" y1="56" x2="350" y2="136" />
          <line x1="374" y1="56" x2="374" y2="136" />
          <line x1="397" y1="56" x2="397" y2="136" />
        </g>
        {/* hotspots */}
        <circle cx="352" cy="80" r="10" fill="#ef4444" opacity="0.4" />
        <circle cx="352" cy="80" r="4" fill="#ef4444" />
        <circle cx="395" cy="108" r="7" fill="#f59e0b" opacity="0.4" />
        <circle cx="395" cy="108" r="3" fill="#f59e0b" />
        <circle cx="370" cy="120" r="5" fill="#10b981" opacity="0.4" />
        <circle cx="370" cy="120" r="2" fill="#10b981" />

        {/* Alerts panel */}
        <text x="328" y="152" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#475569" letterSpacing="1.5">
          ALERTS
        </text>
        <rect x="328" y="160" width="92" height="68" rx="4" fill="#7f1d1d" opacity="0.12" stroke="#991b1b" />
        <circle cx="338" cy="172" r="2.5" fill="#ef4444">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <text x="346" y="175" fontFamily="JetBrains Mono, monospace" fontSize="5" fill="#fca5a5" letterSpacing="1">CRITICAL</text>
        <text x="334" y="188" fontFamily="Inter, sans-serif" fontSize="6" fontWeight="600" fill="#e2e8f0">CSE Lab 4</text>
        <text x="334" y="198" fontFamily="Inter, sans-serif" fontSize="5" fill="#94a3b8">High stress index</text>
        <text x="334" y="208" fontFamily="Inter, sans-serif" fontSize="5" fill="#94a3b8">detected · 19:32</text>
        <rect x="334" y="214" width="80" height="10" rx="2" fill="#6366f1" />
        <text x="374" y="221" fontFamily="JetBrains Mono, monospace" fontSize="5" fill="#ffffff" textAnchor="middle" letterSpacing="1">
          ESCALATE
        </text>

        {/* keyboard base */}
        <rect x="-12" y="252" width="464" height="6" rx="2" fill="#0f172a" stroke="#334155" />
        <rect x="180" y="258" width="80" height="4" rx="2" fill="#0f172a" stroke="#334155" />
      </g>

      {/* floating tags */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#475569">
        <text x="20" y="40">PAGERANK</text>
        <text x="20" y="350">RAG · GEMINI</text>
        <text x="540" y="40" textAnchor="end">NEO4J</text>
        <text x="540" y="350" textAnchor="end">PGVECTOR</text>
      </g>
    </svg>
  );
}
