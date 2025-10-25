import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CourseFiltersType } from "@/pages/Courses";

export const useCourses = (filters: CourseFiltersType) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      let query = supabase.from("courses").select("*, instructor:profiles(display_name)");

      if (filters.searchQuery) {
        query = query.ilike("title", `%${filters.searchQuery}%`);
      }
      if (filters.category) {
  query = query.eq(
    "category",
    filters.category as
      | "web_development"
      | "mobile_development"
      | "data_science"
      | "design"
      | "business"
      | "marketing"
      | "photography"
      | "music"
      | "other"
  );
}
      //if (filters.instructor) {
       // query = query.eq("instructor_id", filters.instructor);
     // }

      const { data: coursesData, error } = await query;

      if (!error && coursesData) setData(coursesData);
      else console.error(error);

      setIsLoading(false);
    };

    fetchCourses();
  }, [filters]);

  return { data, isLoading };
};
