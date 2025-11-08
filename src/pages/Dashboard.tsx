import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentCourses from "@/components/dashboard/RecentCourses";
import RecommendedCourses from "@/components/dashboard/RecommendedCourses";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Sparkles, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, userRole, loading } = useAuth();

  // Loading state with modern spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="text-muted-foreground animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 glass rounded-2xl p-8 border border-border/50">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-lg font-medium">User not found</p>
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <Header />
      
      <main className="flex-1 relative">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Welcome Section with enhanced design */}
          <div className="relative animate-slideDown">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10 rounded-3xl blur-2xl -z-10 opacity-50" />
            <div className="glass rounded-3xl p-8 border border-border/50 hover:border-border transition-all">
              <WelcomeSection 
                userName={user.user_metadata.display_name || user.email} 
                userRole={userRole || "student"} 
              />
            </div>
          </div>

          {/* Stats Cards with staggered animation */}
          <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <StatsCards userRole={userRole || "student"} />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            {/* Recent Courses */}
            <div className="glass rounded-3xl p-8 border border-border/50 hover:border-border transition-all group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Recent Activity</h2>
                <div className="ml-auto">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                    {userRole === "instructor" ? "Teaching" : "Learning"}
                  </span>
                </div>
              </div>
              <RecentCourses userRole={userRole || "student"} />
            </div>

            {/* Recommended Courses */}
            <div className="glass rounded-3xl p-8 border border-border/50 hover:border-border transition-all group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold">Recommended for You</h2>
                <div className="ml-auto">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500 border border-purple-500/20">
                    Curated
                  </span>
                </div>
              </div>
              <RecommendedCourses />
            </div>
          </div>

          {/* Quick Actions - Enhanced with cards */}
          <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="glass rounded-3xl p-8 border border-border/50">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Browse Courses Card */}
                <Link to="/courses" className="group">
                  <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Browse Courses</h4>
                      <p className="text-sm text-muted-foreground">Explore 1000+ courses across all categories</p>
                    </div>
                  </div>
                </Link>

                {/* Create Course Card - Only for instructors */}
                {userRole === "instructor" && (
                  <Link to="/create-course" className="group">
                    <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all hover:scale-[1.02]">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Plus className="w-6 h-6 text-accent" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2">Create Course</h4>
                        <p className="text-sm text-muted-foreground">Share your knowledge with students worldwide</p>
                      </div>
                    </div>
                  </Link>
                )}

                {/* My Progress Card */}
                <Link to="/progress" className="group">
                  <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-[1.02]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Target className="w-6 h-6 text-purple-500" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">My Progress</h4>
                      <p className="text-sm text-muted-foreground">Track your learning journey and achievements</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;