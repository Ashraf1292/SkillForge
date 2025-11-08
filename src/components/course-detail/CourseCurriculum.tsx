import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, ChevronDown, ChevronRight, Clock, FileText, CheckCircle2 } from "lucide-react";

// Demo component - replace courseId and Link with your actual router setup
export const CourseCurriculum = ({ modules, courseId = "demo" }) => {
  const [openModules, setOpenModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Mock data for demo
  const demoModules = modules || [
    {
      id: "1",
      title: "Introduction to React Fundamentals",
      description: "Learn the core concepts of React including components, props, and state management",
      lessons: [
        { id: "1-1", title: "What is React?", description: "Understanding React and its ecosystem. Learn about virtual DOM, component architecture, and why React is popular.", video_url: "#" },
        { id: "1-2", title: "Setting Up Your Development Environment", description: "Install Node.js, create-react-app, and essential VS Code extensions for React development.", video_url: "#", completed: true },
        { id: "1-3", title: "Your First React Component", description: "Create functional components, understand JSX syntax, and render elements to the DOM.", video_url: "#" }
      ]
    },
    {
      id: "2",
      title: "State Management & Hooks",
      description: "Master React Hooks and learn modern state management patterns",
      lessons: [
        { id: "2-1", title: "useState Hook", description: "Learn how to manage component state with the useState hook", video_url: "#" },
        { id: "2-2", title: "useEffect Hook", description: "Handle side effects and lifecycle methods with useEffect", video_url: "#" }
      ]
    },
    {
      id: "3",
      title: "Advanced React Patterns",
      description: "Explore advanced concepts like Context API, custom hooks, and performance optimization",
      lessons: [
        { id: "3-1", title: "Context API Deep Dive", description: "Manage global state without prop drilling using React Context", video_url: "#" }
      ]
    }
  ];

  const modulesToRender = modules || demoModules;

  if (!modulesToRender || modulesToRender.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-2xl border border-slate-700/50">
        <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400 text-lg">No modules or lessons available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-8 bg-slate-950">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Course Curriculum</h2>
        <p className="text-slate-400">Expand modules to view lessons</p>
      </div>

      {modulesToRender.map((mod, index) => {
        const isOpen = openModules.includes(mod.id);
        const lessonCount = mod.lessons?.length || 0;
        
        return (
          <Card 
            key={mod.id} 
            className="group border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
          >
            <CardHeader
              className="cursor-pointer select-none hover:bg-slate-800/50 transition-all duration-300 relative"
              onClick={() => toggleModule(mod.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {/* Module Number Badge */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {mod.title}
                    </CardTitle>
                    
                    {mod.description && (
                      <p className="text-sm text-slate-100 mt-2 leading-relaxed">
                        {mod.description}
                      </p>
                    )}
                    
                    {/* Module Stats */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-200">
                        <PlayCircle className="w-4 h-4" />
                        <span>{lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-200">
                        <Clock className="w-4 h-4" />
                        <span>{lessonCount * 15} min</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chevron Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-0 bg-purple-600/30' : 'rotate-0'}`}>
                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-purple-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>
            </CardHeader>

            {isOpen && (
              <CardContent className="pt-0 pb-6 animate-slideDown">
                {mod.lessons && mod.lessons.length > 0 ? (
                  <div className="space-y-2 ml-[52px]">
                    {mod.lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        className="group/lesson relative"
                      >
                        
                        
                        <div className="flex justify-between items-center bg-slate-800/30 border border-slate-700/30 p-4 rounded-xl hover:bg-slate-700/30 hover:border-purple-500/30 transition-all duration-300 relative">
                          <div className="flex items-start gap-3 flex-1">
                            {/* Lesson Dot */}
                            <div className="flex-shrink-0 w-[30px] h-[30px] rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center group-hover/lesson:border-purple-500 group-hover/lesson:bg-purple-600/20 transition-all duration-300 relative z-10">
                              <PlayCircle className="w-4 h-4 text-slate-400 group-hover/lesson:text-purple-400 transition-colors" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-white group-hover/lesson:text-purple-300 transition-colors">
                                  {idx + 1}. {lesson.title}
                                </p>
                                {lesson.completed && (
                                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                                )}
                              </div>
                              
                              {lesson.description && (
                                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                                  {lesson.description.slice(0, 120)}
                                  {lesson.description.length > 120 ? "..." : ""}
                                </p>
                              )}
                              
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  15 min
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {lesson.video_url && (
                            <button
                              onClick={() => alert(`Navigate to: /course/${courseId}/modules/${mod.id}/lessons/${lesson.id}`)}
                              className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/20"
                            >
                              Watch
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic ml-[52px] mt-2">
                    No lessons in this module yet.
                  </p>
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
      
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 2000px;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};