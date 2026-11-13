export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: 'Frontend' | 'Fullstack' | 'Mobile' | 'UI/UX';
  featured: boolean;
  published?: boolean;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Styling & UI' | 'Tools & Utilities' | 'Backend & DB';
  icon: string;
  proficiency: number; // 0 - 100
  sortOrder: number;
  published?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
  sortOrder: number;
  published?: boolean;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  aboutText: string;
  email: string;
  phone?: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
  instagram?: string;
  resumeUrl: string;
  avatarUrl: string;
}

export interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  passwordPlain: string;
  passwordHash: string;
  createdAt: string;
  updatedAt?: string;
}
