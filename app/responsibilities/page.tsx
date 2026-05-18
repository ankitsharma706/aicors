'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck2, User, Sparkles, Filter, ShieldAlert, Award, FileSearch } from 'lucide-react';
import { RACI_ACTIVITIES } from '@/lib/data';

export default function ResponsibilitiesPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    { key: 'pm', label: 'Product Manager' },
    { key: 'em', label: 'Engineering Mgr' },
    { key: 'engineer', label: 'Full-Stack Engineer' },
    { key: 'design', label: 'UI/UX Designer' },
    { key: 'qa', label: 'QA Engineer' },
    { key: 'devops', label: 'DevOps / SRE' },
    { key: 'security', label: 'Security Lead' },
    { key: 'cto', label: 'CTO / Co-Founder' }
  ];

  // Helper to check cell highlighting
  const getCellHighlight = (roleKey: string, val: string) => {
    if (!val) return 'text-zinc-600';
    
    const isRoleSelected = selectedRole === roleKey;
    
    if (val === 'A') {
      return isRoleSelected 
        ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/30' 
        : 'bg-red-500/5 text-red-400 border border-red-500/10';
    }
    if (val === 'R') {
      return isRoleSelected 
        ? 'bg-accent-blue/20 text-accent-blue font-bold border border-accent-blue/30' 
        : 'bg-accent-blue/5 text-accent-blue/80 border border-accent-blue/10';
    }
    if (val === 'C') {
      return isRoleSelected 
        ? 'bg-accent-purple/20 text-accent-purple font-bold border border-accent-purple/30' 
        : 'bg-accent-purple/5 text-accent-purple/80 border border-accent-purple/10';
    }
    if (val === 'I') {
      return isRoleSelected 
        ? 'bg-zinc-800 text-white border border-zinc-700' 
        : 'text-zinc-500';
    }
    return '';
  };

  // Helper to count statistics for selected role
  const getRoleStats = (roleKey: string) => {
    let accountable = 0;
    let responsible = 0;
    let consulted = 0;
    let informed = 0;

    RACI_ACTIVITIES.forEach((act) => {
      const val = act[roleKey as keyof typeof act];
      if (val === 'A') accountable++;
      if (val === 'R') responsible++;
      if (val === 'C') consulted++;
      if (val === 'I') informed++;
    });

    return { accountable, responsible, consulted, informed };
  };

  const selectedStats = selectedRole ? getRoleStats(selectedRole) : null;

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-blue tracking-wider uppercase">
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>Responsibility Matrix System</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            RACI Governance Matrix
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Interactive mapping of Accountabilities, Responsibilities, Consultations, and Notifications.</p>
        </div>
      </div>

      {/* Role Selector Header */}
      <div className="glass-panel p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
            <Filter className="h-3.5 w-3.5 text-accent-blue" />
            Highlight Responsibilities by Role
          </div>
          {selectedRole && (
            <button
              onClick={() => setSelectedRole(null)}
              className="text-[10px] font-bold text-accent-purple hover:underline"
            >
              Clear Active Filter
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => setSelectedRole(role.key === selectedRole ? null : role.key)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all ${
                selectedRole === role.key
                  ? 'bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 border-accent-blue text-white shadow-md shadow-accent-blue/5 font-semibold'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15 text-zinc-400 hover:text-white'
              }`}
            >
              <User className={`h-3.5 w-3.5 ${selectedRole === role.key ? 'text-accent-blue' : 'text-zinc-500'}`} />
              <span>{role.label}</span>
            </button>
          ))}
        </div>

        {/* Legend Indicator */}
        <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-white/5 text-[10px] text-zinc-500 select-none">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span><span className="text-white font-bold font-mono">A</span> = Accountable (Owner of decision)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-blue" />
            <span><span className="text-white font-bold font-mono">R</span> = Responsible (Executes execution)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-purple" />
            <span><span className="text-white font-bold font-mono">C</span> = Consulted (Provides domain feedback)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span><span className="text-white font-bold font-mono">I</span> = Informed (Notified of outputs)</span>
          </div>
        </div>
      </div>

      {/* Dynamic stats cards when role selected */}
      {selectedStats && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="glass-panel p-4 rounded-xl text-center border-l-2 border-l-red-500">
            <div className="text-[10px] text-zinc-500 uppercase font-semibold">Accountable Decisions</div>
            <div className="text-2xl font-bold text-white mt-1">{selectedStats.accountable}</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center border-l-2 border-l-accent-blue">
            <div className="text-[10px] text-zinc-500 uppercase font-semibold">Responsible Deliverables</div>
            <div className="text-2xl font-bold text-white mt-1">{selectedStats.responsible}</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center border-l-2 border-l-accent-purple">
            <div className="text-[10px] text-zinc-500 uppercase font-semibold">Consulted Inputs</div>
            <div className="text-2xl font-bold text-white mt-1">{selectedStats.consulted}</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center border-l-2 border-l-zinc-600">
            <div className="text-[10px] text-zinc-500 uppercase font-semibold">Informed Alerts</div>
            <div className="text-2xl font-bold text-white mt-1">{selectedStats.informed}</div>
          </div>
        </motion.div>
      )}

      {/* Primary RACI Grid table */}
      <motion.div
        layout
        className="glass-panel p-6 rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileSearch className="h-4.5 w-4.5 text-accent-blue" />
            Interactive Governance Index
          </h2>
          <span className="text-[10px] text-zinc-500 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-accent-purple animate-pulse" />
            Active Role Filter: <span className="text-white font-semibold uppercase">{selectedRole || 'None'}</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 font-semibold text-left">
                <th className="pb-3 text-left w-64">Operation Activity Domain</th>
                {roles.map((role) => (
                  <th
                    key={role.key}
                    onClick={() => setSelectedRole(role.key)}
                    className={`pb-3 text-center cursor-pointer transition-all hover:text-white ${
                      selectedRole === role.key ? 'text-accent-blue font-bold' : ''
                    }`}
                  >
                    {role.label.split(' ')[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {RACI_ACTIVITIES.map((row) => (
                <tr
                  key={row.activity}
                  className="hover:bg-white/[0.01] transition-colors text-left"
                >
                  <td className="py-3.5 font-bold text-white text-left truncate max-w-[240px]">{row.activity}</td>
                  {roles.map((role) => {
                    const cellVal = row[role.key as keyof typeof row] as string;
                    return (
                      <td key={role.key} className="py-3.5 text-center">
                        <span className={`inline-flex items-center justify-center h-6 w-6 rounded font-mono text-[11px] font-bold transition-all ${getCellHighlight(role.key, cellVal)}`}>
                          {cellVal || '—'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Guidelines alert */}
      <div className="glass-panel p-4 rounded-xl flex gap-3">
        <ShieldAlert className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-normal">
          <span className="font-bold text-white">RACI Governance Rule Checklist:</span> Always ensure every single operation has exactly one (1) <span className="text-red-400 font-bold">Accountable (A)</span> owner. Responsibilities <span className="text-accent-blue font-bold">(R)</span> may be shared or distributed across multiple squads. Consultations <span className="text-accent-purple font-bold">(C)</span> must happen before decisions are made to preserve alignment.
        </div>
      </div>
    </div>
  );
}
