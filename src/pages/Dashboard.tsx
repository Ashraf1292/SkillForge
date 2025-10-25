import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentCourses from "@/components/dashboard/RecentCourses";
import RecommendedCourses from "@/components/dashboard/RecommendedCourses";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; // import your auth context

const Dashboard = () => {
  const { user, userRole, loading } = useAuth(); // get user and role from context

  // Optionally, you can show a loading state
  if (loading) return <div className="text-center py-20">Loading dashboard...</div>;
  if (!user) return <div className="text-center py-20">User not found.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Use actual user data */}
          <WelcomeSection userName={user.user_metadata.display_name || user.email} userRole={userRole || "student"} />
          
          <StatsCards userRole={userRole || "student"} />
          
          <div className="grid gap-8 mt-8">
            <RecentCourses userRole={userRole || "student"} />
            <RecommendedCourses />
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/courses">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Courses
              </Link>
            </Button>
            {userRole === "instructor" && (
              <Button asChild variant="secondary" size="lg">
                <Link to="/create-course">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Course
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
