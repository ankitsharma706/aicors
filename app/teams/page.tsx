'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users2, Shield, Settings2, Code, Terminal, Database, KeyRound, HardDrive } from 'lucide-react';
import { ENGINEERING_TEAMS } from '@/lib/data';

export default function TeamsPage() {
  const [selectedSquad, setSelectedSquad] = useState<string>(ENGINEERING_TEAMS[0].name);

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

  // Detailed role data from responsibility_management_system.html
  const roleBoundaries = [
    {
      role: 'Frontend Engineer',
      level: 'Mid to Senior',
      salary: '$90K - $145K',
      dbAccess: 'No direct access. REST API queries only.',
      deploy: 'Automatic Staging, Production via PR merge & CI/CD approval',
      incidents: 'Support triage for UI/UX visual bugs or client state crashes.'
    },
    {
      role: 'Backend Engineer',
      level: 'Senior to Staff',
      salary: '$120K - $175K',
      dbAccess: 'Read-write access via local & staging, production via secure migrations.',
      deploy: 'Staging auto-deploy. Production requires EM sign-off & DORA validation.',
      incidents: 'P0/P1 Incident Commanders. Secondary on infrastructure alerts.'
    },
    {
      role: 'DevOps / Platform',
      level: 'Senior',
      salary: '$140K - $165K',
      dbAccess: 'Superadmin root credentials. Encryption key access via KMS.',
      deploy: 'Kubernetes nodes, load balancer configs, emergency manual overrides.',
      incidents: 'Primary P0 Incident Commanders. Owner of automatic rollback thresholds.'
    }
  ];

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
            <Users2 className="h-3.5 w-3.5" />
            <span>Company Execution Structure</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            Engineering Squads & Teams
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Granular analysis of engineering domains, technologies, and permission boundaries.</p>
        </div>
      </div>

      {/* Main Squad Grid cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ENGINEERING_TEAMS.map((squad) => (
          <motion.div
            key={squad.name}
            variants={itemVariants}
            onClick={() => setSelectedSquad(squad.name)}
            className={`glass-panel p-5 rounded-xl border relative overflow-hidden cursor-pointer transition-all ${
              selectedSquad === squad.name
                ? 'border-accent-blue shadow-lg shadow-accent-blue/10 bg-zinc-900/60'
                : 'border-white/5 hover:border-white/15'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-accent-blue uppercase tracking-wider">
                {squad.name.replace(' Squad', '').replace(' Operations', '')}
              </div>
              <span className="text-[10px] text-zinc-500 font-semibold bg-white/5 px-2 py-0.5 rounded">
                {squad.size} members
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">{squad.name}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mt-2 h-12 overflow-hidden">
              {squad.purpose}
            </p>

            {/* Stack Pills */}
            <div className="flex flex-wrap gap-1 mt-4">
              {squad.stack.slice(0, 3).map((s) => (
                <span key={s} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-zinc-300 px-2 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
              {squad.stack.length > 3 && (
                <span className="text-[9px] text-zinc-500 px-1 py-0.5 font-bold">+{squad.stack.length - 3}</span>
              )}
            </div>

            {/* Bottom Lead info */}
            <div className="mt-5 border-t border-white/5 pt-3 flex items-center justify-between text-[10px] text-zinc-500">
              <span>Lead: <span className="text-white font-semibold">{squad.leadName}</span></span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grid: Squad KPIs & Stack details (changes dynamically on selection!) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detail Panel */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2 flex flex-col justify-between"
        >
          {(() => {
            const squad = ENGINEERING_TEAMS.find((s) => s.name === selectedSquad) || ENGINEERING_TEAMS[0];
            return (
              <div className="space-y-6">
                <div>
                  <h2 className="text-md font-bold tracking-tight text-white flex items-center gap-2">
                    <Code className="h-4.5 w-4.5 text-accent-blue" />
                    Domain Configuration: <span className="text-accent-blue">{squad.name}</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">Detailed KPIs, metrics targets, and full development stack for this execution domain.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stack */}
                  <div className="space-y-3">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Settings2 className="h-3.5 w-3.5" />
                      Approved Technology Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {squad.stack.map((item) => (
                        <div key={item} className="tag-pill bg-white/[0.02] border-white/10 text-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="space-y-3">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-accent-purple" />
                      Standard Quality & Performance KPIs
                    </div>
                    <ul className="space-y-2">
                      {squad.kpis.map((kpi) => (
                        <li key={kpi} className="flex items-center gap-2 text-xs text-zinc-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
                          <span>{kpi}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>

        {/* Sidebar Info */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl flex flex-col justify-between"
        >
          <div className="space-y-4">
            <h2 className="text-md font-bold tracking-tight text-white flex items-center gap-2">
              <Shield className="h-4.5 w-4.5 text-accent-purple" />
              Role Permission Boundary
            </h2>
            <p className="text-xs text-zinc-500">
              Operational rules mapped strictly to the security governance standards defined in the blueprints.
            </p>
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5 space-y-3 text-xs leading-relaxed text-zinc-400">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <KeyRound className="h-4 w-4 text-accent-blue" />
                Security Access Policy
              </div>
              <p>
                All database manipulations MUST go through backend code. Direct production shell operations are strictly blocked.
              </p>
              <p>
                CI/CD gates require automated security scans (Snyk/SonarQube) and PR reviews before prod mergers can complete.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Role Boundaries matrix comparison */}
      <motion.div
        variants={itemVariants}
        className="glass-panel p-6 rounded-xl"
      >
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Database className="h-4.5 w-4.5 text-accent-blue" />
          RACI & DB Permissions Matrix by Engineering Role
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 font-semibold">
                <th className="pb-3">Role Type</th>
                <th className="pb-3">Level Scope</th>
                <th className="pb-3">Salary Band</th>
                <th className="pb-3">Database Permissions</th>
                <th className="pb-3">Deployment Scope</th>
                <th className="pb-3">Incident Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {roleBoundaries.map((row) => (
                <tr key={row.role} className="hover:bg-white/[0.01]">
                  <td className="py-4 font-bold text-white">{row.role}</td>
                  <td className="py-4">{row.level}</td>
                  <td className="py-4 font-semibold text-emerald-400">{row.salary}</td>
                  <td className="py-4 text-zinc-400 max-w-[200px] leading-normal">{row.dbAccess}</td>
                  <td className="py-4 text-zinc-400 max-w-[200px] leading-normal">{row.deploy}</td>
                  <td className="py-4 text-zinc-400 max-w-[200px] leading-normal">{row.incidents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
