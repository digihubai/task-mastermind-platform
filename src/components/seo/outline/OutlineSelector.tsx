
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";

interface OutlineSelectorProps {
  generatedOutlines: string[];
  selectedOutline: string;
  onSelectOutline: (outline: string) => void;
  onGenerateOutlines: () => void;
  onNext: () => void;
  onPrev: () => void;
  seoData: any;
}

const OutlineSelector: React.FC<OutlineSelectorProps> = ({
  generatedOutlines,
  selectedOutline,
  onSelectOutline,
  onGenerateOutlines,
  onNext,
  onPrev,
  seoData,
}) => {
  const handleContinue = () => {
    if (selectedOutline || seoData.outline) {
      onNext();
    }
  };

  if (generatedOutlines.length === 0) {
    return (
      <Card className="p-6 border border-border/40">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-2">
              <span className="text-purple-800 dark:text-purple-300 text-sm font-medium">3</span>
            </div>
            <h3 className="font-medium">Outline</h3>
          </div>
          
          <Button variant="ghost" size="sm" disabled>
            Add +
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
          <p className="max-w-xs">Generate an outline to structure your content</p>
        </div>
      </Card>
    );
  }

  // Format the outlines to display as bullet points with proper line breaks
  const formatOutline = (outline: string) => {
    const lines = outline.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('#')) {
        return null; // Skip title line
      } else if (line.startsWith('- ')) {
        return (
          <li key={index} className="mb-1">{line.substring(2)}</li>
        );
      } else if (line.trim() !== '') {
        return (
          <li key={index} className="mb-1">{line}</li>
        );
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <Card className="p-6 border border-border/40">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="bg-purple-100 dark:bg-purple-900/20 w-6 h-6 rounded-full flex items-center justify-center mr-2">
            <span className="text-purple-800 dark:text-purple-300 text-sm font-medium">3</span>
          </div>
          <h3 className="font-medium">Outline</h3>
        </div>
        
        <Button variant="ghost" size="sm" onClick={onGenerateOutlines}>
          Add +
        </Button>
      </div>
      
      <div className="space-y-6">
        {generatedOutlines.map((outline, index) => {
          // Extract title if it exists (usually the first line starting with #)
          const titleMatch = outline.match(/^#\s+(.+)$/m);
          const title = titleMatch ? titleMatch[1] : `Outline ${index + 1}`;
          
          return (
            <div 
              key={index}
              className={`border p-4 rounded-md ${
                selectedOutline === outline ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10" : ""
              } cursor-pointer`}
              onClick={() => onSelectOutline(outline)}
            >
              <ul className="list-disc pl-6 space-y-1">
                {formatOutline(outline)}
              </ul>
            </div>
          );
        })}
      </div>
      
      <div className="pt-6 flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <Button onClick={handleContinue} disabled={!selectedOutline && !seoData.outline}>
          Continue
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default OutlineSelector;
