export interface ResearchOpportunity {
  id: string;
  title: string;
  institution: string;
  department: string;
  supervisor: string;
  category: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Hybrid';
  duration: string;
  deadline: string;
  description: string;
  requirements: string[];
  funding: string;
  location: string;
  tags: string[];
  image?: string;
  posted: string;
}

export type FilterCategory = 'all' | 'Computer Science' | 'Biology' | 'Physics' | 'Chemistry' | 'Engineering' | 'Medicine';
export type FilterType = 'all' | 'Full-time' | 'Part-time' | 'Remote' | 'Hybrid';
