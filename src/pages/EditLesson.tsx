import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader2 } from "lucide-react";

const EditLesson = () => {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // fetch existing lesson
  useEffect(() => {
    const fetchLesson = async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

      if (error) {
        console.error("Error fetching lesson:", error);
      } else if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setVideoUrl(data.video_url);
      }
      setLoading(false);
    };
    fetchLesson();
  }, [lessonId]);

  // update lesson
  const handleUpdate = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("lessons")
      .update({
        title,
        description,
        video_url: videoUrl,
      })
      .eq("id", lessonId);

    setSaving(false);

    if (error) {
      console.error("Update error:", error);
      alert("Failed to update lesson!");
    } else {
      alert("Lesson updated successfully!");
      navigate(`/course/${courseId}/module/${moduleId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading lesson...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container py-12 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Lesson
        </h1>

        <Card className="max-w-3xl mx-auto shadow-md border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-700">
              Update Lesson Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Lesson title"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Lesson description"
              rows={3}
            />
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Video URL"
            />

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={saving}>
                {saving ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" /> Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default EditLesson;
