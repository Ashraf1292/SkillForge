import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    user: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    rating: 5,
    date: "2 weeks ago",
    comment:
      "This course exceeded my expectations! The instructor explains complex concepts in a clear and engaging way. The projects are practical and helped me build a strong portfolio.",
  },
  {
    id: 2,
    user: {
      name: "Maria Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
    rating: 5,
    date: "1 month ago",
    comment:
      "Absolutely fantastic course! I went from knowing nothing about web development to building my own websites. The curriculum is well-structured and easy to follow.",
  },
  {
    id: 3,
    user: {
      name: "David Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    rating: 4,
    date: "1 month ago",
    comment:
      "Great course with comprehensive content. The only minor improvement would be more advanced projects, but overall highly recommended for beginners.",
  },
  {
    id: 4,
    user: {
      name: "Emily Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    rating: 5,
    date: "2 months ago",
    comment:
      "Sarah is an excellent teacher! The hands-on approach and real-world examples made learning so much easier. Best investment in my career.",
  },
];

const ratingDistribution = [
  { stars: 5, percentage: 75, count: 1157 },
  { stars: 4, percentage: 18, count: 278 },
  { stars: 3, percentage: 5, count: 77 },
  { stars: 2, percentage: 1, count: 15 },
  { stars: 1, percentage: 1, count: 16 },
];

export const CourseReviews = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">4.8</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 5 ? "fill-accent text-accent" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Course Rating</p>
              </div>

              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span className="text-sm">{item.stars}</span>
                    </div>
                    <Progress value={item.percentage} className="flex-1 h-2" />
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.user.avatar} />
                    <AvatarFallback>
                      {review.user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{review.user.name}</h4>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-accent text-accent" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
