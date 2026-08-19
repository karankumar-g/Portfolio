export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & RAG Systems' | 'CRM & Enterprise Automation' | 'Pharma Analytics & Data Engineering' | 'Data Engineering & ETL' | 'Computer Vision & Security' | string;
  stack: string[];
  metrics: {
    label: string;
    value: string;
    numValue: number;
    suffix: string;
    description: string;
  }[];
  bullets: string[];
  architectureOverview: string;
  highlights: string[];
  flowSteps: {
    title: string;
    description: string;
    tech: string;
    badge: string;
  }[];
  gradient: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  statusChip?: string;
  summary: string;
  responsibilities: {
    point: string;
    tags: string[];
    impactMetric?: string;
  }[];
  techStack: string[];
  keyWins: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  highlight?: string;
  coursework: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    iconName?: string;
    highlight?: boolean;
    description?: string;
    percentage: number;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  badgeType: 'Agentforce' | 'Meta' | 'Python' | 'API' | 'Data';
  credentialUrl?: string;
  skillsLearned: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  badgeText: string;
  highlightNumber?: string;
}
