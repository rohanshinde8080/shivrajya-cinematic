import React, { useState } from 'react';
import { X, BookOpen, Shield, Swords, Users, Compass } from 'lucide-react';
import { FORTS, TACTICS, WEAPONS, HISTORICAL_FIGURES, RAJMUDRA } from '../data/historyData';
import { Language } from '../types';

interface HistoricalArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const HistoricalArchiveModal: React.FC<HistoricalArchiveModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'forts' | 'weapons' | 'commanders' | 'tactics' | 'rajmudra'>('forts');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#140A05] border-2 border-[#E5B342]/40 rounded-3xl p-6 sm:p-8 flex flex-col shadow-[0_0_80px_rgba(255,102,0,0.3)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#3B1F0E]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#FF6600]/20 text-[#FFA040]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-devanagari-display font-bold text-[#FFF5E6]">
                {language === 'mr' ? 'शिवकालीन ऐतिहासिक ज्ञानकोश' : 'Historical Archives of Swarajya'}
              </h2>
              <span className="text-xs font-cinzel text-[#E5B342] uppercase tracking-widest">
                {language === 'mr' ? 'संदर्भ व दस्तऐवज' : 'Chronicles & Heritage'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#241309] border border-[#E5B342]/30 text-[#D1C2AD] hover:text-white hover:bg-[#3D1F0E] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 overflow-x-auto py-3 border-b border-[#2A1608] scrollbar-none">
          {[
            { id: 'forts', labelMr: 'दुर्ग व किल्ले', labelEn: 'Fortresses', icon: Shield },
            { id: 'weapons', labelMr: 'शस्त्रागार', labelEn: 'Weapons', icon: Swords },
            { id: 'commanders', labelMr: 'शूरवीर सरदार', labelEn: 'Commanders', icon: Users },
            { id: 'tactics', labelMr: 'युद्धनीती', labelEn: 'Tactics', icon: Compass },
            { id: 'rajmudra', labelMr: 'राजमुद्रा', labelEn: 'Royal Seal', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-marathi font-medium flex items-center space-x-2 border transition-all cursor-pointer ${
                  isSel
                    ? 'bg-[#FF6600] text-white border-[#FFD700] shadow'
                    : 'bg-[#1C0E07] text-[#D1C2AD] border-[#3B1F0E] hover:bg-[#2B160B]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? tab.labelMr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {activeTab === 'forts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FORTS.map((fort) => (
                <div key={fort.id} className="p-4 rounded-2xl bg-[#1B0E06] border border-[#3A1F0F] space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-devanagari-display font-bold text-[#FFD700]">
                      {language === 'mr' ? fort.nameMr : fort.nameEn}
                    </h3>
                    <span className="text-[11px] font-cinzel text-[#FFA040] bg-[#2E1609] px-2 py-0.5 rounded">
                      {fort.district}
                    </span>
                  </div>
                  <p className="text-xs font-marathi text-[#EDE4D8]">{language === 'mr' ? fort.historyMr : fort.historyEn}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'weapons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WEAPONS.map((w, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#1B0E06] border border-[#3A1F0F] space-y-2">
                  <h3 className="text-lg font-devanagari-display font-bold text-[#FFD700]">
                    {language === 'mr' ? w.nameMr : w.nameEn}
                  </h3>
                  <span className="text-[11px] font-cinzel text-[#FFA040] block">
                    {language === 'mr' ? w.typeMr : w.typeEn} • {w.lengthOrSpec}
                  </span>
                  <p className="text-xs font-marathi text-[#EDE4D8]">{language === 'mr' ? w.descMr : w.descEn}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'commanders' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HISTORICAL_FIGURES.map((fig, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#1B0E06] border border-[#3A1F0F] space-y-2">
                  <h3 className="text-lg font-devanagari-display font-bold text-[#FFD700]">
                    {language === 'mr' ? fig.nameMr : fig.nameEn}
                  </h3>
                  <span className="text-[11px] font-cinzel text-[#FFA040] block">
                    {language === 'mr' ? fig.roleMr : fig.roleEn}
                  </span>
                  <p className="text-xs font-marathi text-[#EDE4D8]">{language === 'mr' ? fig.descMr : fig.descEn}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tactics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TACTICS.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl bg-[#1B0E06] border border-[#3A1F0F] space-y-2">
                  <h3 className="text-lg font-devanagari-display font-bold text-[#FFD700]">
                    {language === 'mr' ? t.titleMr : t.titleEn}
                  </h3>
                  <p className="text-xs font-marathi text-[#EDE4D8]">{language === 'mr' ? t.descMr : t.descEn}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rajmudra' && (
            <div className="p-6 rounded-2xl bg-[#1E0F07] border border-[#FFD700]/30 space-y-4 text-center">
              <p className="text-xl sm:text-2xl font-devanagari-display font-bold text-[#FFD700] whitespace-pre-line">
                {RAJMUDRA.sanskrit}
              </p>
              <div className="w-16 h-0.5 bg-[#FF6600] mx-auto" />
              <p className="text-sm font-marathi text-[#E5D7C3]">
                {language === 'mr' ? RAJMUDRA.marathi : RAJMUDRA.english}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
