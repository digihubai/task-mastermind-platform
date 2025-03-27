
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { FileText } from "lucide-react";

interface AnalysisResultProps {
  analysisResult: string;
  handleCopyToClipboard: () => void;
  handleDownloadAnalysis: () => void;
}

const AnalysisResult = ({ 
  analysisResult, 
  handleCopyToClipboard, 
  handleDownloadAnalysis 
}: AnalysisResultProps) => {
  return (
    <>
      {analysisResult ? (
        <div>
          <Textarea
            value={analysisResult}
            readOnly
            className="min-h-[300px] font-mono text-sm resize-none"
          />
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={handleCopyToClipboard}
              className="gap-2"
            >
              <Copy size={16} />
              Copy
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleDownloadAnalysis}
              className="gap-2"
            >
              <Download size={16} />
              Download
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 h-[300px]">
          <div className="bg-muted p-3 rounded-full mb-3">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Upload and analyze an image to see results</p>
        </div>
      )}
    </>
  );
};

export default AnalysisResult;
