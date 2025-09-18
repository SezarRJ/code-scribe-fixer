import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Search, Book, Code, AlertTriangle, CheckCircle, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface KnowledgeEntry {
  id: string;
  issue_type: string;
  issue_pattern: string;
  solution_pattern: string;
  language: string;
  severity: string;
  success_count?: number;
  usage_count?: number;
  success_rate?: number;
  created_at: string;
  description?: string;
}

const KnowledgeBase = () => {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<KnowledgeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  const languages = ["all", "javascript", "python", "typescript", "java", "cpp", "go", "rust"];
  const severities = ["all", "high", "medium", "low"];

  useEffect(() => {
    fetchKnowledgeBase();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [entries, searchQuery, selectedLanguage, selectedSeverity]);

  const fetchKnowledgeBase = async () => {
    try {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('*')
        .order('success_count', { ascending: false });

      if (error) throw error;

      const formattedEntries = data?.map(entry => ({
        ...entry,
        success_count: entry.usage_count || 0
      })) || [];
      setEntries(formattedEntries);
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
      toast({
        title: "Error",
        description: "Failed to load knowledge base",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterEntries = () => {
    let filtered = entries;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entry =>
        entry.issue_type.toLowerCase().includes(query) ||
        entry.issue_pattern.toLowerCase().includes(query) ||
        entry.solution_pattern.toLowerCase().includes(query) ||
        (entry.description && entry.description.toLowerCase().includes(query))
      );
    }

    // Language filter
    if (selectedLanguage !== "all") {
      filtered = filtered.filter(entry => 
        entry.language.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    // Severity filter
    if (selectedSeverity !== "all") {
      filtered = filtered.filter(entry => 
        entry.severity.toLowerCase() === selectedSeverity.toLowerCase()
      );
    }

    setFilteredEntries(filtered);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return <AlertTriangle className="h-3 w-3" />;
      case 'medium': return <AlertTriangle className="h-3 w-3" />;
      case 'low': return <CheckCircle className="h-3 w-3" />;
      default: return <AlertTriangle className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading knowledge base...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Knowledge Base
          </CardTitle>
          <CardDescription>
            Search through historical code issues, solutions, and proven fixes from your analysis sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues, patterns, or solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={filterEntries}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang} value={lang}>
                        {lang === "all" ? "All Languages" : lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  {severities.map(severity => (
                    <SelectItem key={severity} value={severity}>
                      {severity === "all" ? "All Severities" : severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                {entries.length === 0 ? (
                  <>
                    <Book className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>No knowledge base entries found. Start analyzing code to build your knowledge base.</p>
                  </>
                ) : (
                  <>
                    <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>No entries match your current search and filters.</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found {filteredEntries.length} knowledge base {filteredEntries.length === 1 ? 'entry' : 'entries'}
              </p>
            </div>

            {filteredEntries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        {entry.issue_type}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{entry.language}</Badge>
                        <Badge variant={getSeverityColor(entry.severity)}>
                          {getSeverityIcon(entry.severity)}
                          <span className="ml-1">{entry.severity}</span>
                        </Badge>
                        <Badge variant="secondary">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {entry.success_count || 0} successful fixes
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {entry.description && (
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">{entry.description}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold mb-2">Issue Pattern</h4>
                      <div className="bg-muted p-3 rounded-md">
                        <code className="text-sm font-mono">{entry.issue_pattern}</code>
                      </div>
                    </div>

                    {entry.solution_pattern && (
                      <div>
                        <h4 className="font-semibold mb-2">Solution Pattern</h4>
                        <div className="bg-success/10 p-3 rounded-md border border-success/20">
                          <code className="text-sm font-mono">{entry.solution_pattern}</code>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;