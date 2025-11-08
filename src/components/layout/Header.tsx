import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Search, Menu, LogOut, User } from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // make sure this import is at top if not already
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const NavLinks = () => (
    <>
      <Link to="/courses" className="text-foreground hover:text-primary transition-colors">
        Browse Courses
      </Link>
      <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
        My Learning
      </Link>
    </>
  );

  const navigate = useNavigate();
const [query, setQuery] = useState("");

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (query.trim()) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }
};

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            SkillForge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
         <form onSubmit={handleSearch} className="relative">
  <Search
    onClick={handleSearch}
    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
  />
  <Input
    type="search"
    placeholder="Search courses..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="pl-9 w-64"
  />
</form>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <NotificationBell />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile/edit">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-courses">My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link to="/auth">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col gap-6 mt-6">
              <form onSubmit={handleSearch} className="relative">
  <Search
    onClick={handleSearch}
    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
  />
  <Input
    type="search"
    placeholder="Search courses..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="pl-9"
  />
</form>

              <nav className="flex flex-col gap-4">
                <NavLinks />
              </nav>
              <div className="flex flex-col gap-3 pt-4 border-t">
                {user ? (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/profile/edit">Profile</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/my-courses">My Courses</Link>
                    </Button>
                    <Button variant="destructive" onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/auth">Login</Link>
                    </Button>
                    <Button asChild className="bg-accent hover:bg-accent/90">
                      <Link to="/auth">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
