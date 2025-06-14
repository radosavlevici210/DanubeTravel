import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatPrice } from "@/lib/utils";
import { Calendar, Clock, Users, MapPin, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Destination, Experience, InsertBooking } from "@shared/schema";

export default function Booking() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { type, id } = params;

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    checkinDate: "",
    checkoutDate: "",
    guests: 1,
    specialRequests: "",
  });

  const { data: item, isLoading } = useQuery<Destination | Experience>({
    queryKey: [`/api/${type}s/${id}`],
    enabled: !!type && !!id,
  });

  const bookingMutation = useMutation({
    mutationFn: async (booking: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", booking);
      return response.json();
    },
    onSuccess: (booking) => {
      toast({
        title: "Booking Confirmed!",
        description: `Your booking (#${booking.id}) has been confirmed. We'll send you confirmation details shortly.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      setTimeout(() => {
        setLocation("/");
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !id) return;

    const booking: InsertBooking = {
      itemId: parseInt(id),
      itemType: type || "",
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone || null,
      checkinDate: formData.checkinDate || null,
      checkoutDate: formData.checkoutDate || null,
      guests: formData.guests,
      totalPrice: calculateTotal(),
    };

    bookingMutation.mutate(booking);
  };

  const calculateTotal = () => {
    if (!item) return 0;
    
    if (type === "destination") {
      const destination = item as Destination;
      const nights = formData.checkinDate && formData.checkoutDate 
        ? Math.max(1, Math.ceil((new Date(formData.checkoutDate).getTime() - new Date(formData.checkinDate).getTime()) / (1000 * 60 * 60 * 24)))
        : 1;
      return destination.price * nights * formData.guests;
    } else {
      const experience = item as Experience;
      return experience.price * formData.guests;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-danube-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading booking details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h1>
              <p className="text-gray-600">The requested item could not be found.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const isDestination = type === "destination";
  const destination = isDestination ? item as Destination : null;
  const experience = !isDestination ? item as Experience : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isDestination ? destination?.name : experience?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isDestination && destination && (
                  <>
                    <img
                      src={destination.imageUrl}
                      alt={destination.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-3">
                      <div className="flex items-center text-slate-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {destination.country}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Star className="w-4 h-4 mr-2 fill-current text-amber-500" />
                        {destination.rating} rating
                      </div>
                      <p className="text-slate-600">{destination.description}</p>
                      <div className="text-2xl font-bold text-danube-600">
                        {formatPrice(destination.price)}/night
                      </div>
                    </div>
                  </>
                )}

                {!isDestination && experience && (
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="w-4 h-4 mr-2" />
                      {experience.groupSize}
                    </div>
                    <p className="text-slate-600">{experience.description}</p>
                    <div className="text-2xl font-bold text-danube-600">
                      {formatPrice(experience.price)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Full Name *</Label>
                    <Input
                      id="customerName"
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customerEmail">Email Address *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customerPhone">Phone Number</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    />
                  </div>

                  {isDestination && (
                    <>
                      <div>
                        <Label htmlFor="checkinDate">Check-in Date *</Label>
                        <Input
                          id="checkinDate"
                          type="date"
                          value={formData.checkinDate}
                          onChange={(e) => setFormData({ ...formData, checkinDate: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="checkoutDate">Check-out Date *</Label>
                        <Input
                          id="checkoutDate"
                          type="date"
                          value={formData.checkoutDate}
                          onChange={(e) => setFormData({ ...formData, checkoutDate: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="Any special requirements or requests..."
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-danube-600">
                        {formatPrice(calculateTotal())}
                      </span>
                    </div>
                    <Button
                      type="submit"
                      className="w-full danube-primary text-white hover:bg-danube-600"
                      disabled={bookingMutation.isPending}
                    >
                      {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
