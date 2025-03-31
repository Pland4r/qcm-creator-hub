
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, Edit, Search, Trash, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Mock data for quizzes
const mockQuizzes = [
  {
    id: '1',
    title: 'Spring Boot Basics',
    description: 'Test your knowledge of Spring Boot fundamentals and core concepts.',
    questions: 10,
    technology: 'spring',
    createdAt: '2023-08-14T12:00:00Z',
  },
  {
    id: '2',
    title: 'Angular Components & Services',
    description: 'Quiz on Angular components, services, dependency injection and more.',
    questions: 8,
    technology: 'angular',
    createdAt: '2023-08-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'REST API with Spring Boot',
    description: 'Test your knowledge of building RESTful APIs with Spring Boot.',
    questions: 12,
    technology: 'spring',
    createdAt: '2023-07-25T09:15:00Z',
  },
];

const Quizzes = () => {
  const [quizzes] = useState(mockQuizzes);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {filteredQuizzes.length === 0 ? (
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
            {filteredQuizzes.map(quiz => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-1">{quiz.title}</CardTitle>
                      <CardDescription>
                        {quiz.questions} questions · {quiz.technology === 'spring' ? 'Spring Boot' : 'Angular'}
                      </CardDescription>
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      quiz.technology === 'spring' 
                        ? 'bg-secondary/10 text-secondary' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {quiz.technology === 'spring' ? 'Spring' : 'Angular'}
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
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <div className="space-x-2">
                    <Button variant="ghost" size="sm">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                    <Button size="sm">
                      View
                    </Button>
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
