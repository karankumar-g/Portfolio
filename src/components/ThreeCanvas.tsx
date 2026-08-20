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
    camera.position.set(0, 0, 24);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Subtle Ambient Orbital Geometry (Soft depth background)
    const geom = new THREE.IcosahedronGeometry(12, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x7c3aed : 0x6d28d9,
      wireframe: true,
      transparent: true,
      opacity: darkMode ? 0.035 : 0.02,
    });
    const icosahedron = new THREE.Mesh(geom, wireMat);
    icosahedron.position.set(10, -3, -14);
    scene.add(icosahedron);

    // Soft decorative ring
    const ringGeom = new THREE.TorusGeometry(16, 0.04, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x22d3ee : 0x0891b2,
      transparent: true,
      opacity: darkMode ? 0.04 : 0.02,
    });
    const orbitalRing = new THREE.Mesh(ringGeom, ringMat);
    orbitalRing.rotation.x = Math.PI / 3.5;
    icosahedron.add(orbitalRing);

    // 4. Subtle Floating Starfield Particles
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(darkMode ? 0x7c3aed : 0x6d28d9); // Violet
    const color2 = new THREE.Color(darkMode ? 0x22d3ee : 0x0891b2); // Cyan

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      const mixedColor = i % 2 === 0 ? color1 : color2;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: darkMode ? 0.55 : 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 5. Gentle Continuous Animations
    const rotAnim = animate(icosahedron.rotation, {
      y: Math.PI * 2,
      x: Math.PI * 2,
      duration: 60000,
      ease: 'linear',
      loop: true,
    });

    const particleRotAnim = animate(particles.rotation, {
      y: Math.PI * 2,
      duration: 90000,
      ease: 'linear',
      loop: true,
    });

    // 6. Smooth Mouse Parallax
    const mousePos = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

      animate(mousePos, {
        x: normalizedX,
        y: normalizedY,
        duration: 900,
        ease: 'outQuad',
        onUpdate: () => {
          camera.position.x = mousePos.x * 1.2;
          camera.position.y = -mousePos.y * 0.8;
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

    // 7. Render Loop
    let animationId: number;
    const render = () => {
      animationId = requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      try {
        rotAnim?.pause?.();
        particleRotAnim?.pause?.();
      } catch {}

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geom.dispose();
      wireMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
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
