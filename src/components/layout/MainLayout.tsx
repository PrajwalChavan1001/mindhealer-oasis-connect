
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle, Users, Heart } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Forum", path: "/forum", icon: Users },
    { name: "Chat", path: "/chat", icon: MessageCircle },
    { name: "Therapists", path: "/therapists", icon: Heart },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="mindhealer-container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-mindhealer-primary p-1">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <Link to="/" className="text-xl font-bold">
              MindHealer
            </Link>
          </div>
          <nav className="hidden md:flex">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-mindhealer-primary",
                      location.pathname === item.path
                        ? "text-mindhealer-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <Button 
              variant="outline" 
              className="mr-2 hidden sm:inline-flex"
            >
              Sign In
            </Button>
            <Button
              className="bg-mindhealer-primary hover:bg-mindhealer-secondary"
            >
              Join Now
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-background py-6">
        <div className="mindhealer-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="rounded-full bg-mindhealer-primary p-1">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">MindHealer</span>
            </div>
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-mindhealer-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 md:mt-0 text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} MindHealer. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-3 text-xs font-medium",
                location.pathname === item.path
                  ? "text-mindhealer-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="mb-1 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
