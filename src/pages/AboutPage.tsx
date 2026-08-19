import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animate, createDrawable } from 'animejs';
import { 
  User, 
  GraduationCap, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Terminal,
  Zap,
  Bot,
  Calendar,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO, TIMELINE_JOURNEY } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';
import { scrambleText } from '../utils/animeEffects';

interface AboutPageProps {
  onOpenResumeModal: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenResumeModal }) => {
  const pageHeadingRef = useRef<HTMLSpanElement | null>(null);
  const motionLineRef = useRef<SVGPathElement | null>(null);
  const orbRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    if (pageHeadingRef.current) {
      scrambleText(pageHeadingRef.current, 'Philosophy', 850);
    }

    // Anime.js SVG Line Drawing & Motion Path for the Journey
    if (motionLineRef.current) {
      try {
        const drawable = createDrawable(motionLineRef.current);
        animate(drawable, {
          draw: [0, 1],
          duration: 2000,
          ease: 'inOutQuad',
        });
      } catch {
        const len = motionLineRef.current.getTotalLength?.() || 800;
        motionLineRef.current.style.strokeDasharray = `${len}`;
        motionLineRef.current.style.strokeDashoffset = `${len}`;
        animate(motionLineRef.current, {
          strokeDashoffset: [len, 0],
          duration: 2000,
          ease: 'inOutQuad',
        });
      }
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
          <User className="w-3.5 h-3.5" /> Engineering Narrative
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          My Journey & <span ref={pageHeadingRef} className="text-gradient-violet-cyan">Philosophy</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          From algorithmic foundations and postgraduate distinction to engineering multi-agent AI systems and scalable backends.
        </p>
      </motion.div>

      {/* Narrative Intro Box */}
      <motion.div 
        className="apple-glass shimmer-border rounded-3xl p-6 sm:p-10 space-y-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Karankumar G
            </h2>
            <p className="text-xs font-mono text-accent-teal">
              Full Stack & AI Software Engineer • Chennai, India
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playPop();
                onOpenResumeModal();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-md shadow-accent-violet/30 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Resume</span>
            </button>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          <p>
            I began my computing path focusing deeply on algorithms, data structures, and database systems. During my undergraduate studies in Computer Science (2020–2023), I secured <strong className="text-white">First Class with Distinction</strong> while building early backend architectures and Python tools.
          </p>
          <p>
            I then completed my <strong className="text-accent-cyan">Master of Computer Applications (MCA)</strong> at DG Vaishnav College with high distinction. My graduate work centered on full-stack systems, computer vision proctoring platforms, and multi-source ETL pipelines.
          </p>
          <p>
            Currently at <strong className="text-accent-teal">Data Aces</strong>, I build production AI and backend systems: from hybrid semantic search and RAG pipelines to multi-agent workflows with LangGraph and Model Context Protocol (MCP).
          </p>
        </div>
      </motion.div>

      {/* Engineer Personality & Focus Highlights */}
      <motion.div 
        className="space-y-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Engineering Identity
        </div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERSONAL_INFO.funFacts.map((fact, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-5 rounded-2xl apple-glass space-y-2 card-3d"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{fact.emoji}</span>
                <span className="text-xs font-mono text-accent-teal font-semibold">
                  {fact.label}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {fact.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Connected Motion Path Journey (Streamlined Apple-style, NO bulky cards) */}
      <motion.div 
        className="space-y-8 pt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" /> Milestone Trajectory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Engineering Journey
          </h2>
        </div>

        {/* Minimal Interconnected Streamlined Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          {/* Animated SVG Path Line */}
          <div className="absolute left-2.5 sm:left-3.5 top-2 bottom-4 w-[2px]">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <path
                ref={motionLineRef}
                d="M 1,0 L 1,1000"
                stroke="url(#journeyGradient)"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-70"
              />
              <defs>
                <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {TIMELINE_JOURNEY.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="relative group flex items-start gap-4 sm:gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glowing Node Marker */}
              <div 
                className="w-5 h-5 rounded-full border-2 border-[#07080C] flex-shrink-0 mt-1 shadow-lg group-hover:scale-150 transition-all duration-300 z-10"
                style={{ backgroundColor: item.accentColor, boxShadow: `0 0 16px ${item.accentColor}60` }}
              />

              {/* Streamlined Content Row (Clean, minimal, high-contrast) */}
              <div className="flex-1 space-y-2 border-b border-white/10 pb-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {item.year}
                  </span>
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border font-medium"
                    style={{ borderColor: `${item.accentColor}50`, color: item.accentColor, backgroundColor: `${item.accentColor}12` }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-accent-teal transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-accent-teal">
                  {item.institution}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl pt-1">
                  {item.narrative}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Engineering Principles */}
      <motion.div 
        className="space-y-6 pt-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> Technical Standards
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Core Principles
          </h2>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PERSONAL_INFO.corePhilosophy.map((phil, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 rounded-3xl apple-glass space-y-3 card-3d"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{phil.emoji}</span>
                <h3 className="text-base font-bold font-display text-white">
                  {phil.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {phil.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Action CTA */}
      <motion.div 
        className="p-8 rounded-3xl apple-glass flex flex-col sm:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold font-display text-white">
            Interested in collaborating?
          </h3>
          <p className="text-xs text-slate-400">
            Let's connect over AI implementations, backend scaling, or technical discussions.
          </p>
        </div>

        <NavLink
          to="/contact"
          onClick={() => soundManager.playPop()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-xs font-mono flex items-center gap-2 shadow-lg shadow-accent-violet/30 transition-all whitespace-nowrap cursor-pointer"
        >
          <span>Get in Touch</span>
          <ArrowRight className="w-4 h-4" />
        </NavLink>
      </motion.div>
    </div>
  );
};
