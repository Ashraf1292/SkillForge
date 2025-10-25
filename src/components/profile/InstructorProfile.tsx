import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, Star, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const InstructorProfile = () => {
  // Mock data - will be replaced with real data later
  const createdCourses = [
    { 
      id: 1, 
      title: "Web Development Bootcamp", 
      students: 156, 
      views: 1204,
      rating: 4.8,
      category: "Web Development"
    },
    { 
      id: 2, 
      title: "React for Beginners", 
      students: 98, 
      views: 847,
      rating: 4.7,
      category: "Frontend"
    },
    { 
      id: 3, 
      title: "Advanced JavaScript", 
      students: 70, 
      views: 523,
      rating: 4.9,
      category: "Programming"
    },
  ];

  const teachingStats = {
    totalStudents: 324,
    totalCourses: 5,
    averageRating: 4.8,
    totalViews: 2574,
  };

  return (
    <div className="grid gap-6">
      {/* Teaching Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachingStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Created</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachingStats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">Published courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachingStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">Student satisfaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachingStats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Course impressions</p>
          </CardContent>
        </Card>
      </div>

      {/* Created Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Created Courses</CardTitle>
          <CardDescription>Courses you've published on SkillForge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {createdCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                <div className="flex gap-2 ml-4">
                  <Button asChild variant="outline">
                    <Link to={`/course/${course.id}`}>View</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link to={`/course/${course.id}/edit`}>Manage</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="w-full mt-4">
            <Link to="/my-courses">View All Courses</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorProfile;
