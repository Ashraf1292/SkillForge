import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { supabase } from "@/integrations/supabase/client";


type ReactPlayerMinimalProps = {
  url: string;
  controls?: boolean;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
};

const PlayerWrapper = (props: ReactPlayerMinimalProps) => {

  return <ReactPlayer {...props} />;
};

// Lesson tyope
type Lesson = {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  video_url?: string;
  duration_seconds?: number;
  order_index: number;
};

const VideoPlayerPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchLesson = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("id", lessonId)
      .single();

    if (error) {
      setError(error.message);
      setLesson(null);
    } else {
      setLesson(data);
    }

    setLoading(false);
  };

  if (lessonId) fetchLesson();
}, [lessonId]);


  if (loading) {
    return <div className="p-8 text-center text-white">Loading lesson...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!lesson) {
    return <div className="p-8 text-center text-white">Lesson not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-start p-8">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      {lesson.description && <p className="mb-6 text-slate-300">{lesson.description}</p>}

      {lesson.video_url ? (
        <div className="w-full max-w-4xl aspect-video relative">
          <PlayerWrapper
            url={lesson.video_url}
            controls
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
      ) : (
        <p className="text-slate-400">No video available for this lesson.</p>
      )}
    </div>
  );
};

export default VideoPlayerPage;
