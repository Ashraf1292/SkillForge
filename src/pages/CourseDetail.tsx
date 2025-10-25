import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Star,
  Clock,
  Users,
  BarChart3,
  PlayCircle,
  FileText,
  Award,
  Check,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { CourseCurriculum } from "@/components/course-detail/CourseCurriculum";
import { CourseReviews } from "@/components/course-detail/CourseReviews";
import { RelatedCourses } from "@/components/course-detail/RelatedCourses";
import { useCourseDetail } from "@/hooks/useCourseDetail";
import { useEnrollment, useEnrollCourse } from "@/hooks/useEnrollment";
import { useAuth } from "@/contexts/AuthContext";

const CourseDetail = () => {
  const { userRole } = useAuth();
  const { id } = useParams();
  const { data: course, isLoading } = useCourseDetail(id);
  const { data: enrollment } = useEnrollment(id);
  const enrollMutation = useEnrollCourse();

  //hook
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

useEffect(() => {
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  };

  fetchUser();
}, []);



  const handleEnroll = () => {
    if (id) {
      enrollMutation.mutate(id);    
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="bg-gradient-to-br from-primary/95 to-primary">
            <div className="container py-12">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          <div className="container py-12">
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course not found</h1>
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/95 to-primary text-primary-foreground">
          <div className="container py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground capitalize">
                    {course.category.replace(/_/g, " ")}
                  </Badge>
                  <h1 className="text-3xl md:text-5xl font-bold">{course.title}</h1>
                  <p className="text-lg opacity-90">{course.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">{course.rating || 0}</span>
                    <span className="opacity-75">
                      ({course.course_reviews?.length || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{course.students?.toLocaleString() || 0} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    <span className="capitalize">{course.difficulty}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={course.instructor?.avatar_url || undefined} />
                    <AvatarFallback>
                      {course.instructor?.display_name?.substring(0, 2).toUpperCase() || "IN"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      Created by {course.instructor?.display_name || "Unknown Instructor"}
                    </p>
                    <p className="text-sm opacity-75">
                      Last updated {new Date(course.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview Card */}
              <div className="lg:sticky lg:top-20 h-fit">
                <Card className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={course.thumbnail_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop"}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center">
                        <PlayCircle className="h-8 w-8 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    {userRole === "student" && (
  <Button
    size="lg"
    className="w-full bg-accent hover:bg-accent/90"
    onClick={handleEnroll}
    disabled={!!enrollment || enrollMutation.isPending}
  >
    {enrollment
      ? "Already Enrolled"
      : enrollMutation.isPending
      ? "Enrolling..."
      : "Enroll Now"}
  </Button>
)}

{userRole === "instructor" && course.instructor_id === currentUserId && (
  <Button
    size="lg"
    className="w-full bg-secondary hover:bg-secondary/90"
    asChild
  >
    <Link to={`/course/${course.id}/edit`}>Edit Course</Link>
  </Button>
)}

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Total lessons</span>
                        <span className="font-medium">{course.totalLessons || 0}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Level</span>
                        <span className="font-medium capitalize">{course.difficulty}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                    <p className="text-muted-foreground">{course.description}</p>
                  </div>

                  <Separator />

                  {course.instructor && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">About the Instructor</h2>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={course.instructor.avatar_url || undefined} />
                              <AvatarFallback>
                                {course.instructor.display_name?.substring(0, 2).toUpperCase() || "IN"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">
                                {course.instructor.display_name || "Unknown Instructor"}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                {course.instructor.bio || "No bio available"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="curriculum" className="mt-6">
                  <CourseCurriculum />
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <CourseReviews />
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <RelatedCourses />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
