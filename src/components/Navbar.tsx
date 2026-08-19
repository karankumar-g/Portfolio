import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Layers, 
  Briefcase, 
  Cpu, 
  User, 
  Mail, 
  Sun, 
  Moon, 
  FileText, 
  Menu, 
  X
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenCommandPalette,
  onOpenResumeModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      const platform = navigator.platform || navigator.userAgent || '';
      setIsMac(/Mac|iPhone|iPad|iPod/i.test(platform));
    }
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Overview', icon: Sparkles },
    { to: '/projects', label: 'Projects', icon: Layers },
    { to: '/experience', label: 'Experience', icon: Briefcase },
    { to: '/skills', label: 'Skills & Tools', icon: Cpu },
    { to: '/about', label: 'Journey & Story', icon: User },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pb-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <NavLink 
          to="/"
          onClick={() => soundManager.playPop()}
          className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full apple-glass hover:border-accent-violet/50 transition-all duration-300"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-accent-violet to-accent-cyan flex items-center justify-center text-white text-xs font-mono font-bold shadow-md shadow-accent-violet/30 group-hover:scale-105 transition-transform">
            KG
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-tight text-slate-100 font-display flex items-center gap-1.5">
              {PERSONAL_INFO.name}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Available for engineering" />
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
              Full Stack & AI Engineer
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Pill */}
        <nav className="hidden lg:flex items-center gap-1 px-3.5 py-1.5 rounded-full apple-glass shadow-xl shadow-black/20">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => soundManager.playPop()}
              className={({ isActive }) =>
                `relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-accent-violet/90 to-accent-cyan/90 shadow-md shadow-accent-violet/25 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Command Palette Button with Platform Adaptive Key */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenCommandPalette();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full apple-glass hover:border-accent-cyan/50 text-slate-300 hover:text-white text-xs transition-all duration-300 group cursor-pointer"
            title={`Open Command Palette (${isMac ? 'Cmd+K' : 'Ctrl+K'})`}
          >
            <span className="text-xs font-sans text-slate-400 group-hover:text-slate-200">Search</span>
            <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[10px] font-mono font-semibold text-accent-teal group-hover:bg-accent-violet/20 group-hover:text-white transition-colors">
              {isMac ? '⌘K' : 'Ctrl+K'}
            </kbd>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenResumeModal();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent-violet/15 hover:bg-accent-violet/25 text-accent-teal hover:text-white border border-accent-violet/30 hover:border-accent-violet/60 text-xs font-medium transition-all duration-300 shadow-sm cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-accent-teal" />
            <span className="hidden md:inline">Resume</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              soundManager.playPop();
              setDarkMode(!darkMode);
            }}
            className="p-2 rounded-full apple-glass hover:border-white/30 text-slate-300 hover:text-white transition-all duration-300 cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-accent-violet hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full apple-glass text-slate-300 hover:text-white"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-2xl apple-glass shadow-2xl space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => {
                  soundManager.playPop();
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  `p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-accent-violet text-white font-semibold'
                      : 'glass-subtle text-slate-300 hover:bg-white/[0.08]'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-accent-cyan" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px]">Chennai, India (IST)</span>
            <button
              onClick={() => {
                soundManager.playPop();
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="text-accent-cyan flex items-center gap-1 font-mono text-[11px]"
            >
              {isMac ? '⌘K' : 'Ctrl+K'} Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
