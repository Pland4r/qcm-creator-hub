import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { quizService } from '@/services/apiService';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const QuizView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Log the backend connection info
  React.useEffect(() => {
    console.log("Connecting to Spring Boot backend...");
  }, []);

  const { data: quiz, isLoading, error } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => id ? quizService.fetchQuizById(id) : null,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading quiz...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-destructive">Error loading quiz</h2>
            <p className="text-muted-foreground mt-2">
              {error instanceof Error ? error.message : "Quiz not found or unavailable"}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </div>
              <Badge variant={quiz.technology === 'spring' ? 'secondary' : 'default'}>
                {quiz.technology === 'spring' ? 'Spring Boot' : quiz.technology === 'angular' ? 'Angular' : 'Both'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Questions</h3>
              {quiz.questions.map((question, index) => (
                <Card key={question.id} className="border border-muted">
                  <CardHeader>
                    <CardTitle className="text-base">
                      {index + 1}. {question.text}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {question.options.map((option) => (
                        <div
                          key={option.id}
                          className={`p-3 rounded-md ${
                            option.isCorrect 
                              ? 'bg-green-100 border border-green-300 dark:bg-green-900/20 dark:border-green-800' 
                              : 'bg-muted'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="flex-1">
                              {option.text}
                            </div>
                            {option.isCorrect && (
                              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                                Correct Answer
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default QuizView;
