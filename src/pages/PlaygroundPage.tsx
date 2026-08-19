import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  Cpu, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Bot, 
  ArrowRight, 
  Copy, 
  Check, 
  Terminal,
  Zap
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  query: string;
  system: 'AceAI RAG' | 'ACE-ETL Pipeline' | 'Proctor Point Vision';
  steps: {
    node: string;
    description: string;
    latency: string;
    details: string;
  }[];
  output: string;
  evalScores: {
    faithfulness: number;
    relevancy: number;
    hallucinationRisk: string;
  };
}

export const PlaygroundPage: React.FC = () => {
  const scenarios: Scenario[] = [
    {
      id: 'rag-query',
      title: 'Enterprise Document RAG & Compliance Analysis',
      system: 'AceAI RAG',
      query: 'Extract clauses on data residency from Enterprise_SaaS_Contract_v4.pdf and check compliance with EU GDPR Article 44.',
      steps: [
        {
          node: '1. Ingestion & Embedding',
          description: 'Vectorizing query & querying Weaviate vector DB with hybrid alpha=0.75 (dense + sparse BM25)',
          latency: '28ms',
          details: 'Retrieved 8 chunks from index `EnterpriseDocs_Prod` (Cosine Similarity: 0.892)'
        },
        {
          node: '2. Cross-Encoder Re-Ranking',
          description: 'Applying Cohere cross-encoder reranker to prune irrelevant context snippets',
          latency: '45ms',
          details: 'Top 3 chunks selected; Context token length: 1,420 tokens'
        },
        {
          node: '3. LangGraph Agent Supervisor',
          description: 'State graph evaluates intent and selects MCP compliance tool',
          latency: '62ms',
          details: 'Dispatched to `mcp_server:validate_gdpr_compliance` tool'
        },
        {
          node: '4. Contextual LLM Generation',
          description: 'Azure OpenAI GPT-4o generates structured analysis with citation grounding',
          latency: '340ms',
          details: 'Generated 248 tokens with streaming output verification'
        },
        {
          node: '5. DeepEval Automated Scoring',
          description: 'Measuring faithfulness and context relevancy against source chunks',
          latency: '85ms',
          details: 'Faithfulness: 0.96 | Relevancy: 0.94 | Status: VERIFIED'
        }
      ],
      output: `### Compliance Evaluation Summary:
**Contract:** Enterprise_SaaS_Contract_v4.pdf
**Target Regulation:** EU GDPR Article 44 (Transfers of personal data to third countries)

- **Section 14.2 (Data Localization):** The contract guarantees customer data resides exclusively within EU-West (Frankfurt) datacenters.
- **Section 14.5 (Sub-processors):** Prior written authorization is required before sub-processors outside the EEA can access customer records.
- **Verification Result:** Fully compliant with Article 44 standard contractual clauses (SCCs).`,
      evalScores: {
        faithfulness: 0.96,
        relevancy: 0.94,
        hallucinationRisk: 'Low (< 1.5%)'
      }
    },
    {
      id: 'etl-flow',
      title: 'Dynamic Multi-Source ETL & LLM DBT SQL Synthesis',
      system: 'ACE-ETL Pipeline',
      query: 'Ingest daily transactions from AWS S3, synthesize DBT SQL transformations for customer lifetime value, and materialize in PostgreSQL.',
      steps: [
        {
          node: '1. Source Router Trigger',
          description: 'Prefect orchestrator detects new S3 parquet batch `s3://data-lake/2026-08-19/txns.parquet`',
          latency: '15ms',
          details: 'Partition size: 450MB (1.2M rows); Route: Custom S3 SDK worker'
        },
        {
          node: '2. Schema Introspection',
          description: 'Extracting source column metadata and nullability constraints',
          latency: '32ms',
          details: '18 columns mapped; Data types validated against schema registry'
        },
        {
          node: '3. LLM DBT SQL Generation',
          description: 'Generating optimized DBT SQL model with window functions and aggregation logic',
          latency: '410ms',
          details: 'Synthesized `models/marts/fct_customer_ltv.sql` with CTEs'
        },
        {
          node: '4. Dry-Run Compilation & Test',
          description: 'Executing DBT dry-run compile and assertion tests on staging schema',
          latency: '110ms',
          details: '0 errors; All unique & not-null constraints passed'
        },
        {
          node: '5. Warehouse Materialization',
          description: 'Incremental merge into PostgreSQL production data mart',
          latency: '820ms',
          details: '1.2M rows merged in 820ms; Prefect DAG marked SUCCESS'
        }
      ],
      output: `/* Auto-generated DBT model by ACE-ETL pipeline */
WITH daily_txns AS (
    SELECT 
        customer_id,
        DATE_TRUNC('day', transaction_timestamp) AS txn_date,
        SUM(amount_usd) AS daily_revenue,
        COUNT(DISTINCT transaction_id) AS txn_count
    FROM {{ ref('stg_s3_raw_transactions') }}
    GROUP BY 1, 2
)
SELECT 
    customer_id,
    SUM(daily_revenue) AS lifetime_value,
    SUM(txn_count) AS total_orders,
    MAX(txn_date) AS last_purchase_date
FROM daily_txns
GROUP BY 1;`,
      evalScores: {
        faithfulness: 0.98,
        relevancy: 0.95,
        hallucinationRisk: 'None (Syntax Verified)'
      }
    }
  ];

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepProgress, setCurrentStepProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const scenario = scenarios[selectedScenarioIndex];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setCurrentStepProgress(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setCurrentStepProgress(step);
      if (step >= scenario.steps.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 650);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(scenario.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-xs font-mono text-accent-teal">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Agent & Pipeline Simulation
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          AI & RAG <span className="text-gradient-violet-cyan">Architecture Playground</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Experience how Karankumar's production pipelines execute step-by-step: from vector ingestion and hybrid retrieval to LangGraph agent routing, MCP tool dispatch, and DeepEval evaluation.
        </p>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioIndex(idx);
                setCurrentStepProgress(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedScenarioIndex === idx
                  ? 'bg-accent-violet text-white font-semibold shadow-md shadow-accent-violet/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 border border-white/10'
              }`}
            >
              {sc.system}: {sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Execution Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Query & Execution Graph */}
        <div className="lg:col-span-7 space-y-6">
          {/* Query Box */}
          <div className="glow-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> Input Trigger / Prompt
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-accent-violet/20 text-accent-teal border border-accent-violet/30">
                {scenario.system}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg-darker/90 border border-white/10 font-mono text-xs text-slate-200 leading-relaxed">
              "{scenario.query}"
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-xs font-mono flex items-center gap-2 shadow-lg shadow-accent-violet/30 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>Executing LangGraph State...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Execute Graph Pipeline</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentStepProgress(0)}
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Reset Execution State"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Node-by-Node Execution Steps */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-accent-teal" /> Pipeline Nodes & Latency Breakdown
            </h2>

            <div className="space-y-2.5">
              {scenario.steps.map((step, idx) => {
                const isCompleted = currentStepProgress > idx;
                const isCurrent = currentStepProgress === idx && isRunning;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      isCompleted
                        ? 'bg-accent-violet/10 border-accent-violet/40 text-white'
                        : isCurrent
                        ? 'bg-accent-cyan/10 border-accent-cyan/60 animate-pulse text-white'
                        : 'bg-bg-card border-white/5 opacity-50 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500">
                            {idx + 1}
                          </span>
                        )}
                        <span>{step.node}</span>
                      </div>
                      <span className="text-[11px] font-mono text-accent-amber">
                        {step.latency}
                      </span>
                    </div>

                    <p className="text-xs mt-1 text-slate-300 font-sans pl-6">
                      {step.description}
                    </p>

                    {isCompleted && (
                      <div className="mt-2 text-[11px] font-mono text-accent-teal bg-bg-darker/70 p-2 rounded-lg ml-6 border border-white/5">
                        ↳ {step.details}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Output & Evaluation Telemetry */}
        <div className="lg:col-span-5 space-y-6">
          {/* Evaluation Scoreboard */}
          <div className="glow-card rounded-2xl p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" /> DeepEval Quality Benchmarks
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-bg-darker/80 border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400">Faithfulness Score</div>
                <div className="text-xl font-bold font-mono text-emerald-400">
                  {scenario.evalScores.faithfulness * 100}%
                </div>
                <div className="text-[10px] text-slate-500">Grounding against retrieved text</div>
              </div>

              <div className="p-3 rounded-xl bg-bg-darker/80 border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400">Answer Relevancy</div>
                <div className="text-xl font-bold font-mono text-accent-teal">
                  {scenario.evalScores.relevancy * 100}%
                </div>
                <div className="text-[10px] text-slate-500">Semantic alignment to prompt</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-bg-darker/80 border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Hallucination Risk:</span>
              <span className="text-accent-amber font-semibold">{scenario.evalScores.hallucinationRisk}</span>
            </div>
          </div>

          {/* Synthesized Output Display */}
          <div className="glow-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-accent-teal font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-accent-amber" /> Real-time Synthesized Output
              </h2>
              <button
                onClick={handleCopyOutput}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-bg-darker/95 border border-white/10 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-80 overflow-y-auto">
              {scenario.output}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
