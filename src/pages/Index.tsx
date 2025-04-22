
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Book, Code, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      <section className="py-12 md:py-24 lg:py-32 space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Master Spring Boot & Angular
          </h1>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Create and share interactive quizzes to test your knowledge of modern web development frameworks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/create">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Create Quiz
              </Button>
            </Link>
            <Link to="/quizzes">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse Quizzes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-12">
          <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Spring Boot</h3>
                  <p className="text-muted-foreground">
                    Test your knowledge of Spring Boot core concepts, REST APIs, Security, and more
                  </p>
                  <Link to="/create" className="inline-flex items-center text-primary hover:underline">
                    Create Spring Quiz
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Book className="h-6 w-6 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Angular</h3>
                  <p className="text-muted-foreground">
                    Challenge yourself with Angular components, services, RxJS, and state management
                  </p>
                  <Link to="/create" className="inline-flex items-center text-secondary hover:underline">
                    Create Angular Quiz
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
