
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MainLayout from "@/components/layout/MainLayout";
import { Calendar, Clock, Globe, MessageSquare, Search, Star, Video } from "lucide-react";

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialties: ["Anxiety", "Depression", "Stress"],
    languages: ["English", "Spanish"],
    nextAvailable: "Today",
    rating: 4.9,
    reviews: 124,
    price: "$85/session",
  },
  {
    id: 2,
    name: "Michael Chen, LMFT",
    title: "Licensed Marriage & Family Therapist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialties: ["Relationships", "Trauma", "Grief"],
    languages: ["English", "Mandarin"],
    nextAvailable: "Tomorrow",
    rating: 4.8,
    reviews: 98,
    price: "$75/session",
  },
  {
    id: 3,
    name: "Dr. Maya Patel",
    title: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialties: ["Medication Management", "Anxiety", "ADHD"],
    languages: ["English", "Hindi"],
    nextAvailable: "Thursday",
    rating: 4.7,
    reviews: 156,
    price: "$120/session",
  },
  {
    id: 4,
    name: "James Wilson, LCSW",
    title: "Licensed Clinical Social Worker",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialties: ["Addiction", "Depression", "Anxiety"],
    languages: ["English"],
    nextAvailable: "Next Monday",
    rating: 4.6,
    reviews: 87,
    price: "$70/session",
  },
  {
    id: 5,
    name: "Dr. Rebecca Kim",
    title: "Neuropsychologist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialties: ["Cognitive Issues", "Trauma", "PTSD"],
    languages: ["English", "Korean"],
    nextAvailable: "Friday",
    rating: 4.9,
    reviews: 112,
    price: "$95/session",
  },
  {
    id: 6,
    name: "Thomas Garcia, PhD",
    title: "Counseling Psychologist",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialties: ["Career Counseling", "Life Transitions", "Stress"],
    languages: ["English", "Portuguese"],
    nextAvailable: "Wednesday",
    rating: 4.7,
    reviews: 76,
    price: "$80/session",
  },
];

const specializations = [
  "Anxiety",
  "Depression",
  "Stress",
  "Trauma",
  "PTSD",
  "Relationships",
  "Grief",
  "Addiction",
  "ADHD",
  "Career Counseling",
  "Life Transitions",
  "Cognitive Issues",
];

const languages = [
  "English",
  "Spanish",
  "Mandarin",
  "Hindi",
  "Korean",
  "Portuguese",
  "French",
  "German",
  "Japanese",
  "Arabic",
];

const Therapists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = specialtyFilter === "all" || 
                           therapist.specialties.some(spec => spec.toLowerCase() === specialtyFilter.toLowerCase());
    
    const matchesLanguage = languageFilter === "all" || 
                          therapist.languages.some(lang => lang.toLowerCase() === languageFilter.toLowerCase());
    
    return matchesSearch && matchesSpecialty && matchesLanguage;
  });

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-background to-mindhealer-light">
        <div className="mindhealer-container relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Find a Therapist <span className="text-gradient">You Can Trust</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              MindHealer connects you with licensed mental health professionals for secure, confidential therapy sessions. Browse therapists, book appointments, and attend sessions—on your terms.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-background border-b">
        <div className="mindhealer-container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialty..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Therapists List */}
      <section className="py-12 bg-background">
        <div className="mindhealer-container">
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Therapists</TabsTrigger>
              <TabsTrigger value="available">Available Today</TabsTrigger>
              <TabsTrigger value="top">Top Rated</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTherapists.map((therapist) => (
                  <Card key={therapist.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <img
                              src={therapist.image}
                              alt={therapist.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-white"></div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold">{therapist.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{therapist.title}</p>
                            
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="font-medium mr-1">{therapist.rating}</span>
                              <span className="text-muted-foreground">({therapist.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {therapist.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Globe className="h-4 w-4 mr-2" />
                              {therapist.languages.join(", ")}
                            </div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-2" />
                              {therapist.nextAvailable}
                            </div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <Video className="h-4 w-4 mr-2" />
                              Video Sessions
                            </div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Text Support
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between border-t pt-4">
                            <p className="font-semibold">{therapist.price}</p>
                            <Button className="bg-mindhealer-primary hover:bg-mindhealer-secondary">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredTherapists.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No therapists found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setSpecialtyFilter("");
                      setLanguageFilter("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="available" className="mt-0">
              <div className="text-center py-20">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Check Available Therapists</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Find therapists who have open slots today for immediate support.
                </p>
                <Button className="bg-mindhealer-primary hover:bg-mindhealer-secondary">
                  Find Available Now
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="top" className="mt-0">
              <div className="text-center py-20">
                <Star className="h-12 w-12 mx-auto text-yellow-500/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Top Rated Therapists</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Discover our highest-rated mental health professionals.
                </p>
                <Button className="bg-mindhealer-primary hover:bg-mindhealer-secondary">
                  View Top Rated
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-mindhealer-light/30">
        <div className="mindhealer-container">
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our matching service can help find the right therapist for your specific needs and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-mindhealer-primary hover:bg-mindhealer-secondary"
                size="lg"
              >
                Take Matching Quiz
              </Button>
              <Button 
                variant="outline" 
                size="lg"
              >
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Therapists;
