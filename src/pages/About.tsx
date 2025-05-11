
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Users, Code, CheckCircle, LineChart, Shield, Globe } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="py-12 md:py-24 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About QCM Creator Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Empowering developers with interactive learning tools for Spring Boot and Angular
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-all border-2 hover:border-primary/20">
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

          <Card className="hover:shadow-lg transition-all border-2 hover:border-secondary/20">
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

        {/* Features Grid */}
        <Card className="max-w-6xl mx-auto mt-12 border-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-transparent opacity-50"></div>
          <CardHeader>
            <CardTitle className="text-2xl">Why Choose QCM Creator Hub?</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Team Section */}
        <div className="pt-12 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
            We're a passionate group of developers and educators dedicated to improving
            the learning experience for web developers around the world.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Alex Johnson", role: "Founder & Lead Developer", image: "https://i.pravatar.cc/150?img=1" },
              { name: "Sarah Chen", role: "UX Designer", image: "https://i.pravatar.cc/150?img=5" },
              { name: "Michael Rodriguez", role: "Content Strategist", image: "https://i.pravatar.cc/150?img=3" },
              { name: "Emily Taylor", role: "Community Manager", image: "https://i.pravatar.cc/150?img=4" }
            ].map((person, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 mb-4">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const features = [
  {
    title: "Interactive Learning",
    description: "Create and take quizzes that help reinforce your understanding of key concepts.",
    icon: Book
  },
  {
    title: "Focused Content",
    description: "Specialized quizzes for Spring Boot and Angular, covering both basics and advanced topics.",
    icon: Code
  },
  {
    title: "Visual Learning",
    description: "Support for images and diagrams to enhance understanding of complex concepts.",
    icon: LineChart
  },
  {
    title: "Community Reviews",
    description: "Get feedback from peers and experts in the development community.",
    icon: Users
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning progress and identify areas for improvement.",
    icon: CheckCircle
  },
  {
    title: "Regular Updates",
    description: "New content and features added regularly to keep up with framework updates.",
    icon: Shield
  }
];

export default About;
