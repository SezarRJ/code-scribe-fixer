import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Send, Key, FileText, Zap, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ApiIntegration = () => {
  const [analysisData, setAnalysisData] = useState({
    language: "",
    code: "",
    filename: ""
  });
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeCode = async () => {
    if (!analysisData.code.trim() || !analysisData.language) {
      toast({
        title: "Invalid Input",
        description: "Please provide code content and select a language",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error('Authentication required');
      }

      const response = await fetch('/functions/v1/code-analysis-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session.access_token}`
        },
        body: JSON.stringify({
          code: analysisData.code,
          language: analysisData.language,
          filename: analysisData.filename || `file.${getFileExtension(analysisData.language)}`
        })
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);

      toast({
        title: "Analysis Complete",
        description: `Found ${result.issues?.length || 0} issues in your code`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getFileExtension = (language: string) => {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      go: 'go',
      rust: 'rs'
    };
    return extensions[language] || 'txt';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Code copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            API Integration
          </CardTitle>
          <CardDescription>
            Integrate code analysis directly into your development workflow without file uploads
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="analyze" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analyze">Code Analysis</TabsTrigger>
          <TabsTrigger value="documentation">API Documentation</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Submit Code for Analysis</CardTitle>
                <CardDescription>
                  Paste your code below and get instant analysis results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Programming Language</Label>
                  <Select value={analysisData.language} onValueChange={(value) => 
                    setAnalysisData(prev => ({ ...prev, language: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filename">Filename (Optional)</Label>
                  <Input
                    id="filename"
                    placeholder="e.g., main.py, utils.js"
                    value={analysisData.filename}
                    onChange={(e) => setAnalysisData(prev => ({ ...prev, filename: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Code Content</Label>
                  <Textarea
                    id="code"
                    placeholder="Paste your code here..."
                    className="min-h-[300px] font-mono text-sm"
                    value={analysisData.code}
                    onChange={(e) => setAnalysisData(prev => ({ ...prev, code: e.target.value }))}
                  />
                </div>

                <Button 
                  onClick={handleAnalyzeCode} 
                  disabled={loading}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? 'Analyzing...' : 'Analyze Code'}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Results</CardTitle>
                <CardDescription>
                  Issues found and suggested fixes for your code
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!analysisResult ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Zap className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Submit code to see analysis results</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded">
                        <div className="text-2xl font-bold">{analysisResult.issues?.length || 0}</div>
                        <div className="text-sm text-muted-foreground">Issues Found</div>
                      </div>
                      <div className="text-center p-3 bg-success/10 rounded">
                        <div className="text-2xl font-bold text-success">
                          {analysisResult.fixes?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Fixes Available</div>
                      </div>
                    </div>

                    {/* Issues List */}
                    <div className="space-y-3">
                      {analysisResult.issues?.map((issue: any, index: number) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={issue.severity === 'high' ? 'destructive' : 
                                           issue.severity === 'medium' ? 'secondary' : 'outline'}>
                                {issue.severity}
                              </Badge>
                              <span className="text-sm font-medium">{issue.type}</span>
                            </div>
                            {issue.line && (
                              <Badge variant="outline" className="text-xs">
                                Line {issue.line}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">{issue.message}</p>
                          
                          {issue.suggestion && (
                            <div className="bg-success/10 p-2 rounded text-sm">
                              <strong>Suggested Fix:</strong> {issue.suggestion}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {analysisResult.batchId && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-2">
                          Analysis ID: <code className="bg-muted px-1 rounded">{analysisResult.batchId}</code>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Use this ID to reference this analysis in future API calls
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>
                Integration endpoints for your development tools and CI/CD pipelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Code Analysis Endpoint */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge>POST</Badge>
                  <code className="bg-muted px-2 py-1 rounded text-sm">/functions/v1/code-analysis-api</code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard('/functions/v1/code-analysis-api')}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Submit code for analysis without file upload</p>
                
                <div className="space-y-2">
                  <Label>Request Body:</Label>
                  <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`{
  "code": "string",      // The code content to analyze
  "language": "string",  // Programming language (javascript, python, etc.)
  "filename": "string"   // Optional filename for context
}`}
                  </pre>
                </div>

                <div className="space-y-2">
                  <Label>Response:</Label>
                  <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`{
  "batchId": "string",
  "issues": [
    {
      "type": "string",
      "message": "string",
      "severity": "high|medium|low",
      "line": number,
      "suggestion": "string"
    }
  ],
  "fixes": [...],
  "language": "string",
  "filename": "string"
}`}
                  </pre>
                </div>
              </div>

              {/* Download Endpoint */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="bg-muted px-2 py-1 rounded text-sm">/functions/v1/download-files</code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard('/functions/v1/download-files')}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Download fixed files and reports</p>
                
                <div className="space-y-2">
                  <Label>Query Parameters:</Label>
                  <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`batchId: string     // Required: Analysis batch ID
type: string        // Required: "single", "bulk", or "report"
fileName: string    // Required for single file downloads`}
                  </pre>
                </div>
              </div>

              {/* Authentication */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Authentication
                </h4>
                <p className="text-sm text-muted-foreground">
                  All API calls require authentication using Bearer token in the Authorization header.
                </p>
                <pre className="bg-muted p-3 rounded text-xs">
                  Authorization: Bearer YOUR_ACCESS_TOKEN
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <div className="grid gap-6">
            {/* cURL Example */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">cURL Example</CardTitle>
                <CardDescription>Command-line integration example</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`curl -X POST "https://your-project.supabase.co/functions/v1/code-analysis-api" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "code": "def vulnerable_function(user_input):\\n    return eval(user_input)",
    "language": "python",
    "filename": "security_check.py"
  }'`}
                </pre>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => copyToClipboard(`curl -X POST "https://your-project.supabase.co/functions/v1/code-analysis-api" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "code": "def vulnerable_function(user_input):\\n    return eval(user_input)",
    "language": "python",
    "filename": "security_check.py"
  }'`)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </CardContent>
            </Card>

            {/* Python Example */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Python Example</CardTitle>
                <CardDescription>Python requests library integration</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`import requests
import json

def analyze_code(code, language, filename=None):
    url = "https://your-project.supabase.co/functions/v1/code-analysis-api"
    headers = {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json"
    }
    payload = {
        "code": code,
        "language": language,
        "filename": filename
    }
    
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

# Example usage
code_to_analyze = """
def insecure_function(user_input):
    return eval(user_input)  # Security vulnerability
"""

result = analyze_code(code_to_analyze, "python", "test.py")
print(f"Found {len(result['issues'])} issues")
for issue in result['issues']:
    print(f"- {issue['type']}: {issue['message']}")
`}
                </pre>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => copyToClipboard(`import requests
import json

def analyze_code(code, language, filename=None):
    url = "https://your-project.supabase.co/functions/v1/code-analysis-api"
    headers = {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json"
    }
    payload = {
        "code": code,
        "language": language,
        "filename": filename
    }
    
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

# Example usage
code_to_analyze = """
def insecure_function(user_input):
    return eval(user_input)  # Security vulnerability
"""

result = analyze_code(code_to_analyze, "python", "test.py")
print(f"Found {len(result['issues'])} issues")
for issue in result['issues']:
    print(f"- {issue['type']}: {issue['message']}")
`)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </CardContent>
            </Card>

            {/* JavaScript Example */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">JavaScript Example</CardTitle>
                <CardDescription>Node.js fetch API integration</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`async function analyzeCode(code, language, filename) {
  const response = await fetch('https://your-project.supabase.co/functions/v1/code-analysis-api', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code,
      language,
      filename
    })
  });
  
  if (!response.ok) {
    throw new Error('Analysis failed');
  }
  
  return await response.json();
}

// Example usage
const codeToAnalyze = \`
function vulnerableFunction(userInput) {
  return eval(userInput); // Security issue
}
\`;

analyzeCode(codeToAnalyze, 'javascript', 'security.js')
  .then(result => {
    console.log(\`Found \${result.issues.length} issues\`);
    result.issues.forEach(issue => {
      console.log(\`- \${issue.type}: \${issue.message}\`);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
`}
                </pre>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => copyToClipboard(`async function analyzeCode(code, language, filename) {
  const response = await fetch('https://your-project.supabase.co/functions/v1/code-analysis-api', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code,
      language,
      filename
    })
  });
  
  if (!response.ok) {
    throw new Error('Analysis failed');
  }
  
  return await response.json();
}

// Example usage
const codeToAnalyze = \`
function vulnerableFunction(userInput) {
  return eval(userInput); // Security issue
}
\`;

analyzeCode(codeToAnalyze, 'javascript', 'security.js')
  .then(result => {
    console.log(\`Found \${result.issues.length} issues\`);
    result.issues.forEach(issue => {
      console.log(\`- \${issue.type}: \${issue.message}\`);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
`)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiIntegration;