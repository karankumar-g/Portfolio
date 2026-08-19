import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  BookOpen, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUp, 
  Check 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [copied, setCopied] = useState(false);

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

  const scrollToTop = () => {
    soundManager.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    soundManager.playPop();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative z-10 mt-24 border-t border-white/10 glass-card rounded-none backdrop-blur-xl transition-colors">
      {/* Top Accent Strip */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent-violet to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Column 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-violet to-accent-cyan flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-accent-violet/30">
                KG
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-accent-teal font-mono">
                  {PERSONAL_INFO.roleTitle}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Building scalable backend systems, intelligent RAG pipelines, and LangGraph-driven multi-agent AI workflows.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-subtle text-[11px] font-mono text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-accent-amber" />
                <span>{PERSONAL_INFO.location}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-subtle text-[11px] font-mono text-accent-teal">
                <Clock className="w-3.5 h-3.5 text-accent-cyan animate-spin-slow" />
                <span>{currentTime || '—'} IST</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <NavLink 
                  to="/" 
                  onClick={() => soundManager.playPop()}
                  className="hover:text-white transition-colors"
                >
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/projects" 
                  onClick={() => soundManager.playPop()}
                  className="hover:text-white transition-colors"
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/experience" 
                  onClick={() => soundManager.playPop()}
                  className="hover:text-white transition-colors"
                >
                  Experience
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/skills" 
                  onClick={() => soundManager.playPop()}
                  className="hover:text-white transition-colors"
                >
                  Skills & Certifications
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  onClick={() => soundManager.playPop()}
                  className="hover:text-white transition-colors"
                >
                  Journey & Story
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Connect
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-400">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playPop()}
                className="flex items-center gap-2 hover:text-accent-teal transition-colors group"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>github.com/{PERSONAL_INFO.githubHandle}</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playPop()}
                className="flex items-center gap-2 hover:text-accent-teal transition-colors group"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>linkedin.com/{PERSONAL_INFO.linkedinHandle}</span>
              </a>
              <a
                href={PERSONAL_INFO.medium}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playPop()}
                className="flex items-center gap-2 hover:text-accent-teal transition-colors group"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>medium.com/{PERSONAL_INFO.mediumHandle}</span>
              </a>
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 hover:text-accent-cyan transition-colors text-left group"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Karankumar G. Built with ❤️ and precision.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-accent-teal/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Full Stack & AI Engineer
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg glass-subtle hover:bg-accent-violet/20 hover:text-white text-slate-400 transition-all group"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
