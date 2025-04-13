
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/layout/MainLayout";
import { MessageSquare, Users, MessageCircle, Clock, Heart, ChevronUp } from "lucide-react";

const ForumTopics = [
  { id: 1, name: "Anxiety", count: 324 },
  { id: 2, name: "Depression", count: 218 },
  { id: 3, name: "Stress", count: 176 },
  { id: 4, name: "Loneliness", count: 129 },
  { id: 5, name: "Motivation", count: 98 },
  { id: 6, name: "Relationships", count: 87 },
  { id: 7, name: "Self-Care", count: 64 },
  { id: 8, name: "Work/Life Balance", count: 52 },
];

const ForumPosts = [
  {
    id: 1,
    title: "How do you cope with social anxiety at work?",
    preview: "I've been struggling with meetings and presentations...",
    author: "User_2489",
    topic: "Anxiety",
    replies: 8,
    likes: 12,
    timeAgo: "2h ago",
  },
  {
    id: 2,
    title: "Finding motivation when you feel stuck",
    preview: "I've been in the same situation for months and can't seem to find the energy to make a change...",
    author: "User_7392",
    topic: "Motivation",
    replies: 15,
    likes: 27,
    timeAgo: "4h ago",
  },
  {
    id: 3,
    title: "Techniques for managing panic attacks",
    preview: "I've found some breathing exercises that help, but I'm looking for more strategies...",
    author: "User_1056",
    topic: "Anxiety",
    replies: 23,
    likes: 31,
    timeAgo: "6h ago",
  },
  {
    id: 4,
    title: "Feeling disconnected from friends and family",
    preview: "Ever since the pandemic, I've felt like there's a wall between me and my loved ones...",
    author: "User_4201",
    topic: "Loneliness",
    replies: 19,
    likes: 24,
    timeAgo: "12h ago",
  },
  {
    id: 5,
    title: "How to practice self-compassion when you keep making mistakes",
    preview: "I'm my own worst critic and it's exhausting. How do you learn to be kind to yourself?",
    author: "User_8106",
    topic: "Self-Care",
    replies: 14,
    likes: 36,
    timeAgo: "1d ago",
  },
];

const Forum = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-background to-mindhealer-light">
        <div className="mindhealer-container relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Connect. Share. Support.
              <span className="block text-gradient">Anonymously.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Join real-time discussions with others navigating similar experiences. Post anonymously, reply to threads, or start a 1-on-1 anonymous chat—all in a secure and judgment-free space.
            </p>
            
            <div className="flex items-center mt-8 space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
              <span className="text-sm font-medium text-foreground">27 users online</span>
            </div>
            
            <Badge variant="outline" className="mt-4 text-xs">
              You are chatting as User_3482
            </Badge>
          </div>
        </div>
      </section>

      {/* Forum Content */}
      <section className="py-12 bg-background">
        <div className="mindhealer-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-mindhealer-primary" />
                    Discussion Topics
                  </h3>
                  
                  <div className="space-y-2">
                    {ForumTopics.map((topic) => (
                      <div key={topic.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary transition-colors cursor-pointer">
                        <span className="text-sm">{topic.name}</span>
                        <Badge variant="secondary" className="text-xs">{topic.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-mindhealer-primary hover:bg-mindhealer-secondary">
                    Chat with Someone Now
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Start a New Thread</h3>
                  <div className="space-y-4">
                    <Input placeholder="Enter a title for your thread..." className="w-full" />
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-mindhealer-primary hover:bg-mindhealer-secondary">
                        Create a Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="recent">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  </TabsList>
                  
                  <Input 
                    placeholder="Search discussions..." 
                    className="max-w-[200px]"
                  />
                </div>

                <TabsContent value="recent" className="mt-0">
                  <div className="space-y-4">
                    {ForumPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-2 mb-2">
                            <Badge className="bg-mindhealer-light text-mindhealer-primary hover:bg-mindhealer-light">
                              {post.topic}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {post.author}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                          <p className="text-muted-foreground mb-4">{post.preview}</p>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="flex items-center mr-4">
                              <MessageCircle className="mr-1 h-4 w-4" />
                              {post.replies} replies
                            </div>
                            <div className="flex items-center mr-4">
                              <Heart className="mr-1 h-4 w-4" />
                              {post.likes} likes
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {post.timeAgo}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Button variant="outline" className="flex items-center">
                      Load More
                      <ChevronUp className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="popular" className="mt-0">
                  <div className="flex items-center justify-center h-40 text-muted-foreground">
                    Popular discussions will appear here.
                  </div>
                </TabsContent>
                
                <TabsContent value="unanswered" className="mt-0">
                  <div className="flex items-center justify-center h-40 text-muted-foreground">
                    Unanswered discussions will appear here.
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Forum;
