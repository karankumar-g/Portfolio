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
  ChevronRight,
  Send,
  Copy,
  Check,
  GraduationCap,
  Sparkle
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { InteractiveGlobe } from '../components/InteractiveGlobe';
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
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const heroNameRef = useRef<HTMLSpanElement | null>(null);

  // Dynamic Typewriter Effect for Role Titles
  useEffect(() => {
    const currentRole = PERSONAL_INFO.rolesList[roleIndex];
    const typingSpeed = isDeleting ? 30 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
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

  // Scramble Text Effect on Name on load & hover
  useEffect(() => {
    if (heroNameRef.current) {
      scrambleText(heroNameRef.current, PERSONAL_INFO.name, 800);
    }
  }, []);

  const handleNameHover = () => {
    if (heroNameRef.current) {
      scrambleText(heroNameRef.current, PERSONAL_INFO.name, 500);
    }
  };

  const handleCopyEmail = () => {
    soundManager.playPop();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="space-y-24 pt-24 sm:pt-28 pb-16">
      {/* 1. PERSONAL HERO SECTION WITH 3D GLOBE */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Personal Narrative & Direct Actions */}
          <motion.div 
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Software Engineer @ Data Aces • Chennai</span>
            </div>

            {/* Main Headline with Scramble Text */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-display text-white leading-tight">
                Hi, I'm{' '}
                <span 
                  ref={heroNameRef} 
                  onMouseEnter={handleNameHover}
                  className="text-gradient-violet-cyan cursor-pointer selection:bg-accent-violet/30"
                  title="Click or hover to scramble text"
                >
                  {PERSONAL_INFO.name}
                </span>
              </h1>

              {/* Dynamic Updating Subtitle Typewriter */}
              <div className="h-10 flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-mono text-accent-teal font-medium">
                  {displayedText}
                </span>
                <span className="w-2 h-6 bg-accent-violet animate-pulse rounded-sm" />
              </div>
            </div>

            {/* Human Personal Intro */}
            <p className="text-base text-slate-300 leading-relaxed font-sans max-w-xl">
              I'm a software engineer who loves turning complex problems into clean, practical products. At <strong className="text-white font-semibold">Data Aces</strong> in Chennai, I build conversational AI tools, RAG pipelines, scalable Python backends, and Salesforce CRM automations that real people use every day.
            </p>

            {/* Personal Highlights Matrix */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs font-mono">
              <div className="p-3 rounded-2xl apple-glass flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent-cyan/15 text-accent-cyan flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-semibold">MCA Distinction</div>
                  <div className="text-[10px] text-slate-400">DG Vaishnav College</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl apple-glass flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent-violet/15 text-accent-violet flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-semibold">Software Engineer</div>
                  <div className="text-[10px] text-slate-400">Data Aces (05/2025–Present)</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl apple-glass flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent-amber/15 text-accent-amber flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-semibold">Chennai, India</div>
                  <div className="text-[10px] text-slate-400">IST (UTC +5:30)</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl apple-glass flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-semibold">Certified Specialist</div>
                  <div className="text-[10px] text-slate-400">Salesforce Agentforce</div>
                </div>
              </div>
            </div>

            {/* Quick Action Dock */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
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
                <span>My Story</span>
              </NavLink>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Globe with Clean Glass Card */}
          <motion.div 
            className="lg:col-span-6 w-full flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveGlobe darkMode={true} />
          </motion.div>
        </div>
      </section>

      {/* 2. WHO I AM & WHAT DRIVES ME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="apple-glass shimmer-border rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-accent-violet/15 text-accent-violet flex items-center justify-center text-xl">
              💡
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Practical Engineering
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              I prioritize clean code, resilient database schemas, and maintainable architectures over overengineered complexity.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="apple-glass shimmer-border rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-accent-cyan/15 text-accent-cyan flex items-center justify-center text-xl">
              🤖
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Applied AI & RAG
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connecting generative models with real-world databases using Weaviate vector search and LangGraph multi-agent tools.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="apple-glass shimmer-border rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-accent-amber/15 text-accent-amber flex items-center justify-center text-xl">
              🚀
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              End-to-End Execution
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              From backend APIs in Django to automated CRM triggers with Salesforce and interactive frontend dashboards in React.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SHOWCASE */}
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
              Projects I've Built
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

      {/* 4. CONTACT & COLLABORATION CTA */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
          Let's connect & build something great.
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Based in Chennai, India. Reach out for software engineering opportunities, AI projects, or technical discussions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <NavLink
            to="/contact"
            onClick={() => soundManager.playPop()}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-accent-violet/30 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Get in Touch</span>
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
