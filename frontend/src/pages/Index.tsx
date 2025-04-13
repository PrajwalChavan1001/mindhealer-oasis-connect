
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { MessageCircle, BrainCircuit, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard";

const Index = () => {
  // Placeholder for authentication state - in a real app, this would come from your auth context
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Mock auth check - in a real app, this would check your actual auth state
  useEffect(() => {
    // For example purposes - you would replace this with your actual auth check
    const checkAuth = () => {
      // Simulate logged in state - replace with your actual auth check
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      setUserName(localStorage.getItem("userName") || "Friend");
    };
    
    checkAuth();
    
    // Demo purposes only - allows toggling login state for testing
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <MainLayout>
      {isLoggedIn ? (
        <Dashboard userName={userName} />
      ) : (
        // Hero Section for non-logged in users
        <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-background to-mindhealer-light">
          <div className="absolute inset-0 bg-gradient-radial from-mindhealer-light/50 to-transparent opacity-70"></div>
          <div className="mindhealer-container relative z-10">
            <div className="flex flex-col items-center text-center">
              <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
                Welcome to <span className="text-gradient">MindHealer</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in [animation-delay:200ms]">
                Your safe space for mental wellness. MindHealer is an anonymous mental wellness platform where you can reflect, connect, and heal—at your own pace.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in [animation-delay:400ms]">
                <Button 
                  asChild
                  className="bg-mindhealer-primary hover:bg-mindhealer-secondary text-white px-8 py-6"
                  size="lg"
                >
                  <Link to="/forum">Join the Conversation</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="px-8 py-6"
                  size="lg"
                >
                  <Link to="/chat">Start Your Wellness Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="mindhealer-container">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="mindhealer-card animate-fade-in [animation-delay:200ms]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-mindhealer-light p-4 mb-4">
                  <Users className="h-6 w-6 text-mindhealer-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Anonymous Community Forum</h3>
                <p className="text-muted-foreground">
                  Connect with others in a safe, judgment-free space where you can share experiences and find support.
                </p>
                <Button asChild variant="link" className="mt-4 text-mindhealer-primary">
                  <Link to="/forum">Join the Forum</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="mindhealer-card animate-fade-in [animation-delay:300ms]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-mindhealer-light p-4 mb-4">
                  <MessageCircle className="h-6 w-6 text-mindhealer-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Chat Support</h3>
                <p className="text-muted-foreground">
                  Talk with our compassionate AI assistant anytime, anywhere. Get support, guidance, and a listening ear 24/7.
                </p>
                <Button asChild variant="link" className="mt-4 text-mindhealer-primary">
                  <Link to="/chat">Start Chatting</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="mindhealer-card animate-fade-in [animation-delay:400ms]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-mindhealer-light p-4 mb-4">
                  <BrainCircuit className="h-6 w-6 text-mindhealer-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Self-Help Tools & Resources</h3>
                <p className="text-muted-foreground">
                  Access a library of evidence-based resources, exercises, and tools to support your mental wellness journey.
                </p>
                <Button asChild variant="link" className="mt-4 text-mindhealer-primary">
                  <Link to="/chat">Explore Resources</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="mindhealer-card animate-fade-in [animation-delay:500ms]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-mindhealer-light p-4 mb-4">
                  <Calendar className="h-6 w-6 text-mindhealer-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Therapist Booking</h3>
                <p className="text-muted-foreground">
                  Connect with licensed therapists for secure, confidential sessions on your terms and at your convenience.
                </p>
                <Button asChild variant="link" className="mt-4 text-mindhealer-primary">
                  <Link to="/therapists">Find a Therapist</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose MindHealer */}
      <section className="py-20 bg-gradient-to-br from-mindhealer-light/50 to-background">
        <div className="mindhealer-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MindHealer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've created a comprehensive platform that combines community support, AI assistance, and professional help—all in one secure space.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-mindhealer-primary/10 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mindhealer-primary">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Privacy</h3>
              <p className="text-muted-foreground">
                Your identity is protected. Share and connect anonymously with complete peace of mind.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-mindhealer-primary/10 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mindhealer-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
              <p className="text-muted-foreground">
                Access support whenever you need it, day or night, through our AI chat and community forums.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-mindhealer-primary/10 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mindhealer-primary">
                  <polyline points="17 2 12 7 7 2" />
                  <path d="M17 17a5 5 0 0 0-10 0" />
                  <line x1="12" x2="12" y1="7" y2="22" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Holistic Approach</h3>
              <p className="text-muted-foreground">
                From self-help tools to professional therapy, we provide a complete ecosystem for mental wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-mindhealer-primary/10">
        <div className="mindhealer-container">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold">Ready to start your healing journey?</h2>
                <p className="mt-2 text-muted-foreground">
                  Join thousands of others finding solace and support in our community.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  className="bg-mindhealer-primary hover:bg-mindhealer-secondary"
                  size="lg"
                >
                  <Link to="/forum">Join the Community</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                >
                  <Link to="/chat">Talk to MindHealer AI</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
