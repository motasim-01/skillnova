/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenOnboarding: () => void;
  onOpenVideoDemo: () => void;
}

export default function Hero({ onOpenOnboarding, onOpenVideoDemo }: HeroProps) {
  return (
    <section className="relative overflow-visible py-20 lg:py-28 text-center" id="hero-section">
      {/* Background Ambient Radial Glow matching the visual reference */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full blur-[100px] opacity-70 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.14)_0%,_rgba(139,92,246,0.05)_40%,_transparent_75%)]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Badge: ✨ Introducing AI-Guided Paths */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            id="hero-badge"
            onClick={onOpenOnboarding}
            className="group inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/40 px-3.5 py-1.5 text-xs font-semibold text-blue-800 backdrop-blur-md shadow-sm hover:border-blue-305 transition-all cursor-pointer select-none"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              {/* Mental focus / compass spark lightbulb emblem representing AI path */}
              <Sparkles className="h-2.5 w-2.5" />
            </span>
            <span className="tracking-wide">Introducing AI-Guided Paths</span>
          </motion.div>

          {/* Heading Display */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-slate-900"
            id="hero-heading-container"
          >
            <h1 className="text-4xl font-extrabold tracking-tight font-serif sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12]">
              Elevate Your Potential with
              <span className="block mt-1 sm:mt-2 text-blue-600 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
                AI-Guided Learning
              </span>
            </h1>
          </motion.div>

          {/* Subheading Body Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            id="hero-subheading"
            className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-slate-600 font-sans"
          >
            Experience a lucid, digital workspace bridging traditional scholarly authority
            with cutting-edge technology. Master new skills through personalized,
            cognitive-friendly modules.
          </motion.p>

          {/* Call to Actions Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            id="hero-cta-actions"
            className="mt-8 flex flex-row items-center justify-center gap-4 w-full sm:w-auto px-4"
          >
            {/* Get Started Solid Button */}
            <button
              onClick={onOpenOnboarding}
              id="hero-get-started-btn"
              className="px-6 py-3 rounded-md bg-[#0252D9] hover:bg-[#0047ca] text-white font-semibold text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              Get Started
            </button>

            {/* Watch Demo Outlined Play Button */}
            <button
              onClick={onOpenVideoDemo}
              id="hero-watch-demo-btn"
              className="px-6 py-3 rounded-md border border-slate-200/80 bg-[#f4f7fe]/90 hover:bg-[#eaeefc]/90 text-[#0f2942] hover:text-blue-900 font-semibold text-sm inline-flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0252D9] text-white shrink-0">
                <Play className="fill-white stroke-none h-2 w-2 ml-0.5" />
              </div>
              <span>Watch Demo</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
