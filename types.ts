export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  repoUrl?: string;
  demoUrl?: string;
  details: string; // Longer description for modal
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
