import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileCode, X, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onFilesUploaded: (files: File[]) => void;
}

interface UploadedFile {
  file: File;
  language: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
}

const FileUpload = ({ isOpen, onClose, onFilesUploaded }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
      'go': 'Go',
      'rs': 'Rust',
      'php': 'PHP',
      'rb': 'Ruby',
      'cs': 'C#',
      'swift': 'Swift',
      'kt': 'Kotlin',
      'scala': 'Scala',
    };
    return languageMap[ext || ''] || 'Unknown';
  };

  const simulateUpload = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        setUploadedFiles(prev => 
          prev.map(f => 
            f.file === file 
              ? { ...f, progress, status: progress === 100 ? 'completed' : 'uploading' }
              : f
          )
        );
      }, 100);
    });
  };

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      return ['py', 'js', 'ts', 'tsx', 'jsx', 'cpp', 'c', 'java', 'go', 'rs', 'php', 'rb', 'cs', 'swift', 'kt', 'scala'].includes(ext || '');
    });

    if (validFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload code files (Python, JavaScript, C++, Java, etc.)",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const newFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      language: detectLanguage(file.name),
      status: 'uploading',
      progress: 0,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    await Promise.all(newFiles.map(f => simulateUpload(f.file)));
    
    setIsUploading(false);
    onFilesUploaded(validFiles);
    
    toast({
      title: "Files uploaded successfully",
      description: `${validFiles.length} file(s) ready for analysis`,
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const handleClose = () => {
    setUploadedFiles([]);
    setIsUploading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Code Files</DialogTitle>
          <DialogDescription>
            Upload your code files for AI-powered analysis and error detection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <Card 
            className={`cursor-pointer transition-colors ${
              dragActive ? 'border-primary bg-primary/5' : 'border-dashed'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleFileSelect}
          >
            <CardContent className="p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-muted-foreground mb-4">
                Supports Python, JavaScript, TypeScript, C++, Java, and more
              </p>
              <Button variant="outline">
                Choose Files
              </Button>
            </CardContent>
          </Card>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".py,.js,.ts,.tsx,.jsx,.cpp,.c,.java,.go,.rs,.php,.rb,.cs,.swift,.kt,.scala"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
          />

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Uploaded Files</h4>
              {uploadedFiles.map((uploadedFile, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <FileCode className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{uploadedFile.file.name}</span>
                          <Badge variant="outline">{uploadedFile.language}</Badge>
                          {uploadedFile.status === 'completed' && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                          {uploadedFile.status === 'error' && (
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                        {uploadedFile.status === 'uploading' && (
                          <Progress value={uploadedFile.progress} className="mt-2" />
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(uploadedFile.file);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              disabled={uploadedFiles.length === 0 || isUploading}
              onClick={handleClose}
            >
              Continue to Analysis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUpload;