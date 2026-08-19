import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Zap, 
  Layers
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { scrambleText } from '../utils/animeEffects';

export const ExperiencePage: React.FC = () => {
  const expTitleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (expTitleRef.current) {
      scrambleText(expTitleRef.current, 'Experience', 850);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-16">
      {/* Header */}
      <motion.div 
        className="space-y-4 max-w-3xl"
        initial={{ opacity: 0, y: 25, rotateX: 3 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '1200px' }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-mono text-accent-teal">
          <Briefcase className="w-3.5 h-3.5" /> Career History
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Work <span ref={expTitleRef} className="text-gradient-violet-cyan">Experience</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Software engineering, AI system design, and real-time deployments at Data Aces.
        </p>
      </motion.div>

      {/* Main Experience Card */}
      <div className="space-y-12">
        {EXPERIENCES.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="apple-glass shimmer-border rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">
                    {exp.statusChip}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-accent-cyan" /> {exp.period}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accent-amber" /> {exp.location}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
                  {exp.role} <span className="text-accent-teal">@ {exp.company}</span>
                </h2>
              </div>

              <div className="px-4 py-2 rounded-xl apple-glass text-xs font-mono text-slate-300">
                Full-Time Engineering
              </div>
            </div>

            {/* Role Summary */}
            <div className="p-4 rounded-2xl glass-subtle space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold">
                Role Overview
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {exp.summary}
              </p>
            </div>

            {/* Core Responsibilities & Impact Cards */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> Key Deliverables & Impact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl glass-subtle hover:border-accent-violet/30 transition-all space-y-4 flex flex-col justify-between card-3d"
                  >
                    <div className="space-y-2">
                      {resp.impactMetric && (
                        <div className="inline-block px-2.5 py-0.5 rounded-lg bg-accent-amber/10 text-accent-amber text-[11px] font-mono font-semibold border border-amber-500/15">
                          Impact: {resp.impactMetric}
                        </div>
                      )}
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {resp.point}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {resp.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-lg glass-subtle text-[10px] font-mono text-accent-teal border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Engineering Wins */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Key Milestones
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {exp.keyWins.map((win, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl glass-subtle text-xs text-slate-300 flex items-start gap-2 card-3d"
                  >
                    <span className="text-accent-teal font-mono font-bold">0{idx + 1}.</span>
                    <span>{win}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Tech Stack Pills */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Technologies Applied
              </h3>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg glass-subtle text-xs font-mono text-slate-300 hover:border-accent-violet/40 hover:text-white transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
