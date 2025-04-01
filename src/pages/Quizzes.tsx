
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, Edit, Search, Trash, Plus, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchQuizzes, deleteQuiz } from '@/services/quizService';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const Quizzes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch quizzes
  const { data: quizzes, isLoading, error } = useQuery({
    queryKey: ['quizzes'],
    queryFn: fetchQuizzes,
  });

  // Delete quiz mutation
  const deleteMutation = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      toast({
        title: "Quiz deleted",
        description: "Your quiz has been successfully deleted",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete quiz",
        variant: "destructive",
      });
    },
  });

  const handleDeleteQuiz = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  // Filter quizzes based on search term
  const filteredQuizzes = quizzes?.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-destructive">Error loading quizzes</h2>
            <p className="text-muted-foreground mt-2">
              {error instanceof Error ? error.message : "An unknown error occurred"}
            </p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['quizzes'] })} className="mt-4">
              Try Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Quizzes</h1>
            <p className="text-muted-foreground">Manage your created quizzes</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search quizzes..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to="/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Quiz
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredQuizzes?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Book className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No quizzes found</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              {searchTerm 
                ? `No quizzes match your search for "${searchTerm}". Try a different search term.`
                : "You haven't created any quizzes yet. Create your first quiz to get started."}
            </p>
            {!searchTerm && (
              <Link to="/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Quiz
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes?.map(quiz => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-1">{quiz.title}</CardTitle>
                      <CardDescription>
                        {quiz.questions.length} questions · {quiz.technology === 'spring' ? 'Spring Boot' : quiz.technology === 'angular' ? 'Angular' : 'Both'}
                      </CardDescription>
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      quiz.technology === 'spring' 
                        ? 'bg-secondary/10 text-secondary' 
                        : quiz.technology === 'angular'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {quiz.technology === 'spring' ? 'Spring' : quiz.technology === 'angular' ? 'Angular' : 'Both'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{quiz.description}</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    Created {new Date(quiz.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to={`/edit/${quiz.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <div className="space-x-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            quiz and all of its data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteQuiz(quiz.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {deleteMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link to={`/quiz/${quiz.id}`}>
                      <Button size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Quizzes;
