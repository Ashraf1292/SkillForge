import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayCircle, FileText, Clock } from "lucide-react";

const curriculum = [
  {
    id: 1,
    title: "Getting Started",
    lessons: 8,
    duration: "45 min",
    items: [
      { id: 1, title: "Welcome to the Course", type: "video", duration: "5 min" },
      { id: 2, title: "Setting Up Your Environment", type: "video", duration: "12 min" },
      { id: 3, title: "Course Resources", type: "document", duration: "3 min" },
      { id: 4, title: "Introduction to HTML", type: "video", duration: "15 min" },
      { id: 5, title: "Your First Webpage", type: "video", duration: "10 min" },
    ],
  },
  {
    id: 2,
    title: "HTML Fundamentals",
    lessons: 12,
    duration: "2h 15min",
    items: [
      { id: 1, title: "HTML Elements and Tags", type: "video", duration: "18 min" },
      { id: 2, title: "Working with Text", type: "video", duration: "12 min" },
      { id: 3, title: "Lists and Tables", type: "video", duration: "15 min" },
      { id: 4, title: "Forms and Input", type: "video", duration: "20 min" },
      { id: 5, title: "Practice Exercise", type: "document", duration: "30 min" },
    ],
  },
  {
    id: 3,
    title: "CSS Styling",
    lessons: 15,
    duration: "3h 30min",
    items: [
      { id: 1, title: "Introduction to CSS", type: "video", duration: "15 min" },
      { id: 2, title: "Selectors and Properties", type: "video", duration: "22 min" },
      { id: 3, title: "The Box Model", type: "video", duration: "18 min" },
      { id: 4, title: "Flexbox Layout", type: "video", duration: "25 min" },
      { id: 5, title: "CSS Grid", type: "video", duration: "28 min" },
    ],
  },
  {
    id: 4,
    title: "JavaScript Basics",
    lessons: 20,
    duration: "5h 45min",
    items: [
      { id: 1, title: "Variables and Data Types", type: "video", duration: "20 min" },
      { id: 2, title: "Functions and Scope", type: "video", duration: "25 min" },
      { id: 3, title: "Control Flow", type: "video", duration: "18 min" },
      { id: 4, title: "DOM Manipulation", type: "video", duration: "30 min" },
      { id: 5, title: "Events and Event Listeners", type: "video", duration: "22 min" },
    ],
  },
];

export const CourseCurriculum = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Course Curriculum</h2>
        <p className="text-sm text-muted-foreground">
          {curriculum.reduce((acc, module) => acc + module.lessons, 0)} lessons
        </p>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {curriculum.map((module, index) => (
          <AccordionItem
            key={module.id}
            value={`module-${module.id}`}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-start justify-between w-full pr-4">
                <div className="text-left">
                  <h3 className="font-semibold">
                    Section {index + 1}: {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {module.lessons} lessons • {module.duration}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {module.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    {item.type === "video" ? (
                      <PlayCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    ) : (
                      <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className="flex-1 text-sm">{item.title}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
