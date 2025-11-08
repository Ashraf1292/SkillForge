interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration_seconds?: number;
  order_index?: number;
}

interface Module {
  id: string;
  title: string;
  description?: string;
  order_index?: number;
  lessons?: Lesson[];
}

interface Instructor {
  id: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  instructor?: Instructor;
  course_modules?: Module[];
  course_reviews?: any[];
  enrollments?: { count: number }[];
  
  // ✅ Add missing fields based on CourseDetail.tsx usage
  category?: string;
  difficulty?: string;
  updated_at?: string;
  thumbnail_url?: string;
  modules?: Module[];

  // ✅ Derived/computed fields
  duration?: string;
  totalLessons?: number;
  students?: number;
  rating?: number;
}


// ❌ remove this line
// import { Course as CourseType } from "@/types/customTypes";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCourseDetail = (courseId: string | undefined) => {
  return useQuery<Course, Error>({
    queryKey: ["course", courseId],
    queryFn: async (): Promise<Course> => {
      if (!courseId) throw new Error("Course ID is required");

      const { data, error } = await supabase
  .from("courses")
  .select(`
    *,
    instructor:profiles!courses_instructor_id_fkey(
      id,
      display_name,
      avatar_url,
      bio
    ),
    course_modules(
  id,
  title,
  description,
  order_index,
  lessons:lessons_module_id_fkey(
    id,
    title,
    description,
    duration_seconds,
    order_index,
    video_url
  )
),

    course_reviews(
      id,
      rating,
      review_text,
      created_at,
      user:profiles!course_reviews_user_id_fkey(
        display_name,
        avatar_url
      )
    ),
    enrollments(count)
  `)
  .eq("id", courseId)
  .single();


      if (error || !data) throw error || new Error("Course not found");
      console.log("📦 Course data from Supabase:", JSON.stringify(data, null, 2));


      const totalDuration =
        data.course_modules?.reduce(
          (acc, module) =>
            acc +
            (module.lessons?.reduce(
              (lessonAcc, lesson) => lessonAcc + (lesson.duration_seconds || 0),
              0
            ) || 0),
          0
        ) || 0;

      const avgRating =
        data.course_reviews?.reduce((acc, review) => acc + review.rating, 0) /
          (data.course_reviews?.length || 1) || 0;

      return {
        ...data,
        modules: data.course_modules,
        duration: Math.floor(totalDuration / 3600) + " hours",
        totalLessons: data.course_modules?.reduce(
          (acc, module) => acc + (module.lessons?.length || 0),
          0
        ) || 0,
        students: data.enrollments?.[0]?.count || 0,
        rating: avgRating ? Number(avgRating.toFixed(1)) : 0,
      };
    },
    enabled: !!courseId,
  });
};
