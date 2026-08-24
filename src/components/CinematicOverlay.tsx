import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Globe,
  BookOpen,
  Music,
  Compass,
  Radio,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { CHAPTERS } from '../data/historyData';
import { Language } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface CinematicOverlayProps {
  currentChapterId: string;
  onSelectChapter: (id: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  onOpenArchive: () => void;
}

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  currentChapterId,
  onSelectChapter,
  language,
  onToggleLanguage,
  isMuted,
  onToggleMute,
  isAutoPlaying,
  onToggleAutoPlay,
  onOpenArchive,
}) => {
  const [showSoundMixer, setShowSoundMixer] = useState(false);

  return (
    <>
      {/* 1. Top Cinematic Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:px-8 sm:py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Emblem */}
          <div
            onClick={() => onSelectChapter('intro')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#E04B00] via-[#FF7700] to-[#FFD700] p-0.5 shadow-[0_0_15px_rgba(255,102,0,0.6)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#120803] flex items-center justify-center">
                <span className="text-xs font-devanagari-display font-black text-[#FFD700]">शिव</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-devanagari-display font-black text-[#FFF5E6] tracking-wider leading-none">
                {language === 'mr' ? 'छत्रपती शिवाजी महाराज' : 'SHIVAJI MAHARAJ'}
              </span>
              <span className="text-[10px] font-cinzel text-[#E5B342] tracking-widest uppercase">
                {language === 'mr' ? 'सिनेमॅटिक स्वराज्य गाथा' : 'Cinematic Swarajya Saga'}
              </span>
            </div>
          </div>

          {/* Right Floating Controls Capsule */}
          <div className="flex items-center space-x-2 sm:space-x-3 bg-[#170E08]/85 border border-[#E5B342]/30 rounded-full px-3 py-1.5 backdrop-blur-md shadow-2xl">
            {/* Auto-Play Movie Tour Mode */}
            <button
              onClick={onToggleAutoPlay}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isAutoPlaying
                  ? 'bg-[#FF6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.7)] animate-pulse'
                  : 'text-[#D1C2AD] hover:text-white hover:bg-[#2B160B]'
              }`}
              title={
                isAutoPlaying
                  ? language === 'mr'
                    ? 'चित्रपट थांबवा'
                    : 'Pause Movie Mode'
                  : language === 'mr'
                  ? 'चित्रपट आपोआप चालवा'
                  : 'Play Hands-Free Movie'
              }
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            {/* Sound FX Mixer Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowSoundMixer(!showSoundMixer)}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  showSoundMixer
                    ? 'bg-[#E5B342] text-[#0A0503]'
                    : isMuted
                    ? 'text-[#8C7A6B] hover:text-white'
                    : 'text-[#FFD700] hover:bg-[#2B160B]'
                }`}
                title="Sound Effects Mixer"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {/* Sound Mixer Dropdown */}
              {showSoundMixer && (
                <div className="absolute right-0 top-12 w-56 rounded-2xl bg-[#1C0F08] border border-[#E5B342]/40 p-3.5 shadow-2xl space-y-2.5 backdrop-blur-xl animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-[#3B1F0E]">
                    <span className="text-xs font-cinzel text-[#E5B342] uppercase font-bold">
                      {language === 'mr' ? 'ध्वनी नियंत्रण' : 'Sound Effects'}
                    </span>
                    <button
                      onClick={onToggleMute}
                      className="text-[11px] font-marathi text-[#FFA040] hover:underline cursor-pointer"
                    >
                      {isMuted
                        ? language === 'mr'
                          ? 'चालू करा'
                          : 'Unmute'
                        : language === 'mr'
                        ? 'बंद करा'
                        : 'Mute'}
                    </button>
                  </div>

                  {/* Sound Trigger Buttons */}
                  <div className="space-y-1.5">
                    <button
                      onClick={() => audioEngine.playTutariFanfare()}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-[#29150B] hover:bg-[#3D1E0F] text-xs font-marathi text-[#EDE4D8] flex items-center justify-between cursor-pointer"
                    >
                      <span>🎺 {language === 'mr' ? 'तुतारी ललकार' : 'Royal Tutari Horn'}</span>
                      <Sparkles className="w-3 h-3 text-[#FFD700]" />
                    </button>
                    <button
                      onClick={() => audioEngine.playWarDrum('heavy')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-[#29150B] hover:bg-[#3D1E0F] text-xs font-marathi text-[#EDE4D8] flex items-center justify-between cursor-pointer"
                    >
                      <span>🥁 {language === 'mr' ? 'ढोल-ताशा / तोफा' : 'War Drums / Cannon'}</span>
                      <Sparkles className="w-3 h-3 text-[#FF6600]" />
                    </button>
                    <button
                      onClick={() => audioEngine.playTempleBell()}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-[#29150B] hover:bg-[#3D1E0F] text-xs font-marathi text-[#EDE4D8] flex items-center justify-between cursor-pointer"
                    >
                      <span>🔔 {language === 'mr' ? 'मंदिराची घंटा' : 'Temple Chimes'}</span>
                      <Sparkles className="w-3 h-3 text-[#FFD700]" />
                    </button>
                    <button
                      onClick={() => audioEngine.playSwordClash()}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-[#29150B] hover:bg-[#3D1E0F] text-xs font-marathi text-[#EDE4D8] flex items-center justify-between cursor-pointer"
                    >
                      <span>⚔️ {language === 'mr' ? 'शस्त्र झंकार' : 'Sword Clash'}</span>
                      <Sparkles className="w-3 h-3 text-[#FF4500]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Master Audio Mute Toggle */}
            <button
              onClick={onToggleMute}
              className="p-2 rounded-full text-[#D1C2AD] hover:text-white hover:bg-[#2B160B] transition-all cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#FF6600]" /> : <Volume2 className="w-4 h-4 text-[#FFD700]" />}
            </button>

            {/* Encyclopedia / Archives Modal Button */}
            <button
              onClick={onOpenArchive}
              className="p-2 rounded-full text-[#D1C2AD] hover:text-white hover:bg-[#2B160B] transition-all cursor-pointer"
              title={language === 'mr' ? 'ज्ञानकोश व संदर्भ' : 'Historical Archives'}
            >
              <BookOpen className="w-4 h-4" />
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#2A170C] border border-[#E5B342]/30 text-xs font-bold text-[#FFD700] hover:bg-[#3D2010] transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'EN' : 'मराठी'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Side Chapter Navigation Indicator (Right Edge) */}
      <aside className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end space-y-3 pointer-events-auto">
        {CHAPTERS.map((ch) => {
          const isCurrent = ch.id === currentChapterId;
          return (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className="group flex items-center space-x-2.5 cursor-pointer text-right"
            >
              {/* Chapter Label (Expands on Hover or Active) */}
              <span
                className={`text-xs font-marathi tracking-wider transition-all duration-300 ${
                  isCurrent
                    ? 'opacity-100 text-[#FFD700] font-bold translate-x-0'
                    : 'opacity-0 group-hover:opacity-100 text-[#C8B8A0] translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {language === 'mr' ? ch.titleMr : ch.titleEn}
              </span>

              {/* Indicator Dot */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isCurrent
                    ? 'w-3 h-3 bg-[#FF6600] shadow-[0_0_12px_rgba(255,102,0,0.9)] scale-125 border border-[#FFD700]'
                    : 'w-2 h-2 bg-[#4A2D1B] group-hover:bg-[#FF8800]'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* 3. Letterbox Cinematic Borders */}
      <div className="fixed top-0 left-0 right-0 h-1.5 sm:h-2.5 bg-black z-50 pointer-events-none border-b border-[#2A1608]" />
      <div className="fixed bottom-0 left-0 right-0 h-1.5 sm:h-2.5 bg-black z-50 pointer-events-none border-t border-[#2A1608]" />
    </>
  );
};
