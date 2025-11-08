import { Tables } from "@/integrations/supabase/types";

// ✅ Extend the existing course type from Supabase
export type Course = Tables<"courses"> & {
  // Add related or computed fields
  modules?: Module[];
  instructor?: InstructorProfile;
};

// ✅ Define module and lesson shape
export interface Module {
  id: string;
  title: string;
  description?: string | null;
  order_index: number;
  updated_at?: string | null;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  video_url?: string | null;
  duration_seconds?: number | null;
  order_index: number;
}

export interface InstructorProfile {
  id: string;
  display_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
}
