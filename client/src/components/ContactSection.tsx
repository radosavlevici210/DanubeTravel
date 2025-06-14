import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Send, Bot, Shield, Focus, Mail, Phone, Clock } from "lucide-react";
import type { InsertInquiry } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: "",
    message: "",
  });

  const inquiryMutation = useMutation({
    mutationFn: async (inquiry: InsertInquiry) => {
      const response = await apiRequest("POST", "/api/inquiries", inquiry);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent!",
        description: "Thank you for your inquiry. Our AI travel consultant will contact you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        interests: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, and Message).",
        variant: "destructive",
      });
      return;
    }

    inquiryMutation.mutate(formData);
  };

  return (
    <section className="py-20 bg-slate-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Plan Your Journey</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our AI travel consultants are ready to create your perfect Danube experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800">
                  Get Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="interests">Interests</Label>
                    <Select value={formData.interests} onValueChange={(value) => setFormData({ ...formData, interests: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your interests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="culture">Cultural Heritage</SelectItem>
                        <SelectItem value="cuisine">Culinary Experiences</SelectItem>
                        <SelectItem value="photography">Photography Tours</SelectItem>
                        <SelectItem value="luxury">Luxury Travel</SelectItem>
                        <SelectItem value="adventure">Adventure Activities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your dream Danube experience..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full danube-primary text-white hover:bg-danube-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg"
                    disabled={inquiryMutation.isPending}
                  >
                    <Send className="mr-2 w-5 h-5" />
                    {inquiryMutation.isPending ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="bg-white rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-800">
                    AI-Powered Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-danube-100 rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-danube-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">Quantum AI Analytics</h4>
                        <p className="text-sm text-slate-600">
                          Advanced algorithms analyze your preferences for perfect matches
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <Focus className="w-5 h-5 text-amber-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">Autonomous Monitoring</h4>
                        <p className="text-sm text-slate-600">
                          Real-time destination insights and safety updates
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-teal-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">Blockchain Security</h4>
                        <p className="text-sm text-slate-600">
                          Your data and bookings protected by advanced encryption
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-800">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-danube-600" />
                      <span className="text-slate-700">radosavlevici210@icloud.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-danube-600" />
                      <span className="text-slate-700">+1 (555) 123-PEARL</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-danube-600" />
                      <span className="text-slate-700">24/7 AI Support Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
