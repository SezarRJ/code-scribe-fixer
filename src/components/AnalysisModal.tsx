import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Play, 
  Pause, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Code, 
  Zap, 
  Shield,
  Clock,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: File[];
}

interface AnalysisResult {
  file: string;
  language: string;
  progress: number;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
  issues: Issue[];
  metrics: {
    linesOfCode: number;
    complexity: number;
    maintainability: string;
  };
}

interface Issue {
  id: string;
  type: 'syntax' | 'logic' | 'performance' | 'security' | 'style';
  severity: 'high' | 'medium' | 'low';
  message: string;
  line: number;
  column: number;
  suggestion?: string;
}

const AnalysisModal = ({ isOpen, onClose, files }: AnalysisModalProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentFile, setCurrentFile] = useState(0);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const { toast } = useToast();

  const mockIssues: Issue[] = [
    {
      id: '1',
      type: 'security',
      severity: 'high',
      message: 'SQL injection vulnerability detected',
      line: 42,
      column: 15,
      suggestion: 'Use parameterized queries to prevent SQL injection'
    },
    {
      id: '2',
      type: 'performance',
      severity: 'medium',
      message: 'Inefficient loop detected',
      line: 128,
      column: 8,
      suggestion: 'Consider using list comprehension for better performance'
    },
    {
      id: '3',
      type: 'style',
      severity: 'low',
      message: 'Variable name does not follow naming convention',
      line: 67,
      column: 4,
      suggestion: 'Use snake_case for variable names'
    }
  ];

  useEffect(() => {
    if (files.length > 0 && isOpen) {
      initializeAnalysis();
    }
  }, [files, isOpen]);

  const initializeAnalysis = () => {
    const initialResults: AnalysisResult[] = files.map(file => ({
      file: file.name,
      language: detectLanguage(file.name),
      progress: 0,
      status: 'pending',
      issues: [],
      metrics: {
        linesOfCode: Math.floor(Math.random() * 500) + 50,
        complexity: Math.floor(Math.random() * 10) + 1,
        maintainability: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)]
      }
    }));
    setResults(initialResults);
  };

  const detectLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      'py': 'Python',
      'js': 'JavaScript',
      'ts': 'TypeScript',
      'tsx': 'TypeScript React',
      'jsx': 'JavaScript React',
      'cpp': 'C++',
      'c': 'C',
      'java': 'Java',
    };
    return languageMap[ext || ''] || 'Unknown';
  };

  const startAnalysis = async () => {
    setIsRunning(true);
    setCurrentFile(0);
    
    for (let i = 0; i < results.length; i++) {
      setCurrentFile(i);
      
      // Update status to analyzing
      setResults(prev => prev.map((result, index) => 
        index === i ? { ...result, status: 'analyzing' } : result
      ));

      // Simulate analysis progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setResults(prev => prev.map((result, index) => 
          index === i ? { ...result, progress } : result
        ));
      }

      // Complete analysis for this file
      const randomIssues = mockIssues.slice(0, Math.floor(Math.random() * 3) + 1);
      setResults(prev => prev.map((result, index) => 
        index === i ? { 
          ...result, 
          status: 'completed',
          issues: randomIssues.map(issue => ({ ...issue, id: `${i}-${issue.id}` }))
        } : result
      ));

      setOverallProgress((i + 1) / results.length * 100);
    }

    setIsRunning(false);
    toast({
      title: "Analysis Complete",
      description: `Found ${results.reduce((sum, r) => sum + r.issues.length, 0)} issues across ${results.length} files`,
    });
  };

  const pauseAnalysis = () => {
    setIsRunning(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="h-4 w-4" />;
      case 'performance': return <TrendingUp className="h-4 w-4" />;
      case 'syntax': return <Code className="h-4 w-4" />;
      case 'logic': return <Zap className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const totalIssues = results.reduce((sum, result) => sum + result.issues.length, 0);
  const completedFiles = results.filter(r => r.status === 'completed').length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Code Analysis</DialogTitle>
          <DialogDescription>
            AI-powered analysis results for your uploaded files
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Analysis Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={isRunning ? pauseAnalysis : startAnalysis}
                disabled={results.length === 0}
                className="bg-primary hover:bg-primary/90"
              >
                {isRunning ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause Analysis
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Analysis
                  </>
                )}
              </Button>
              
              <div className="text-sm text-muted-foreground">
                {completedFiles}/{results.length} files analyzed
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="font-semibold">{totalIssues}</span> issues found
              </div>
              <Progress value={overallProgress} className="w-32" />
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.length}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Issues Found</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-warning">{totalIssues}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Avg Complexity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {results.length > 0 ? 
                        (results.reduce((sum, r) => sum + r.metrics.complexity, 0) / results.length).toFixed(1) 
                        : '0'
                      }
                    </div>
                  </CardContent>
                </Card>
              </div>

              {isRunning && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Currently Analyzing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Code className="h-6 w-6 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">{results[currentFile]?.file}</div>
                        <div className="text-sm text-muted-foreground">{results[currentFile]?.language}</div>
                        <Progress value={results[currentFile]?.progress || 0} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="files" className="space-y-4">
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Code className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">{result.file}</div>
                              <div className="text-sm text-muted-foreground">{result.language}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline">{result.issues.length} issues</Badge>
                            <Badge variant="outline">{result.metrics.complexity} complexity</Badge>
                            {result.status === 'completed' && <CheckCircle className="h-5 w-5 text-success" />}
                            {result.status === 'analyzing' && <Clock className="h-5 w-5 text-warning animate-spin" />}
                          </div>
                        </div>
                        {result.status === 'analyzing' && (
                          <Progress value={result.progress} className="mt-3" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {results.flatMap(result => 
                    result.issues.map(issue => (
                      <Card key={issue.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              {getTypeIcon(issue.type)}
                              <div className="flex-1">
                                <div className="font-medium">{issue.message}</div>
                                <div className="text-sm text-muted-foreground">
                                  {result.file} • Line {issue.line}:{issue.column}
                                </div>
                                {issue.suggestion && (
                                  <div className="mt-2 p-2 bg-muted rounded text-sm">
                                    <strong>Suggestion:</strong> {issue.suggestion}
                                  </div>
                                )}
                              </div>
                            </div>
                            <Badge variant={getSeverityColor(issue.severity) as any}>
                              {issue.severity}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button disabled={totalIssues === 0}>
              Apply Suggested Fixes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisModal;