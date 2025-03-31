
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Home, Book } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="w-full border-b">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">QCM Creator Hub</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/quizzes" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost">My Quizzes</Button>
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/create">
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
