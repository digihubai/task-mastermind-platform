
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import ContentEditor from '@/components/ContentEditor';

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
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Generated Content</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRegenerateContent}
            disabled={isGenerating}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
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
      </div>
    </div>
  );
};

export default ContentGenerationStep;
