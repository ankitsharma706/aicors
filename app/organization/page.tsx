'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Sparkles, User, ShieldAlert, BadgeDollarSign, ChevronRight, Briefcase } from 'lucide-react';
import { ORG_DATA } from '@/lib/data';
import { OrgNode } from '@/lib/types';

export default function OrganizationPage() {
  const [stage, setStage] = useState<1 | 2 | 3>(2);
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);

  // Helper to filter nodes based on selected scale phase
  const getStageNode = (node: OrgNode, currentStage: number): OrgNode | null => {
    // Stage 1 (Startup Phase): Alex (CEO), Sarah (CTO) and EM (Marcus Vance).
    // Stage 2 (Growth Phase): Add Elena (DevOps) and Jayden (AI Ops).
    // Stage 3 (Enterprise Phase): Add formal VP of Engineering, separate squads.
    
    if (currentStage === 1) {
      if (node.level === 'lead' && node.name !== 'Marcus Vance') return null;
      if (node.level === 'vp' && node.name !== 'Sarah Chen') return null;
    }
    
    const children = node.children
      ? node.children
          .map(c => getStageNode(c, currentStage))
          .filter((c): c is OrgNode => c !== null)
      : [];
      
    return {
      ...node,
      children: children.length > 0 ? children : undefined
    };
  };

  const activeTree = getStageNode(ORG_DATA, stage) || ORG_DATA;

  // Render Org Card Component
  const OrgCard = ({ node }: { node: OrgNode }) => {
    const isLeadOrAbove = node.level === 'ceo' || node.level === 'vp' || node.level === 'lead';
    
    return (
      <div className="flex flex-col items-center shrink-0">
        <motion.button
          layout
          onClick={() => setSelectedNode(node)}
          className={`glass-panel p-3.5 rounded-xl flex items-center gap-3 border text-left w-56 hover:scale-102 transition-all ${
            selectedNode?.name === node.name
              ? 'border-accent-blue shadow-lg shadow-accent-blue/10 bg-zinc-900'
              : 'border-white/5 hover:border-white/15'
          }`}
        >
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
            {node.avatar ? (
              <img src={node.avatar} alt={node.name} className="object-cover h-full w-full" />
            ) : (
              <User className="h-5 w-5 text-zinc-400 m-auto mt-2" />
            )}
          </div>
          <div className="overflow-hidden">
            <div className="text-[11px] font-bold text-white truncate">{node.name}</div>
            <div className="text-[9px] text-zinc-400 mt-0.5 truncate">{node.role}</div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                node.level === 'ceo'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                  : node.level === 'vp'
                  ? 'bg-accent-purple/10 border border-accent-purple/20 text-accent-purple'
                  : 'bg-accent-blue/10 border border-accent-blue/20 text-accent-blue'
              }`}>
                {node.level}
              </span>
              <span className="text-[8px] text-zinc-500 truncate">{node.department}</span>
            </div>
          </div>
        </motion.button>

        {/* Dynamic children SVG lines mapping */}
        {node.children && node.children.length > 0 && (
          <div className="flex flex-col items-center w-full">
            {/* Vertical connector down */}
            <div className="h-6 w-px bg-white/10" />
            
            {/* Horizontal bridge line if multiple children */}
            {node.children.length > 1 && (
              <div className="h-px bg-white/10 w-full max-w-[80%]" />
            )}
            
            {/* Children container */}
            <div className="flex gap-8 justify-center mt-0 pt-0">
              {node.children.map((child, idx) => (
                <div key={child.name} className="flex flex-col items-center">
                  <div className="h-6 w-px bg-white/10" />
                  <OrgCard node={child} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 h-full flex flex-col justify-between">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-blue tracking-wider uppercase">
            <Network className="h-3.5 w-3.5" />
            <span>Operational Architecture</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            Organizational Tree
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Explore reporting hierarchies, leveling charts, and scaling phases.</p>
        </div>

        {/* Phase stage selectors */}
        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-lg">
          {[1, 2, 3].map((val) => (
            <button
              key={val}
              onClick={() => {
                setStage(val as 1 | 2 | 3);
                setSelectedNode(null);
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                stage === val
                  ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Stage {val} {val === 1 ? '(Startup)' : val === 2 ? '(Growth)' : '(Enterprise)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Tree Sandbox */}
      <div className="flex-1 glass-panel border border-white/5 rounded-xl min-h-[480px] p-8 flex items-center justify-center overflow-auto relative">
        <div className="absolute top-4 left-4 text-[10px] text-zinc-500 flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded select-none">
          <Sparkles className="h-3 w-3 text-accent-blue animate-pulse" />
          <span>Click any member card to view role specs</span>
        </div>

        {/* Center tree container */}
        <div className="flex items-center justify-center min-w-max">
          <OrgCard node={activeTree} />
        </div>
      </div>

      {/* Detail Slide Drawer/Modal on Node Selection */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-y-0 right-0 z-50 w-96 glass-panel border-l border-white/10 bg-zinc-950/95 p-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header Close */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <span className="text-xs font-bold text-accent-blue uppercase tracking-wider">Role Specifications</span>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-xs text-zinc-500 hover:text-white font-semibold transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Basic info */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
                  {selectedNode.avatar ? (
                    <img src={selectedNode.avatar} alt={selectedNode.name} className="object-cover h-full w-full" />
                  ) : (
                    <User className="h-8 w-8 text-zinc-400 m-auto mt-4" />
                  )}
                </div>
                <div>
                  <h3 className="text-md font-bold text-white">{selectedNode.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{selectedNode.role}</p>
                  <span className="inline-block mt-2 text-[9px] px-2 py-0.5 rounded font-bold bg-accent-purple/10 border border-accent-purple/20 text-accent-purple uppercase tracking-wider">
                    Level: {selectedNode.level}
                  </span>
                </div>
              </div>

              {/* Bio details */}
              {selectedNode.bio && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Role Summary</div>
                  <p className="text-xs text-zinc-400 leading-relaxed bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                    {selectedNode.bio}
                  </p>
                </div>
              )}

              {/* Compensation benchmarks */}
              <div className="space-y-3">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                  <BadgeDollarSign className="h-3.5 w-3.5 text-emerald-400" />
                  Compensation Benchmark
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-white/[0.01] border border-white/5">
                    <div className="text-[9px] text-zinc-500 uppercase font-medium">Base Salary Range</div>
                    <div className="text-white font-bold mt-0.5">
                      {selectedNode.level === 'ceo' || selectedNode.level === 'vp'
                        ? '$175K - $220K'
                        : selectedNode.level === 'lead'
                        ? '$140K - $165K'
                        : '$90K - $130K'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-white/[0.01] border border-white/5">
                    <div className="text-[9px] text-zinc-500 uppercase font-medium">Equity Options</div>
                    <div className="text-white font-bold mt-0.5">
                      {selectedNode.level === 'ceo'
                        ? '45.0%'
                        : selectedNode.level === 'vp'
                        ? '1.5% - 3.5%'
                        : selectedNode.level === 'lead'
                        ? '0.4% - 0.8%'
                        : '0.1% - 0.25%'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision Authority info */}
              <div className="space-y-2.5">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-accent-blue" />
                  Decision Authority
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-accent-blue" />
                    <span>Deploy Access: <span className="text-white font-semibold">{selectedNode.level === 'ceo' || selectedNode.level === 'vp' || selectedNode.level === 'lead' ? 'Full Authority' : 'Pull Request (CI Gate)'}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-accent-blue" />
                    <span>Database Permissions: <span className="text-white font-semibold">{selectedNode.level === 'ceo' || selectedNode.name === 'Sarah Chen' ? 'Superadmin' : selectedNode.level === 'lead' ? 'Read-Write (API Only)' : 'Read-Only'}</span></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom notification */}
            <div className="p-3 bg-accent-blue/5 border border-accent-blue/10 rounded-lg flex gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-accent-blue shrink-0 mt-0.5" />
              <div className="text-[10px] text-zinc-400 leading-relaxed">
                Roles and authorities mapped directly to <span className="text-white font-semibold">responsibility_management_system.html</span> specs.
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
