
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Book, Code } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Create Interactive Spring Boot and Angular Quizzes
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Design, share, and test knowledge with our specialized QCM platform for Java Spring Boot and Angular developers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/create">
                  <Button size="lg" className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Quiz
                  </Button>
                </Link>
                <Link to="/quizzes">
                  <Button size="lg" variant="outline">
                    Browse Quizzes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Technologies
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Specialized content for modern web development stacks
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="tech-icon">
                      <svg viewBox="0 0 24 24" className="h-10 w-10 text-secondary" fill="currentColor">
                        <path d="M2.5 13.5h19v2h-19zM2.5 8.5h19v2h-19zM2.5 3.5h19v2h-19zM2.5 18.5h19v2h-19z"/>
                      </svg>
                    </div>
                    <CardTitle>Spring Boot</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Create quizzes on Spring Boot core concepts, REST APIs, Security, JPA, and more.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link to="/create" className="w-full">
                    <Button variant="outline" className="w-full">Create Spring Boot Quiz</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="tech-icon">
                      <svg viewBox="0 0 24 24" className="h-10 w-10 text-primary" fill="currentColor">
                        <path d="M9.93 12.645h4.134L11.996 7.74M11.996.009L.686 3.988l1.725 14.76 9.585 5.243 9.588-5.238L23.308 3.99 11.996.01zm7.058 18.297h-2.636l-1.42-3.501H8.995l-1.42 3.501H4.937l7.06-15.648 7.057 15.648z"/>
                      </svg>
                    </div>
                    <CardTitle>Angular</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Test knowledge on Angular components, services, routing, RxJS, and state management.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link to="/create" className="w-full">
                    <Button variant="outline" className="w-full">Create Angular Quiz</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} QCM Creator Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
