import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


type CourseCategory =
  | "web_development"
  | "mobile_development"
  | "data_science"
  | "design"
  | "business"
  | "marketing"
  | "photography"
  | "music"
  | "other";

type Difficulty = "beginner" | "intermediate" | "advanced";

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fields
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<CourseCategory | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setCourse(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setCategory(data.category || "");
        setDifficulty(data.difficulty || "");
        setThumbnailUrl(data.thumbnail_url || "");
        setPublished(data.is_published || false);
      }
      setIsLoading(false);
    };

    fetchCourse();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("courses")
      .update({
        title,
        description,
        category: category || undefined,
        difficulty: difficulty || undefined,
        thumbnail_url: thumbnailUrl,
        is_published: published,
      })
      .eq("id", id);
    setSaving(false);
    if (!error) navigate(`/course/${id}`);
    else console.error(error);
  };

  if (isLoading) return <p className="p-8">Loading course...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <Card className="max-w-3xl mx-auto space-y-6">
          <CardHeader>
            <CardTitle>Edit Course</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">Course Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                rows={5}
              />
            </div>

            {/* Category & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground">Category</label>
                <Select value={category} onValueChange={(val) => setCategory(val as CourseCategory)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "web_development",
                      "mobile_development",
                      "data_science",
                      "design",
                      "business",
                      "marketing",
                      "photography",
                      "music",
                      "other",
                    ].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground">Difficulty</label>
                <Select value={difficulty} onValueChange={(val) => setDifficulty(val as Difficulty)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {["beginner", "intermediate", "advanced"].map((diff) => (
                      <SelectItem key={diff} value={diff}>
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Thumbnail URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">Thumbnail URL</label>
              <Input
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="Enter thumbnail URL"
              />
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox checked={published} onCheckedChange={(val) => setPublished(!!val)} />
              <span className="text-sm text-muted-foreground">Publish course</span>
            </div>

            {/* Save Button */}
            <Button
              size="lg"
              className="w-full bg-accent hover:bg-accent/90"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
                size="lg"
                className="w-full bg-secondary hover:bg-secondary/90"
                asChild
              >
                <Link to={`/course/${course.id}/modules`}>Manage Lessons</Link>
              </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CourseEdit;
