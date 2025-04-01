
import axios from 'axios';
import { Quiz, QuizQuestion } from '@/lib/supabase';

// Base URL for the Spring Boot backend
// In a production app, you would use environment variables
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token (if you implement JWT auth)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication services
export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    // Store the token if your Spring Boot backend returns one
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },
  
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

// Quiz services
export const quizService = {
  // Get all quizzes
  fetchQuizzes: async (): Promise<Quiz[]> => {
    const response = await api.get('/quizzes');
    return response.data;
  },
  
  // Get a single quiz by ID
  fetchQuizById: async (id: string): Promise<Quiz | null> => {
    try {
      const response = await api.get(`/quizzes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quiz:', error);
      return null;
    }
  },
  
  // Create a new quiz
  createQuiz: async (quizData: Omit<Quiz, 'id' | 'createdAt'>): Promise<string> => {
    const response = await api.post('/quizzes', quizData);
    return response.data.id;
  },
  
  // Update an existing quiz
  updateQuiz: async (id: string, quizData: Partial<Omit<Quiz, 'id' | 'createdAt'>>): Promise<void> => {
    await api.put(`/quizzes/${id}`, quizData);
  },
  
  // Delete a quiz
  deleteQuiz: async (id: string): Promise<void> => {
    await api.delete(`/quizzes/${id}`);
  },
};
