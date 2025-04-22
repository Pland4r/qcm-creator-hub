import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { quizService } from '@/services/apiService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const QuizView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
      <Layout className="flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </Layout>
    );
  }

  if (error || !quiz) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  return (
    <Layout>
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <Card className="border-2">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl">{quiz.title}</CardTitle>
              <p className="text-muted-foreground">{quiz.description}</p>
            </div>
            <Badge variant={quiz.technology === 'spring' ? 'secondary' : 'default'} className="text-sm">
              {quiz.technology === 'spring' ? 'Spring Boot' : quiz.technology === 'angular' ? 'Angular' : 'Both'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Questions</h3>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => (
                <Card key={question.id} className="border">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">
                      {index + 1}. {question.text}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {question.imageUrl && (
                      <img 
                        src={question.imageUrl} 
                        alt={`Question ${index + 1}`} 
                        className="max-h-64 rounded-lg mx-auto object-cover"
                      />
                    )}
                    
                    {question.questionType === "DIRECT_ANSWER" ? (
                      <div className="p-4 bg-green-100 rounded-lg border border-green-200">
                        <p className="font-medium text-green-800">
                          Correct Answer: {question.directAnswer}
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className={`p-4 rounded-lg ${
                              option.isCorrect 
                                ? 'bg-green-100 border border-green-200' 
                                : 'bg-muted'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={option.isCorrect ? 'font-medium' : ''}>
                                {option.text}
                              </span>
                              {option.isCorrect && (
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  Correct Answer
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default QuizView;
