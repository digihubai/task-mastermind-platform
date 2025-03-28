
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Edit, Quote } from "lucide-react";
import ContentEditorDialog from "./ContentEditorDialog";

interface ContentDisplayProps {
  isGenerating: boolean;
  content: string;
  onRegenerateContent: () => void;
  onContentChange: (content: string) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  isGenerating,
  content,
  onRegenerateContent,
  onContentChange
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  const handleOpenEditor = () => {
    setIsEditorOpen(true);
  };
  
  const handleCloseEditor = () => {
    setIsEditorOpen(false);
  };
  
  const handleSaveContent = (newContent: string) => {
    onContentChange(newContent);
    setIsEditorOpen(false);
  };
  
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader size={24} className="animate-spin mb-4 text-primary" />
        <h3 className="text-lg font-medium mb-2">Generating SEO Content</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Creating high-quality content optimized for search engines and 
          designed to engage your target audience...
        </p>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Quote size={40} className="text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Content Generated Yet</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Click the button below to generate SEO-optimized content based on your 
          selected topic, keywords, and outline.
        </p>
        <Button onClick={onRegenerateContent}>Generate SEO Content</Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleOpenEditor} className="gap-1.5">
          <Edit className="h-4 w-4" />
          Edit Content
        </Button>
      </div>
      
      <div 
        className="w-full prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-m-20 prose-headings:font-semibold prose-h1:text-3xl prose-h1:lg:text-4xl prose-h2:text-2xl prose-h2:lg:text-3xl prose-h3:text-xl prose-h3:lg:text-2xl prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:italic prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <ContentEditorDialog
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        content={content}
        onSave={handleSaveContent}
      />
    </div>
  );
};

export default ContentDisplay;
