
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface ContentGenerationStepProps {
  seoData: {
    topic: string;
    selectedKeywords: string[];
    selectedTitle: string;
    selectedOutline: any;
    generatedContent: string;
  };
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
  onRegenerateContent,
}) => {
  const handleGenerateContent = () => {
    onRegenerateContent();
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-4">Generated Content</h2>
      
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader size={40} className="animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Generating your content...</p>
          <p className="text-xs text-muted-foreground mt-2">
            This may take a minute or two depending on the length of the content.
          </p>
        </div>
      ) : seoData.generatedContent ? (
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-muted/30">
            <ReactMarkdown className="prose dark:prose-invert max-w-none">
              {seoData.generatedContent}
            </ReactMarkdown>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={onPrev}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleGenerateContent}>
              Regenerate Content
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center py-12 border rounded-md">
            <p className="text-muted-foreground">
              Click the button below to generate content based on your selected title and outline.
            </p>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={onPrev}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleGenerateContent}>
              Generate Content
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ContentGenerationStep;
