
import { createClient } from '@supabase/supabase-js';

// Default values for development - replace these with your actual Supabase project values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbWV2YWx1ZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2OTYwMDAwLCJleHAiOjE5MzI1MTIwMDB9.fake-key-for-development';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase URL and anon key not provided in environment variables. Using dummy values for development.');
  console.warn('⚠️ Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment to connect to your Supabase project.');
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
