import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  currentChapter: string;
  scrollProgress: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ currentChapter, scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mountainsRef = useRef<THREE.Mesh[]>([]);
  const flagRef = useRef<THREE.Mesh | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const torchLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a0705, 0.015);

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5, 20);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.6);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const sunLight = new THREE.DirectionalLight(0xff7700, 2.2);
    sunLight.position.set(15, 25, 10);
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const torchLight = new THREE.PointLight(0xff5500, 2.5, 30);
    torchLight.position.set(0, 6, 8);
    scene.add(torchLight);
    torchLightRef.current = torchLight;

    // 5. Create Layered Sahyadri Mountain Ridges
    const mountainMeshes: THREE.Mesh[] = [];
    const mountainColors = [0x16100b, 0x1f1610, 0x2b1e16, 0x120c08];

    for (let layer = 0; layer < 4; layer++) {
      const segX = 40;
      const segY = 20;
      const geom = new THREE.PlaneGeometry(160, 45, segX, segY);
      const pos = geom.attributes.position;

      // Add jagged Sahyadri cliff noise
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const noise = Math.sin(x * 0.12 + layer) * 5 + Math.cos(x * 0.25) * 3 + Math.sin(x * 0.05) * 8;
        if (y > -10) {
          pos.setZ(i, noise * (1 - y / 30) * (1.2 + layer * 0.5));
        }
      }
      geom.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: mountainColors[layer % mountainColors.length],
        roughness: 0.85,
        metalness: 0.15,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(0, -5 + layer * 2, -15 - layer * 18);
      mesh.rotation.x = -Math.PI / 2.3;
      scene.add(mesh);
      mountainMeshes.push(mesh);
    }
    mountainsRef.current = mountainMeshes;

    // 6. Create Procedural Waving Saffron Flag (Bhagwa Dhwaj)
    const flagGeom = new THREE.PlaneGeometry(6, 4, 25, 20);
    // Cut swallowtail Marathi / Rajput flag shape
    const flagPos = flagGeom.attributes.position;
    for (let i = 0; i < flagPos.count; i++) {
      const x = flagPos.getX(i);
      const y = flagPos.getY(i);
      // Swallowtail notch on the right edge
      if (x > 1.5 && Math.abs(y) < 1.0) {
        flagPos.setX(i, x - (1.0 - Math.abs(y)) * 1.8);
      }
    }
    flagGeom.computeVertexNormals();

    // Create flag canvas texture with Royal Sun & Moon crest
    const flagCanvas = document.createElement('canvas');
    flagCanvas.width = 512;
    flagCanvas.height = 340;
    const ctx = flagCanvas.getContext('2d');
    if (ctx) {
      // Saffron flame gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 340);
      grad.addColorStop(0, '#FF4500');
      grad.addColorStop(0.5, '#FF7700');
      grad.addColorStop(1, '#FF9900');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 340);

      // Gold Zari Border
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 14;
      ctx.strokeRect(8, 8, 496, 324);

      // Golden Sun Ray Emblem
      ctx.fillStyle = '#FFE066';
      ctx.beginPath();
      ctx.arc(160, 170, 48, 0, Math.PI * 2);
      ctx.fill();

      // Royal text
      ctx.fillStyle = '#4A1202';
      ctx.font = 'bold 22px serif';
      ctx.fillText('॥ श्री ॥', 135, 178);
    }

    const flagTexture = new THREE.CanvasTexture(flagCanvas);
    const flagMat = new THREE.MeshStandardMaterial({
      map: flagTexture,
      side: THREE.DoubleSide,
      roughness: 0.4,
      metalness: 0.1,
    });

    const flagMesh = new THREE.Mesh(flagGeom, flagMat);
    flagMesh.position.set(4, 5, 2);
    flagMesh.rotation.y = -Math.PI / 7;
    scene.add(flagMesh);
    flagRef.current = flagMesh;

    // Flagpole
    const poleGeom = new THREE.CylinderGeometry(0.08, 0.08, 12, 16);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x2b1e16, roughness: 0.6, metalness: 0.8 });
    const poleMesh = new THREE.Mesh(poleGeom, poleMat);
    poleMesh.position.set(0.9, 3, 2);
    scene.add(poleMesh);

    // 7. Animation Loop
    let clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Wave the Saffron flag with dynamic wind simulation
      if (flagRef.current) {
        const geom = flagRef.current.geometry as THREE.PlaneGeometry;
        const pos = geom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = (pos.getX(i) + 3) / 6; // 0 to 1 from pole
          const wave1 = Math.sin(u * 7 - time * 5) * 0.4 * u;
          const wave2 = Math.cos(u * 12 - time * 7) * 0.18 * u;
          pos.setZ(i, wave1 + wave2);
        }
        geom.computeVertexNormals();
        geom.attributes.position.needsUpdate = true;
      }

      // Parallax subtle camera float
      if (cameraRef.current) {
        cameraRef.current.position.y = 5 + Math.sin(time * 0.5) * 0.3;
        cameraRef.current.position.x = Math.sin(time * 0.3) * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update lighting & camera according to current chapter & scroll
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current) return;

    const scene = sceneRef.current;
    const camera = cameraRef.current;

    // Adjust camera position & atmosphere based on scroll
    camera.position.z = 20 - scrollProgress * 10;
    camera.position.y = 5 - Math.sin(scrollProgress * Math.PI) * 2;

    if (sunLightRef.current && ambientLightRef.current) {
      if (currentChapter === 'intro') {
        // Sunrise golden mist
        scene.fog = new THREE.FogExp2(0x1a0f07, 0.015);
        sunLightRef.current.color.setHex(0xff7700);
        sunLightRef.current.intensity = 2.4;
        ambientLightRef.current.color.setHex(0x663311);
      } else if (currentChapter === 'jijau') {
        // Warm palace lamp glow
        scene.fog = new THREE.FogExp2(0x1a0d05, 0.02);
        sunLightRef.current.color.setHex(0xffaa33);
        sunLightRef.current.intensity = 1.6;
        ambientLightRef.current.color.setHex(0x442211);
      } else if (currentChapter === 'forts') {
        // High mountain altitude clear sky & rugged rock
        scene.fog = new THREE.FogExp2(0x0e0906, 0.012);
        sunLightRef.current.color.setHex(0xff9944);
        sunLightRef.current.intensity = 2.0;
        ambientLightRef.current.color.setHex(0x332211);
      } else if (currentChapter === 'battle') {
        // Dramatic night battle with fiery sparks & torchlight
        scene.fog = new THREE.FogExp2(0x080402, 0.03);
        sunLightRef.current.color.setHex(0xcc2200);
        sunLightRef.current.intensity = 0.8;
        ambientLightRef.current.color.setHex(0x220904);
      } else if (currentChapter === 'rajyabhishek') {
        // Grand golden celestial coronation rays
        scene.fog = new THREE.FogExp2(0x241604, 0.012);
        sunLightRef.current.color.setHex(0xffd700);
        sunLightRef.current.intensity = 3.2;
        ambientLightRef.current.color.setHex(0x775511);
      } else {
        // Legacy deep cosmic starry sunset
        scene.fog = new THREE.FogExp2(0x0a0604, 0.018);
        sunLightRef.current.color.setHex(0xff6600);
        sunLightRef.current.intensity = 2.0;
        ambientLightRef.current.color.setHex(0x331a0a);
      }
    }
  }, [currentChapter, scrollProgress]);

  return (
    <div
      ref={containerRef}
      id="three-canvas-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.88 }}
    />
  );
};
