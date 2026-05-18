'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, User, BadgeDollarSign, MessageSquare, Heart, ShieldCheck, DollarSign } from 'lucide-react';
import { CLIENT_ACCOUNTS } from '@/lib/data';

export default function RevenuePage() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
  };

  // SaaS Tiers from Section 1.5 blueprint
  const pricingTiers = [
    {
      tier: 'Startup / SMB',
      price: '$49 / mo',
      features: ['Up to 10 seats', 'Core AI automation', 'Standard Slack support', 'Daily database backups'],
      color: 'border-zinc-700'
    },
    {
      tier: 'Mid-Market Growth',
      price: '$299 / mo',
      features: ['Up to 50 seats', 'Advanced custom RAG integrations', 'Shared Slack connect channel', 'Continuous security auditing'],
      color: 'border-accent-blue shadow-lg shadow-accent-blue/5'
    },
    {
      tier: 'Enterprise SLA',
      price: 'Custom / Annual',
      features: ['Unlimited seats', 'Dedicated VPC cloud clusters', 'Direct pagers & 15m SLA', 'SOC 2 certifications mapped'],
      color: 'border-accent-purple shadow-lg shadow-accent-purple/5'
    }
  ];

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 80) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
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
            <BadgeDollarSign className="h-3.5 w-3.5" />
            <span>Financial Command Center</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            Revenue & Client Accounts
          </h1>
          <p className="text-xs text-zinc-500 mt-1">SaaS subscription pricing models, active client portfolios, ACV/MRR distributions, and SlackOps channels.</p>
        </div>
      </div>

      {/* Revenue metrics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-accent-blue">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Annual Run Rate (ARR)</div>
          <div className="text-2xl font-bold text-white mt-1.5">$1.44M</div>
          <div className="text-[9px] text-emerald-400 mt-1">Goal: $2.0M ARR by Q4</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-accent-purple">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Active Net Retention (NRR)</div>
          <div className="text-xl font-bold text-white mt-1.5">112%</div>
          <div className="text-[9px] text-emerald-400 mt-1">Elite category retention</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-500">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Total Client Portfolio ACV</div>
          <div className="text-2xl font-bold text-white mt-1.5">$604,000</div>
          <div className="text-[9px] text-zinc-500 mt-1">Average contract: $151K ACV</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-500">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Average CAC Payback</div>
          <div className="text-xl font-bold text-white mt-1.5">14.2 months</div>
          <div className="text-[9px] text-zinc-500 mt-1">LTV : CAC ratio 3.6 : 1 ok</div>
        </div>
      </div>

      {/* Active accounts list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients Roster Table */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2"
        >
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="h-4.5 w-4.5 text-accent-blue" />
            Active Enterprise Client Portfolio
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 font-semibold">
                  <th className="pb-3">Client Account</th>
                  <th className="pb-3 text-center">Lifecycle Phase</th>
                  <th className="pb-3 text-center">Annual Value (ACV)</th>
                  <th className="pb-3 text-center">Monthly Value (MRR)</th>
                  <th className="pb-3 text-center">Slack Channel</th>
                  <th className="pb-3 text-right">Account Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {CLIENT_ACCOUNTS.map((client) => (
                  <tr key={client.name} className="hover:bg-white/[0.01]">
                    <td className="py-4 font-bold text-white">{client.name}</td>
                    <td className="py-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 uppercase text-[9px] font-semibold text-zinc-400">
                        {client.stage.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 text-center font-mono font-bold text-emerald-400">${client.acv.toLocaleString()}</td>
                    <td className="py-4 text-center font-mono text-zinc-400">${client.mrr.toLocaleString()}</td>
                    <td className="py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] text-accent-blue bg-accent-blue/5 border border-accent-blue/15 px-2 py-0.5 rounded font-mono font-semibold">
                        <MessageSquare className="h-3 w-3" />
                        {client.slackChannel}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-bold font-mono ${getHealthColor(client.healthScore)}`}>
                        <Heart className="h-3 w-3 fill-current" />
                        {client.healthScore}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pricing Models */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-1 space-y-4"
        >
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="h-4.5 w-4.5 text-accent-purple" />
              SaaS Pricing Strategies
            </h3>
            <p className="text-xs text-zinc-500 mt-1">Tiered pricing structures mapped precisely to operational capacities.</p>
          </div>

          <div className="space-y-3.5">
            {pricingTiers.map((tier) => (
              <div key={tier.tier} className={`p-4 rounded-xl border bg-white/[0.01] ${tier.color} space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{tier.tier}</span>
                  <span className="text-xs font-black text-emerald-400 font-mono">{tier.price}</span>
                </div>
                <ul className="space-y-1 text-[10px] text-zinc-400">
                  {tier.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-accent-purple" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Guidelines alert */}
      <div className="glass-panel p-4 rounded-xl flex gap-3">
        <ShieldCheck className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-normal">
          <span className="font-bold text-white">Financial Governance Policy Checklist:</span> Enterprise client onboarding triggers automatic provisioning of a dedicated AWS VPC database cluster, custom Slack connect channel initialization, and pairing of an authorized primary Technical Account Lead with a 15-minute response SLA.
        </div>
      </div>
    </motion.div>
  );
}
