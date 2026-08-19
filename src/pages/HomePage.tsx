import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Layers, 
  Briefcase, 
  FileText, 
  MapPin, 
  Sparkles, 
  Award, 
  Zap, 
  ChevronRight,
  Database,
  Bot
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { HeroBentoWidget } from '../components/HeroBentoWidget';
import { soundManager } from '../utils/soundEffects';
import { scrambleText } from '../utils/animeEffects';

interface HomePageProps {
  onOpenResumeModal: () => void;
  onOpenCommandPalette: () => void;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export const HomePage: React.FC<HomePageProps> = ({ onOpenResumeModal }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const heroNameRef = useRef<HTMLSpanElement | null>(null);

  // Typewriter effect for role titles
  useEffect(() => {
    const currentRole = PERSONAL_INFO.rolesList[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.rolesList.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  // Initial scramble text for name
  useEffect(() => {
    if (heroNameRef.current) {
      scrambleText(heroNameRef.current, PERSONAL_INFO.name, 900);
    }
  }, []);

  return (
    <div className="space-y-24 pt-24 sm:pt-28 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Copy */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -25, rotateY: 3 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1200px' }}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{PERSONAL_INFO.currentStatus}</span>
            </div>

            {/* Main Display Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-display text-white">
                Hi, I'm <span ref={heroNameRef} className="text-gradient-violet-cyan">{PERSONAL_INFO.name}</span>
              </h1>

              {/* Typewriter Subtitle */}
              <div className="h-10 flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-mono text-accent-teal font-medium">
                  {displayedText}
                </span>
                <span className="w-2 h-6 bg-accent-violet animate-pulse rounded-sm" />
              </div>
            </div>

            {/* Engaging One-Liner */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
              Building <span className="text-white font-semibold">scalable enterprise backends</span>, <span className="text-white font-semibold">intelligent RAG pipelines</span>, and <span className="text-accent-teal font-semibold">LangGraph-based multi-agent workflows</span> that bridge AI with reliable software systems.
            </p>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 apple-glass px-3 py-1.5 rounded-xl">
                <MapPin className="w-3.5 h-3.5 text-accent-amber" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1.5 apple-glass px-3 py-1.5 rounded-xl">
                <Briefcase className="w-3.5 h-3.5 text-accent-violet" />
                {PERSONAL_INFO.currentRole}
              </span>
              <span className="flex items-center gap-1.5 apple-glass px-3 py-1.5 rounded-xl">
                <Award className="w-3.5 h-3.5 text-accent-cyan" />
                MCA • Postgraduate Distinction
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <NavLink
                to="/projects"
                onClick={() => soundManager.playPop()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-accent-violet/30 hover:shadow-accent-violet/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <button
                onClick={() => {
                  soundManager.playPop();
                  onOpenResumeModal();
                }}
                className="px-5 py-3 rounded-xl apple-glass hover:border-white/30 text-slate-200 font-medium text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-accent-teal" />
                <span>Download Resume</span>
              </button>

              <NavLink
                to="/about"
                onClick={() => soundManager.playPop()}
                className="px-4 py-3 rounded-xl bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/20 font-medium text-sm flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>My Story & Journey</span>
              </NavLink>
            </div>
          </motion.div>

          {/* Right Column: Hero Bento & Interactive Tech Hub */}
          <motion.div 
            className="lg:col-span-5 w-full"
            initial={{ opacity: 0, x: 25, rotateY: -3 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1200px' }}
          >
            <HeroBentoWidget />
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED PROJECTS SHOWCASE */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Featured Projects
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              AI, Backend & CRM Systems
            </h2>
          </div>
          <NavLink
            to="/projects"
            onClick={() => soundManager.playPop()}
            className="text-xs font-mono text-accent-teal hover:text-white flex items-center gap-1 group"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="apple-glass shimmer-border rounded-3xl p-6 flex flex-col justify-between space-y-5 group relative overflow-hidden card-3d"
            >
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="px-2.5 py-1 rounded-lg glass-subtle text-accent-teal text-[11px] font-mono border border-accent-violet/20">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-white group-hover:text-accent-teal transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {project.bullets[0]}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-lg glass-subtle text-[10px] font-mono text-slate-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                <NavLink
                  to={`/projects#${project.id}`}
                  onClick={() => soundManager.playPop()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-teal group-hover:text-white transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 3. CURRENT ROLE @ DATA ACES */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="rounded-3xl apple-glass bg-gradient-to-r from-accent-violet/10 via-transparent to-accent-cyan/10 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Current Role
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Software Engineer @ <span className="text-gradient-violet-cyan">Data Aces</span>
              </h3>
              <p className="text-xs font-mono text-slate-400">
                05/2025 – Present | Chennai, India
              </p>
            </div>

            <NavLink
              to="/experience"
              onClick={() => soundManager.playPop()}
              className="px-4 py-2.5 rounded-xl apple-glass hover:bg-white/15 text-xs font-mono text-white transition-all self-start sm:self-auto flex items-center gap-2 cursor-pointer"
            >
              <span>Full Experience</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl glass-subtle space-y-2">
              <div className="text-xs font-mono text-accent-cyan font-semibold flex items-center gap-1.5">
                <Bot className="w-4 h-4" /> Agentic AI & MCP Orchestration
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Building real-time conversational systems using LangGraph multi-agent workflows and Model Context Protocol (MCP) tool dispatching.
              </p>
            </div>

            <div className="p-4 rounded-xl glass-subtle space-y-2">
              <div className="text-xs font-mono text-accent-violet font-semibold flex items-center gap-1.5">
                <Database className="w-4 h-4" /> Salesforce CRM & Pharma Data Prep
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automating sales workflows with Salesforce & WhatsApp integrations, and engineering custom analytical dashboards for healthcare & pharma data.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. CLOSING COLLABORATION CTA */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-mono text-accent-teal">
          <Zap className="w-3.5 h-3.5" /> Let's Build Something Together
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Ready to work on your next <span className="text-gradient-violet-cyan">AI, CRM or Backend project</span>?
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Based in Chennai, India. Open for discussions on AI engineering, agentic systems, CRM sales automations, and backend infrastructure.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <NavLink
            to="/contact"
            onClick={() => soundManager.playPop()}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-accent-violet/30 transition-all cursor-pointer"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>

          <NavLink
            to="/skills"
            onClick={() => soundManager.playPop()}
            className="px-6 py-3.5 rounded-xl apple-glass text-slate-200 font-medium text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span>Explore Skills & Tools</span>
          </NavLink>
        </div>
      </motion.section>
    </div>
  );
};
