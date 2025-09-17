import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Cpu, Search, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Multi-Language Support",
      description: "Python, JavaScript, C++, Java, and more"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "GPT-5 and StarCoder integration for intelligent fixes"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Smart Detection",
      description: "Syntax, logic, performance, and security issues"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Fixes",
      description: "Automated suggestions with sandbox testing"
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Code Analysis
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Intelligent maintenance platform that detects issues, suggests fixes, and improves code quality 
              across multiple programming languages using advanced AI models.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
          
          {/* Features Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;