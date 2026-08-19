import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Cpu, 
  GitBranch, 
  Sparkles,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';
import { scrambleText } from '../utils/animeEffects';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSteps, setActiveSteps] = useState<{ [key: string]: number }>({
    'ace-ai': 0,
    'ace-etl': 0,
    'sales-automation': 0,
    'pharma-analytics': 0,
    'proctor-point': 0,
  });
  const pageTitleRef = useRef<HTMLSpanElement | null>(null);

  const categories = [
    'All', 
    'AI & RAG Systems', 
    'Data Engineering & ETL',
    'CRM & Enterprise Automation', 
    'Pharma Analytics & Data Engineering', 
    'Computer Vision & Security'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  useEffect(() => {
    if (pageTitleRef.current) {
      scrambleText(pageTitleRef.current, 'Projects & Case Studies', 750);
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
          <Layers className="w-3.5 h-3.5" /> What I've Built
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Featured <span ref={pageTitleRef} className="text-gradient-violet-cyan">Projects & Case Studies</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          A collection of production applications, RAG search engines, CRM automations, and data pipelines I've built.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playPop();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-semibold shadow-lg shadow-accent-violet/30 border border-accent-violet/80'
                  : 'apple-glass text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Project Cards List */}
      <motion.div 
        className="space-y-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {filteredProjects.map((project) => {
          const currentStepIdx = activeSteps[project.id] ?? 0;

          return (
            <motion.article
              key={project.id}
              id={project.id}
              variants={fadeUp}
              className="apple-glass shimmer-border rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
            >
              {/* Header */}
              <div className="space-y-2 border-b border-white/10 pb-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg glass-subtle text-accent-teal text-xs font-mono border border-accent-violet/25">
                    {project.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {project.title}
                </h2>

                <p className="text-sm text-accent-teal font-sans">
                  {project.tagline}
                </p>
              </div>

              {/* What I Built */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> What I Built & Key Highlights
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {project.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="p-4 rounded-2xl glass-subtle text-xs text-slate-300 leading-relaxed flex flex-col justify-between space-y-2 card-3d"
                    >
                      <div className="flex items-center gap-2 text-accent-teal text-[11px] font-mono font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Point 0{idx + 1}</span>
                      </div>
                      <p className="text-slate-300 font-medium leading-relaxed">
                        {bullet}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How it Works / Flow Steps */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-2">
                    <GitBranch className="w-3.5 h-3.5" /> How It Works
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Click steps to inspect the flow
                  </span>
                </div>

                {/* Step tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {project.flowSteps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundManager.playPop();
                        setActiveSteps((prev) => ({ ...prev, [project.id]: idx }));
                      }}
                      className={`p-3 rounded-xl text-left transition-all duration-300 border card-3d cursor-pointer ${
                        currentStepIdx === idx
                          ? 'apple-glass border-accent-violet/60 text-white shadow-md shadow-accent-violet/20'
                          : 'glass-subtle text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-accent-teal">
                        Step {step.badge}
                      </div>
                      <div className="text-xs font-semibold mt-0.5 truncate">{step.title}</div>
                    </button>
                  ))}
                </div>

                {/* Active Step Details */}
                <div className="p-4 rounded-2xl glass-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-mono text-accent-amber font-semibold">
                      {project.flowSteps[currentStepIdx]?.title}
                    </div>
                    <div className="text-xs text-slate-300">
                      {project.flowSteps[currentStepIdx]?.description}
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-3 py-1 rounded-lg glass-subtle text-[11px] font-mono text-accent-teal">
                    Tech: {project.flowSteps[currentStepIdx]?.tech}
                  </div>
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-1">Stack:</span>
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg glass-subtle text-xs font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
};
