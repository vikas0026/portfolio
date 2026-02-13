
export interface Project {
  title: string;
  description: string;
  longDescription: string[];
  tech: string[];
  github?: string;
  image: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
  tech: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
}
