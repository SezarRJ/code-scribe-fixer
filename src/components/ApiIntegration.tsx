import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Key, Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ApiKey {
  id: string;
  api_name: string;
  api_key: string;
  is_active: boolean;
  usage_count: number;
  created_at: string;
}

export const ApiIntegration = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newApiName, setNewApiName] = useState('');
  const [testCode, setTestCode] = useState('');
  const [testLanguage, setTestLanguage] = useState('javascript');
  const [testResult, setTestResult] = useState<any>(null);

  const generateApiKey = async () => {
    if (!newApiName.trim()) {
      toast({
        title: "Error",
        description: "Please provide an API name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const apiKey = `tk_${crypto.randomUUID().replace(/-/g, '')}`;
      
      const { error } = await supabase
        .from('api_integrations')
        .insert({
          api_name: newApiName,
          api_key: apiKey,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "API Key Generated",
        description: "New API key has been created successfully",
      });

      setNewApiName('');
      loadApiKeys();
    } catch (error) {
      console.error('Error generating API key:', error);
      toast({
        title: "Error",
        description: "Failed to generate API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error loading API keys:', error);
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_integrations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "API Key Deleted",
        description: "API key has been removed",
      });

      loadApiKeys();
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast({
        title: "Error",
        description: "Failed to delete API key",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    });
  };

  const testApiCall = async () => {
    if (!testCode.trim()) {
      toast({
        title: "Error",
        description: "Please provide code to test",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('code-analysis-api', {
        body: {
          code: testCode,
          language: testLanguage,
          fileName: 'test-file'
        }
      });

      if (error) throw error;

      setTestResult(data);
      toast({
        title: "Test Successful",
        description: "API call completed successfully",
      });
    } catch (error) {
      console.error('Error testing API:', error);
      toast({
        title: "Test Failed",
        description: "API test failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={loadApiKeys}>
          <Key className="h-4 w-4 mr-2" />
          API Integration
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>API Integration</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* API Key Management */}
          <Card>
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
              <CardDescription>
                Generate and manage API keys for external integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="api-name">API Name</Label>
                  <Input
                    id="api-name"
                    placeholder="e.g., Production API, Development"
                    value={newApiName}
                    onChange={(e) => setNewApiName(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={generateApiKey} disabled={isLoading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Key
                  </Button>
                </div>
              </div>

              {apiKeys.length > 0 && (
                <div className="space-y-2">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{key.api_name}</span>
                          <Badge variant={key.is_active ? "default" : "secondary"}>
                            {key.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 font-mono mt-1">
                          {key.api_key.substring(0, 20)}...
                        </div>
                        <div className="text-xs text-gray-400">
                          Used {key.usage_count} times
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(key.api_key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteApiKey(key.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                How to integrate with the Code Analysis API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Endpoint:</p>
                <code className="text-sm bg-white p-2 rounded border block">
                  POST {supabase.supabaseUrl}/functions/v1/code-analysis-api
                </code>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Headers:</p>
                <pre className="text-sm bg-white p-2 rounded border">
{`Content-Type: application/json
x-api-key: YOUR_API_KEY`}
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Request Body:</p>
                <pre className="text-sm bg-white p-2 rounded border overflow-x-auto">
{`{
  "code": "function example() { var x = 5; }",
  "language": "javascript",
  "fileName": "example.js"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* API Test */}
          <Card>
            <CardHeader>
              <CardTitle>Test API</CardTitle>
              <CardDescription>
                Test the API with sample code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="test-language">Language</Label>
                  <select
                    id="test-language"
                    className="w-full p-2 border rounded"
                    value={testLanguage}
                    onChange={(e) => setTestLanguage(e.target.value)}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="test-code">Test Code</Label>
                <Textarea
                  id="test-code"
                  placeholder="Enter code to analyze..."
                  value={testCode}
                  onChange={(e) => setTestCode(e.target.value)}
                  rows={8}
                />
              </div>

              <Button onClick={testApiCall} disabled={isLoading}>
                Test API Call
              </Button>

              {testResult && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">Test Result:</p>
                  <pre className="text-sm bg-white p-2 rounded border max-h-60 overflow-y-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};