'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Network,
  Users2,
  FileCheck2,
  CalendarCheck2,
  Code2,
  Bot,
  CloudLightning,
  ShieldCheck,
  UserCheck2,
  TrendingUp,
  BookOpen,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Activity,
  Sun,
  Moon
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const setCommandPaletteOpen = useStore((state) => state.setCommandPaletteOpen);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const activeTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    setTheme(activeTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  const menuItems = [
    { name: 'AI Command Center', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Organization', icon: Network, path: '/organization' },
    { name: 'Teams', icon: Users2, path: '/teams' },
    { name: 'Responsibilities', icon: FileCheck2, path: '/responsibilities' },
    { name: 'Sprint System', icon: CalendarCheck2, path: '/sprints' },
    { name: 'Engineering', icon: Code2, path: '/engineering' },
    { name: 'AI Operations', icon: Bot, path: '/ai-ops' },
    { name: 'DevOps & Infra', icon: CloudLightning, path: '/devops' },
    { name: 'Security Center', icon: ShieldCheck, path: '/security' },
    { name: 'HR & Ops', icon: UserCheck2, path: '/hr' },
    { name: 'Revenue & Sales', icon: TrendingUp, path: '/revenue' },
    { name: 'Documentation', icon: BookOpen, path: '/docs' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? '70px' : '240px' }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass-panel h-screen sticky top-0 left-0 flex flex-col justify-between p-4 border-r border-card-border shrink-0 z-40 bg-zinc-950/70"
    >
      <div>
        {/* Header Branding */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-accent-purple to-accent-blue flex items-center justify-center shadow-lg shadow-accent-purple/20 shrink-0">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="font-bold text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 whitespace-nowrap"
              >
                AI CoOS
              </motion.span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Global Command Center Search trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-zinc-400 hover:text-white transition-all text-left mb-6 focus:outline-none focus:ring-1 focus:ring-accent-blue/30"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Search className="h-4 w-4 text-zinc-500 shrink-0" />
            {!collapsed && <span className="text-xs text-zinc-500 whitespace-nowrap">Search command palette...</span>}
          </div>
          {!collapsed && (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-medium bg-white/10 text-zinc-400 rounded border border-white/10 shrink-0">
              ⌘K
            </kbd>
          )}
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className="relative">
                <div
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <item.icon
                    className={`h-4.5 w-4.5 shrink-0 transition-transform ${
                      isActive ? 'text-accent-blue scale-105' : 'text-zinc-500'
                    }`}
                  />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 right-0 top-0 bottom-0 rounded-lg bg-gradient-to-r from-accent-blue/10 to-accent-purple/5 border-l-2 border-accent-blue -z-10 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / System Status */}
      <div className="border-t border-white/5 pt-4 space-y-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-zinc-400 hover:text-white transition-all text-xs font-semibold focus:outline-none"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-amber-400 shrink-0" />
                {!collapsed && <span className="whitespace-nowrap">Light Theme</span>}
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-accent-blue shrink-0" />
                {!collapsed && <span className="whitespace-nowrap">Dark Theme</span>}
              </>
            )}
          </div>
          {!collapsed && (
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
              {theme === 'dark' ? 'dark' : 'light'}
            </span>
          )}
        </button>

        {/* Profile Info */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="relative h-6 w-6 rounded-full overflow-hidden border border-white/15 bg-zinc-900 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=50&h=50&q=80"
                alt="Sarah Chen"
                className="object-cover"
              />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden"
              >
                <div className="text-[11px] font-semibold text-white truncate">Sarah Chen</div>
                <div className="text-[9px] text-accent-blue font-medium uppercase tracking-wider truncate">CTO & Co-Founder</div>
              </motion.div>
            )}
          </div>
          {!collapsed && (
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
