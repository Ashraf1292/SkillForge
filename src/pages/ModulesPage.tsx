import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CourseModule = {
  id: string;
  title: string;
  description: string | null;
  course_id: string;
  order_index: number;
  created_at: string;
};

const ModulesPage = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState<CourseModule[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // ✅ Fetch all modules for this course
  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("course_modules") // ✅ FIXED
        .select("*")
        .eq("course_id", courseId)
        .order("order_index", { ascending: true });

      if (error) console.error(error);
      if (data) setModules(data);
      setLoading(false);
    };

    fetchModules();
  }, [courseId]);

  // ✅ Add new module
  const handleAddModule = async () => {
    if (!title.trim()) return;
    setAdding(true);

    // Calculate next order_index
    const nextOrder = modules.length > 0 ? modules.length + 1 : 1;

    const { data, error } = await supabase
      .from("course_modules") // ✅ FIXED
      .insert([
        {
          title,
          description,
          course_id: courseId!,
          order_index: nextOrder, // ✅ Required by schema
        },
      ])
      .select();

    if (error) console.error(error);
    if (data) {
      setModules((prev) => [...prev, data[0]]);
      setTitle("");
      setDescription("");
    }

    setAdding(false);
  };

  if (loading) return <p className="p-8">Loading modules...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <Card className="max-w-3xl mx-auto space-y-6">
          <CardHeader>
            <CardTitle>Manage Modules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add new module */}
            <div className="space-y-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Module title"
              />
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Module description (optional)"
              />
              <Button
                onClick={handleAddModule}
                disabled={adding}
                className="w-full bg-accent hover:bg-accent/90"
              >
                {adding ? "Adding..." : "Add Module"}
              </Button>
            </div>

            {/* Existing modules list */}
            <div className="space-y-4">
              {modules.length === 0 ? (
                <p className="text-muted-foreground">No modules yet.</p>
              ) : (
                modules.map((mod) => (
                  <Card key={mod.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{mod.title}</h3>
                        {mod.description && (
                          <p className="text-sm text-muted-foreground">
                            {mod.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" asChild>
                          <Link
                            to={`/course/${courseId}/modules/${mod.id}/lessons`}
                          >
                            Manage Lessons
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => navigate(`/course/${courseId}/edit`)}
              className="w-full"
            >
              Back to Course
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ModulesPage;
