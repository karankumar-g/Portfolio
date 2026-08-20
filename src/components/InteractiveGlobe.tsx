import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MapPin, Compass } from 'lucide-react';

interface InteractiveGlobeProps {
  darkMode?: boolean;
}

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ darkMode = true }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Globe Container Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 3a. Deep Atmosphere Core Sphere
    const coreGeom = new THREE.SphereGeometry(5.2, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x080c18 : 0xf1f5f9,
      transparent: true,
      opacity: darkMode ? 0.92 : 0.6,
    });
    const coreSphere = new THREE.Mesh(coreGeom, coreMat);
    globeGroup.add(coreSphere);

    // 3b. Elegant Point Cloud (Fibonacci Sphere Surface Points)
    const dotCount = 1200;
    const dotPositions = new Float32Array(dotCount * 3);
    const dotColors = new Float32Array(dotCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);
    const blueColor = new THREE.Color(0x3b82f6);
    const emeraldColor = new THREE.Color(0x10b981);

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      const r = 5.26;
      dotPositions[i * 3] = x * r;
      dotPositions[i * 3 + 1] = y * r;
      dotPositions[i * 3 + 2] = z * r;

      const color = i % 8 === 0 ? emeraldColor : i % 3 === 0 ? blueColor : cyanColor;
      dotColors[i * 3] = color.r;
      dotColors[i * 3 + 1] = color.g;
      dotColors[i * 3 + 2] = color.b;
    }

    const dotGeom = new THREE.BufferGeometry();
    dotGeom.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeom.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: darkMode ? 0.85 : 0.65,
    });
    const dotsMesh = new THREE.Points(dotGeom, dotMat);
    globeGroup.add(dotsMesh);

    // 3c. Subtle Latitude / Longitude Guide Grid Rings
    const wireGeom = new THREE.SphereGeometry(5.27, 24, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireSphere = new THREE.Mesh(wireGeom, wireMat);
    globeGroup.add(wireSphere);

    // 3d. Chennai, India Location Beacon Pin (13.0827° N, 80.2707° E)
    const lat = 13.0827 * (Math.PI / 180);
    const lon = -80.2707 * (Math.PI / 180);

    const pinRadius = 5.34;
    const pinX = pinRadius * Math.cos(lat) * Math.cos(lon);
    const pinY = pinRadius * Math.sin(lat);
    const pinZ = pinRadius * Math.cos(lat) * Math.sin(lon);

    // Solid Glowing Pin Dot
    const pinGeom = new THREE.SphereGeometry(0.24, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Vivid Emerald
    });
    const pinMesh = new THREE.Mesh(pinGeom, pinMat);
    pinMesh.position.set(pinX, pinY, pinZ);
    globeGroup.add(pinMesh);

    // Vertical Light Beam
    const beamGeom = new THREE.CylinderGeometry(0.04, 0.04, 1.3, 8);
    beamGeom.translate(0, 0.65, 0);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.85,
    });
    const beamMesh = new THREE.Mesh(beamGeom, beamMat);
    beamMesh.position.set(pinX, pinY, pinZ);
    beamMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(pinX, pinY, pinZ).normalize());
    globeGroup.add(beamMesh);

    // Outer Pulsing Wave Ring
    const pinRingGeom = new THREE.RingGeometry(0.26, 0.44, 24);
    const pinRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const pinRingMesh = new THREE.Mesh(pinRingGeom, pinRingMat);
    pinRingMesh.position.set(pinX, pinY, pinZ);
    pinRingMesh.lookAt(pinX * 2, pinY * 2, pinZ * 2);
    globeGroup.add(pinRingMesh);

    // 3e. Atmospheric Ring
    const atmoRingGeom = new THREE.TorusGeometry(7.0, 0.025, 16, 100);
    const atmoRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
    });
    const atmoRing = new THREE.Mesh(atmoRingGeom, atmoRingMat);
    atmoRing.rotation.x = Math.PI / 2.3;
    globeGroup.add(atmoRing);

    // Initial Starting Rotation (Facing Chennai forward)
    const BASE_ROTATION_Y = 1.3;
    const BASE_ROTATION_X = 0.2;

    globeGroup.rotation.y = BASE_ROTATION_Y;
    globeGroup.rotation.x = BASE_ROTATION_X;

    // 4. Mouse Drag & Inertia Controls
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = BASE_ROTATION_Y;
    let targetRotationX = BASE_ROTATION_X;
    let timeElapsed = 0;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      setIsDragging(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isMouseDown) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isMouseDown = true;
        setIsDragging(true);
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isMouseDown && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 5. Render Loop
    let animationFrameId: number;
    let pulseScale = 1;
    let pulseDir = 0.007;

    const animateLoop = () => {
      animationFrameId = requestAnimationFrame(animateLoop);
      timeElapsed += 0.015;

      // Subtle float when not dragging
      if (!isMouseDown) {
        const floatOffset = Math.sin(timeElapsed) * 0.03;
        globeGroup.rotation.y += (targetRotationY + floatOffset - globeGroup.rotation.y) * 0.06;
        globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.06;
      } else {
        globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.08;
        globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.08;
      }

      // Pulse pin ring
      pulseScale += pulseDir;
      if (pulseScale > 1.45 || pulseScale < 0.95) {
        pulseDir = -pulseDir;
      }
      pinRingMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Atmosphere wobble
      atmoRing.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    animateLoop();

    // 6. Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 360;
      const newHeight = container.clientHeight || 360;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeom.dispose();
      coreMat.dispose();
      dotGeom.dispose();
      dotMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      pinGeom.dispose();
      pinMat.dispose();
      pinRingGeom.dispose();
      pinRingMat.dispose();
      beamGeom.dispose();
      beamMat.dispose();
      atmoRingGeom.dispose();
      atmoRingMat.dispose();
      renderer.dispose();
    };
  }, [darkMode]);

  return (
    <div 
      className="apple-glass shimmer-border rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between space-y-4 select-none w-full max-w-lg mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header Strip */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
            Location & Base
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <Compass className="w-3.5 h-3.5 text-accent-blue" />
          <span>Interactive 3D</span>
        </div>
      </div>

      {/* 3D Canvas Mount Frame */}
      <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center">
        <div 
          ref={mountRef} 
          className={`w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300 ${isDragging ? 'scale-105' : 'scale-100'}`}
        />

        {/* Ambient Backlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/15 via-emerald-500/10 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />
      </div>

      {/* Clean Bottom Location Card with Chennai Coordinates */}
      <div className="p-3.5 rounded-2xl glass-subtle flex items-center justify-between gap-3 border border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white font-display flex items-center gap-1.5">
              <span>Chennai, India</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">LIVE</span>
            </div>
            <div className="text-[10px] font-mono text-slate-300">
              Software Engineer @ Data Aces
            </div>
          </div>
        </div>

        <div className="text-right font-mono text-[10px] text-slate-400">
          <div className="text-white font-semibold">IST (UTC +5:30)</div>
          <div className="text-slate-500">13.08° N, 80.27° E</div>
        </div>
      </div>
    </div>
  );
};
