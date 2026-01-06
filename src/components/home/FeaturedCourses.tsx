import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";

export const FeaturedCourses = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const filters = useMemo(() => ({
    category: "",
    difficulty: "",
    instructor: "",
    searchQuery: ""
  }), []);
  
  const { data: courses, isLoading } = useCourses(filters);
  const featuredCourses = courses?.slice(0, 3) || [];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMjQsIDU4LCAyMzcsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4 bg-slate-700" />
            <Skeleton className="h-6 w-96 mx-auto bg-slate-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden bg-slate-800/50 border-slate-700">
                <Skeleton className="aspect-video w-full bg-slate-700" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-slate-700" />
                  <Skeleton className="h-4 w-1/2 bg-slate-700" />
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-16 bg-slate-700" />
                    <Skeleton className="h-4 w-16 bg-slate-700" />
                    <Skeleton className="h-4 w-16 bg-slate-700" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMjQsIDU4LCAyMzcsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm mb-6">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Most Popular This Month</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Featured Courses
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Master in-demand skills with our top-rated courses from industry experts
          </p>
        </div>

        {featuredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Sparkles className="w-10 h-10 text-purple-400" />
            </div>
            <p className="text-slate-400 text-lg">No courses available yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Card className="group h-full overflow-hidden bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60" />
                      <img
                        src={course.thumbnail_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"}
                        alt={course.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Category Badge */}
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white shadow-lg z-20">
                        {course.category.replace(/_/g, " ").toUpperCase()}
                      </Badge>
                      
                      {/* Trending Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/90 backdrop-blur-sm z-20">
                        <Sparkles className="w-3 h-3 text-yellow-900" />
                        <span className="text-xs font-bold text-yellow-900">TRENDING</span>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t  to-transparent z-20 flex items-center justify-center transition-opacity duration-300 ${hoveredCard === course.id ? 'opacity-100' : 'opacity-0'}`}>
                        <Button asChild className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6">
                          <Link to={`/course/${course.id}`}>
                            Enroll Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <h3 className="font-bold text-xl line-clamp-2 text-white  group-hover:bg-clip-text transition-all duration-300">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                          {course.instructor?.display_name?.charAt(0) || "?"}
                        </div>
                        <p className="text-sm text-white">
                          {course.instructor?.display_name || "Unknown Instructor"}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center gap-5 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-white">{course.rating || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white">
                          <Users className="h-4 w-4" />
                          <span>{course.students?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration || "0 hours"}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button asChild className="w-full bg-gradient-to-r black hover:from-blue-900 hover:to-blue-700 text-white border-0 transition-all duration-300">
                        <Link to={`/course/${course.id}`}>View Course</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button 
                size="lg"
                asChild
                className="group bg-gradient-to-r from-purple-800 to-blue-800 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-10 py-6 rounded-xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <Link to="/courses">
                  Explore All Courses
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};