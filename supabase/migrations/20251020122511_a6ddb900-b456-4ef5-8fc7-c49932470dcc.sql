-- Create storage bucket for course videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-videos',
  'course-videos',
  false,
  524288000, -- 500MB limit
  ARRAY['video/mp4', 'video/webm', 'video/quicktime']
);

-- Create storage bucket for course thumbnails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-thumbnails',
  'course-thumbnails',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- RLS Policies for course-videos bucket
CREATE POLICY "Instructors can upload videos to their courses"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'course-videos' AND
  auth.uid() IN (
    SELECT instructor_id FROM public.courses
    WHERE id::text = (storage.foldername(name))[1]
  )
);

CREATE POLICY "Instructors can update their course videos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'course-videos' AND
  auth.uid() IN (
    SELECT instructor_id FROM public.courses
    WHERE id::text = (storage.foldername(name))[1]
  )
);

CREATE POLICY "Instructors can delete their course videos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'course-videos' AND
  auth.uid() IN (
    SELECT instructor_id FROM public.courses
    WHERE id::text = (storage.foldername(name))[1]
  )
);

CREATE POLICY "Enrolled users can view course videos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'course-videos' AND
  auth.uid() IN (
    SELECT user_id FROM public.enrollments
    WHERE course_id::text = (storage.foldername(name))[1]
  )
);

-- RLS Policies for course-thumbnails bucket
CREATE POLICY "Anyone can view thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-thumbnails');

CREATE POLICY "Instructors can upload thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'course-thumbnails' AND
  has_role(auth.uid(), 'instructor'::app_role)
);

CREATE POLICY "Instructors can update their thumbnails"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'course-thumbnails' AND
  auth.uid() IN (
    SELECT instructor_id FROM public.courses
    WHERE id::text = (storage.foldername(name))[1]
  )
);

CREATE POLICY "Instructors can delete their thumbnails"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'course-thumbnails' AND
  auth.uid() IN (
    SELECT instructor_id FROM public.courses
    WHERE id::text = (storage.foldername(name))[1]
  )
);

-- Create analytics tracking table
CREATE TABLE public.course_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'enroll', 'complete', 'unenroll')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.course_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for analytics
CREATE POLICY "Instructors can view their course analytics"
ON public.course_analytics FOR SELECT
USING (
  auth.uid() IN (
    SELECT instructor_id FROM public.courses WHERE id = course_id
  )
);

CREATE POLICY "System can insert analytics"
ON public.course_analytics FOR INSERT
WITH CHECK (true);

-- Create indexes for analytics queries
CREATE INDEX idx_analytics_course ON public.course_analytics(course_id);
CREATE INDEX idx_analytics_event_type ON public.course_analytics(event_type);
CREATE INDEX idx_analytics_created_at ON public.course_analytics(created_at);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('enrollment', 'review', 'completion', 'announcement', 'other')),
  read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications"
ON public.notifications FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
ON public.notifications FOR INSERT
WITH CHECK (true);

-- Create index
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

-- Create function to get course statistics
CREATE OR REPLACE FUNCTION public.get_course_stats(course_id_param UUID)
RETURNS TABLE (
  total_enrollments BIGINT,
  active_students BIGINT,
  avg_rating NUMERIC,
  total_reviews BIGINT,
  completion_rate NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH enrollment_stats AS (
    SELECT COUNT(*) as enrollments
    FROM enrollments
    WHERE course_id = course_id_param
  ),
  active_stats AS (
    SELECT COUNT(DISTINCT e.user_id) as active
    FROM enrollments e
    JOIN lesson_progress lp ON lp.user_id = e.user_id
    WHERE e.course_id = course_id_param
      AND lp.created_at > NOW() - INTERVAL '30 days'
  ),
  review_stats AS (
    SELECT 
      AVG(rating) as avg_rat,
      COUNT(*) as total_rev
    FROM course_reviews
    WHERE course_id = course_id_param
  ),
  completion_stats AS (
    SELECT 
      COUNT(DISTINCT CASE WHEN all_completed THEN user_id END)::NUMERIC / 
      NULLIF(COUNT(DISTINCT user_id), 0) as completion
    FROM (
      SELECT 
        e.user_id,
        BOOL_AND(COALESCE(lp.completed, false)) as all_completed
      FROM enrollments e
      CROSS JOIN lessons l
      JOIN course_modules cm ON l.module_id = cm.id
      LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = e.user_id
      WHERE e.course_id = course_id_param AND cm.course_id = course_id_param
      GROUP BY e.user_id
    ) completion_data
  )
  SELECT 
    COALESCE(es.enrollments, 0),
    COALESCE(ast.active, 0),
    COALESCE(rs.avg_rat, 0),
    COALESCE(rs.total_rev, 0),
    COALESCE(cs.completion, 0)
  FROM enrollment_stats es, active_stats ast, review_stats rs, completion_stats cs;
END;
$$;

-- Create function to get instructor statistics
CREATE OR REPLACE FUNCTION public.get_instructor_stats(instructor_id_param UUID)
RETURNS TABLE (
  total_courses BIGINT,
  total_students BIGINT,
  total_revenue NUMERIC,
  avg_rating NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH course_stats AS (
    SELECT COUNT(*) as courses
    FROM courses
    WHERE instructor_id = instructor_id_param AND is_published = true
  ),
  student_stats AS (
    SELECT COUNT(DISTINCT e.user_id) as students
    FROM enrollments e
    JOIN courses c ON c.id = e.course_id
    WHERE c.instructor_id = instructor_id_param
  ),
  rating_stats AS (
    SELECT AVG(cr.rating) as avg_rat
    FROM course_reviews cr
    JOIN courses c ON c.id = cr.course_id
    WHERE c.instructor_id = instructor_id_param
  )
  SELECT 
    COALESCE(cs.courses, 0),
    COALESCE(ss.students, 0),
    0::NUMERIC as revenue, -- Placeholder for future payment integration
    COALESCE(rs.avg_rat, 0)
  FROM course_stats cs, student_stats ss, rating_stats rs;
END;
$$;

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;