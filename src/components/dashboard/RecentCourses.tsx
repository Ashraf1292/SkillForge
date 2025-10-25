import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Edit } from "lucide-react";
import { Link } from "react-router-dom";

interface RecentCoursesProps {
  userRole: "student" | "instructor" | "admin";
}

const RecentCourses = ({ userRole }: RecentCoursesProps) => {
  // Mock data - will be replaced with real data later
  const studentCourses = [
    { id: 1, title: "Advanced React Development", progress: 65, lastAccessed: "2 hours ago" },
    { id: 2, title: "UI/UX Design Fundamentals", progress: 42, lastAccessed: "1 day ago" },
    { id: 3, title: "TypeScript Mastery", progress: 88, lastAccessed: "3 days ago" },
  ];

  const instructorCourses = [
    { id: 1, title: "Web Development Bootcamp", students: 156, views: 1204 },
    { id: 2, title: "React for Beginners", students: 98, views: 847 },
    { id: 3, title: "Advanced JavaScript", students: 70, views: 523 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {userRole === "student" ? "Continue Learning" : "Your Courses"}
        </CardTitle>
        <CardDescription>
          {userRole === "student" 
            ? "Pick up where you left off" 
            : "Manage and monitor your courses"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userRole === "student" ? (
            studentCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                  <Progress value={course.progress} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {course.progress}% complete • Last accessed {course.lastAccessed}
                  </p>
                </div>
                <Button asChild className="ml-4">
                  <Link to={`/learn/${course.id}/1`}>
                    <Play className="mr-2 h-4 w-4" />
                    Continue
                  </Link>
                </Button>
              </div>
            ))
          ) : (
            instructorCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {course.students} students • {course.views} views
                  </p>
                </div>
                <Button asChild variant="secondary" className="ml-4">
                  <Link to={`/course/${course.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Manage
                  </Link>
                </Button>
              </div>
            ))
          )}
        </div>
        <Button asChild variant="outline" className="w-full mt-4">
          <Link to="/my-courses">View All Courses</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentCourses;
