export interface Project {
  id: string;
  title: string;
  description: string; // Short summary/Subtitle
  valueProposition: string; // "2-sentence value proposition"
  achievement: string; // "Brief bullet point of primary achievement"
  techStack: string[];
  imageUrl: string;
  repoUrl?: string;
  demoUrl?: string;
  
  // Deep Dive Content
  problem?: string;
  challenges?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  gallery?: string[]; // Additional images
  details: string; // The full narrative or architecture description

  // Engineering Specs (New)
  complexity?: 'Medium' | 'High' | 'Very High' | 'Research Grade';
  linesOfCode?: string; // e.g., "12k+ LOC"
  architecture?: string[]; // e.g., ["BLoC Pattern", "Microservices"]
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
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