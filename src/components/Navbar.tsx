
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Home, Book, LogOut, User, FileText } from 'lucide-react';
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
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;
  const getNavLinkClasses = (path: string) => {
    return isActive(path) 
      ? "text-primary font-medium border-b-2 border-primary" 
      : "text-foreground hover:text-primary transition-colors";
  };

  return (
    <div className="w-full border-b sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline">QCM Creator Hub</span>
            <span className="font-bold text-xl sm:hidden">QCM</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 mx-6">
          <Link to="/" className={`${getNavLinkClasses('/')} py-1.5`}>
            <span className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Home</span>
            </span>
          </Link>
          <Link to="/about" className={`${getNavLinkClasses('/about')} py-1.5`}>
            <span className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">About</span>
            </span>
          </Link>
          {user && (
            <Link to="/quizzes" className={`${getNavLinkClasses('/quizzes')} py-1.5`}>
              <span className="flex items-center">
                <Book className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">My Quizzes</span>
              </span>
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/create">
                <Button className="flex items-center group">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Create Quiz</span>
                  <span className="sm:hidden">Create</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-muted/50">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground truncate max-w-[200px]">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
