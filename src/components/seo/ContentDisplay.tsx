
import React from "react";
import { Loader, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentDisplayProps {
  isGenerating: boolean;
  content: string;
  onRegenerateContent: () => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  isGenerating,
  content,
  onRegenerateContent
}) => {
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Loader className="h-12 w-12 animate-spin mb-4 opacity-70" />
        <h3 className="text-lg font-medium mb-2">Generating SEO-optimized content</h3>
        <p className="text-muted-foreground max-w-md">
          We're creating a comprehensive article based on your selected topic, keywords, title, 
          and outline structure. This may take a moment...
        </p>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Globe className="h-12 w-12 text-primary/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">No content generated yet</h3>
        <p className="text-muted-foreground max-w-md mb-4">
          Click the button below to create SEO-optimized content based on your selected title and outline.
        </p>
        <Button 
          onClick={onRegenerateContent}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
        >
          Generate Content Now
        </Button>
      </div>
    );
  }
  
  return (
    <div className="border rounded-lg p-6 prose prose-sm max-w-none dark:prose-invert">
      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
    </div>
  );
};

export default ContentDisplay;
