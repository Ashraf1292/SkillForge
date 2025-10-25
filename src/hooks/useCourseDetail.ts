import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCourseDetail = (courseId: string | undefined) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
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
            lessons(
              id,
              title,
              description,
              duration_seconds,
              order_index
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

      if (error) throw error;

      // Calculate total duration
      const totalDuration =
        data.course_modules?.reduce(
          (acc: number, module: any) =>
            acc +
            (module.lessons?.reduce(
              (lessonAcc: number, lesson: any) =>
                lessonAcc + (lesson.duration_seconds || 0),
              0
            ) || 0),
          0
        ) || 0;

      // Calculate average rating
      const avgRating =
        data.course_reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) /
          (data.course_reviews?.length || 1) || 0;

      return {
        ...data,
        duration: Math.floor(totalDuration / 3600) + " hours",
        totalLessons: data.course_modules?.reduce(
          (acc: number, module: any) => acc + (module.lessons?.length || 0),
          0
        ) || 0,
        students: data.enrollments?.[0]?.count || 0,
        rating: avgRating ? Number(avgRating.toFixed(1)) : 0,
      };
    },
    enabled: !!courseId,
  });
};
