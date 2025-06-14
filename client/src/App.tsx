import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';
import { config } from './lib/web3-config';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Destinations from "@/pages/destinations";
import Experiences from "@/pages/experiences";
import Booking from "@/pages/booking";
import Payments from "@/pages/payments";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/experiences" component={Experiences} />
      <Route path="/booking/:type/:id" component={Booking} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
