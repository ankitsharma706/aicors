'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck2, Sparkles, User, Briefcase, HeartHandshake, TrendingUp, CheckCircle2 } from 'lucide-react';
import { EMPLOYEES } from '@/lib/data';

export default function HRPage() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
  };

  // Greenhouse candidates stage tracking
  const greenhouseCandidates = [
    { name: 'Chloe Moretz', role: 'Senior React Developer', stage: 'System Design', match: '96%' },
    { name: 'Brandon Stark', role: 'Staff Backend Architect', stage: 'Host Match', match: '98%' },
    { name: 'Eliza Johnson', role: 'Junior QA Engineer', stage: 'Coding Exercise', match: '88%' }
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
            <UserCheck2 className="h-3.5 w-3.5" />
            <span>Human Resource Matrix</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            HR Operations & Talent Hub
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Greenhouse hiring funnel metrics, transparent salary grades, and internal employee rosters.</p>
        </div>
      </div>

      {/* Roster & Hiring pipeline KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Total Headcount</div>
          <div className="text-xl font-bold text-white mt-1">7 FTE Employees</div>
          <div className="text-[9px] text-accent-blue mt-1">Goal: 10 FTE by Q4 2026</div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Active Greenhouse Pipeline</div>
          <div className="text-xl font-bold text-white mt-1">14 Candidates</div>
          <div className="text-[9px] text-accent-blue mt-1">4 open positions active</div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Average Monthly Burn</div>
          <div className="text-xl font-bold text-white mt-1">$95,800 / mo</div>
          <div className="text-[9px] text-zinc-500 mt-1">Runway: 18 months ok</div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Skill Matrix Completion</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">94% mapped</div>
          <div className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>All profiles evaluated</span>
          </div>
        </div>
      </div>

      {/* Roster & Hiring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transparent salary levels and Roster */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2"
        >
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="h-4.5 w-4.5 text-accent-blue" />
            Transparent Employee Roster & Leveling
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 font-semibold">
                  <th className="pb-3">Employee</th>
                  <th className="pb-3">Domain</th>
                  <th className="pb-3 text-center">Grade Level</th>
                  <th className="pb-3 text-center">Base Salary</th>
                  <th className="pb-3 text-right">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {EMPLOYEES.map((emp) => (
                  <tr key={emp.name} className="hover:bg-white/[0.01]">
                    <td className="py-3 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
                        <img src={emp.avatar} alt={emp.name} className="object-cover h-full w-full" />
                      </div>
                      <span className="font-bold text-white">{emp.name}</span>
                    </td>
                    <td className="py-3 text-zinc-400">{emp.role}</td>
                    <td className="py-3 text-center font-bold text-accent-purple">{emp.level}</td>
                    <td className="py-3 text-center font-mono font-semibold text-emerald-400">{emp.salary}</td>
                    <td className="py-3 text-right">
                      <span className={`text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        emp.performance === 'exceeds'
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                          : 'bg-accent-blue/10 border border-accent-blue/20 text-accent-blue'
                      }`}>
                        {emp.performance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Greenhouse active pipeline */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-1 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="h-4.5 w-4.5 text-accent-purple" />
                Greenhouse Pipeline
              </h3>
              <p className="text-xs text-zinc-500 mt-1">High-priority candidates under active system design or final host matching evaluation.</p>
            </div>

            <div className="space-y-3">
              {greenhouseCandidates.map((cand) => (
                <div key={cand.name} className="p-3 rounded-lg bg-white/[0.01] border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{cand.name}</span>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">{cand.match} Match</span>
                  </div>
                  <div className="text-[10px] text-zinc-400">{cand.role}</div>
                  <div className="text-[9px] text-zinc-500 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
                    <span>Stage: <span className="text-accent-purple font-semibold">{cand.stage}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 flex items-center gap-1.5 bg-white/5 border border-white/10 p-2 rounded">
            <HeartHandshake className="h-4 w-4 text-accent-blue shrink-0" />
            <span>Greenhouse integrations active.</span>
          </div>
        </motion.div>
      </div>

      {/* Leveling guidelines summary from Section 17 */}
      <div className="glass-panel p-4 rounded-xl flex gap-3">
        <TrendingUp className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-normal">
          <span className="font-bold text-white">Transparent Salary Grades Guidelines:</span> Levels are mapped strictly to standard industry criteria. Promotion structures mandate at least one (1) high-performance rating cycle, a formal EM technical evaluation validation checklist, and direct review sign-off by both Founders.
        </div>
      </div>
    </motion.div>
  );
}
