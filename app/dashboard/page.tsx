'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  Terminal,
  HelpCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  FOUNDATION_METRICS,
  REVENUE_STREAMS,
  CUSTOMER_TIERS,
  COMPETITIVE_ADVANTAGES,
  FOUNDER_RESPONSIBILITIES
} from '@/lib/data';

export default function DashboardPage() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
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
            <Sparkles className="h-3 w-3 animate-spin" />
            <span>AI-First Enterprise Operating System</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            Company Command Center
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Real-time parsed intelligence from tech_company_blueprint & responsibility_management_system.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-panel px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs text-zinc-400">
            <Terminal className="h-3.5 w-3.5 text-accent-purple" />
            <span>Tenant: <span className="text-white font-semibold">Enterprise Alpha</span></span>
          </div>
          <div className="glass-panel px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs text-zinc-400">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>Health: <span className="text-emerald-400 font-semibold">99.98%</span></span>
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {FOUNDATION_METRICS.slice(0, 4).map((metric) => (
          <motion.div
            key={metric.id}
            variants={itemVariants}
            className="glass-panel hover:border-accent-blue/30 p-5 rounded-xl relative overflow-hidden group transition-all"
          >
            <div className="absolute top-0 right-0 p-3 text-zinc-600 group-hover:text-accent-blue transition-colors">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{metric.name}</div>
            <div className="text-2xl font-bold tracking-tight text-white mt-2 flex items-baseline gap-2">
              {metric.value}
              {metric.change && (
                <span className="text-xs font-semibold text-emerald-400">
                  {metric.change}
                </span>
              )}
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple`}
                style={{ width: '75%' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {FOUNDATION_METRICS.slice(4).map((metric) => (
          <motion.div
            key={metric.id}
            variants={itemVariants}
            className="glass-panel p-4 rounded-xl relative overflow-hidden group hover:border-accent-purple/30 transition-all"
          >
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">{metric.name}</div>
            <div className="text-xl font-bold tracking-tight text-white mt-1 flex items-baseline gap-2">
              {metric.value}
              {metric.change && (
                <span className="text-[10px] font-semibold text-emerald-400">
                  {metric.change}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mid Section Charts & Control Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Financial Split */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-md font-bold tracking-tight text-white flex items-center gap-2">
              <Layers className="h-4.5 w-4.5 text-accent-blue" />
              MRR Financial Breakdown vs Targets
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Comparing current MRR values against projected scalability targets by stream.</p>
          </div>
          <div className="h-[280px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_STREAMS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface-elevated)',
                    borderColor: 'var(--border-primary)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '11px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar name="Current MRR ($)" dataKey="currentValue" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
                <Bar name="Projected MRR ($)" dataKey="projectedValue" fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Column 2: Operations Control Desk */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-md font-bold tracking-tight text-white flex items-center gap-2">
                <Cpu className="h-4.5 w-4.5 text-accent-purple" />
                Operations Desk
              </h2>
              <p className="text-xs text-zinc-500 mt-1">Founder responsibilities split & operational segments.</p>
            </div>

            {/* Founder splits */}
            <div className="space-y-3">
              {FOUNDER_RESPONSIBILITIES.map((f, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{f.founder}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent-blue/10 border border-accent-blue/20 text-accent-blue uppercase tracking-wide">{f.style.split(',')[0]}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-relaxed">{f.focus}</div>
                </div>
              ))}
            </div>

            {/* Target customer tiers */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Target Customer Tiers</div>
              <div className="grid grid-cols-3 gap-2">
                {CUSTOMER_TIERS.map((tier, i) => (
                  <div key={i} className="p-2 rounded bg-white/[0.01] border border-white/5 text-center">
                    <div className="text-[9px] text-accent-purple font-bold uppercase">{tier.tier}</div>
                    <div className="text-[10px] text-white font-semibold mt-0.5">{tier.name}</div>
                    <div className="text-[8px] text-zinc-500 truncate mt-0.5">{tier.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Panel: Competitive Advantages & System Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitive Advantages */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-1"
        >
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Competitive Advantages</h3>
          <ul className="space-y-3">
            {COMPETITIVE_ADVANTAGES.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Security & System Check logs */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Automated Audit & Compliance Checks</h3>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded uppercase">ALL CLEAR</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.01] border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold text-white">SOC 2 continuous audit</span>
                <span className="text-zinc-500">—</span>
                <span className="text-zinc-400">Continuous check verified. All policies mapped.</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-semibold">100% OK</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.01] border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold text-white">Zero Trust Identity Auditing</span>
                <span className="text-zinc-500">—</span>
                <span className="text-zinc-400">Active users matched against authorized RBAC tokens.</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-semibold">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.01] border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold text-white">AWS VPC Firewall Scan</span>
                <span className="text-zinc-500">—</span>
                <span className="text-zinc-400">WAF rules active. Blocked 14 suspicious brute force IPs.</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">PROTECTED</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
