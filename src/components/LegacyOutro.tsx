import React, { useState } from 'react';
import { RAJMUDRA } from '../data/historyData';
import { Language } from '../types';
import { Flag, Sparkles, Volume2, ArrowUp, Copy, Check, Shield, Crown } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

interface LegacyOutroProps {
  language: Language;
  onScrollToTop: () => void;
}

export const LegacyOutro: React.FC<LegacyOutroProps> = ({ language, onScrollToTop }) => {
  const [copied, setCopied] = useState(false);
  const [saluteCount, setSaluteCount] = useState(0);

  const rajmudraBreakdown = [
    {
      word: 'प्रतिपच्चंद्रलेखेव',
      transliteration: 'Pratipat-chandra-lekheva',
      meaningMr: 'प्रतिपदेच्या चंद्रकलेप्रमाणे प्रतिदिन वृद्धिंगत होणारी',
      meaningEn: 'Growing day by day like the waxing crescent of the new moon',
    },
    {
      word: 'वर्धिष्णुर्विश्ववंदिता',
      transliteration: 'Vardhishnur-vishva-vandita',
      meaningMr: 'सर्व जगाला वंदनीय आणि आदरणीय असणारी',
      meaningEn: 'Ever-expanding in glory and revered by the entire cosmos',
    },
    {
      word: 'शाहसूनोः शिवस्यैषा',
      transliteration: 'Shah-sunoho Shivasyaisha',
      meaningMr: 'शहाजीराजे यांचे सुपुत्र शिवाजी यांची',
      meaningEn: 'This royal decree belonging to Shivaji, son of Shahaji',
    },
    {
      word: 'मुद्रा भद्राय राजते',
      transliteration: 'Mudra Bhadraya Rajate',
      meaningMr: 'मुद्रा केवळ प्रजेच्या कल्याणासाठी आणि भल्यासाठीच अधिराज्य गाजवत आहे',
      meaningEn: 'Reigns supremely and exclusively for the welfare of all people',
    },
  ];

  const handleSalute = () => {
    setSaluteCount((prev) => prev + 1);
    audioEngine.playTutariFanfare();
    audioEngine.playWarDrum('heavy');

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF6600', '#FFA500', '#FFFFFF'],
    });
  };

  const copyRajmudra = () => {
    const textToCopy = `${RAJMUDRA.sanskrit}\n\n${RAJMUDRA.marathi}\n\n${RAJMUDRA.english}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="chapter-legacy"
      className="relative min-h-screen w-full flex flex-col justify-between items-center py-20 px-4 sm:px-6 lg:px-8 z-10 text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0503] via-[#1E0B04]/80 to-[#040201] pointer-events-none" />

      {/* Center Cinematic Roar Stage */}
      <div className="relative max-w-5xl w-full mx-auto space-y-12 my-auto">
        {/* Waving Giant Bhagwa Flag Banner Icon */}
        <div className="relative flex justify-center">
          <div className="relative p-4 rounded-full bg-[#FF6600]/20 border-2 border-[#FFD700]/40 shadow-[0_0_40px_rgba(255,102,0,0.5)] animate-pulse-glow">
            <Flag className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF6600]" />
          </div>
        </div>

        {/* Sacred Octagonal Rajmudra (The Sovereign Royal Seal) Display */}
        <div className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#2A1408] via-[#1A0A04] to-[#0D0502] border-2 border-[#FFD700]/50 shadow-[0_20px_70px_rgba(255,102,0,0.35)] relative overflow-hidden">
          {/* Octagonal Graphic Background Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FFD700]">
              <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" />
            </svg>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-cinzel text-[#FFD700] uppercase tracking-widest font-bold flex items-center space-x-1.5">
                <Crown className="w-4 h-4 text-[#FFD700]" />
                <span>{language === 'mr' ? '॥ पवित्र अष्टकोनी राजमुद्रा ॥' : '॥ The Sacred Royal Seal ॥'}</span>
              </span>

              <button
                onClick={copyRajmudra}
                className="px-3 py-1 rounded-lg bg-[#2E1408] border border-[#FF7700]/40 text-[#FFDCB0] hover:text-white text-xs font-cinzel flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="text-[#22C55E]">{language === 'mr' ? 'कॉपी झाले!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'मुद्रा कॉपी करा' : 'Copy Seal'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Sanskrit Seal */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#140803]/80 border border-[#FFD700]/30 shadow-inner">
              <p className="text-xl sm:text-3xl md:text-4xl font-devanagari-display font-black text-[#FFD700] tracking-wide leading-relaxed whitespace-pre-line drop-shadow-[0_4px_12px_rgba(255,215,0,0.3)]">
                {RAJMUDRA.sanskrit}
              </p>
            </div>

            {/* Interactive 4-Line Meaning Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {rajmudraBreakdown.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#1D0E06]/90 border border-[#3E1F0E]">
                  <h5 className="font-devanagari-display text-xs font-bold text-[#FFA040]">
                    {item.word}
                  </h5>
                  <p className="text-[11px] font-cinzel text-[#C8B8A0] italic">
                    {item.transliteration}
                  </p>
                  <p className="text-xs font-marathi text-[#EDE4D8] mt-1">
                    {language === 'mr' ? item.meaningMr : item.meaningEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resounding Final Roar: JAI BHAVANI! JAI SHIVAJI! */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-devanagari-display font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#FFAA33] to-[#FF4500] drop-shadow-[0_12px_45px_rgba(255,85,0,0.7)]">
            {language === 'mr' ? 'जय भवानी ! जय शिवाजी !' : 'JAI BHAVANI ! JAI SHIVAJI !'}
          </h2>

          <p className="text-sm sm:text-lg font-cinzel tracking-[0.25em] text-[#FFD700] uppercase font-bold">
            {language === 'mr'
              ? '॥ अखंड हिंदुस्थानचे प्रेरणास्थान — श्रीमंत छत्रपती शिवराय ॥'
              : '॥ The Eternal Inspiration of Swarajya — Chhatrapati Shivaji Maharaj ॥'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleSalute}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-[#FFB700] text-[#0A0502] font-cinzel font-black text-sm tracking-wider shadow-[0_0_35px_rgba(255,102,0,0.6)] hover:scale-105 transition-all cursor-pointer"
          >
            {language === 'mr'
              ? saluteCount > 0
                ? `जयघोष केला (${saluteCount})! पुन्हा करा`
                : 'जयघोष करा (Royal Salute)'
              : saluteCount > 0
              ? `Saluted (${saluteCount})! Salute Again`
              : 'Salute The Great Chhatrapati'}
          </button>

          <button
            onClick={onScrollToTop}
            className="inline-flex items-center space-x-2 px-6 py-4 rounded-full bg-[#1F1007] border border-[#E5B342]/30 text-[#E5D7C3] hover:text-white hover:border-[#FF7700] transition-all text-xs font-cinzel tracking-wider cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-[#FF7700]" />
            <span>{language === 'mr' ? 'सुरुवातीस जा (Back to Dawn)' : 'Back to The Dawn'}</span>
          </button>
        </div>
      </div>

      {/* Footer Reverence & Copyright */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto pt-10 pb-6 text-center border-t border-[#2A1608] mt-10 space-y-3">
        <p className="text-xs font-marathi text-[#A89885]">
          {language === 'mr'
            ? 'सह्याद्रीच्या पाषाणावर कोरलेला स्वाभिमानाचा अमर इतिहास • हिंदवी स्वराज्य'
            : 'An Interactive Cinematic Historical Experience Dedicated to Hindavi Swarajya & Chhatrapati Shivaji Maharaj'}
        </p>
        <p className="text-xs font-cinzel text-[#E5B342] tracking-wider font-semibold">
          © {new Date().getFullYear()} Rohan Shinde. All Rights Reserved.
        </p>
      </footer>
    </section>
  );
};
