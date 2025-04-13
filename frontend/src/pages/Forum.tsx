
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/layout/MainLayout";
import { MessageSquare, Users, MessageCircle, Clock, Heart, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Types
interface ForumTopic {
  _id: string;
  name: string;
  count: number;
}

interface ForumPost {
  _id: string;
  title: string;
  preview: string;
  author: string;
  topic: string;
  replies: any[];
  likes: number;
  createdAt: string;
}

const Forum = () => {
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("recent");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [postTopic, setPostTopic] = useState("Anxiety");
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * 30) + 5); // Random number between 5-35
  const { toast } = useToast();

  // Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('forum-topics', {
          method: 'GET',
        });
        
        if (error) {
          throw error;
        }
        
        if (data.topics && data.topics.length > 0) {
          setForumTopics(data.topics);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast({
          title: "Unable to connect to server",
          description: "Using cached topic data. Some features may be limited.",
          variant: "destructive",
        });
      }
    };

    fetchTopics();
    
    // Simulate other users joining/leaving
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(5, Math.min(50, prev + change));
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, [toast]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('sort', selectedTab);
        if (selectedTopic) {
          params.append('topic', selectedTopic);
        }
        
        const { data, error } = await supabase.functions.invoke('forum-posts', {
          method: 'GET',
          body: { sort: selectedTab, topic: selectedTopic }
        });
        
        if (error) {
          throw error;
        }
        
        if (data.posts && data.posts.length > 0) {
          setForumPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast({
          title: "Unable to connect to server",
          description: "Using cached post data. Some features may be limited.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedTab, selectedTopic, toast]);

  // Create a new post
  const handleCreatePost = async () => {
    if (!newPostTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your post.",
        variant: "destructive",
      });
      return;
    }

    try {
      const userId = Math.floor(Math.random() * 10000);
      const newPost = {
        title: newPostTitle,
        preview: newPostTitle.length > 50 ? newPostTitle.substring(0, 50) + "..." : newPostTitle,
        author: `User_${userId}`,
        topic: postTopic,
      };

      const { data, error } = await supabase.functions.invoke('forum-posts', {
        method: 'POST',
        body: newPost,
      });
      
      if (error) {
        throw error;
      }
      
      // Add the new post to the state
      setForumPosts([data, ...forumPosts]);
      
      // Reset the form
      setNewPostTitle("");
      
      toast({
        title: "Post created",
        description: "Your post has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error creating post",
        description: "Failed to create your post. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Format date to relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Handle likes
  const handleLike = async (postId: string) => {
    try {
      const { error } = await supabase.functions.invoke('forum-posts', {
        method: 'PUT',
        body: { postId, action: 'like' }
      });
      
      if (error) {
        throw error;
      }
      
      // Update the UI optimistically
      setForumPosts(posts => posts.map(post => 
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
      
      toast({
        title: "Post liked",
        description: "You've liked this post.",
      });
    } catch (error) {
      console.error("Error liking post:", error);
      toast({
        title: "Error",
        description: "Failed to like the post. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Handle topic selection
  const handleTopicSelect = (topicName: string) => {
    setSelectedTopic(selectedTopic === topicName ? null : topicName);
    toast({
      title: selectedTopic === topicName ? "All topics" : topicName,
      description: selectedTopic === topicName 
        ? "Showing posts from all topics" 
        : `Showing posts about ${topicName}`,
    });
  };

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
              <span className="text-sm font-medium text-foreground">{onlineUsers} users online</span>
            </div>
            
            <Badge variant="outline" className="mt-4 text-xs">
              You are chatting as User_{Math.floor(Math.random() * 10000)}
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
                    {forumTopics.map((topic) => (
                      <div 
                        key={topic._id} 
                        className={`flex items-center justify-between p-2 rounded-md hover:bg-secondary transition-colors cursor-pointer ${
                          selectedTopic === topic.name ? 'bg-secondary/80' : ''
                        }`}
                        onClick={() => {
                          setPostTopic(topic.name);
                          handleTopicSelect(topic.name);
                        }}
                      >
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
                    <Input 
                      placeholder="Enter a title for your thread..." 
                      className="w-full" 
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Badge className="bg-mindhealer-light text-mindhealer-primary hover:bg-mindhealer-light">
                          {postTopic}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">
                          (Select a topic from the sidebar)
                        </span>
                      </div>
                      <Button 
                        className="bg-mindhealer-primary hover:bg-mindhealer-secondary"
                        onClick={handleCreatePost}
                      >
                        Create a Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="recent" onValueChange={setSelectedTab}>
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

                {selectedTopic && (
                  <div className="mb-4 flex items-center">
                    <Badge className="bg-mindhealer-light text-mindhealer-primary">
                      {selectedTopic}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-2 h-auto p-1 text-xs"
                      onClick={() => handleTopicSelect(selectedTopic)}
                    >
                      Clear filter
                    </Button>
                  </div>
                )}

                <TabsContent value="recent" className="mt-0">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin h-8 w-8 border-4 border-mindhealer-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : forumPosts.length > 0 ? (
                    <div className="space-y-4">
                      {forumPosts.map((post) => (
                        <Card key={post._id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                                {Array.isArray(post.replies) ? post.replies.length : 0} replies
                              </div>
                              <div 
                                className="flex items-center mr-4 cursor-pointer hover:text-mindhealer-primary"
                                onClick={() => handleLike(post._id)}
                              >
                                <Heart className="mr-1 h-4 w-4" />
                                {post.likes} likes
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {getRelativeTime(post.createdAt)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <div className="mb-2">No posts found</div>
                      {selectedTopic && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTopicSelect(selectedTopic)}
                        >
                          Clear topic filter
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {forumPosts.length > 0 && (
                    <div className="flex justify-center mt-8">
                      <Button variant="outline" className="flex items-center">
                        Load More
                        <ChevronUp className="ml-2 h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="popular" className="mt-0">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin h-8 w-8 border-4 border-mindhealer-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : forumPosts.length > 0 ? (
                    <div className="space-y-4">
                      {forumPosts.map((post) => (
                        <Card key={post._id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                                {Array.isArray(post.replies) ? post.replies.length : 0} replies
                              </div>
                              <div 
                                className="flex items-center mr-4 cursor-pointer hover:text-mindhealer-primary"
                                onClick={() => handleLike(post._id)}
                              >
                                <Heart className="mr-1 h-4 w-4" />
                                {post.likes} likes
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {getRelativeTime(post.createdAt)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <div className="mb-2">No popular posts found</div>
                      {selectedTopic && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTopicSelect(selectedTopic)}
                        >
                          Clear topic filter
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="unanswered" className="mt-0">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin h-8 w-8 border-4 border-mindhealer-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : forumPosts.length > 0 ? (
                    <div className="space-y-4">
                      {forumPosts.map((post) => (
                        <Card key={post._id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                                {Array.isArray(post.replies) ? post.replies.length : 0} replies
                              </div>
                              <div 
                                className="flex items-center mr-4 cursor-pointer hover:text-mindhealer-primary"
                                onClick={() => handleLike(post._id)}
                              >
                                <Heart className="mr-1 h-4 w-4" />
                                {post.likes} likes
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {getRelativeTime(post.createdAt)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <div className="mb-2">No unanswered posts found</div>
                      {selectedTopic && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTopicSelect(selectedTopic)}
                        >
                          Clear topic filter
                        </Button>
                      )}
                    </div>
                  )}
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
