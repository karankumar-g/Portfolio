import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Code, Copy, Check, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

type Tab = 'bash' | 'agent.py' | 'rag_pipeline.py' | 'mcp_server.py';

export const TerminalSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('bash');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; isUser?: boolean; isError?: boolean; isJson?: boolean }>>([
    { text: `System initialized: Python 3.11.8 • LangGraph 0.2.14 • MCP 1.2.0 • Weaviate v4` },
    { text: `Type 'help' or click suggestions below to inspect Karankumar's engineering stack.` },
  ]);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const pythonCodeAgent = `# agent.py — LangGraph Multi-Agent Routing Graph
from typing import TypedDict, Annotated, Sequence
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage
import weaviate

class AgentState(TypedDict):
    query: str
    tenant_id: str
    context_docs: list[dict]
    tool_calls: list[str]
    final_output: str
    eval_score: float

# Initialize StateGraph
builder = StateGraph(AgentState)

@builder.node("retriever")
def retrieve_semantic_context(state: AgentState):
    client = weaviate.connect_to_custom(...)
    docs = client.collections.get("EnterpriseDocs").query.hybrid(
        query=state["query"],
        alpha=0.75, # Dense + Sparse BM25
        limit=5
    )
    return {"context_docs": [d.properties for d in docs]}

@builder.node("mcp_tools")
def execute_mcp_actions(state: AgentState):
    # Model Context Protocol Tool Dispatcher
    return {"tool_calls": ["db_query_success", "cache_hit"]}

builder.set_entry_point("retriever")
builder.add_edge("retriever", "mcp_tools")
builder.add_edge("mcp_tools", END)
graph = builder.compile()`;

  const pythonCodeRAG = `# rag_pipeline.py — Hybrid Ingestion & MLflow Evaluation
from deepeval.metrics import FaithfulnessMetric, AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase
import mlflow

def evaluate_and_log(query: str, retrieved_context: list[str], answer: str):
    test_case = LLMTestCase(
        input=query,
        actual_output=answer,
        retrieval_context=retrieved_context
    )
    faithfulness = FaithfulnessMetric(threshold=0.85)
    relevancy = AnswerRelevancyMetric(threshold=0.85)
    
    faithfulness.measure(test_case)
    relevancy.measure(test_case)

    # Log to MLflow experiment registry
    with mlflow.start_run(run_name="rag_eval_run"):
        mlflow.log_metric("faithfulness_score", faithfulness.score)
        mlflow.log_metric("relevancy_score", relevancy.score)
        mlflow.log_param("retrieval_chunks", len(retrieved_context))
    
    return {"passed": faithfulness.is_successful(), "score": faithfulness.score}`;

  const pythonCodeMCP = `# mcp_server.py — Model Context Protocol Enterprise Tool Provider
from mcp.server.fastmcp import FastMCP
import psycopg2

mcp = FastMCP("DataAces-Core-Tools")

@mcp.tool()
def execute_safe_sql_query(query: str, dialect: str = "postgres") -> dict:
    """Executes read-only parameterized query against enterprise warehouse."""
    if any(keyword in query.upper() for keyword in ["DROP", "DELETE", "TRUNCATE"]):
        return {"error": "Write operations blocked by security guardrails"}
    
    # Real-time execution via connection pool
    return {"status": "SUCCESS", "rows_returned": 42, "execution_ms": 12.4}

@mcp.tool()
def trigger_prefect_etl_flow(flow_name: str, parameters: dict) -> str:
    """Dispatches asynchronous Prefect DAG execution."""
    return f"Triggered Prefect flow {flow_name} with ID prf-8921-prod"`;

  const runCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    const newHistory = [...history, { text: `$ ${cmdStr}`, isUser: true }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          text: `Available commands:
  • projects     — Explore AceAI, Sales Automation, Pharma Analytics, Proctor Point
  • skills       — List categorized languages, AI/ML tools, Salesforce & databases
  • experience   — View current role at Data Aces & backend deliverables
  • status       — Check real-time agent system health & latency
  • eval         — Run simulated evaluation benchmark
  • contact      — Show email, phone & direct links
  • clear        — Clear terminal output`
        });
        break;
      case 'projects':
        newHistory.push({
          text: `[1] AceAI (Django + LLMs + React + LangGraph + MCP + Weaviate)
[2] Sales Automation (Salesforce CRM + WhatsApp Business API + Django)
[3] Pharma Data Prep & Analytics (DBT + Prefect + SQL + Tableau + React)
[4] Proctor Point (Django + React + YOLOv8 + Face Recognition)`
        });
        break;
      case 'skills':
        newHistory.push({
          text: `• AI & Agents : LangGraph, RAG, MCP, MLflow, Fine-Tuning
• Languages   : Python (Async/FastAPI/Django), TypeScript, JavaScript, SQL
• CRM & Sales : Salesforce CRM, WhatsApp Business API, Agentforce
• Databases   : PostgreSQL, Weaviate, Redis, MongoDB, Cassandra
• Cloud/Ops   : AWS (S3, Bedrock), Azure, Docker, Prefect, DBT, Playwright`
        });
        break;
      case 'experience':
        newHistory.push({
          text: `🏢 Software Engineer @ Data Aces (05/2025 – Present)
• Building scalable RAG platforms with Weaviate dense/sparse hybrid indexing
• Designing multi-turn LangGraph agentic workflows with MCP tool orchestration
• Integrating Salesforce CRM with WhatsApp for real-time sales communication
• Engineering pharma data preparation pipelines for HCP & patient analytics`
        });
        break;
      case 'status':
        newHistory.push({
          text: `🟢 SYSTEM STATUS: ONLINE
  ├─ LangGraph Supervisor : ACTIVE (State: IDLE)
  ├─ Weaviate Vector DB  : CONNECTED (Latency: 14ms)
  ├─ MCP Tool Provider   : READY (Tools: 8 registered)
  ├─ Average Inference   : 380ms
  └─ Security Guardrails : ENFORCED`
        });
        break;
      case 'eval':
        newHistory.push({
          text: `🔬 Running Benchmark on 50 sample RAG queries...
  [✓] Faithfulness Score   : 0.94 / 1.00 (PASS)
  [✓] Answer Relevancy     : 0.92 / 1.00 (PASS)
  [✓] Hallucination Rate   : < 2.1% (LOW)
  [✓] MLflow Run Logged    : experiment_id=402-prod`
        });
        break;
      case 'contact':
        newHistory.push({
          text: `📧 Email   : ${PERSONAL_INFO.email}
📞 Phone   : ${PERSONAL_INFO.phone}
📍 Location: ${PERSONAL_INFO.location}
🔗 GitHub  : ${PERSONAL_INFO.github}
💼 LinkedIn: ${PERSONAL_INFO.linkedin}`
        });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case '':
        break;
      default:
        newHistory.push({
          text: `command not found: ${cmdStr}. Type 'help' to see available commands.`,
          isError: true
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(inputVal);
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const copyActiveCode = () => {
    let content = '';
    if (activeTab === 'agent.py') content = pythonCodeAgent;
    else if (activeTab === 'rag_pipeline.py') content = pythonCodeRAG;
    else if (activeTab === 'mcp_server.py') content = pythonCodeMCP;
    else content = history.map(h => h.text).join('\n');

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-bg-card/90 dark:bg-bg-card/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-xs transition-all duration-300 hover:border-accent-violet/40">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-bg-darker/90 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity" />
          <span className="ml-2 text-[11px] text-slate-400 font-medium hidden sm:inline-block">
            karankumar@dev-node-01: ~/production-agent
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('bash')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1.5 ${
              activeTab === 'bash'
                ? 'bg-accent-violet text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TerminalIcon className="w-3 h-3" />
            <span>bash</span>
          </button>
          <button
            onClick={() => setActiveTab('agent.py')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1.5 ${
              activeTab === 'agent.py'
                ? 'bg-accent-violet text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3 h-3 text-accent-cyan" />
            <span>agent.py</span>
          </button>
          <button
            onClick={() => setActiveTab('rag_pipeline.py')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1.5 ${
              activeTab === 'rag_pipeline.py'
                ? 'bg-accent-violet text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-accent-amber" />
            <span className="hidden sm:inline">rag_pipeline.py</span>
            <span className="sm:hidden">rag.py</span>
          </button>
          <button
            onClick={() => setActiveTab('mcp_server.py')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1.5 ${
              activeTab === 'mcp_server.py'
                ? 'bg-accent-violet text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-accent-teal" />
            <span className="hidden sm:inline">mcp_server.py</span>
            <span className="sm:hidden">mcp.py</span>
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyActiveCode}
          className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Copy Code / Output"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Live System Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-1.5 bg-accent-violet/[0.04] border-b border-white/5 text-[10px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LangGraph: <span className="text-emerald-300">Ready</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            Weaviate: <span className="text-accent-cyan">Connected (14ms)</span>
          </span>
          <span className="hidden md:flex items-center gap-1">
            <Activity className="w-3 h-3 text-accent-amber" />
            MLflow Registry: <span className="text-accent-amber">v2.18</span>
          </span>
        </div>
        <div className="text-slate-500 font-mono">
          Python 3.11.8 • React 18.3
        </div>
      </div>

      {/* Terminal / Code Body */}
      <div className="p-4 h-72 sm:h-80 overflow-y-auto bg-bg-dark/95 text-slate-300 space-y-2 select-text">
        {activeTab === 'bash' ? (
          <>
            {history.map((item, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-wrap leading-relaxed ${
                  item.isUser
                    ? 'text-accent-cyan font-semibold'
                    : item.isError
                    ? 'text-rose-400'
                    : 'text-slate-300'
                }`}
              >
                {item.text}
              </div>
            ))}
            
            {/* Interactive Input Prompt */}
            <div className="flex items-center gap-2 pt-1 text-accent-teal">
              <span className="text-accent-violet font-bold">➜</span>
              <span className="text-slate-400">~/stack $</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'projects', 'status', 'skills'..."
                className="flex-1 bg-transparent outline-none text-slate-100 placeholder:text-slate-600 font-mono text-xs"
                autoFocus={false}
              />
            </div>
            <div ref={terminalEndRef} />
          </>
        ) : (
          <pre className="text-slate-300 leading-relaxed font-mono overflow-x-auto text-[11px] sm:text-xs">
            <code>
              {activeTab === 'agent.py' && pythonCodeAgent}
              {activeTab === 'rag_pipeline.py' && pythonCodeRAG}
              {activeTab === 'mcp_server.py' && pythonCodeMCP}
            </code>
          </pre>
        )}
      </div>

      {/* Suggested Quick Commands for Bash */}
      {activeTab === 'bash' && (
        <div className="px-4 py-2 bg-bg-darker/90 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[10px]">
          <span className="text-slate-500 font-medium whitespace-nowrap">Quick triggers:</span>
          {['help', 'projects', 'skills', 'status', 'eval', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="px-2 py-0.5 rounded bg-white/[0.05] hover:bg-accent-violet/20 hover:text-accent-teal text-slate-400 border border-white/5 transition-all whitespace-nowrap cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
