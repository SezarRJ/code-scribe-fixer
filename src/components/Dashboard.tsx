import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Clock, Code, FileText, Search, Upload, Zap } from "lucide-react";

const Dashboard = () => {
  const analysisResults = [
    { id: 1, file: "auth.py", language: "Python", issues: 3, status: "completed", severity: "medium" },
    { id: 2, file: "utils.js", language: "JavaScript", issues: 1, status: "completed", severity: "low" },
    { id: 3, file: "main.cpp", language: "C++", issues: 5, status: "analyzing", severity: "high" },
  ];

  const recentFixes = [
    { id: 1, issue: "SQL Injection vulnerability", file: "database.py", applied: true },
    { id: 2, issue: "Unused variable", file: "helpers.js", applied: false },
    { id: 3, issue: "Memory leak potential", file: "allocator.cpp", applied: true },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Code Analysis Platform</h1>
            <p className="text-muted-foreground">Intelligent code maintenance and error detection</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" />
            Upload Code
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Files Analyzed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues Detected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">-8% from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fixes Applied</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">289</div>
              <p className="text-xs text-muted-foreground">+24% improvement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Analysis Time</CardTitle>
              <Clock className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-xs text-muted-foreground">Average per file</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analysis" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
            <TabsTrigger value="fixes">Recent Fixes</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Analysis</CardTitle>
                <CardDescription>Latest code analysis results and detected issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Code className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-semibold">{result.file}</h4>
                          <p className="text-sm text-muted-foreground">{result.language}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={result.severity === "high" ? "destructive" : result.severity === "medium" ? "secondary" : "outline"}>
                          {result.issues} issues
                        </Badge>
                        <Badge variant={result.status === "completed" ? "default" : "secondary"}>
                          {result.status}
                        </Badge>
                        {result.status === "analyzing" && (
                          <Progress value={65} className="w-20" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fixes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Fixes</CardTitle>
                <CardDescription>AI-generated fixes ready for review and application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFixes.map((fix) => (
                    <div key={fix.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Zap className="h-8 w-8 text-warning" />
                        <div>
                          <h4 className="font-semibold">{fix.issue}</h4>
                          <p className="text-sm text-muted-foreground">{fix.file}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={fix.applied ? "default" : "outline"}>
                          {fix.applied ? "Applied" : "Pending"}
                        </Badge>
                        {!fix.applied && (
                          <Button size="sm" variant="outline">Review</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="knowledge" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Search through historical issues and solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm placeholder:text-muted-foreground"
                      placeholder="Search for issues, languages, or solutions..."
                    />
                  </div>
                  <Button>Search</Button>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Search the knowledge base to find similar issues and proven solutions</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;