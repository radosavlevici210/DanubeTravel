import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import ExperiencesSection from "@/components/ExperiencesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <HeroSection />
      <FeaturedDestinations />
      <ExperiencesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
