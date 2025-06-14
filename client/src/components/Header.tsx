import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Gem, Search, Heart, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-danube-700 flex items-center">
                  <Gem className="mr-2" />
                  Perla Dunării
                </h1>
              </Link>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link 
                href="/destinations"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/destinations") 
                    ? "text-danube-600 bg-danube-50" 
                    : "text-slate-700 hover:text-danube-600"
                }`}
              >
                Destinations
              </Link>
              <Link 
                href="/experiences"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/experiences") 
                    ? "text-danube-600 bg-danube-50" 
                    : "text-slate-700 hover:text-danube-600"
                }`}
              >
                Experiences
              </Link>
              <a href="#hotels" className="text-slate-700 hover:text-danube-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Hotels
              </a>
              <a href="#about" className="text-slate-700 hover:text-danube-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-slate-700 hover:text-danube-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-slate-700 hover:text-danube-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <Button className="danube-primary text-white hover:bg-danube-600 text-sm font-medium">
              Sign In
            </Button>
            <button 
              className="md:hidden text-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/destinations"
                className="text-slate-700 hover:text-danube-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Destinations
              </Link>
              <Link 
                href="/experiences"
                className="text-slate-700 hover:text-danube-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Experiences
              </Link>
              <a href="#hotels" className="text-slate-700 hover:text-danube-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Hotels
              </a>
              <a href="#about" className="text-slate-700 hover:text-danube-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
