import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Bot, 
  Database, 
  Cpu, 
  MapPin, 
  Clock, 
  Layers,
  Cloud,
  Workflow
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { scrambleText } from '../utils/animeEffects';

export const HeroBentoWidget: React.FC = () => {
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [activeReactions, setActiveReactions] = useState<Set<string>>(new Set());
  const techNameRef = useRef<HTMLDivElement | null>(null);

  const techOrbit = [
    { name: 'LangGraph', role: 'Multi-Agent Routing', color: 'from-violet-500 to-indigo-500', icon: Bot },
    { name: 'Python / Django', role: 'Backend APIs & Services', color: 'from-emerald-500 to-teal-500', icon: Cpu },
    { name: 'Salesforce CRM', role: 'WhatsApp Automation', color: 'from-blue-500 to-cyan-500', icon: Cloud },
    { name: 'Weaviate & RAG', role: 'Semantic Document Search', color: 'from-cyan-500 to-blue-500', icon: Database },
    { name: 'DBT & Prefect', role: 'Data Pipelines & Prep', color: 'from-amber-500 to-orange-500', icon: Workflow },
    { name: 'React & TypeScript', role: 'Frontend Applications', color: 'from-sky-500 to-indigo-500', icon: Layers },
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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTechIndex((prev) => {
        const next = (prev + 1) % techOrbit.length;
        if (techNameRef.current) {
          scrambleText(techNameRef.current, techOrbit[next].name, 450);
        }
        return next;
      });
    }, 3200);
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
      particleCount: 24,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#7C3AED', '#22D3EE', '#F59E0B']
    });
  };

  const currentTech = techOrbit[activeTechIndex];
  const CurrentIcon = currentTech.icon;

  const reactions = ['🔥', '🚀', '⚡', '☕', '✨'];

  return (
    <div className="w-full space-y-4">
      {/* Main Card */}
      <div className="apple-glass shimmer-border rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-2xl space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-slate-200">
              Tech Stack & Focus
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg glass-subtle text-[10px] font-mono text-slate-300">
            <Clock className="w-3 h-3 text-accent-cyan" />
            <span>{currentTime || '—'} IST</span>
          </div>
        </div>

        {/* Active Tech Spotlight */}
        <div className="p-3.5 rounded-2xl glass-subtle space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${currentTech.color} flex items-center justify-center text-white shadow-md`}>
                <CurrentIcon className="w-4 h-4" />
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
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full glass-subtle text-slate-400">
              0{activeTechIndex + 1} / 0{techOrbit.length}
            </span>
          </div>
        </div>

        {/* Orbit Badges */}
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
                    scrambleText(techNameRef.current, tech.name, 400);
                  }
                }}
                className={`p-2 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between space-y-1 card-3d cursor-pointer ${
                  isActive
                    ? 'apple-glass border-accent-violet/60 text-white shadow-md shadow-accent-violet/20 scale-[1.02]'
                    : 'glass-subtle text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent-teal' : 'text-slate-500'}`} />
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-teal" />}
                </div>
                <span className="text-[10px] font-mono font-medium truncate">
                  {tech.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Location & Reactions */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-accent-amber" />
            <span>Chennai, India</span>
          </div>

          <div className="flex items-center gap-1">
            {reactions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className={`px-1.5 py-0.5 rounded-lg text-sm hover:scale-125 transition-all cursor-pointer ${
                  activeReactions.has(emoji)
                    ? 'apple-glass border-accent-violet/50 scale-110'
                    : 'glass-subtle hover:bg-white/10'
                }`}
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
