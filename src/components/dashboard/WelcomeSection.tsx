interface WelcomeSectionProps {
  userName: string;
  userRole: "student" | "instructor" | "admin";
}

const WelcomeSection = ({ userName, userRole }: WelcomeSectionProps) => {
  const greeting = new Date().getHours() < 12 ? "Good morning" : 
                   new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-foreground mb-2">
        {greeting}, {userName}!
      </h1>
      <p className="text-lg text-muted-foreground">
        {userRole === "student" 
          ? "Continue your learning journey" 
          : "Manage your courses and track student progress"}
      </p>
    </div>
  );
};

export default WelcomeSection;
