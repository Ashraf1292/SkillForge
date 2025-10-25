import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const StudentProfile = () => {
  // Mock data - will be replaced with real data later
  const enrolledCourses = [
    { id: 1, title: "Advanced React Development", progress: 65, category: "Frontend" },
    { id: 2, title: "UI/UX Design Fundamentals", progress: 42, category: "Design" },
    { id: 3, title: "TypeScript Mastery", progress: 88, category: "Programming" },
  ];

  const completedCourses = [
    { id: 4, title: "JavaScript Basics", completedDate: "Dec 2024", rating: 5 },
    { id: 5, title: "HTML & CSS Foundation", completedDate: "Nov 2024", rating: 5 },
  ];

  const learningStats = {
    totalHours: 156,
    coursesCompleted: 8,
    currentStreak: 12,
  };

  return (
    <div className="grid gap-6">
      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningStats.totalHours}</div>
            <p className="text-xs text-muted-foreground">Total time invested</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningStats.coursesCompleted}</div>
            <p className="text-xs text-muted-foreground">Certificates earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningStats.currentStreak}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Courses</CardTitle>
          <CardDescription>Courses currently in progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  <Progress value={course.progress} className="mb-2" />
                  <p className="text-sm text-muted-foreground">{course.progress}% complete</p>
                </div>
                <Button asChild variant="outline" className="ml-4">
                  <Link to={`/course/${course.id}`}>View</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Courses</CardTitle>
          <CardDescription>Courses you've finished</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">Completed {course.completedDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent text-accent-foreground">
                    <Award className="h-3 w-3 mr-1" />
                    Certificate
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
