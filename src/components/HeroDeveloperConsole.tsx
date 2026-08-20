import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  CornerDownLeft, 
  Trash2, 
  Send
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface TerminalEntry {
  id: string;
  command: string;
  response: string[];
  timestamp: string;
}

const INITIAL_ENTRIES: TerminalEntry[] = [
  {
    id: 'init-1',
    command: 'whoami',
    response: [
      'Karankumar G — Software Engineer at Data Aces, Chennai (MCA Distinction, 8.42 CGPA).',
      'Specializing in Python/Django backends, LangGraph RAG systems, and Salesforce Agentforce automation.'
    ],
    timestamp: '15:20:00'
  }
];

const SUGGESTIONS = [
  'whoami',
  'skills',
  'projects',
  'experience',
  'contact',
  'clear'
];

function getCommandResponse(input: string): string[] {
  const clean = input.trim().toLowerCase();

  if (!clean) {
    return [
      'Type any query or command above to learn about Karankumar G.',
      'Try typing "whoami", "skills", "projects", "experience", or "contact".'
    ];
  }

  if (clean === 'whoami' || clean.includes('who are you') || clean.includes('about')) {
    return [
      'Karankumar G — Software Engineer @ Data Aces in Chennai with an MCA Distinction (8.42 CGPA).',
      'Passionate about building scalable Python backends, production RAG pipelines, and conversational AI.'
    ];
  }

  if (clean.includes('skill') || clean.includes('tech') || clean.includes('stack')) {
    return [
      'Core Tech: Python (Django, FastAPI), React, TypeScript, LangGraph, ChromaDB, PostgreSQL, Redis, Celery.',
      'Enterprise & Cloud: Salesforce Agentforce, Apex, OmniStudio, Docker, RESTful APIs, and Vector DBs.'
    ];
  }

  if (clean.includes('project') || clean.includes('work') || clean.includes('portfolio')) {
    return [
      'Flagship Projects: Ace_ETL (Data Ingestion Engine), Ace_AI (RAG Multi-Agent), and Salesforce Agentforce Bot.',
      'Plus Smart Proctor Point (Computer Vision). Explore all 4 in the Projects page.'
    ];
  }

  if (clean.includes('experience') || clean.includes('job') || clean.includes('company') || clean.includes('data aces')) {
    return [
      'Software Engineer at Data Aces (Chennai, May 2025–Present) building AI tooling & CRM automations.',
      'Previously completed MCA (8.42 CGPA) and BCA (8.01 CGPA) with Distinction at D.G. Vaishnav College.'
    ];
  }

  if (clean.includes('education') || clean.includes('college') || clean.includes('degree') || clean.includes('mca')) {
    return [
      'Master of Computer Applications (MCA) — D.G. Vaishnav College, Chennai (May 2025, 8.42 CGPA Distinction).',
      'Bachelor of Computer Applications (BCA) — D.G. Vaishnav College, Chennai (May 2023, 8.01 CGPA).'
    ];
  }

  if (clean.includes('contact') || clean.includes('email') || clean.includes('hire') || clean.includes('reach')) {
    return [
      'Email: karankumar.g0csa@gmail.com • Base: Chennai, Tamil Nadu, India (IST UTC+5:30).',
      'Open to Full-Stack, Python/Django, and AI Engineering opportunities worldwide.'
    ];
  }

  if (clean.includes('location') || clean.includes('where') || clean.includes('city')) {
    return [
      'Based in Chennai, Tamil Nadu, India (UTC +5:30).',
      'Available for full-time engineering roles, remote or on-site.'
    ];
  }

  if (clean.includes('help')) {
    return [
      'Available commands: whoami, skills, projects, experience, education, contact, clear.',
      'Or ask any question in plain English (e.g. "What do you build?", "Where did you study?").'
    ];
  }

  // Default intelligent 2-line response for any free-form query
  return [
    `Karankumar G is a Full-Stack & AI Engineer at Data Aces building robust Python and RAG systems.`,
    `Feel free to reach out directly at karankumar.g0csa@gmail.com to collaborate or discuss opportunities.`
  ];
}

export const HeroDeveloperConsole: React.FC = () => {
  const [history, setHistory] = useState<TerminalEntry[]>(INITIAL_ENTRIES);
  const [inputVal, setInputVal] = useState('');
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const command = inputVal.trim();
    if (!command) return;

    soundManager.playPop();

    if (command.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const response = getCommandResponse(command);
    const now = new Date();
    const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newEntry: TerminalEntry = {
      id: `${Date.now()}-${Math.random()}`,
      command,
      response,
      timestamp
    };

    setHistory((prev) => [...prev, newEntry]);
    setInputVal('');
    soundManager.playSuccess();
  };

  const handleSuggestionClick = (cmd: string) => {
    if (cmd === 'clear') {
      soundManager.playPop();
      setHistory([]);
      setInputVal('');
      return;
    }
    setInputVal(cmd);
    soundManager.playPop();
    const response = getCommandResponse(cmd);
    const now = new Date();
    const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newEntry: TerminalEntry = {
      id: `${Date.now()}-${Math.random()}`,
      command: cmd,
      response,
      timestamp
    };

    setHistory((prev) => [...prev, newEntry]);
    setInputVal('');
    soundManager.playSuccess();
  };

  return (
    <div className="apple-glass shimmer-border rounded-3xl p-5 sm:p-6 w-full max-w-xl mx-auto shadow-2xl flex flex-col justify-between space-y-4">
      {/* Top Terminal Titlebar */}
      <div className="flex items-center justify-between border-b dark:border-white/10 border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono dark:text-slate-300 text-slate-800 font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-accent-blue" />
            <span>karankumar@terminal:~</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={() => {
                soundManager.playPop();
                setHistory([]);
              }}
              className="p-1 rounded-lg dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900 hover:bg-black/5 dark:hover:bg-white/5 text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
              title="Clear terminal history"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
            LIVE CLI
          </span>
        </div>
      </div>

      {/* Terminal Screen / Log Feed */}
      <div 
        ref={terminalContainerRef}
        className="h-[240px] sm:h-[260px] overflow-y-auto pr-1.5 space-y-3 font-mono text-xs scrollbar-thin dark:scrollbar-thumb-white/10 scrollbar-thumb-slate-300"
        onClick={() => inputRef.current?.focus()}
      >
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center dark:text-slate-400 text-slate-600 space-y-1">
            <Terminal className="w-6 h-6 dark:text-slate-500 text-slate-400 mb-1" />
            <p>Terminal cleared. Type anything below to ask about Karankumar.</p>
          </div>
        ) : (
          history.map((entry) => (
            <div key={entry.id} className="space-y-1.5">
              {/* Command Input Prompt */}
              <div className="flex items-center gap-2 dark:text-slate-300 text-slate-700">
                <span className="text-emerald-500 dark:text-emerald-400 font-bold">❯</span>
                <span className="dark:text-white text-slate-900 font-semibold">{entry.command}</span>
                <span className="text-[10px] dark:text-slate-500 text-slate-400 ml-auto">{entry.timestamp}</span>
              </div>

              {/* Exact 2-Line Response Box */}
              <div className="p-3 rounded-2xl glass-subtle border dark:border-white/10 border-slate-200 dark:text-slate-200 text-slate-800 space-y-1.5 shadow-sm">
                <div className="text-blue-600 dark:text-accent-sky font-medium leading-relaxed">
                  {entry.response[0]}
                </div>
                {entry.response[1] && (
                  <div className="dark:text-slate-300 text-slate-700 leading-relaxed text-[11px]">
                    {entry.response[1]}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Suggestion Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono">
        <span className="dark:text-slate-400 text-slate-500 text-[10px] flex-shrink-0 font-semibold">Quick:</span>
        {SUGGESTIONS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleSuggestionClick(cmd)}
            className="px-2.5 py-1 rounded-lg dark:bg-white/[0.05] bg-slate-200/70 hover:bg-blue-600/15 dark:text-slate-300 text-slate-700 hover:text-blue-600 dark:hover:text-accent-sky border dark:border-white/5 border-slate-300 transition-all flex-shrink-0 cursor-pointer font-medium"
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* Live Interactive Command Input Bar */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 text-emerald-500 dark:text-emerald-400 font-mono font-bold text-sm pointer-events-none">
          ❯
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type any question (whoami, skills, projects, contact)..."
          className="w-full pl-8 pr-12 py-3 rounded-2xl dark:bg-black/40 bg-white border dark:border-white/15 border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-xs dark:text-white text-slate-900 dark:placeholder:text-slate-500 placeholder:text-slate-400 outline-none transition-all shadow-inner"
        />
        <button
          type="submit"
          className="absolute right-2 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40"
          disabled={!inputVal.trim()}
          title="Send command (Enter)"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
