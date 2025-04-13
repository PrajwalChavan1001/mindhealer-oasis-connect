
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CalendarDays, LineChart, MessageSquare, Star, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardProps {
  userName?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName = "there" }) => {
  return (
    <section className="py-12 bg-background">
      <div className="mindhealer-container">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold">Welcome back, {userName}!</h2>
              <p className="text-muted-foreground mt-1">
                Here's an overview of your wellness journey
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/chat">Start a Session</Link>
              </Button>
              <Button asChild className="bg-mindhealer-primary hover:bg-mindhealer-secondary">
                <Link to="/therapists">Book a Therapist</Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Mood Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Improving</div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <Progress value={68} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Sessions Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">12</div>
                  <MessageSquare className="h-4 w-4 text-mindhealer-primary" />
                </div>
                <Progress value={45} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Forum Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">8 posts</div>
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
                <Progress value={35} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">7 days</div>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <Progress value={70} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest wellness activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Anxiety Management Session", time: "Today", icon: MessageSquare },
                    { name: "Forum Post: Sleep Tips", time: "Yesterday", icon: Users },
                    { name: "Mood Tracking", time: "3 days ago", icon: LineChart },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="rounded-full bg-mindhealer-light p-2">
                        <activity.icon className="h-4 w-4 text-mindhealer-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Scheduled therapy and wellness activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Therapy with Dr. Sarah", time: "Tomorrow, 10:00 AM" },
                    { name: "Group Mindfulness", time: "Oct 16, 3:30 PM" },
                    { name: "Stress Management Workshop", time: "Oct 18, 5:00 PM" },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="rounded-full bg-mindhealer-light p-2">
                        <CalendarDays className="h-4 w-4 text-mindhealer-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{session.name}</p>
                        <p className="text-sm text-muted-foreground">{session.time}</p>
                      </div>
                      <Button size="sm" variant="outline">Reschedule</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
