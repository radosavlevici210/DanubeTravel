import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "wouter";
import { formatPrice } from "@/lib/utils";
import type { Destination } from "@shared/schema";

export default function FeaturedDestinations() {
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">AI-Curated Destinations</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Loading featured destinations...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">AI-Curated Destinations</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover hidden gems and popular attractions along the Danube River, powered by advanced AI analytics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations?.map((destination) => (
            <Card key={destination.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                src={destination.imageUrl} 
                alt={destination.name}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-slate-800">{destination.name}</h3>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-danube-600">
                    {formatPrice(destination.price)}/night
                  </span>
                  <Link href={`/booking/destination/${destination.id}`}>
                    <Button className="danube-primary text-white hover:bg-danube-600 font-medium">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
