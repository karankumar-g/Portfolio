import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Layers, 
  Briefcase, 
  Cpu, 
  User, 
  Mail, 
  FileText, 
  Sun, 
  Moon, 
  ExternalLink, 
  Copy, 
  Check, 
  X 
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenResumeModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  darkMode,
  setDarkMode,
  onOpenResumeModal,
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      category: 'Navigation',
      items: [
        { label: 'Overview / Home', icon: Sparkles, action: () => { soundManager.playPop(); navigate('/'); onClose(); } },
        { label: 'Projects & Architecture Deep Dive', icon: Layers, action: () => { soundManager.playPop(); navigate('/projects'); onClose(); } },
        { label: 'Professional Experience @ Data Aces', icon: Briefcase, action: () => { soundManager.playPop(); navigate('/experience'); onClose(); } },
        { label: 'Skills, Tools & Certifications', icon: Cpu, action: () => { soundManager.playPop(); navigate('/skills'); onClose(); } },
        { label: 'About & Journey (BSc → MCA → Software Engineer)', icon: User, action: () => { soundManager.playPop(); navigate('/about'); onClose(); } },
        { label: 'Contact & Hire', icon: Mail, action: () => { soundManager.playPop(); navigate('/contact'); onClose(); } },
      ]
    },
    {
      category: 'Featured Projects',
      items: PROJECTS.map(p => ({
        label: `${p.title} — ${p.tagline}`,
        icon: Layers,
        action: () => {
          soundManager.playPop();
          navigate(`/projects#${p.id}`);
          onClose();
        }
      }))
    },
    {
      category: 'Actions & Quick Utilities',
      items: [
        {
          label: 'View / Download Formatted Resume',
          icon: FileText,
          action: () => {
            soundManager.playPop();
            onOpenResumeModal();
            onClose();
          }
        },
        {
          label: `Switch to ${darkMode ? 'Light' : 'Dark'} Mode`,
          icon: darkMode ? Sun : Moon,
          action: () => {
            soundManager.playPop();
            setDarkMode(!darkMode);
            onClose();
          }
        },
        {
          label: `Copy Email (${PERSONAL_INFO.email})`,
          icon: copied ? Check : Copy,
          action: () => {
            soundManager.playPop();
            navigator.clipboard.writeText(PERSONAL_INFO.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        },
        {
          label: 'Open GitHub Profile',
          icon: ExternalLink,
          action: () => {
            soundManager.playPop();
            window.open(PERSONAL_INFO.github, '_blank');
            onClose();
          }
        },
        {
          label: 'Open LinkedIn Profile',
          icon: ExternalLink,
          action: () => {
            soundManager.playPop();
            window.open(PERSONAL_INFO.linkedin, '_blank');
            onClose();
          }
        }
      ]
    }
  ];

  const filteredActions = actions.map(group => ({
    category: group.category,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-2xl bg-bg-card border border-white/15 shadow-2xl overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-bg-darker/80">
          <Search className="w-4 h-4 text-accent-cyan mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a page, project, or quick command..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none font-sans"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-white/10 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="ml-2 text-[10px] font-mono text-slate-400 bg-white/10 px-1.5 py-0.5 rounded">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4 font-sans text-xs">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-mono">
              No matching results found.
            </div>
          ) : (
            filteredActions.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  {group.category}
                </div>
                {group.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={iIdx}
                      onClick={item.action}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-slate-300 hover:text-white hover:bg-accent-violet/20 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className="w-4 h-4 text-accent-cyan group-hover:text-accent-teal flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 group-hover:text-accent-teal">
                        ↵ Select
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-bg-darker/90 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Tip: Press <kbd className="text-slate-300">↑</kbd> <kbd className="text-slate-300">↓</kbd> to navigate</span>
          <span className="text-accent-teal">Karankumar G • Portfolio OS</span>
        </div>
      </div>
    </div>
  );
};
