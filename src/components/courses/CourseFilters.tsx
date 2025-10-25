import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CourseFiltersType } from "@/pages/Courses";

const categories = [
  "All Categories",
  "Development",
  "Design",
  "Marketing",
  "Photography",
  "Business",
  "Teaching",
  "Music",
  "Health & Fitness",
];

const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

type CourseFiltersProps = {
  filters: CourseFiltersType;
  setFilters: (filters: CourseFiltersType) => void;
};

export const CourseFilters = ({ filters, setFilters }: CourseFiltersProps) => {
  const handleClearFilters = () => {
    setFilters({
      category: "",
      difficulty: "",
      instructor: "",
      searchQuery: "",
    });
  };

  const hasActiveFilters = filters.category || filters.difficulty;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Filters</CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Category</Label>
          <RadioGroup
            value={filters.category}
            onValueChange={(value) =>
              setFilters({ ...filters, category: value === "All Categories" ? "" : value })
            }
          >
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={`category-${category}`} />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Difficulty</Label>
          <RadioGroup
            value={filters.difficulty}
            onValueChange={(value) =>
              setFilters({ ...filters, difficulty: value === "All Levels" ? "" : value })
            }
          >
            {difficulties.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <RadioGroupItem value={difficulty} id={`difficulty-${difficulty}`} />
                <Label
                  htmlFor={`difficulty-${difficulty}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {difficulty}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};
