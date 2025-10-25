import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ModuleLessons = () => {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  console.log("courseId from URL:", courseId);
console.log("moduleId from URL:", moduleId);
  const [lessons, setLessons] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  console.log("moduleId from useParams:", moduleId);


  const fetchLessons = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("lessons")
      .select("*")
      .eq("module_id", moduleId)
      .order("order_index", { ascending: true });
    setLessons(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLessons();
  }, [moduleId]);

  const handleAddLesson = async () => {
  if (!title || !moduleId) return;
  setSaving(true);
  console.log("Adding lesson:", { title, description, videoUrl, moduleId });
  const { data, error } = await supabase.from("lessons").insert({
    module_id: moduleId,
    title,
    description,
    video_url: videoUrl,
    order_index: lessons.length + 1,
  });
   setSaving(false);
  if (error) console.error("Insert error:", error);
  else console.log("Inserted lesson:", data);

  setTitle("");
  setDescription("");
  setVideoUrl("");
  fetchLessons();
};

  return (
    <div className="space-y-6 container py-12">
      <Card className="max-w-3xl mx-auto space-y-4">
        <CardHeader>
          <CardTitle>Add Lesson</CardTitle>
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
         <Button onClick={handleAddLesson} disabled={saving}>
  {saving ? "Adding..." : "Add Lesson"}
</Button>
        </CardContent>
      </Card>

      <div className="max-w-3xl mx-auto space-y-4">
        {lessons.map((lesson, idx) => (
          <Card key={lesson.id}>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{idx + 1}. {lesson.title}</p>
                <p className="text-sm text-muted-foreground">{lesson.description}</p>
              </div>
              <div className="space-x-2">
                <Button size="sm">Edit</Button>
                <Button size="sm" variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModuleLessons;
