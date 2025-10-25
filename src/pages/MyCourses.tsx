import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Play, Edit, Archive, Users, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole] = useState<"student" | "instructor">("student");

  // Mock data for student courses
  const enrolledCourses = [
    { 
      id: 1, 
      title: "Advanced React Development", 
      progress: 65, 
      category: "Frontend",
      lastAccessed: "2 hours ago",
      totalLessons: 45,
      completedLessons: 29
    },
    { 
      id: 2, 
      title: "UI/UX Design Fundamentals", 
      progress: 42, 
      category: "Design",
      lastAccessed: "1 day ago",
      totalLessons: 32,
      completedLessons: 13
    },
    { 
      id: 3, 
      title: "TypeScript Mastery", 
      progress: 88, 
      category: "Programming",
      lastAccessed: "3 days ago",
      totalLessons: 28,
      completedLessons: 25
    },
  ];

  const completedCourses = [
    { 
      id: 4, 
      title: "JavaScript Basics", 
      completedDate: "Dec 2024", 
      category: "Programming",
      rating: 5
    },
    { 
      id: 5, 
      title: "HTML & CSS Foundation", 
      completedDate: "Nov 2024", 
      category: "Web Development",
      rating: 5
    },
  ];

  // Mock data for instructor courses
  const createdCourses = [
    { 
      id: 1, 
      title: "Web Development Bootcamp", 
      students: 156, 
      views: 1204,
      rating: 4.8,
      category: "Web Development",
      status: "published"
    },
    { 
      id: 2, 
      title: "React for Beginners", 
      students: 98, 
      views: 847,
      rating: 4.7,
      category: "Frontend",
      status: "published"
    },
  ];

  const draftCourses = [
    { 
      id: 3, 
      title: "Advanced Node.js", 
      lastEdited: "2 days ago",
      category: "Backend",
      status: "draft"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {userRole === "student" ? "My Courses" : "Course Management"}
            </h1>
            <p className="text-muted-foreground">
              {userRole === "student" 
                ? "Track your learning progress and manage enrolled courses" 
                : "Manage your published courses and track performance"}
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Student View */}
          {userRole === "student" && (
            <Tabs defaultValue="enrolled" className="w-full">
              <TabsList>
                <TabsTrigger value="enrolled">Enrolled ({enrolledCourses.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="enrolled" className="mt-6">
                <div className="grid gap-4">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{course.title}</h3>
                              <Badge variant="outline">{course.category}</Badge>
                            </div>
                            <div className="space-y-2 mb-3">
                              <Progress value={course.progress} className="h-2" />
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{course.completedLessons} of {course.totalLessons} lessons completed</span>
                                <span>{course.progress}%</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Last accessed {course.lastAccessed}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild>
                              <Link to={`/learn/${course.id}/1`}>
                                <Play className="mr-2 h-4 w-4" />
                                Continue
                              </Link>
                            </Button>
                            <Button asChild variant="outline">
                              <Link to={`/course/${course.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-6">
                <div className="grid gap-4">
                  {completedCourses.map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{course.title}</h3>
                              <Badge variant="outline">{course.category}</Badge>
                              <Badge className="bg-accent">Certificate Earned</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Completed {course.completedDate}
                            </p>
                          </div>
                          <Button asChild variant="outline">
                            <Link to={`/course/${course.id}`}>
                              View Course
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Instructor View */}
          {userRole === "instructor" && (
            <Tabs defaultValue="published" className="w-full">
              <TabsList>
                <TabsTrigger value="published">Published ({createdCourses.length})</TabsTrigger>
                <TabsTrigger value="drafts">Drafts ({draftCourses.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="published" className="mt-6">
                <div className="grid gap-4">
                  {createdCourses.map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <h3 className="text-xl font-semibold">{course.title}</h3>
                              <Badge variant="outline">{course.category}</Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {course.students} students
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {course.views} views
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-accent text-accent" />
                                {course.rating}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild variant="outline">
                              <Link to={`/course/${course.id}`}>
                                View
                              </Link>
                            </Button>
                            <Button asChild variant="secondary">
                              <Link to={`/course/${course.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Manage
                              </Link>
                            </Button>
                            <Button variant="outline" size="icon">
                              <Archive className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="drafts" className="mt-6">
                <div className="grid gap-4">
                  {draftCourses.map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{course.title}</h3>
                              <Badge variant="outline">{course.category}</Badge>
                              <Badge variant="secondary">Draft</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Last edited {course.lastEdited}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild>
                              <Link to={`/course/${course.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Continue Editing
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyCourses;
