import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  profile: {
    id: string;
    name: string;
    role: "student" | "instructor";
    avatar: string;
    bio: string;
    skills: string[];
    joinedDate: string;
  };
  isOwnProfile: boolean;
}

const ProfileHeader = ({ profile, isOwnProfile }: ProfileHeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border p-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h1>
              <Badge variant="secondary" className="mb-2">
                {profile.role === "instructor" ? "Instructor" : "Student"}
              </Badge>
              <p className="text-sm text-muted-foreground">Joined {profile.joinedDate}</p>
            </div>
            
            {isOwnProfile ? (
              <Button asChild>
                <Link to="/profile/edit">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Follow
                </Button>
              </div>
            )}
          </div>
          
          <p className="text-foreground mb-4">{profile.bio}</p>
          
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
