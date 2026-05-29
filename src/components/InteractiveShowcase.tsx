/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ArrowRightLeft,
  Users2,
  Calendar,
  MessageSquare,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  PlusCircle,
  TrendingUp,
  Brain,
  CheckCircle2,
  Lock,
  ThumbsUp,
  Bell,
  Home,
  ArrowLeft,
  SlidersHorizontal,
  Star,
  Image,
  Link,
  Tag,
  Share2,
  Plus,
  LayoutGrid
} from 'lucide-react';
import { AppTab, SkillCard, DiscussionGroup, ActiveCourse } from '../types';
import { DEMO_SKILL_CARDS, DEMO_DISCUSSION_GROUPS, DEMO_ACTIVE_COURSES } from '../data';

const ProgressCircle = ({ percent, title, subtitle }: { percent: number; title: string; subtitle: string }) => {
  const radius = 30;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
      <div className="relative flex items-center justify-center">
        {/* Soft elegant shadow under circle representing glowing periwinkle */}
        <div className="absolute inset-0 rounded-full bg-blue-50/50 m-1 blur-[1px] -z-10" />
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#0252D9"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span className="absolute text-base font-bold text-[#0252D9] font-sans">{percent}%</span>
      </div>
      <span className="block text-xs font-bold text-slate-900 mt-2.5 leading-tight">{title}</span>
      <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">{subtitle}</span>
    </div>
  );
};

interface InteractiveShowcaseProps {
  activeTab: AppTab;
  onNavigateHome: () => void;
  onOpenOnboarding: () => void;
  onSelectTab?: (tab: AppTab) => void;
  courses: ActiveCourse[];
  onUpdateCourseProgress: (id: string, progress: number) => void;
  onAddActivityLog: (message: string) => void;
}

export default function InteractiveShowcase({
  activeTab,
  onNavigateHome,
  onOpenOnboarding,
  onSelectTab,
  courses,
  onUpdateCourseProgress,
  onAddActivityLog,
}: InteractiveShowcaseProps) {
  // Simulation Panel state
  const [showSimulation, setShowSimulation] = useState(false);
  const [showBellDropdown, setShowBellDropdown] = useState(false);

  // Marketplace State
  const [skillSearch, setSkillSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Disciplines');
  const [selectedSkill, setSelectedSkill] = useState<SkillCard | null>(null);
  const [tradeStatus, setTradeStatus] = useState<'idle' | 'proposing' | 'success'>('idle');
  const [tradeOfferSkill, setTradeOfferSkill] = useState('');

  // Community State
  const [activeForumCategory, setActiveForumCategory] = useState<'all' | 'logic' | 'ux' | 'socratic'>('all');
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 'post-1',
      author: 'Sarah Jenkins',
      sub: 'Senior Data Scientist • 2h ago',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
      title: 'Thoughts on the new NLP certification track?',
      content: 'Just finished the first module of the advanced NLP course. The pacing feels a bit faster than previous tracks, especially around transformer architectures. Anyone else experiencing this? Would love to form a study group if others are working through it this weekend.',
      tags: ['#MachineLearning', '#NLP', 'Study Group'],
      likes: 24,
      comments: 8,
      verified: false,
      attachmentType: undefined,
      time: '2h ago'
    },
    {
      id: 'post-2',
      author: 'Marcus Chen',
      sub: 'UX Design Lead • 5h ago',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
      title: undefined,
      content: "Fascinating look at how micro-interactions reduce cognitive load during complex forms. I've mapped out a few examples here from recent case studies. Notice the subtle use of primary color tints to guide the eye.",
      tags: [],
      likes: 42,
      comments: 15,
      verified: true,
      attachmentType: 'mesh',
      time: '5h ago'
    }
  ]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('');

  // Sorter / Filter for Marketplace Cards
  const filteredSkills = useMemo(() => {
    return DEMO_SKILL_CARDS.filter(skill => {
      const matchesSearch = 
        skill.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
        skill.tag.toLowerCase().includes(skillSearch.toLowerCase()) ||
        skill.expert.toLowerCase().includes(skillSearch.toLowerCase()) ||
        (skill.expertTitle && skill.expertTitle.toLowerCase().includes(skillSearch.toLowerCase()));
      
      const matchesCategory = 
        activeCategory === 'All Disciplines' || 
        skill.tag === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [skillSearch, activeCategory]);

  const handleProposeTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tradeOfferSkill.trim()) return;
    setTradeStatus('proposing');
    setTimeout(() => {
      setTradeStatus('success');
      onAddActivityLog(`You successfully proposed to trade "${tradeOfferSkill}" with ${selectedSkill?.expert} for "${selectedSkill?.name}".`);
      setTimeout(() => {
        setTradeStatus('idle');
        setSelectedSkill(null);
        setTradeOfferSkill('');
      }, 2500);
    }, 1500);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    const authorName = newPostAuthor.trim() || 'Elite Scholar';
    const newPost = {
      id: `post-${Date.now()}`,
      author: authorName,
      sub: 'Scholar • Just now',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
      title: undefined,
      content: newPostContent.trim(),
      tags: [] as string[],
      likes: 0,
      comments: 0,
      verified: authorName === 'Elite Scholar',
      attachmentType: undefined,
      time: 'Just now'
    };
    setCommunityPosts([newPost, ...communityPosts]);
    onAddActivityLog(`You posted a new intellectual inquiry: "${newPostContent.substring(0, 30)}..." to community groups.`);
    setNewPostContent('');
    // We can keep newPostAuthor prefilled or cleared
  };

  const handleLikePost = (postId: string) => {
    setCommunityPosts(prev =>
      prev.map(post => (post.id === postId ? { ...post, likes: post.likes + 1 } : post))
    );
  };

  // Helper calculation for overall dashboard progress
  const averageProgress = useMemo(() => {
    if (courses.length === 0) return 0;
    const total = courses.reduce((sum, c) => sum + c.progress, 0);
    return Math.round(total / courses.length);
  }, [courses]);

  if (activeTab === 'home') return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-[600px]" id="interactive-showcase-container">
      {/* Tab Switch animations */}
      <AnimatePresence mode="wait">
        {activeTab === 'marketplace' && (
          <motion.div
            key="marketplace"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
            id="showcase-marketplace"
          >
            {/* Header section with trade description */}
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 text-left" id="marketplace-header-wrapper">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-[34px] font-bold tracking-tight text-[#0252D9] font-sans" id="marketplace-title-heading">
                    Skill Marketplace
                  </h1>
                  <p className="text-slate-500 text-sm mt-2 max-w-2xl leading-relaxed">
                    Discover, exchange, and master specialized knowledge. Connect with elite scholars and practitioners in a high-fidelity learning environment.
                  </p>
                </div>

              {/* Cobalt action button "Exchange a Skill" */}
              <button
                onClick={() => {
                  const proposedSkillName = prompt("Enter the skill you wish to teach/exchange:");
                  if (proposedSkillName) {
                    alert(`Skill "${proposedSkillName}" is now active in the ledger database. Scholars looking for your expertise will be notified.`);
                    onAddActivityLog(`You registered a new tradeable skill: "${proposedSkillName}".`);
                  }
                }}
                id="marketplace-exchange-btn"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0252D9] hover:bg-[#0047ca] text-white py-2.5 px-5 text-xs font-bold transition-all shadow-md active:scale-[0.98] cursor-pointer shrink-0"
              >
                <ArrowRightLeft size={14} className="transform rotate-90 scale-x-[-1]" />
                <span>Exchange a Skill</span>
              </button>
            </div>
          </div>

            {/* Interactive Search Bar wrapper */}
            <div className="space-y-4" id="marketplace-controls-filter-row">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for skills, mentors, or topics..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  id="marketplace-search-input"
                  className="w-full rounded-2xl border border-slate-200/85 pl-11 pr-14 py-3.5 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white font-medium"
                />
                {/* Sliders/Filter button inside the search bar */}
                <button 
                  onClick={() => {
                    alert("Advanced taxonomy filtering options loaded successfully. Category sliders are fully functional.");
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900 border border-slate-200 cursor-pointer"
                  id="marketplace-filter-sliders"
                >
                  <SlidersHorizontal size={14} />
                </button>
              </div>

              {/* Categories horizontal list */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1" id="marketplace-category-pills">
                {[
                  'All Disciplines',
                  'Technology & AI',
                  'Strategic Business',
                  'Design & Architecture',
                  'Cognitive Sciences'
                ].map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0252D9] border-[#0252D9] text-white shadow-xs'
                          : 'bg-[#F1F5F9]/65 hover:bg-[#E2E8F0]/80 border-slate-200 text-slate-705'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom high-fidelity 3-column / grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left" id="marketplace-cards-grid">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  id={`skill-card-item-${skill.id}`}
                >
                  <div className="space-y-4">
                    {/* Header Image with Rating Overlay */}
                    <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                      <img 
                        src={skill.imagePath} 
                        alt={skill.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Rating Label Overlay */}
                      <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-slate-200/50">
                        <Star size={11} className="fill-amber-400 stroke-amber-400" />
                        <span>{skill.rating.toFixed(1)}</span>
                      </span>
                    </div>

                    {/* Meta & Title */}
                    <div className="px-5 space-y-2">
                      <h3 className="font-sans font-bold text-slate-900 group-hover:text-[#0252D9] transition-colors text-base leading-snug min-h-[44px]">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-slate-550 font-sans leading-relaxed min-h-[36px] line-clamp-2">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Bar */}
                  <div className="mt-4 px-5 pb-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={skill.avatarUrl} 
                        alt={skill.expert}
                        referrerPolicy="no-referrer"
                        className="h-9 w-9 rounded-full object-cover border border-slate-100"
                      />
                      <div>
                        <h4 className="text-[12px] font-bold text-slate-900 leading-none">{skill.expert}</h4>
                        <p className="text-[10px] text-slate-400 mt-1 leading-none font-medium">{skill.expertTitle || 'Expert Practitioner'}</p>
                      </div>
                    </div>

                    {/* Swap Barter Trigger Icon Button */}
                    <button
                      onClick={() => setSelectedSkill(skill)}
                      id={`swap-btn-${skill.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-[#0252D9] hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-90"
                      title="Propose Skill Barter Trade"
                    >
                      <ArrowRightLeft size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Propose Barter Overlay Modal */}
            <AnimatePresence>
              {selectedSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-left">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedSkill(null)}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-md bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl z-10 space-y-4"
                    id="barter-proposal-modal"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="font-bold text-slate-950 text-sm">Initiate Skill Swap Ledger</h4>
                      <button onClick={() => setSelectedSkill(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xs">✕</button>
                    </div>

                    {tradeStatus === 'idle' && (
                      <form onSubmit={handleProposeTrade} className="space-y-4">
                        <div>
                          <p className="text-xs text-slate-500">
                            You are proposing a direct cognitive swap with <span className="font-semibold text-slate-900">{selectedSkill.expert}</span>.
                          </p>
                          <div className="mt-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100/30 text-xs">
                            <span className="block font-bold text-blue-800">You Will Gain:</span>
                            <span className="mt-1 block font-medium">{selectedSkill.name}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-700">Describe What You Will Offer in Exchange:</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="e.g., I will provide 3 hours of advanced Python data structures instruction or visual graph design..."
                            value={tradeOfferSkill}
                            onChange={(e) => setTradeOfferSkill(e.target.value)}
                            id="trade-offer-text-input"
                            className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        <button
                          type="submit"
                          id="submit-proposal-btn"
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 transition-colors cursor-pointer"
                        >
                          Send Secure Barter Proposition
                        </button>
                      </form>
                    )}

                    {tradeStatus === 'proposing' && (
                      <div className="text-center py-8 space-y-3" id="proposing-loader">
                        <svg className="animate-spin mx-auto h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p className="text-xs text-slate-600 font-medium">Validating cryptographic credentials and aligning schedules...</p>
                      </div>
                    )}

                    {tradeStatus === 'success' && (
                      <div className="text-center py-6 space-y-3" id="proposing-success">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                          <CheckCircle2 size={24} />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Barter Proposed Successfully!</h4>
                        <p className="text-xs text-slate-500">
                          We have recorded this on the ledger. {selectedSkill.expert} was notified of your offer for "{selectedSkill.name}".
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'community' && (
          <motion.div
            key="community"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full text-left"
            id="showcase-community"
          >
            {/* Heading area of Community Hub */}
            <div className="border-b border-slate-100 pb-5 mb-8">
              <h1 className="text-[34px] font-bold tracking-tight text-[#0252D9] font-sans" id="community-hub-title">
                Community Hub
              </h1>
              <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                Connect, collaborate, and grow with fellow scholars.
              </p>
            </div>

            {/* Three Columns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="community-grid-container">
              
              {/* Column A: Collaboration Rooms (lg:col-span-3) */}
              <div className="lg:col-span-3 space-y-4" id="community-left-sidebar">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs" id="collaboration-rooms-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-bold text-slate-900 font-sans">Collaboration Rooms</h3>
                    <button 
                      onClick={() => {
                        const newRoom = prompt("Enter the name of your new research collaboration room:");
                        if (newRoom) {
                          alert(`Room "${newRoom}" has been created as draft. Synchronous Socratic protocol scheduled with peer scholars.`);
                        }
                      }}
                      className="text-[#0252D9] hover:text-blue-800 transition-colors bg-blue-50/75 p-1 px-2 rounded-lg font-bold cursor-pointer text-xs"
                      title="Create Collaboration Room"
                    >
                      +
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {/* Room 1: UX Research */}
                    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50/50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Sparkles size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[13px] font-bold text-slate-900 truncate">UX Research ...</h4>
                        <p className="text-[10px] text-slate-400 font-medium">12 active now</p>
                      </div>
                    </div>

                    {/* Room 2: React Native */}
                    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50/50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <BookOpen size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[13px] font-bold text-slate-900 truncate">React Native ...</h4>
                        <p className="text-[10px] text-emerald-600 font-bold">5 active now</p>
                      </div>
                    </div>

                    {/* Room 3: AI Ethics */}
                    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50/50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="h-9 w-9 rounded-xl bg-indigo-50 text-[#0252D9] flex items-center justify-center shrink-0">
                        <Brain size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[13px] font-bold text-slate-900 truncate">AI Ethics Dis...</h4>
                        <p className="text-[10px] text-slate-400 font-medium">28 active now</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert("Loading full collaborative room directory. Connecting to chat rooms...")}
                    className="w-full text-center text-xs font-bold text-[#0252D9] hover:underline pt-4 border-t border-slate-100 block cursor-pointer transition-all"
                  >
                    View all rooms
                  </button>
                </div>
              </div>

              {/* Column B: Middle Feed of Posts (lg:col-span-6) */}
              <div className="lg:col-span-6 space-y-6" id="community-middle-feed">
                {/* Create post composer card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4" id="community-create-post-card">
                  <div className="flex items-start gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" 
                      alt="Your profile avatar"
                      className="h-10 w-10 rounded-full object-cover border border-slate-100 shrink-0"
                    />
                    <div className="flex-1">
                      <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Share an insight, ask a question, or post a resource..."
                        className="w-full rounded-xl border border-none bg-transparent p-1.5 pt-1 text-xs sm:text-sm text-slate-800 outline-none placeholder-slate-400 resize-none min-h-[64px]"
                        id="community-composer-textarea"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => alert("Upload image option loaded successfully. Select local files.")}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50/80 rounded-xl transition-all cursor-pointer"
                        title="Attach Image"
                      >
                        <Image size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          const linkVal = prompt("Enter hyperlink URL:");
                          if (linkVal) alert(`Hyperlink "${linkVal}" parsed successfully.`);
                        }}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50/80 rounded-xl transition-all cursor-pointer"
                        title="Attach Hyperlink"
                      >
                        <Link size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          const tagVal = prompt("Enter custom metadata tag:");
                          if (tagVal) alert(`Meta-tag "#${tagVal.replace('#','')}" will be appended to your query.`);
                        }}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50/80 rounded-xl transition-all cursor-pointer"
                        title="Add Topic Meta-Tag"
                      >
                        <Tag size={16} />
                      </button>
                    </div>

                    <button
                      onClick={handleCreatePost}
                      id="community-post-submit-btn"
                      className="rounded-xl bg-[#0252D9] hover:bg-[#0047ca] text-white px-5 py-2 text-xs font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                    >
                      Post
                    </button>
                  </div>
                </div>

                {/* Posts Feed and lists */}
                <div className="space-y-6" id="community-news-feed">
                  {communityPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 text-left group"
                      id={`feed-post-${post.id}`}
                    >
                      {/* Top Author Metadata Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={post.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"} 
                            alt={post.author}
                            className="h-10 w-10 rounded-full object-cover border border-slate-100 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-sm font-bold text-slate-900 leading-none">{post.author}</span>
                              {post.verified && (
                                <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-blue-50 text-[#0252D9]" title="Verified Faculty Mentor">
                                  <CheckCircle2 size={13} className="fill-[#0252D9] text-white" />
                                </span>
                              )}
                            </div>
                            <span className="block text-[11px] text-slate-400 font-medium mt-1 leading-none">{post.sub}</span>
                          </div>
                        </div>

                        {/* Three Dots dropdown or actions menu */}
                        <button 
                          onClick={() => alert("Post configuration context details loaded successfully.")}
                          className="p-1 px-1.5 text-slate-405 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
                        >
                          <span className="text-sm font-bold tracking-tight block leading-none font-sans">•••</span>
                        </button>
                      </div>

                      {/* Post Title if present */}
                      {post.title && (
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug font-sans tracking-tight">
                          {post.title}
                        </h3>
                      )}

                      {/* Post Content */}
                      <p className="text-xs sm:text-[13px] leading-relaxed text-slate-705 font-sans">
                        {post.content}
                      </p>

                      {/* Tags list */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {post.tags.map((tg, idx) => {
                            let badgeStyle = "bg-blue-50 text-[#0252D9] font-semibold";
                            if (tg.toLowerCase() === '#nlp') badgeStyle = "bg-teal-50 text-teal-700 font-semibold";
                            if (tg.toLowerCase().includes('study')) badgeStyle = "bg-slate-100/80 text-slate-650 font-bold border border-slate-200/55";
                            return (
                              <span key={idx} className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-full ${badgeStyle}`}>
                                {tg}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Custom visual attachment blueprint layout */}
                      {post.attachmentType === 'mesh' && (
                        <div className="rounded-xl border border-blue-100 bg-[#F4F7FE] p-10 mt-2 flex items-center justify-center min-h-[140px] hover:border-blue-200 transition-colors" id="marcus-attachment-mesh">
                          <div className="flex flex-col items-center text-center space-y-2">
                            <span className="p-3.5 bg-white text-[#0252D9] rounded-2xl shadow-sm border border-slate-100">
                              <LayoutGrid size={24} className="stroke-[#0252D9]" />
                            </span>
                            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-widest leading-none block border-t border-slate-200/50 pt-2 px-4 mt-3">Interactive Workspace Blueprint Loaded</span>
                          </div>
                        </div>
                      )}

                      {/* Footer interactions bar */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-slate-405">
                        <div className="flex items-center gap-6">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            id={`post-like-icon-btn-${post.id}`}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-455 hover:text-[#0252D9] transition-colors cursor-pointer"
                          >
                            <ThumbsUp size={14} />
                            <span>{post.likes}</span>
                          </button>
                          <button 
                            onClick={() => {
                              const replValue = prompt("Write a comment replying to this scholar:");
                              if (replValue) {
                                alert("Your response was recorded in the academic repository.");
                                onAddActivityLog(`You replied to ${post.author}'s post: "${replValue.substring(0, 20)}..."`);
                              }
                            }}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-455 hover:text-[#0252D9] transition-colors cursor-pointer"
                          >
                            <MessageSquare size={14} />
                            <span>{post.comments} {typeof post.comments === 'number' && post.comments > 1 ? 'Replies' : 'Reply'}</span>
                          </button>
                        </div>

                        <button 
                          onClick={() => alert(`Share payload link copied to clipboard for Post by ${post.author}`)}
                          className="p-1 px-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-405 hover:text-slate-805 transition-all cursor-pointer"
                          title="Share Post Link"
                        >
                          <Share2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column C: Right Panel Sidebar (lg:col-span-3) */}
              <div className="lg:col-span-3 space-y-6" id="community-right-sidebar">
                
                {/* Featured Experts Widget Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs" id="featured-experts-card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-emerald-50 text-[#0252D9] rounded-lg">
                      <Award size={16} />
                    </div>
                    <h3 className="text-[15px] font-bold text-slate-900 font-sans">Featured Experts</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Expert 1: Dr. Elena Rostova */}
                    <div className="flex items-center justify-between gap-2 p-1 rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120" 
                          alt="Dr. Elena Rostova"
                          className="h-9 w-9 rounded-full object-cover border border-slate-100 shrink-0"
                        />
                        <div>
                          <h4 className="text-[12px] font-bold text-slate-900 leading-none font-sans">Dr. Elena Rostova</h4>
                          <span className="block text-[10px] text-slate-400 mt-1 leading-none font-medium">Cognitive Science</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => alert("Following Elena Rostova successfully. Alerts for seminars or papers enabled.")}
                        className="text-xs font-bold text-[#0252D9] hover:underline cursor-pointer"
                      >
                        Follow
                      </button>
                    </div>

                    {/* Expert 2: James Wilson */}
                    <div className="flex items-center justify-between gap-2 p-1 rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120" 
                          alt="James Wilson"
                          className="h-9 w-9 rounded-full object-cover border border-slate-100 shrink-0"
                        />
                        <div>
                          <h4 className="text-[12px] font-bold text-slate-900 leading-none font-sans">James Wilson</h4>
                          <span className="block text-[10px] text-slate-400 mt-1 leading-none font-medium">Full-Stack Architecture</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => alert("Following James Wilson successfully. Alerts for reviews or papers enabled.")}
                        className="text-xs font-bold text-[#0252D9] hover:underline cursor-pointer"
                      >
                        Follow
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert("Loading Elite Mentors blockchain sync directory...")}
                    className="w-full text-center text-xs font-bold text-[#0252D9] hover:underline pt-4 border-t border-slate-100 block cursor-pointer transition-all"
                  >
                    Discover more mentors
                  </button>
                </div>

                {/* Trending Tags Widget Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs" id="trending-tags-card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-blue-50 text-[#0252D9] rounded-lg">
                      <TrendingUp size={16} />
                    </div>
                    <h3 className="text-[15px] font-bold text-slate-900 font-sans">Trending Tags</h3>
                  </div>

                  <div className="space-y-2">
                    {[
                      { tag: '#GenerativeAI', count: '2.4k' },
                      { tag: '#SystemDesign', count: '1.1k' },
                      { tag: '#PortfolioReview', count: '856' },
                      { tag: '#AgileLeadership', count: '432' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSkillSearch(item.tag);
                          alert(`Taxonomy and feed search filtered by tag "${item.tag}"`);
                        }}
                        className="w-full bg-slate-50/60 hover:bg-slate-100 border border-slate-100 text-slate-700 font-medium text-xs py-2 px-3 rounded-xl flex items-center justify-between transition-all cursor-pointer hover:scale-[1.01]"
                      >
                        <span>{item.tag}</span>
                        <span className="text-[10px] font-mono text-slate-400">{item.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 text-left max-w-6xl mx-auto px-1 py-1 sm:px-2"
            id="showcase-dashboard"
          >
            {/* Real Top Header exactly matched to reference */}
            <div className="flex items-start justify-between pb-2" id="dashboard-main-header">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 font-serif tracking-tight leading-none">Dashboard</h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">Continue your journey in Academic Futurism.</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Back to Home Button */}
                <button
                  onClick={onNavigateHome}
                  className="p-2.5 rounded-full bg-[#f4f7fe]/85 border border-slate-200/50 hover:bg-[#eaeefc]/95 hover:text-[#0252D9] text-slate-700 transition-colors cursor-pointer flex items-center justify-center"
                  id="dashboard-back-home-btn"
                  title="Back to Home Landing"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <div className="relative">
                  <button 
                    onClick={() => setShowBellDropdown(!showBellDropdown)}
                    className="p-2.5 rounded-full bg-[#f4f7fe]/85 border border-slate-200/50 hover:bg-[#eaeefc]/95 text-slate-700 transition-colors cursor-pointer block"
                    id="dashboard-bell-btn"
                  >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#0252D9]" />
                </button>
                {/* Local alert indicator for bell */}
                <AnimatePresence>
                  {showBellDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowBellDropdown(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 rounded-xl p-4 shadow-xl z-25 text-left"
                      >
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#0252D9]">Course Progression alerts</h4>
                        <p className="text-xs text-slate-650 mt-2 leading-relaxed">Your cognitive load wave is fully stabilized at 4.91 mean index.</p>
                        <button 
                          onClick={() => { setShowBellDropdown(false); setShowSimulation(true); }}
                          className="mt-2.5 w-full bg-blue-50 hover:bg-blue-100 text-xs font-bold text-[#0252D9] py-1.5 rounded-md text-center transition-colors cursor-pointer"
                        >
                          Unlock Telemetry Controls
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

            {/* If showSimulation is true, we display the Interactive controls & Sliders waveform */}
            {showSimulation ? (
              <div className="space-y-6 animate-fade-in" id="simulation-telemetry-zone">
                {/* Micro controller bar to quickly return to main dashboard view */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#edf4ff] p-4 rounded-xl border border-blue-105/40 gap-3">
                  <span className="text-xs text-blue-800 font-semibold flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#0252D9]" />
                    <span>Active Progression Simulator: Calibrated memory waveform indexes are live.</span>
                  </span>
                  <button 
                    onClick={() => setShowSimulation(false)}
                    className="text-xs font-bold text-[#0252D9] bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm hover:bg-slate-50 cursor-pointer self-start sm:self-auto transition-colors"
                  >
                    ← Return to Overview
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Progression sliders and lists */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm font-sans">Active Logic Modules</h3>
                          <p className="text-[11px] text-slate-400 mt-0.5">Adjust sliders to simulate course progression in real-time.</p>
                        </div>
                        <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 rounded-md py-0.5">Interactive</span>
                      </div>

                      <div className="space-y-4" id="dashboard-progress-sliders">
                        {courses.map((course) => (
                          <div key={course.id} className="space-y-2 p-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 text-left">
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wide">{course.category}</span>
                                <h4 className="text-xs font-bold text-slate-900 mt-0.5 hover:text-[#0252D9] transition-colors">{course.title}</h4>
                              </div>
                              <span className={`text-[10.5px] font-mono font-bold ${
                                course.status === 'Completed' ? 'text-green-600' : 'text-slate-600'
                              }`}>
                                {course.status === 'Completed' ? 'Closed (100%)' : `${course.progress}%`}
                              </span>
                            </div>

                            {/* Interactive Scrubber Slider */}
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={course.progress}
                                onChange={(e) => onUpdateCourseProgress(course.id, parseInt(e.target.value))}
                                id={`course-slider-range-${course.id}`}
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cyan Bar Chart Display (Exactly replicating the reference image logic visualization!) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-950 text-white p-6 shadow-xl flex flex-col justify-between" id="dashboard-bar-chart-visualizer">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-cyan-400">
                        <Sparkles size={14} className="animate-pulse" />
                        <span className="text-[9px] font-mono uppercase tracking-widest font-bold">Cognitive Load Meter</span>
                      </div>
                      <h3 className="font-serif font-bold text-sm">Adaptive Progression Waveform</h3>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Visual telemetry depicting real-time memory preservation indexes across daily milestones.
                      </p>
                    </div>

                    {/* Vertical Bar chart replicates cyan bars from the reference image */}
                    <div className="my-8 flex items-end justify-between gap-2.5 h-36 px-2 border-b border-white/10 pb-1" id="cyan-bar-chart-bars">
                      {[
                        { val: 18, day: 'Mon' },
                        { val: 42, day: 'Tue' },
                        { val: 75, day: 'Wed' },
                        { val: 32, day: 'Thu' },
                        { val: 88, day: 'Fri' },
                        { val: 56, day: 'Sat' },
                        { val: 95, day: 'Sun' }
                      ].map((bar, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-full relative rounded-t-sm overflow-hidden h-32 bg-white/5">
                            {/* Dynamic Height styled in Cyan color block matching reference layout */}
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-cyan-400 group-hover:from-cyan-400 group-hover:to-cyan-300"
                              initial={{ height: 0 }}
                              animate={{ height: `${bar.val}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-slate-400">{bar.day}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between text-left">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-405 font-mono">Current Peak</span>
                        <span className="text-xs font-bold font-mono text-cyan-300">95% Efficiency Code (Sun)</span>
                      </div>
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/15 text-emerald-400 text-xs border border-emerald-500/20 font-bold">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* EXACT PORTRAIT OF THE REFERENCE SCREENSHOT DASHBOARD VIEW */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0" id="exact-dashboard-layout-row">
                
                {/* Left larger zone containing cards: 1. Active Skills circular dials, 2. Recent Sessions timeline */}
                <div className="lg:col-span-2 space-y-6 flex flex-col">
                  
                  {/* Card 1: Active Skills 圆形进展表 */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4" id="card-active-skills">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight">Active Skills</h3>
                      <button 
                        onClick={() => setShowSimulation(true)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0252D9] hover:text-[#0047ca] hover:underline cursor-pointer"
                        id="active-skills-view-all-btn"
                      >
                        <span>View All</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    {/* Three progress rings exactly aligned to reference labels */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="circular-progress-grids">
                      <ProgressCircle 
                        percent={75} 
                        title="Quantum Computing" 
                        subtitle="Advanced Algorithms" 
                      />
                      <ProgressCircle 
                        percent={40} 
                        title="Neural Networks" 
                        subtitle="Deep Learning Basics" 
                      />
                      <ProgressCircle 
                        percent={92} 
                        title="Ethics in AI" 
                        subtitle="Policy & Frameworks" 
                      />
                    </div>
                  </div>

                  {/* Card 2: Recent Sessions with dynamic timeline bullet nodes */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4" id="card-recent-sessions">
                    <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight border-b border-slate-100 pb-3">Recent Sessions</h3>
                    
                    {/* Timeline */}
                    <div className="space-y-6 pt-2" id="timeline-flow text-left">
                      
                      {/* Item 1 with Solid Bullet */}
                      <div className="relative flex items-start gap-4" id="timeline-node-1">
                        {/* Connecting Line */}
                        <div className="absolute left-1.5 top-3.5 bottom-0 w-[1.5px] bg-slate-200" />
                        
                        {/* Bullet Circle marker */}
                        <div className="relative z-10 flex h-3 w-3 items-center justify-center rounded-full bg-[#0252D9] ring-2 ring-[#0252D9] mt-1 shrink-0" />

                        {/* Text details */}
                        <div className="flex-grow flex flex-col text-left font-sans">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 font-sans">Completed Module: Qubits</span>
                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">2 hours ago</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">You scored 95% on the final assessment.</p>
                          <div className="mt-2.5">
                            <span className="inline-flex items-center rounded-md bg-[#EDF4FF] border border-[#D0E2FF] text-[#0252D9] px-2.5 py-0.5 text-[10px] font-semibold">
                              Quantum Computing
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Item 2 with Hollow Bullet */}
                      <div className="relative flex items-start gap-4 text-left" id="timeline-node-2">
                        {/* Bullet Marker (Hollow) */}
                        <div className="relative z-10 flex h-3 w-3 items-center justify-center rounded-full bg-white border-2 border-[#0252D9] mt-1 shrink-0" />

                        {/* Text details */}
                        <div className="flex-grow flex flex-col text-left font-sans">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 font-sans">Joined Group: "Future AI Ethicists"</span>
                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">Yesterday</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">Connected with 42 new peers.</p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Right narrower zone containing the: 1. AI Recommended (glowing card with computer chip image), 2. Community Activity lists */}
                <div className="space-y-6 flex flex-col justify-stretch">
                  
                  {/* Card 1: AI Recommended (Faint purple background gradient with card image format) */}
                  <div className="bg-gradient-to-b from-[#EEF2FF] to-[#F5F3FF] rounded-2xl border border-slate-200/95 p-5 shadow-sm space-y-4 text-left flex flex-col" id="card-ai-recommended">
                    <div className="flex items-center gap-2 text-[#0252D9]">
                      <Sparkles size={16} className="text-[#0252D9]" />
                      <h3 className="font-serif font-bold text-xs uppercase tracking-wide">AI Recommended</h3>
                    </div>

                    {/* Target inner image container */}
                    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs space-y-3" id="ai-recommended-inner-block">
                      <img 
                        src="/src/assets/images/cybernetics_chip_1779989567456.png" 
                        alt="Cybernetics Chip Art"
                        referrerPolicy="no-referrer"
                        className="w-full object-cover rounded-lg aspect-[16/9] border border-slate-100"
                        id="ai-recommended-image"
                      />
                      <div className="text-left py-0.5">
                        <h4 className="font-bold text-xs text-slate-900 font-sans">Introduction to Cybernetics</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium leading-normal">
                          Based on your interest in Neural Networks
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Community Activity */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4 text-left flex-1" id="card-community-activity">
                    <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-400 border-b border-slate-50 pb-2">Community Activity</h3>
                    
                    <div className="space-y-4 pt-1" id="community-activity-list">
                      
                      {/* Activity Item 1 */}
                      <div className="flex items-start gap-3" id="community-act-1">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ecf2ff] text-indigo-600">
                          <MessageSquare size={13} fill="currentColor" className="stroke-none text-[#0252D9]" />
                        </div>
                        <div className="text-left font-sans">
                          <p className="text-[11px] font-semibold text-slate-800 leading-tight">
                            "Has anyone successfully..."
                          </p>
                          <span 
                            onClick={() => { if (onSelectTab) onSelectTab('community'); }}
                            className="text-[10px] font-semibold text-[#0252D9] hover:underline cursor-pointer block mt-1"
                          >
                            In Advanced ML Group
                          </span>
                        </div>
                      </div>

                      {/* Activity Item 2 */}
                      <div className="flex items-start gap-3" id="community-act-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-sans">
                          <Award size={14} className="text-emerald-700" />
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] font-semibold text-slate-800 leading-tight">
                            Sarah J. just published a new paper on...
                          </p>
                          <span 
                            onClick={() => { if (onSelectTab) onSelectTab('community'); }}
                            className="text-[10px] font-semibold text-[#0252D9] hover:underline cursor-pointer block mt-1"
                          >
                            In Physics Scholar Hub
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
