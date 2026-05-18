'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, AlertTriangle, Layers, Cpu, ShieldCheck, DollarSign, Database } from 'lucide-react';
import { LLM_OPS_METRICS } from '@/lib/data';

export default function AIOpsPage() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-blue tracking-wider uppercase">
            <Bot className="h-3.5 w-3.5" />
            <span>LLMOps & RAG Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            AI Operations Console
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Real-time model latency, PGVector retrieval performance, token cost budgets, and evaluation metrics.</p>
        </div>
      </div>

      {/* Live AI Metrics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-accent-purple">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Total Monthly Token Spend</div>
          <div className="text-2xl font-bold text-white mt-1.5">$842.15</div>
          <div className="text-[9px] text-zinc-500 mt-1">Budget threshold: $1,500.00 max</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-accent-blue">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Average Inference Latency</div>
          <div className="text-2xl font-bold text-white mt-1.5">1.25 seconds</div>
          <div className="text-[9px] text-emerald-400 mt-1">p95 target &lt; 1.5s active</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-amber-500">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Hallucination Rate</div>
          <div className="text-2xl font-bold text-amber-400 mt-1.5">0.24%</div>
          <div className="text-[9px] text-emerald-400 mt-1">Target limit &lt; 0.5% ok</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-500">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Langfuse Tracing Coverage</div>
          <div className="text-2xl font-bold text-white mt-1.5">100%</div>
          <div className="text-[9px] text-zinc-500 mt-1">Full prompt engineering logs active</div>
        </div>
      </div>

      {/* RAG Pipeline Flow */}
      <motion.div
        variants={itemVariants}
        className="glass-panel p-6 rounded-xl"
      >
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
          <Layers className="h-4.5 w-4.5 text-accent-blue" />
          RAG Retrieval & Evaluation Pipeline Flow
        </h3>

        {/* Animated flow chart using CSS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs select-none">
          <div className="p-3.5 rounded-lg bg-white/[0.01] border border-white/5 space-y-1 relative">
            <div className="text-[9px] font-bold text-accent-blue uppercase">Step 1</div>
            <div className="text-white font-bold">User Intent Input</div>
            <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">Prompt sanitized. PII filtered automatically via custom firewall guards.</p>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.01] border border-white/5 space-y-1 relative">
            <div className="text-[9px] font-bold text-accent-purple uppercase">Step 2</div>
            <div className="text-white font-bold">PGVector Retrieval</div>
            <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">Hybrid sparse/dense vector search inside local database indexes.</p>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.01] border border-white/5 space-y-1 relative">
            <div className="text-[9px] font-bold text-accent-blue uppercase">Step 3</div>
            <div className="text-white font-bold">Context Assembly</div>
            <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">Inject retrieved documents into target prompt template bounds.</p>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.01] border border-white/5 space-y-1 relative">
            <div className="text-[9px] font-bold text-accent-purple uppercase">Step 4</div>
            <div className="text-white font-bold">LLM Execution</div>
            <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">Route to GPT-4o, fallback automatically to Claude 3.5 Sonnet.</p>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.01] border border-white/5 space-y-1 relative">
            <div className="text-[9px] font-bold text-emerald-400 uppercase">Step 5</div>
            <div className="text-white font-bold">Langfuse Evaluator</div>
            <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">Validate Groundedness, Faithfulness, and Relevancy in real time.</p>
          </div>
        </div>
      </motion.div>

      {/* Model Observability details table */}
      <motion.div
        variants={itemVariants}
        className="glass-panel p-6 rounded-xl"
      >
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Database className="h-4.5 w-4.5 text-accent-blue" />
          LLMOps Observability Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 font-semibold">
                <th className="pb-3">Model Feature</th>
                <th className="pb-3 text-center">Avg Cost / Call</th>
                <th className="pb-3 text-center">Avg Latency</th>
                <th className="pb-3 text-center">Faithfulness</th>
                <th className="pb-3 text-center">Context Relevancy</th>
                <th className="pb-3 text-right">Monthly Requests</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {LLM_OPS_METRICS.map((row) => (
                <tr key={row.feature} className="hover:bg-white/[0.01]">
                  <td className="py-4 font-bold text-white flex items-center gap-2">
                    <Cpu className="h-3.5 w-3.5 text-accent-blue" />
                    {row.feature}
                  </td>
                  <td className="py-4 text-center font-mono font-semibold text-emerald-400">${row.cost.toFixed(3)}</td>
                  <td className="py-4 text-center font-mono">{row.latency}</td>
                  <td className="py-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                      {(row.faithfulness * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-mono font-bold text-[10px]">
                      {(row.relevancy * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="py-4 text-right font-mono font-bold">{row.usage.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Guidelines alert */}
      <div className="glass-panel p-4 rounded-xl flex gap-3">
        <ShieldCheck className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-normal">
          <span className="font-bold text-white">LLMOps Governance Directive:</span> Any model evaluation prompt template alteration MUST be registered in our Notion ADR library before prod ingestion. Tracing logs are stored inside PostgreSQL PGVector collections with continuous 30-day compliance audits.
        </div>
      </div>
    </motion.div>
  );
}
