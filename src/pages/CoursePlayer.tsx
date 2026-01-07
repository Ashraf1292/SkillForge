import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import VideoPlayer from "@/components/player/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  duration_seconds: number;
  order_index: number;
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const CoursePlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    if (courseId && lessonId) {
      loadCourseData();
    }
  }, [courseId, lessonId]);

  const loadCourseData = async () => {
    try {
      setLoading(true);

      // course details
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*, profiles(display_name)")
        .eq("id", courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // modules-lessons
      const { data: modulesData, error: modulesError } = await supabase
        .from("course_modules")
        .select("*, lessons(*)")
        .eq("course_id", courseId)
        .order("order_index");

      if (modulesError) throw modulesError;

      // lesson progress
      if (user) {
        const { data: progressData } = await supabase
          .from("lesson_progress")
          .select("lesson_id, completed")
          .eq("user_id", user.id);

        const progressMap = new Map(
          progressData?.map((p) => [p.lesson_id, p.completed]) || []
        );

        const modulesWithProgress = modulesData.map((module: any) => ({
          ...module,
          lessons: module.lessons
            .map((lesson: any) => ({
              ...lesson,
              completed: progressMap.get(lesson.id) || false,
            }))
            .sort((a: any, b: any) => a.order_index - b.order_index),
        }));

        setModules(modulesWithProgress);

        // Calculation of overall progress
        const totalLessons = modulesWithProgress.reduce(
          (acc: number, m: Module) => acc + m.lessons.length,
          0
        );
        const completedLessons = modulesWithProgress.reduce(
          (acc: number, m: Module) =>
            acc + m.lessons.filter((l) => l.completed).length,
          0
        );
        setCourseProgress((completedLessons / totalLessons) * 100);
      } else {
        setModules(modulesData);
      }

      // Find current lesson
      const allLessons = modulesData.flatMap((m: any) => m.lessons);
      const lesson = allLessons.find((l: any) => l.id === lessonId);
      setCurrentLesson(lesson);
    } catch (error: any) {
      toast({
        title: "Error loading course",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProgress = async (currentTime: number, duration: number) => {
    if (!user || !currentLesson) return;

    // Save progress
    if (Math.floor(currentTime) % 10 === 0) {
      await supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_id: currentLesson.id,
        watch_time_seconds: Math.floor(currentTime),
      });
    }

    // Marks video as completed if watched 90%+
    if (currentTime / duration >= 0.9 && !currentLesson.completed) {
      await markLessonComplete(currentLesson.id);
    }
  };

  const markLessonComplete = async (lessonId: string) => {
    if (!user) return;

    await supabase.from("lesson_progress").upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
    });

    // Reload UI
    loadCourseData();

    toast({
      title: "Lesson completed!",
      description: "Great job! Keep learning.",
    });
  };

  const handleLessonEnded = () => {
    // next lesson
    const allLessons = modules.flatMap((m) => m.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      navigate(`/learn/${courseId}/${nextLesson.id}`);
    }
  };

  const goToPreviousLesson = () => {
    const allLessons = modules.flatMap((m) => m.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      navigate(`/learn/${courseId}/${prevLesson.id}`);
    }
  };

  const goToNextLesson = () => {
    const allLessons = modules.flatMap((m) => m.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      navigate(`/learn/${courseId}/${nextLesson.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main Video Card */}
        <div className="flex-1 flex flex-col">
          <div className="bg-muted p-4 border-b">
            <div className="container mx-auto">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="mb-2"
              >
                <Link to={`/course/${courseId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Course
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">{course?.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <Progress value={courseProgress} className="flex-1 max-w-xs" />
                <span className="text-sm text-muted-foreground">
                  {Math.round(courseProgress)}% complete
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 lg:p-8">
            <div className="container mx-auto max-w-5xl">
              <VideoPlayer
                videoUrl={currentLesson?.video_url || ""}
                onProgress={handleProgress}
                onEnded={handleLessonEnded}
              />

              <div className="mt-6">
                <h2 className="text-3xl font-bold mb-2">{currentLesson?.title}</h2>
                <p className="text-muted-foreground mb-6">{currentLesson?.description}</p>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={goToPreviousLesson}
                    disabled={modules.flatMap(m => m.lessons).findIndex(l => l.id === lessonId) === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Lesson
                  </Button>
                  <Button
                    onClick={goToNextLesson}
                    disabled={
                      modules.flatMap(m => m.lessons).findIndex(l => l.id === lessonId) ===
                      modules.flatMap(m => m.lessons).length - 1
                    }
                  >
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                  {!currentLesson?.completed && (
                    <Button
                      variant="secondary"
                      onClick={() => markLessonComplete(currentLesson?.id || "")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Navigation Sidebar */}
        <div className="lg:w-96 border-l bg-card">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Course Content</h3>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="p-4">
              {modules.map((module) => (
                <Card key={module.id} className="mb-4">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">{module.title}</h4>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => navigate(`/learn/${courseId}/${lesson.id}`)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            lesson.id === lessonId
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div className="mt-1">
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4 text-accent" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{lesson.title}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {Math.floor(lesson.duration_seconds / 60)} min
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
