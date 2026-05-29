/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PathStep, SkillCard, DiscussionGroup, ActiveCourse, NotificationItem } from './types';

export const DEFAULT_GUIDED_PATHWAY: PathStep[] = [
  {
    id: 'step-1',
    title: 'Epistemic Structures & Logic Foundation',
    description: 'Master the fundamental scaffolding of mental organization, symbolic translation, and logical rigor.',
    duration: '12 hours',
    category: 'Fundamentals',
    difficulty: 'Beginner',
  },
  {
    id: 'step-2',
    title: 'Cognitive-Friendly System Architecture',
    description: 'Design digital experiences and workspaces optimized for working memory and structured information transfer.',
    duration: '18 hours',
    category: 'Applied Cognition',
    difficulty: 'Intermediate',
  },
  {
    id: 'step-3',
    title: 'Autonomous Expert Alignment Protocols',
    description: 'In-depth protocol mapping to align custom computational logic with complex human workflows and ethics.',
    duration: '25 hours',
    category: 'Advanced Systems',
    difficulty: 'Advanced',
  },
];

export const DEMO_SKILL_CARDS: SkillCard[] = [
  {
    id: 'skill-1',
    name: 'Advanced Prompt Engineering Architecture',
    expert: 'Dr. A. Chen',
    expertTitle: 'AI Researcher',
    rating: 4.9,
    tradesCount: 142,
    description: 'Master the structure and logic behind robust LLM instructions for enterprise applications.',
    tag: 'Technology & AI',
    avatarSeed: 'chen',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    imagePath: '/src/assets/images/prompt_wave_1779991354994.png',
    priceValue: 'Neural Interface Design',
  },
  {
    id: 'skill-2',
    name: 'Neuro-Linguistic Programming for UX',
    expert: 'Elena Rostova',
    expertTitle: 'Lead Product Designer',
    rating: 4.8,
    tradesCount: 89,
    description: 'Leverage cognitive psychology principles to design intuitive and persuasive digital...',
    tag: 'Design & Architecture',
    avatarSeed: 'elena',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    imagePath: '/src/assets/images/laptop_ux_1779991383958.png',
    priceValue: 'Socratic Method Review',
  },
  {
    id: 'skill-3',
    name: 'Quantum Computing Fundamentals',
    expert: 'Prof. M. Vance',
    expertTitle: 'Physicist',
    rating: 5.0,
    tradesCount: 215,
    description: 'An accessible introduction to qubits, superposition, and quantum algorithms for...',
    tag: 'Technology & AI',
    avatarSeed: 'vance',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120',
    imagePath: '/src/assets/images/cpu_chip_1779991412238.png',
    priceValue: 'Information Theory Hacks',
  },
  {
    id: 'skill-4',
    name: 'Game Theory for Strategic Alliances',
    expert: 'Sophia Lin',
    expertTitle: 'Strategic Consultant',
    rating: 4.9,
    tradesCount: 74,
    description: 'Unpack Nash Equilibrium and coopetition models to draft high-yield joint ventures and partnerships.',
    tag: 'Strategic Business',
    avatarSeed: 'sophia',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120',
    imagePath: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400&h=300',
    priceValue: 'Advanced Machine Learning',
  },
  {
    id: 'skill-5',
    name: 'Symbolic Cognitive Mapping',
    expert: 'Dr. Helen Vance',
    expertTitle: 'Cognitive Neuroscientist',
    rating: 4.7,
    tradesCount: 110,
    description: 'Transform loose mental workflows into fully actionable symbolic charts. Perfect for structural designers.',
    tag: 'Cognitive Sciences',
    avatarSeed: 'helen',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120',
    imagePath: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400&h=300',
    priceValue: 'Socratic Dialogues',
  },
];

export const DEMO_DISCUSSION_GROUPS: DiscussionGroup[] = [
  {
    id: 'group-1',
    name: 'Epistemic Hub: Formal Methods',
    membersCount: 384,
    activeTopicsCount: 19,
    recentActivity: '2 mins ago',
    description: 'Dedicated to formal logic verification, math proofs, and mapping abstract structures to actual UI systems.',
    badge: 'Highly Active',
  },
  {
    id: 'group-2',
    name: 'The Socratic Workspace',
    membersCount: 512,
    activeTopicsCount: 12,
    recentActivity: '15 mins ago',
    description: 'Daily asynchronous debating of structural and ethical parameters within personalized learning modules.',
    badge: 'Popular',
  },
  {
    id: 'group-3',
    name: 'Cognitive Acceleration Cohort',
    membersCount: 220,
    activeTopicsCount: 8,
    recentActivity: '1 hour ago',
    description: 'Practical, habit-forming workspace focused on optimizing memory cues and reducing information overload.',
    badge: 'New & Fast',
  },
];

export const DEMO_ACTIVE_COURSES: ActiveCourse[] = [
  {
    id: 'course-1',
    title: 'Epistemic Scaffolding & Brain-Computer UI',
    progress: 74,
    totalHours: 20,
    completedHours: 14.8,
    status: 'In Progress',
    category: 'Cognitive Science',
  },
  {
    id: 'course-2',
    title: 'Advanced Heuristics in Dynamic Environments',
    progress: 35,
    totalHours: 15,
    completedHours: 5.25,
    status: 'In Progress',
    category: 'Socio-Technology',
  },
  {
    id: 'course-3',
    title: 'Logical Synthesizer Engineering',
    progress: 100,
    totalHours: 10,
    completedHours: 10,
    status: 'Completed',
    category: 'Advanced Logic',
  },
  {
    id: 'course-4',
    title: 'Autonomous Multi-Agent Collaboration Matrices',
    progress: 0,
    totalHours: 32,
    completedHours: 0,
    status: 'Up Next',
    category: 'Machine Intelligence',
  },
];

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    message: 'Dr. Helen Vance accepted your skill trade offer for "Interactive Logic Tutoring".',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'n-2',
    message: 'New group learning path unlocked: Epistemic Structures Level II.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 'n-3',
    message: 'Your Socratic homework assignment scored 98% in Semantic Integrity.',
    time: '1 day ago',
    read: true,
  },
];
