/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface FooterProps {
  onResetHome: () => void;
}

export default function Footer({ onResetHome }: FooterProps) {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-white" id="app-footer">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Block: Vector Brand logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={onResetHome}
              className="flex items-center gap-1.5 font-bold text-lg text-blue-900 font-sans cursor-pointer"
              id="footer-brand-logo-btn"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-700 text-white font-serif text-xs font-bold italic">S</span>
              <span>SkillNova</span>
            </button>
          </div>

          {/* Center Block: Exact visual text copy copyright */}
          <div className="text-center font-sans text-xs text-slate-500 md:order-1 select-none" id="footer-copyright">
            © 2024 SkillNova. Elevating Human Intelligence.
          </div>

          {/* Right Block: Core navigation safety links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500" id="footer-links">
            {['Terms', 'Privacy', 'Careers', 'Support'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Detailed ${link} workspace parameters are loaded into the main context repository successfully.`);
                }}
                className="hover:text-[#0252D9] transition-colors cursor-pointer"
                id={`footer-link-${link.toLowerCase()}`}
              >
                {link}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
