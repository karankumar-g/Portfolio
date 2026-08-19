import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  Layers, 
  Database, 
  Cpu, 
  Activity, 
  MapPin, 
  Clock, 
  Heart, 
  Flame, 
  Rocket, 
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { PERSONAL_INFO } from '../data/portfolioData';
import { scrambleText } from '../utils/animeEffects';

export const HeroBentoWidget: React.FC = () => {
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [activeReactions, setActiveReactions] = useState<Set<string>>(new Set());
  const techNameRef = useRef<HTMLDivElement | null>(null);

  const techOrbit = [
    { name: 'LangGraph', role: 'Multi-Agent Workflows', color: 'from-violet-500 to-indigo-500', icon: Bot },
    { name: 'Python / Django', role: 'Enterprise Backends', color: 'from-emerald-500 to-teal-500', icon: Cpu },
    { name: 'RAG & Weaviate', role: 'Dense & Sparse Retrieval', color: 'from-cyan-500 to-blue-500', icon: Database },
    { name: 'Model Context Protocol', role: 'Standardized Tool Layer', color: 'from-amber-500 to-orange-500', icon: Zap },
    { name: 'AI Evaluation & MLflow', role: 'Automated Benchmarks', color: 'from-rose-500 to-pink-500', icon: Activity },
    { name: 'React & WebSockets', role: 'Real-Time UI Telemetry', color: 'from-sky-500 to-indigo-500', icon: Layers },
  ];

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle through tech orbit with Anime.js text scramble
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTechIndex((prev) => {
        const next = (prev + 1) % techOrbit.length;
        if (techNameRef.current) {
          scrambleText(techNameRef.current, techOrbit[next].name, 500);
        }
        return next;
      });
    }, 3400);
    return () => clearInterval(timer);
  }, [techOrbit]);

  const handleReaction = (emoji: string) => {
    soundManager.playPop();
    setActiveReactions(prev => {
      const next = new Set(prev);
      if (next.has(emoji)) {
        next.delete(emoji);
      } else {
        next.add(emoji);
      }
      return next;
    });

    confetti({
      particleCount: 28,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#7C3AED', '#22D3EE', '#F59E0B']
    });
  };

  const currentTech = techOrbit[activeTechIndex];
  const CurrentIcon = currentTech.icon;

  const reactions = ['🔥', '🚀', '⚡', '☕', '💜', '✨'];

  return (
    <div className="w-full space-y-4">
      {/* Main Interactive Tech Hub Card */}
      <div className="apple-glass shimmer-border rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-2xl space-y-6">
        {/* Top Header Strip */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-semibold text-slate-200">
              Interactive Tech Hub
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg glass-subtle text-[10px] font-mono text-slate-300">
            <Clock className="w-3 h-3 text-accent-cyan" />
            <span>{currentTime || '—'} IST</span>
          </div>
        </div>

        {/* Active Tech Spotlight Banner */}
        <div className="p-4 rounded-2xl glass-subtle space-y-2 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${currentTech.color} flex items-center justify-center text-white shadow-lg transition-all`}>
                <CurrentIcon className="w-5 h-5" />
              </div>
              <div>
                <div ref={techNameRef} className="text-sm font-bold font-display text-white">
                  {currentTech.name}
                </div>
                <div className="text-[11px] font-mono text-accent-teal">
                  {currentTech.role}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full glass-subtle text-slate-300">
              0{activeTechIndex + 1} / 0{techOrbit.length}
            </span>
          </div>
        </div>

        {/* Interactive Orbit Selector Badges */}
        <div className="grid grid-cols-3 gap-2">
          {techOrbit.map((tech, idx) => {
            const Icon = tech.icon;
            const isActive = activeTechIndex === idx;

            return (
              <button
                key={tech.name}
                onClick={() => {
                  soundManager.playPop();
                  setActiveTechIndex(idx);
                  if (techNameRef.current) {
                    scrambleText(techNameRef.current, tech.name, 450);
                  }
                }}
                className={`p-2.5 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between space-y-1.5 card-3d cursor-pointer ${
                  isActive
                    ? 'apple-glass border-accent-violet/60 text-white shadow-lg shadow-accent-violet/20 scale-[1.03]'
                    : 'glass-subtle text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent-teal' : 'text-slate-500'}`} />
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />}
                </div>
                <span className="text-[11px] font-mono font-medium truncate">
                  {tech.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reaction Footer — Apple style clean feedback */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-accent-amber" />
            <span>Chennai, India</span>
          </div>

          {/* Interactive reaction triggers */}
          <div className="flex items-center gap-1">
            {reactions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className={`px-2 py-1 rounded-lg text-sm hover:scale-125 active:scale-90 transition-all duration-200 cursor-pointer ${
                  activeReactions.has(emoji)
                    ? 'apple-glass border-accent-violet/50 shadow-md shadow-accent-violet/15 scale-110'
                    : 'glass-subtle hover:bg-white/10'
                }`}
                title={`Send ${emoji} reaction`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
