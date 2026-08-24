import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, Volume2, Award, Coins } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { Language } from '../types';

interface RajyabhishekSceneProps {
  language: Language;
}

export const RajyabhishekScene: React.FC<RajyabhishekSceneProps> = ({ language }) => {
  const [celebrated, setCelebrated] = useState(false);

  const triggerCoronationCelebration = () => {
    setCelebrated(true);
    audioEngine.playTutariFanfare();
    audioEngine.playWarDrum('heavy');

    // Trigger golden and saffron flower confetti shower
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FFD700', '#FFA500', '#FF4500', '#FFFFFF', '#FFF8DC'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section
      id="chapter-rajyabhishek"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden"
    >
      {/* Golden Celestial Rays & Atmosphere Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0503] via-[#2A1904]/70 to-[#0A0503] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto space-y-12 text-center">
        {/* Header Badge */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/50 text-[#FFD700] text-xs font-cinzel font-semibold uppercase tracking-widest">
            <Crown className="w-4 h-4 text-[#FFD700]" />
            <span>{language === 'mr' ? 'अध्याय ०७ • सुवर्ण क्षण' : 'Chapter VII • The Sovereign Throne'}</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-devanagari-display font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD700] to-[#E67E00] drop-shadow-[0_10px_35px_rgba(255,215,0,0.4)]">
            {language === 'mr' ? 'भव्य राज्याभिषेक सोहळा' : 'THE GRAND CORONATION AT RAIGAD'}
          </h2>

          <p className="text-base sm:text-xl font-cinzel tracking-wider text-[#F0DCB8] max-w-3xl mx-auto">
            {language === 'mr'
              ? '६ जून १६७४ (ज्येष्ठ शुद्ध त्रयोदशी, शके १५९६) — हिंदवी स्वराज्याचे सार्वभौम छत्रपती'
              : 'June 6, 1674 — Ascending the 32-Maund Golden Throne of Swarajya'}
          </p>
        </div>

        {/* Grand Raigad Durbar Throne Artwork */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#241505] via-[#170D03] to-[#0A0502] border-2 border-[#FFD700]/40 shadow-[0_30px_90px_rgba(255,180,0,0.35)] max-w-4xl mx-auto overflow-hidden">
          {/* Throne SVG Illustration */}
          <div className="w-full h-64 sm:h-80 flex items-center justify-center relative">
            <svg viewBox="0 0 400 240" className="w-full h-full object-contain">
              {/* Grand Durbar Arch */}
              <path
                d="M30,230 L30,60 Q200,-10 370,60 L370,230 Z"
                fill="#120902"
                stroke="#D4AF37"
                strokeWidth="2.5"
              />

              {/* Golden Pillars */}
              <rect x="50" y="70" width="14" height="150" fill="#D4AF37" />
              <rect x="336" y="70" width="14" height="150" fill="#D4AF37" />
              <circle cx="57" cy="65" r="9" fill="#FBBF24" />
              <circle cx="343" cy="65" r="9" fill="#FBBF24" />

              {/* 32-Maund Golden Simhasan (Royal Throne with 8 Jeweled Pillars) */}
              <polygon points="120,210 280,210 260,150 140,150" fill="#B45309" />
              <rect x="130" y="140" width="140" height="20" fill="#F59E0B" rx="4" />
              <rect x="145" y="90" width="110" height="55" fill="#D97706" rx="6" />

              {/* Royal Golden Umbrella (Meghdambari Chhatra) */}
              <path d="M150,70 Q200,40 250,70 Z" fill="#FFD700" stroke="#B45309" strokeWidth="1.5" />
              <line x1="200" y1="40" x2="200" y2="18" stroke="#FFD700" strokeWidth="2.5" />
              <polygon points="196,18 204,18 200,8" fill="#FBBF24" />
              {/* Pearl Frills */}
              {Array.from({ length: 9 }).map((_, i) => (
                <circle key={i} cx={155 + i * 11} cy={74} r={2.2} fill="#FFFBEB" />
              ))}

              {/* Chhatrapati Shivaji Maharaj in Royal Robes & Crown */}
              <g>
                <circle cx="200" cy="115" r="14" fill="#E8B588" />
                {/* Royal Crown / Pagdi with Diamond Kalgi */}
                <path d="M188,110 Q200,92 212,110 Q200,105 188,110 Z" fill="#991B1B" />
                <polygon points="198,92 202,76 205,92" fill="#FFD700" />
                <circle cx="202" cy="74" r="3" fill="#38BDF8" />
                {/* Royal Golden Robe */}
                <path d="M175,170 Q200,130 225,170 Z" fill="#FFD700" stroke="#B45309" strokeWidth="1" />
                {/* Sacred Garland / Pearl necklace */}
                <path d="M188,135 Q200,155 212,135" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                {/* Royal Scepter */}
                <line x1="172" y1="130" x2="160" y2="175" stroke="#FFD700" strokeWidth="3" />
                <circle cx="172" cy="128" r="4" fill="#EF4444" />
              </g>

              {/* Vedic Priests / Gaga Bhatt holding sacred golden vessel */}
              <g>
                <ellipse cx="100" cy="180" rx="14" ry="24" fill="#EA580C" />
                <circle cx="100" cy="150" r="8" fill="#E8B588" />
                {/* Holy Pitcher */}
                <polygon points="112,155 124,155 118,170" fill="#FFD700" />
              </g>
            </svg>
          </div>

          {/* Majestic Proclamation & Title */}
          <div className="space-y-4 mt-6">
            <div className="p-4 rounded-2xl bg-[#3B2208]/80 border border-[#FFD700]/30">
              <p className="text-base sm:text-lg md:text-xl font-devanagari-display font-extrabold text-[#FFF2D6] tracking-wide">
                {language === 'mr'
                  ? '“प्रौढप्रताप पुरंदर, क्षत्रियकुलावतंस, सिंहासानाधीश्वर, श्रीमंत छत्रपती शिवाजी महाराज की जय!”'
                  : '“Profound in Valour, Lord of Fortresses, Jewel of the Warrior Clan, Enthroned Sovereign: Victory to Chhatrapati Shivaji Maharaj!”'}
              </p>
            </div>

            <p className="text-xs sm:text-sm font-marathi text-[#D4C3AC] max-w-2xl mx-auto leading-relaxed">
              {language === 'mr'
                ? 'गागाभट्टांनी सप्तनद्यांच्या पवित्र जलाचा अभिषेक केला. सुवर्ण ‘होन’ आणि तांब्याची ‘शिवराई’ ही नवी स्वतंत्र नाणी पाडली गेली आणि शिवराज्याभिषेक शक सुरू झाला.'
                : 'Consecrated with holy waters from the seven sacred rivers. New sovereign coins ("Hon" and "Shivrai") were minted, establishing an independent sovereign calendar.'}
            </p>

            {/* Interactive Tutari & Confetti Trigger Button */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={triggerCoronationCelebration}
                id="coronation-tutari-btn"
                className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FFD700] text-[#0A0502] font-cinzel font-black text-sm sm:text-base tracking-wider shadow-[0_0_35px_rgba(255,215,0,0.6)] hover:shadow-[0_0_50px_rgba(255,215,0,0.9)] hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#0A0502]" />
                <span>
                  {language === 'mr' ? 'राज्याभिषेक जयघोष व तुतारी वाजवा!' : 'Sound Tutari & Celebrate Coronation!'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
