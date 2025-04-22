
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Home, Book, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="flex items-center">
              <Book className="h-4 w-4 mr-2" />
              About
            </Button>
          </Link>
          {user && (
            <Link to="/quizzes" className="text-sm font-medium transition-colors hover:text-primary">
              <Button variant="ghost">My Quizzes</Button>
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/create">
                <Button className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quiz
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground truncate max-w-[200px]">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
