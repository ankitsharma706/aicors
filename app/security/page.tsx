'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, AlertOctagon, Terminal, UserCheck2, KeyRound, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SECURITY_INCIDENTS } from '@/lib/data';

export default function SecurityPage() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
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
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Identity Governance & Audit</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            Security Control Center
          </h1>
          <p className="text-xs text-zinc-500 mt-1">SOC 2 continuous compliance monitors, Zero Trust IAM structures, WAF firewalls, and active threat maps.</p>
        </div>
      </div>

      {/* Compliance dashboard metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-500">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">SOC 2 Continuous Audit</div>
          <div className="text-xl font-bold text-white mt-1">100% compliant</div>
          <div className="text-[9px] text-emerald-400 mt-1">Vanta automated scans passing</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-500">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">GDPR Alignment</div>
          <div className="text-xl font-bold text-white mt-1">Continuous checks</div>
          <div className="text-[9px] text-emerald-400 mt-1">Automatic user deletion hooks</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-accent-blue">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Threat Block Score</div>
          <div className="text-xl font-bold text-white mt-1">0 active vulnerabilities</div>
          <div className="text-[9px] text-zinc-500 mt-1">Last dependency audit: 4m ago</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border-l-2 border-l-emerald-500">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Okta SSO Integration</div>
          <div className="text-xl font-bold text-white mt-1">Active</div>
          <div className="text-[9px] text-emerald-400 mt-1">All employee tokens enforced</div>
        </div>
      </div>

      {/* Security Incident Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Logs List */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2 space-y-4"
        >
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <AlertOctagon className="h-4.5 w-4.5 text-accent-purple animate-pulse" />
            Security Incident Logs & Alerts
          </h3>

          <div className="space-y-3">
            {SECURITY_INCIDENTS.map((inc) => (
              <div key={inc.id} className="p-4 rounded-lg bg-white/[0.01] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">{inc.id}</span>
                    <span className="text-zinc-500">•</span>
                    <h4 className="text-xs font-bold text-white truncate max-w-[280px]">{inc.title}</h4>
                  </div>
                  <span className={`text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    inc.severity === 'critical'
                      ? 'bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse'
                      : inc.severity === 'high'
                      ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
                      : 'bg-accent-blue/10 border border-accent-blue/20 text-accent-blue'
                  }`}>
                    {inc.severity}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{inc.summary}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] text-zinc-500">
                  <span>Incident Commander: <span className="text-white font-semibold">{inc.incidentCommander}</span></span>
                  <span>Detected: {inc.detectedTime}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Identity & Encryption layers */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-1 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <KeyRound className="h-4.5 w-4.5 text-accent-blue" />
                Zero Trust Encryption
              </h3>
              <p className="text-xs text-zinc-500 mt-1">System cryptography configuration policies mapped precisely to architecture benchmarks.</p>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/5 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <ShieldAlert className="h-4 w-4 text-accent-blue" />
                  KMS Cryptography Key Policies
                </div>
                <p>
                  All database transaction volumes are encrypted under AES-256 using rotating AWS KMS customer managed keys.
                </p>
                <p>
                  Identity tokens undergo continuous auditing via secure public-key cryptography layers embedded in WAF gate filters.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Guidelines alert */}
      <div className="glass-panel p-4 rounded-xl flex gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-normal">
          <span className="font-bold text-white">SOC 2 compliance standard controls:</span> Compliance systems require continuous verification of multi-factor authentication (MFA) parameters inside Okta domains, dependency vulnerability scanning within every Git release cycle, and disaster recovery restore drill logs verified annually by authorized auditors.
        </div>
      </div>
    </motion.div>
  );
}
