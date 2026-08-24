import React, { useState } from 'react';
import { Flame, Bell, Sparkles, BookOpen, ShieldCheck, Heart, Crown } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { Language } from '../types';

interface JijauSceneProps {
  language: Language;
}

export const JijauScene: React.FC<JijauSceneProps> = ({ language }) => {
  const [oathTaken, setOathTaken] = useState(false);

  const handleTakeOath = () => {
    setOathTaken(true);
    audioEngine.playTempleBell();
    audioEngine.playShankhnaad();
    setTimeout(() => {
      audioEngine.playWarDrum('light');
    }, 1200);
  };

  return (
    <section
      id="chapter-jijau"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 z-10"
    >
      {/* Background Ambience Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#160B04]/70 to-[#0A0503] pointer-events-none" />

      {/* Royal Palace Pillar Border Accents */}
      <div className="relative max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Visual Historical Painting / Palace Shrine Artwork */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          <div className="relative w-full max-w-md rounded-2xl p-1 bg-gradient-to-b from-[#E5B342]/40 via-[#FF6600]/20 to-[#2A1608] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-[#E5B342]/30 overflow-hidden group">
            {/* Interior Ambient Glow */}
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#FFAA00]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#FF4500]/25 rounded-full blur-3xl pointer-events-none" />

            {/* Simulated Palace Chamber Artwork with SVG */}
            <div className="relative bg-[#1A0E07] rounded-xl p-6 flex flex-col items-center justify-center text-center overflow-hidden border border-[#E5B342]/15">
              {/* Floating Lamp Diya Icons */}
              <div className="w-full flex justify-between items-center mb-4 px-2">
                <div className="flex items-center space-x-1.5 text-[#FFB700]">
                  <Flame className="w-4 h-4 text-[#FF7700] animate-bounce" />
                  <span className="text-[11px] font-cinzel tracking-widest uppercase">
                    {language === 'mr' ? 'शिवनेरी राजमहाल' : 'Shivneri Royal Palace'}
                  </span>
                </div>
                <button
                  onClick={() => audioEngine.playTempleBell()}
                  className="p-1.5 rounded-full bg-[#2A1608] border border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FF7700]/20 transition-all cursor-pointer"
                  title="Play Temple Bell"
                >
                  <Bell className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Vector Illustration: Rajmata Jijau blessing young Shivaji */}
              <svg viewBox="0 0 300 240" className="w-full h-56 object-contain my-2">
                {/* Palace Arch */}
                <path
                  d="M20,220 L20,70 Q150,10 280,70 L280,220 Z"
                  fill="#120804"
                  stroke="#5A3414"
                  strokeWidth="2"
                />
                <path
                  d="M35,220 L35,80 Q150,30 265,80 L265,220 Z"
                  fill="#1C0D06"
                />
                {/* Hanging Brass Palace Diya */}
                <line x1="150" y1="25" x2="150" y2="75" stroke="#D4AF37" strokeWidth="2" />
                <polygon points="144,75 156,75 150,88" fill="#D4AF37" />
                <circle cx="150" cy="70" r="7" fill="#FF8800" filter="drop-shadow(0 0 8px #FF8800)" />
                <polygon points="147,68 153,68 150,56" fill="#FFEE88" />

                {/* Holy Tulsi Vrindavan */}
                <rect x="235" y="150" width="22" height="40" fill="#3D1D0E" rx="2" />
                <polygon points="230,150 262,150 246,138" fill="#4D2815" />
                <circle cx="246" cy="132" r="7" fill="#2E5A1E" />

                {/* Rajmata Jijau Figure */}
                <g>
                  <path d="M70,200 Q95,140 105,120 Q120,135 125,200 Z" fill="#264423" />
                  <path d="M100,120 Q120,115 130,135 L120,170 Z" fill="#991B1B" />
                  <circle cx="105" cy="110" r="10" fill="#E8B588" />
                  <path d="M96,105 Q105,92 118,102 Q120,120 96,120 Z" fill="#D4AF37" />
                  <path d="M120,135 Q140,130 150,125" stroke="#E8B588" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Young Shivaji Figure */}
                <g>
                  <path d="M170,200 Q180,155 190,140 Q205,150 210,200 Z" fill="#D97706" />
                  <circle cx="190" cy="130" r="9" fill="#E8B588" />
                  <path d="M182,126 Q190,115 200,122 Q198,135 182,130 Z" fill="#9A3412" />
                  <polygon points="190,116 193,106 195,116" fill="#FBBF24" />
                  <path d="M180,148 L160,138" stroke="#E8B588" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* Floor Rug */}
                <rect x="50" y="200" width="200" height="15" fill="#581C87" rx="2" />
                <line x1="50" y1="202" x2="250" y2="202" stroke="#FBBF24" strokeWidth="1.5" />
              </svg>

              {/* Caption */}
              <p className="text-xs font-marathi text-[#E5B342] mt-3 tracking-wide font-semibold">
                {language === 'mr'
                  ? '॥ मातृतीर्थ जिजाऊ आणि बाल शिवबा ॥'
                  : '॥ Rajmata Jijau nurturing Young Shivaji ॥'}
              </p>
            </div>
          </div>

          {/* Interactive Raireshwar Shivalinga Sanctum Pledge Card */}
          <div className="w-full max-w-md mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#241308] to-[#120703] border border-[#FF7700]/40 shadow-xl text-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-cinzel text-[#FFD700] uppercase tracking-wider font-bold">
                {language === 'mr' ? 'रायरेश्वर महामंत्र (१६४५)' : 'Raireshwar Sanctum Pledge'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF5500]/20 text-[#FFA040] font-cinzel">
                {language === 'mr' ? 'वय १५ वर्षे' : 'Age 15'}
              </span>
            </div>

            <p className="text-xs font-devanagari-display text-[#FFE2B8] leading-relaxed mb-3">
              {language === 'mr'
                ? '“आम्ही आपले शरीर व प्राण स्वराज्य स्थापनेसाठी अर्पण करतो. हे राज्य श्रींचे आहे!”'
                : '“We surrender our souls, blood and bodies to the establishment of Hindavi Swarajya!”'}
            </p>

            <button
              onClick={handleTakeOath}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-cinzel font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                oathTaken
                  ? 'bg-[#22C55E]/20 border border-[#22C55E]/50 text-[#86EFAC]'
                  : 'bg-gradient-to-r from-[#D9531E] to-[#FF7700] text-white shadow-lg hover:scale-102 active:scale-98'
              }`}
            >
              {oathTaken ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#86EFAC]" />
                  <span>{language === 'mr' ? 'पवित्र शपथ ग्रहण केली!' : 'Sacred Oath Sealed!'}</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-[#FFD700] animate-pulse" />
                  <span>{language === 'mr' ? 'रायरेश्वराची शपथ घ्या' : 'Take The Sacred Swarajya Oath'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Historical Narrative & Spiritual Foundation */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Chapter Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FF6600]/15 border border-[#FF6600]/30 text-[#FFA040] text-xs font-cinzel font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अध्याय ०२ • मातृत्व व संस्कार' : 'Chapter II • The Mother’s Guidance'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-devanagari-display font-bold text-[#FFF5E6] leading-tight">
            {language === 'mr'
              ? 'मातृप्रेरणेतून पेटलेली स्वराज्याची अखंड ज्योत'
              : 'The Eternal Flame of Swarajya Sparked by a Mother’s Vision'}
          </h2>

          <p className="text-base sm:text-lg font-marathi text-[#D4C3AC] leading-relaxed">
            {language === 'mr'
              ? 'राजमाता जिजाऊंनी बाल शिवाजींच्या मनात केवळ युद्धकलाच नव्हे, तर प्रजेचे कल्याण, महिलांचा आदर, नीतिमत्ता आणि पारतंत्र्यातून मुक्तीचे संस्कार रुजवले. रामायण, महाभारतातील शौर्यकथा सांगत त्यांनी शिवबांना अन्यायाविरुद्ध लढण्याची प्रेरणा दिली.'
              : 'Rajmata Jijabai did not merely instruct young Shivaji in martial arts; she instilled supreme ethical governance, profound respect for women, and the uncompromising duty to liberate their people from oppressive sultanates.'}
          </p>

          {/* Key Foundations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#1D1007]/80 border border-[#E5B342]/20 hover:border-[#FF7700]/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 rounded-lg bg-[#FF6600]/20 text-[#FFA040]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="font-cinzel text-sm font-bold text-[#FFE6B8]">
                  {language === 'mr' ? 'नीतीशास्त्र व धर्मसंस्कार' : 'Moral Virtues & Epics'}
                </h4>
              </div>
              <p className="text-xs font-marathi text-[#BFA88F] leading-normal">
                {language === 'mr'
                  ? 'रामायणातील प्रभू रामचंद्रांचा आदर्श आणि महाभारतातील अर्जुनाचे शौर्य बालमनावर कोरले.'
                  : 'Teaching the ideals of righteous kingship from the Ramayana and unwavering valor from the Mahabharata.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1D1007]/80 border border-[#E5B342]/20 hover:border-[#FF7700]/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 rounded-lg bg-[#FF6600]/20 text-[#FFA040]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-cinzel text-sm font-bold text-[#FFE6B8]">
                  {language === 'mr' ? 'रायरेश्वराची पवित्र शपथ (१६४५)' : 'Raireshwar Sacred Oath'}
                </h4>
              </div>
              <p className="text-xs font-marathi text-[#BFA88F] leading-normal">
                {language === 'mr'
                  ? 'अवघ्या १५ व्या वर्षी रायरेश्वर मंदिरात सवंगड्यांसह स्वतःच्या रक्ताने हिंदवी स्वराज्याची शपथ घेतली.'
                  : 'At age 15, Shivaji and his young Mavala companions anointed the Shivalinga with their blood, pledging life to Swarajya.'}
              </p>
            </div>
          </div>

          {/* Sacred Quote Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#2B1408] via-[#1E0E05] to-[#140803] border-l-4 border-[#FF6600] shadow-md">
            <p className="text-sm sm:text-base font-marathi text-[#FFDEB3] italic font-medium">
              {language === 'mr'
                ? '“शिवबा, हे राज्य कोण्या एकाचे नाही, हे गोरगरिबांचे आणि सर्व प्रजेचे हिंदवी स्वराज्य आहे!”'
                : '“Shivba, this kingdom belongs to no single ruler; this Hindavi Swarajya belongs to every humble peasant, artisan, and common citizen!”'}
            </p>
            <span className="block mt-2 text-xs font-cinzel uppercase tracking-widest text-[#E5B342]">
              — {language === 'mr' ? 'राजमाता जिजाऊ मासाहेब' : 'Rajmata Jijabai'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
