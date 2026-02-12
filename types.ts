
export enum Category {
  TECH = 'Tech',
  LUXURY = 'Luxury',
  STREETWEAR = 'Streetwear',
  CORPORATE = 'Corporate',
  MINIMAL = 'Minimal',
  FUTURISTIC = 'Futuristic',
  WEB3 = 'Web3'
}

export interface AdCampaign {
  headline: string;
  hook: string;
  cta: string;
  platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'X' | 'Google';
}

export interface LogoBundle {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  templateCount: number;
  createdAt: string;
  imageUrl: string;
  seoTags: string[];
  blogArticle?: string;
  rating: number;
  sales: number;
  safetyScore: number;
  brandVoice?: string;
  adCampaign?: AdCampaign;
  motionVideoUrl?: string;
  trademarkReport?: string;
  localMarketGaps?: string;
}

export interface AgentActivity {
  id: string;
  timestamp: string;
  message: string;
  status: 'info' | 'success' | 'warning' | 'error';
  agentName: 'Legal' | 'Marketing' | 'Motion' | 'Retail' | 'Analyst' | 'Generator' | 'Strategist' | 'Zeta-Node' | 'Vector-Core';
}

export interface CRMUser {
  id: string;
  company: string;
  licenseTier: 'Creator' | 'Pro' | 'Lifetime';
  lastDownload: string;
  usageCount: number;
}

export interface Affiliate {
  id: string;
  name: string;
  sales: number;
  commission: number;
  tier: 'Gold' | 'Silver' | 'Bronze';
}

export interface SocialPost {
  day: string;
  platform: string;
  content: string;
  visualHook: string;
}

export interface DomainSuggestion {
  domain: string;
  availabilitySim: 'Available' | 'Premium' | 'Taken';
  reasoning: string;
}

export interface PersonaAudit {
  demographic: string;
  psychographic: string;
  painPoints: string[];
  brandingHook: string;
}

export interface LiveLogo {
  id: string;
  seed: string;
  style: string;
  agent: string;
  timestamp: string;
  category: Category;
  complexity: number;
}
