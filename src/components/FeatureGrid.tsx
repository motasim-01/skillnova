/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Store, Users, BrainCircuit, ArrowUpRight } from 'lucide-react';
import { AppTab } from '../types';

interface FeatureGridProps {
  onSelectTab: (tab: AppTab) => void;
}

export default function FeatureGrid({ onSelectTab }: FeatureGridProps) {
  const cards = [
    {
      id: 'skill-exchange',
      title: 'Skill Exchange',
      description: 'Trade expertise seamlessly in a sophisticated marketplace designed for professional growth.',
      icon: Store,
      iconBg: 'bg-blue-50 text-blue-600',
      iconBorder: 'border-blue-100',
      tabTarget: 'marketplace' as AppTab,
      isActiveStyle: false,
    },
    {
      id: 'community-groups',
      title: 'Community Groups',
      description: 'Join focused cohorts of learners. Minimalist collaboration tools reduce noise and increase insight.',
      icon: Users,
      iconBg: 'bg-emerald-50 text-emerald-600',
      iconBorder: 'border-emerald-100',
      tabTarget: 'community' as AppTab,
      isActiveStyle: true, // Highlights the middle card matching the reference image active state
    },
    {
      id: 'ai-recommendations',
      title: 'AI Recommendations',
      description: 'Our cognitive engine maps your learning path, suggesting optimal modules based on your pace.',
      icon: BrainCircuit,
      iconBg: 'bg-indigo-50 text-indigo-600',
      iconBorder: 'border-indigo-100',
      tabTarget: 'dashboard' as AppTab,
      isActiveStyle: false,
    },
  ];

  return (
    <section className="bg-slate-50/50 py-20 lg:py-28" id="architecture-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Title Heading info */}
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold font-serif text-slate-900 sm:text-4xl lg:text-5xl tracking-normal">
            The Architecture of Learning
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-sans">
            Built for momentum and cognitive ease.
          </p>
        </div>

        {/* Feature Grid: 3 Column Blocks */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" id="features-cards-grid">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onSelectTab(card.tabTarget)}
                className={`relative p-8 text-left rounded-2xl transition-all hover:shadow-xl cursor-pointer bg-white ${
                  card.isActiveStyle
                    ? 'border border-blue-200/80 shadow-md ring-4 ring-blue-50/20'
                    : 'border border-slate-200/60 shadow-sm hover:border-slate-300'
                }`}
                id={`feature-card-${card.id}`}
              >
                {/* Floating Top Arrow Indicator for interactive feel */}
                <div className="absolute top-6 right-6 text-slate-350 group-hover:text-blue-600 transition-colors">
                  <ArrowUpRight size={16} />
                </div>

                {/* Left aligned styled circle housing the vector icon */}
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${card.iconBg} ${card.iconBorder}`} id={`icon-${card.id}`}>
                  <IconComponent size={20} className="stroke-[2]" />
                </div>

                {/* Card Headers */}
                <h3 className="mt-6 text-lg font-bold text-slate-900 font-sans tracking-tight">
                  {card.title}
                </h3>

                {/* Card Body Copy matches EXACT string */}
                <p className="mt-3.5 text-sm leading-relaxed text-slate-600">
                  {card.description}
                </p>

                {/* Interactive Status Footer */}
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700">
                  <span>Explore {card.title}</span>
                  <span className="transition-transform duration-200 translate-x-0 group-hover:translate-x-0.5">&rarr;</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
