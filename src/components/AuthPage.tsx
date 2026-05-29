/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Linkedin, ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  defaultMode?: 'login' | 'signup';
  onLoginSuccess: (email: string) => void;
  onBackToHome: () => void;
}

export default function AuthPage({
  defaultMode = 'signup',
  onLoginSuccess,
  onBackToHome,
}: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please populate all required fields.');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    // Success login/signup
    onLoginSuccess(email.trim());
  };

  const handleSocialMockClick = (provider: string) => {
    onLoginSuccess(`academic.${provider.toLowerCase()}@skillnova.edu`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#EEF2FF] to-[#E2E8F0] relative font-sans select-none" id="auth-page-container">
      {/* Floating Back to Home button at the top header area of the page */}
      <div className="absolute top-6 left-6" id="auth-back-home-wrapper">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-[#0252D9] hover:bg-white bg-slate-50 border border-slate-200/60 rounded-xl shadow-sm transition-all cursor-pointer"
          id="auth-global-back-home-btn"
        >
          <ArrowLeft size={14} className="text-[#0252D9]" />
          <span>Back to Landing</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-250/30 text-center"
        id="auth-card-panel"
      >
        {/* Brand logo header exactly matches visual reference */}
        <div className="mb-8" id="auth-brand-header">
          <h1 className="font-serif font-extrabold text-[#0252D9] text-[40px] tracking-tight leading-none mb-1 text-center" id="auth-brand-logo-title">
            SkillNova
          </h1>
          <p className="text-xs font-medium text-slate-500 tracking-wide text-center" id="auth-brand-logo-subtitle">
            Elevating Human Intelligence
          </p>
        </div>

        {/* Tab switch exactly matching pill button structure in reference image */}
        <div className="bg-slate-100 p-1 rounded-xl grid grid-cols-2 gap-1 mb-6 border border-slate-200/40" id="auth-mode-tab-bar">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`py-2 text-[13px] font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            id="auth-mode-login-tab"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`py-2 text-[13px] font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-550 hover:text-slate-800'
            }`}
            id="auth-mode-signup-tab"
          >
            Sign Up
          </button>
        </div>

        {/* Error notice if present */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-750 text-xs text-left font-medium" id="auth-error-panel">
            {errorMsg}
          </div>
        )}

        {/* Social Mock Buttons Container matches original button layouts */}
        <div className="space-y-3" id="auth-social-logins">
          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => handleSocialMockClick('Google')}
            className="w-full relative flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-3 text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer"
            id="auth-social-google-btn"
          >
            <div className="hidden sm:flex h-5 w-5 items-center justify-center bg-slate-50 border border-slate-200/80 rounded" id="auth-social-google-logo-box">
              <span className="text-[11px] font-black text-slate-600">G</span>
            </div>
            <span>{mode === 'login' ? 'Continue with Google' : 'Sign Up with Google'}</span>
          </button>

          {/* Continue with LinkedIn */}
          <button
            type="button"
            onClick={() => handleSocialMockClick('LinkedIn')}
            className="w-full relative flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-3 text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer"
            id="auth-social-linkedin-btn"
          >
            <Linkedin size={14} className="text-[#0077B5]" />
            <span>{mode === 'login' ? 'Continue with LinkedIn' : 'Sign Up with LinkedIn'}</span>
          </button>
        </div>

        {/* OR EMAIL divider with horizontal rule layout */}
        <div className="flex items-center gap-4 my-6 text-[10px] uppercase tracking-wider font-extrabold text-slate-400" id="auth-form-divider">
          <div className="h-[1px] bg-slate-200/80 flex-1" />
          <span>or email</span>
          <div className="h-[1px] bg-slate-200/80 flex-1" />
        </div>

        {/* Form Inputs and Interactive Submit Controls */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left" id="auth-interactive-form">
          <div id="auth-email-field-group">
            <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="auth-email">
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0252D9] focus:ring-1 focus:ring-blue-100 transition-all text-xs font-semibold"
            />
          </div>

          <div id="auth-password-field-group">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700" htmlFor="auth-password">
                Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert("Cognitive recovery protocol: check email for code compilation vectors.")}
                  className="text-[10px] text-[#0252D9] hover:underline font-bold transition-all cursor-pointer"
                  id="auth-forgot-password-link"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0252D9] focus:ring-1 focus:ring-blue-100 transition-all text-xs font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                id="auth-toggle-password-visibility"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div id="auth-confirm-password-field-group">
              <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="auth-confirm-password">
                Confirm Password
              </label>
              <input
                id="auth-confirm-password"
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0252D9] focus:ring-1 focus:ring-blue-100 transition-all text-xs font-semibold"
              />
            </div>
          )}

          {/* Core submit CTA matching deep blue color code */}
          <button
            type="submit"
            className="w-full bg-[#0252D9] hover:bg-[#0047ca] text-white py-3.5 px-4 font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg shadow-blue-500/10 active:scale-[0.98] cursor-pointer mt-2 text-center"
            id="auth-submit-action-btn"
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {/* Legal Disclaimer Subtext exactly from visual representation */}
        <p className="text-[10px] text-slate-400 mt-6 leading-relaxed text-center" id="auth-disclaimer-text">
          By continuing, you agree to our{' '}
          <a href="#" className="font-semibold text-slate-500 hover:text-[#0252D9] underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-semibold text-slate-500 hover:text-[#0252D9] underline">
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
