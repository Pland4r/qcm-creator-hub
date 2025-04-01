
import { supabase, Quiz, QuizQuestion } from '@/lib/supabase';

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }

  return data || [];
};

export const fetchQuizById = async (id: string): Promise<Quiz | null> => {
  // Fetch quiz
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('*')
    .eq('id', id)
    .single();

  if (quizError) {
    console.error('Error fetching quiz:', quizError);
    throw quizError;
  }

  if (!quiz) return null;

  // Fetch questions for the quiz
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('*, options(*)')
    .eq('quiz_id', id)
    .order('id');

  if (questionsError) {
    console.error('Error fetching questions:', questionsError);
    throw questionsError;
  }

  // Return combined data
  return {
    ...quiz,
    questions: questions || [],
  };
};

export const createQuiz = async (quizData: Omit<Quiz, 'id' | 'createdAt'>): Promise<string> => {
  // First create the quiz
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .insert({
      title: quizData.title,
      description: quizData.description,
      technology: quizData.technology,
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (quizError) {
    console.error('Error creating quiz:', quizError);
    throw quizError;
  }

  // Then create questions with the quiz ID
  for (const question of quizData.questions) {
    const { data: questionData, error: questionError } = await supabase
      .from('questions')
      .insert({
        quiz_id: quiz.id,
        text: question.text,
      })
      .select()
      .single();

    if (questionError) {
      console.error('Error creating question:', questionError);
      throw questionError;
    }

    // Create options for each question
    for (const option of question.options) {
      const { error: optionError } = await supabase
        .from('options')
        .insert({
          question_id: questionData.id,
          text: option.text,
          is_correct: option.isCorrect,
        });

      if (optionError) {
        console.error('Error creating option:', optionError);
        throw optionError;
      }
    }
  }

  return quiz.id;
};

export const updateQuiz = async (id: string, quizData: Partial<Omit<Quiz, 'id' | 'createdAt'>>): Promise<void> => {
  const { error } = await supabase
    .from('quizzes')
    .update({
      title: quizData.title,
      description: quizData.description,
      technology: quizData.technology,
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating quiz:', error);
    throw error;
  }

  // Handle question updates if provided
  if (quizData.questions) {
    // This is a simplified approach - in a real app, you'd need to handle
    // updating, adding, and removing questions more carefully
    // For this example, we'll delete existing questions and recreate them
    
    // Delete existing questions (will cascade delete options if set up properly in Supabase)
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .eq('quiz_id', id);

    if (deleteError) {
      console.error('Error deleting questions:', deleteError);
      throw deleteError;
    }

    // Add new questions
    for (const question of quizData.questions) {
      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .insert({
          quiz_id: id,
          text: question.text,
        })
        .select()
        .single();

      if (questionError) {
        console.error('Error creating question:', questionError);
        throw questionError;
      }

      // Create options for each question
      for (const option of question.options) {
        const { error: optionError } = await supabase
          .from('options')
          .insert({
            question_id: questionData.id,
            text: option.text,
            is_correct: option.isCorrect,
          });

        if (optionError) {
          console.error('Error creating option:', optionError);
          throw optionError;
        }
      }
    }
  }
};

export const deleteQuiz = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('quizzes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
};
