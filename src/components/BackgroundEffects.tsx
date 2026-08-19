import React from 'react';
import { ThreeCanvas } from './ThreeCanvas';

interface BackgroundEffectsProps {
  darkMode: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ darkMode }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dev-tool grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      
      {/* Apple-style subtle noise grain */}
      <div className="absolute inset-0 bg-noise opacity-50" />

      {/* Ambient Specular Glow Orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-accent-violet/20 via-accent-cyan/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-[550px] h-[550px] bg-accent-violet/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 -right-48 w-[550px] h-[550px] bg-accent-cyan/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Three.js Interactive 3D Background */}
      <ThreeCanvas darkMode={darkMode} />
    </div>
  );
};
