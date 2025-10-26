import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ModuleLessons = () => {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const [lessons, setLessons] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();


  const fetchLessons = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("module_id", moduleId)
      .order("order_index", { ascending: true });

    if (error) console.error("Fetch error:", error);
    setLessons(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLessons();
  }, [moduleId]);

  const handleAddLesson = async () => {
    if (!title || !moduleId) return;
    setSaving(true);

    const { data, error } = await supabase.from("lessons").insert({
      module_id: moduleId,
      title,
      description,
      video_url: videoUrl,
      order_index: lessons.length + 1,
    });

    setSaving(false);
    if (error) {
      console.error("Insert error:", error);
      return;
    }

    setTitle("");
    setDescription("");
    setVideoUrl("");
    fetchLessons();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container py-12 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Manage Module Lessons
        </h1>

        {/* Add Lesson Card */}
        <Card className="max-w-3xl mx-auto shadow-md border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-700">
              Add New Lesson
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
            <Button onClick={handleAddLesson} disabled={saving} className="w-full">
              {saving ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" /> Adding...
                </div>
              ) : (
                "Add Lesson"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="border-t border-gray-300 w-full max-w-3xl mx-auto my-8" />

        {/* Lessons List */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Lessons</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading lessons...</p>
          ) : lessons.length === 0 ? (
            <p className="text-center text-gray-500 italic">No lessons added yet.</p>
          ) : (
            lessons.map((lesson, idx) => (
              <Card key={lesson.id} className="border border-gray-200 shadow-sm">
                <CardContent className="flex justify-between items-center py-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">
                      {idx + 1}. {lesson.title}
                    </p>
                    <p className="text-sm text-gray-500">{lesson.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button  size="sm"
  variant="secondary"
  onClick={() =>  navigate(`/course/${courseId}/modules/${moduleId}/lessons/${lesson.id}/edit`)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModuleLessons;
