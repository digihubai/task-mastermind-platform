
import React, { useState, useEffect } from "react";
import { Loader, Globe, Bold, Italic, Underline, Strikethrough, Heading2, Heading3, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ContentDisplayProps {
  isGenerating: boolean;
  content: string;
  onRegenerateContent: () => void;
  onContentChange?: (newContent: string) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  isGenerating,
  content,
  onRegenerateContent,
  onContentChange
}) => {
  const [editableContent, setEditableContent] = useState(content);
  const editorRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setEditableContent(content);
  }, [content]);
  
  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setEditableContent(newContent);
      if (onContentChange) {
        onContentChange(newContent);
      }
    }
  };
  
  const applyHeading = (level: string) => {
    execCommand('formatBlock', level);
  };
  
  const handleContentChange = () => {
    if (editorRef.current && onContentChange) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

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
    <div className="space-y-4">
      {/* Text formatting toolbar */}
      <div className="sticky top-0 z-10 bg-background p-2 border rounded-md shadow-sm">
        <ToggleGroup type="multiple" className="flex flex-wrap gap-1">
          <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => execCommand('bold')}>
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => execCommand('italic')}>
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline" onClick={() => execCommand('underline')}>
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" onClick={() => execCommand('strikeThrough')}>
            <Strikethrough className="h-4 w-4" />
          </ToggleGroupItem>
          <div className="border-l mx-1 h-6"></div>
          <ToggleGroupItem value="h2" aria-label="Heading 2" onClick={() => applyHeading('h2')}>
            <Heading2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="h3" aria-label="Heading 3" onClick={() => applyHeading('h3')}>
            <Heading3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="ol" aria-label="Ordered list" onClick={() => execCommand('insertOrderedList')}>
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* Editable content area */}
      <div 
        className="border rounded-lg p-6 prose prose-sm max-w-none dark:prose-invert min-h-[500px]"
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: editableContent }}
        ref={editorRef}
        onBlur={handleContentChange}
        onInput={handleContentChange}
      />
    </div>
  );
};

export default ContentDisplay;
