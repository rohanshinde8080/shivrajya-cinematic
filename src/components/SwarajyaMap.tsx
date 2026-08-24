import React, { useState } from 'react';
import { FORTS } from '../data/historyData';
import { Fort, Language } from '../types';
import { Compass, MapPin, Flag, Layers, Mountain, Shield, ChevronRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface SwarajyaMapProps {
  language: Language;
}

export const SwarajyaMap: React.FC<SwarajyaMapProps> = ({ language }) => {
  const [activeFort, setActiveFort] = useState<Fort>(FORTS[6]); // default Raigad
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hill' | 'sea'>('all');
  const [timelineYear, setTimelineYear] = useState<number>(1674);

  const filteredForts = FORTS.filter((f) =>
    selectedCategory === 'all' ? true : f.fortCategory === selectedCategory
  );

  return (
    <section
      id="chapter-map"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0503] via-[#120904]/70 to-[#0A0503] pointer-events-none" />

      <div className="relative max-w-7xl w-full mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E65C00]/20 border border-[#FF7700]/40 text-[#FFA040] text-xs font-cinzel font-semibold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-[#FF8800]" />
            <span>{language === 'mr' ? 'अध्याय ०६ • भूगोल व साम्राज्य' : 'Chapter VI • Territorial Swarajya'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-devanagari-display font-bold text-[#FFF5E6]">
            {language === 'mr' ? 'स्वराज्याचा परस्पर जोडलेला ऐतिहासिक नकाशा' : 'Interactive Map of Swarajya Fortresses'}
          </h2>

          <p className="text-sm sm:text-base font-marathi text-[#D4C3AC]">
            {language === 'mr'
              ? 'सह्याद्रीच्या उंच कड्यांवरून ते अरबी समुद्राच्या लाटांपर्यंत पसरलेली शिवछत्रपतींच्या ३५०+ गडकोटांची अभेद्य जाळी.'
              : 'Explore the strategic military geography uniting the Western Ghats, the Konkan coast, and the Deccan plateau.'}
          </p>
        </div>

        {/* Filter Controls & Timeline Era */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#170E08]/80 border border-[#E5B342]/20 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-cinzel text-[#E5B342] mr-2">
              {language === 'mr' ? 'दुर्ग प्रकार:' : 'Type:'}
            </span>
            {(['all', 'hill', 'sea'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-marathi font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF6600] text-white shadow-md'
                    : 'bg-[#241409] text-[#D1C2AD] hover:bg-[#361E0E]'
                }`}
              >
                {cat === 'all'
                  ? language === 'mr'
                    ? 'सर्व किल्ले (All)'
                    : 'All Forts'
                  : cat === 'hill'
                  ? language === 'mr'
                    ? 'डोंगरी दुर्ग (Hill)'
                    : 'Hill Forts'
                  : language === 'mr'
                  ? 'जलदुर्ग (Sea)'
                  : 'Sea Forts'}
              </button>
            ))}
          </div>

          {/* Timeline Milestones */}
          <div className="flex items-center space-x-3 text-xs font-cinzel">
            <span className="text-[#E5B342]">{language === 'mr' ? 'कालखंड:' : 'Era:'}</span>
            {[1646, 1659, 1670, 1674, 1680].map((yr) => (
              <button
                key={yr}
                onClick={() => {
                  setTimelineYear(yr);
                  audioEngine.playWarDrum('light');
                }}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  timelineYear === yr
                    ? 'bg-[#FFD700] text-[#0A0503] font-bold shadow'
                    : 'bg-[#241409] text-[#A89885] hover:text-white'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Map Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Map Projection Canvas */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-3xl bg-[#0D0805] border border-[#E5B342]/30 p-4 overflow-hidden shadow-2xl">
            {/* Ambient Water & Land styling */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#04121A] via-[#0E0704] to-[#140A05] opacity-90" />

            {/* Simulated Maharashtra Map SVG Outline & Sahyadri Spine */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2">
              {/* Arabian Sea Waves on West */}
              <path
                d="M5,10 Q15,40 10,60 Q20,80 12,95 L0,95 L0,0 L20,0 Z"
                fill="#051E2E"
                opacity="0.6"
              />
              {/* Sahyadri Western Ghats Mountain Ridge Spine */}
              <path
                d="M44,15 Q48,45 42,65 Q45,85 40,95"
                stroke="#6B4119"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
              <path
                d="M44,15 Q48,45 42,65 Q45,85 40,95"
                stroke="#FF6600"
                strokeWidth="1.2"
                strokeDasharray="2 2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />

              {/* Connecting Swarajya Route Lines */}
              <polyline
                points="46,38 49,46 44,52 47,50 39,55 41,64 45,82 38,92"
                fill="none"
                stroke="#FFB700"
                strokeWidth="0.8"
                strokeDasharray="1.5 1.5"
                className="animate-pulse"
              />

              {/* Glowing Fort Coordinate Nodes */}
              {filteredForts.map((fort) => {
                const isSelected = fort.id === activeFort.id;
                return (
                  <g
                    key={fort.id}
                    onClick={() => {
                      setActiveFort(fort);
                      audioEngine.playWarDrum('light');
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing Outer Glow ring */}
                    {isSelected && (
                      <circle
                        cx={fort.coordinates.x}
                        cy={fort.coordinates.y}
                        r="6"
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Main Node */}
                    <circle
                      cx={fort.coordinates.x}
                      cy={fort.coordinates.y}
                      r={isSelected ? "3.5" : "2.2"}
                      fill={isSelected ? '#FFD700' : fort.themeColor}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? '1' : '0.4'}
                    />

                    {/* Fort Mini Label */}
                    <text
                      x={fort.coordinates.x + 3}
                      y={fort.coordinates.y + 1.2}
                      fill={isSelected ? '#FFD700' : '#E5D7C3'}
                      fontSize={isSelected ? '3.8' : '3'}
                      fontFamily="'Cinzel', serif"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {language === 'mr' ? fort.nameMr : fort.nameEn.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Sea & Land Compass Indicators */}
            <div className="absolute top-4 left-4 text-[10px] font-cinzel text-[#38BDF8] tracking-widest">
              ← {language === 'mr' ? 'अरबी समुद्र (Arabian Sea)' : 'Arabian Sea (West)'}
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-cinzel text-[#E5B342] tracking-widest">
              {language === 'mr' ? 'दख्खन पठार (Deccan Plateau)' : 'Deccan Plateau (East)'} →
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] font-marathi text-[#FFA040]">
              ▲ {language === 'mr' ? 'सह्याद्री पर्वतरांग' : 'Sahyadri Ridge'}
            </div>
          </div>

          {/* Right: Selected Fort Intel & Strategic Overview */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1C0F07] to-[#0D0704] border border-[#E5B342]/30 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FF6600]/20 text-[#FFA040] text-xs font-cinzel font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeFort.district}</span>
              </span>
              <span className="text-xs font-marathi text-[#FFD700] px-2.5 py-1 rounded bg-[#2A1608] border border-[#FF7700]/30">
                {activeFort.elevation}
              </span>
            </div>

            <div>
              <h3 className="text-3xl font-devanagari-display font-extrabold text-[#FFF5E6]">
                {language === 'mr' ? activeFort.nameMr : activeFort.nameEn}
              </h3>
              <p className="text-xs font-cinzel text-[#C8B8A0] mt-1">
                {language === 'mr' ? 'ऐतिहासिक नोंद: ' : 'Recorded: '} {activeFort.year}
              </p>
            </div>

            <p className="text-sm font-marathi text-[#FFDCB0] leading-relaxed">
              {language === 'mr' ? activeFort.significanceMr : activeFort.significanceEn}
            </p>

            <div className="p-4 rounded-xl bg-[#120803] border border-[#3D2010]">
              <span className="text-[11px] font-cinzel text-[#FFA040] uppercase tracking-wider block mb-1">
                {language === 'mr' ? 'दुर्ग वास्तुकला व सामर्थ्य' : 'Fortification & Citadel'}
              </span>
              <p className="text-xs font-marathi text-[#EDE4D8]">
                {language === 'mr' ? activeFort.keyFeatureMr : activeFort.keyFeatureEn}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#2B1408] to-[#1A0C05] border-l-3 border-[#FF7700]">
              <p className="text-xs font-marathi text-[#FFE0B3] italic font-medium">
                “{language === 'mr' ? activeFort.quoteMr : activeFort.quoteEn}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
