
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PDFTrainingProps {
  onSkip: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  trained: boolean;
  selected?: boolean;
}

export const PDFTraining: React.FC<PDFTrainingProps> = ({ onSkip }) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    // Check if the file is a PDF, XLSX, or CSV
    if (!['pdf', 'xlsx', 'csv'].includes(fileExtension || '')) {
      toast({
        variant: "destructive",
        title: "Invalid file format",
        description: "Please upload a PDF, XLSX, or CSV file.",
      });
      return;
    }
    
    // Check file size (max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload a file smaller than 25MB.",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      
      // Add the file to the uploaded files list
      setUploadedFiles([...uploadedFiles, {
        id: Date.now().toString(),
        name: file.name,
        trained: false,
        selected: false
      }]);
      
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }, 1500);
  };
  
  const handleTrainAll = () => {
    // Simulate training process
    toast({
      title: "Training started",
      description: "Your files are being processed for training."
    });
    
    setTimeout(() => {
      setUploadedFiles(uploadedFiles.map(file => ({...file, trained: true})));
      toast({
        title: "Training complete",
        description: "All files have been successfully trained."
      });
    }, 2000);
  };
  
  const handleDeleteFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    toast({
      title: "File removed",
      description: "The file has been removed from training."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 bg-white dark:bg-gray-800/20">
        <div className="h-12 w-12 rounded-full border flex items-center justify-center mb-3">
          <Plus size={24} />
        </div>
        <p className="text-center font-medium mb-1">UPLOAD PDF, XLSX, CSV</p>
        <p className="text-center text-sm text-muted-foreground mb-5">Upload a File (Max: 25Mb)</p>
        
        <Button 
          className="w-full max-w-xs bg-emerald-500 hover:bg-emerald-600"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Plus size={16} className="mr-2" />
              Upload
            </>
          )}
        </Button>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.xlsx,.csv"
          className="hidden"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </div>
      
      {uploadedFiles.length > 0 && (
        <>
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm">2</span>
                Manage Files
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setUploadedFiles(uploadedFiles.map(f => ({...f, selected: true})))}>
                Select All
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" checked={file.selected || false} />
                  <span>{file.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${file.trained ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {file.trained ? 'Trained' : 'Not Trained'}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteFile(file.id)}>
                    &times;
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleTrainAll}>
            Train GPT
          </Button>
        </>
      )}
      
      <Button 
        variant="secondary" 
        className="w-full mt-4"
        onClick={() => onSkip()}
      >
        Next
      </Button>
    </div>
  );
};
