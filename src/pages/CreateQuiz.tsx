
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash, Save, Loader2, ImageIcon, MessageSquare } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { quizService } from '@/services/apiService';
import { Quiz } from '@/lib/supabase';
import ImageUpload from '@/components/ImageUpload';

enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  DIRECT_ANSWER = "DIRECT_ANSWER"
}

interface Question {
  id: string;
  text: string;
  imageUrl: string;
  questionType: QuestionType;
  directAnswer: string;
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
      imageUrl: '',
      questionType: QuestionType.MULTIPLE_CHOICE,
      directAnswer: '',
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
        imageUrl: '',
        questionType: QuestionType.MULTIPLE_CHOICE,
        directAnswer: '',
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

  const updateQuestionImage = (id: string, imageUrl: string) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, imageUrl } : q))
    );
  };

  const updateQuestionType = (id: string, questionType: QuestionType) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, questionType } : q))
    );
  };

  const updateDirectAnswer = (id: string, directAnswer: string) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, directAnswer } : q))
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

    const hasEmptyDirectAnswers = questions.some(q => 
      q.questionType === QuestionType.DIRECT_ANSWER && !q.directAnswer.trim()
    );
    if (hasEmptyDirectAnswers) {
      toast({
        title: "Missing direct answers",
        description: "Please provide answers for all direct answer questions.",
        variant: "destructive"
      });
      return;
    }

    const multipleChoiceQuestions = questions.filter(q => q.questionType === QuestionType.MULTIPLE_CHOICE);
    
    const hasEmptyOptions = multipleChoiceQuestions.some(q => 
      q.options.some(o => !o.text.trim())
    );
    if (hasEmptyOptions) {
      toast({
        title: "Empty options",
        description: "Please fill in all option fields for multiple choice questions.",
        variant: "destructive"
      });
      return;
    }

    const hasMissingCorrectAnswers = multipleChoiceQuestions.some(q => 
      !q.options.some(o => o.isCorrect)
    );
    if (hasMissingCorrectAnswers) {
      toast({
        title: "Missing correct answers",
        description: "Please select a correct answer for each multiple choice question.",
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
          imageUrl: q.imageUrl,
          questionType: q.questionType,
          directAnswer: q.directAnswer,
          options: q.questionType === QuestionType.MULTIPLE_CHOICE ? q.options.map(o => ({
            id: o.id,
            text: o.text,
            isCorrect: o.isCorrect,
          })) : []
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
    <Layout className="max-w-5xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Create New Quiz</h1>
          <p className="text-muted-foreground">Design interactive quizzes for Spring Boot and Angular</p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
            <CardDescription>Basic information about your quiz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
            <h2 className="text-2xl font-semibold tracking-tight">Questions</h2>
            <Button onClick={addQuestion} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Question
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((question, qIndex) => (
              <Card key={question.id} className="border-2">
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

                  <ImageUpload
                    imageUrl={question.imageUrl}
                    onImageChange={(url) => updateQuestionImage(question.id, url)}
                  />

                  <div className="space-y-4">
                    <Label>Question Type</Label>
                    <RadioGroup 
                      value={question.questionType} 
                      onValueChange={(value) => updateQuestionType(question.id, value as QuestionType)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={QuestionType.MULTIPLE_CHOICE} id={`mc-${question.id}`} />
                        <Label htmlFor={`mc-${question.id}`} className="flex items-center cursor-pointer">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Multiple Choice
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={QuestionType.DIRECT_ANSWER} id={`da-${question.id}`} />
                        <Label htmlFor={`da-${question.id}`} className="flex items-center cursor-pointer">
                          <ImageIcon className="h-4 w-4 mr-1" />
                          Direct Answer
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {question.questionType === QuestionType.DIRECT_ANSWER ? (
                    <div className="space-y-2">
                      <Label htmlFor={`da-${question.id}`}>Correct Answer</Label>
                      <Input
                        id={`da-${question.id}`}
                        placeholder="Enter the correct answer"
                        value={question.directAnswer}
                        onChange={(e) => updateDirectAnswer(question.id, e.target.value)}
                      />
                    </div>
                  ) : (
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
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-6">
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
    </Layout>
  );
};

export default CreateQuiz;
