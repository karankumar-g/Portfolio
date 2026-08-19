import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate } from 'animejs';
import { threeAdapter } from 'animejs/adapters/three';

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

    // 3. 3D Geodesic Icosahedron Structure
    const geom = new THREE.IcosahedronGeometry(9, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x7c3aed : 0x6d28d9,
      wireframe: true,
      transparent: true,
      opacity: darkMode ? 0.14 : 0.09,
    });
    const icosahedron = new THREE.Mesh(geom, wireMat);
    icosahedron.position.set(7, -1, -3);
    scene.add(icosahedron);

    // Inner glowing core
    const coreGeom = new THREE.IcosahedronGeometry(4.8, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x22d3ee : 0x0891b2,
      wireframe: true,
      transparent: true,
      opacity: darkMode ? 0.09 : 0.06,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    icosahedron.add(coreMesh);

    // Secondary decorative orbital ring
    const ringGeom = new THREE.TorusGeometry(12, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x22d3ee : 0x0891b2,
      transparent: true,
      opacity: darkMode ? 0.18 : 0.1,
    });
    const orbitalRing = new THREE.Mesh(ringGeom, ringMat);
    orbitalRing.rotation.x = Math.PI / 3;
    icosahedron.add(orbitalRing);

    // 4. Floating 3D Starfield / Neural Nodes
    const particleCount = 190;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(darkMode ? 0x7c3aed : 0x6d28d9); // Violet
    const color2 = new THREE.Color(darkMode ? 0x22d3ee : 0x0891b2); // Cyan
    const color3 = new THREE.Color(darkMode ? 0xf59e0b : 0xd97706); // Amber

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 55;
      positions[i3 + 1] = (Math.random() - 0.5) * 45;
      positions[i3 + 2] = (Math.random() - 0.5) * 35;

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: darkMode ? 0.75 : 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 5. Anime.js + Three.js Adapter Driven Continuous Animations
    // Smooth 360 rotation on the main structure
    const rotAnim = animate(icosahedron.rotation, {
      y: Math.PI * 2,
      x: Math.PI * 2,
      duration: 35000,
      ease: 'linear',
      loop: true,
    });

    // Opposing core rotation
    const coreRotAnim = animate(coreMesh.rotation, {
      y: -Math.PI * 2,
      z: Math.PI * 2,
      duration: 22000,
      ease: 'linear',
      loop: true,
    });

    // Subtle breathing scale on the 3D geodesic structure
    const scaleAnim = animate(icosahedron.scale, {
      x: [0.95, 1.05],
      y: [0.95, 1.05],
      z: [0.95, 1.05],
      duration: 6000,
      ease: 'inOutQuad',
      alternate: true,
      loop: true,
    });

    // Particle starfield rotation
    const particleRotAnim = animate(particles.rotation, {
      y: Math.PI * 2,
      duration: 70000,
      ease: 'linear',
      loop: true,
    });

    // 6. Interactive Cursor Parallax with Anime.js Spring Easing
    const mousePos = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

      animate(mousePos, {
        x: normalizedX,
        y: normalizedY,
        duration: 800,
        ease: 'outQuad',
        onUpdate: () => {
          camera.position.x = mousePos.x * 1.8;
          camera.position.y = -mousePos.y * 1.2;
          camera.lookAt(scene.position);
        }
      });
    };

    // Scroll-triggered depth shift
    const handleScroll = () => {
      const scrollY = window.scrollY;
      animate(icosahedron.position, {
        y: -1 - scrollY * 0.006,
        duration: 300,
        ease: 'outQuad',
      });
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      try {
        rotAnim?.pause?.();
        coreRotAnim?.pause?.();
        scaleAnim?.pause?.();
        particleRotAnim?.pause?.();
      } catch {}

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geom.dispose();
      wireMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
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
