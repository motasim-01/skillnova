/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppTab = 'home' | 'marketplace' | 'community' | 'dashboard' | 'settings' | 'ai-mentor';

export interface PathStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'Fundamentals' | 'Applied Cognition' | 'Advanced Systems';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SkillCard {
  id: string;
  name: string;
  expert: string;
  rating: number;
  tradesCount: number;
  description: string;
  tag: string;
  avatarSeed: string;
  priceValue?: string; // e.g. "Cognitive Systems" or "Ethical AI Principles" representing the trade currency
  expertTitle?: string;
  imagePath?: string;
  avatarUrl?: string;
}

export interface DiscussionGroup {
  id: string;
  name: string;
  membersCount: number;
  activeTopicsCount: number;
  recentActivity: string;
  description: string;
  badge: string;
}

export interface ActiveCourse {
  id: string;
  title: string;
  progress: number; // 0 to 100
  totalHours: number;
  completedHours: number;
  status: 'In Progress' | 'Up Next' | 'Completed';
  category: string;
}

export interface NotificationItem {
  id: string;
  message: string;
  time: string;
  read: boolean;
}
