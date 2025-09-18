import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Download, FileText, Package, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FixBatch {
  id: string;
  batchId: string;
  totalFiles: number;
  totalIssues: number;
  totalFixesApplied: number;
  createdAt: string;
  files: Array<{
    fileName: string;
    fixesApplied: number;
  }>;
}

const DownloadCenter = () => {
  const [fixBatches, setFixBatches] = useState<FixBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetchFixBatches();
  }, []);

  const fetchFixBatches = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast({
          title: "Authentication required",
          description: "Please log in to view your fixes",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('fix_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedBatches: FixBatch[] = data?.map(report => ({
        id: report.id,
        batchId: report.batch_id,
        totalFiles: report.total_files,
        totalIssues: report.total_issues,
        totalFixesApplied: report.total_fixes_applied,
        createdAt: report.created_at,
        files: Array.isArray(report.report_data) ? [] : (report.report_data as any)?.files || []
      })) || [];

      setFixBatches(formattedBatches);
    } catch (error) {
      console.error('Error fetching fix batches:', error);
      toast({
        title: "Error",
        description: "Failed to load fix reports",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (batchId: string, fileName: string) => {
    try {
      setDownloading(`${batchId}-${fileName}`);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('Not authenticated');

      const response = await fetch(`/functions/v1/download-files?batchId=${batchId}&type=single&fileName=${fileName}`, {
        headers: {
          'Authorization': `Bearer ${session.session.access_token}`
        }
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Success",
        description: `Downloaded ${fileName}`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive"
      });
    } finally {
      setDownloading(null);
    }
  };

  const downloadBulk = async (batchId: string) => {
    try {
      setDownloading(batchId);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('Not authenticated');

      const response = await fetch(`/functions/v1/download-files?batchId=${batchId}&type=bulk`, {
        headers: {
          'Authorization': `Bearer ${session.session.access_token}`
        }
      });

      if (!response.ok) throw new Error('Download failed');

      const data = await response.json();
      
      // Download each file from the signed URLs
      for (const file of data.files) {
        const fileResponse = await fetch(file.url);
        const blob = await fileResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }

      toast({
        title: "Success",
        description: `Downloaded ${data.files.length} files`,
      });
    } catch (error) {
      console.error('Bulk download error:', error);
      toast({
        title: "Error",
        description: "Failed to download files",
        variant: "destructive"
      });
    } finally {
      setDownloading(null);
    }
  };

  const downloadReport = async (batchId: string) => {
    try {
      setDownloading(`report-${batchId}`);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('Not authenticated');

      const response = await fetch(`/functions/v1/download-files?batchId=${batchId}&type=report`, {
        headers: {
          'Authorization': `Bearer ${session.session.access_token}`
        }
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fix-report-${batchId}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Success",
        description: "Downloaded fix report",
      });
    } catch (error) {
      console.error('Report download error:', error);
      toast({
        title: "Error",
        description: "Failed to download report",
        variant: "destructive"
      });
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading fix batches...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Center
          </CardTitle>
          <CardDescription>
            Download fixed files and analysis reports from your code maintenance sessions
          </CardDescription>
        </CardHeader>
      </Card>

      {fixBatches.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              No fix batches available for download
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {fixBatches.map((batch) => (
            <Card key={batch.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Batch #{batch.batchId}</CardTitle>
                    <CardDescription>
                      <Clock className="inline h-4 w-4 mr-1" />
                      {new Date(batch.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      {batch.totalFiles} files
                    </Badge>
                    <Badge variant="secondary">
                      {batch.totalFixesApplied} fixes
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Batch Summary */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{batch.totalFiles}</div>
                      <div className="text-sm text-muted-foreground">Total Files</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{batch.totalIssues}</div>
                      <div className="text-sm text-muted-foreground">Issues Found</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{batch.totalFixesApplied}</div>
                      <div className="text-sm text-muted-foreground">Fixes Applied</div>
                    </div>
                  </div>

                  {/* Individual Files */}
                  {batch.files.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Fixed Files:</h4>
                      <div className="space-y-2">
                        {batch.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-background border rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="font-mono text-sm">{file.fileName}</span>
                            <Badge variant="outline">
                              {file.fixesApplied} fixes
                            </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadFile(batch.batchId, file.fileName)}
                              disabled={downloading === `${batch.batchId}-${file.fileName}`}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              {downloading === `${batch.batchId}-${file.fileName}` ? 'Downloading...' : 'Download'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Download Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={() => downloadBulk(batch.batchId)}
                      disabled={downloading === batch.batchId}
                      className="flex-1"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      {downloading === batch.batchId ? 'Downloading...' : 'Download All Files'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => downloadReport(batch.batchId)}
                      disabled={downloading === `report-${batch.batchId}`}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {downloading === `report-${batch.batchId}` ? 'Downloading...' : 'Download Report'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadCenter;