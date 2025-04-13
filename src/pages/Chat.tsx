
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { MessageCircle, Bot, User, Send, Smile, ThumbsUp, ThumbsDown } from "lucide-react";

const chatMessages = [
  {
    id: 1,
    sender: "bot",
    content: "Hi there! I'm your MindHealer AI assistant. How are you feeling today?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "user",
    content: "I'm feeling a bit overwhelmed with work and personal life.",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    sender: "bot",
    content: "I'm sorry to hear that you're feeling overwhelmed. That's a common experience, especially when juggling multiple responsibilities. Would you like to talk more about what's causing the overwhelm, or would you prefer some quick techniques to help manage these feelings?",
    timestamp: "10:33 AM",
  },
  {
    id: 4,
    sender: "user",
    content: "I think I'd like some techniques to manage these feelings right now.",
    timestamp: "10:35 AM",
  },
  {
    id: 5,
    sender: "bot",
    content: "That's a great choice. Here are a few quick techniques that might help:\n\n1. **Deep breathing**: Take 5 slow, deep breaths. Inhale for 4 counts, hold for 2, and exhale for 6.\n\n2. **5-4-3-2-1 grounding**: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.\n\n3. **Quick prioritization**: Grab a paper and list only your top 3 must-do tasks for today.\n\nWould you like me to explain any of these in more detail?",
    timestamp: "10:36 AM",
  },
];

const dailyPrompts = [
  "What's one small thing you're grateful for today?",
  "How would you describe your mood right now in three words?",
  "What's one thing you did today that made you feel good?",
  "Is there something specific that's weighing on your mind?",
  "What's a small step you could take today to support your wellbeing?",
];

const Chat = () => {
  const [messages, setMessages] = useState(chatMessages);
  const [inputValue, setInputValue] = useState("");
  const [mood, setMood] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      
      // Simulate AI response after a short delay
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: "bot",
          content: "I understand how you feel. It's completely normal to experience these emotions. Would you like to explore some strategies that might help with this situation?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MoodButtons = () => (
    <div className="p-4 bg-mindhealer-light/50 rounded-lg mb-6">
      <h3 className="text-sm font-medium mb-3">How are you feeling today?</h3>
      <div className="flex flex-wrap gap-2">
        {["Calm", "Happy", "Stressed", "Sad", "Anxious", "Hopeful"].map((moodOption) => (
          <Button
            key={moodOption}
            variant={mood === moodOption ? "default" : "outline"}
            size="sm"
            className={`rounded-full ${
              mood === moodOption ? "bg-mindhealer-primary hover:bg-mindhealer-secondary" : ""
            }`}
            onClick={() => setMood(moodOption)}
          >
            {moodOption}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-background to-mindhealer-light">
        <div className="mindhealer-container relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Talk Freely. <span className="text-gradient">Anytime. Anywhere.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Chat with our friendly AI assistant or connect anonymously with others in real time. Our chatroom is designed to help you express yourself, reflect, and feel supported—24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-12 bg-background">
        <div className="mindhealer-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-mindhealer-primary" />
                    Daily Prompts
                  </h3>
                  <div className="space-y-3">
                    {dailyPrompts.map((prompt, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-md bg-secondary/50 hover:bg-secondary cursor-pointer text-sm"
                      >
                        {prompt}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5 text-mindhealer-primary" />
                    Anonymous Peer Chat
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect one-on-one with someone who's ready to listen in a secure, anonymous environment.
                  </p>
                  <Button className="w-full bg-mindhealer-primary hover:bg-mindhealer-secondary">
                    Start Private Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Need immediate help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're in crisis or having thoughts of self-harm, please reach out to a crisis service immediately.
                  </p>
                  <Button variant="outline" className="w-full">
                    Crisis Resources
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Chat */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="ai">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="ai" className="flex-1">
                    <Bot className="mr-2 h-4 w-4" />
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger value="journal" className="flex-1">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Journal
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ai" className="mt-0">
                  <Card className="border-t-0 rounded-tl-none rounded-tr-none">
                    <CardContent className="p-0">
                      <div className="flex flex-col h-[500px]">
                        {/* Mood Check */}
                        <div className="p-4 bg-card border-b">
                          <MoodButtons />
                        </div>
                        
                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.sender === "user" ? "justify-end" : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[75%] rounded-lg p-3 ${
                                  message.sender === "user"
                                    ? "bg-mindhealer-primary text-white rounded-br-none"
                                    : "bg-secondary rounded-bl-none"
                                }`}
                              >
                                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                                <div
                                  className={`text-xs mt-1 ${
                                    message.sender === "user" ? "text-white/70" : "text-muted-foreground"
                                  }`}
                                >
                                  {message.timestamp}
                                </div>
                                
                                {message.sender === "bot" && (
                                  <div className="flex space-x-2 mt-2">
                                    <Button size="sm" variant="ghost" className="h-6 px-2">
                                      <ThumbsUp className="h-3 w-3 mr-1" />
                                      <span className="text-xs">Helpful</span>
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-6 px-2">
                                      <ThumbsDown className="h-3 w-3 mr-1" />
                                      <span className="text-xs">Not helpful</span>
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Chat Input */}
                        <div className="p-4 border-t">
                          <div className="flex space-x-2">
                            <Button size="icon" variant="ghost">
                              <Smile className="h-5 w-5 text-muted-foreground" />
                            </Button>
                            <Input
                              placeholder="Type your message..."
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onKeyDown={handleKeyDown}
                              className="flex-1"
                            />
                            <Button 
                              size="icon" 
                              onClick={handleSendMessage}
                              className="bg-mindhealer-primary hover:bg-mindhealer-secondary"
                            >
                              <Send className="h-5 w-5" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 text-center">
                            Conversations are private and secure. MindHealer AI is here to support, not diagnose.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="journal" className="mt-0">
                  <Card className="border-t-0 rounded-tl-none rounded-tr-none">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-[400px] text-center">
                        <MessageCircle className="h-12 w-12 text-mindhealer-primary/30 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Journal Your Thoughts</h3>
                        <p className="text-muted-foreground max-w-sm mb-6">
                          Your private space to reflect, process emotions, and track your mental wellness journey.
                        </p>
                        <Button className="bg-mindhealer-primary hover:bg-mindhealer-secondary">
                          Start a Journal Entry
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Chat;
