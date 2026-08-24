import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, ChevronDown, Sparkles, Wind, Flame, Bell, Shield } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { Language } from '../types';

interface CinematicHeroProps {
  language: Language;
  onExploreClick: () => void;
  onToggleAudio: () => void;
  isMuted: boolean;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  language,
  onExploreClick,
  onToggleAudio,
  isMuted,
}) => {
  const [revealed, setRevealed] = useState(false);
  const [horseRiding, setHorseRiding] = useState(false);
  const [activeSoundEffect, setActiveSoundEffect] = useState<string | null>(null);

  useEffect(() => {
    // Cinematic reveal timer
    const timer1 = setTimeout(() => setRevealed(true), 400);
    const timer2 = setTimeout(() => setHorseRiding(true), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const triggerHeroSound = (sound: 'tutari' | 'drum' | 'shankh' | 'bell') => {
    setActiveSoundEffect(sound);
    if (sound === 'tutari') audioEngine.playTutariFanfare();
    else if (sound === 'drum') audioEngine.playWarDrum('heavy');
    else if (sound === 'shankh') audioEngine.playShankhnaad();
    else if (sound === 'bell') audioEngine.playTempleBell();

    setTimeout(() => setActiveSoundEffect(null), 1500);
  };

  return (
    <section
      id="chapter-intro"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 overflow-hidden select-none"
    >
      {/* Top Subtle Film Header Bar */}
      <div
        className={`w-full max-w-7xl mx-auto flex justify-between items-center z-20 transition-all duration-1000 ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6600] animate-ping" />
          <span className="text-xs md:text-sm uppercase tracking-[0.35em] font-cinzel text-[#FFD700] font-bold">
            {language === 'mr' ? '॥ ऐतिहासिक महागाथा ॥' : '॥ THE HISTORICAL SAGA ॥'}
          </span>
        </div>
        <div className="text-right flex items-center space-x-2">
          <span className="text-xs md:text-sm font-marathi text-[#E5B342] tracking-widest font-semibold">
            {language === 'mr' ? '॥ श्री जगदंब प्रसन्न ॥' : '॥ Shree Jagadamb Prasanna ॥'}
          </span>
        </div>
      </div>

      {/* Main Center Cinematic Stage */}
      <div className="relative z-20 w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto py-8">
        {/* Sacred Sanskrit Verse Tag */}
        <div
          className={`inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#1F1106]/90 border border-[#FFD700]/40 shadow-[0_0_25px_rgba(255,102,0,0.35)] mb-4 backdrop-blur-md transition-all duration-1000 delay-300 ${
            revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#FFD700] animate-spin" style={{ animationDuration: '6s' }} />
          <p className="text-xs sm:text-sm md:text-base font-devanagari-display text-[#FFE4B5] font-bold tracking-wide">
            {language === 'mr'
              ? 'हे राज्य व्हावे, हे तो श्रींचे मन!'
              : '“This sovereign empire is the divine will of the Almighty!”'}
          </p>
        </div>

        {/* Grand Title in Regal Typography */}
        <h1
          className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-devanagari-display font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD700] to-[#E65100] drop-shadow-[0_12px_45px_rgba(255,102,0,0.55)] transition-all duration-1000 delay-500 leading-tight ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {language === 'mr' ? 'छत्रपती शिवाजी महाराज' : 'CHHATRAPATI SHIVAJI MAHARAJ'}
        </h1>

        {/* Subtitle & Sahyadri Royal Epithet */}
        <p
          className={`mt-3 sm:mt-5 text-sm sm:text-lg md:text-2xl font-cinzel tracking-[0.22em] text-[#F3E5D0] max-w-3xl font-medium transition-all duration-1000 delay-700 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {language === 'mr'
            ? 'सह्याद्रीचे सार्वभौम सिंहासनाधीश्वर • हिंदवी स्वराज्याचे संस्थापक'
            : 'Sovereign of the Sahyadri • Founder of Hindavi Swarajya'}
        </p>

        {/* Illustrated Majestic Horseback Silhouette & Dynamic Saffron Aura */}
        <div
          className={`relative w-full max-w-lg h-60 sm:h-72 my-3 flex items-center justify-center transition-all duration-1000 delay-900 ${
            horseRiding ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Radial Sunrise Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF4500]/30 via-[#FFAA00]/25 to-transparent rounded-full filter blur-3xl animate-pulse-glow" />

          {/* SVG Silhouette: Royal Warrior on Steed with Bhagwa Flag */}
          <svg
            viewBox="0 0 340 240"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]"
          >
            {/* Mountain Ridge Base */}
            <path
              d="M0,225 Q50,205 120,215 T250,198 Q300,218 340,225 L340,240 L0,240 Z"
              fill="#120904"
            />
            {/* Distant Fort Watchtower with crenellations */}
            <rect x="250" y="165" width="26" height="35" fill="#1C0E07" />
            <polygon points="250,165 263,148 276,165" fill="#1C0E07" />
            <polygon points="276,152 296,159 276,166" fill="#FF5500" />

            {/* Steed Silhouette */}
            <g fill="#0B0603">
              {/* Horse Body */}
              <ellipse cx="145" cy="165" rx="42" ry="24" transform="rotate(-10 145 165)" />
              {/* Horse Neck & Head reared slightly with proud bridle */}
              <path d="M172,152 Q195,125 205,110 Q216,102 212,114 Q204,130 185,168 Z" />
              <circle cx="208" cy="110" r="7" />
              {/* Ears */}
              <polygon points="206,105 210,92 215,105" />
              {/* Front Legs in motion */}
              <path d="M175,172 L194,212 L202,210 L184,170 Z" />
              <path d="M165,172 L176,200 L168,218 L160,215 Z" />
              {/* Hind Legs */}
              <path d="M118,168 L108,202 L96,224 L104,226 L120,198 Z" />
              <path d="M130,170 L124,208 L131,224 L138,222 Z" />
              {/* Tail flowing in mountain wind */}
              <path d="M106,158 Q78,166 70,188 Q84,176 108,166 Z" fill="#190D06" />
            </g>

            {/* Chhatrapati Shivaji Maharaj on Steed */}
            <g fill="#060301">
              {/* Torso & Armor */}
              <path d="M148,118 Q152,145 148,162 L134,162 Q134,135 143,118 Z" />
              {/* Head with Maratha Mandil / Pagdi */}
              <circle cx="150" cy="108" r="9" />
              <path d="M141,105 Q151,90 162,100 Q155,110 141,105 Z" fill="#2E1609" />
              {/* Kalgi / Royal Pearl Feather Brooch */}
              <polygon points="151,92 155,75 158,92" fill="#FFD700" />
              <circle cx="155" cy="73" r="2.5" fill="#38BDF8" />
              {/* Arm holding reins */}
              <path d="M150,122 L172,138 L178,133 L152,118 Z" />
              {/* Royal Bhavani Talwar Scabbard on waist */}
              <line x1="130" y1="135" x2="108" y2="162" stroke="#FFD700" strokeWidth="3" />
              <circle cx="130" cy="135" r="3" fill="#FF5500" />
            </g>

            {/* Fluttering Royal Saffron Bhagwa Dhwaj */}
            <g>
              <line x1="140" y1="160" x2="140" y2="50" stroke="#9A6B38" strokeWidth="3.5" />
              <circle cx="140" cy="48" r="4" fill="#FFD700" />
              {/* Double Swallowtail Maratha Flag */}
              <path
                d="M142,52 Q180,44 216,58 Q196,70 216,82 Q180,72 142,88 Z"
                fill="#FF5500"
                stroke="#FFD700"
                strokeWidth="1.5"
              />
              <circle cx="162" cy="66" r="4.5" fill="#FFE066" />
            </g>
          </svg>
        </div>

        {/* Interactive Historical Battle Instruments Audio Deck */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-2 transition-all duration-1000 delay-950 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-[11px] font-cinzel tracking-widest text-[#E5B342] uppercase font-bold mr-1">
            {language === 'mr' ? 'रणवाद्ये:' : 'Instruments:'}
          </span>

          <button
            onClick={() => triggerHeroSound('tutari')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-marathi font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeSoundEffect === 'tutari'
                ? 'bg-[#FF6600] text-white border-[#FFD700] scale-105 shadow-[0_0_15px_rgba(255,102,0,0.8)]'
                : 'bg-[#1C0E07]/90 text-[#FFD700] border-[#3B1F0E] hover:border-[#FF7700] hover:bg-[#2E160A]'
            }`}
          >
            <span>🎺 {language === 'mr' ? 'तुतारी (Tutari)' : 'Tutari Horn'}</span>
          </button>

          <button
            onClick={() => triggerHeroSound('drum')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-marathi font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeSoundEffect === 'drum'
                ? 'bg-[#FF6600] text-white border-[#FFD700] scale-105 shadow-[0_0_15px_rgba(255,102,0,0.8)]'
                : 'bg-[#1C0E07]/90 text-[#FFD700] border-[#3B1F0E] hover:border-[#FF7700] hover:bg-[#2E160A]'
            }`}
          >
            <span>🥁 {language === 'mr' ? 'ढोल-नगारे (War Drum)' : 'War Drums'}</span>
          </button>

          <button
            onClick={() => triggerHeroSound('shankh')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-marathi font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeSoundEffect === 'shankh'
                ? 'bg-[#FF6600] text-white border-[#FFD700] scale-105 shadow-[0_0_15px_rgba(255,102,0,0.8)]'
                : 'bg-[#1C0E07]/90 text-[#FFD700] border-[#3B1F0E] hover:border-[#FF7700] hover:bg-[#2E160A]'
            }`}
          >
            <span>🐚 {language === 'mr' ? 'शंखनाद (Shankh)' : 'Conch Horn'}</span>
          </button>

          <button
            onClick={() => triggerHeroSound('bell')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-marathi font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeSoundEffect === 'bell'
                ? 'bg-[#FF6600] text-white border-[#FFD700] scale-105 shadow-[0_0_15px_rgba(255,102,0,0.8)]'
                : 'bg-[#1C0E07]/90 text-[#FFD700] border-[#3B1F0E] hover:border-[#FF7700] hover:bg-[#2E160A]'
            }`}
          >
            <span>🔔 {language === 'mr' ? 'घंटानाद (Bell)' : 'Temple Bell'}</span>
          </button>
        </div>

        {/* Primary Action Button Controls */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 mt-4 transition-all duration-1000 delay-1000 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={() => {
              audioEngine.playTutariFanfare();
              audioEngine.playWarDrum('heavy');
              onExploreClick();
            }}
            id="start-cinematic-scroll-btn"
            className="group relative inline-flex items-center space-x-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#D93800] via-[#FF6600] to-[#FFAA00] text-white font-cinzel font-bold text-sm sm:text-base tracking-wider shadow-[0_0_35px_rgba(255,102,0,0.6)] hover:shadow-[0_0_55px_rgba(255,102,0,0.9)] hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-white transition-transform group-hover:scale-110" />
            <span>{language === 'mr' ? 'स्वराज्य यात्रा सुरू करा' : 'Enter The Swarajya Journey'}</span>
          </button>

          <button
            onClick={onToggleAudio}
            id="hero-sound-toggle-btn"
            className="inline-flex items-center space-x-2.5 px-6 py-4 rounded-full bg-[#180D06]/85 border border-[#FFD700]/40 text-[#E5D7C3] hover:text-white hover:border-[#FF7700] hover:bg-[#29160A] text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-[#FF7700]" />
                <span>{language === 'mr' ? 'ध्वनी सुरू करा (Sound On)' : 'Enable Cinematic Sound'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#FFD700] animate-pulse" />
                <span className="text-[#FFD700]">{language === 'mr' ? 'ध्वनी चालू आहे' : 'Sound Active'}</span>
              </>
            )}
          </button>
        </div>

        {/* Sacred Eulogy by Ramdas Swami */}
        <div
          className={`mt-6 max-w-xl mx-auto p-3.5 rounded-2xl bg-gradient-to-r from-[#241208]/90 via-[#180A04]/90 to-[#241208]/90 border border-[#E5B342]/25 shadow-lg transition-all duration-1000 delay-1100 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xs sm:text-sm font-devanagari-display text-[#FFD285] leading-relaxed italic">
            {language === 'mr'
              ? '“निश्चयाचा महामेरु । बहुत जनांसी आधारु । अखंड स्थितीचा निर्धारु । श्रीमंत योगी ॥”'
              : '“A great mountain of resolve, pillar of strength for millions, unwavering in righteousness: The Saintly King.”'}
          </p>
          <span className="text-[10px] font-cinzel text-[#C8B8A0] uppercase tracking-widest mt-1 block">
            — {language === 'mr' ? 'समर्थ रामदास स्वामी' : 'Samarth Ramdas Swami'}
          </span>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center pb-2 text-center transition-all duration-1000 delay-1200 ${
          revealed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C5B398] mb-1.5">
          {language === 'mr' ? 'खाली स्क्रोल करा आणि इतिहास अनुभवा' : 'Scroll Down to Journey Through History'}
        </span>
        <ChevronDown className="w-5 h-5 text-[#FF7700] animate-bounce" />
      </div>
    </section>
  );
};
