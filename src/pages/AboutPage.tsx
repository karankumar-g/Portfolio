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
  Send
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
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenResumeModal }) => {
  const pageHeadingRef = useRef<HTMLSpanElement | null>(null);
  const motionLineRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (pageHeadingRef.current) {
      scrambleText(pageHeadingRef.current, 'Background', 750);
    }

    if (motionLineRef.current) {
      try {
        const drawable = createDrawable(motionLineRef.current);
        animate(drawable, {
          draw: [0, 1],
          duration: 1800,
          ease: 'inOutQuad',
        });
      } catch {
        const len = motionLineRef.current.getTotalLength?.() || 800;
        motionLineRef.current.style.strokeDasharray = `${len}`;
        motionLineRef.current.style.strokeDashoffset = `${len}`;
        animate(motionLineRef.current, {
          strokeDashoffset: [len, 0],
          duration: 1800,
          ease: 'inOutQuad',
        });
      }
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-14">
      {/* Header */}
      <motion.div 
        className="space-y-4 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-mono text-accent-teal">
          <User className="w-3.5 h-3.5" /> About Me
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          My Journey & <span ref={pageHeadingRef} className="text-gradient-violet-cyan">Background</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          A quick overview of my background, experience at Data Aces, and how I build software.
        </p>
      </motion.div>

      {/* Narrative Intro Box */}
      <motion.div 
        className="apple-glass shimmer-border rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Karankumar G
            </h2>
            <p className="text-xs font-mono text-accent-teal">
              Full Stack & AI Engineer • Chennai, India
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onOpenResumeModal();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-md shadow-accent-violet/30 cursor-pointer self-start sm:self-auto"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Resume</span>
          </button>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          <p>
            I'm a software engineer based in Chennai with a passion for building clean backend systems and practical AI tools. I completed my B.Sc in Computer Science (First Class with Distinction) and my Master of Computer Applications (MCA Distinction) from DG Vaishnav College.
          </p>
          <p>
            Currently at <strong className="text-white">Data Aces</strong>, I work on conversational AI platforms with LangGraph, RAG document search engines, Salesforce & WhatsApp CRM automations, and custom data preparation pipelines for healthcare datasets.
          </p>
        </div>
      </motion.div>

      {/* Quick Focus Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PERSONAL_INFO.quickHighlights.map((fact, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl apple-glass space-y-1.5 card-3d"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{fact.icon}</span>
              <span className="text-xs font-mono text-accent-teal font-semibold">
                {fact.label}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-snug">
              {fact.value}
            </p>
          </div>
        ))}
      </div>

      {/* Timeline Journey */}
      <motion.div 
        className="space-y-6 pt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="space-y-1 border-b border-white/10 pb-3">
          <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" /> Education & Career
          </div>
          <h2 className="text-xl font-bold font-display text-white">
            Milestones
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8">
          <div className="absolute left-2.5 sm:left-3 top-2 bottom-4 w-[2px]">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <path
                ref={motionLineRef}
                d="M 1,0 L 1,600"
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
              className="relative flex items-start gap-4"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div 
                className="w-4 h-4 rounded-full border-2 border-[#07080C] flex-shrink-0 mt-1 shadow-md z-10"
                style={{ backgroundColor: item.accentColor }}
              />

              <div className="flex-1 space-y-1.5 border-b border-white/10 pb-6">
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

                <h3 className="text-base font-bold font-display text-white">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-accent-teal">
                  {item.institution}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pt-0.5">
                  {item.narrative}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Action CTA */}
      <motion.div 
        className="p-6 sm:p-8 rounded-3xl apple-glass flex flex-col sm:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold font-display text-white">
            Let's connect
          </h3>
          <p className="text-xs text-slate-400">
            Open for discussions on software engineering, AI systems, and CRM integrations.
          </p>
        </div>

        <NavLink
          to="/contact"
          onClick={() => soundManager.playPop()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-xs font-mono flex items-center gap-2 shadow-md shadow-accent-violet/30 transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Contact Me</span>
        </NavLink>
      </motion.div>
    </div>
  );
};
