
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and anon key must be provided in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Quiz types
export type QuizOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: QuizOption[];
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  technology: 'spring' | 'angular' | 'both';
  questions: QuizQuestion[];
  createdAt: string;
};
