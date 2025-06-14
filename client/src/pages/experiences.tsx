import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import { Link } from "wouter";
import { formatPrice } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Experience } from "@shared/schema";

export default function Experiences() {
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
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-danube-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading experiences...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">All Experiences</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover amazing activities and tours throughout the Danube region
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experiences?.map((experience) => (
              <Card key={experience.id} className="p-8 hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getCategoryColor(experience.category)}`}>
                        <i className={`${getIconClass(experience.icon)} text-2xl`}></i>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        {experience.title}
                      </h3>
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
                        <Button className="w-full danube-primary text-white hover:bg-danube-600">
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

      <Footer />
    </div>
  );
}
