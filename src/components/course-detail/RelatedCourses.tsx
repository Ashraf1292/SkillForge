import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const relatedCourses = [
  {
    id: 5,
    title: "React & TypeScript Development",
    instructor: "Alex Martinez",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    rating: 4.9,
    students: 2100,
    category: "Development",
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    instructor: "Michael Chen",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    rating: 4.9,
    students: 987,
    category: "Marketing",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Davis",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
    rating: 4.7,
    students: 1543,
    category: "Design",
  },
];

export const RelatedCourses = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Related Courses</h3>
      <div className="space-y-4">
        {relatedCourses.map((course) => (
          <Link key={course.id} to={`/course/${course.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 right-2 bg-accent text-xs">
                  {course.category}
                </Badge>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{course.instructor}</p>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
