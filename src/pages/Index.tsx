import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import PlatformArchitecture from "@/components/PlatformArchitecture";
import DiscoveryEngine from "@/components/DiscoveryEngine";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [view, setView] = useState<"hero" | "dashboard" | "architecture" | "discovery">("hero");

  return (
    <div className="min-h-screen bg-background">
      {view === "hero" && (
        <div>
          <HeroSection />
          <div className="fixed bottom-6 right-6 flex flex-col gap-2">
            <Button 
              onClick={() => setView("discovery")}
              className="bg-primary hover:bg-primary/90"
            >
              Start Discovery
            </Button>
            <Button 
              onClick={() => setView("architecture")}
              variant="outline"
            >
              View Architecture
            </Button>
            <Button 
              onClick={() => setView("dashboard")}
              variant="outline"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      )}
      
      {view === "dashboard" && (
        <div>
          <Dashboard />
          <div className="fixed bottom-6 right-6">
            <Button 
              onClick={() => setView("hero")}
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}
      
      {view === "architecture" && (
        <div>
          <PlatformArchitecture />
          <div className="fixed bottom-6 right-6">
            <Button 
              onClick={() => setView("hero")}
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}
      
      {view === "discovery" && (
        <div>
          <DiscoveryEngine />
          <div className="fixed bottom-6 right-6">
            <Button 
              onClick={() => setView("hero")}
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
