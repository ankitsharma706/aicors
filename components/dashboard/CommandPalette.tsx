'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, FileText, User, Layout, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { EMPLOYEES, SOP_DOCS, SPRINT_TASKS } from '@/lib/data';

export default function CommandPalette() {
  const router = useRouter();
  const isOpen = useStore((state) => state.commandPaletteOpen);
  const setOpen = useStore((state) => state.setCommandPaletteOpen);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter items based on query
  const navigationItems = [
    { name: 'Go to AI Command Center', path: '/dashboard', type: 'page' },
    { name: 'Go to Organization Chart', path: '/organization', type: 'page' },
    { name: 'Go to Teams Matrix', path: '/teams', type: 'page' },
    { name: 'Go to Responsibility Mapping', path: '/responsibilities', type: 'page' },
    { name: 'Go to Sprint Kanban System', path: '/sprints', type: 'page' },
    { name: 'Go to Engineering Dashboard', path: '/engineering', type: 'page' },
    { name: 'Go to AI Operations Console', path: '/ai-ops', type: 'page' },
    { name: 'Go to DevOps Infrastructure Node', path: '/devops', type: 'page' },
    { name: 'Go to Security Audit Logs', path: '/security', type: 'page' },
    { name: 'Go to HR Employee Hub', path: '/hr', type: 'page' },
    { name: 'Go to Revenue & Forecasting', path: '/revenue', type: 'page' },
    { name: 'Go to Documentation SOP Wiki', path: '/docs', type: 'page' }
  ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  const tasks = SPRINT_TASKS.filter(task => 
    task.id.toLowerCase().includes(query.toLowerCase()) || 
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  const employees = EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(query.toLowerCase()) || 
    emp.role.toLowerCase().includes(query.toLowerCase())
  );

  const sops = SOP_DOCS.filter(sop => 
    sop.title.toLowerCase().includes(query.toLowerCase()) || 
    sop.id.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    setOpen(false);
    setQuery('');
    router.push(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative glass-panel w-full max-w-2xl rounded-xl border border-white/10 bg-zinc-950/90 shadow-2xl flex flex-col max-h-[60vh] overflow-hidden"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-white/[0.02]">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search views, tasks, employees, SOPs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white text-sm outline-none placeholder-zinc-500"
            />
            <span className="text-[10px] font-semibold text-zinc-500 bg-white/5 border border-white/10 px-2 py-1 rounded">ESC</span>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-4">
            {navigationItems.length === 0 && tasks.length === 0 && employees.length === 0 && sops.length === 0 && (
              <div className="text-center py-8 text-zinc-500 text-sm">
                No matching results found for <span className="text-white font-semibold">"{query}"</span>.
              </div>
            )}

            {/* Navigation Section */}
            {navigationItems.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Navigation</div>
                <div className="mt-1 space-y-1">
                  {navigationItems.slice(0, 5).map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleSelect(item.path)}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-white/5 transition-all text-xs group"
                    >
                      <div className="flex items-center gap-2">
                        <Layout className="h-4 w-4 text-accent-blue" />
                        <span>{item.name}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Section */}
            {tasks.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Sprint Tasks</div>
                <div className="mt-1 space-y-1">
                  {tasks.slice(0, 3).map((task) => (
                    <button
                      key={task.id}
                      onClick={() => handleSelect('/sprints')}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-white/5 transition-all text-xs group"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Terminal className="h-4 w-4 text-accent-purple shrink-0" />
                        <span className="text-zinc-500 font-semibold shrink-0">{task.id}</span>
                        <span className="truncate">{task.title}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-zinc-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase shrink-0">{task.status.replace('_', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SOP Wiki Section */}
            {sops.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">SOP Documents</div>
                <div className="mt-1 space-y-1">
                  {sops.slice(0, 3).map((sop) => (
                    <button
                      key={sop.id}
                      onClick={() => handleSelect('/docs')}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-white/5 transition-all text-xs group"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="text-zinc-500 font-semibold shrink-0">{sop.id}</span>
                        <span className="truncate">{sop.title}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:translate-x-1 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Employees Section */}
            {employees.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Employees</div>
                <div className="mt-1 space-y-1">
                  {employees.slice(0, 3).map((emp) => (
                    <button
                      key={emp.name}
                      onClick={() => handleSelect('/hr')}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-white/5 transition-all text-xs group"
                    >
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-sky-400" />
                        <span>{emp.name}</span>
                        <span className="text-zinc-500">—</span>
                        <span className="text-zinc-400 truncate">{emp.role}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-accent-blue font-medium bg-accent-blue/10 border border-accent-blue/20 px-1.5 py-0.5 rounded">{emp.level}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Guidelines */}
          <div className="p-3 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigation</span>
              <span>ENTER to Select</span>
            </div>
            <span>Press ESC to Close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
