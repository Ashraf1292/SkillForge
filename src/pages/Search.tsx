import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Search Results</h1>
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </form>
            {initialQuery && (
              <p className="mt-4 text-muted-foreground">
                Showing results for "{initialQuery}"
              </p>
            )}
          </div>
        </div>

        <div className="container py-12">
          <CourseGrid
            filters={{
              category: "",
              difficulty: "",
              instructor: "",
              searchQuery: initialQuery,
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
