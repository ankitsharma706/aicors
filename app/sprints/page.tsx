'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarCheck2,
  Sparkles,
  Plus,
  Play,
  ArrowRight,
  TrendingUp,
  User,
  CheckCircle2,
  AlertOctagon,
  Clock
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { KanbanTask } from '@/lib/types';
import { EMPLOYEES } from '@/lib/data';

export default function SprintsPage() {
  const tasks = useStore((state) => state.tasks);
  const updateTaskStatus = useStore((state) => state.updateTaskStatus);
  const addTask = useStore((state) => state.addTask);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAssignee, setNewAssignee] = useState(EMPLOYEES[2].name); // Marcus Vance
  const [newPoints, setNewPoints] = useState(3);
  const [newPriority, setNewPriority] = useState<KanbanTask['priority']>('P1');
  const [newCategory, setNewCategory] = useState<KanbanTask['category']>('task');
  const [newEpic, setNewEpic] = useState('Sprint MVP');

  const columns: { id: KanbanTask['status']; label: string; color: string }[] = [
    { id: 'todo', label: 'Todo', color: 'border-t-zinc-600 bg-zinc-950/20' },
    { id: 'in_progress', label: 'In Progress', color: 'border-t-accent-blue bg-accent-blue/5' },
    { id: 'in_review', label: 'In Review', color: 'border-t-accent-purple bg-accent-purple/5' },
    { id: 'qa_ready', label: 'QA Ready', color: 'border-t-amber-500 bg-amber-500/5' },
    { id: 'done', label: 'Done', color: 'border-t-emerald-500 bg-emerald-500/5' }
  ];

  const handleStatusChange = (taskId: string, newStatus: KanbanTask['status']) => {
    updateTaskStatus(taskId, newStatus);
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const assigneeInfo = EMPLOYEES.find(emp => emp.name === newAssignee) || EMPLOYEES[2];

    const newTask: KanbanTask = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      description: newDesc,
      storyPoints: Number(newPoints),
      priority: newPriority,
      assignee: {
        name: assigneeInfo.name,
        role: assigneeInfo.role,
        avatar: assigneeInfo.avatar
      },
      epic: newEpic,
      category: newCategory,
      status: 'todo',
      tags: [newCategory.toUpperCase()]
    };

    addTask(newTask);
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const getPriorityColor = (priority: KanbanTask['priority']) => {
    if (priority === 'P0') return 'bg-red-500/10 border border-red-500/20 text-red-400';
    if (priority === 'P1') return 'bg-orange-500/10 border border-orange-500/20 text-orange-400';
    if (priority === 'P2') return 'bg-accent-blue/10 border border-accent-blue/20 text-accent-blue';
    return 'bg-zinc-800 text-zinc-400';
  };

  // Stats calculation
  const totalStoryPoints = tasks.reduce((sum, t) => sum + t.storyPoints, 0);
  const completedStoryPoints = tasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + t.storyPoints, 0);

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-blue tracking-wider uppercase">
            <CalendarCheck2 className="h-3.5 w-3.5" />
            <span>Agile Delivery Operations</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 mt-1">
            Sprint Control Desk
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Real-time Kanban status, sprint velocity tracking, and workload allocations.</p>
        </div>

        {/* Actions bar */}
        <div className="flex items-center gap-3">
          <div className="glass-panel px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs text-zinc-400">
            <Clock className="h-3.5 w-3.5 text-accent-purple" />
            <span>Daily Standup: <span className="text-white font-semibold">09:30 AM EST</span></span>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-blue hover:bg-accent-blue/80 text-white font-bold text-xs shadow-lg shadow-accent-blue/20 transition-all hover:scale-102"
          >
            <Plus className="h-4 w-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Sprint Velocity progress cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Active Sprint</div>
          <div className="text-md font-bold text-white mt-1">Sprint 24 (Q2-A)</div>
          <div className="text-[9px] text-accent-blue mt-1">May 14 — May 28, 2026</div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Target Velocity</div>
          <div className="text-xl font-bold text-white mt-1">25 Story Points</div>
          <div className="text-[9px] text-zinc-500 mt-1">Committed workload target</div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Velocity Completed</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {completedStoryPoints} / {totalStoryPoints} Points
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-400"
              style={{ width: `${(completedStoryPoints / (totalStoryPoints || 1)) * 100}%` }}
            />
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-[10px] text-zinc-500 uppercase font-semibold">Sprint Health</div>
          <div className="text-xl font-bold text-white mt-1">On Track</div>
          <div className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>0 blockers flagged</span>
          </div>
        </div>
      </div>

      {/* Add Task Popover Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-6 rounded-xl border border-accent-blue/20 bg-zinc-950/60"
          >
            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
                  Create New Sprint Task
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-zinc-500 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase">Task Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Implement OAuth rate limiter"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-zinc-600 focus:border-accent-blue outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase">Epic / Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Security Overhaul"
                    value={newEpic}
                    onChange={(e) => setNewEpic(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-zinc-600 focus:border-accent-blue outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-zinc-400 uppercase">Task Description</label>
                <textarea
                  placeholder="Details of story criteria..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-2 text-xs text-white placeholder-zinc-600 focus:border-accent-blue outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase">Assignee</label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                  >
                    {EMPLOYEES.map(emp => (
                      <option key={emp.name} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase">Story Points</label>
                  <select
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                  >
                    {[1, 2, 3, 5, 8, 13].map(pt => (
                      <option key={pt} value={pt}>{pt} Points</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as KanbanTask['priority'])}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                  >
                    <option value="P0">P0 (Critical)</option>
                    <option value="P1">P1 (High)</option>
                    <option value="P2">P2 (Medium)</option>
                    <option value="P3">P3 (Low)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as KanbanTask['category'])}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                  >
                    <option value="story">Story</option>
                    <option value="task">Task / Config</option>
                    <option value="bug">Bugfix</option>
                    <option value="spike">Spike Research</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1 flex items-end">
                  <button
                    type="submit"
                    className="w-full h-9 rounded-lg bg-accent-blue hover:bg-accent-blue/80 text-white font-bold text-xs transition-all"
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="flex flex-col gap-3">
              {/* Lane Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5 select-none px-1">
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    col.id === 'todo'
                      ? 'bg-zinc-500'
                      : col.id === 'in_progress'
                      ? 'bg-accent-blue animate-pulse'
                      : col.id === 'in_review'
                      ? 'bg-accent-purple'
                      : col.id === 'qa_ready'
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`} />
                  <span className="text-xs font-bold text-white">{col.label}</span>
                </div>
                <span className="text-[10px] font-semibold text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Lane cards sandbox */}
              <div className={`flex-1 min-h-[380px] rounded-xl p-2 border border-white/[0.03] space-y-2 flex flex-col justify-start transition-all ${col.color}`}>
                <AnimatePresence>
                  {colTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layoutId={`task-card-${task.id}`}
                      className="glass-panel p-3.5 rounded-xl border border-white/5 hover:border-white/15 cursor-grab space-y-3 relative group transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono font-semibold">{task.id}</span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-[11px] font-bold text-white leading-snug group-hover:text-accent-blue transition-colors">
                          {task.title}
                        </h4>
                        <p className="text-[10px] text-zinc-400 leading-relaxed truncate">{task.description}</p>
                      </div>

                      {/* Info bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] text-zinc-500">
                        <div className="flex items-center gap-1">
                          <div className="h-4 w-4 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
                            {task.assignee.avatar ? (
                              <img src={task.assignee.avatar} alt={task.assignee.name} className="object-cover h-full w-full" />
                            ) : (
                              <User className="h-3 w-3 text-zinc-400" />
                            )}
                          </div>
                          <span className="max-w-[70px] truncate">{task.assignee.name.split(' ')[0]}</span>
                        </div>

                        <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-semibold text-[9px] text-white">
                          <span>{task.storyPoints} SP</span>
                        </div>
                      </div>

                      {/* Dynamic status changer controls */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value as KanbanTask['status'])}
                          className="bg-zinc-900 border border-white/20 text-[9px] text-white rounded p-0.5 outline-none font-bold"
                        >
                          <option value="todo">Todo</option>
                          <option value="in_progress">In Progress</option>
                          <option value="in_review">In Review</option>
                          <option value="qa_ready">QA Ready</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {colTasks.length === 0 && (
                  <div className="flex-1 flex items-center justify-center border border-dashed border-white/5 rounded-xl py-12">
                    <span className="text-[10px] text-zinc-600 select-none">No active tasks</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
