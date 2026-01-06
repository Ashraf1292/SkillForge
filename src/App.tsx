import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import MyCourses from "./pages/MyCourses";
import NotFound from "./pages/NotFound";
import CoursePlayer from "./pages/CoursePlayer";
import Admin from "./pages/Admin";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import ModulesPage from "./pages/ModulesPage";
import ModuleLessons from "./pages/ModuleLessons";
import EditLesson from "./pages/EditLesson";
import VideoPlayerPage from "./pages/VideoPlayerPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/course/:id/edit" element={<EditCourse />} />
            <Route path="/course/:id/modules" element={<ModulesPage />} />
            <Route path="/course/:courseId/modules/:moduleId/lessons" element={<ModuleLessons />} />
            <Route path ="/course/:courseId/modules/:moduelId/lessons/:lessonId" element={<VideoPlayerPage/>}/>
            <Route
  path="/course/:courseId/modules/:moduleId/lessons/:lessonId/edit"
  element={<EditLesson />}
/>
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile/:userId" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/edit" element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            } />
            <Route path="/my-courses" element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            } />
            <Route path="/learn/:courseId/:lessonId" element={
              <ProtectedRoute>
                <CoursePlayer />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requireRole="admin">
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/create-course" element={
              <ProtectedRoute requireRole="instructor">
              <CreateCourse />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
