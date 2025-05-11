
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Book, Code, ArrowRight, ChevronRight, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <section className="py-12 md:py-24 lg:py-32 space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            The Ultimate Quiz Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Master Spring Boot & Angular
          </h1>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Create and share interactive quizzes to test your knowledge of modern web development frameworks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to={user ? "/create" : "/auth"}>
              <Button size="lg" className="w-full sm:w-auto group">
                <Plus className="mr-2 h-4 w-4" />
                Create Quiz
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to={user ? "/quizzes" : "/auth"}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse Quizzes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 pt-12">
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Code className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Spring Boot</h3>
                  <p className="text-muted-foreground">
                    Test your knowledge of Spring Boot core concepts, REST APIs, Security, and more
                  </p>
                  <div className="pt-4 space-y-2">
                    {['Dependency Injection', 'RESTful Services', 'Security'].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={user ? "/create" : "/auth"} className="inline-flex items-center text-primary hover:underline mt-4 group">
                    Create Spring Quiz
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/50">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-50"></div>
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
                  <Book className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Angular</h3>
                  <p className="text-muted-foreground">
                    Challenge yourself with Angular components, services, RxJS, and state management
                  </p>
                  <div className="pt-4 space-y-2">
                    {['Components', 'Services', 'Reactive Forms'].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={user ? "/create" : "/auth"} className="inline-flex items-center text-secondary hover:underline mt-4 group">
                    Create Angular Quiz
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose QCM Creator Hub?</h2>
            <p className="text-muted-foreground mt-2">Features that help you learn effectively</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive Learning",
                description: "Create and take quizzes with immediate feedback",
                icon: Book
              },
              {
                title: "Framework Focused",
                description: "Specialized content for Spring Boot and Angular",
                icon: Code
              },
              {
                title: "Progress Tracking",
                description: "Monitor your improvement over time",
                icon: CheckCircle
              }
            ].map((feature, i) => (
              <Card key={i} className="border hover:border-primary/30 transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
