import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin } from "lucide-react";
import { useLocation } from "wouter";

export default function SearchForm() {
  const [, setLocation] = useLocation();
  const [searchData, setSearchData] = useState({
    destination: "",
    checkin: "",
    checkout: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchData.destination && searchData.checkin && searchData.checkout) {
      // Navigate to destinations with search params
      const params = new URLSearchParams({
        query: searchData.destination,
        checkin: searchData.checkin,
        checkout: searchData.checkout,
      });
      setLocation(`/destinations?${params.toString()}`);
    } else {
      // If no specific search, just go to destinations
      setLocation("/destinations");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-3xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Label className="block text-sm font-medium text-slate-700 mb-2">Where to?</Label>
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchData.destination}
              onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-danube-500 focus:border-transparent transition-all pr-10"
            />
            <MapPin className="absolute right-3 top-10 text-slate-400 w-4 h-4" />
          </div>
          <div>
            <Label className="block text-sm font-medium text-slate-700 mb-2">Check-in</Label>
            <Input
              type="date"
              value={searchData.checkin}
              onChange={(e) => setSearchData({ ...searchData, checkin: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-danube-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-slate-700 mb-2">Check-out</Label>
            <Input
              type="date"
              value={searchData.checkout}
              onChange={(e) => setSearchData({ ...searchData, checkout: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-danube-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <Button 
          type="submit"
          className="w-full danube-primary text-white hover:bg-danube-600 px-8 py-4 rounded-lg transition-all font-semibold text-lg shadow-lg"
        >
          <Search className="mr-2 w-5 h-5" />
          Search Experiences
        </Button>
      </form>
    </div>
  );
}
