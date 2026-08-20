import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Code2,
  Globe,
  BrainCircuit,
  Database,
  Cloud,
  Building2,
  Award
} from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS, ACHIEVEMENTS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';
import { scrambleText } from '../utils/animeEffects';

const categoryIcons: { [key: string]: React.ElementType } = {
  'Languages': Code2,
  'Frameworks & Web': Globe,
  'AI & Agentic Systems': BrainCircuit,
  'Databases & Cloud': Database,
  Cloud,
  'CRM & Enterprise': Building2,
};

const skillIcons: { [key: string]: string } = {
  'Python': '🐍',
  'JavaScript': '⚡',
  'TypeScript': '🔷',
  'SQL': '🗄️',
  'Django': '🎯',
  'Django REST Framework': '🔗',
  'React': '⚛️',
  'Flask': '🧪',
  'LangGraph': '🤖',
  'RAG Systems': '🧠',
  'MCP (Model Context Protocol)': '🔌',
  'Weaviate': '🔮',
  'MLflow': '📊',
  'PostgreSQL': '🐘',
  'Snowflake': '❄️',
  'Redis': '⚡',
  'MongoDB': '🍃',
  'AWS & Azure': '☁️',
  'DBT': '🔶',
  'Prefect': '🌊',
  'Git & GitHub': '📦',
  'Salesforce CRM & Automation': '☁️',
  'WhatsApp Business API': '💬',
  'Salesforce Agentforce': '🤖',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export const SkillsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const titleRef = useRef<HTMLSpanElement | null>(null);

  const categories = ['All', ...SKILL_CATEGORIES.map(c => c.category)];

  const filteredCategories = SKILL_CATEGORIES.filter(cat => {
    if (activeCategory !== 'All' && cat.category !== activeCategory) {
      return false;
    }
    return true;
  }).map(cat => {
    const filteredSkills = cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return { ...cat, skills: filteredSkills };
  }).filter(cat => cat.skills.length > 0);

  useEffect(() => {
    if (titleRef.current) {
      scrambleText(titleRef.current, 'Certifications', 750);
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
          <Code2 className="w-3.5 h-3.5" /> Technical Skills
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Skills, Tools & <span ref={titleRef} className="text-gradient-violet-cyan">Certifications</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          The languages, backend frameworks, AI libraries, databases, and enterprise platforms I work with day-to-day.
        </p>

        {/* Search & Category Filter */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Python, LangGraph, Django, Salesforce, SQL)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl apple-glass text-xs text-slate-100 placeholder:text-slate-500 outline-none focus:border-accent-violet/60 transition-all font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const CatIcon = categoryIcons[cat] || Sparkles;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundManager.playPop();
                    setActiveCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-semibold shadow-md shadow-accent-violet/30 border border-accent-violet/80'
                      : 'apple-glass text-slate-400 hover:text-slate-200 hover:border-white/25'
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Categorized Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredCategories.map((group) => {
          const CatIcon = categoryIcons[group.category] || Sparkles;
          return (
            <motion.div
              key={group.category}
              variants={itemVariants}
              className="apple-glass shimmer-border rounded-3xl p-6 space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-base font-bold font-display text-white flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center">
                    <CatIcon className="w-4 h-4 text-accent-teal" />
                  </div>
                  {group.category}
                </h2>
                <span className="text-[11px] font-mono text-slate-400">
                  {group.skills.length} tools
                </span>
              </div>

              {/* Clean Skills Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-2xl glass-subtle border hover:border-white/20 transition-all space-y-1 card-3d"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold font-mono text-white flex items-center gap-1.5">
                        <span>{skillIcons[skill.name] || '🔹'}</span>
                        <span>{skill.name}</span>
                      </span>
                    </div>

                    {skill.description && (
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Verified Certifications */}
      <motion.div 
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="space-y-0.5">
            <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Credentials
            </div>
            <h2 className="text-xl font-bold font-display text-white">
              Professional Certifications
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="apple-glass shimmer-border p-4 rounded-2xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-accent-violet/15 text-accent-teal border border-accent-violet/25">
                    {cert.issuer}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan" />
                </div>
                <h3 className="text-xs font-bold text-white leading-snug">
                  {cert.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                {cert.skillsLearned.map((s) => (
                  <span
                    key={s}
                    className="px-1.5 py-0.5 rounded-md glass-subtle text-[10px] font-mono text-slate-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
