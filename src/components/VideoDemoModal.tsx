/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, MonitorUp, Eye } from 'lucide-react';

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoDemoModal({ isOpen, onClose }: VideoDemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const steps = [
    { title: '1. Epistemic Architecture Overview', text: 'Synthesizing standard visual charts with customizable data hierarchies for absolute clarity.' },
    { title: '2. Socratic Matchmaker Engine', text: 'Analyzing cognitive profiles to identify ideal peers and group learning cohorts.' },
    { title: '3. Skill Bartering Exchange', text: 'Reviewing current ledger options, trade ratings, and learning currency value weights.' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          // Dynamically change visual text cards based on progress milestones
          if (next === 33) setDemoStep(1);
          if (next === 66) setDemoStep(2);
          if (next === 0) setDemoStep(0);
          return next;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          id="video-modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-0 text-white shadow-2xl z-10"
          id="video-modal-content"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <MonitorUp size={12} />
              </span>
              <h4 className="text-sm font-bold tracking-tight">SkillNova Interactive Virtual Demo</h4>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-all hover:bg-white/10 p-1 rounded-full"
              aria-label="Close demo"
              id="video-modal-close-btn"
            >
              <X size={18} />
            </button>
          </div>

          {/* Interactive Player Screen */}
          <div className="relative aspect-video bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
            {/* Mesh gradient or dynamic visual background that triggers on play */}
            <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-950`} />
            
            {/* Visual simulation elements representing the learning system */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between select-none">
              <div className="flex items-start justify-between">
                <div className="bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/10 p-2.5 text-left max-w-[240px] shadow-lg transition-all duration-300">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={8} className="animate-pulse" /> Cognitive Map Simulator
                  </span>
                  <div className="mt-1.5 space-y-1">
                    <div className="h-1 w-24 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-[9px] text-white/70">Resolution Scale: 4.88 Teraflops</p>
                  </div>
                </div>

                <div className="bg-slate-950/85 backdrop-blur-md rounded-lg border border-white/10 px-2.5 py-1 text-center font-mono text-[10px] text-emerald-400">
                  ⚡ DEMO LIVE SYSTEM: {progress}%
                </div>
              </div>

              {/* Central pulse simulator */}
              <div className="relative self-center flex items-center justify-center">
                {isPlaying ? (
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="h-20 w-20 rounded-full border border-blue-500/20 bg-blue-500/5 flex items-center justify-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 border border-cyan-400/40 animate-pulse" />
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-xl border border-blue-400 cursor-pointer"
                    id="video-center-play-btn"
                  >
                    <Play className="fill-current ml-1" size={24} />
                  </button>
                )}
              </div>

              {/* Simulated status cards that update according to demo steps */}
              <div className="bg-slate-950/90 backdrop-blur-xl border border-white/15 px-4 py-3 rounded-xl shadow-2xl text-left max-w-sm self-center sm:self-start w-full transition-all duration-500">
                <span className="text-[9px] uppercase font-bold tracking-wider text-blue-400">CURRENT FOCUS</span>
                <h5 className="font-bold text-xs mt-0.5 text-white">{steps[demoStep].title}</h5>
                <p className="text-[11px] text-slate-300 mt-1 leading-normal">{steps[demoStep].text}</p>
              </div>
            </div>
          </div>

          {/* Player controls */}
          <div className="bg-slate-950 px-6 py-4 border-t border-white/10 flex flex-col gap-3">
            {/* Timeline scrubber bar */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-400">0:{progress.toString().padStart(2, '0')}</span>
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.round((clickX / rect.width) * 100);
                  setProgress(newProgress);
                  if (newProgress < 33) setDemoStep(0);
                  else if (newProgress < 66) setDemoStep(1);
                  else setDemoStep(2);
                }}
                className="relative flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden hover:h-2 transition-all"
                id="player-timeline-scrubber"
              >
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[10px] font-mono text-slate-400">0:59</span>
            </div>

            {/* Controls panel */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white active:scale-90"
                  id="player-play-pause-btn"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={() => { setProgress(0); setDemoStep(0); setIsPlaying(true); }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white"
                  id="player-restart-btn"
                  title="Restart"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsMuted(m => !m)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white"
                  id="player-mute-btn"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              {/* Progress Stepper indicators */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDemoStep(index);
                      setProgress(index === 0 ? 10 : index === 1 ? 45 : 80);
                    }}
                    id={`player-step-btn-${index}`}
                    className={`h-2 rounded-full transition-all ${
                      demoStep === index ? 'w-6 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
