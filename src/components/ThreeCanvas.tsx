import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate } from 'animejs';

interface ThreeCanvasProps {
  darkMode: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Subtle, Premium Floating Ambient Particles (NO messy wireframes)
    const particleCount = 90;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(darkMode ? 0x8b5cf6 : 0x6366f1); // Violet
    const color2 = new THREE.Color(darkMode ? 0x06b6d4 : 0x0ea5e9); // Cyan

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 70;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      const chosenColor = i % 2 === 0 ? color1 : color2;
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: darkMode ? 0.45 : 0.25,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 4. Slow Ambient Drift Animation
    const particleRotAnim = animate(particles.rotation, {
      y: Math.PI * 2,
      duration: 120000,
      ease: 'linear',
      loop: true,
    });

    // 5. Gentle Cursor Parallax
    const mousePos = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

      animate(mousePos, {
        x: normalizedX,
        y: normalizedY,
        duration: 1000,
        ease: 'outQuad',
        onUpdate: () => {
          camera.position.x = mousePos.x * 1.5;
          camera.position.y = -mousePos.y * 1.0;
          camera.lookAt(scene.position);
        }
      });
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 6. Render Loop
    let animationId: number;
    const render = () => {
      animationId = requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      try {
        particleRotAnim?.pause?.();
      } catch {}

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
