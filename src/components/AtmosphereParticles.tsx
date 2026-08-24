import React, { useEffect, useRef } from 'react';

interface AtmosphereParticlesProps {
  intensity?: 'normal' | 'battle' | 'golden';
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  twinkleSpeed: number;
}

interface Bird {
  x: number;
  y: number;
  speed: number;
  wingAngle: number;
  wingSpeed: number;
  scale: number;
}

export const AtmosphereParticles: React.FC<AtmosphereParticlesProps> = ({ intensity = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate Ember Particles
    const particleCount = intensity === 'battle' ? 85 : intensity === 'golden' ? 95 : 45;
    const particles: Particle[] = [];

    const colors =
      intensity === 'battle'
        ? ['#ff3300', '#ff6600', '#ffaa00', '#ffdd66']
        : intensity === 'golden'
        ? ['#ffd700', '#ffe680', '#ff9900', '#fff3b3']
        : ['#ff8800', '#ffaa33', '#dd6600', '#fae084'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.4) * 1.2,
        speedY: -(Math.random() * 1.5 + 0.5),
        opacity: Math.random() * 0.7,
        maxOpacity: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    // Birds in Sahyadri sky
    const birds: Bird[] = [
      { x: -50, y: height * 0.18, speed: 1.6, wingAngle: 0, wingSpeed: 0.14, scale: 0.8 },
      { x: -120, y: height * 0.22, speed: 1.4, wingAngle: 1.2, wingSpeed: 0.12, scale: 0.6 },
      { x: -200, y: height * 0.14, speed: 1.8, wingAngle: 2.1, wingSpeed: 0.15, scale: 0.7 },
    ];

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw drifting embers
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity = Math.sin(frame * p.twinkleSpeed) * (p.maxOpacity / 2) + p.maxOpacity / 2;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw soaring Sahyadri eagles/birds
      birds.forEach((b) => {
        b.x += b.speed;
        b.wingAngle += b.wingSpeed;

        if (b.x > width + 100) {
          b.x = -80;
          b.y = height * (0.12 + Math.random() * 0.15);
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.scale(b.scale, b.scale);
        ctx.strokeStyle = 'rgba(25, 18, 12, 0.75)';
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';

        const wingFlap = Math.sin(b.wingAngle) * 6;

        ctx.beginPath();
        // Left wing
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-10, -8 + wingFlap, -22, -2 + wingFlap);
        // Right wing
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(10, -8 + wingFlap, 22, -2 + wingFlap);
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      id="atmospheric-particles-canvas"
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
