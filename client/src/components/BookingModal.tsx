import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatPrice } from "@/lib/utils";
import type { InsertBooking, Destination, Experience } from "@shared/schema";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Destination | Experience;
  type: "destination" | "experience";
}

export default function BookingModal({ isOpen, onClose, item, type }: BookingModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    checkinDate: "",
    checkoutDate: "",
    guests: 1,
  });

  const bookingMutation = useMutation({
    mutationFn: async (booking: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", booking);
      return response.json();
    },
    onSuccess: (booking) => {
      toast({
        title: "Booking Confirmed!",
        description: `Your booking (#${booking.id}) has been confirmed.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      onClose();
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        checkinDate: "",
        checkoutDate: "",
        guests: 1,
      });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const booking: InsertBooking = {
      itemId: item.id,
      itemType: type,
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Book {type === "destination" ? (item as Destination).name : (item as Experience).title}
          </DialogTitle>
        </DialogHeader>
        
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

          {type === "destination" && (
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

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-danube-600">
                {formatPrice(calculateTotal())}
              </span>
            </div>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 danube-primary text-white hover:bg-danube-600"
                disabled={bookingMutation.isPending}
              >
                {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
