'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Search, FileText, User, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { SOP_DOCS } from '@/lib/data';

export default function DocsPage() {
  const [selectedDocId, setSelectedDocId] = useState<string>(SOP_DOCS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
  };

  // Filter docs based on query
  const filteredDocs = SOP_DOCS.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeDoc = SOP_DOCS.find(d => d.id === selectedDocId) || SOP_DOCS[0];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 h-full flex flex-col justify-between"
    >
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-blue tracking-wider uppercase">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Standard Operating Procedures (SOP)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            Company Wiki & Documentation
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Explore engineering runbooks, database migration guidelines, incident management SOPs, and system architectures.</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search wiki documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 outline-none focus:border-accent-blue"
          />
        </div>
      </div>

      {/* Main split-screen panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left column list of docs */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-1 space-y-4"
        >
          <div className="text-xs font-bold text-white uppercase tracking-wider">Document Register</div>
          
          <div className="space-y-2">
            {filteredDocs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`w-full flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                  selectedDocId === doc.id
                    ? 'bg-white/[0.03] border-accent-blue shadow-inner'
                    : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                }`}
              >
                <FileText className={`h-4.5 w-4.5 mt-0.5 shrink-0 ${selectedDocId === doc.id ? 'text-accent-blue' : 'text-zinc-500'}`} />
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-zinc-500 font-bold">{doc.id}</div>
                  <div className="text-xs font-bold text-white mt-0.5 truncate">{doc.title}</div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags.map(t => (
                      <span key={t} className="text-[8px] font-semibold bg-white/5 border border-white/5 text-zinc-400 px-1.5 py-0.2 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}

            {filteredDocs.length === 0 && (
              <div className="text-center py-8 text-zinc-500 text-xs">No documents matching your search query.</div>
            )}
          </div>
        </motion.div>

        {/* Right column detailed Document Viewer */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-xl lg:col-span-2 flex flex-col justify-between"
        >
          {(() => {
            return (
              <div className="space-y-6">
                {/* Meta details header */}
                <div className="pb-4 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono font-bold text-accent-blue uppercase">{activeDoc.id}</div>
                    <h2 className="text-md font-bold text-white mt-1">{activeDoc.title}</h2>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      Owner: <span className="text-white font-semibold">{activeDoc.owner}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Updated: <span className="text-white font-semibold">{activeDoc.date}</span>
                    </span>
                  </div>
                </div>

                {/* Section details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Purpose</div>
                    <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.01] border border-white/5 p-3 rounded-lg">
                      {activeDoc.purpose}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Scope</div>
                    <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.01] border border-white/5 p-3 rounded-lg">
                      {activeDoc.scope}
                    </p>
                  </div>
                </div>

                {/* Steps Section */}
                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Operational Execution Steps</div>
                  
                  <div className="space-y-2">
                    {activeDoc.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/60 border border-white/5 text-xs text-zinc-300">
                        <span className="h-5 w-5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-bold font-mono flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <div className="leading-relaxed">
                          <span className="font-bold text-white">{step.split(':')[0]}:</span>
                          {step.includes(':') ? step.substring(step.indexOf(':') + 1) : step}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      </div>

      {/* Guidelines alert */}
      <div className="glass-panel p-4 rounded-xl flex gap-3">
        <CheckCircle2 className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-400 leading-normal">
          <span className="font-bold text-white">Wiki Governance Standard:</span> All SOP modifications must be submitted via Architecture Decision Records (ADRs) and be approved by the CTO prior to deployment, ensuring that operational parameters align with company compliance benchmarks.
        </div>
      </div>
    </motion.div>
  );
}
