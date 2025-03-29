
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Maximize2, Copy, Download, Save } from "lucide-react";
import ContentEditor from '@/components/ContentEditor';
import ContentEditorDialog from './ContentEditorDialog';
import { toast } from "sonner";

interface ContentGenerationStepProps {
  seoData: any;
  isGenerating: boolean;
  onDataChange: (field: string, value: any) => void;
  onPrev: () => void;
  onRegenerateContent: () => void;
}

const ContentGenerationStep: React.FC<ContentGenerationStepProps> = ({
  seoData,
  isGenerating,
  onDataChange,
  onPrev,
  onRegenerateContent
}) => {
  const [isFullscreenEdit, setIsFullscreenEdit] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(seoData.generatedContent || "");
    toast.success("Content copied to clipboard");
  };
  
  const handleDownload = () => {
    const blob = new Blob([seoData.generatedContent || ""], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-content-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content downloaded as HTML");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Generated Content</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFullscreenEdit(true)}
              title="Edit in Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyToClipboard}
              title="Copy to Clipboard"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownload}
              title="Download as HTML"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRegenerateContent}
              disabled={isGenerating}
              title="Regenerate Content"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-center text-lg font-medium">Generating SEO-optimized content...</p>
            <p className="text-center text-muted-foreground text-sm">
              This may take a minute or two. We're crafting high-quality content based on your inputs.
            </p>
          </div>
        ) : seoData.generatedContent ? (
          <ContentEditor
            initialContent={seoData.generatedContent}
            onContentChange={(content) => onDataChange("generatedContent", content)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <p className="text-center text-lg font-medium">Content hasn't been generated yet</p>
            <Button onClick={onRegenerateContent}>Generate Content Now</Button>
          </div>
        )}
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Step
        </Button>
        <Button variant="default" onClick={() => toast.success("Content saved successfully")}>
          <Save className="mr-2 h-4 w-4" />
          Save Content
        </Button>
      </div>

      {/* Fullscreen Editor Dialog */}
      <ContentEditorDialog 
        isOpen={isFullscreenEdit}
        onClose={() => setIsFullscreenEdit(false)}
        content={seoData.generatedContent || ""}
        onSave={(content) => {
          onDataChange("generatedContent", content);
          setIsFullscreenEdit(false);
        }}
      />
    </div>
  );
};

export default ContentGenerationStep;
