import React, { useState } from 'react';
import { FORTS } from '../data/historyData';
import { Fort, Language } from '../types';
import { Shield, Mountain, Compass, ChevronLeft, ChevronRight, Flag, Calendar, Award } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface FortCarouselProps {
  language: Language;
}

export const FortCarousel: React.FC<FortCarouselProps> = ({ language }) => {
  const [selectedFort, setSelectedFort] = useState<Fort>(FORTS[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFortChange = (index: number) => {
    const nextIndex = (index + FORTS.length) % FORTS.length;
    setActiveIndex(nextIndex);
    setSelectedFort(FORTS[nextIndex]);
    audioEngine.playWarDrum('light');
  };

  return (
    <section
      id="chapter-forts"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 z-10"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0503] via-[#140A04]/60 to-[#0A0503] pointer-events-none" />

      <div className="relative max-w-7xl w-full mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF6600]/15 border border-[#FF6600]/30 text-[#FFA040] text-xs font-cinzel font-semibold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अध्याय ०३ • सह्याद्रीचे पाषाण' : 'Chapter III • Bastions of Stone'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-devanagari-display font-bold text-[#FFF5E6]">
            {language === 'mr' ? 'अभेद्य दुर्ग आणि सह्याद्रीची साखळी' : 'The Impregnable Fortresses of Sahyadri'}
          </h2>

          <p className="text-sm sm:text-base font-marathi text-[#D4C3AC]">
            {language === 'mr'
              ? '“किल्ला म्हणजे राज्याचे मूळ, किल्ला म्हणजे राज्य!” छत्रपती शिवाजी महाराजांनी ३५० हून अधिक गडकोटांची अभेद्य साखळी निर्माण केली.'
              : '“A fort is the foundation of the state; a fort IS the kingdom!” Shivaji Maharaj forged an interconnected network of over 350 fortresses.'}
          </p>
        </div>

        {/* Horizontal Fort Pill Tabs Selector */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 scrollbar-none px-2">
          {FORTS.map((fort, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={fort.id}
                onClick={() => handleFortChange(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-marathi font-medium transition-all duration-300 flex items-center space-x-2 border cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E04B00] to-[#FF7700] text-white border-[#FFD700] shadow-[0_0_20px_rgba(255,102,0,0.5)] scale-105'
                    : 'bg-[#180E08]/80 text-[#D1C2AD] border-[#3B2212] hover:border-[#FF7700]/50 hover:bg-[#26150B]'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFD700]' : 'text-[#FF7700]'}`} />
                <span>{language === 'mr' ? fort.nameMr : fort.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Main Cinematic Fort Card Presentation */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#1F1108]/95 via-[#130B05] to-[#0D0704] border border-[#E5B342]/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Dynamic Fort Theme Ambient Light */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40"
            style={{ backgroundColor: selectedFort.themeColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Visual Fortress Elevation, Flag & Art */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              {/* Fort Graphic Representation */}
              <div className="w-full h-64 sm:h-72 rounded-2xl bg-[#110A06] border border-[#E5B342]/20 p-4 flex flex-col justify-between relative overflow-hidden group">
                {/* Fort Silhouette Illustration in SVG */}
                <svg viewBox="0 0 320 200" className="w-full h-full object-cover absolute inset-0">
                  <defs>
                    <linearGradient id={`fortGrad-${selectedFort.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={selectedFort.themeColor} stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#080503" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>

                  {/* Sky Glow */}
                  <rect width="320" height="200" fill={`url(#fortGrad-${selectedFort.id})`} />

                  {/* High Mountain Ridge */}
                  <polygon
                    points="0,200 0,140 40,110 90,130 140,80 190,95 240,60 280,100 320,80 320,200"
                    fill="#150C07"
                  />
                  {/* Bastion Walls & Battlements */}
                  <rect x="220" y="55" width="40" height="25" fill="#24140B" />
                  <polygon points="220,55 228,45 236,55 244,45 252,55 260,45 260,55" fill="#24140B" />
                  {/* Saffron Flag atop Bastion */}
                  <line x1="240" y1="45" x2="240" y2="20" stroke="#E5B342" strokeWidth="2" />
                  <polygon points="240,20 265,28 240,36" fill="#FF5500" />

                  {/* Steep cliff lines */}
                  <path
                    d="M40,110 L55,200 M90,130 L105,200 M140,80 L160,200 M240,60 L235,200"
                    stroke="#2E1B10"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Top Badge: Type & Elevation */}
                <div className="relative z-10 flex justify-between items-center w-full">
                  <span className="px-2.5 py-1 rounded-md bg-[#0D0704]/80 border border-[#E5B342]/30 text-[11px] font-cinzel text-[#FFD700]">
                    {selectedFort.type}
                  </span>
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-[#0D0704]/80 border border-[#FF6600]/30 text-[11px] font-marathi text-[#FF9944]">
                    <Mountain className="w-3 h-3" />
                    <span>{selectedFort.elevation}</span>
                  </span>
                </div>

                {/* Bottom Quote Banner */}
                <div className="relative z-10 w-full p-2.5 rounded-lg bg-[#140A05]/90 border border-[#FF7700]/30 backdrop-blur-sm">
                  <p className="text-xs font-marathi text-[#FFE0B3] italic font-semibold text-center">
                    “{language === 'mr' ? selectedFort.quoteMr : selectedFort.quoteEn}”
                  </p>
                </div>
              </div>

              {/* Navigation Carousel Buttons */}
              <div className="flex items-center space-x-4 mt-5">
                <button
                  onClick={() => handleFortChange(activeIndex - 1)}
                  className="p-3 rounded-full bg-[#26150B] border border-[#E5B342]/30 text-[#E5D7C3] hover:text-white hover:border-[#FF7700] hover:bg-[#3D2010] transition-all cursor-pointer shadow-md"
                  aria-label="Previous Fort"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-cinzel tracking-widest text-[#E5B342]">
                  {activeIndex + 1} / {FORTS.length}
                </span>
                <button
                  onClick={() => handleFortChange(activeIndex + 1)}
                  className="p-3 rounded-full bg-[#26150B] border border-[#E5B342]/30 text-[#E5D7C3] hover:text-white hover:border-[#FF7700] hover:bg-[#3D2010] transition-all cursor-pointer shadow-md"
                  aria-label="Next Fort"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Col: Deep Historical Intel & Key Highlights */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Fort Title & District */}
              <div>
                <div className="flex items-center space-x-2 text-[#E5B342] text-xs font-cinzel uppercase tracking-widest mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{selectedFort.district}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-devanagari-display font-extrabold text-[#FFF5E6]">
                  {language === 'mr' ? selectedFort.nameMr : selectedFort.nameEn}
                </h3>
              </div>

              {/* Historical Significance */}
              <p className="text-sm sm:text-base font-marathi text-[#FFDCB0] leading-relaxed font-medium">
                {language === 'mr' ? selectedFort.significanceMr : selectedFort.significanceEn}
              </p>

              {/* Full History Narrative */}
              <p className="text-xs sm:text-sm font-marathi text-[#C8B8A0] leading-relaxed">
                {language === 'mr' ? selectedFort.historyMr : selectedFort.historyEn}
              </p>

              {/* Key Features & Year Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-[#170D07]/90 border border-[#E5B342]/20">
                  <div className="flex items-center space-x-2 text-[#FFA040] text-xs font-cinzel font-bold mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'ऐतिहासिक कालखंड' : 'Historical Era'}</span>
                  </div>
                  <p className="text-xs font-marathi text-[#EDE4D8]">{selectedFort.year}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#170D07]/90 border border-[#E5B342]/20">
                  <div className="flex items-center space-x-2 text-[#FFA040] text-xs font-cinzel font-bold mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'प्रमुख वैशिष्ट्ये' : 'Key Architecture'}</span>
                  </div>
                  <p className="text-xs font-marathi text-[#EDE4D8]">
                    {language === 'mr' ? selectedFort.keyFeatureMr : selectedFort.keyFeatureEn}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
