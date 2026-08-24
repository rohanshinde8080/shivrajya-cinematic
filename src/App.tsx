import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { ThreeCanvas } from './components/ThreeCanvas';
import { AtmosphereParticles } from './components/AtmosphereParticles';
import { CinematicHero } from './components/CinematicHero';
import { JijauScene } from './components/JijauScene';
import { FortCarousel } from './components/FortCarousel';
import { MavalaArmyScene } from './components/MavalaArmyScene';
import { BattlefieldScene } from './components/BattlefieldScene';
import { SwarajyaMap } from './components/SwarajyaMap';
import { RajyabhishekScene } from './components/RajyabhishekScene';
import { LegacyOutro } from './components/LegacyOutro';
import { CinematicOverlay } from './components/CinematicOverlay';
import { HistoricalArchiveModal } from './components/HistoricalArchiveModal';
import { audioEngine } from './utils/audioEngine';
import { Language } from './types';
import { CHAPTERS } from './data/historyData';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<string>('intro');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [language, setLanguage] = useState<Language>('mr');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);
  
  const lenisRef = useRef<Lenis | null>(null);
  const autoPlayIntervalRef = useRef<number | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll Progress & Active Chapter Listener
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;
      setScrollProgress(progress);

      // Determine active chapter by section offset
      const chapterElements = CHAPTERS.map((ch) => ({
        id: ch.id,
        el: document.getElementById(`chapter-${ch.id}`),
      }));

      for (let i = chapterElements.length - 1; i >= 0; i--) {
        const item = chapterElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setCurrentChapter(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  // Smooth Navigation to Chapter
  const scrollToChapter = (chapterId: string) => {
    const target = document.getElementById(`chapter-${chapterId}`);
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.6 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle Hands-Free Movie Auto-Scroll
  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    } else {
      setIsAutoPlaying(true);
      if (isMuted) {
        audioEngine.setMuted(false);
        setIsMuted(false);
      }
      autoPlayIntervalRef.current = window.setInterval(() => {
        if (lenisRef.current) {
          const currentY = window.scrollY;
          const maxY = document.documentElement.scrollHeight - window.innerHeight;
          if (currentY >= maxY - 20) {
            setIsAutoPlaying(false);
            if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
          } else {
            lenisRef.current.scrollTo(currentY + 28, { immediate: true });
          }
        }
      }, 35);
    }
  };

  // Master Sound Toggle
  const toggleMute = () => {
    const nextMuted = !isMuted;
    audioEngine.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'mr' ? 'en' : 'mr'));
  };

  return (
    <div className="relative min-h-screen bg-[#070503] text-[#EDE4D8] overflow-x-hidden selection:bg-[#E05305] selection:text-white">
      {/* 1. 3D WebGL Sahyadri Terrain & Directional Sky Lights */}
      <ThreeCanvas currentChapter={currentChapter} scrollProgress={scrollProgress} />

      {/* 2. Floating Atmospheric Embers, Mountain Fog & Birds */}
      <AtmosphereParticles
        intensity={
          currentChapter === 'battle'
            ? 'battle'
            : currentChapter === 'rajyabhishek'
            ? 'golden'
            : 'normal'
        }
      />

      {/* 3. Cinematic Film Grain & Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-20 film-grain opacity-60" />
      <div className="fixed inset-0 pointer-events-none z-20 cinematic-vignette opacity-70" />

      {/* 4. Floating HUD, Audio Mixer, Chapter Indicator */}
      <CinematicOverlay
        currentChapterId={currentChapter}
        onSelectChapter={scrollToChapter}
        language={language}
        onToggleLanguage={toggleLanguage}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={toggleAutoPlay}
        onOpenArchive={() => setIsArchiveOpen(true)}
      />

      {/* 5. Main Continuous Cinematic Narrative Timeline */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Chapter 1: The Dawn & Sahyadri Sunrise */}
        <CinematicHero
          language={language}
          onExploreClick={() => scrollToChapter('jijau')}
          onToggleAudio={toggleMute}
          isMuted={isMuted}
        />

        {/* Chapter 2: Rajmata Jijau & The Sacred Oath */}
        <JijauScene language={language} />

        {/* Chapter 3: Fortresses of Sahyadri */}
        <FortCarousel language={language} />

        {/* Chapter 4: Mavala Army & Loyal Commanders */}
        <MavalaArmyScene language={language} />

        {/* Chapter 5: Battlefield & Guerrilla Tactics */}
        <BattlefieldScene language={language} />

        {/* Chapter 6: Interactive Swarajya Map of Maharashtra */}
        <SwarajyaMap language={language} />

        {/* Chapter 7: Grand Coronation / Rajyabhishek */}
        <RajyabhishekScene language={language} />

        {/* Chapter 8: Eternal Legacy & Majestic Bhagwa Dhwaj */}
        <LegacyOutro language={language} onScrollToTop={() => scrollToChapter('intro')} />
      </main>

      {/* 6. Historical Encyclopedia & Archives Modal */}
      <HistoricalArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        language={language}
      />
    </div>
  );
}
