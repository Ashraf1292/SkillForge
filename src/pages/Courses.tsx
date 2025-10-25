import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { useState } from "react";

export type CourseFiltersType = {
  category: string;
  difficulty: string;
  instructor: string;
  searchQuery: string;
};

const Courses = () => {
  const [filters, setFilters] = useState<CourseFiltersType>({
    category: "",
    difficulty: "",
    instructor: "",
    searchQuery: "",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Courses</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover thousands of courses from expert instructors across various disciplines
            </p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <CourseFilters filters={filters} setFilters={setFilters} />
            </aside>
            <div className="lg:col-span-3">
              <CourseGrid filters={filters} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
