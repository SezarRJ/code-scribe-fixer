import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  FileText, 
  Brain, 
  Calculator, 
  CheckCircle, 
  Clock,
  Users,
  DollarSign,
  Zap,
  Shield
} from 'lucide-react';

interface Requirement {
  id: string;
  type: 'functional' | 'non-functional' | 'technical';
  priority: 'high' | 'medium' | 'low';
  description: string;
  estimatedHours: number;
  complexity: 'simple' | 'moderate' | 'complex';
}

interface ProjectEstimate {
  totalHours: number;
  complexity: string;
  estimatedCost: number;
  timeline: string;
  teamSize: number;
  techStack: string[];
  risks: string[];
}

const DiscoveryEngine = () => {
  const [activeTab, setActiveTab] = useState('questionnaire');
  const [projectIdea, setProjectIdea] = useState('');
  const [srsDocument, setSrsDocument] = useState('');
  const [questionnaire, setQuestionnaire] = useState({
    projectType: '',
    targetUsers: '',
    mainFeatures: '',
    budget: '',
    timeline: '',
    platform: '',
    integrations: ''
  });
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [estimate, setEstimate] = useState<ProjectEstimate | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const questions = [
    { 
      key: 'projectType', 
      label: 'What type of application do you want to build?',
      placeholder: 'e.g., E-commerce platform, Social media app, Business management system'
    },
    { 
      key: 'targetUsers', 
      label: 'Who are your target users?',
      placeholder: 'e.g., Small business owners, Students, Healthcare professionals'
    },
    { 
      key: 'mainFeatures', 
      label: 'What are the main features you need?',
      placeholder: 'e.g., User authentication, Payment processing, Real-time chat'
    },
    { 
      key: 'budget', 
      label: 'What is your estimated budget range?',
      placeholder: 'e.g., $10k-50k, $50k-100k, $100k+'
    },
    { 
      key: 'timeline', 
      label: 'What is your desired timeline?',
      placeholder: 'e.g., 3 months, 6 months, 1 year'
    },
    { 
      key: 'platform', 
      label: 'Which platforms do you need?',
      placeholder: 'e.g., Web, Mobile (iOS/Android), Desktop'
    },
    { 
      key: 'integrations', 
      label: 'Do you need any third-party integrations?',
      placeholder: 'e.g., Payment gateways, Social media, Analytics, CRM systems'
    }
  ];

  const analyzeIdea = async () => {
    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Simulate AI analysis with progress updates
      const progressSteps = [
        'Parsing project requirements...',
        'Analyzing technical complexity...',
        'Estimating development effort...',
        'Generating architecture recommendations...',
        'Calculating project timeline...',
        'Preparing final recommendations...'
      ];

      for (let i = 0; i < progressSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress((i + 1) * (100 / progressSteps.length));
        
        toast({
          title: "Analysis Progress",
          description: progressSteps[i],
        });
      }

      // Generate mock requirements
      const mockRequirements: Requirement[] = [
        {
          id: '1',
          type: 'functional',
          priority: 'high',
          description: 'User authentication and authorization system',
          estimatedHours: 40,
          complexity: 'moderate'
        },
        {
          id: '2',
          type: 'functional',
          priority: 'high',
          description: 'Core business logic implementation',
          estimatedHours: 80,
          complexity: 'complex'
        },
        {
          id: '3',
          type: 'functional',
          priority: 'medium',
          description: 'Payment processing integration',
          estimatedHours: 30,
          complexity: 'moderate'
        },
        {
          id: '4',
          type: 'non-functional',
          priority: 'high',
          description: 'Security implementation and compliance',
          estimatedHours: 50,
          complexity: 'complex'
        },
        {
          id: '5',
          type: 'technical',
          priority: 'medium',
          description: 'Database design and optimization',
          estimatedHours: 35,
          complexity: 'moderate'
        }
      ];

      // Generate mock estimate
      const mockEstimate: ProjectEstimate = {
        totalHours: 235,
        complexity: 'Moderate to Complex',
        estimatedCost: 47000,
        timeline: '4-6 months',
        teamSize: 4,
        techStack: ['React/Next.js', 'Node.js/Python', 'PostgreSQL', 'AWS/GCP'],
        risks: [
          'Third-party API integration complexity',
          'Scalability requirements may increase development time',
          'Security compliance requirements'
        ]
      };

      setRequirements(mockRequirements);
      setEstimate(mockEstimate);

      toast({
        title: "Analysis Complete",
        description: "Project requirements and estimates have been generated.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQuestionnaireUpdate = (key: string, value: string) => {
    setQuestionnaire(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            AI Discovery Engine
          </CardTitle>
          <CardDescription>
            Transform your ideas into detailed technical requirements and project estimates
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="questionnaire">
            <MessageSquare className="w-4 h-4 mr-2" />
            Questionnaire
          </TabsTrigger>
          <TabsTrigger value="srs">
            <FileText className="w-4 h-4 mr-2" />
            SRS Upload
          </TabsTrigger>
          <TabsTrigger value="requirements">
            <CheckCircle className="w-4 h-4 mr-2" />
            Requirements
          </TabsTrigger>
          <TabsTrigger value="estimate">
            <Calculator className="w-4 h-4 mr-2" />
            Estimates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questionnaire" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Discovery Questionnaire</CardTitle>
              <CardDescription>
                Answer these questions to help our AI understand your project requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Describe your project idea in detail
                </label>
                <Textarea
                  placeholder="Provide a comprehensive description of your project idea, goals, and vision..."
                  value={projectIdea}
                  onChange={(e) => setProjectIdea(e.target.value)}
                  className="h-32"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions.map((question) => (
                  <div key={question.key}>
                    <label className="text-sm font-medium mb-2 block">
                      {question.label}
                    </label>
                    <Textarea
                      placeholder={question.placeholder}
                      value={questionnaire[question.key as keyof typeof questionnaire]}
                      onChange={(e) => handleQuestionnaireUpdate(question.key, e.target.value)}
                      className="h-20"
                    />
                  </div>
                ))}
              </div>

              <Button 
                onClick={analyzeIdea}
                disabled={isAnalyzing || !projectIdea.trim()}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Project...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze Project Requirements
                  </>
                )}
              </Button>

              {isAnalyzing && (
                <div className="space-y-2">
                  <Progress value={progress} />
                  <p className="text-sm text-muted-foreground text-center">
                    AI is analyzing your project... {Math.round(progress)}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="srs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload SRS Document</CardTitle>
              <CardDescription>
                Upload your Software Requirements Specification document for automated analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your SRS document content here, or use the file upload feature below..."
                value={srsDocument}
                onChange={(e) => setSrsDocument(e.target.value)}
                className="h-64"
              />
              
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Upload SRS Document</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your SRS file here, or click to browse
                </p>
                <Button variant="outline">
                  Choose File
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports PDF, DOC, DOCX, TXT files
                </p>
              </div>

              <Button 
                onClick={analyzeIdea}
                disabled={isAnalyzing || (!srsDocument.trim())}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing SRS...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Process SRS Document
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Requirements</CardTitle>
              <CardDescription>
                AI-extracted and structured requirements from your project description
              </CardDescription>
            </CardHeader>
            <CardContent>
              {requirements.length > 0 ? (
                <div className="space-y-4">
                  {requirements.map((req) => (
                    <div key={req.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={req.type === 'functional' ? 'default' : req.type === 'non-functional' ? 'secondary' : 'outline'}>
                            {req.type}
                          </Badge>
                          <Badge variant={req.priority === 'high' ? 'destructive' : req.priority === 'medium' ? 'default' : 'secondary'}>
                            {req.priority} priority
                          </Badge>
                          <Badge variant="outline">
                            {req.complexity}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {req.estimatedHours}h estimated
                        </div>
                      </div>
                      <p className="text-sm">{req.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Requirements Generated</h3>
                  <p className="text-muted-foreground">
                    Complete the questionnaire or upload an SRS document to generate requirements
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estimate" className="space-y-6">
          {estimate ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{estimate.timeline}</div>
                  <p className="text-sm text-muted-foreground">
                    {estimate.totalHours} development hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cost Estimate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    ${estimate.estimatedCost.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {estimate.teamSize} team members
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Complexity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{estimate.complexity}</div>
                  <p className="text-sm text-muted-foreground">
                    Project complexity level
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recommended Technology Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {estimate.techStack.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Project Risks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {estimate.risks.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span className="text-sm">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Estimates Available</h3>
                <p className="text-muted-foreground">
                  Complete the project analysis to generate cost and timeline estimates
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiscoveryEngine;