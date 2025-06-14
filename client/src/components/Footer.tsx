import { Gem } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Gem className="mr-2" />
              Perla Dunării
            </h3>
            <p className="text-slate-300 mb-6 max-w-md">
              Discover the pearl of the Danube with our AI-powered tourism platform. 
              Unforgettable experiences await along Europe's second-longest river.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-danube-500 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-danube-500 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-danube-500 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-danube-500 transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Budapest</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vienna</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bratislava</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Belgrade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bucharest</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Booking Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Assistant</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Travel Insurance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2025 Perla Dunării AI Tourism Platform. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
