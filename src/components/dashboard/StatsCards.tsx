import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, Users, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  userRole: "student" | "instructor" | "admin";
}

const StatsCards = ({ userRole }: StatsCardsProps) => {
  // Mock stats - will be replaced with real data later
  const studentStats = [
    { title: "Enrolled Courses", value: "12", icon: BookOpen, color: "text-primary" },
    { title: "Completed Courses", value: "8", icon: CheckCircle, color: "text-accent" },
    { title: "Learning Hours", value: "156", icon: TrendingUp, color: "text-secondary" },
    { title: "Certificates", value: "8", icon: CheckCircle, color: "text-accent" },
  ];

  const instructorStats = [
    { title: "Created Courses", value: "5", icon: BookOpen, color: "text-primary" },
    { title: "Total Students", value: "324", icon: Users, color: "text-accent" },
    { title: "Course Views", value: "2,451", icon: TrendingUp, color: "text-secondary" },
    { title: "Avg Rating", value: "4.8", icon: CheckCircle, color: "text-accent" },
  ];

  const stats = userRole === "student" ? studentStats : instructorStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
