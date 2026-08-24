import React, { useState } from 'react';
import { TACTICS, WEAPONS } from '../data/historyData';
import { Language, Weapon } from '../types';
import { Flame, Shield, Swords, Sparkles, Anchor, ChevronRight, CheckCircle2, Award } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface BattlefieldSceneProps {
  language: Language;
}

export const BattlefieldScene: React.FC<BattlefieldSceneProps> = ({ language }) => {
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon>(WEAPONS[0]);
  const [isShaking, setIsShaking] = useState(false);
  const [afzalStep, setAfzalStep] = useState(0);

  const afzalTimeline = [
    {
      step: 1,
      titleMr: '१. जावळीच्या जंगलातील शामियाना',
      titleEn: '1. The Shamiana in Dense Jawali Woods',
      descMr: 'प्रतापगडाच्या पायथ्याशी शांततेचा देखावा करून महाकाय अफजलखान आणि महाराज भेटले. दोन्ही बाजूला प्रत्येकी दोन रक्षक.',
      descEn: 'Under the ramparts of Pratapgad, Shivaji and Afzal Khan meet inside an ornate royal tent with only two bodyguards each.',
    },
    {
      step: 2,
      titleMr: '२. कपटी मिठी व पाठीत कट्यारीचा वार',
      titleEn: '2. The Treacherous Embrace & Hidden Dagger',
      descMr: 'अफजलखानाने महाराजांना मिठी मारून गळा आवळला आणि पाठीत खंजीर खुपसण्याचा प्रयत्न केला.',
      descEn: 'Afzal Khan traps the King in an iron embrace and plunges a hidden dagger into Shivaji’s side.',
    },
    {
      step: 3,
      titleMr: '३. चिलखताचे संरक्षण व वाघनखांचा प्रहार',
      titleEn: '3. Concealed Armor & The Wagh Nakh Strike',
      descMr: 'अंगातील चिलखताने महाराजांचे रक्षण केले. क्षणाचाही विलंब न करता महाराजांनी वाघनखे खुपसून बिचव्याने खानाचा कोथळा बाहेर काढला.',
      descEn: 'Shivaji’s concealed chainmail deflects the blade. Instantly, Shivaji disembowels the giant with his razor-sharp Wagh Nakh.',
    },
    {
      step: 4,
      titleMr: '४. "होता जिवा म्हणून वाचला शिवा!"',
      titleEn: '4. Jiva Mahala Saves the King',
      descMr: 'सय्यद बंडाने तलवारीचा वार महाराजांवर केला, पण निष्ठावंत जिवा महालाने चपळाईने त्याचा हात हवेतच तोडला.',
      descEn: 'Syed Banda attacks Shivaji with a heavy sword, but loyal bodyguard Jiva Mahala severs Banda’s arm mid-air!',
    },
    {
      step: 5,
      titleMr: '५. तोफांचा इशारा व संपूर्ण विजय',
      titleEn: '5. Cannon Signal & Complete Routing',
      descMr: 'प्रतापगडावरून तोफ डागली गेली. जंगलात दबा धरून बसलेल्या कान्होजी जेधे व मावळ्यांनी खानाच्या सैन्याचा धुव्वा उडवला.',
      descEn: 'A cannon roars from Pratapgad. Hidden Mavala regiments ambush and completely annihilate the Adilshahi army.',
    },
  ];

  const triggerBattleClash = () => {
    setIsShaking(true);
    audioEngine.playSwordClash();
    audioEngine.playWarDrum('heavy');
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleNextAfzalStep = () => {
    const next = (afzalStep + 1) % afzalTimeline.length;
    setAfzalStep(next);
    if (next === 2) {
      audioEngine.playSwordClash();
    } else if (next === 4) {
      audioEngine.playCannonFire();
      audioEngine.playWarDrum('heavy');
    } else {
      audioEngine.playWarDrum('light');
    }
  };

  return (
    <section
      id="chapter-battle"
      className={`relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 z-10 transition-transform duration-100 ${
        isShaking ? 'translate-x-1.5 translate-y-1' : ''
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0503] via-[#200A04]/70 to-[#0A0503] pointer-events-none" />

      <div className="relative max-w-7xl w-full mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#CC2200]/20 border border-[#FF4400]/40 text-[#FFA040] text-xs font-cinzel font-semibold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>{language === 'mr' ? 'अध्याय ०५ • रणकौशल्य' : 'Chapter V • The Art of War'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-devanagari-display font-bold text-[#FFF5E6]">
            {language === 'mr' ? 'रणसंग्राम, गनिमी कावा आणि आरमार' : 'Guerrilla Tactics & Naval Supremacy'}
          </h2>

          <p className="text-sm sm:text-base font-marathi text-[#D4C3AC]">
            {language === 'mr'
              ? 'दऱ्याखोऱ्यांचा नैसर्गिक दुर्गम फायदा घेत हजारो पटीने मोठ्या शत्रुसैन्याला अचूक चालींनी नामोहरम करणारी शिवकालीन युद्धनीती.'
              : 'Mastering the terrain of the Sahyadri to outmaneuver empires ten times their size through speed, deception, and moral supremacy.'}
          </p>
        </div>

        {/* Interactive Pratapgad Encounter Timeline (Afzal Khan Defeat) */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#240F06] via-[#160803] to-[#0A0402] border-2 border-[#FF5500]/40 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#3E1C0A] pb-4">
            <div>
              <span className="text-xs font-cinzel text-[#FFD700] uppercase tracking-widest font-bold">
                {language === 'mr' ? 'ऐतिहासिक प्रसंग (१० नोव्हेंबर १६५९)' : 'Historic Encounter (Nov 10, 1659)'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-devanagari-display font-bold text-[#FFF2D6]">
                {language === 'mr' ? 'प्रतापगडाचा रणसंग्राम व अफजलखान वध' : 'The Battle of Pratapgad & Vanquishing Afzal Khan'}
              </h3>
            </div>

            <button
              onClick={handleNextAfzalStep}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF5500] to-[#E63900] text-white text-xs font-cinzel font-bold tracking-wider hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,85,0,0.5)] cursor-pointer"
            >
              <span>{language === 'mr' ? 'पुढील टप्पा पहा' : 'Next Tactical Phase'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Phase Stepper Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {afzalTimeline.map((item, idx) => {
              const isCurrent = idx === afzalStep;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setAfzalStep(idx);
                    audioEngine.playWarDrum('light');
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#FF6600]/25 border-[#FFD700] text-white shadow-lg'
                      : 'bg-[#150A04] border-[#311508] text-[#B09E8B] hover:text-[#FFD700]'
                  }`}
                >
                  <span className="text-[10px] font-cinzel block text-[#FF7700] font-bold">
                    {language === 'mr' ? `टप्पा ०${idx + 1}` : `Phase 0${idx + 1}`}
                  </span>
                  <span className="text-xs font-devanagari-display font-medium truncate block">
                    {language === 'mr' ? item.titleMr.split(' ')[1] : item.titleEn.split(' ')[1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Dive */}
          <div className="p-5 rounded-2xl bg-[#120703] border border-[#FF7700]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-left">
              <h4 className="text-xl font-devanagari-display font-extrabold text-[#FFD700]">
                {language === 'mr' ? afzalTimeline[afzalStep].titleMr : afzalTimeline[afzalStep].titleEn}
              </h4>
              <p className="text-sm font-marathi text-[#EDE4D8] leading-relaxed">
                {language === 'mr' ? afzalTimeline[afzalStep].descMr : afzalTimeline[afzalStep].descEn}
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center space-x-3">
              <button
                onClick={() => {
                  audioEngine.playSwordClash();
                  audioEngine.playCannonFire();
                }}
                className="px-4 py-2 rounded-xl bg-[#2E1508] border border-[#FFD700]/40 text-[#FFD700] text-xs font-cinzel font-bold hover:bg-[#3F1F0E] transition-all cursor-pointer"
              >
                ⚔️ {language === 'mr' ? 'तोफ व शस्त्र आवाज' : 'Cannon & Clash Audio'}
              </button>
            </div>
          </div>
        </div>

        {/* Tactical Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TACTICS.map((tactic) => (
            <div
              key={tactic.id}
              className="p-5 rounded-2xl bg-gradient-to-b from-[#220B04] via-[#160703] to-[#0A0502] border border-[#FF6600]/25 hover:border-[#FF5500] transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-[#FF4500]/20 text-[#FFA040] w-fit mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-cinzel font-bold text-[#FFE6B8] mb-2">
                  {language === 'mr' ? tactic.titleMr : tactic.titleEn}
                </h3>
                <p className="text-xs sm:text-sm font-marathi text-[#C8B8A0] leading-relaxed">
                  {language === 'mr' ? tactic.descMr : tactic.descEn}
                </p>
              </div>

              {tactic.id === 'navy' && (
                <div className="mt-4 pt-3 border-t border-[#3B1C0B] flex items-center space-x-1.5 text-xs font-cinzel text-[#38BDF8]">
                  <Anchor className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'भारतीय आरमाराचे जनक' : 'Father of Indian Navy'}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Weapons & Arsenal Interactive Showcase */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#1C0D06] via-[#120703] to-[#080402] border border-[#E5B342]/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[#3B1F0E] gap-4">
            <div>
              <span className="text-xs font-cinzel uppercase tracking-widest text-[#FF7700]">
                {language === 'mr' ? 'शस्त्रागार व युद्धकला' : 'Royal Arsenal & Armory'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-devanagari-display font-bold text-[#FFF5E6]">
                {language === 'mr' ? 'स्वराज्याची अजिंक्य अस्त्रे' : 'Sacred Weapons of Maratha Valor'}
              </h3>
            </div>

            <button
              onClick={triggerBattleClash}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D93800] to-[#FF6600] text-white text-xs font-cinzel font-bold tracking-wider hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,85,0,0.5)] cursor-pointer"
            >
              <Swords className="w-4 h-4" />
              <span>{language === 'mr' ? 'शस्त्र झंकार अनुभवा' : 'Simulate Weapon Clash'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
            {/* Weapon Selector List */}
            <div className="lg:col-span-5 space-y-2.5">
              {WEAPONS.map((w) => {
                const isSel = w.nameEn === selectedWeapon.nameEn;
                return (
                  <button
                    key={w.nameEn}
                    onClick={() => {
                      setSelectedWeapon(w);
                      audioEngine.playSwordClash();
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                      isSel
                        ? 'bg-gradient-to-r from-[#3D1A08] to-[#241005] border-[#FFD700] text-white shadow-lg'
                        : 'bg-[#150A04]/70 border-[#33180B] text-[#D1C2AD] hover:bg-[#220E06] hover:border-[#FF7700]/40'
                    }`}
                  >
                    <div>
                      <h4 className="font-devanagari-display font-bold text-base">
                        {language === 'mr' ? w.nameMr : w.nameEn}
                      </h4>
                      <span className="text-[11px] font-cinzel text-[#FFA040]">
                        {language === 'mr' ? w.typeMr : w.typeEn}
                      </span>
                    </div>
                    <Sparkles className={`w-4 h-4 ${isSel ? 'text-[#FFD700]' : 'text-transparent'}`} />
                  </button>
                );
              })}
            </div>

            {/* Selected Weapon Detail Stage */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0F0703] border border-[#E5B342]/20 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-cinzel text-[#E5B342] uppercase tracking-widest">
                    {language === 'mr' ? selectedWeapon.typeMr : selectedWeapon.typeEn}
                  </span>
                  <span className="text-[11px] font-marathi px-2.5 py-1 rounded-md bg-[#241207] text-[#FFB700] border border-[#FF7700]/30">
                    {selectedWeapon.lengthOrSpec}
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-devanagari-display font-extrabold text-[#FFF5E6] mb-3">
                  {language === 'mr' ? selectedWeapon.nameMr : selectedWeapon.nameEn}
                </h4>

                <p className="text-sm sm:text-base font-marathi text-[#D4C3AC] leading-relaxed">
                  {language === 'mr' ? selectedWeapon.descMr : selectedWeapon.descEn}
                </p>
              </div>

              {/* Graphic Weapon Schematic */}
              <div className="h-28 w-full rounded-xl bg-[#1A0C05] border border-[#FF6600]/20 flex items-center justify-center p-4 relative overflow-hidden">
                <svg viewBox="0 0 300 80" className="w-full h-full object-contain">
                  {selectedWeapon.nameEn.includes('Bhavani') && (
                    <g>
                      {/* Long Straight Sword Blade with Gold Inscription */}
                      <path d="M40,40 L260,35 L280,40 L260,45 L40,40 Z" fill="#D1D5DB" />
                      <line x1="45" y1="40" x2="255" y2="40" stroke="#9CA3AF" strokeWidth="1" />
                      {/* Golden Hilt & Pommel */}
                      <rect x="25" y="32" width="18" height="16" fill="#D4AF37" rx="2" />
                      <circle cx="20" cy="40" r="7" fill="#B45309" stroke="#FBBF24" strokeWidth="1" />
                      <polygon points="40,25 45,40 40,55 35,40" fill="#F59E0B" />
                    </g>
                  )}

                  {selectedWeapon.nameEn.includes('Dandpatta') && (
                    <g>
                      {/* Gauntlet Arm Shield */}
                      <path d="M20,25 L75,28 L75,52 L20,55 Z" fill="#4B5563" stroke="#D4AF37" strokeWidth="1.5" />
                      {/* Long Flexible Blade */}
                      <path d="M75,38 L275,36 L290,40 L275,44 L75,42 Z" fill="#E5E7EB" />
                    </g>
                  )}

                  {selectedWeapon.nameEn.includes('Wagh') && (
                    <g>
                      {/* 4 Curved Tiger Claws */}
                      <rect x="100" y="35" width="100" height="10" fill="#374151" rx="4" />
                      <path d="M115,40 Q110,65 125,70 Q122,55 120,40 Z" fill="#D4AF37" />
                      <path d="M140,40 Q135,65 150,70 Q147,55 145,40 Z" fill="#D4AF37" />
                      <path d="M165,40 Q160,65 175,70 Q172,55 170,40 Z" fill="#D4AF37" />
                      <path d="M190,40 Q185,65 200,70 Q197,55 195,40 Z" fill="#D4AF37" />
                    </g>
                  )}

                  {selectedWeapon.nameEn.includes('Dhop') && (
                    <g>
                      {/* Katar H-shape punch handle */}
                      <rect x="60" y="25" width="8" height="30" fill="#D4AF37" />
                      <rect x="90" y="25" width="8" height="30" fill="#D4AF37" />
                      <rect x="65" y="34" width="28" height="4" fill="#92400E" />
                      <rect x="65" y="42" width="28" height="4" fill="#92400E" />
                      {/* Piercing Triangle Blade */}
                      <polygon points="98,25 240,40 98,55" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
