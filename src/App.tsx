/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppTab, NotificationItem, ActiveCourse } from './types';
import { DEMO_NOTIFICATIONS, DEMO_ACTIVE_COURSES } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import DashboardPreview from './components/DashboardPreview';
import FeatureGrid from './components/FeatureGrid';
import InteractiveShowcase from './components/InteractiveShowcase';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import VideoDemoModal from './components/VideoDemoModal';
import AuthPage from './components/AuthPage';
import { 
  Sparkles, 
  X, 
  Milestone, 
  BookOpen, 
  Store, 
  Users2, 
  Bot, 
  Settings as SettingsIcon, 
  HelpCircle, 
  LogOut, 
  Menu, 
  Bell, 
  Plus, 
  Trash2, 
  Check, 
  BadgeCheck,
  Home,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [activeTab, setActiveTab] = useState<AppTab>('home'); // Real users land on 'home' first!
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // App state logic
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);
  const [courses, setCourses] = useState<ActiveCourse[]>(DEMO_ACTIVE_COURSES);
  const [fontPreference, setFontPreference] = useState<'standard' | 'dyslexic' | 'serif'>('standard');
  const [userProfile, setUserProfile] = useState<{ focus: string; method: string; goal: string } | null>(null);
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);

  // Authentication success flow
  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setShowAuthPage(false);
    setActiveTab('dashboard'); // Forward user to learning space
    handleAddNotification(`🔑 Authenticated as ${email}. Welcome to SkillNova!`);
  };

  // Nav routing guard interceptor
  const handleTabChange = (tab: AppTab) => {
    if (tab === 'home') {
      setActiveTab('home');
      return;
    }
    if (!isLoggedIn) {
      setAuthMode('signup');
      setShowAuthPage(true);
      return;
    }
    setActiveTab(tab);
  };

  // Path of the generated dashboard preview asset
  const PREVIEW_IMAGE_PATH = '/src/assets/images/dashboard_preview_1779988711903.png';

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkNotifRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleAddNotification = (message: string) => {
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      message,
      time: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleUpdateCourseProgress = (id: string, progress: number) => {
    setCourses(prev =>
      prev.map(course => {
        if (course.id === id) {
          const finished = progress >= 100;
          const status = finished ? 'Completed' : progress > 0 ? 'In Progress' : 'Up Next';
          
          if (finished && course.status !== 'Completed') {
            handleAddNotification(`🎉 Congratulations! You completed "${course.title}" and unlocked level proof certification.`);
          }
          
          return {
            ...course,
            progress,
            status,
            completedHours: parseFloat(((progress / 100) * course.totalHours).toFixed(2)),
          };
        }
        return course;
      })
    );
  };

  const handleOnboardingComplete = (selections: { focus: string; method: string; goal: string }) => {
    setUserProfile(selections);
    
    const selectionCourse: ActiveCourse = {
      id: `course-onboarding-${Date.now()}`,
      title: `Epistemic Synthesizer in ${selections.focus.split(' ')[0]}`,
      progress: 10,
      totalHours: 24,
      completedHours: 2.4,
      status: 'In Progress',
      category: selections.focus,
    };
    
    setCourses(prev => [selectionCourse, ...prev]);
    handleAddNotification(`⚡ AI cognitive mapping complete! Custom Pathway "${selectionCourse.title}" loaded successfully.`);
  };

  const getFontClass = () => {
    if (fontPreference === 'dyslexic') return 'font-mono [font-family:Lexend,sans-serif] tracking-wide leading-relaxed';
    if (fontPreference === 'serif') return 'font-serif';
    return 'font-sans';
  };

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Greetings, Elite Scholar. I am your Socratic Mentor. How shall we stress-test your knowledge of Qubits or Neural Networks today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let responseText = "Excellent inquiry. Let us deconstruct that from first principles. How does your model weigh theoretical risk compared to raw computational capability?";
      if (userMsg.toLowerCase().includes('qubit') || userMsg.toLowerCase().includes('quantum')) {
        responseText = "Quantum superposition is indeed tricky. Think of Qubits not as static values, but as state-space vectors rotating through a Bloch sphere. What changes when we apply a Hadamard gate?";
      } else if (userMsg.toLowerCase().includes('neural') || userMsg.toLowerCase().includes('network')) {
        responseText = "Deep learning is fundamentally linear algebra in extremely high dimensions. When gradients vanish, we lose our path. Have you considered residual connections to preserve the cognitive load?";
      } else if (userMsg.toLowerCase().includes('ethics') || userMsg.toLowerCase().includes('bias')) {
        responseText = "AI alignment cannot be solved through purely technical constraints. It requires deontological frameworks applied dynamically to objective parameters. What is your optimization function for fairness?";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
    }, 1000);
  };

  const getMenuLinkClass = (tab: AppTab) => {
    const isActive = activeTab === tab;
    return `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
      isActive 
        ? 'bg-[#d2e2fc]/70 text-[#0252D9] shadow-sm' 
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
    }`;
  };

  const menuItems = [
    { id: 'dashboard' as AppTab, label: 'My Learning', icon: BookOpen },
    { id: 'marketplace' as AppTab, label: 'Marketplace', icon: Store },
    { id: 'community' as AppTab, label: 'Community', icon: Users2 },
    { id: 'ai-mentor' as AppTab, label: 'AI Mentor', icon: Bot },
    { id: 'settings' as AppTab, label: 'Settings', icon: SettingsIcon },
  ];

  const handleSidebarNav = (tab: AppTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  if (showAuthPage) {
    return (
      <AuthPage
        defaultMode={authMode}
        onLoginSuccess={handleLoginSuccess}
        onBackToHome={() => setShowAuthPage(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-row bg-[#F4F7FE] text-slate-900 transition-all duration-300 ${getFontClass()}`} id="app-root-container">
      
      {/* 1. LEFT PERSISTENT SIDEBAR - Exactly matches layout and style in reference image (Hidden on 'home') */}
      {activeTab !== 'home' && (
        <aside 
          id="app-desktop-sidebar"
          className="hidden md:flex flex-col w-64 bg-[#F4F7FE] border-r border-slate-200/80 h-screen sticky top-0 shrink-0 justify-between py-6 px-4"
        >
          <div className="space-y-6">
            {/* User Profile Section with custom Unsplash scholar portrait */}
            <div className="flex items-center gap-3 px-2 py-1" id="sidebar-profile-card">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" 
                alt="Elite Scholar Profile"
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-full object-cover border border-blue-200 shadow-sm"
                id="sidebar-user-avatar"
              />
              <div className="text-left">
                <h2 className="text-[13px] font-bold text-[#0252D9] leading-tight" id="sidebar-username">Welcome back</h2>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Elite Scholar</p>
              </div>
            </div>

            {/* "+ Start New Lesson" Cobalt Blue Action Button */}
            <button
              onClick={() => setIsOnboardingOpen(true)}
              id="sidebar-start-lesson-btn"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0252D9] hover:bg-[#0047ca] text-white py-3 px-4 text-xs font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <Plus size={14} strokeWidth={3} />
              <span>Start New Lesson</span>
            </button>

            {/* Navigation Items */}
            <nav className="space-y-1 pt-4 text-left" id="sidebar-navigation">
              {menuItems.map(item => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSidebarNav(item.id)}
                    id={`sidebar-item-${item.id}`}
                    className={getMenuLinkClass(item.id)}
                  >
                    <IconComponent size={18} className={activeTab === item.id ? 'text-[#0252D9]' : 'text-slate-500'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom items */}
          <div className="space-y-1 border-t border-slate-200 pt-4" id="sidebar-footer-menu">
            <button 
              onClick={() => alert("SkillNova Academic Help Center is available 24/7. Context logs loaded successfully.")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 cursor-pointer"
              id="sidebar-help-btn"
            >
              <HelpCircle size={16} className="text-slate-500" />
              <span>Help Center</span>
            </button>
            <button 
              onClick={() => {
                if (confirm("Are you sure you want to log out and return to the global Landing page view?")) {
                  setIsLoggedIn(false);
                  setActiveTab('home');
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 cursor-pointer"
              id="sidebar-logout-btn"
            >
              <LogOut size={16} className="text-slate-500" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>
      )}

      {/* MOBILE SHEET/DRAWER SIDEBAR */}
      <AnimatePresence>
        {isMobileMenuOpen && activeTab !== 'home' && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex flex-col w-64 bg-[#F4F7FE] h-full p-5 justify-between shadow-2xl z-10"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" 
                      alt="Elite Scholar Profile"
                      referrerPolicy="no-referrer"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-[#0252D9] leading-none">Welcome back</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Elite Scholar</p>
                    </div>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500">
                    <X size={18} />
                  </button>
                </div>

                <button
                  onClick={() => { setIsOnboardingOpen(true); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0252D9] text-white py-2.5 px-4 text-xs font-bold transition-all shadow-sm"
                >
                  <Plus size={14} />
                  <span>Start New Lesson</span>
                </button>

                <nav className="space-y-1 text-left">
                  {menuItems.map(item => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSidebarNav(item.id)}
                        className={getMenuLinkClass(item.id)}
                      >
                        <IconComponent size={18} className={activeTab === item.id ? 'text-[#0252D9]' : 'text-slate-500'} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-1 border-t border-slate-200 pt-4 text-left">
                <button 
                  onClick={() => { alert("SkillNova Support loaded."); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  <HelpCircle size={15} />
                  <span>Help Center</span>
                </button>
                <button 
                  onClick={() => { setIsLoggedIn(false); setActiveTab('home'); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  <LogOut size={15} />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CHIEF CONTENT PANEL - Renders the selected view screen */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F4F7FE] md:bg-white min-h-screen" id="app-main-content-panel">
        
        {/* Responsive Brand Header for Home/Landing VS App Dashboard-internal header */}
        {activeTab === 'home' ? (
          <Header
            currentTab={activeTab}
            onTabChange={handleTabChange}
            notifications={notifications}
            onMarkRead={handleMarkNotifRead}
            onClearNotifications={handleClearNotifications}
            fontPreference={fontPreference}
            onChangeFont={setFontPreference}
            isLoggedIn={isLoggedIn}
            onOpenAuth={(mode) => { setAuthMode(mode); setShowAuthPage(true); }}
            onLogout={() => { setIsLoggedIn(false); setActiveTab('home'); }}
          />
        ) : (
          /* Mobile Sticky Top Navigation bar for internal application pages */
          <header className="flex md:hidden items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-30" id="app-mobile-nav-bar">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1 px-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
                id="mobile-hamburger-trigger"
              >
                <Menu size={18} />
              </button>
              <span className="text-base font-extrabold tracking-tight text-blue-900 font-sans flex items-center gap-1.5">
                <span className="font-serif italic text-lg px-2 py-0.5 rounded bg-[#0252D9] text-white">S</span>
                <span>SkillNova</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowNotificationOverlay(!showNotificationOverlay)}
                className="p-1.5 rounded-full bg-slate-50 text-slate-600 relative"
              >
                <Bell size={16} />
                {unreadCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />}
              </button>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80" 
                alt="Avatar mobile" 
                className="h-7 w-7 rounded-full object-cover"
                onClick={() => setActiveTab('settings')}
              />
            </div>
          </header>
        )}

        {/* Dynamic Onboarding Welcome Top notification bar */}
        {userProfile && (
          <div className="bg-gradient-to-r from-blue-700 via-indigo-750 to-blue-600 px-4 py-2.5 text-center text-xs font-semibold text-white relative flex items-center justify-center gap-2 shadow-sm" id="onboarding-welcome-toast">
            <Sparkles className="h-4 w-4 animate-pulse text-amber-300 shrink-0" />
            <span>
              Synchronized cognitive profile: Mapped intelligent pathways for <span className="underline italic">{userProfile.focus}</span> via {userProfile.method}.
            </span>
            <button 
              onClick={() => setUserProfile(null)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
              aria-label="Dismiss welcome notification"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Render Tab Screens with accurate animations & zero fallback delays */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'home' ? (
            <div id="landing-marketing-scroller" className="bg-white">
              {/* Marketing Landing Hero View */}
              <Hero
                onOpenOnboarding={() => {
                  if (!isLoggedIn) {
                    setAuthMode('signup');
                    setShowAuthPage(true);
                  } else {
                    setIsOnboardingOpen(true);
                  }
                }}
                onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
              />

              {/* Live Workspace Preview Card Frame */}
              <DashboardPreview
                onExploreDashboard={() => handleTabChange('dashboard')}
                generatedImagePath={PREVIEW_IMAGE_PATH}
              />

              {/* Marketing Blueprint Grid */}
              <FeatureGrid onSelectTab={handleTabChange} />
              
              {/* Main Landing Footer */}
              <Footer onResetHome={() => handleTabChange('home')} />
            </div>
          ) : activeTab === 'settings' ? (
            <div className="max-w-3xl mx-auto px-4 py-10 text-left space-y-8" id="settings-page-view">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('home')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0252D9] transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200"
                  id="settings-back-home-btn"
                >
                  <ArrowLeft size={13} className="text-[#0252D9]" />
                  <span>Back to Home</span>
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 font-serif">Workspace Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Configure your cognitive interface parameter and strain reduction settings in real-time.</p>
              </div>

              {/* Cognitive Alignment Parameters Status if complete */}
              <div className="bg-white rounded-2xl border border-slate-205/90 p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Cognitive Alignment Status</h3>
                {userProfile ? (
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono text-xs">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                      <span>Optimized Cognitive Profile Synchronized</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                        <span className="block text-[9px] uppercase font-bold text-slate-400">Major Focus</span>
                        <span className="text-xs font-bold text-slate-800">{userProfile.focus}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                        <span className="block text-[9px] uppercase font-bold text-slate-400">Study Methodology</span>
                        <span className="text-xs font-bold text-slate-800">{userProfile.method}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                        <span className="block text-[9px] uppercase font-bold text-slate-400">Target Milestone</span>
                        <span className="text-xs font-bold text-slate-800">{userProfile.goal}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 leading-relaxed">No custom cognitive sync matches your user token. Re-align with the SkillNova cognitive alignment engine to compile custom vectors.</p>
                    <button 
                      onClick={() => setIsOnboardingOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0252D9] text-white px-4 py-2 text-xs font-semibold cursor-pointer"
                    >
                      <Sparkles size={12} />
                      <span>Align Profile Parameters</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Accessible Typography Setup Card */}
              <div className="bg-white rounded-2xl border border-slate-205/90 p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">A</span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Workspace Typography Configuration</h3>
                </div>
                <p className="text-xs text-slate-500">Toggle typographic structures styled specifically to maximize comprehension speeds and assist dyslexic eye-movements.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { key: 'standard' as const, label: 'Clean Inter Sans', desc: 'Standard high-performance computer UI design (Default).' },
                    { key: 'dyslexic' as const, label: 'Lexend Dyslexic', desc: 'Slightly wider character tracking to bypass tracking overlap.' },
                    { key: 'serif' as const, label: 'Academic Serif', desc: 'Editorial high-contrast serifs reminiscent of technical papers.' }
                  ].map(fontOption => (
                    <button
                      key={fontOption.key}
                      onClick={() => setFontPreference(fontOption.key)}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        fontPreference === fontOption.key 
                          ? 'border-[#0252D9] bg-blue-50/40 shadow-sm' 
                          : 'border-slate-200 bg-white hover:border-slate-350'
                      }`}
                    >
                      <span className="block text-xs font-bold text-slate-900">{fontOption.label}</span>
                      <span className="block text-[10px] text-slate-500 mt-1.5 leading-normal">{fontOption.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Audio Synthesizer Toggle */}
              <div className="bg-white rounded-2xl border border-slate-205/90 p-6 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Synthesizer Background White-Noise</h4>
                  <p className="text-xs text-slate-600">Simulate binaural 40Hz focus sweeps in background threads while active studies are active.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0252D9]" />
                </label>
              </div>
            </div>
          ) : activeTab === 'ai-mentor' ? (
            <div className="max-w-4xl mx-auto px-4 py-8 text-left space-y-6 flex flex-col h-[calc(100vh-80px)] md:h-[100vh]" id="ai-mentor-page-view">
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('home')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0252D9] transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200"
                  id="ai-mentor-back-home-btn"
                >
                  <ArrowLeft size={13} className="text-[#0252D9]" />
                  <span>Back to Home</span>
                </button>
              </div>
              <div className="shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md inline-block">Socratic Dialogue Unit</span>
                <h1 className="text-3xl font-extrabold text-slate-900 font-serif mt-2">Socratic AI Mentor</h1>
                <p className="text-slate-500 text-sm mt-1">Engage with our customized AI model to stress-test logical proofs, ask complex theoretical questions, and explore knowledge gaps.</p>
              </div>

              {/* Chats Scroller Frame */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 overflow-y-auto space-y-4 flex flex-col shadow-inner max-h-[500px]" id="chat-messages-container">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.sender === 'ai' 
                        ? 'bg-[#EEF2FF] text-[#1E1B4B] self-start border border-[#E0E7FF]' 
                        : 'bg-[#0252D9] text-white self-end shadow-sm'
                    }`}
                  >
                    <span className="block font-bold text-[9px] uppercase tracking-wider text-black/40 mb-1">
                      {msg.sender === 'ai' ? 'Socratic Mentor' : 'Scholar (You)'}
                    </span>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Send Input Form */}
              <form onSubmit={handleSendChatMessage} className="flex gap-2 shrink-0">
                <input
                  type="text"
                  required
                  placeholder="e.g. Ask how hadron detectors measure particle vectors, or check my Qubit understanding..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  id="chat-message-text-input"
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-xs outline-none focus:border-blue-500 bg-white"
                />
                <button
                  type="submit"
                  className="bg-[#0252D9] hover:bg-[#0047ca] text-white px-5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                >
                  Ask AI Mentor
                </button>
              </form>
            </div>
          ) : (
            <InteractiveShowcase
              activeTab={activeTab}
              onNavigateHome={() => setActiveTab('home')}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
              onSelectTab={setActiveTab}
              courses={courses}
              onUpdateCourseProgress={handleUpdateCourseProgress}
              onAddActivityLog={handleAddNotification}
            />
          )}
        </div>
      </div>

      {/* Persistent global notification panel overlay */}
      <AnimatePresence>
        {showNotificationOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm" onClick={() => setShowNotificationOverlay(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl z-10 overflow-hidden text-left"
              id="global-notifications-modal"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-[#0252D9]" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Activity Alerts</span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleClearNotifications}
                    className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-rose-600 font-medium transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} /> Clear all
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-400">
                    <BadgeCheck className="mx-auto h-10 w-10 text-slate-300 stroke-1" />
                    <p className="mt-2 text-xs font-medium">All notifications are caught up!</p>
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 text-xs transition-all relative hover:bg-slate-50 ${
                        !item.read ? 'bg-blue-50/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className={`leading-relaxed ${!item.read ? 'font-semibold text-slate-900' : 'text-slate-650'}`}>
                            {item.message}
                          </p>
                          <span className="block text-[10px] text-slate-400 font-mono">{item.time}</span>
                        </div>
                        {!item.read && (
                          <button
                            onClick={() => handleMarkNotifRead(item.id)}
                            className="bg-blue-100/60 hover:bg-blue-200/50 p-1 text-[#0252D9] rounded-md transition-colors cursor-pointer"
                            title="Mark as read"
                          >
                            <Check size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="border-t border-slate-100 py-3 bg-slate-50 text-center">
                <button 
                  onClick={() => setShowNotificationOverlay(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Onboarding and demo modals */}
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} onComplete={handleOnboardingComplete} />
      <VideoDemoModal isOpen={isVideoDemoOpen} onClose={() => setIsVideoDemoOpen(false)} />
    </div>
  );
}
