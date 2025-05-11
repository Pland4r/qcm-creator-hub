
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Navbar />
      <div className={`container max-w-7xl mx-auto p-6 ${className}`}>
        {children}
      </div>
      <footer className="border-t mt-12 py-6 text-center text-sm text-muted-foreground">
        <div className="container max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} QCM Creator Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
