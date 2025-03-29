
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Maximize2, Copy, Download, Save, AlertCircle } from "lucide-react";
import ContentEditor from '@/components/ContentEditor';
import ContentEditorDialog from './ContentEditorDialog';
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useRoleBasedSettings from "@/hooks/use-role-based-settings";
import { getOpenAIApiKey } from "@/services/ai/contentGenerationAI";

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
  const { userRole, hasAccess } = useRoleBasedSettings();
  const hasApiKey = !!getOpenAIApiKey();
  
  // Auto-generate content when component mounts if we have API key
  // and we don't already have content
  useEffect(() => {
    if (hasApiKey && !seoData.generatedContent && !isGenerating) {
      console.log("Auto-triggering content generation");
      onRegenerateContent();
    }
  }, []);

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

  const handleSaveContent = () => {
    toast.success("Content saved successfully");
    // In a real app, this would save the content to a database
  };

  return (
    <div className="space-y-6">
      {!hasApiKey && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API Key Required</AlertTitle>
          <AlertDescription>
            {(userRole === "admin" || userRole === "super_admin") ? (
              <>
                To generate content, you need to configure your OpenAI API key.{" "}
                <Link to="/settings/ai-configuration" className="font-medium underline">
                  Configure API key now
                </Link>
              </>
            ) : (
              <>
                The AI content generation feature requires an API key. Please contact your administrator to set up the API key.
              </>
            )}
          </AlertDescription>
        </Alert>
      )}
      
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
              disabled={!seoData.generatedContent}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownload}
              title="Download as HTML"
              disabled={!seoData.generatedContent}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRegenerateContent}
              disabled={isGenerating || !hasApiKey}
              title="Regenerate Content"
            >
              <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
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
            <Button onClick={onRegenerateContent} disabled={!hasApiKey}>
              {hasApiKey ? "Generate Content Now" : "API Key Required"}
            </Button>
          </div>
        )}
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Step
        </Button>
        <Button 
          variant="default" 
          onClick={handleSaveContent}
          disabled={!seoData.generatedContent}
        >
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
