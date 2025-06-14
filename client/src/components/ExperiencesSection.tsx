import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { Link } from "wouter";
import { formatPrice } from "@/lib/utils";
import type { Experience } from "@shared/schema";

export default function ExperiencesSection() {
  const { data: experiences, isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  const getIconClass = (icon: string) => {
    const iconMap: Record<string, string> = {
      ship: "fas fa-ship",
      camera: "fas fa-camera",
      utensils: "fas fa-utensils",
      landmark: "fas fa-landmark",
    };
    return iconMap[icon] || "fas fa-star";
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      cruise: "bg-blue-100 text-blue-600",
      photography: "bg-amber-100 text-amber-600",
      culinary: "bg-green-100 text-green-600",
      culture: "bg-purple-100 text-purple-600",
    };
    return colorMap[category] || "bg-gray-100 text-gray-600";
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Unforgettable Experiences</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Loading experiences...</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Unforgettable Experiences</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From river cruises to cultural tours, discover the best of Danube region
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences?.map((experience) => (
            <Card key={experience.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
              <CardContent className="p-0">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getCategoryColor(experience.category)}`}>
                      <i className={`${getIconClass(experience.icon)} text-2xl`}></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{experience.title}</h3>
                    <p className="text-slate-600 mb-4">{experience.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-slate-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {experience.duration}
                        </span>
                        <span className="text-sm text-slate-500 flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {experience.groupSize}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-danube-600">
                        {formatPrice(experience.price)}
                      </span>
                    </div>
                    <Link href={`/booking/experience/${experience.id}`}>
                      <Button className="w-full danube-primary text-white hover:bg-danube-600 font-medium">
                        Book Experience
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
