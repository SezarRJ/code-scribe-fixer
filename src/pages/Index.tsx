import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [view, setView] = useState<"hero" | "dashboard">("hero");

  return (
    <div className="min-h-screen bg-background">
      {view === "hero" ? (
        <div>
          <HeroSection />
          <div className="fixed bottom-6 right-6">
            <Button 
              onClick={() => setView("dashboard")}
              className="bg-primary hover:bg-primary/90"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      ) : (
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
    </div>
  );
};

export default Index;
