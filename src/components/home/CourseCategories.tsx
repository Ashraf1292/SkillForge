import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, TrendingUp, Camera, BookOpen, Briefcase, Music, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Development", icon: Code, color: "text-blue-500", count: 142 },
  { name: "Design", icon: Palette, color: "text-purple-500", count: 98 },
  { name: "Marketing", icon: TrendingUp, color: "text-green-500", count: 76 },
  { name: "Photography", icon: Camera, color: "text-pink-500", count: 54 },
  { name: "Business", icon: Briefcase, color: "text-orange-500", count: 89 },
  { name: "Teaching", icon: BookOpen, color: "text-indigo-500", count: 43 },
  { name: "Music", icon: Music, color: "text-red-500", count: 37 },
  { name: "Health & Fitness", icon: Heart, color: "text-emerald-500", count: 61 },
];

export const CourseCategories = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect course in your area of interest
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} to={`/courses?category=${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`inline-flex p-4 rounded-full bg-muted group-hover:bg-accent/10 transition-colors`}>
                      <Icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count} courses
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
