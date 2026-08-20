import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Database, 
  Layers, 
  Zap, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  ArrowRight,
  Code2,
  Server,
  Workflow,
  ShieldCheck
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { soundManager } from '../utils/soundEffects';

interface PipelineScenario {
  id: string;
  label: string;
  category: string;
  input: string;
  steps: {
    name: string;
    node: string;
    description: string;
    status: string;
    timeMs: number;
  }[];
  output: string;
  metrics: {
    latency: string;
    accuracy: string;
    stack: string;
  };
}

const SCENARIOS: PipelineScenario[] = [
  {
    id: 'rag-agent',
    label: 'Ace_AI RAG Engine',
    category: 'Agentic Workflow',
    input: 'Query complex enterprise policy & generate synthesized response',
    steps: [
      { name: 'Query Parser', node: 'FastAPI Router', description: 'Semantic chunking & intent extraction', status: 'done', timeMs: 24 },
      { name: 'Hybrid Retrieval', node: 'ChromaDB / Pinecone', description: 'Dense vector search + BM25 keyword rerank', status: 'done', timeMs: 48 },
      { name: 'Agent Decision', node: 'LangGraph StateGraph', description: 'Context evaluation & dynamic tool selection', status: 'done', timeMs: 62 },
      { name: 'Synthesized Stream', node: 'LLM Orchestrator', description: 'Deterministic citation & token streaming', status: 'done', timeMs: 38 },
    ],
    output: 'Synthesized 4 verified policy clauses with 100% citation grounding.',
    metrics: { latency: '172ms', accuracy: '99.8%', stack: 'LangGraph • Django • ChromaDB' }
  },
  {
    id: 'etl-engine',
    label: 'Ace_ETL Pipeline',
    category: 'Data Engineering',
    input: 'Ingest 50k unstructured records & auto-map schema',
    steps: [
      { name: 'Data Ingestion', node: 'Celery + Redis Worker', description: 'Concurrent batch streaming & decompression', status: 'done', timeMs: 35 },
      { name: 'Schema Inference', node: 'Pydantic Validator', description: 'Auto-detect types & missing field anomalies', status: 'done', timeMs: 29 },
      { name: 'Transformation', node: 'Python Polars Engine', description: 'Vectorized normalization & duplicate cleanup', status: 'done', timeMs: 54 },
      { name: 'DB Ingestion', node: 'PostgreSQL Relational', description: 'ACID transaction commit with indexing', status: 'done', timeMs: 42 },
    ],
    output: 'Successfully cleaned & ingested 50,000 records with zero data drift.',
    metrics: { latency: '160ms', accuracy: '100% ACID', stack: 'Celery • Redis • PostgreSQL' }
  },
  {
    id: 'crm-bot',
    label: 'Salesforce Agentforce',
    category: 'Enterprise CRM',
    input: 'Customer support ticket auto-triage & CRM status update',
    steps: [
      { name: 'Webhook Event', node: 'Apex REST Endpoint', description: 'Incoming customer event capture & verify', status: 'done', timeMs: 18 },
      { name: 'Agent Resolution', node: 'Agentforce Engine', description: 'Intent classification & policy validation', status: 'done', timeMs: 44 },
      { name: 'OmniStudio Action', node: 'Integration Procedure', description: 'Execute CRM field patch & trigger notification', status: 'done', timeMs: 36 },
      { name: 'Audit Log', node: 'Salesforce Platform Event', description: 'Telemetry logged for compliance tracking', status: 'done', timeMs: 22 },
    ],
    output: 'Ticket routed to tier-2 with pre-filled diagnosis in under 120ms.',
    metrics: { latency: '120ms', accuracy: 'Automated', stack: 'Salesforce • Apex • OmniStudio' }
  }
];

export const InteractiveEngineeringHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'stack' | 'impact'>('pipeline');
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(3); // default completed view

  const currentScenario = SCENARIOS[selectedScenarioIndex];

  const handleTriggerSimulation = (index: number) => {
    soundManager.playPop();
    setSelectedScenarioIndex(index);
    setIsSimulating(true);
    setActiveStepIndex(0);

    // Step by step animation
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStepIndex(step);
      if (step >= SCENARIOS[index].steps.length) {
        clearInterval(interval);
        setIsSimulating(false);
        soundManager.playSuccess();
      }
    }, 280);
  };

  return (
    <div className="apple-glass shimmer-border rounded-3xl p-5 sm:p-6 w-full max-w-xl mx-auto shadow-2xl flex flex-col justify-between space-y-5">
      {/* Top Header Strip with Mode Switcher */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Live Engineering Console
          </span>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center p-1 bg-white/[0.04] rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('pipeline');
            }}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === 'pipeline'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Architecture
          </button>
          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('stack');
            }}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === 'stack'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🛠️ Core Stack
          </button>
          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('impact');
            }}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === 'impact'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Impact
          </button>
        </div>
      </div>

      {/* Main Tab Content Display */}
      <div className="min-h-[290px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* TAB 1: INTERACTIVE ARCHITECTURE SIMULATOR */}
          {activeTab === 'pipeline' && (
            <motion.div
              key="pipeline-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Scenario Switcher Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {SCENARIOS.map((scenario, idx) => (
                  <button
                    key={scenario.id}
                    onClick={() => handleTriggerSimulation(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer ${
                      selectedScenarioIndex === idx
                        ? 'bg-blue-500/20 text-accent-sky border border-blue-500/40 font-semibold'
                        : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/5'
                    }`}
                  >
                    <Zap className={`w-3.5 h-3.5 ${selectedScenarioIndex === idx ? 'text-accent-sky' : 'text-slate-500'}`} />
                    <span>{scenario.label}</span>
                  </button>
                ))}
              </div>

              {/* Execution Flow Pipeline Nodes */}
              <div className="space-y-2 py-1">
                {currentScenario.steps.map((step, idx) => {
                  const isDone = activeStepIndex >= idx;
                  const isCurrent = isSimulating && activeStepIndex === idx;

                  return (
                    <div
                      key={step.name}
                      className={`p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                        isCurrent
                          ? 'bg-blue-600/20 border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-[1.01]'
                          : isDone
                          ? 'glass-subtle border-white/10 text-slate-200'
                          : 'bg-white/[0.02] border-white/5 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold ${
                            isCurrent
                              ? 'bg-blue-500 text-white animate-pulse'
                              : isDone
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-white/5 text-slate-500'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            <span>{step.name}</span>
                            <span className="text-[10px] font-mono text-accent-sky px-1.5 py-0.2 rounded bg-blue-500/10">
                              {step.node}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">{step.description}</div>
                        </div>
                      </div>

                      <div className="font-mono text-[10px] text-slate-400">
                        {isDone ? `${step.timeMs}ms` : 'pending'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Metric Ribbon */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-[11px] font-mono">
                <div className="p-2 rounded-xl glass-subtle text-center">
                  <span className="text-slate-400 block text-[9px]">TOTAL LATENCY</span>
                  <span className="font-bold text-emerald-400">{currentScenario.metrics.latency}</span>
                </div>
                <div className="p-2 rounded-xl glass-subtle text-center">
                  <span className="text-slate-400 block text-[9px]">RELIABILITY</span>
                  <span className="font-bold text-accent-sky">{currentScenario.metrics.accuracy}</span>
                </div>
                <div className="p-2 rounded-xl glass-subtle text-center">
                  <span className="text-slate-400 block text-[9px]">STACK</span>
                  <span className="font-semibold text-slate-300 truncate block">{currentScenario.metrics.stack}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PRODUCTION TECH STACK */}
          {activeTab === 'stack' && (
            <motion.div
              key="stack-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 py-1"
            >
              {/* Category 1: AI & Agents */}
              <div className="p-3 rounded-2xl glass-subtle space-y-2 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-accent-sky font-semibold">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI & Agentic Systems</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['LangGraph', 'RAG Pipelines', 'ChromaDB', 'Vector Embeddings', 'Ollama', 'LlamaIndex'].map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-slate-200 text-xs font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 2: Backend & Distributed Data */}
              <div className="p-3 rounded-2xl glass-subtle space-y-2 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                  <Server className="w-3.5 h-3.5" />
                  <span>Backend, Data & Cloud</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Python (Django/FastAPI)', 'PostgreSQL', 'Redis', 'Celery Workers', 'Docker', 'REST APIs'].map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-slate-200 text-xs font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 3: Frontend & Enterprise CRM */}
              <div className="p-3 rounded-2xl glass-subtle space-y-2 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-accent-teal font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Frontend & Salesforce CRM</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['React & TypeScript', 'Tailwind CSS', 'Salesforce Agentforce', 'Apex', 'OmniStudio'].map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-lg bg-teal-500/15 border border-teal-500/30 text-slate-200 text-xs font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: PRODUCTION IMPACT & ACHIEVEMENTS */}
          {activeTab === 'impact' && (
            <motion.div
              key="impact-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5 py-1"
            >
              <div className="p-3 rounded-2xl glass-subtle border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-accent-sky flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  01
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display">Ace_ETL Automated Engine</div>
                  <div className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                    Engineered automated data ingestion with dynamic schema inference, processing tens of thousands of records reliably.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl glass-subtle border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  02
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display">Enterprise RAG & Conversational AI</div>
                  <div className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                    Architected high-accuracy document intelligence pipelines with sub-200ms latency and LangGraph deterministic routing.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl glass-subtle border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-accent-amber flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  03
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display">MCA Distinction @ DG Vaishnav College</div>
                  <div className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                    Graduated May 2025 with 8.42 CGPA Distinction, building foundational depth in data structures, algorithms, and distributed systems.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer Status & Direct Action */}
      <div className="p-3.5 rounded-2xl glass-subtle flex items-center justify-between gap-3 border border-white/10 pt-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300">
            Open to Full-Stack & AI Roles
          </span>
        </div>

        <NavLink
          to="/playground"
          onClick={() => soundManager.playPop()}
          className="text-xs font-mono font-semibold text-accent-sky hover:text-white flex items-center gap-1.5 group cursor-pointer transition-colors"
        >
          <span>Run Interactive Terminal</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </NavLink>
      </div>
    </div>
  );
};
