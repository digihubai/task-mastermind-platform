
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Maximize2, Copy, Download, Save, AlertCircle, Wand } from "lucide-react";
import ContentEditor from '@/components/ContentEditor';
import ContentEditorDialog from './ContentEditorDialog';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useRoleBasedSettings from "@/hooks/use-role-based-settings";
import { getOpenAIApiKey, generateContentAI } from "@/services/ai";
import { useContentGeneration } from "@/hooks/useContentGeneration";

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
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();
  
  const { 
    handleCopyToClipboard, 
    handleFixFormatting 
  } = useContentGeneration({ seoData, onDataChange });
  
  // Auto-generate content when component mounts if we have API key
  // and we don't already have content
  useEffect(() => {
    if (hasApiKey && !seoData.generatedContent && !isGenerating && !generating) {
      console.log("Auto-triggering content generation");
      handleGenerateContent();
    }
  }, [hasApiKey, seoData.generatedContent, isGenerating]);

  const handleGenerateContent = async () => {
    if (!hasApiKey) {
      toast.error("API key is required for content generation");
      return;
    }
    
    setGenerating(true);
    
    try {
      if (!seoData.selectedTitle) {
        toast.error("Please select a title first");
        setGenerating(false);
        return;
      }

      const outlineContent = seoData.selectedOutline || seoData.outline;
      if (!outlineContent) {
        toast.error("Please select an outline first");
        setGenerating(false);
        return;
      }

      if (!Array.isArray(seoData.selectedKeywords) || seoData.selectedKeywords.length === 0) {
        toast.error("Please select at least one keyword");
        setGenerating(false);
        return;
      }
      
      toast.info("Generating SEO-optimized content...");
      
      // Log the actual data we're sending to make debugging easier
      console.log("Generating content with:", {
        title: seoData.selectedTitle,
        outline: outlineContent,
        keywords: seoData.selectedKeywords
      });
      
      const generatedContent = await generateContentAI(
        seoData.selectedTitle,
        outlineContent,
        seoData.selectedKeywords
      );
      
      console.log("Content generated successfully!");
      onDataChange("generatedContent", generatedContent);
      toast.success("Content successfully generated!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content: " + (error.message || "Unknown error"));
    } finally {
      setGenerating(false);
    }
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

  const handleConfigureAI = () => {
    navigate('/settings/ai-configuration');
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
                <div className="mb-2">
                  To generate content, you need to configure your OpenAI API key.
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleConfigureAI}
                  >
                    Configure API Key Now
                  </Button>
                </div>
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
              disabled={!seoData.generatedContent}
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
              disabled={isGenerating || generating || !hasApiKey}
              title="Regenerate Content"
            >
              <RefreshCw className={`h-4 w-4 ${(isGenerating || generating) ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
        
        {(isGenerating || generating) ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-center text-lg font-medium">Generating SEO-optimized content...</p>
            <p className="text-center text-muted-foreground text-sm">
              This may take a minute or two. We're crafting high-quality content based on your inputs.
            </p>
          </div>
        ) : seoData.generatedContent ? (
          <div className="space-y-4">
            <ContentEditor
              initialContent={seoData.generatedContent}
              onContentChange={(content) => onDataChange("generatedContent", content)}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleFixFormatting}
                title="Fix any formatting issues"
              >
                <Wand className="h-4 w-4 mr-2" />
                Fix Formatting
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <p className="text-center text-lg font-medium">Content hasn't been generated yet</p>
            <Button 
              onClick={handleGenerateContent} 
              disabled={!hasApiKey || generating}
              className="gap-2"
            >
              <Wand className="h-4 w-4" />
              {hasApiKey ? "Generate Content Now" : "API Key Required"}
            </Button>
            
            {!hasApiKey && userRole !== 'user' && (
              <Button 
                variant="outline" 
                onClick={handleConfigureAI}
                className="mt-2"
              >
                Configure AI Settings
              </Button>
            )}
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
