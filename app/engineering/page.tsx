'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, GitBranch, Sparkles, Terminal, Activity, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DORA_METRICS, GIT_BRANCHING_RULES } from '@/lib/data';

export default function EngineeringPage() {
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
            <Code2 className="h-3.5 w-3.5" />
            <span>Development Operations Center</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            Engineering Systems
          </h1>
          <p className="text-xs text-zinc-500 mt-1">DORA metric analytics, Git release strategies, and automated CI/CD branch policies.</p>
        </div>
      </div>

      {/* DORA Metrics targets dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DORA_METRICS.map((metric) => (
          <motion.div
            key={metric.name}
            variants={itemVariants}
            className="glass-panel p-5 rounded-xl border-t-2 border-t-accent-blue relative overflow-hidden group hover:border-accent-blue/30 transition-all"
          >
            <div className="text-[10px] text-zinc-500 uppercase font-semibold">{metric.name}</div>
            <div className="text-2xl font-black text-white mt-1.5 tracking-tight">{metric.value}</div>
            <div className="text-[10px] text-zinc-400 mt-3 flex items-center gap-1">
              <span className="font-semibold text-accent-blue">Target:</span> {metric.target}
            </div>
            <span className="absolute top-4 right-4 text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider">
              {metric.status}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Git Branching and Release Model */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Flow Diagram (SVG) */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-1 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <GitBranch className="h-4.5 w-4.5 text-accent-purple" />
              Git Branch Topology
            </h3>
            <p className="text-xs text-zinc-500 leading-normal">Interactive visualization of our weekly production release Git pipeline.</p>
          </div>

          <div className="my-6 flex flex-col gap-6 relative select-none">
            {/* Visual branching flow using simple connector lines */}
            <div className="flex items-center gap-4">
              <div className="h-6.5 w-24 rounded bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-[10px] font-bold font-mono">main</div>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-600" />
              <span className="text-[10px] text-zinc-400 font-medium">Production (Protected)</span>
            </div>
            
            <div className="flex items-center gap-4 pl-4 border-l border-white/5">
              <div className="h-6.5 w-24 rounded bg-accent-purple/10 border border-accent-purple/20 text-accent-purple flex items-center justify-center text-[10px] font-bold font-mono">release/*</div>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-600" />
              <span className="text-[10px] text-zinc-400 font-medium">Release Candidate Stabilizing</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-6.5 w-24 rounded bg-accent-blue/10 border border-accent-blue/20 text-accent-blue flex items-center justify-center text-[10px] font-bold font-mono">develop</div>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-600" />
              <span className="text-[10px] text-zinc-400 font-medium">Staging Integration</span>
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-white/5">
              <div className="h-6.5 w-24 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center justify-center text-[10px] font-bold font-mono">feature/*</div>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-600" />
              <span className="text-[10px] text-zinc-400 font-medium">Short-lived IC Work</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 flex items-center gap-1 bg-white/5 border border-white/10 p-2 rounded">
            <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
            <span>Weekly prod push targets every Wednesday.</span>
          </div>
        </motion.div>

        {/* Detailed branching rules list */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2"
        >
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Terminal className="h-4.5 w-4.5 text-accent-blue" />
            Branch Protection & Verification Policies
          </h3>

          <div className="space-y-4">
            {GIT_BRANCHING_RULES.map((rule) => (
              <div key={rule.name} className="p-3.5 rounded-lg bg-white/[0.01] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono bg-white/5 border border-white/10 px-2.5 py-0.5 rounded">
                    {rule.pattern}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-accent-blue font-bold">Rule Set</span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {rule.rules.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CI/CD automated gates alert */}
      <div className="glass-panel p-4 rounded-xl flex gap-3">
        <ShieldCheck className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-normal">
          <span className="font-bold text-white">CI/CD Gate Checklist:</span> All PRs targeting `develop` must pass 100% Cypress/Playwright regression suites, achieve at least 80% SonarQube test coverage, pass all Snyk vulnerability scans, and be squash-merged to preserve a linear history structure.
        </div>
      </div>
    </motion.div>
  );
}
