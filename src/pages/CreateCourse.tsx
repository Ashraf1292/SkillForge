import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CreateCourse = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<"web_development" | "mobile_development" | "data_science" | "design" | "business" | "marketing" | "photography" | "music"|"other">("web_development");

  if (userRole !== "instructor") return <div className="text-center py-20">Access denied</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return toast.error("Please fill all fields");

    setLoading(true);
    const { error } = await supabase.from("courses").insert([
      {
        instructor_id: user?.id,
        title,
        description,
        category,
        created_at: new Date().toISOString(),
        is_published: true, // explicitly set here
      },
    ]);

    if (error) {
      toast.error("Failed to create course");
      console.error(error);
    } else {
      toast.success("Course created successfully!");
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Course Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief course description"
            rows={4}
          />
        </div>
        <div>
             <label htmlFor="Category" className="block mb-1 font-medium">Category</label>
         <select
  value={category}
  onChange={(e) => setCategory(e.target.value as typeof category)}
>
  <option value="web_development">Web Development</option>
  <option value="mobile_development">Mobile Development</option>
  <option value="data_science">Data Science</option>
  <option value="design">Design</option>
  <option value="business">Business</option>
  <option value="marketing">Marketing</option>
  <option value="photography">Photography</option>
  <option value="music">Music</option>
  <option value="other">Other</option>
</select>   
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </div>
  );
};

export default CreateCourse;
