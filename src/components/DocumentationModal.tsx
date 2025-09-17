import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Code, 
  Cpu, 
  Search, 
  Zap, 
  Shield, 
  TrendingUp, 
  FileText,
  Settings,
  Cloud,
  Database
} from "lucide-react";

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentationModal = ({ isOpen, onClose }: DocumentationModalProps) => {
  const features = [
    {
      icon: <Code className="h-5 w-5" />,
      title: "Multi-Language Support",
      description: "Supports Python, JavaScript, TypeScript, C++, Java, Go, Rust, and more",
      languages: ["Python", "JavaScript", "TypeScript", "C++", "Java", "Go", "Rust", "PHP", "Ruby"]
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "AI-Powered Analysis",
      description: "Integration with GPT-5 and StarCoder for intelligent code analysis",
      models: ["GPT-5", "StarCoder", "Code Llama", "Claude"]
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Static Analysis Tools",
      description: "Deterministic checks using industry-standard tools",
      tools: ["PyLint", "ESLint", "FindBugs", "PVS-Studio", "SonarQube"]
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Automated Fix Suggestions",
      description: "AI-generated fixes with sandbox testing for safety",
      capabilities: ["Syntax Fixes", "Logic Improvements", "Performance Optimizations", "Security Patches"]
    }
  ];

  const analysisTypes = [
    {
      icon: <Code className="h-5 w-5 text-info" />,
      title: "Syntax Analysis",
      description: "Detects syntax errors, missing semicolons, bracket mismatches",
      severity: "High"
    },
    {
      icon: <Shield className="h-5 w-5 text-destructive" />,
      title: "Security Scanning",
      description: "Identifies SQL injection, XSS, buffer overflows, and other vulnerabilities",
      severity: "Critical"
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-warning" />,
      title: "Performance Analysis",
      description: "Finds inefficient algorithms, memory leaks, and optimization opportunities",
      severity: "Medium"
    },
    {
      icon: <Zap className="h-5 w-5 text-success" />,
      title: "Logic Review",
      description: "Detects unreachable code, infinite loops, and logical inconsistencies",
      severity: "Medium"
    }
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/upload",
      description: "Upload code files for analysis",
      params: ["files", "language", "options"]
    },
    {
      method: "GET",
      endpoint: "/api/analysis/{id}",
      description: "Get analysis results by ID",
      params: ["id", "format"]
    },
    {
      method: "POST",
      endpoint: "/api/fix/apply",
      description: "Apply suggested fixes",
      params: ["analysisId", "fixIds", "dryRun"]
    },
    {
      method: "GET",
      endpoint: "/api/knowledge/search",
      description: "Search knowledge base",
      params: ["query", "language", "type"]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Book className="h-6 w-6" />
            <span>Platform Documentation</span>
          </DialogTitle>
          <DialogDescription>
            Comprehensive guide to the AI Code Analysis Platform
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="analysis">Analysis Types</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="getting-started">Quick Start</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Code Analysis Platform</CardTitle>
                <CardDescription>
                  An intelligent code maintenance platform that combines AI models with static analysis tools
                  to detect issues, suggest fixes, and improve code quality across multiple programming languages.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Benefits</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Automated detection of syntax, logic, performance, and security issues</li>
                    <li>AI-powered fix suggestions with explanation and rationale</li>
                    <li>Multi-language support with language-specific analysis rules</li>
                    <li>Sandbox testing environment for safe fix validation</li>
                    <li>Knowledge base of common issues and proven solutions</li>
                    <li>RESTful API for integration with existing development workflows</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Architecture Overview</h4>
                  <p className="text-sm text-muted-foreground">
                    The platform consists of modular Python backend components including input parsing, 
                    analyzer engine, fix suggestion system, knowledge base, API layer, and monitoring. 
                    The frontend dashboard provides an intuitive interface for developers to upload code, 
                    view analysis results, and manage fixes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {feature.icon}
                      <span>{feature.title}</span>
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {'languages' in feature && feature.languages.map(lang => (
                        <Badge key={lang} variant="outline">{lang}</Badge>
                      ))}
                      {'models' in feature && feature.models.map(model => (
                        <Badge key={model} variant="outline">{model}</Badge>
                      ))}
                      {'tools' in feature && feature.tools.map(tool => (
                        <Badge key={tool} variant="outline">{tool}</Badge>
                      ))}
                      {'capabilities' in feature && feature.capabilities.map(cap => (
                        <Badge key={cap} variant="outline">{cap}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {analysisTypes.map((type, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {type.icon}
                        <span>{type.title}</span>
                      </div>
                      <Badge variant={
                        type.severity === 'Critical' ? 'destructive' :
                        type.severity === 'High' ? 'destructive' :
                        type.severity === 'Medium' ? 'secondary' : 'outline'
                      }>
                        {type.severity}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>
                  RESTful API for integrating with the code analysis platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{endpoint.method}</Badge>
                          <code className="text-sm bg-muted px-2 py-1 rounded">{endpoint.endpoint}</code>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                        <div>
                          <span className="text-sm font-medium">Parameters: </span>
                          {endpoint.params.map(param => (
                            <Badge key={param} variant="outline" className="mr-1">{param}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="getting-started" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start Guide</CardTitle>
                <CardDescription>
                  Get started with the AI Code Analysis Platform in minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    <span>Upload Your Code</span>
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Use the upload button to select your code files. Supports individual files or entire repositories.
                    The platform automatically detects programming languages and prepares files for analysis.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    <span>Start Analysis</span>
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Click "Start Analysis" to begin the AI-powered code review. The system will run multiple 
                    analysis types including syntax, security, performance, and logic checks.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    <span>Review Results</span>
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Examine detected issues categorized by type and severity. Each issue includes detailed 
                    descriptions, affected code locations, and AI-generated fix suggestions.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    <span>Apply Fixes</span>
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Review and apply suggested fixes. All fixes are tested in a secure sandbox environment 
                    before application to ensure they don't introduce new issues.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close Documentation</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationModal;