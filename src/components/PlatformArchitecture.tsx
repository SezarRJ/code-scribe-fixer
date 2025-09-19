import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Lightbulb, 
  FileText, 
  Palette, 
  Code, 
  TestTube, 
  Rocket, 
  Wrench,
  Cpu,
  Database,
  Cloud,
  Shield,
  Zap
} from 'lucide-react';

interface Phase {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed';
  progress: number;
  components: string[];
  timeline: string;
}

const PlatformArchitecture = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>('discovery');

  const phases: Phase[] = [
    {
      id: 'discovery',
      title: 'Discovery & Requirements',
      description: 'AI-powered requirement analysis and technical estimation',
      icon: <Lightbulb className="w-6 h-6" />,
      status: 'active',
      progress: 75,
      components: ['Questionnaire Bot', 'SRS Parser', 'Requirements Extractor', 'Technical Estimator'],
      timeline: 'Week 1-2'
    },
    {
      id: 'prototyping',
      title: 'Prototyping & Architecture',
      description: 'Automated wireframe and system architecture generation',
      icon: <Palette className="w-6 h-6" />,
      status: 'pending',
      progress: 25,
      components: ['Wireframe Generator', 'UI/UX Designer', 'Database Schema Creator', 'API Blueprint'],
      timeline: 'Week 3-4'
    },
    {
      id: 'development',
      title: 'AI Development Engine',
      description: 'Automated code generation for full-stack applications',
      icon: <Code className="w-6 h-6" />,
      status: 'pending',
      progress: 0,
      components: ['Backend Generator', 'Frontend Generator', 'Database Setup', 'CI/CD Pipeline'],
      timeline: 'Week 5-8'
    },
    {
      id: 'qa',
      title: 'QA & Testing Engine',
      description: 'Multi-layered validation and security testing',
      icon: <TestTube className="w-6 h-6" />,
      status: 'pending',
      progress: 0,
      components: ['Code Analysis', 'Security Scan', 'Performance Test', 'Integration Test'],
      timeline: 'Week 9-10'
    },
    {
      id: 'deployment',
      title: 'Deployment Orchestrator',
      description: 'Automated deployment and release management',
      icon: <Rocket className="w-6 h-6" />,
      status: 'pending',
      progress: 0,
      components: ['Container Orchestration', 'Cloud Deployment', 'Release Automation', 'Customer Delivery'],
      timeline: 'Week 11'
    },
    {
      id: 'maintenance',
      title: 'AI Maintenance Platform',
      description: 'Continuous monitoring, bug detection, and automated fixes',
      icon: <Wrench className="w-6 h-6" />,
      status: 'pending',
      progress: 0,
      components: ['Bug Detection', 'Auto Fixes', 'Knowledge Base', 'External API'],
      timeline: 'Week 12+'
    }
  ];

  const techStack = {
    backend: ['Python (FastAPI)', 'Django', 'PostgreSQL', 'MongoDB', 'ElasticSearch'],
    frontend: ['Next.js', 'Vue.js', 'React Native', 'Flutter'],
    ai: ['GPT-4/5', 'Claude', 'StarCoder', 'Code Llama'],
    devops: ['Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI'],
    tools: ['PyLint', 'ESLint', 'FindBugs', 'PVS-Studio'],
    integration: ['Stripe API', 'PayPal API', 'Figma API', 'OAuth2']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            AI-Powered Platform Architecture
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform ideas into production-ready applications with continuous AI maintenance
          </p>
        </div>

        <Tabs value={selectedPhase} onValueChange={setSelectedPhase} className="space-y-8">
          {/* Phase Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {phases.map((phase) => (
              <Card 
                key={phase.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPhase === phase.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedPhase(phase.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    {phase.icon}
                    <Badge variant={phase.status === 'completed' ? 'default' : phase.status === 'active' ? 'secondary' : 'outline'}>
                      {phase.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm">{phase.title}</CardTitle>
                  <CardDescription className="text-xs">{phase.timeline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={phase.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{phase.progress}% Complete</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Phase Details */}
          <TabsList className="grid w-full grid-cols-6">
            {phases.map((phase) => (
              <TabsTrigger key={phase.id} value={phase.id} className="text-xs">
                {phase.title.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {phases.map((phase) => (
            <TabsContent key={phase.id} value={phase.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {phase.icon}
                    <div>
                      <CardTitle>{phase.title}</CardTitle>
                      <CardDescription>{phase.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Core Components</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {phase.components.map((component, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                            <Cpu className="w-4 h-4 text-primary" />
                            <span className="text-sm">{component}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Implementation Status</h4>
                      <Progress value={phase.progress} className="mb-3" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Timeline: {phase.timeline}</p>
                        <p>Status: <Badge variant="outline">{phase.status}</Badge></p>
                        <p>Progress: {phase.progress}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Technology Stack Overview */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Technology Stack
            </CardTitle>
            <CardDescription>
              Comprehensive technology ecosystem for the AI platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-semibold capitalize flex items-center gap-2">
                    {category === 'backend' && <Database className="w-4 h-4" />}
                    {category === 'frontend' && <Palette className="w-4 h-4" />}
                    {category === 'ai' && <Zap className="w-4 h-4" />}
                    {category === 'devops' && <Cloud className="w-4 h-4" />}
                    {category === 'tools' && <TestTube className="w-4 h-4" />}
                    {category === 'integration' && <Cpu className="w-4 h-4" />}
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Roadmap */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>12-Month Implementation Roadmap</CardTitle>
            <CardDescription>
              Phased approach to building the complete AI platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Q1: Foundation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Discovery Engine MVP</li>
                    <li>• Requirements Analysis</li>
                    <li>• Basic Prototyping</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Q2: Core Development</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Development Engine</li>
                    <li>• Code Generation</li>
                    <li>• QA Automation</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Q3: Integration</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Deployment Orchestrator</li>
                    <li>• CI/CD Automation</li>
                    <li>• Platform Integration</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Q4: Maintenance</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI Maintenance Platform</li>
                    <li>• External API</li>
                    <li>• Knowledge Base</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformArchitecture;