
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash, Save, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { quizService } from '@/services/apiService';
import { Quiz } from '@/lib/supabase';

interface Question {
  id: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technology, setTechnology] = useState('spring');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: '',
      options: [
        { id: '1-1', text: '', isCorrect: false },
        { id: '1-2', text: '', isCorrect: false },
        { id: '1-3', text: '', isCorrect: false },
        { id: '1-4', text: '', isCorrect: false },
      ],
    },
  ]);
  const { toast } = useToast();

  const addQuestion = () => {
    const newId = String(questions.length + 1);
    setQuestions([
      ...questions,
      {
        id: newId,
        text: '',
        options: [
          { id: `${newId}-1`, text: '', isCorrect: false },
          { id: `${newId}-2`, text: '', isCorrect: false },
          { id: `${newId}-3`, text: '', isCorrect: false },
          { id: `${newId}-4`, text: '', isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    } else {
      toast({
        title: "Cannot remove",
        description: "You need at least one question in your quiz.",
        variant: "destructive"
      });
    }
  };

  const updateQuestionText = (id: string, text: string) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, text } : q))
    );
  };

  const updateOptionText = (questionId: string, optionId: string, text: string) => {
    setQuestions(
      questions.map(q =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map(o =>
                o.id === optionId ? { ...o, text } : o
              ),
            }
          : q
      )
    );
  };

  const setCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map(q =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map(o => ({
                ...o,
                isCorrect: o.id === optionId,
              })),
            }
          : q
      )
    );
  };

  const createQuizMutation = useMutation({
    mutationFn: quizService.createQuiz,
    onSuccess: (quizId) => {
      toast({
        title: "Quiz created!",
        description: "Your quiz has been successfully created.",
      });
      navigate(`/quiz/${quizId}`);
    },
    onError: (error) => {
      toast({
        title: "Error creating quiz",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  });

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please add a title for your quiz.",
        variant: "destructive"
      });
      return;
    }

    const hasEmptyQuestions = questions.some(q => !q.text.trim());
    if (hasEmptyQuestions) {
      toast({
        title: "Empty questions",
        description: "Please fill in all question fields.",
        variant: "destructive"
      });
      return;
    }

    const hasEmptyOptions = questions.some(q => 
      q.options.some(o => !o.text.trim())
    );
    if (hasEmptyOptions) {
      toast({
        title: "Empty options",
        description: "Please fill in all option fields.",
        variant: "destructive"
      });
      return;
    }

    const hasMissingCorrectAnswers = questions.some(q => 
      !q.options.some(o => o.isCorrect)
    );
    if (hasMissingCorrectAnswers) {
      toast({
        title: "Missing correct answers",
        description: "Please select a correct answer for each question.",
        variant: "destructive"
      });
      return;
    }

    try {
      const quizData: Omit<Quiz, 'id' | 'createdAt'> = {
        title,
        description,
        technology: technology as 'spring' | 'angular' | 'both',
        questions: questions.map(q => ({
          id: q.id,
          text: q.text,
          options: q.options.map(o => ({
            id: o.id,
            text: o.text,
            isCorrect: o.isCorrect,
          }))
        }))
      };
      
      createQuizMutation.mutate(quizData);
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast({
        title: "Error",
        description: "Failed to create quiz. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Quiz</h1>
          <p className="text-muted-foreground">Design your custom QCM for Spring Boot or Angular</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
              <CardDescription>Set the basic information for your quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Spring Boot Fundamentals" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe what your quiz covers..." 
                  className="min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technology">Technology</Label>
                <Select value={technology} onValueChange={setTechnology}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technology" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring">Spring Boot</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Questions</h2>
              <Button onClick={addQuestion}>
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            {questions.map((question, qIndex) => (
              <Card key={question.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Question {qIndex + 1}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeQuestion(question.id)}
                    >
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor={`q-${question.id}`}>Question Text</Label>
                    <Textarea
                      id={`q-${question.id}`}
                      placeholder="Enter your question here..."
                      value={question.text}
                      onChange={(e) => updateQuestionText(question.id, e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Options</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.options.map((option, oIndex) => (
                        <div key={option.id} className="flex space-x-2">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center">
                              <Label 
                                htmlFor={`o-${option.id}`} 
                                className="mr-2"
                              >
                                {String.fromCharCode(65 + oIndex)}.
                              </Label>
                              <Input
                                id={`o-${option.id}`}
                                placeholder={`Option ${oIndex + 1}`}
                                value={option.text}
                                onChange={(e) => updateOptionText(question.id, option.id, e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              variant={option.isCorrect ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCorrectOption(question.id, option.id)}
                              className="w-[80px]"
                            >
                              {option.isCorrect ? "Correct" : "Set Correct"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-end space-x-4 mt-8">
              <Button variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={createQuizMutation.isPending}>
                {createQuizMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Quiz
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateQuiz;
