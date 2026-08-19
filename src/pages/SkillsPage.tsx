import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Search, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Code2,
  Globe,
  BrainCircuit,
  Database,
  Wrench,
  Building2
} from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS, ACHIEVEMENTS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';
import { scrambleText } from '../utils/animeEffects';

// Category icons mapping
const categoryIcons: { [key: string]: React.ElementType } = {
  'Languages': Code2,
  'Frameworks & Web': Globe,
  'AI & Agentic Systems': BrainCircuit,
  'Databases & Vector Stores': Database,
  'Tools & Orchestration': Wrench,
  'CRM & Enterprise': Building2,
};

// Skill icons mapping
const skillIcons: { [key: string]: string } = {
  'Python': '🐍',
  'JavaScript': '⚡',
  'TypeScript': '🔷',
  'SQL': '🗃️',
  'Django': '🎯',
  'Django REST Framework': '🔗',
  'React': '⚛️',
  'Flask': '🧪',
  'LangGraph': '🤖',
  'RAG Systems': '🧠',
  'MCP (Model Context Protocol)': '🔌',
  'LLM Fine-tuning': '🎛️',
  'MLflow': '📊',
  'AI Evaluation & Benchmarking': '📈',
  'PostgreSQL': '🐘',
  'Weaviate': '🔮',
  'Redis': '⚡',
  'MongoDB': '🍃',
  'Cassandra': '💎',
  'Prefect': '🌊',
  'DBT': '🔶',
  'Git & GitHub': '📦',
  'Playwright': '🎭',
  'N8N Automation': '⚙️',
  'Docker / Cloud (AWS/Azure)': '☁️',
  'Salesforce CRM & Automation': '☁️',
  'WhatsApp Business API': '💬',
  'Salesforce Agentforce': '🤝',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
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

  // Scramble text effect on initial mount
  useEffect(() => {
    if (titleRef.current) {
      scrambleText(titleRef.current, 'Certifications', 900);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-16">
      {/* Header */}
      <motion.div 
        className="space-y-6 max-w-3xl"
        initial={{ opacity: 0, y: 25, rotateX: 3 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '1200px' }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-mono text-accent-teal">
          <Cpu className="w-3.5 h-3.5" /> Technical Matrix & Credentials
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Skills, Tools & <span ref={titleRef} className="text-gradient-violet-cyan">Certifications</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          A structured breakdown of my engineering competencies, multi-agent frameworks, CRM sales automations, vector search engines, and verified credentials.
        </p>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 pt-1">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. LangGraph, Python, Salesforce, MCP, DBT)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl apple-glass text-xs text-slate-100 placeholder:text-slate-500 outline-none focus:border-accent-violet/60 transition-all font-mono"
            />
          </div>

          {/* Category Filter Pills */}
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-semibold shadow-lg shadow-accent-violet/30 border border-accent-violet/80 scale-[1.02]'
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
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
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
              className="apple-glass shimmer-border rounded-3xl p-6 sm:p-7 space-y-4"
            >
              {/* Category Header */}
              <div className="space-y-1.5 border-b border-white/10 pb-3.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-display text-white flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center shadow-sm shadow-accent-violet/10">
                      <CatIcon className="w-4 h-4 text-accent-teal" />
                    </div>
                    {group.category}
                  </h2>
                  <span className="text-[11px] font-mono text-slate-400 glass-subtle px-2.5 py-1 rounded-lg">
                    {group.skills.length} {group.skills.length === 1 ? 'skill' : 'skills'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans pl-[42px]">
                  {group.description}
                </p>
              </div>

              {/* Skills List */}
              <div className={`grid gap-2.5 pt-1 ${group.skills.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onClick={() => soundManager.playPop()}
                    onMouseEnter={(e) => {
                      const nameEl = e.currentTarget.querySelector('.skill-name') as HTMLElement;
                      if (nameEl) scrambleText(nameEl, skill.name, 450);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer card-3d group ${
                      skill.highlight
                        ? 'apple-glass border-accent-violet/30 hover:border-accent-violet/60 hover:shadow-lg hover:shadow-accent-violet/15'
                        : 'glass-subtle hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold font-mono text-white flex items-center gap-2">
                        <span className="text-sm">{skillIcons[skill.name] || '🔹'}</span>
                        <span className="skill-name">{skill.name}</span>
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                          skill.level === 'Expert'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                            : skill.level === 'Advanced'
                            ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25'
                            : 'glass-subtle text-slate-300'
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>

                    {/* Apple-style Progress Indicator */}
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2.5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          skill.highlight
                            ? 'bg-gradient-to-r from-accent-violet via-accent-indigo to-accent-cyan'
                            : 'bg-accent-cyan/60'
                        }`}
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>

                    {skill.description && (
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed group-hover:text-slate-200 transition-colors">
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

      {/* Academic Distinction */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-xs font-mono uppercase tracking-wider text-accent-amber font-bold flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" /> Academic Honors
        </div>

        {ACHIEVEMENTS.map((ach) => (
          <div
            key={ach.id}
            className="p-6 sm:p-8 rounded-3xl apple-glass bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5 border border-amber-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-amber-500/5"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-lg shadow-amber-500/10">
                <Award className="w-9 h-9" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[11px] font-mono font-bold border border-amber-500/25">
                    {ach.badgeText}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {ach.organization}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  {ach.description}
                </p>
              </div>
            </div>

            <div className="text-center md:text-right font-mono flex-shrink-0">
              <div className="text-3xl font-bold text-amber-400">
                {ach.highlightNumber}
              </div>
              <div className="text-xs text-slate-400">Academic Standing</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Certifications & Credentials Wall */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Credentials
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              Professional Certifications
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 apple-glass px-3 py-1 rounded-xl">
            {CERTIFICATIONS.length} accredited credentials
          </span>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              onClick={() => soundManager.playPop()}
              className="apple-glass shimmer-border p-5 rounded-2xl hover:border-accent-violet/50 transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer card-3d"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-accent-violet/15 text-accent-teal border border-accent-violet/25">
                    {cert.issuer}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                </div>
                <h3 className="text-sm font-bold font-sans text-white group-hover:text-accent-teal transition-colors">
                  {cert.title}
                </h3>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Core Skills
                </div>
                <div className="flex flex-wrap gap-1">
                  {cert.skillsLearned.map((s) => (
                    <span
                      key={s}
                      className="px-1.5 py-0.5 rounded-md glass-subtle text-[10px] font-mono text-slate-400 border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
