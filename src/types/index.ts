export type FilterType = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface User {
  id: string;
  email: string;
  createdAt: number;
}

export interface Listing {
  id: string;
  userId: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salaryRange: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  createdAt: number;
  updatedAt: number;
}
