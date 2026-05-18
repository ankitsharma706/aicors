'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudLightning,
  Sparkles,
  Server,
  Activity,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import { K8S_SERVICES } from '@/lib/data';

export default function DevOpsPage() {
  const [services, setServices] = useState(K8S_SERVICES);
  const [activeService, setActiveService] = useState<string>(K8S_SERVICES[0].name);
  const [rollbackSuccess, setRollbackSuccess] = useState(false);
  const [isRollingBack, setIsRollingBack] = useState(false);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
  };

  // Mock Rollback trigger
  const handleRollback = () => {
    setIsRollingBack(true);
    setTimeout(() => {
      setIsRollingBack(false);
      setRollbackSuccess(true);
      // Simulate repairing the queue-processor pod warning
      setServices(prev => prev.map(s => {
        if (s.name === 'queue-processor') {
          return {
            ...s,
            status: 'healthy',
            pods: s.pods.map(p => ({ ...p, status: 'healthy', cpu: '22%', restarts: p.restarts + 1 }))
          };
        }
        return s;
      }));
      setTimeout(() => setRollbackSuccess(false), 5000);
    }, 2500);
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
            <CloudLightning className="h-3.5 w-3.5" />
            <span>Infrastructure Orchestrator</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            DevOps & Cloud Topology
          </h1>
          <p className="text-xs text-zinc-500 mt-1">AWS EKS Cluster live pod monitors, service network structures, and rollback automation consoles.</p>
        </div>

        {/* Action Trigger */}
        <div>
          <button
            onClick={handleRollback}
            disabled={isRollingBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/20 transition-all hover:scale-102 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none"
          >
            <RotateCcw className={`h-4 w-4 ${isRollingBack ? 'animate-spin' : ''}`} />
            <span>{isRollingBack ? 'Executing ArgoCD Rollback...' : 'Trigger GitOps Rollback'}</span>
          </button>
        </div>
      </div>

      {/* Rollback Alert notification banner */}
      <AnimatePresence>
        {rollbackSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2 text-xs"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <span className="font-bold">Rollback completed successfully!</span> Cluster reverted to stable release tag <span className="font-mono">v1.14.8-stable</span>. Pod structures successfully re-allocated.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cluster Node Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Active EKS Nodes</div>
          <div className="text-xl font-bold text-white mt-1.5">3 / 3 active</div>
          <div className="text-[9px] text-emerald-400 mt-1">AWS us-east-1 VPC stack</div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Pod Allocations</div>
          <div className="text-xl font-bold text-white mt-1.5">6 healthy / 7 total</div>
          <div className="text-[9px] text-amber-400 mt-1 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>1 worker overloaded</span>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Ingress Requests</div>
          <div className="text-xl font-bold text-white mt-1.5">14,250 req / min</div>
          <div className="text-[9px] text-zinc-500 mt-1">Peak capacity: 50,000 max</div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Total CPU Reservation</div>
          <div className="text-xl font-bold text-white mt-1.5">48.2% avg</div>
          <div className="text-[9px] text-zinc-500 mt-1">Memory consumption: 62%</div>
        </div>
      </div>

      {/* K8s Services Sandbox and Microservices panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services List Panel */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-1"
        >
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Server className="h-4.5 w-4.5 text-accent-blue" />
            Cluster Microservices
          </h3>

          <div className="space-y-2">
            {services.map((srv) => (
              <button
                key={srv.name}
                onClick={() => setActiveService(srv.name)}
                className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-left transition-all ${
                  activeService === srv.name
                    ? 'bg-white/[0.03] border-accent-blue shadow-inner'
                    : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">{srv.name}</div>
                  <div className="text-[9px] text-zinc-500 mt-0.5">{srv.type}</div>
                </div>
                <span className={`text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                  srv.status === 'healthy'
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/10 border border-amber-500/20 text-amber-400 animate-pulse'
                }`}>
                  {srv.status}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Selected Service Pods Detailed panel */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2 flex flex-col justify-between"
        >
          {(() => {
            const srv = services.find((s) => s.name === activeService) || services[0];
            return (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="h-4.5 w-4.5 text-accent-purple" />
                    Pod Allocations: <span className="text-accent-purple">{srv.name}</span>
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Explore real-time telemetry metrics inside EKS node containers.</p>
                </div>

                <div className="space-y-3.5">
                  {srv.pods.map((pod) => (
                    <div key={pod.id} className="p-4 rounded-lg bg-white/[0.01] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-white font-mono">{pod.name}</div>
                        <div className="text-[9px] text-zinc-500 mt-1 flex items-center gap-2">
                          <span>Pod ID: {pod.id}</span>
                          <span>•</span>
                          <span>Restarts: {pod.restarts}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="flex items-center gap-1 text-zinc-400">
                          <Cpu className="h-3.5 w-3.5 text-accent-blue" />
                          <span>CPU: <span className="text-white font-bold">{pod.cpu}</span></span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-400">
                          <Activity className="h-3.5 w-3.5 text-accent-purple" />
                          <span>Mem: <span className="text-white font-bold">{pod.memory}</span></span>
                        </div>
                        <span className={`text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                          pod.status === 'healthy'
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        }`}>
                          {pod.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      </div>

      {/* Disaster recovery targets */}
      <div className="glass-panel p-4 rounded-xl flex gap-3">
        <Terminal className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-normal">
          <span className="font-bold text-white">Disaster Recovery (DR) RPO/RTO target policies:</span> PostgreSQL daily automated backups must guarantee an RPO (Recovery Point Objective) under 24 hours. Disaster restore drills targets are set under 4 hours (RTO - Recovery Time Objective) using automated CloudFormation / Terraform multi-region fallback plans.
        </div>
      </div>
    </motion.div>
  );
}
