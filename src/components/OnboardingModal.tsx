/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selections: { focus: string; method: string; goal: string }) => void;
}

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [focus, setFocus] = useState('');
  const [method, setMethod] = useState('');
  const [goal, setGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setStep(1);
    setFocus('');
    setMethod('');
    setGoal('');
    setIsSubmitting(false);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        onComplete({ focus, method, goal });
        setIsSubmitting(false);
        setStep(4); // completion screen
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => { onClose(); resetForm(); }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          id="onboarding-modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl z-10"
          id="onboarding-modal-content"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-6 text-white text-left">
            <div className="absolute top-0 right-0 -mr-16 -mt-8 h-40 w-40 rounded-full bg-white/5 blur-xl" />
            <button
              onClick={() => { onClose(); resetForm(); }}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-all hover:bg-white/10 p-1.5 rounded-full"
              aria-label="Close onboarding modal"
              id="onboarding-close-btn"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                <Brain className="text-white h-4 w-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-100">AI Placement Path</span>
            </div>
            <h3 className="mt-2 text-xl font-bold font-serif">Configure Your Learning Cognitive Map</h3>
            <p className="mt-1 text-xs text-blue-100/90 leading-relaxed">
              Answer 3 brief conceptual indicators to tune SkillNova to your specific mental profile.
            </p>
          </div>

          {/* Progress Indicator */}
          {step <= 3 && (
            <div className="flex h-1.5 w-full bg-slate-100" id="onboarding-progress-container">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          {/* Modal Body */}
          <div className="px-6 py-6 text-left">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
                id="onboarding-step-1"
              >
                <label className="block text-sm font-semibold text-slate-950">
                  1. What is your primary learning focus right now?
                </label>
                <p className="text-xs text-slate-500">This helps align the terminology suggested by the cognitive engine.</p>
                <div className="space-y-2.5 pt-1">
                  {[
                    'Formal Logic & Mathematics',
                    'Human-Computer Co-design & UI Systems',
                    'AI Orchestration & LLM Architectures',
                    'Critical Philosophy & Epistemic Ethics'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFocus(option)}
                      id={`focus-opt-${option.replace(/\s+/g, '-').toLowerCase()}`}
                      className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left text-sm transition-all duration-200 cursor-pointer ${
                        focus === option
                          ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-medium shadow-sm'
                          : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-800'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border text-white ${
                        focus === option ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}>
                        {focus === option && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
                id="onboarding-step-2"
              >
                <label className="block text-sm font-semibold text-slate-950">
                  2. How do you prefer to absorb abstract structures?
                </label>
                <p className="text-xs text-slate-500">Adjusts formatting options and progress indicators inside your modules.</p>
                <div className="space-y-2.5 pt-1">
                  {[
                    'Interactive Diagrams & Analytical Maps',
                    'Socratic Q&A Debating with AI cohorts',
                    'Practical Code Walkthroughs & Sandbox Playgrounds',
                    'In-Depth Academic Papers & Logical Proofs'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setMethod(option)}
                      id={`method-opt-${option.replace(/\s+/g, '-').toLowerCase()}`}
                      className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left text-sm transition-all duration-200 cursor-pointer ${
                        method === option
                          ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-medium shadow-sm'
                          : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-800'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border text-white ${
                        method === option ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}>
                        {method === option && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
                id="onboarding-step-3"
              >
                <label className="block text-sm font-semibold text-slate-950">
                  3. What is your chief operational goal on SkillNova?
                </label>
                <p className="text-xs text-slate-500">Tunes the default workspace tiles to promote this activity on login.</p>
                <div className="space-y-2.5 pt-1">
                  {[
                    'Bartering skills and logical training with experts',
                    'Generating dynamic, self-paced learning structures',
                    'Exchanging critiques in secure collaborative hubs',
                    'Auditing and mapping proprietary AI logical nodes'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setGoal(option)}
                      id={`goal-opt-${option.replace(/\s+/g, '-').toLowerCase()}`}
                      className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left text-sm transition-all duration-200 cursor-pointer ${
                        goal === option
                          ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-medium shadow-sm'
                          : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-800'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border text-white ${
                        goal === option ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}>
                        {goal === option && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
                id="onboarding-step-4-complete"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 border border-green-100">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-slate-950">Cognitive Alignment Rendered!</h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    SkillNova’s machine learning engine has compiled a custom learning path under <span className="font-semibold text-blue-700">{focus}</span> mapped via <span className="font-semibold text-blue-700">{method}</span>.
                  </p>
                </div>

                <div className="mx-auto max-w-sm rounded-xl bg-slate-50 border border-slate-200 p-4 text-left">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="text-amber-500 shrink-0 mt-0.5" size={16} />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Matched Pathway Title</h5>
                      <p className="text-sm font-semibold text-slate-900 mt-1">
                        Socio-Cognitive Systems Synthesis in {method.split(' ')[0]}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        We have added interactive graphs, 3 key skill trade prospects, and 4 learning milestones to your personalized workspace.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { onClose(); resetForm(); }}
                  id="onboarding-finish-btn"
                  className="mt-2 w-full max-w-sm inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
                >
                  <span>Enter My Personalized Workspace</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* Navigation Drawer Actions */}
            {step < 4 && (
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4" id="onboarding-nav-actions">
                <button
                  disabled={step === 1}
                  onClick={() => setStep(p => p - 1)}
                  id="onboarding-back-btn"
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    step === 1
                      ? 'text-slate-300 pointer-events-none'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Back
                </button>
                <button
                  disabled={
                    (step === 1 && !focus) ||
                    (step === 2 && !method) ||
                    (step === 3 && !goal) ||
                    isSubmitting
                  }
                  onClick={handleNext}
                  id="onboarding-next-btn"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-100 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1.5">
                      <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Synthesizing Path...
                    </span>
                  ) : (
                    <>
                      <span>{step === 3 ? 'Generate My Path' : 'Continue'}</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
