import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  BookOpen, 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Settings, 
  Eye,
  Sparkles,
  Calendar,
  Clock,
  Users,
  Award,
  TrendingUp,
  Check
} from "lucide-react";

const CreateCourse = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<"web_development" | "mobile_development" | "data_science" | "design" | "business" | "marketing" | "photography" | "music"|"other">("web_development");
  
  // UI state for preview
  const [activeTab, setActiveTab] = useState<"details" | "content" | "settings">("details");

  if (userRole !== "instructor") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 glass rounded-2xl p-8 border border-border/50">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-3xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">Only instructors can create courses</p>
          <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

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
        is_published: true,
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

  const categoryOptions = [
    { value: "web_development", label: "Web Development", icon: "💻" },
    { value: "mobile_development", label: "Mobile Development", icon: "📱" },
    { value: "data_science", label: "Data Science", icon: "📊" },
    { value: "design", label: "Design", icon: "🎨" },
    { value: "business", label: "Business", icon: "💼" },
    { value: "marketing", label: "Marketing", icon: "📈" },
    { value: "photography", label: "Photography", icon: "📸" },
    { value: "music", label: "Music", icon: "🎵" },
    { value: "other", label: "Other", icon: "📚" },
  ];

  const completionSteps = [
    { label: "Course Details", completed: title && description && category },
    { label: "Upload Content", completed: false },
    { label: "Pricing & Settings", completed: false },
    { label: "Publish Course", completed: false },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-slideDown">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Create New Course</h1>
          </div>
          <p className="text-muted-foreground text-lg ml-14">
            Share your expertise and inspire thousands of learners worldwide
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <div className="glass rounded-2xl p-6 border border-border/50">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">Course Creation Progress</h3>
            <div className="flex items-center justify-between gap-2">
              {completionSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 flex-1">
                  <div className={`flex items-center gap-2 flex-1 ${step.completed ? 'text-accent' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      step.completed 
                        ? 'bg-accent text-white' 
                        : 'bg-muted border-2 border-border'
                    }`}>
                      {step.completed ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                  </div>
                  {index < completionSteps.length - 1 && (
                    <div className={`h-0.5 flex-1 ${step.completed ? 'bg-accent' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* course Creation Form */}
          <div className="lg:col-span-2 space-y-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Details Card */}
              <div className="glass rounded-3xl p-8 border border-border/50 hover:border-border transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Course Details</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block mb-2 font-semibold text-sm flex items-center gap-2">
                      Course Title
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Complete Web Development Bootcamp 2024"
                      className="h-12 glass border-border/50"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {title.length}/100 characters
                    </p>
                  </div>

                  <div>
                    <label htmlFor="description" className="block mb-2 font-semibold text-sm flex items-center gap-2">
                      Course Description
                      <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what students will learn in this course..."
                      rows={6}
                      className="glass border-border/50 resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {description.length}/500 characters
                    </p>
                  </div>

                  <div>
                    <label htmlFor="category" className="block mb-2 font-semibold text-sm flex items-center gap-2">
                      Category
                      <span className="text-destructive">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categoryOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setCategory(option.value as typeof category)}
                          className={`p-4 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                            category === option.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border/50 glass hover:border-border'
                          }`}
                        >
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="text-sm font-medium">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-3xl p-8 border border-border/50 opacity-60">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-accent/10">
                    <Upload className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Course Content</h2>
                  <span className="ml-auto text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">Coming Soon</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-border">
                    <Image className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-muted-foreground">Upload Course Thumbnail</p>
                      <p className="text-sm text-muted-foreground">Recommended: 1280x720px</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-border">
                    <Video className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-muted-foreground">Add Video Lessons</p>
                      <p className="text-sm text-muted-foreground">Upload or record videos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-border">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-muted-foreground">Attach Resources</p>
                      <p className="text-sm text-muted-foreground">PDFs, documents, code files</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={loading || !title || !description}
                  size="lg"
                  className="flex-1 h-14 text-lg font-semibold"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Create Course
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                  className="h-14"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* extra*/}
          <div className="lg:col-span-1 space-y-6 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            {/* Preview Card */}
            <div className="glass rounded-3xl p-6 border border-border/50 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Course Preview</h3>
              </div>
              
              <div className="space-y-4">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border/50">
                  <div className="text-center text-muted-foreground">
                    <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Thumbnail Preview</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1 line-clamp-2">
                    {title || "Your Course Title"}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {description || "Your course description will appear here..."}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>0 students enrolled</span>
                </div>
              </div>
            </div>

            {/* Tips & hints*/}
            <div className="glass rounded-3xl p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Pro Tips</h3>
              </div>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Use clear, descriptive titles that include key topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Write engaging descriptions highlighting learning outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Choose the most relevant category for better discoverability</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>High-quality thumbnails increase enrollment by 50%</span>
                </li>
              </ul>
            </div>

            {/* Stats Card */}
            <div className="glass rounded-3xl p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold">Your Impact</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Courses</span>
                  <span className="text-2xl font-bold gradient-text">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Students</span>
                  <span className="text-2xl font-bold gradient-text">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Rating</span>
                  <span className="text-2xl font-bold gradient-text">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;