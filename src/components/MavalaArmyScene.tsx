import React from 'react';
import { HISTORICAL_FIGURES } from '../data/historyData';
import { Language } from '../types';
import { Users, Shield, Heart, Award } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface MavalaArmySceneProps {
  language: Language;
}

export const MavalaArmyScene: React.FC<MavalaArmySceneProps> = ({ language }) => {
  return (
    <section
      id="chapter-army"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0503] via-[#1A0C05]/60 to-[#0A0503] pointer-events-none" />

      <div className="relative max-w-7xl w-full mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF6600]/15 border border-[#FF6600]/30 text-[#FFA040] text-xs font-cinzel font-semibold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अध्याय ०४ • वीर मावळे' : 'Chapter IV • The Mavala Warriors'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-devanagari-display font-bold text-[#FFF5E6]">
            {language === 'mr' ? 'निष्ठेची अमर गाथा: मावळे आणि पायदळ' : 'The Immortals: Mavala Warriors & Cavalry'}
          </h2>

          <p className="text-sm sm:text-base font-marathi text-[#D4C3AC]">
            {language === 'mr'
              ? 'ज्यांनी महाराजांच्या एका शब्दावर स्वतःचे आयुष्य आणि संसार अर्पण केला, ते सह्याद्रीचे शूर मावळे स्वराज्याचा खरा पाया होते.'
              : 'The hardy hill warriors of the Sahyadri who pledged their lives for their King and the dream of a free motherland.'}
          </p>
        </div>

        {/* Cinematic Crowd / Army Parallax Graphic */}
        <div className="relative w-full rounded-2xl bg-gradient-to-r from-[#1E0E05] via-[#2A1408] to-[#1E0E05] border border-[#E5B342]/25 p-6 overflow-hidden shadow-2xl">
          {/* Animated dust motes and flag flutter */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF5500]/15 via-transparent to-transparent pointer-events-none" />

          {/* SVG Army Graphic */}
          <div className="w-full h-44 sm:h-56 relative flex items-end justify-center overflow-hidden">
            <svg viewBox="0 0 800 200" className="w-full h-full object-cover">
              {/* Mountain Passes */}
              <polygon points="0,200 120,90 280,140 450,70 620,120 800,80 800,200" fill="#140A05" />
              <polygon points="0,200 200,130 380,160 550,110 700,150 800,120 800,200" fill="#1B0E07" />

              {/* Ranks of Soldiers Silhouettes holding Spears & Saffron Flags */}
              {Array.from({ length: 32 }).map((_, i) => {
                const x = 20 + i * 24 + (i % 3) * 3;
                const y = 140 + (i % 4) * 8;
                const hasFlag = i % 4 === 1;
                return (
                  <g key={i} fill="#090503">
                    {/* Soldier Head & Mandil */}
                    <circle cx={x} cy={y - 28} r={5} />
                    <path d={`M${x - 6},${y - 28} Q${x},${y - 36} ${x + 6},${y - 28} Z`} fill="#1E0E06" />
                    {/* Torso & Shield */}
                    <path d={`M${x - 6},${y - 22} L${x + 6},${y - 22} L${x + 4},${y} L${x - 4},${y} Z`} />
                    <circle cx={x - 5} cy={y - 12} r={6} fill="#2E1B10" stroke="#FF7700" strokeWidth="0.5" />
                    {/* Spear / Bhala */}
                    <line x1={x + 3} y1={y} x2={x + 3} y2={y - 45} stroke="#E5B342" strokeWidth="1.5" />
                    <polygon
                      points={`${x + 1},${y - 45} ${x + 3},${y - 54} ${x + 5},${y - 45}`}
                      fill="#FFD700"
                    />

                    {/* Saffron Flag atop commander spear */}
                    {hasFlag && (
                      <polygon
                        points={`${x + 3},${y - 50} ${x + 22},${y - 44} ${x + 3},${y - 38}`}
                        fill="#FF5500"
                      />
                    )}
                  </g>
                );
              })}

              {/* Front Commander on Horseback */}
              <g transform="translate(380, 110)">
                <ellipse cx="20" cy="40" rx="24" ry="14" fill="#0A0503" />
                <path d="M35,35 Q50,15 55,5 Q60,15 45,45 Z" fill="#0A0503" />
                <circle cx="22" cy="18" r="6" fill="#080402" />
                <line x1="25" y1="20" x2="25" y2="-20" stroke="#E5B342" strokeWidth="2" />
                <polygon points="25,-20 48,-12 25,-4" fill="#FF6600" />
              </g>
            </svg>
          </div>

          {/* Sound Action Prompt */}
          <div className="flex justify-center mt-3">
            <button
              onClick={() => audioEngine.playWarDrum('heavy')}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#36190B] border border-[#FF7700]/50 text-[#FFC477] hover:bg-[#4D2410] hover:text-white transition-all text-xs font-cinzel font-bold cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>{language === 'mr' ? 'रणशिंग व तोफांचा गजर ऐका' : 'Sound War Drums & Horns'}</span>
            </button>
          </div>
        </div>

        {/* Hero Commanders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HISTORICAL_FIGURES.map((figure, idx) => (
            <div
              key={idx}
              className="group p-5 rounded-2xl bg-gradient-to-b from-[#1B0E06] via-[#120803] to-[#0A0502] border border-[#E5B342]/20 hover:border-[#FF7700]/60 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-lg bg-[#FF6600]/15 text-[#FFA040] group-hover:scale-110 transition-transform">
                    <Shield className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-cinzel tracking-widest text-[#E5B342] uppercase">
                    {language === 'mr' ? figure.roleMr : figure.roleEn}
                  </span>
                </div>

                <h3 className="text-xl font-devanagari-display font-bold text-[#FFF2D6]">
                  {language === 'mr' ? figure.nameMr : figure.nameEn}
                </h3>

                <p className="text-xs sm:text-sm font-marathi text-[#D4C3AC] leading-relaxed">
                  {language === 'mr' ? figure.descMr : figure.descEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#3A2214] flex items-center space-x-1 text-[#FF8800] text-[11px] font-cinzel">
                <Heart className="w-3 h-3 fill-current" />
                <span>{language === 'mr' ? 'अतुलनीय त्याग व निष्ठा' : 'Supreme Valour & Devotion'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
