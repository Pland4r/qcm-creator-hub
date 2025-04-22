
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Users } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="py-12 md:py-24 space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About QCM Creator Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Empowering developers with interactive learning tools for Spring Boot and Angular
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We're dedicated to making learning modern web development frameworks more 
                accessible and interactive. Our platform enables developers to create, share, 
                and practice with customized quizzes focused on Spring Boot and Angular.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Community-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Our platform thrives on community contributions. Every quiz created adds 
                to our growing knowledge base, helping developers worldwide master 
                Spring Boot and Angular concepts through practical assessments.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-6xl mx-auto mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">Why Choose QCM Creator Hub?</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

const features = [
  {
    title: "Interactive Learning",
    description: "Create and take quizzes that help reinforce your understanding of key concepts."
  },
  {
    title: "Focused Content",
    description: "Specialized quizzes for Spring Boot and Angular, covering both basics and advanced topics."
  },
  {
    title: "Visual Learning",
    description: "Support for images and diagrams to enhance understanding of complex concepts."
  },
  {
    title: "Community Reviews",
    description: "Get feedback from peers and experts in the development community."
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning progress and identify areas for improvement."
  },
  {
    title: "Regular Updates",
    description: "New content and features added regularly to keep up with framework updates."
  }
];

export default About;
