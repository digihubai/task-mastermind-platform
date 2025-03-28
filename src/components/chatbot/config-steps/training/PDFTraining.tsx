
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PDFTrainingProps {
  onSkip: () => void;
}

export const PDFTraining: React.FC<PDFTrainingProps> = ({ onSkip }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
      
      toast({
        title: "Files added",
        description: `${newFiles.length} PDF file(s) added for processing.`
      });
    }
  };
  
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  
  const handleProcessPdfs = () => {
    if (selectedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please upload at least one PDF file to continue."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate PDF processing
    setTimeout(() => {
      setIsLoading(false);
      setSelectedFiles([]);
      toast({
        title: "PDFs processed",
        description: `${selectedFiles.length} PDF file(s) have been processed and knowledge has been extracted.`
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      <div className={`border-2 border-dashed rounded-lg ${selectedFiles.length === 0 ? 'border-muted-foreground/20' : 'border-primary/20'} p-6 flex flex-col items-center justify-center`}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
          accept=".pdf"
          multiple
        />
        
        {selectedFiles.length === 0 ? (
          <>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Upload size={24} className="text-primary" />
            </div>
            <p className="text-muted-foreground mb-3 text-center">Drag & drop PDF files here or click to browse</p>
            <Button variant="outline" size="sm" onClick={handleFileUpload}>
              Upload PDFs
            </Button>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{selectedFiles.length} PDF file(s) selected</h3>
              <Button variant="outline" size="sm" onClick={handleFileUpload}>
                Add More
              </Button>
            </div>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                  <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleRemoveFile(index)}
                  >
                    <RefreshCw size={16} className="rotate-45" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {selectedFiles.length > 0 && (
        <Button 
          className="w-full mt-4" 
          onClick={handleProcessPdfs}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Processing PDFs...
            </>
          ) : `Process ${selectedFiles.length} PDF file(s)`}
        </Button>
      )}
    </div>
  );
};
