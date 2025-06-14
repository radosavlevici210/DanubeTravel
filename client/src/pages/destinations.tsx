import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { Link } from "wouter";
import { formatPrice } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Destination } from "@shared/schema";

export default function Destinations() {
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-danube-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading destinations...</p>
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
            <h1 className="text-4xl font-bold text-slate-800 mb-4">All Destinations</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore all the beautiful destinations along the Danube River
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations?.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={destination.imageUrl}
                    alt={destination.name}
                    className="w-full h-64 object-cover"
                  />
                  {destination.featured && (
                    <Badge className="absolute top-4 left-4 bg-amber-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-slate-800">{destination.name}</h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                  <p className="text-slate-600 mb-4">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-danube-600">
                      {formatPrice(destination.price)}/night
                    </span>
                    <Link href={`/booking/destination/${destination.id}`}>
                      <Button className="danube-primary text-white hover:bg-danube-600">
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

      <Footer />
    </div>
  );
}
