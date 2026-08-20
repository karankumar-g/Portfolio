import React, { useState } from 'react';
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
  ChevronRight,
  Code2,
  Bot,
  Database,
  Cloud,
  Send,
  Copy,
  Check,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, CERTIFICATIONS, EDUCATION } from '../data/portfolioData';
import { SystemsPreviewCanvas } from '../components/SystemsPreviewCanvas';
import { soundManager } from '../utils/soundEffects';

interface HomePageProps {
  onOpenResumeModal: () => void;
  onOpenCommandPalette: () => void;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

export const HomePage: React.FC<HomePageProps> = ({ onOpenResumeModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playPop();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="space-y-20 pt-24 sm:pt-28 pb-12">
      {/* 1. BESPOKE HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Personal Narrative & Quick Actions */}
          <motion.div 
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{PERSONAL_INFO.currentStatus}</span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-display text-white leading-tight">
                Hi, I'm <span className="text-gradient-violet-cyan">{PERSONAL_INFO.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-mono text-accent-teal font-medium">
                Full Stack & AI Engineer
              </p>
            </div>

            {/* Concise Human Introduction */}
            <p className="text-base text-slate-300 leading-relaxed font-sans max-w-xl">
              I design and build <strong className="text-white font-semibold">conversational AI assistants</strong>, <strong className="text-white font-semibold">scalable Python & Django backends</strong>, and <strong className="text-accent-teal font-semibold">automated CRM workflows</strong> that work reliably in production.
            </p>

            {/* Key Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400">
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
                MCA Distinction
              </span>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <NavLink
                to="/projects"
                onClick={() => soundManager.playPop()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-accent-violet/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3 rounded-xl apple-glass hover:border-white/30 text-slate-200 font-medium text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-accent-cyan" />}
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playPop();
                  onOpenResumeModal();
                }}
                className="px-4 py-3 rounded-xl apple-glass hover:border-white/30 text-slate-300 font-medium text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-accent-teal" />
                <span>Resume</span>
              </button>

              <NavLink
                to="/about"
                onClick={() => soundManager.playPop()}
                className="px-3.5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-300 border border-white/10 text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
                <span>Story</span>
              </NavLink>
            </div>
          </motion.div>

          {/* Right Column: Live Interactive Systems Canvas (Replaces generic widget) */}
          <motion.div 
            className="lg:col-span-6 w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SystemsPreviewCanvas />
          </motion.div>
        </div>
      </section>

      {/* 2. DEVELOPER IDENTITY & EXPERTISE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Current Focus @ Data Aces */}
          <div className="apple-glass shimmer-border rounded-3xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Current Focus
                </span>
                <span className="text-[11px] font-mono text-slate-400">Data Aces</span>
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Conversational AI & Backends
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Building multi-agent LangGraph workflows, RAG search engines with Weaviate, and automated Salesforce WhatsApp messaging pipelines.
              </p>
            </div>
            <NavLink
              to="/experience"
              onClick={() => soundManager.playPop()}
              className="text-xs font-mono text-accent-teal hover:text-white flex items-center gap-1 pt-2 border-t border-white/10"
            >
              <span>View Experience Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          {/* Card 2: Core Production Stack */}
          <div className="apple-glass shimmer-border rounded-3xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-accent-cyan font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> Production Stack
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Primary Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Python', 'Django', 'LangGraph', 'Weaviate', 'Salesforce', 'PostgreSQL', 'DBT', 'React'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg glass-subtle text-[11px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <NavLink
              to="/skills"
              onClick={() => soundManager.playPop()}
              className="text-xs font-mono text-accent-teal hover:text-white flex items-center gap-1 pt-2 border-t border-white/10"
            >
              <span>Explore All Skills & Tools</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          {/* Card 3: Academic Honors & Verified Credentials */}
          <div className="apple-glass shimmer-border rounded-3xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-accent-amber font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Honors & Credentials
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                MCA Distinction & Certified
              </h3>
              <ul className="text-xs text-slate-300 space-y-1 leading-relaxed">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal flex-shrink-0" />
                  <span>Master of Computer Applications (Distinction)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal flex-shrink-0" />
                  <span>Salesforce Certified Agentforce Specialist</span>
                </li>
              </ul>
            </div>
            <NavLink
              to="/about"
              onClick={() => soundManager.playPop()}
              className="text-xs font-mono text-accent-teal hover:text-white flex items-center gap-1 pt-2 border-t border-white/10"
            >
              <span>Read Background & Journey</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CASE STUDIES SHOWCASE */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Featured Work
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Production Projects & Systems
            </h2>
          </div>
          <NavLink
            to="/projects"
            onClick={() => soundManager.playPop()}
            className="text-xs font-mono text-accent-teal hover:text-white flex items-center gap-1 group"
          >
            <span>View all 5 projects</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PROJECTS.slice(0, 3).map((project) => (
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
                </div>

                <NavLink
                  to={`/projects#${project.id}`}
                  onClick={() => soundManager.playPop()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-teal group-hover:text-white transition-colors cursor-pointer"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 4. CONTACT CTA */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
          Ready to build something impactful?
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Based in Chennai, India. Let's talk about conversational AI, backend infrastructure, and CRM automations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <NavLink
            to="/contact"
            onClick={() => soundManager.playPop()}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-accent-violet/30 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Start a Conversation</span>
          </NavLink>

          <button
            onClick={handleCopyEmail}
            className="px-6 py-3.5 rounded-xl apple-glass text-slate-200 font-medium text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-accent-cyan" />}
            <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
          </button>
        </div>
      </motion.section>
    </div>
  );
};
