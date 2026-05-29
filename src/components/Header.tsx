/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppTab, NotificationItem } from '../types';
import { Bell, Settings, BadgeCheck, Check, Trash2, Sliders, VolumeX, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  onClearNotifications: () => void;
  fontPreference: 'standard' | 'dyslexic' | 'serif';
  onChangeFont: (pref: 'standard' | 'dyslexic' | 'serif') => void;
  isLoggedIn?: boolean;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onLogout?: () => void;
}

export default function Header({
  currentTab,
  onTabChange,
  notifications,
  onMarkRead,
  onClearNotifications,
  fontPreference,
  onChangeFont,
  isLoggedIn = false,
  onOpenAuth,
  onLogout,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/85 bg-white/95 backdrop-blur-md" id="app-header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { onTabChange('home'); setShowNotifications(false); setShowSettings(false); }}
            className="flex items-center gap-2 group cursor-pointer text-left"
            id="header-brand-logo-btn"
          >
            {/* Elegant minimal visual representational vector logo of SkillNova */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#0252D9] text-white shadow-sm group-hover:bg-[#0047ca] transition-colors">
              <span className="font-serif font-extrabold text-lg italic tracking-tight">S</span>
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-blue-900 font-sans group-hover:text-blue-950 transition-colors">
              SkillNova
            </span>
          </button>
        </div>

        {/* Center: Interactive Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation" id="header-nav-menu">
          {(['marketplace', 'community', 'dashboard'] as const).map((tab) => {
            const label = tab.charAt(0).toUpperCase() + tab.slice(1);
            const isActive = currentTab === tab;
            return (
              <button
                key={tab}
                onClick={() => { onTabChange(tab); setShowNotifications(false); setShowSettings(false); }}
                id={`nav-${tab}`}
                className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg'
                }`}
              >
                <span>{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeHeaderTab"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Tools & Configurations */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Notifications Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={() => { setShowNotifications(!showNotifications); setShowSettings(false); setShowProfileMenu(false); }}
                  id="header-notifications-trigger"
                  className={`p-2 rounded-xl transition-all relative cursor-pointer ${
                    showNotifications ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  title="Notifications"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Panel overlay */}
                <AnimatePresence>
                  {showNotifications && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl z-20 text-left"
                        id="header-notifications-dropdown"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Activity Alerts</span>
                          {unreadCount > 0 && (
                            <button
                              onClick={onClearNotifications}
                              className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-rose-600 font-medium transition-colors"
                              id="clear-all-notifs-btn"
                            >
                              <Trash2 size={12} /> Clear all
                            </button>
                          )}
                        </div>

                        <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                          {notifications.length === 0 ? (
                            <div className="p-6 text-center text-slate-400">
                              <BadgeCheck className="mx-auto h-8 w-8 text-slate-300 stroke-1" />
                              <p className="mt-2 text-xs">All notifications are caught up!</p>
                            </div>
                          ) : (
                            notifications.map((item) => (
                              <div
                                key={item.id}
                                className={`p-3.5 text-xs transition-colors relative hover:bg-slate-50 ${
                                  !item.read ? 'bg-blue-50/20' : ''
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className={`leading-relaxed ${!item.read ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                                    {item.message}
                                  </p>
                                  {!item.read && (
                                    <button
                                      onClick={() => onMarkRead(item.id)}
                                      className="shrink-0 text-blue-600 hover:text-blue-800 p-0.5"
                                      title="Mark as read"
                                      id={`mark-read-btn-${item.id}`}
                                    >
                                      <Check size={14} className="stroke-[3]" />
                                    </button>
                                  )}
                                </div>
                                <span className="block mt-1 font-mono text-[9px] text-slate-400">{item.time}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Config Settings Panel Trigger */}
              <div className="relative">
                <button
                  onClick={() => { setShowSettings(!showSettings); setShowNotifications(false); setShowProfileMenu(false); }}
                  id="header-settings-trigger"
                  className={`p-2 rounded-xl transition-all relative cursor-pointer ${
                    showSettings ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  title="Cognitive Preference System"
                >
                  <Settings size={20} className={showSettings ? 'rotate-45 duration-350 transition-transform' : 'transition-transform'} />
                </button>

                {/* Quick Settings Panel overlay */}
                <AnimatePresence>
                  {showSettings && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowSettings(false)} />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl z-20 text-left p-4 space-y-4"
                        id="header-settings-dropdown"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                            <Sliders size={13} className="text-blue-600" /> Cognitive Personalization
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-1">Adjust sensory parameters to suit absolute focal ease.</p>
                        </div>

                        {/* Font Personalization Selector */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">Typography Tuning</label>
                          <div className="grid grid-cols-3 gap-1">
                            {[
                              { id: 'standard', label: 'Inter' },
                              { id: 'dyslexic', label: 'Dyslexic' },
                              { id: 'serif', label: 'Display' },
                            ].map((fontItem) => (
                              <button
                                key={fontItem.id}
                                onClick={() => onChangeFont(fontItem.id as any)}
                                id={`font-pref-btn-${fontItem.id}`}
                                className={`px-2 py-1.5 rounded-lg text-[10px] font-medium border text-center cursor-pointer transition-all ${
                                  fontPreference === fontItem.id
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-250'
                                }`}
                              >
                                {fontItem.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-3">
                          <div className="flex items-center justify-between text-xs text-slate-700">
                            <span className="font-medium">Reduced Ambient Animations</span>
                            <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out">
                              <div className="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-blue-50/50 p-2.5 text-[10px] text-blue-700 leading-normal border border-blue-100/30">
                          Settings are calibrated in real-time to your local user environment profile.
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Icon Next To Settings Icon */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
                  alt="Elite Scholar Profile"
                  referrerPolicy="no-referrer"
                  className="h-8 w-8 rounded-full cursor-pointer object-cover border border-[#0252D9]/40 hover:ring-2 hover:ring-[#0252D9] transition-all shadow-sm"
                  id="header-profile-avatar-btn"
                  onClick={() => { setShowProfileMenu(!showProfileMenu); setShowSettings(false); setShowNotifications(false); }}
                />

                <AnimatePresence>
                  {showProfileMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl z-20 text-left p-2.5 space-y-1.5"
                        id="header-profile-dropdown"
                      >
                        <div className="px-2 py-1.5 border-b border-slate-100">
                          <p className="text-[11px] font-bold text-[#0252D9]">Scholar Account</p>
                          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5" id="header-user-email">active@skillnova.edu</p>
                        </div>
                        <button
                          onClick={() => { onTabChange('settings'); setShowProfileMenu(false); }}
                          className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-755 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                        >
                          Workspace Settings
                        </button>
                        <button
                          onClick={() => { onLogout?.(); setShowProfileMenu(false); }}
                          className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
                          id="header-logout-btn"
                        >
                          Log Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2" id="header-anonymous-actions">
              <button
                onClick={() => onOpenAuth?.('login')}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-[#0252D9] transition-all cursor-pointer rounded-lg hover:bg-slate-50"
                id="header-login-btn"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth?.('signup')}
                className="px-4.5 py-2 text-xs font-bold text-white bg-[#0252D9] hover:bg-[#0047ca] rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
                id="header-signup-btn"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile view sub-navbar drawer if on small screen */}
      {isLoggedIn && (
        <div className="md:hidden flex h-10 w-full items-center justify-around border-t border-slate-150 bg-slate-50/60" id="header-mobile-tabs">
          {(['marketplace', 'community', 'dashboard'] as const).map((tab) => {
            const label = tab.charAt(0).toUpperCase() + tab.slice(1);
            const isActive = currentTab === tab;
            return (
              <button
                key={tab}
                onClick={() => { onTabChange(tab); setShowNotifications(false); setShowSettings(false); }}
                id={`nav-mobile-${tab}`}
                className={`text-xs font-medium px-4 py-1.5 transition-colors cursor-pointer rounded-md ${
                  isActive ? 'bg-[#0252D9] text-white shadow-sm' : 'text-slate-600'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
