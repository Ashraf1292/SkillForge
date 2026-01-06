import { useState, useEffect,  } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Sparkles, Zap, Award } from "lucide-react";

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 -z-20" />
      
      {/* Animated grid */}
      <div 
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Trusted by 10,000+ learners worldwide</span>
          </div>

          {/* Main heading */}
          <h1 
            className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="block mb-4 text-white">Master New Skills</span>
            <span className="block bg-gradient-to-r from-purple-400  to-blue-00 bg-clip-text text-transparent animate-gradient">
              Transform Your Future
            </span>
          </h1>
          
          <p 
            className={`text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Join thousands of learners mastering cutting-edge skills through expert-led courses. 
            Your next breakthrough starts here.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Button 
  size="lg"
  asChild
  className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-6 rounded-xl shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70"
>
  <Link to="/courses">
    Explore Courses
    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
  </Link>
</Button>
            
            <Button 
              size="lg" 
              variant="outline"
              asChild 
              className="group text-lg text-white px-8 py-6 rounded-xl border-2 border-purple-500/50 bg-slate-900/50 backdrop-blur-sm hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
            >
              <Link to="/Auth">
              <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Free Trial
              </Link>
            </Button>
          </div>

          {/* Enhanced Stats */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold text-white  text-transparent">10K+</div>
              <div className="text-sm text-slate-400 mt-2">Active Learners</div>
            </div>
            
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold text-white  text-transparent">500+</div>
              <div className="text-sm text-slate-400 mt-2">Quality Courses</div>
            </div>
            
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 backdrop-blur-sm hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Award className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold text-white text-transparent">100+</div>
              <div className="text-sm text-slate-400 mt-2">Expert Instructors</div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};