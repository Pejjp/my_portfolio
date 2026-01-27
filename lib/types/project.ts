
export type Project = {
  id: number;
  stack: string[];
  title: string;
  period: string;
  image: string;
  overview: string;
  keyFeatures: string[];
  technologies: {
    category: string;
    items: string[];
  }[];
  challenges: {
    challenge: string;
    solution: string;
  }[];
  outcome: {
    metrics?: string[];
    description: string;
  };
  demo: {
    liveUrl?: string;
    githubUrl?: string;
    videoUrl?: string;
  };
}