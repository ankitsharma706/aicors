'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, CornerDownLeft, Bot } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const chatMessages = useStore((state) => state.chatMessages);
  const sendMessage = useStore((state) => state.sendChatMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: 'Database scaling', text: 'How do we scale our database?' },
    { label: 'Git strategy', text: 'What is our git branching model?' },
    { label: 'RACI rules', text: 'Explain the RACI responsibilities' },
    { label: 'On-call & Rollbacks', text: 'What is our rollback procedure and SLAs?' }
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Mini Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            onClick={() => setIsOpen(true)}
            className="h-12 w-12 rounded-full bg-gradient-to-tr from-accent-purple to-accent-blue text-white flex items-center justify-center shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/50 border border-white/20 transition-all group hover:scale-105"
          >
            <Bot className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-accent-blue border border-zinc-950 animate-pulse flex items-center justify-center">
              <Sparkles className="h-2 w-2 text-white" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-panel-glow-purple w-[380px] h-[500px] rounded-xl flex flex-col justify-between overflow-hidden shadow-2xl border border-accent-purple/20 bg-zinc-950/95"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-gradient-to-r from-accent-purple/10 to-accent-blue/10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
                  <Bot className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    CoOS AI Copilot
                    <span className="inline-block px-1.5 py-0.5 text-[8px] bg-accent-purple/20 border border-accent-purple/30 text-accent-purple rounded font-medium tracking-wide">ACTIVE</span>
                  </div>
                  <div className="text-[9px] text-zinc-500">Intelligent Blueprint Knowledge Base</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-accent-blue text-white rounded-br-none shadow-md shadow-accent-blue/10'
                      : 'bg-white/[0.04] border border-white/5 text-zinc-300 rounded-bl-none'
                  }`}>
                    {msg.text}
                    <div className={`text-[8px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-white/60' : 'text-zinc-500'
                    }`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts & Input Area */}
            <div className="p-3 border-t border-white/5 bg-white/[0.01]">
              {/* Quick Prompts list */}
              {chatMessages.length === 1 && (
                <div className="mb-3 space-y-1">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Suggested Questions:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt.label}
                        onClick={() => sendMessage(prompt.text)}
                        className="text-[10px] bg-white/[0.03] hover:bg-accent-purple/10 border border-white/5 hover:border-accent-purple/20 text-zinc-400 hover:text-accent-purple px-2.5 py-1 rounded-md transition-all text-left"
                      >
                        {prompt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="relative flex items-center">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a blueprint question..."
                  rows={1}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-3 pr-10 text-xs text-white placeholder-zinc-500 outline-none resize-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 max-h-16"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-1.5 p-1.5 rounded-md bg-accent-purple text-white hover:bg-accent-purple-600 transition-colors shadow-md shadow-accent-purple/20"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
              <div className="mt-1 text-[8px] text-zinc-600 text-right flex items-center justify-end gap-1 select-none">
                <span>Enter to send</span>
                <CornerDownLeft className="h-2 w-2" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
