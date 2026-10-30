import React from 'react';

// Reusable SVG illustrations styled to match the storybook cartoon aesthetic
export const BlueRecycleBin: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-24 h-24', style }) => (
  <svg viewBox="0 0 100 120" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 35 L22 110 Q23 115 30 115 L70 115 Q77 115 78 110 L85 35 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="4" />
    <path d="M10 26 L90 26 Q93 26 93 31 L90 35 L10 35 L7 31 Q7 26 10 26 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
    <path d="M35 18 L65 18 Q68 18 68 23 L68 26 L32 26 L32 23 Q32 18 35 18 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="3" />
    {/* Recycling symbol */}
    <g transform="translate(50, 72) scale(0.65)" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M-15 -10 L0 -25 L15 -10" />
      <path d="M15 -10 L15 5" />
      <path d="M22 5 L10 25 L-2 25" />
      <path d="M-2 25 L-12 12" />
      <path d="M-18 10 L-25 -5 L-12 -15" />
    </g>
    <text x="50" y="104" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="sans-serif">GERİ DÖNÜŞÜM</text>
  </svg>
);

export const NewspaperTrash: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="48" height="52" rx="4" transform="rotate(-8 40 40)" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="3" />
    <rect x="22" y="22" width="34" height="6" rx="2" transform="rotate(-8 40 40)" fill="#475569" />
    <rect x="22" y="32" width="18" height="18" rx="2" transform="rotate(-8 40 40)" fill="#cbd5e1" />
    <line x1="44" y1="34" x2="58" y2="32" stroke="#64748b" strokeWidth="2" />
    <line x1="44" y1="40" x2="58" y2="38" stroke="#64748b" strokeWidth="2" />
    <line x1="44" y1="46" x2="58" y2="44" stroke="#64748b" strokeWidth="2" />
  </svg>
);

export const BananaPeelTrash: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 20 C42 12 48 10 50 12 C52 14 48 22 45 28 C42 34 38 48 30 55 C22 62 10 60 14 52 C18 44 28 42 34 38" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
    <path d="M44 26 C52 30 65 35 68 45 C70 52 60 55 52 48 C46 42 42 34 40 28" fill="#eab308" stroke="#ca8a04" strokeWidth="3" />
    <path d="M38 30 C38 40 42 55 45 66 C46 72 38 72 34 64 C30 54 32 40 36 30" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
    <circle cx="48" cy="14" r="2.5" fill="#713f12" />
  </svg>
);

export const GlassShard: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,55 45,15 65,35 60,65 35,68" fill="rgba(186, 230, 253, 0.85)" stroke="#38bdf8" strokeWidth="3" />
    <polygon points="45,15 35,42 20,55" fill="rgba(255, 255, 255, 0.7)" />
    <polygon points="45,15 50,45 65,35" fill="rgba(224, 242, 254, 0.9)" />
    <line x1="35" y1="42" x2="60" y2="65" stroke="#bae6fd" strokeWidth="2" strokeDasharray="3 3" />
    {/* Sun reflection sparkle */}
    <circle cx="48" cy="22" r="3" fill="#ffffff" filter="drop-shadow(0 0 4px #38bdf8)" />
  </svg>
);

export const EmberCoal: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 55 Q20 35 40 38 Q60 35 65 55 Q55 68 40 66 Q25 68 15 55 Z" fill="#292524" stroke="#1c1917" strokeWidth="3" />
    {/* Glow crackles */}
    <path d="M25 50 Q32 44 42 48 Q48 52 56 46" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
    <path d="M35 56 Q40 50 48 54" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
    <circle cx="42" cy="48" r="3" fill="#ef4444" filter="drop-shadow(0 0 6px #f97316)" />
    {/* Little smoke puff */}
    <path d="M38 32 Q40 22 45 20 Q48 15 42 10" stroke="#78716c" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round" opacity="0.7" />
  </svg>
);

export const FireBucket: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 28 L28 70 Q30 74 40 74 Q50 74 52 70 L60 28 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
    <ellipse cx="40" cy="28" rx="20" ry="7" fill="#ef4444" stroke="#991b1b" strokeWidth="3" />
    <ellipse cx="40" cy="28" rx="16" ry="5" fill="#38bdf8" />
    {/* Handle */}
    <path d="M18 28 Q40 2 62 28" stroke="#475569" strokeWidth="3" fill="none" />
    <text x="40" y="56" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">SU</text>
  </svg>
);

export const SmallSapling: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soil mound */}
    <path d="M22 68 Q40 60 58 68 Q40 74 22 68 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
    {/* Stem */}
    <path d="M40 64 Q38 48 40 32" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
    {/* Leaves */}
    <path d="M40 45 C30 40 22 48 30 52 C36 54 39 49 40 45 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="2" />
    <path d="M40 38 C50 32 58 40 50 44 C44 46 41 41 40 38 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    <path d="M40 32 C34 22 46 16 48 24 C46 30 42 32 40 32 Z" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
  </svg>
);

export const RainCloud: React.FC<{ className?: string }> = ({ className = 'w-24 h-16' }) => (
  <svg viewBox="0 0 100 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 45 Q15 45 15 35 Q15 25 28 25 Q32 12 48 12 Q64 12 68 25 Q82 25 82 36 Q82 45 72 45 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="3" filter="drop-shadow(0 4px 8px rgba(37,99,235,0.3))" />
    {/* Rain drops */}
    <line x1="28" y1="52" x2="24" y2="64" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
    <line x1="45" y1="52" x2="41" y2="64" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
    <line x1="62" y1="52" x2="58" y2="64" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
    <line x1="75" y1="52" x2="71" y2="64" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const PondPlasticBag: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 32 Q20 20 28 15 Q34 12 36 26 L44 26 Q46 12 52 15 Q60 20 55 32 L60 62 Q50 68 40 68 Q30 68 20 62 Z" fill="rgba(255, 255, 255, 0.75)" stroke="#94a3b8" strokeWidth="3" />
    <path d="M30 40 Q40 45 50 40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M28 50 Q40 55 52 50" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
  </svg>
);

export const PondCupTrash: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="22" rx="18" ry="7" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
    <path d="M22 22 L28 62 Q40 66 52 62 L58 22" fill="rgba(241, 245, 249, 0.85)" stroke="#94a3b8" strokeWidth="2.5" />
    {/* Plastic straw */}
    <path d="M42 10 L48 24 L36 50" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const RescueScissors: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="60" r="10" stroke="#0284c7" strokeWidth="4" fill="none" />
    <circle cx="55" cy="60" r="10" stroke="#0284c7" strokeWidth="4" fill="none" />
    <line x1="28" y1="52" x2="52" y2="20" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
    <line x1="52" y1="52" x2="28" y2="20" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
    <circle cx="40" cy="36" r="3.5" fill="#f59e0b" />
  </svg>
);

export const TurtleGraphic: React.FC<{ isHappy?: boolean; className?: string }> = ({ isHappy = false, className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Legs & tail */}
    <ellipse cx="28" cy="38" rx="8" ry="6" fill="#15803d" />
    <ellipse cx="72" cy="38" rx="8" ry="6" fill="#15803d" />
    <ellipse cx="26" cy="68" rx="8" ry="6" fill="#15803d" />
    <ellipse cx="74" cy="68" rx="8" ry="6" fill="#15803d" />
    <polygon points="50,78 46,88 54,88" fill="#15803d" />
    {/* Head */}
    <circle cx="50" cy="24" r="12" fill="#22c55e" stroke="#16a34a" strokeWidth="2.5" />
    <circle cx="45" cy="22" r="2.5" fill="#1e293b" />
    <circle cx="55" cy="22" r="2.5" fill="#1e293b" />
    {isHappy ? (
      <path d="M44 28 Q50 34 56 28" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    ) : (
      <path d="M44 30 Q50 24 56 30" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    )}
    {/* Shell */}
    <ellipse cx="50" cy="54" rx="26" ry="24" fill="#166534" stroke="#14532d" strokeWidth="3" />
    <ellipse cx="50" cy="54" rx="18" ry="16" fill="#15803d" />
    <polygon points="50,44 60,50 60,60 50,66 40,60 40,50" fill="#22c55e" stroke="#166534" strokeWidth="2" />
    {/* Entangled net if not happy */}
    {!isHappy && (
      <g stroke="#ef4444" strokeWidth="2.5" opacity="0.85">
        <line x1="32" y1="38" x2="68" y2="70" />
        <line x1="68" y1="38" x2="32" y2="70" />
        <line x1="30" y1="54" x2="70" y2="54" />
      </g>
    )}
  </svg>
);

export const ChimneyFilter: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="24" width="40" height="42" rx="4" fill="#334155" stroke="#0f172a" strokeWidth="3" />
    <line x1="20" y1="34" x2="60" y2="34" stroke="#38bdf8" strokeWidth="2.5" />
    <line x1="20" y1="44" x2="60" y2="44" stroke="#38bdf8" strokeWidth="2.5" />
    <line x1="20" y1="54" x2="60" y2="54" stroke="#38bdf8" strokeWidth="2.5" />
    <circle cx="40" cy="24" r="6" fill="#22c55e" />
    {/* Fresh green sparkles */}
    <path d="M30 14 L34 18 M50 14 L46 18" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const SolarRoofPanel: React.FC<{ className?: string }> = ({ className = 'w-24 h-16' }) => (
  <svg viewBox="0 0 100 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,48 24,14 88,14 76,48" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2.5" />
    {/* Grid lines */}
    <line x1="43" y1="14" x2="33" y2="48" stroke="#93c5fd" strokeWidth="1.5" />
    <line x1="64" y1="14" x2="54" y2="48" stroke="#93c5fd" strokeWidth="1.5" />
    <line x1="18" y1="31" x2="82" y2="31" stroke="#93c5fd" strokeWidth="1.5" />
    {/* Sun glint */}
    <circle cx="70" cy="22" r="3" fill="#ffffff" filter="drop-shadow(0 0 4px #facc15)" />
  </svg>
);

export const MedalAward: React.FC<{ type?: 'tabela' | 'cicek' | 'agac' | 'bisiklet'; className?: string }> = ({ type = 'tabela', className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="34" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" />
    <circle cx="40" cy="40" r="28" fill="#fef9c3" stroke="#eab308" strokeWidth="2" strokeDasharray="4 2" />
    {type === 'tabela' && (
      <path d="M28 28 H52 V44 H42 V56 H38 V44 H28 Z" fill="#15803d" stroke="#166534" strokeWidth="2" />
    )}
    {type === 'cicek' && (
      <g transform="translate(40,40) scale(0.7)">
        <circle cx="0" cy="-12" r="8" fill="#f43f5e" />
        <circle cx="12" cy="0" r="8" fill="#f43f5e" />
        <circle cx="0" cy="12" r="8" fill="#f43f5e" />
        <circle cx="-12" cy="0" r="8" fill="#f43f5e" />
        <circle cx="0" cy="0" r="6" fill="#facc15" />
      </g>
    )}
    {type === 'agac' && (
      <path d="M40 22 C32 22 28 32 32 38 C28 42 32 50 38 50 L38 58 L42 58 L42 50 C48 50 52 42 48 38 C52 32 48 22 40 22 Z" fill="#16a34a" />
    )}
    {type === 'bisiklet' && (
      <g stroke="#0284c7" strokeWidth="3" strokeLinecap="round" fill="none" transform="translate(18,24) scale(0.55)">
        <circle cx="15" cy="35" r="12" />
        <circle cx="55" cy="35" r="12" />
        <polyline points="15,35 32,35 44,18 26,18 20,35" />
        <line x1="32" y1="35" x2="24" y2="10" />
        <line x1="44" y1="18" x2="55" y2="35" />
      </g>
    )}
    {/* Sparkling star */}
    <polygon points="40,10 42,16 48,16 43,20 45,26 40,22 35,26 37,20 32,16 38,16" fill="#f59e0b" />
  </svg>
);
