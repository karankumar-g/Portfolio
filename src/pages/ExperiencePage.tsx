import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Zap
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { scrambleText } from '../utils/animeEffects';

export const ExperiencePage: React.FC = () => {
  const expTitleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (expTitleRef.current) {
      scrambleText(expTitleRef.current, 'Experience', 750);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-12">
      {/* Header */}
      <motion.div 
        className="space-y-4 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-mono text-accent-teal">
          <Briefcase className="w-3.5 h-3.5" /> Career
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Work <span ref={expTitleRef} className="text-gradient-violet-cyan">Experience</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Software engineering, conversational AI systems, and CRM integrations at Data Aces.
        </p>
      </motion.div>

      {/* Main Experience Card */}
      <div className="space-y-8">
        {EXPERIENCES.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="apple-glass shimmer-border rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">
                    {exp.statusChip}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-accent-cyan" /> {exp.period}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accent-amber" /> {exp.location}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {exp.role} <span className="text-accent-teal">@ {exp.company}</span>
                </h2>
              </div>
            </div>

            {/* Core Responsibilities */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> What I Work On
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exp.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl glass-subtle space-y-3 flex flex-col justify-between card-3d"
                  >
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {resp.point}
                    </p>

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

            {/* Technologies Applied */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono text-slate-400">Tech Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg glass-subtle text-xs font-mono text-slate-300"
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
