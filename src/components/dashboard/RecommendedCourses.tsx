import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

const RecommendedCourses = () => {
  const filters = useMemo(() => ({
    category: "",
    difficulty: "",
    instructor: "",
    searchQuery: ""
  }), []);
   const { data: courses, isLoading } = useCourses(filters);
  const recommendations = courses?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your interests and learning history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-16 mb-2" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
        <CardDescription>Based on your interests and learning history</CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No recommendations available yet
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map((course: any) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">📚</span>
                  )}
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2 capitalize">
                    {course.category.replace(/_/g, " ")}
                  </Badge>
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {course.instructor?.display_name || "Unknown Instructor"}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-accent text-accent mr-1" />
                      {course.rating || 0}
                    </div>
                    <span>•</span>
                    <span>{course.students?.toLocaleString() || 0} students</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/course/${course.id}`}>View Course</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedCourses;
