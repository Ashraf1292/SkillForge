import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useEnrollment = (courseId: string | undefined) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["enrollment", courseId, user?.id],
    queryFn: async () => {
      if (!courseId || !user?.id) return null;

      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("course_id", courseId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!courseId && !!user?.id,
  });
};

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user?.id) throw new Error("Must be logged in to enroll");

      const { data, error } = await supabase
        .from("enrollments")
        .insert({
          course_id: courseId,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ["enrollment", courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Successfully enrolled in course!");
    },
    onError: (error) => {
      toast.error("Failed to enroll: " + error.message);
    },
  });
};
