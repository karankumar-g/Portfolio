import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Database, 
  Cloud, 
  Workflow, 
  Layers, 
  Eye, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  GitBranch
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface SystemDemo {
  id: string;
  title: string;
  category: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  accentGradient: string;
  problemSolved: string;
  architectureNodes: {
    label: string;
    sublabel: string;
    type: 'input' | 'process' | 'storage' | 'output';
  }[];
  stack: string[];
  linkId: string;
}

const SYSTEMS_DATA: SystemDemo[] = [
  {
    id: 'rag-ai',
    title: 'AceAI: RAG & LangGraph Agents',
    category: 'AI & Document Search',
    badge: 'Production AI',
    icon: Bot,
    accentColor: '#8B5CF6',
    accentGradient: 'from-violet-500 to-indigo-600',
    problemSolved: 'Transforms enterprise PDF manuals and policies into high-precision natural language answers with source citations.',
    architectureNodes: [
      { label: 'User Query', sublabel: 'Natural Language', type: 'input' },
      { label: 'Weaviate DB', sublabel: 'Hybrid Vector Search', type: 'storage' },
      { label: 'LangGraph Agent', sublabel: 'State Routing & MCP', type: 'process' },
      { label: 'Streamed Answer', sublabel: 'Cited Response', type: 'output' },
    ],
    stack: ['LangGraph', 'Django', 'Weaviate', 'MCP', 'React', 'Azure OpenAI'],
    linkId: 'ace-ai'
  },
  {
    id: 'salesforce-crm',
    title: 'Salesforce & WhatsApp Automation',
    category: 'CRM & Enterprise Integration',
    badge: 'Sales Automation',
    icon: Cloud,
    accentColor: '#0EA5E9',
    accentGradient: 'from-sky-500 to-blue-600',
    problemSolved: 'Automates customer messaging and lead capture by connecting WhatsApp Business API directly with Salesforce CRM.',
    architectureNodes: [
      { label: 'WhatsApp Chat', sublabel: 'Customer Inbound', type: 'input' },
      { label: 'Django Webhook', sublabel: 'Payload Validator', type: 'process' },
      { label: 'Salesforce REST', sublabel: 'Lead & Contact Sync', type: 'storage' },
      { label: 'Auto Follow-Up', sublabel: 'Instant Response', type: 'output' },
    ],
    stack: ['Salesforce', 'WhatsApp Cloud API', 'Django', 'Python', 'PostgreSQL'],
    linkId: 'sales-automation'
  },
  {
    id: 'cloud-data',
    title: 'ACE-ETL: Cloud Data & DBT',
    category: 'Data Engineering & Pipelines',
    badge: 'Automated Pipelines',
    icon: Workflow,
    accentColor: '#10B981',
    accentGradient: 'from-emerald-500 to-teal-600',
    problemSolved: 'Ingests multi-source data batches from AWS S3 and Azure Blob, executing automated DBT transformations on schedule.',
    architectureNodes: [
      { label: 'AWS / Azure SDK', sublabel: 'Batch Extractor', type: 'input' },
      { label: 'PostgreSQL Staging', sublabel: 'Raw Partitions', type: 'storage' },
      { label: 'DBT SQL Models', sublabel: 'Schema Modeling', type: 'process' },
      { label: 'Prefect DAGs', sublabel: 'Scheduled Execution', type: 'output' },
    ],
    stack: ['DBT', 'Prefect', 'Azure Blob', 'AWS S3', 'Python', 'PostgreSQL'],
    linkId: 'ace-etl'
  },
  {
    id: 'pharma-analytics',
    title: 'Pharma Analytics & Decision Dashboards',
    category: 'Healthcare Data Prep',
    badge: 'Pharma BI',
    icon: Database,
    accentColor: '#06B6D4',
    accentGradient: 'from-cyan-500 to-teal-600',
    problemSolved: 'Cleanses and transforms complex pharmaceutical data into intuitive dashboards for HCP prescribing and patient journeys.',
    architectureNodes: [
      { label: 'Pharma Feeds', sublabel: 'Prescription Records', type: 'input' },
      { label: 'Data Cleaning', sublabel: 'Anonymization & SQL', type: 'process' },
      { label: 'Analytical Marts', sublabel: 'HCP & Patient Cohorts', type: 'storage' },
      { label: 'React / Tableau', sublabel: 'Interactive Visuals', type: 'output' },
    ],
    stack: ['Python', 'SQL', 'DBT', 'Prefect', 'PostgreSQL', 'React', 'Tableau'],
    linkId: 'pharma-analytics'
  },
  {
    id: 'vision-ai',
    title: 'Proctor Point: Computer Vision AI',
    category: 'Security & Assessment',
    badge: 'Computer Vision',
    icon: Eye,
    accentColor: '#F59E0B',
    accentGradient: 'from-amber-500 to-rose-600',
    problemSolved: 'Monitors online examinations in real time with YOLOv8 object detection and facial verification to prevent unauthorized activities.',
    architectureNodes: [
      { label: 'Webcam Stream', sublabel: '30 FPS Frame Sampler', type: 'input' },
      { label: 'YOLOv8 & OpenCV', sublabel: 'Device & Pose Detection', type: 'process' },
      { label: 'FaceNet Match', sublabel: 'Biometric Verification', type: 'storage' },
      { label: 'WebSocket Alert', sublabel: 'Live Proctor Flag', type: 'output' },
    ],
    stack: ['YOLOv8', 'OpenCV', 'Django Channels', 'WebSockets', 'React', 'PyTorch'],
    linkId: 'proctor-point'
  }
];

export const SystemsPreviewCanvas: React.FC = () => {
  const [activeSystemId, setActiveSystemId] = useState<string>('rag-ai');

  const activeSystem = SYSTEMS_DATA.find(s => s.id === activeSystemId) || SYSTEMS_DATA[0];
  const IconComponent = activeSystem.icon;

  return (
    <div className="w-full rounded-3xl apple-glass shimmer-border p-5 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Top Bar / Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
            Architecture in Action
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Click tabs to inspect system flow
        </span>
      </div>

      {/* Tab Navigation Strip */}
      <div className="flex flex-wrap gap-2">
        {SYSTEMS_DATA.map((sys) => {
          const TabIcon = sys.icon;
          const isActive = sys.id === activeSystemId;

          return (
            <button
              key={sys.id}
              onClick={() => {
                soundManager.playPop();
                setActiveSystemId(sys.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-semibold shadow-lg shadow-accent-violet/25 scale-[1.02]'
                  : 'glass-subtle text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{sys.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Active System Details Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSystem.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          {/* Header Info */}
          <div className="p-4 rounded-2xl glass-subtle space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                  style={{ backgroundColor: activeSystem.accentColor }}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-display text-white">
                    {activeSystem.title}
                  </h3>
                  <div className="text-[11px] font-mono text-accent-teal">
                    {activeSystem.category}
                  </div>
                </div>
              </div>

              <NavLink
                to={`/projects#${activeSystem.linkId}`}
                onClick={() => soundManager.playPop()}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-accent-teal hover:text-white transition-colors"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
              {activeSystem.problemSolved}
            </p>
          </div>

          {/* Interactive Architecture Flow Nodes */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
              <GitBranch className="w-3 h-3 text-accent-cyan" /> Execution Pipeline
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {activeSystem.architectureNodes.map((node, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl apple-glass border-white/10 hover:border-white/20 transition-all space-y-1 relative group card-3d"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Node 0{idx + 1}</span>
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: activeSystem.accentColor }}
                    />
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    {node.label}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {node.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="flex flex-wrap gap-1.5">
              {activeSystem.stack.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-lg glass-subtle text-[10px] font-mono text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <NavLink
              to={`/projects#${activeSystem.linkId}`}
              onClick={() => soundManager.playPop()}
              className="sm:hidden inline-flex items-center gap-1 text-xs font-mono text-accent-teal"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
