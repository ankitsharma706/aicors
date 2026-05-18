'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Sparkles,
  Save,
  MessageSquare,
  KeyRound,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const [tenant, setTenant] = useState('Enterprise Alpha');
  const [standupTime, setStandupTime] = useState('09:30 AM EST');
  const [errorThreshold, setErrorThreshold] = useState('5.0');
  const [latencyThreshold, setLatencyThreshold] = useState('3.0');
  const [showKeys, setShowKeys] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 1500);
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
            <Settings className="h-3.5 w-3.5" />
            <span>Global Configurations</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            System Settings
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Configure company-wide operational limits, slack notifications, API vaults, and automated rollback parameters.</p>
        </div>
      </div>

      {/* Save alert banner */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2 text-xs"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <span className="font-bold">Configurations saved successfully!</span> Operational parameters updated across all active server node slices.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Area */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core System Parameters */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2 space-y-6"
        >
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="h-4.5 w-4.5 text-accent-blue" />
            Operational Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Tenant selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-zinc-400 uppercase">Active Operational Tenant</label>
              <select
                value={tenant}
                onChange={(e) => setTenant(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-accent-blue"
              >
                <option value="Enterprise Alpha">Enterprise Alpha (HQ)</option>
                <option value="Scale Beta">Scale Beta (Contractors)</option>
              </select>
            </div>

            {/* Standup time */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-zinc-400 uppercase">Daily Standup Time</label>
              <input
                type="text"
                value={standupTime}
                onChange={(e) => setStandupTime(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-2 text-white focus:border-accent-blue outline-none"
              />
            </div>

            {/* Rollback trigger limits */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-zinc-400 uppercase">ArgoCD Automatic Rollback Error rate %</label>
              <input
                type="text"
                value={errorThreshold}
                onChange={(e) => setErrorThreshold(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-2 text-white focus:border-accent-blue outline-none font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-zinc-400 uppercase">Automatic Rollback Latency (seconds)</label>
              <input
                type="text"
                value={latencyThreshold}
                onChange={(e) => setLatencyThreshold(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-2 text-white focus:border-accent-blue outline-none font-mono"
              />
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 flex items-center justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-blue hover:bg-accent-blue/80 text-white font-bold text-xs shadow-lg shadow-accent-blue/20 transition-all hover:scale-102 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none"
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? 'Saving parameters...' : 'Save Parameters'}</span>
            </button>
          </div>
        </motion.div>

        {/* Secrets & Integrations */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-1 space-y-6"
        >
          {/* Slack Integration */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-accent-purple" />
              SlackOps Integration
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.01] border border-white/5">
                <span className="text-zinc-400">#client-acme-global</span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.01] border border-white/5">
                <span className="text-zinc-400">#qa-sprint-alerts</span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Credentials Vault */}
          <div className="space-y-4 border-t border-white/5 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <KeyRound className="h-4.5 w-4.5 text-accent-blue" />
                API Credentials Vault
              </h3>
              <button
                type="button"
                onClick={() => setShowKeys(!showKeys)}
                className="p-1 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
              >
                {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="space-y-1">
                <span className="text-[9px] font-semibold text-zinc-500 uppercase">Okta Auth Endpoint Secret</span>
                <div className="flex items-center gap-2 p-2 rounded bg-zinc-950 border border-white/5 font-mono text-[10px] text-zinc-400">
                  <Lock className="h-3 w-3 text-accent-blue shrink-0" />
                  <span>{showKeys ? 'okta_auth_5cc7991b15aa2fd3' : '••••••••••••••••••••••••'}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-semibold text-zinc-500 uppercase">OpenAI JWT Token API Key</span>
                <div className="flex items-center gap-2 p-2 rounded bg-zinc-950 border border-white/5 font-mono text-[10px] text-zinc-400">
                  <Lock className="h-3 w-3 text-accent-blue shrink-0" />
                  <span>{showKeys ? 'sk-proj-4f229bb18cc25f992a014bc' : '••••••••••••••••••••••••'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </form>

      {/* Guidelines alert */}
      <div className="glass-panel p-4 rounded-xl flex gap-3">
        <ShieldAlert className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-normal">
          <span className="font-bold text-white">System Security Governance:</span> API token credentials are encrypted at rest using AES-256 and subject to continuous Okta Zero-Trust role mapping audits. Unauthorized changes to core deployment thresholds are flagged as high-risk incidents.
        </div>
      </div>
    </motion.div>
  );
}
