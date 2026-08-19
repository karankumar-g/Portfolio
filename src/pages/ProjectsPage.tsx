import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Cpu, 
  Database, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  GitBranch, 
  ShieldCheck, 
  Activity,
  Bot
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';
import { scrambleText } from '../utils/animeEffects';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSteps, setActiveSteps] = useState<{ [key: string]: number }>({
    'ace-ai': 0,
    'sales-automation': 0,
    'pharma-analytics': 0,
    'proctor-point': 0,
  });
  const pageTitleRef = useRef<HTMLSpanElement | null>(null);

  const categories = [
    'All', 
    'AI & RAG Systems', 
    'CRM & Enterprise Automation', 
    'Pharma Analytics & Data Engineering', 
    'Computer Vision & Security'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  useEffect(() => {
    if (pageTitleRef.current) {
      scrambleText(pageTitleRef.current, 'Projects & Systems', 850);
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
          <Layers className="w-3.5 h-3.5" /> Featured Deliverables & Systems
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Featured <span ref={pageTitleRef} className="text-gradient-violet-cyan">Projects & Systems</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Deep dive into the workflows, cloud deployments, and architectures across AI, CRM sales automations, pharma analytics, and backend applications.
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
        className="space-y-16"
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
              className="apple-glass shimmer-border rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden"
            >
              {/* Subtle accent backdrop */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-violet/8 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-white/10 pb-8">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center">
                    <span className="px-3 py-1 rounded-lg glass-subtle text-accent-teal text-xs font-mono border border-accent-violet/25">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
                    {project.title}
                  </h2>

                  <p className="text-base text-accent-teal font-sans">
                    {project.tagline}
                  </p>
                </div>

                {/* Metrics Badges */}
                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 rounded-2xl apple-glass min-w-[140px] space-y-1 card-3d cursor-default"
                    >
                      <div className="text-xl sm:text-2xl font-bold font-mono text-accent-amber">
                        {m.value}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-200">{m.label}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{m.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div className="p-5 rounded-2xl glass-subtle space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" /> System Overview & Strategy
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {project.architectureOverview}
                </p>
              </div>

              {/* Technical Highlights */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" /> Key Architectural Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl glass-subtle text-xs text-slate-300 leading-relaxed flex flex-col justify-between space-y-2 card-3d"
                    >
                      <div className="w-6 h-6 rounded-lg bg-accent-violet/15 text-accent-teal flex items-center justify-center font-mono font-bold text-[10px] border border-accent-violet/25">
                        0{idx + 1}
                      </div>
                      <p className="text-slate-300 font-medium">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Flow Inspector */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-2">
                    <GitBranch className="w-3.5 h-3.5" /> Pipeline Execution Graph
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Click steps to inspect runtime behavior
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
                          ? 'apple-glass border-accent-violet/60 text-white shadow-lg shadow-accent-violet/20'
                          : 'glass-subtle text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-accent-teal">
                        {step.badge}
                      </div>
                      <div className="text-xs font-semibold mt-0.5 truncate">{step.title}</div>
                    </button>
                  ))}
                </div>

                {/* Active Step Details */}
                <div className="p-5 rounded-2xl glass-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-accent-amber font-semibold">
                      {project.flowSteps[currentStepIdx]?.title}
                    </div>
                    <div className="text-xs text-slate-300">
                      {project.flowSteps[currentStepIdx]?.description}
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-3 py-1.5 rounded-lg glass-subtle text-[11px] font-mono text-accent-teal">
                    Tech: {project.flowSteps[currentStepIdx]?.tech}
                  </div>
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2">Technologies:</span>
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg glass-subtle text-xs font-mono text-slate-300 hover:border-accent-teal/40 transition-colors"
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
