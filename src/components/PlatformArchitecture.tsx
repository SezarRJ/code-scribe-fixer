import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare,
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
  Zap,
  Users,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface Phase {
  id: number;
  title: string;
  description: string;
  duration: string;
  features: string[];
  deliverables: string[];
  workflow: string;
  status: 'active' | 'pending';
}

const PlatformArchitecture = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  const phases: Phase[] = [
    {
      id: 1,
      title: "AI-Powered Project Initiation",
      description: "Conversational requirements discovery through AI chatbot interface",
      duration: "1-3 days",
      features: [
        "Natural language project description",
        "Upload existing SRS documents", 
        "AI-guided clarifying questions",
        "Automated SRS generation",
        "Transparent cost estimation",
        "15% deposit processing"
      ],
      deliverables: ["Comprehensive SRS Document", "Project Plan", "Cost Estimate", "Payment Processing"],
      workflow: "Idea → Conversation → Requirements → Proposal → Approval & Deposit",
      status: "active"
    },
    {
      id: 2,
      title: "Automated Build & Deployment", 
      description: "AI generates prototype, code, and deploys to staging environment",
      duration: "1-6 weeks",
      features: [
        "Interactive prototype generation",
        "Conversational feedback integration",
        "Production-ready code generation",
        "Automated testing suite",
        "Staging environment deployment",
        "User Acceptance Testing (UAT)"
      ],
      deliverables: ["Interactive Prototype", "Source Code", "Staging Deployment", "Test Reports"],
      workflow: "Prototype → Feedback → Code Generation → Testing → Staging → UAT → Production",
      status: "pending"
    },
    {
      id: 3,
      title: "Continuous AI Maintenance",
      description: "Proactive monitoring and autonomous application maintenance",
      duration: "Ongoing",
      features: [
        "Real-time security monitoring",
        "Performance bottleneck detection", 
        "Automated patch application",
        "Library and dependency updates",
        "Code refactoring and optimization",
        "Technical debt prevention"
      ],
      deliverables: ["Maintenance Dashboard", "Security Reports", "Performance Metrics", "Update Logs"],
      workflow: "Monitor → Detect → Fix → Log → Notify → Optimize",
      status: "pending"
    }
  ];

  const aiFactoryWorkflow = {
    chatbotInterface: {
      title: "Conversational Dashboard",
      description: "Primary interface for all user interactions",
      features: [
        "Natural language project initiation",
        "AI-guided requirements discovery", 
        "Real-time prototype feedback",
        "Maintenance notifications",
        "Status updates and approvals"
      ]
    },
    threePhaseJourney: {
      title: "Complete Development Lifecycle",
      phases: [
        {
          name: "Project Initiation",
          description: "From idea to detailed specification",
          chatbotRole: "Requirements analyst and project consultant"
        },
        {
          name: "Build & Deploy", 
          description: "Automated development and staging",
          chatbotRole: "Development manager and QA coordinator"
        },
        {
          name: "Maintenance",
          description: "Continuous optimization and monitoring", 
          chatbotRole: "DevOps engineer and maintenance supervisor"
        }
      ]
    }
  };

  const maintenanceFeatures = [
    {
      category: "Code Ingestion",
      items: ["File uploads via chat", "Repository connections", "Drag & drop interface", "API integrations"]
    },
    {
      category: "Language Detection & Analysis",
      items: ["Dependency graph mapping", "Multi-layered scanning (AI + static tools)", "Sandbox profiling"]
    },
    {
      category: "Structured Diagnostics",
      items: ["Severity classification", "Confidence scoring", "Issue categorization", "Priority ranking"]
    },
    {
      category: "Automated Fix Suggestions",
      items: ["AI-generated solutions", "Sandbox validation", "Safe deployment", "Rollback capabilities"]
    },
    {
      category: "Knowledge Base (Versioned & Queryable)",
      items: ["Pattern learning", "Fix history", "Success rate tracking", "Community contributions"]
    },
    {
      category: "API Endpoints",
      items: ["/upload", "/analysis", "/fix", "/kb", "/metrics", "/chat", "/projects"]
    },
    {
      category: "Dashboard (Reports, Metrics, Exports)",
      items: ["Real-time monitoring", "Performance analytics", "Export capabilities", "Custom reports"]
    }
  ];

  const techStack = {
    backend: ['Python (FastAPI)', 'Django', 'PostgreSQL', 'MongoDB', 'ElasticSearch'],
    frontend: ['Next.js', 'Vue.js', 'React Native', 'Flutter'],
    ai: ['GPT-5', 'Claude', 'StarCoder', 'Code Llama'],
    devops: ['Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI'],
    tools: ['PyLint', 'ESLint', 'FindBugs', 'PVS-Studio'],
    integration: ['Stripe API', 'PayPal API', 'Figma API', 'OAuth2']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            AI Factory Platform Architecture
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chatbot-first development platform with three-phase journey from idea to continuous maintenance
          </p>
        </div>

        {/* AI Factory Workflow Overview */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                AI Factory Workflow: Chatbot-First Development
              </CardTitle>
              <CardDescription className="text-center">
                The complete development journey managed through conversational AI interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {aiFactoryWorkflow.threePhaseJourney.phases.map((phase, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        {phase.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{phase.description}</p>
                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-primary">Chatbot Role:</p>
                        <p className="text-sm">{phase.chatbotRole}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Development Phases */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8">Detailed Phase Breakdown</h2>
          <div className="space-y-6">
            {phases.map((phase, index) => (
              <Card key={phase.id} className={phase.status === 'active' ? 'ring-2 ring-primary' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        phase.status === 'active' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {phase.id}
                      </div>
                      {phase.title}
                    </CardTitle>
                    <Badge variant={phase.status === 'active' ? 'default' : 'secondary'}>
                      {phase.duration}
                    </Badge>
                  </div>
                  <CardDescription>{phase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Workflow</h4>
                      <p className="text-sm bg-secondary/50 p-2 rounded">{phase.workflow}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Key Features</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {phase.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Deliverables</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((deliverable) => (
                          <Badge key={deliverable} variant="outline">{deliverable}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Maintenance Component Details */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-6 h-6" />
              AI Maintenance Component (Standalone & Integrated)
            </CardTitle>
            <CardDescription>
              Comprehensive AI-powered maintenance platform with dual deployment options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {maintenanceFeatures.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    {feature.category === 'Code Ingestion' && <FileText className="w-4 h-4" />}
                    {feature.category === 'Language Detection & Analysis' && <Code className="w-4 h-4" />}
                    {feature.category === 'Structured Diagnostics' && <TestTube className="w-4 h-4" />}
                    {feature.category === 'Automated Fix Suggestions' && <Zap className="w-4 h-4" />}
                    {feature.category === 'Knowledge Base (Versioned & Queryable)' && <Database className="w-4 h-4" />}
                    {feature.category === 'API Endpoints' && <Cpu className="w-4 h-4" />}
                    {feature.category === 'Dashboard (Reports, Metrics, Exports)' && <Shield className="w-4 h-4" />}
                    {feature.category}
                  </h4>
                  <div className="space-y-1">
                    {feature.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm p-2 bg-muted/30 rounded">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack Overview */}
        <Card className="mb-12">
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
        <Card>
          <CardHeader>
            <CardTitle>12-Month Implementation Roadmap</CardTitle>
            <CardDescription>
              Phased approach to building the complete AI Factory platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">Q1</div>
                    Foundation
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Conversational Discovery Engine</li>
                    <li>• Requirements Analysis AI</li>
                    <li>• Basic SRS Generation</li>
                    <li>• Cost Estimation Models</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">Q2</div>
                    Core Development
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prototype Generation Engine</li>
                    <li>• Code Generation AI</li>
                    <li>• Automated Testing Suite</li>
                    <li>• Feedback Integration</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">Q3</div>
                    Integration & Deployment
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Deployment Orchestrator</li>
                    <li>• CI/CD Automation</li>
                    <li>• Payment Integration</li>
                    <li>• User Management System</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">Q4</div>
                    AI Maintenance Platform
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Continuous Monitoring</li>
                    <li>• Autonomous Fix Application</li>
                    <li>• External API Service</li>
                    <li>• Knowledge Base System</li>
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