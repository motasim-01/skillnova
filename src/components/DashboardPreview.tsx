/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Eye, Milestone, ChartArea } from 'lucide-react';

interface DashboardPreviewProps {
  onExploreDashboard: () => void;
  generatedImagePath: string;
}

export default function DashboardPreview({ onExploreDashboard, generatedImagePath }: DashboardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative mx-auto mt-4 max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24" id="dashboard-preview-wrapper">
      {/* Ambient background glow behind the preview screen frame */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full blur-[80px] opacity-60 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.12)_0%,_rgba(59,130,246,0.06)_50%,_transparent_100%)]" />

      {/* Screen/Laptop Mockup Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onExploreDashboard}
        className="group relative overflow-hidden rounded-2xl border border-slate-205 bg-slate-50 p-2 sm:p-3.5 shadow-2xl transition-all hover:border-blue-250 cursor-pointer"
        id="dashboard-preview-frame"
      >
        {/* Soft high-end display notch/header dots representing an actual application frame */}
        <div className="flex items-center justify-between border-b border-slate-150 bg-white px-4 py-3 rounded-t-xl">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-slate-200" />
            <div className="h-3 w-3 rounded-full bg-slate-200" />
            <div className="h-3 w-3 rounded-full bg-slate-200" />
          </div>
          {/* Mock URL bar */}
          <div className="hidden sm:block rounded-md bg-slate-100 text-slate-400 font-mono text-[10px] py-1 px-8 border border-slate-150/50">
            app.skillnova.org/workspace/guided-paths
          </div>
          {/* Mock Connection Indicator */}
          <div className="flex items-center gap-1.5 font-sans text-[10px] text-slate-500 font-medium">
            <span className="block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Guided Sync</span>
          </div>
        </div>

        {/* Dynamic Image Canvas Frame */}
        <div className="relative overflow-hidden aspect-[16/10] bg-slate-950 rounded-b-xl">
          <img
            src={generatedImagePath}
            alt="SkillNova Cognitive Workspace Interactive Learning Dashboard Screen"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            id="dashboard-preview-image"
          />

          {/* Glowing dark hover overlay with interactive test-drive label */}
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 p-5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white animate-bounce shadow-md">
                <Eye size={18} />
              </span>
              <div className="text-center">
                <span className="block text-xs font-bold text-white tracking-wide">Test Drive Live Workspace</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Explore active modules, logic bar charts & Socratic debates</span>
              </div>
            </div>
          </div>

          {/* Interactive micro badge labels placed delicately over the visual preview */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 px-3 py-1 text-[10px] text-cyan-400 font-mono">
              <Milestone size={11} />
              <span>Module Progression Tracker</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 px-3 py-1 text-[10px] text-blue-400 font-mono">
              <ChartArea size={11} />
              <span>Cognitive Load Indicators</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
