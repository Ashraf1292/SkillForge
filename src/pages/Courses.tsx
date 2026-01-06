import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { useState } from "react";
import { Sparkles, TrendingUp, Award } from "lucide-react";

export type CourseFiltersType = {
  category: string;
  difficulty: string;
  instructor: string;
  searchQuery: string;
};

const Courses = () => {
  const [filters, setFilters] = useState<CourseFiltersType>({
    category: "",
    difficulty: "",
    instructor: "",
    searchQuery: "",
  });

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Glass Effect */}
        <div className="relative py-20 md:py-28 overflow-hidden">
          {/* Gradient overlay */}
<div className="absolute inset-0 bg-gradient-to-br from-slate-900  to-slate-950" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-slideUp">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-white font-medium mb-4">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="gradient-text font-semibold">1000+ Premium Courses</span>
              </div>
              
              {/* Main heading with gradient */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                <span className="text-white">Explore</span> Courses
              </h1>
              
              {/* Subheading */}
              <p className="text-xl text-white">
                Discover thousands of courses from expert instructors across various disciplines
              </p>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto">
                <div className="glass rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all group hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-3xl font-bold text-white">250K+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Active Learners</p>
                </div>
                
                <div className="glass rounded-2xl p-6 border border-border/50 hover:border-accent/30 transition-all group hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-3xl font-bold text-white">500+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Expert Instructors</p>
                </div>
                
                <div className="glass rounded-2xl p-6 border border-border/50 hover:border-purple-500/30 transition-all group hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                      <Sparkles className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-3xl font-bold text-white">4.8/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4 animate-slideDown">
                <div className="glass rounded-2xl p-6 border border-border/50 hover:border-border transition-all">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
                    Filters
                  </h2>
                  <CourseFilters filters={filters} setFilters={setFilters} />
                </div>
              </div>
            </aside>
            
            {/* Course Grid */}
            <div className="lg:col-span-3 animate-slideUp" style={{ animationDelay: '0.1s' }}>
              <div className="glass rounded-2xl p-8 border border-border/50 min-h-[600px]">
                <CourseGrid filters={filters} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;