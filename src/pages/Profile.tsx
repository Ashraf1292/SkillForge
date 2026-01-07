import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StudentProfile from "@/components/profile/StudentProfile";
import InstructorProfile from "@/components/profile/InstructorProfile";

const Profile = () => {
  const { userId } = useParams();
  
  // Mock data - (for now)
  const currentUserId = "current-user-id";
  const isOwnProfile = userId === currentUserId;
  
  const profileData = {
    id: userId || "1",
    name: "John Doe",
    role: "student" as "student" | "instructor",
    avatar: "",
    bio: "Passionate learner exploring web development and design. Always eager to learn new technologies and share knowledge with the community.",
    skills: ["React", "TypeScript", "UI/UX Design", "Node.js"],
    joinedDate: "January 2024",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <ProfileHeader 
            profile={profileData} 
            isOwnProfile={isOwnProfile} 
          />
          
          <div className="mt-8">
            {profileData.role === "student" ? (
              <StudentProfile />
            ) : (
              <InstructorProfile />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
